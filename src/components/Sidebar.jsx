import React from 'react'
import { Layout, Menu } from 'antd'
import { sidebarItems } from '../data/data';
import { useStateContext } from '../context/ContextProvider';

const { Sider } = Layout 

const Sidebar = () => {
  const { collapsed } = useStateContext();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{minHeight:"100vh", paddingTop:"1rem"}}>
        <Menu theme='dark' mode='inline' items={sidebarItems}/>
    </Sider>
  )
}

export default Sidebar