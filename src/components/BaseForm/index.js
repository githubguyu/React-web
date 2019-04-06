import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../utils/utils'
const FormItem = Form.Item
//可以实现数据的双向绑定
class FilterForm extends React.Component{
    //查询
    handleFilterSubmit =()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    //重置
    reset = ()=>{
        this.props.form.resetFields();
    }
    initFormList =()=>{
        const { getFieldDecorator } = this.props.form;
        const fromList = this.props.formList;
        const fromItemList = []
        if( fromList && fromList.length > 0 ){
            fromList.forEach((item) => {
                let label = item.label;
                let field = item.field;
                let placeholder = item.placeholder;
                let width = item.width;
                let initialValue = item.initialValue || '';
                if(item.type === 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                         {
                             getFieldDecorator([field],{
                                initialValue:initialValue
                             })(
                                 <Input type='text' placeholder={placeholder}></Input>
                             )
                         }
                        </FormItem>
                        fromItemList.push(INPUT)
                } else if(item.type === 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                           initialValue:initialValue
                        })(
                            <Select
                                style={{width:width}}
                                placeholder={placeholder}
                            >
                                { Utils.getOptionList(item.list) }
                            </Select>
                        )
                    }
                   </FormItem>
                   fromItemList.push(SELECT)
                } else if(item.type === 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            valuePropName:'checked',
                           initialValue:initialValue
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }
                   </FormItem>
                   fromItemList.push(CHECKBOX)
                }else if(item.type === '时间查询'){
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder='请选择开始时间' format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    fromItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder='请选择结束时间' format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    fromItemList.push(end_time)
                }
            });
        }
        return fromItemList
    }
    render(){
        let resetBoolean = this.props.reset
        return(
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    {
                        resetBoolean?<Button onClick={this.reset}>重置</Button>:''
                    }
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm);