import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import { constants as httpConstants } from 'http2'
import { STATUS_CODES } from 'http'

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} = httpConstants

/**
 * This function takes a status code as input and returns an object.
 * The object contains the HTTP status message corresponding to the status code and the status code itself.
 *
 * @param {number} status - The HTTP status code.
 * @returns {{ body: number, init: any}} An object containing the HTTP status message and the status code.
 */
const getParams = (status) => {
  return { body: STATUS_CODES[status], init: { status } }
}

/**
 *
 * @param {Request} request
 */
const POST = async (request) => {
  try {
    const body = await request.json()
    const {
      email,
      name,
      password
    } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: HTTP_STATUS_BAD_REQUEST })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse(...getParams(HTTP_STATUS_INTERNAL_SERVER_ERROR))
  }
}

export { POST }
