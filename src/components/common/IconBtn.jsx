import React from 'react'

const IconBtn = ({
   text,
   onClick,
   children,
   disabled,
   outline = false,
   customClasses,
   type,
}) => {
   return (
      <button
         type={type}
         disabled={disabled}
         onClick={onClick}
         className={`
        flex items-center gap-x-2 rounded-md px-5 py-2 text-sm font-semibold
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50/40

        ${outline
               ? 'border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50/10'
               : 'bg-yellow-50 text-richblack-900 hover:bg-yellow-100'
            }

        ${disabled
               ? 'cursor-not-allowed opacity-50 hover:scale-100'
               : 'cursor-pointer hover:scale-[0.97]'
            }

          ${customClasses}
         ` }
      >
         {children ? (
            <span className="flex items-center gap-x-2">
               {children}
               {text}
            </span>
         ) : (
            text
         )}
      </button>
   )
}

export default IconBtn
