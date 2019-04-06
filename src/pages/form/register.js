import React from 'react'
import { Form, Input, Card, Icon, Checkbox,  Button, message, Radio, Upload } from 'antd';
const FormItem = Form.Item
const RadioGroup = Radio.Group 
class Register extends React.Component{
    state = {
        loading: false,
        booleancheckbox: false,
        indeterminate:true
      }; 

     getBase64 =(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
     beforeUpload =(file)=> {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      }

      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }

      handleSubmit =()=>{
        //看不懂
        // let userInfo = this.props.form.getFielValue()
        // console.log(userInfo)
        this.props.form.validateFields((err, values) => {
            if (!err && values.userRead) {
              message.success(`${values.userName}恭喜登陆成功，密码为:${values.password}`)
              message.success('成功')
            }
          });
    }
    
    handleCheckbox =(e)=>{
      this.setState({
        booleancheckbox : e.target.checked
      })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: { span: 6 },
        //     wrapperCol: { span: 14 },
        //   };
          const formItemLayout = {
            labelCol: { sm:24,md:2 },
            wrapperCol: { sm:24,md:20 },
          };
          const offsetLayout = {
            wrapperCol:{
                sm:24,
                md:{
                    span:12,
                    offset:2
                }
            }
        }

          const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
            </div>
          );
          
        return(
            <Card title='注册表单'>
                <Form layout='horizontal'>
                    <Form.Item label='用户名' { ...formItemLayout }>
                        {getFieldDecorator('userName', {
                            initialValue:'',
                            rules: [
                                { required: true, message: '请输入用户名!' },
                                { min:2,max:8 ,message:'最少为2到8个字符' },
                                { pattern:new RegExp('^\\w+$','g') ,message:'用户名必须为英文字母或者数字' }
                        ],
                        })(
                            <Input placeholder="Username" />
                        )}
                    </Form.Item>

                    <Form.Item label='密码' { ...formItemLayout }>
                        {getFieldDecorator('password', {
                            initialValue:'',
                            rules: [
                                { required: true, message: '请输入密码!' },
                                { min:5,max:20 ,message:'密码长度为5-20' },
                                { pattern:new RegExp('^\\w+$','g') ,message:'密码不能包含特殊字符' }
                        ],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>

                    <Form.Item label='性别' { ...formItemLayout }>
                        {getFieldDecorator('sex', {
                            initialValue:'1',  
                            // rules: [{ required: true }]                     
                        })(
                            <RadioGroup>
                               <Radio value='1'>男</Radio>
                               <Radio value='2'>女</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>

                    <FormItem label='头像' { ...formItemLayout }>
                        {
                                    getFieldDecorator('userImg',{
                                        rules:[ { required: true, message: '请上传你的裸照!' } ]
                                    })(          
                       <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={this.state.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} style={{width:128,height:128}} alt="大头贴" /> : uploadButton}
                       </Upload>  
                          )
                        }
                    </FormItem>         
                    
                    <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userRead',{           
                                    rules:[ { required: true, message: '请仔细阅读慕课协议!' } ]
                                })(
                                   <Checkbox checked={this.state.booleancheckbox}
                                             onClick={this.handleCheckbox}
                                     >我已阅读过<a href="baidu.com">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                    </FormItem>    

                </Form>
            </Card>
        );
    }
}
export default Form.create()(Register); 
 
