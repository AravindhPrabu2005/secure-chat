import { Outlet } from 'react-router-dom';

import SideBar  from '../components/Sidebar';

const Layout = () => {
    return (
        <div className="flex">
        <SideBar />
        <div className="w-[80%]">
            <Outlet />
        </div>
        </div>
    )
    }

export default Layout
