import Link from 'next/link'
import React from 'react'

const FooterLink = ({text,Linktext,href}):FooterPropTypes => {
  return (
    <div className='text-center pt-4'>
        <p className='text-[1rem] text-gray-600'>
            {text} {' '}    
            <Link  href={href} className='text-black font-bold hover:underline'>
                {Linktext}
            </Link>
        </p>
    </div>
  )
}

export default FooterLink