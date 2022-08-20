import { Layout } from 'antd'
import React from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useStateContext } from '../context/ContextProvider';

const { Header } = Layout;

const Navbar = () => {
  const { collapsed, setCollapsed, theme } = useStateContext();
  return (
    <Header style={{ background: theme === 'light' ? "white" : "#001529"}}>
      {
        React.createElement(collapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold, {
          className:"trigger",
          onClick: ()=> setCollapsed(!collapsed),
          color:"gray"
        })
      }
    </Header>
  )
}

export default Navbar