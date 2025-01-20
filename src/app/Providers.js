'use client';

import LoaderData from '@/components/Common/Loader';
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
// import { Provider } from "react-redux";
// import { persistor, store } from "@/redux/Store";
// import { PersistGate } from "redux-persist/integration/react";

export const AuthProvider = ({ children }) => {
    return (
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor} >
        <SessionProvider>

            {children}

        </SessionProvider>

        //     </PersistGate>
        // </Provider>

    )
}

export const AdminProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (session?.user?.userInfo?.role !== 'admin' || session === null) {
            return router.push('/'); // Redirect to home page if not admin
        }
    }, [session, status, router])

    // Or render a loading spinner
    if (status === 'loading' || !session || session?.user?.userInfo?.role !== 'admin') {
        return (
            <div className='h-screen w-full grid place-items-center'>
                <LoaderData />
            </div>);
    }

    return <>{children}</>
}