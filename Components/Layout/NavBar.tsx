import React from 'react'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
const NavBar = () => {
    return (
        <div className='w-full flex items-center justify-between px-4 h-16 bg-foreground/20 backdrop-blur-2xl'>
            <div>
                <Link href="/">
                    <h4 className='text-4xl font-semibold'>میرا</h4>
                </Link>
            </div>
            <div className='flex gap-5'>
                <button className='' >ورود</button>
                <Link className='bg-primary flex gap-2 text-background rounded-lg px-2 py-2 font-semibold' href="/register">
                    <LogIn />
                    <span>ثبت نام</span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
