'use client'
import LoginPage from '@/components/Common/Login';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const FootBtns = () => {
    const [LoginModal, setLoginModal] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();


    return (
        <div>
            {
                (status !== "authenticated")
                &&
                <div className="my-5 gap-3 flex items-center justify-center">
                    <button
                        onClick={() => setLoginModal(!LoginModal)}
                        // onClick={() => console.log(LoginModal)}
                        className="border rounded-lg p-2 md:p-3 px-5">Login</button>


                    <button
                        onClick={() => router.push("/user/membership")}
                        className="border rounded-lg p-2 md:p-3 px-5 bg-primaryColor text-white">
                        Register as a Member
                    </button>
                </div>

            }

            {/* login modal */}
            {LoginModal && <LoginPage modal={setLoginModal} />}
        </div>


    )
}

export default FootBtns