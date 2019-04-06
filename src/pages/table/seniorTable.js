import React from 'react'
import Utils from './../../utils/utils';
import axios  from './../../axios'
import { Card, Table, Button, Modal, message } from 'antd'

export default class SeniorTable extends React.Component{
    state = {
        dataSource1:[] 
    }
    params = {
        page:1
    }
    //动态ajax请求数据
    componentDidMount(){
        this.request();
    }
    request =()=>{
        let _this = this; 
        axios.ajax({
         url:'/table/high',
         data:{
             params:{
                 page:this.params.page
             },
             isShowLoading:true
         }
        }).then((res)=>{
             if(res.code === 0){
                 res.result.list.map((item,index)=>{
                    return item.key = index
                 })
                 this.setState({
                     dataSource1 : res.result.list,
                     //分页
                     pagination:Utils.pagination(res,(current)=>{
                             _this.params.page = current
                             this.request();
                     })
                 })
             }
        })
     }
    //排序函数 
     handleChange =(pagination, filters, sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
     }
    //删除按钮 
    handleDelete=(record)=>{
        Modal.confirm({
            title:'温馨提示',
            content:'您确定要删除此件商品吗',
            onOk:()=>{
                message.success('删除成功');                
                this.request()
            }
        })
     }
     
    render(){
        const columns = [
            { title: 'id', dataIndex: 'id',width:80 },
            { title: '姓名', dataIndex: 'name',width:80},
            { title: '年龄', dataIndex: 'age',width:80},
            { title: '地址', dataIndex: 'adress',width:120},
            { title: '时间', dataIndex: 'time',width:80},
            { title: '性别', dataIndex:'sex',width:80,render: (sex) =>{
                return sex === "1" ? '男' : '女' 
            }}
        ]
        const columns1 = [
            { title: 'id', dataIndex: 'id',width:80,fixed: 'left'},
            { title: '姓名', dataIndex: 'name',width:80},
            { title: '年龄', dataIndex: 'age',width:80},
            { title: '地址', dataIndex: 'adress',width:120 ,key:0},
            { title: '地址', dataIndex: 'adress',width:120 ,key:1},
            { title: '地址', dataIndex: 'adress',width:120 ,key:2},
            { title: '地址', dataIndex: 'adress',width:120 ,key:3},
            { title: '地址', dataIndex: 'adress',width:120 ,key:4},
            { title: '地址', dataIndex: 'adress',width:120 ,key:5},
            { title: '地址', dataIndex: 'adress',width:120 ,key:6},
            { title: '地址', dataIndex: 'adress',width:120 ,key:7},
            { title: '时间', dataIndex: 'time',width:80},
            { title: '性别', dataIndex:'sex',fixed: 'right',width:80,render: (sex) =>{
                return sex === "1" ? '男' : '女' 
            }}
        ]
        const columns2 = [
            { title: 'id', dataIndex: 'id'},
            { title: '姓名', dataIndex: 'name'},
            { title: '年龄', dataIndex: 'age',sorter:(a,b)=>{
                return a.age-b.age;
            },
             sortOrder:this.state.sortOrder
            },
            { title: '地址', dataIndex: 'adress'},
            { title: '时间', dataIndex: 'time'},
            { title: '性别', dataIndex:'sex',render: (sex) =>{
                return sex === "1" ? '男' : '女' 
            }}
        ]
        const columns3 = [
            { title: 'id', dataIndex: 'id'},
            { title: '姓名', dataIndex: 'name'},
            { title: '年龄', dataIndex: 'age'},
            { title: '地址', dataIndex: 'adress'},
            { title: '时间', dataIndex: 'time'},
            { title: '性别', dataIndex:'sex',render: (sex) =>{
                return sex === "1" ? '男' : '女' 
            }},
            {
                title: '操作',
                dataIndex:'delete',
                render:(text,record)=>{
                    return <Button size="small" onClick={()=>{ this.handleDelete(record) }}>删除</Button>
                }
            }
        ]
        return(
            <div>
                <Card title='头部固定-Y轴可以滚动' style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource1}
                        pagination={this.state.pagination}
                        scroll={{y:240}}
                    />
              </Card>
              <Card title='左侧固定-X轴可以滚动' style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns1}
                        dataSource={this.state.dataSource1}
                        pagination={this.state.pagination}
                        scroll={{x:1370}}
                    />
              </Card>
              <Card title='排序-年龄' style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        onChange={this.handleChange}
                    />
              </Card>
              <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
