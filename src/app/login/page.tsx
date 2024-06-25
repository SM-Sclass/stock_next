"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import Link from "next/link";
import styles from "./login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(email);
        console.log(password);
    };

    return (
        <div className={styles.topBox}>
            <div className={styles.allBox}>
                <h1 className={styles.signText}>Sign In</h1>
                <form className={styles.spaceY6} onSubmit={handleSubmit}>
                    <div className={styles.loginPageBox}>
                        <Input className={styles.emailBox} id="email" type="email" placeholder="xyz@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Input className={styles.passwordBox} id="password" type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Button className={styles.fullWidthButton} type="submit">
                            Sign in &rarr;
                        </Button>
                    </div>
                    <p className={styles.registerAccount}>
                        Don't have an account? <Button variant="link"><Link href="/register">Register</Link></Button>
                    </p>
                    <hr className={styles.divider} />
                    <section className={styles.googleSignInSection}>
                        <Button className={styles.googleButton}>
                            <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} />
                            <span className={styles.googleButtonText}>Sign in with Google</span>
                        </Button>
                    </section>
                </form>
            </div>
        </div>
    );
}

export default Login;
