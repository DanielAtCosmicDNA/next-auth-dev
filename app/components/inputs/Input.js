'use client'

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

// import { UseFormRegister } from 'react-hook-form'

/**
 * Input component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label for the input.
 * @param {string} props.id - The id of the input.
 * @param {string} [props.type] - The type of the input. Optional.
 * @param {boolean} [props.required] - Whether the input is required. Optional.
 * @param {Function} props.register - The register function for the input.
 * @param {import 'react-hook-form'.FieldErrors} props.errors - The errors for the input.
 * @param {boolean} [props.disabled] - Whether the input is disabled. Optional.
 *
 * @returns {JSX.Element} The rendered input component.
 */
const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled
}) => {
  return (
    <div>
      <label
        className='
          block
          text-sm
          font-medium
          leading-6
          text-gray-900
        '
        htmlFor={id}
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
          `,
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string
}

export default Input
