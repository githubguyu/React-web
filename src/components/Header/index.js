import React from 'react'
import { Row,Col } from 'antd'
import Util from '../../utils/utils'
import axios from '../../axios'
import { connect } from 'react-redux'
import './index.less'

class Admin extends React.Component{
    componentWillMount(){
      this.setState({
        userName : 'Admin'
      })
      setInterval(()=>{
        let sysTime = Util.formateDate(new Date().getTime());
        this.setState({
            sysTime
        })
    },1000)
    this.getWeatherAPIData();
    console.log(this.props)
    }
    getWeatherAPIData(){
      let city = '成都市';
      axios.jsonp({
          url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
      }).then((res)=>{
          if(res.status === 'success'){
              let data = res.results[0].weather_data[0];
              this.setState({
                  dayPictureUrl:data.dayPictureUrl,
                  weather:data.weather
              })
          }
      })
  }
    render(){
      let { menuName, menuType } = this.props
       return (
         <div className='header_box'>
           <Row className='header-top'>
             {
               menuType?
               <Col span={6} className="detail_logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <span>Rain 通用管理系统</span>
               </Col>
               :''
             }           
             <Col span={menuType?18:24}>
                  <span>欢迎，  {this.state.userName}</span>
                  <a href="baidu.com" className='sign_out'>退出</a>
             </Col>
           </Row>
           { 
             menuType?'':
             <Row className='header-buttom'>
             <Col span={4} className="breadcrumb-title">
                { menuName||'首页' }
             </Col>
             <Col span={20} className='weather'>
                <span className='data'>
                    { this.state.sysTime }
                </span>
                <span className="weather-img">
                    <img src={this.state.dayPictureUrl} alt="" />
                </span>
                <span className='weather-detail'>
                    { this.state.weather }
                </span>
             </Col>
           </Row>
           }
         </div>
       )
    }
  }
  const mapStateToProps=(state)=>{
    return {
      menuName:state.menuName
    }
  }
  export default connect (mapStateToProps)(Admin);