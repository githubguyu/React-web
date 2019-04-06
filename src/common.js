import React from 'react'
import Header from './components/Header'
import { Row } from 'antd'

export default class Common extends React.Component{

    render(){
        return(
            <div>
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}
