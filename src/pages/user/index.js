import React from 'react'
import { Card } from 'antd'
// import axios from './../../axios'
import BaseForm from './../../components/BaseForm'
 
export default class User extends React.Component{
    params = {
        page: 1
    }
    state = {
        reset:false
    }
    formList =[
        {   
            type:'INPUT',field:'name',placeholder:'请输入用户名',width:80,
        },
        {   
            type:'INPUT',field:'pasword',placeholder:'请输入密码',width:80,
        },
    ]
    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    requestList=()=>{
        console.log('111')
    }
    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList = {this.formList} filterSubmit={this.handleFilter} reset={this.state.reset}/>
                </Card>
            </div>
        )
    }
}