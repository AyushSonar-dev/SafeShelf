import React, { useState } from 'react'
import { Input } from '../input'
import { Eye, EyeOff } from 'lucide-react'
import { Form } from 'react-hook-form'
import { cn } from '@/lib/utils'


const InputField = ({ name, label, placeholder, register, errors, validation,type="text",disabled,value }:FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === "password"
  const inputType = isPasswordField && showPassword ? "text" : type

  return (
    <div className='space-y-2 w-full'>
        <label htmlFor={name} className='from-label'>
            {label}
            
        </label>
        <div className='relative'>
          <Input
          type={inputType}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled}, isPasswordField && 'pr-10')}
          {...register(name, validation)}

          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {errors && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}

    </div>
  )
}

export default InputField