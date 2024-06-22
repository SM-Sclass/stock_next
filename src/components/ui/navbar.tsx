import React from 'react'
import { Button } from './button'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='w-full flex justify-evenly rounded-xl p-1 gap-x-2 bg-stone-500'>
        <Button variant="ghost" className='' asChild><Link href="/" className='text-white'>Home</Link></Button>
        <Button variant="ghost" className='' asChild><Link href="/update" className='text-white'>Update</Link></Button>
        <Button variant="ghost" className='' asChild><Link href="/ledger" className='text-white'>Ledgers</Link></Button>
        <Button variant="ghost" className='' asChild><Link href="/bill" className='text-white'>Bill</Link></Button>

    </div>
  )
}

export default Navbar;