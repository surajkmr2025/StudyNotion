import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900'>
                <div className='spinner'></div>
            </div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900'>

            {/* Sidebar — static on desktop, slide-in drawer on mobile */}
            <Sidebar />

            {/* Main content — full width on mobile (sidebar is overlay, not in flow),
                flex-1 on desktop to fill remaining space beside the sidebar */}
            <div className='w-full md:flex-1 overflow-y-auto'>
                <div className='mx-auto w-11/12 max-w-[1100px] py-8 md:py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
