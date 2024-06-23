import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import "./navbar.css";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='nav'>
      <Button variant="ghost" asChild>
        <Link href="/" className='text-white'>Home</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/update" className='text-white'>Update</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/ledger" className='text-white'>view Bill</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/bill" className='text-white'>Bill</Link>
      </Button>
      <div className="animation start-home"></div>
    </div>
  );
}

export default Navbar;
