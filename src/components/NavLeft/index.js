import React from 'react'
import './index.css'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
const SubMenu = Menu.SubMenu;


 class NavLeft extends React.Component{
    handleClick=({ item, key })=>{
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title)) 
        // console.log(key)   
        this.setState({
            currentKey:key
         })
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\.*$/g,'')
        this.setState({
            menuTreeNode,
            currentKey
        })     
    }
    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <Link to={item.key} replace>
                   {item.title}
                </Link>
            </Menu.Item>
        })
    }
    render(){
        return(
            <div className='navbox'>
                <div className='logo'>
                    <img src='./assets/logo-ant.svg' alt="this in logo"/>
                    <h1>Imooc Ms</h1>
                </div>
                <Menu 
                onClick = { this.handleClick }
                theme='dark' className='navlist'>
                   { this.state.menuTreeNode }    
                </Menu>
            </div>
        )
    }
}
export default connect ()(NavLeft);