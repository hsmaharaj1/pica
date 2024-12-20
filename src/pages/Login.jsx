import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Login() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-4">
                <div className='text-4xl'>Welcome Back</div>
                <div>Please login your account</div>
                <div>
                    <div>Phone Number</div>
                    <Input></Input>
                </div>

                <div>
                    <div>One Time Password</div>
                    <Input></Input>
                </div>
                <div>Resend OTP</div>

                <Button>Sign in</Button>

                <Button>Continue with Google</Button>

                <div>Don't have an Account? <span>Sign-up</span></div>
                
            </div>
        </div>
    )
}
