import React from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios  from './../../axios'
import './table.css'
import Utils from './../../utils/utils';
export default class BasicsTable extends React.Component{
    state={
        dataSource1:[],
    }
    params={
        page:1
    }

    componentDidMount(){
        const dataSource = [
            {
                id:'1',
                name:'张三',
                age:'18',
                adress:'成都市科华北路',
                time:'08:00',    
                sex:'2'     
            },
            {
                id:'2',
                name:'王二',
                age:'20',
                adress:'成都市科华北路',
                time:'08:30',    
                sex:'1'               
            }
        ]
        dataSource.map((item,index)=>{
            return item.key = index
        })
        this.setState({
            dataSource
        })
        this.request()
    }
//获取selectedRowKeys  单选框onRow事件
    onRowClick =(record,index)=>{
        let selectKey = [index];
        this.setState({
            selectKey:selectKey,
            selectedItem:record
        })
        Modal.info({
            title:'信息',
            content:`${record.name}请不要在大街上裸奔。`
        })
    }
//动态ajax请求数据
    request =()=>{
       let _this = this; 
       axios.ajax({
        url:'/table/list',
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
                    selectedRowKeys:[],
                    selectedRows:null,
                    //分页
                    pagination:Utils.pagination(res,(current)=>{
                            _this.params.page = current
                            this.request();
                    })
                })
            }
       })
    }
//删除
        handleDelete =(()=>{     
            const { selectedRows } = this.state
            let ids = []
            if(selectedRows ){
                selectedRows.map((item)=>
                ids.push(item.id)
            )
            Modal.confirm({
                title:'删除提示',
                content:`要删除商品吗？ ${ids.join(',')}`,
                onOk:()=>{
                    message.success('删除成功')
                    this.request();
                }
            }) 
            }else{
            Modal.confirm({
                title:'温馨提示',
                content:"请选择商品",
            }) 
            }
        })

    render(){
        const columns = [
            { title: 'id', dataIndex: 'id' },
            { title: '姓名', dataIndex: 'name'},
            { title: '年龄', dataIndex: 'age'},
            { title: '地址', dataIndex: 'adress'},
            { title: '时间', dataIndex: 'time'},
            { title: '性别', dataIndex:'sex',render: (sex) =>{
                return sex === "1" ? '男' : '女' 
            }}
        ]
        const { selectedRowKeys,selectKey } = this.state
    //单选     
        const rowRadioSelection = {
            type : 'radio',
            selectKey
        }
    //复选
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
       
        return(
          <div>
              <Card title='基础表格'>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
              </Card>
              <Card title='动态数据渲染' style={{margin:'10px 0'}}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource1}
                    pagination={false}
                />
              </Card>
              <Card title='动态数据渲染-单选-分页' style={{margin:'10px 0'}}>
                <Table
                    bordered
                    rowSelection = {rowRadioSelection}
                    columns={columns}
                    dataSource={this.state.dataSource1}
                    pagination={this.state.pagination}
                    onRow={(record,index) => {
                        return {
                          onClick: ()=> { // 点击行
                            this.onRowClick(record,index)
                          },       
                        };
                      }}
                />
              </Card>
              <Card title='动态数据渲染-复选-分页' style={{margin:'10px 0'}}>
                <Table
                    bordered
                    rowSelection = {rowCheckSelection}
                    columns={columns}
                    dataSource={this.state.dataSource1}
                    pagination={false}        
                />
                <Button style={{marginTop:'10px'}} onClick={this.handleDelete}>删除</Button>
              </Card>
          </div>  
        )
    }                                                               
}