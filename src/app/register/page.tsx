"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import styles from "./register.module.css";

type Props = {}

const Register = (props: Props) => {
  return (
    <div className={styles.container}>
        <h2 className={styles.heading}>Sign Up</h2>
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <Input id='username' placeholder='Username' type='text' />
                <Input id='emailid' placeholder='xyz@gmail.com' type='email' />
                <Input id='password' placeholder='********' type='password' />
                <Button className={styles.fullWidthButton}>Sign up &rarr;</Button>
            </div>
            <p className={styles.loginPrompt}>
               Already have an account? <Button variant="link"><Link href="/login">Login</Link></Button> 
            </p>
        </form>
    </div>
  )
}

export default Register;
