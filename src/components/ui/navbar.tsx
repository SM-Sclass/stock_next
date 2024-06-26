import React, { useState } from 'react';
import { Button } from './button';
import Link from 'next/link';
import "./navbar.css";

type Props = {}

const Navbar = (props: Props) => {
  const [animationStyle, setAnimationStyle] = useState({ width: '100px', left: '0' });

  const handleClick = (width: string, left: string) => {
    setAnimationStyle({ width, left });
  };

  return (
    <div className='nav'>
      <Button variant="ghost" asChild>
        <Link href="/" className='text-white' onClick={() => handleClick('100px', '0')}>Home</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/update" className='text-white' onClick={() => handleClick('110px', '100px')}>Update</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/bill" className='text-white' onClick={() => handleClick('100px', '210px')}>Bill</Link>
      </Button>
      <Button className='sentbill' variant="ghost" asChild>
        <Link href="/ledger" className='text-white' onClick={() => handleClick('160px', '310px')}>Sent Bill</Link>
      </Button>
      <Button className='live' variant="ghost" asChild>
        <Link href="/live" className='text-white' onClick={() => handleClick('120px', '470px')}>Live</Link>
      </Button>
      <Button className='login1' variant="ghost" asChild>
        <Link href="/login" className='text-white' onClick={() => handleClick('120px', '590px')}>Login</Link>
      </Button>
      
      <div className="animation" style={animationStyle}></div>
    </div>
  );
}

export default Navbar;
