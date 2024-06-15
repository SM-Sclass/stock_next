"use client"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle"
import Link from "next/link"

function Login() {
    return (
        <div className="mt-10 max-w-md w-full mx-auto rounded-md p-6 md:p-8 shadow-input bg-white border border-gray-200 dark:border-gray-800 dark:bg-black">
            <h1 className="font-bold text-2xl text-center mb-4">Sign In</h1>
            <form className="space-y-6">
                <div className="space-y-4">
                    <Input id="email" type="email" placeholder="Enter your email" />
                    <Input id="password" type="password" placeholder="Enter your password" />
                    <Button className="w-full">
                        Sign in &rarr;
                    </Button>
                </div>
                <p className="text-center text-gray-600 text-sm">
                    Don't have an account? <Button variant="link"><Link href="/register">Register</Link></Button>
                </p>
                <hr className="border-t border-gray-200 dark:border-gray-800" />
                <section className="flex items-center justify-center">
                    <Button className="bg-white text-gray-700 shadow-md hover:shadow-lg rounded-full px-4 py-2 flex items-center justify-center w-full transition duration-200 ease-in-out transform hover:bg-gray-100 hover:text-gray-800 hover:scale-105">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2 text-l w-5" />
                        <span className="text-base">Sign in with Google</span>
                    </Button>
                </section>
            </form>
        </div>
    )
}

export default Login;
