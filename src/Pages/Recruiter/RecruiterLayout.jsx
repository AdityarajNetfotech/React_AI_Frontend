import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';

function RecruiterLayout() {
    return (
        <>
            <section className='flex'>
                <Sidebar />
                <div className="max-[640px]:ml-0 flex-1">
                    <Outlet />
                </div>
            </section>
        </>
    );
}

export default RecruiterLayout;
