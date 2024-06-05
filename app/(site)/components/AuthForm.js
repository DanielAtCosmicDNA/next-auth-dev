'use client'

import Input from '@/app/components/inputs/Input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import post from '@/app/libs/post'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

class VariantEnum {
  static LOGIN = false
  static REGISTER = true
}

const variantLabel = {
  [VariantEnum.LOGIN]: 'Sign in',
  [VariantEnum.REGISTER]: 'Register'
}

const variantLabel2 = {
  [VariantEnum.LOGIN]: 'New to Messenger?',
  [VariantEnum.REGISTER]: 'Already have an account?'
}

const variantLabel3 = {
  [VariantEnum.LOGIN]: 'Create an account',
  [VariantEnum.REGISTER]: 'Login'
}

const socialActionIcons = [
  BsGithub,
  BsGoogle
]

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState(VariantEnum.LOGIN)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleVariant = () => {
    // switch (variant) {
    //   case VariantEnum.LOGIN:
    //     setVariant(VariantEnum.REGISTER)
    //     break
    //   case VariantEnum.REGISTER:
    //     setVariant(VariantEnum.LOGIN)
    //     break
    // }
    setVariant(!variant)
  }

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const registerNewUser = async (data) => {
    const response = await post('/api/register', data)

    if (!response.ok) {
      const read = await response.text()
      toast.error(`Something went wrong:\n${read}...`)
      return
    }

    await signIn('credentials', data)
  }

  const signInExistingUser = async (data) => {
    const signinResponse = await signIn('credentials', {
      ...data,
      redirect: false
    })
    if (signinResponse?.error) {
      toast.error('Invalid credentials')
    }
    if (signinResponse?.ok) {
      toast.success('Logged in!')
      router.push('/users')
    }
  }

  const onSubmitHandler = async (data) => {
    setIsLoading(true)
    switch (variant) {
      case VariantEnum.REGISTER:
        // Register request
        await registerNewUser(data)
        break
      case VariantEnum.LOGIN:
        // NextAuth Signin
        await signInExistingUser(data)
        break
    }
    setIsLoading(false)
  }

  const onSubmit = (data) => {
    onSubmitHandler(data)
  }

  const socialAction = async (action) => {
    setIsLoading(true)

    const signinResponse = await signIn(action, { redirect: false })
    if (signinResponse?.error) {
      toast.error('Invalid Credentials')
    }

    if (signinResponse?.ok) {
      toast.success('Logged in!')
    }
    setIsLoading(false)
  }

  const inputCommonParams = {
    register,
    errors,
    disabled: isLoading
  }

  return (
    <div
      className='
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      '
    >
      <div
        className='
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        '
      >
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === VariantEnum.REGISTER && (
            <Input
              id='name'
              label='Name'
              {...inputCommonParams}
            />
          )}
          <Input
            id='email'
            label='Email address'
            type='email'
            {...inputCommonParams}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            {...inputCommonParams}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type='submit'
            >
              {variantLabel[variant]}
            </Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div
              className='
                absolute
                inset-0
                flex
                items-center
              '
            >
              <div className='
                w-full
                border-t
                border-gray-300'
              />
            </div>
            <div className='
                relative
                flex
                justify-center
                text-sm'
              >
                <span className='
                  bg-white
                  px-2
                  text-gray-500
                '>
                  Or continue with
                </span>
              </div>
          </div>
          <div className='mt-6 flex gap-2'>
            {socialActionIcons.map((icon, k) =>
              <AuthSocialButton
                key={k}
                icon={icon}
                onClick={() => socialAction(icon.name.slice(2).toLowerCase())}
              />
            )}
          </div>
        </div>
        <div className='
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
        '>
          <div>
            {variantLabel2[variant]}
          </div>
          <div
            onClick={toggleVariant}
            className='underline cursor-pointer'
          >
            {variantLabel3[variant]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
