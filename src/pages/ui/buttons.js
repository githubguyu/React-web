import React from 'react'
import { Card, Button, Icon } from 'antd'
import './ui.less'
const ButtonGroup = Button.Group;
export default class Buttons extends React.Component{
       state = {
            loading:true
        } 
    handleCloseLoading =()=>{
        this.setState({
            loading:!this.state.loading
        })
        console.log(this.state.loading)
    }
    render(){
        return(
            <div>
                <Card title='基础按钮' className='card-button'>
                    <Button type="primary">rain-gu</Button>
                    <Button >rain-gu</Button>
                    <Button type="dashed">rain-gu</Button>
                    <Button type="danger">rain-gu</Button>
                </Card>
                <Card title='图形按钮' className='card-button'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon='search'/>
                    <Button icon='search' type="primary">搜索</Button>
                    <Button icon='download' type="primary">下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-button'>
                    <Button  type="primary" loading={this.state.loading}>确定</Button>
                    <Button  loading={this.state.loading} shape='circle' icon='search' type="primary" />
                    <Button  loading={this.state.loading}>点击加载</Button>
                    <Button  shape='circle' icon='search' loading={this.state.loading}/>
                    <Button  icon='search' type="primary" loading={this.state.loading}>搜索</Button>
                    <Button onClick={this.handleCloseLoading} type="primary">关闭</Button>
                </Card>
                <Card title='按钮组'>
                    <ButtonGroup>
                        <Button type="primary" icon='left'>返回</Button>
                        <Button type="primary">前进<Icon type="right" /></Button>
                    </ButtonGroup>
                </Card>
                <Card title='Loading按钮' className='card-button'>
                    <Button  type="primary" loading={this.state.loading}>确定</Button>
                    <Button  loading={this.state.loading} shape='circle' icon='search' type="primary" />
                    <Button  loading={this.state.loading}>点击加载</Button>
                    <Button  shape='circle' icon='search' loading={this.state.loading}/>
                    <Button  icon='search' type="primary" loading={this.state.loading}>搜索</Button>
                    <Button onClick={this.handleCloseLoading} type="primary">关闭</Button>
                </Card>
                <Card title='Loading按钮' className='card-button'>
                    <Button  type="primary" loading={this.state.loading}>确定</Button>
                    <Button  loading={this.state.loading} shape='circle' icon='search' type="primary" />
                    <Button  loading={this.state.loading}>点击加载</Button>
                    <Button  shape='circle' icon='search' loading={this.state.loading}/>
                    <Button  icon='search' type="primary" loading={this.state.loading}>搜索</Button>
                    <Button onClick={this.handleCloseLoading} type="primary">关闭</Button>
                </Card>
            </div>
        );
    }
}