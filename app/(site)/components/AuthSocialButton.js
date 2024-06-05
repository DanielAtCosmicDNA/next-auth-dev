import React from 'react'
import { IconBase } from 'react-icons'
import PropTypes from 'prop-types'

/**
 * AuthSocialButton component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {IconBase} props.icon - The icon for the button.
 * @param {Function} props.onClick - The onClick function for the button.
 *
 * @returns {JSX.Element} The rendered AuthSocialButton component.
 */
const AuthSocialButton = ({ icon: Icon, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
        inline-flex
        w-full
        justify-center
        rounded_md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
      '
    >
      <Icon />
    </button>
  )
}

AuthSocialButton.propTypes = {
  icon: PropTypes.objectOf(IconBase),
  onClick: PropTypes.func
}

export default AuthSocialButton
