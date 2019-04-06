import React from 'react';
import 'antd/dist/antd.css'
import { Row,Col } from 'antd'
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
// import Home from './pages/home';

import './style/component.css'
// class Admin extends Component {
//   render() {
//     return (
//       <div className="App">
       
//       </div>
//     );
//   }
// }
// export default Admin;
export default class Admin extends React.Component{
  render(){
     return (
       <Row className = "container">
          <Col span={3} className="nav-left">
             <NavLeft/>
          </Col>
          <Col span={21} className="main">
              <Header/>
              <Row className='content'>   
                  {/* <Home></Home> */}
                  {this.props.children}
              </Row>
              <Footer/>
          </Col>
       </Row>
     )
  }
}