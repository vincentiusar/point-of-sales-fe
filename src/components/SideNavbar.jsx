import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { redirectByKey } from '../helpers/helpers';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
}

function SideNavbar() {
    
    const user = useSelector((state) => { return state.user.users });
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const items = [
        getItem('Dashboard', 'dashboard', <PieChartOutlined />),
        getItem('Table', 'table', <DesktopOutlined />),
        getItem('Food', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        (user.role_id === 2) ? 
            getItem('Back', 'back', <DesktopOutlined />) : null
    ];

    const [collapsed, setCollapsed] = useState(false);

    const changeUrl = ({ key }) => {
        navigate(redirectByKey(user, key));
    }
    
    useEffect(() => {

        return () => { }
    }, [])
    
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="w-full py-2 h-12 text-center font-semibold text-white text-2xl">{!collapsed ? "Point of Sales" : "POS"}</div>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname.split('/')[3]]} mode="inline" items={items} onClick={changeUrl} />
            </Sider>
        </>
    );
}

export default SideNavbar;