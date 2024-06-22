import React from 'react'
import "./globals.css";
import Form from '@/components/ui/form';

type Props = {}

function app({}: Props) {
  return (
    <div className='appbody'>
      <Form/>
    </div>
  )
}

export default app