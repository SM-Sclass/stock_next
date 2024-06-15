"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Link from "next/link"
type Props = {}

const Register = (props: Props) => {
  return (
    <div className='mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:pd-8 shadow-input bg-white border border-[#121212] dark:bg-black space-y-5 items-center'>
        <h2 className='text-start font-bold text-xl'>Sign Up</h2>

        <form className='my-8 space-y-1'>
            <div className='space-y-4 '>
                <Input id='username' placeholder='Username' type='text'></Input>
                <Input id='emailid' placeholder='xyz@gmail.com' type='email'></Input>
                <Input id='password' placeholder='********' type='password'></Input>
                <Button className='w-full'>Sign up &rarr;</Button>
            </div>
            <p className='text-center text-neutral-600 text-sm'>
               Already have an account?<Button variant="link"><Link href="/login">Login</Link></Button> 
            </p>

        </form>
    </div>
  )
}

export default Register;