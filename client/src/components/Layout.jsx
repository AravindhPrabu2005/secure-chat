import { Outlet } from 'react-router-dom';

import SideBar  from '../components/Navbar';

const Layout = () => {
    return (
        <div className="flex">
        <SideBar />
        <div className="w-full">
            <Outlet />
        </div>
        </div>
    )
    }

export default Layout
