import React from 'react'
import { Input } from '../input'

import { Form } from 'react-hook-form'
import { cn } from '@/lib/utils'


const InputField = ({ name, label, placeholder, register, errors, validation,type="text",disabled,value }:FormInputProps) => {
  return (
    <div className='space-y-2 w-full'>
        <label htmlFor={name} className='from-label'>
            {label}
            
        </label>
        <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
        {...register(name, validation)}

        />
        {errors && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}

    </div>
  )
}

export default InputField