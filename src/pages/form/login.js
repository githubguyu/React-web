import React from 'react'
import './form.css'
import { Form, Input, Button, Card, Checkbox, Icon, message } from 'antd';
const FormItem = Form.Item
class FormLogin extends React.Component{

    handleSubmit =()=>{
        //看不懂
        // let userInfo = this.props.form.getFielValue()
        // console.log(userInfo)
        this.props.form.validateFields((err, values) => {
            if (!err) {
              message.success(`${values.userName}恭喜登陆成功，密码为:${values.password}`)
            }
          });
    }
 
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
        <div>    
          <Card title='基本表单'>
            <Form layout='inline'>
                <FormItem>
                    <Input placeholder='请输入用户名'/>
                </FormItem>
                <FormItem>
                    <Input placeholder='请输入用密码'/>
                </FormItem>
                <FormItem>
                    <Button type='primary'>登陆</Button>
                </FormItem>
            </Form>
          </Card>
          <Card title='验证表单'>
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        initialValue:'',
                        rules: [
                            { required: true, message: '请输入用户名!' },
                            { min:2,max:8 ,message:'最少为2到8个字符' },
                            { pattern:new RegExp('^\\w+$','g') ,message:'用户名必须为英文字母或者数字' }
                    ],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { min:5,max:20 ,message:'密码长度为5-20' },
                            { pattern:new RegExp('^\\w+$','g') ,message:'密码不能包含特殊字符' }
                    ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('remember', {
                        //记住密码选中状态
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                <a className="login-form-forgot" href="www.baidu.com">忘记密码</a>
              </Form.Item>
              <FormItem>
                    <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                        登陆
                    </Button>
                </FormItem>
            </Form>
         </Card>
        </div>
        );
    }
}
export default Form.create()(FormLogin); 