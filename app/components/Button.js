'use client'

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

class Types {
  static BUTTON = 'button'
  static SUBMIT = 'submit'
  static RESET = 'reset'
}

/**
 * Button component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Types} [props.type] - The type of the button.
 * @param {boolean} [props.fullWidth] - If true, the button will take up the full width of its container.
 * @param {[Object]} [props.children] - The content to be displayed inside the button.
 * @param {Function} [props.onClick] - The function to be called when the button is clicked.
 * @param {boolean} [props.secondary] - If true, the button will have secondary styling.
 * @param {boolean} [props.danger] - If true, the button will have danger styling.
 * @param {boolean} [props.disabled] - If true, the button will be disabled.
 * @returns {JSX.Element} The Button component.
 */
const Button = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
      `,
      disabled && 'opacity-50 cursor-default',
      fullWidth && 'w-full',
      secondary ? 'text-gray-900' : 'text-white',
      danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
      !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.arrayOf(Object),
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  type: PropTypes.objectOf(Types)
}

export default Button
