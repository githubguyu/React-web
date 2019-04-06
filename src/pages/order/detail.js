import React from 'react'

import './index.less'

export default class OrderDetail extends React.Component{

    componentWillMount(){
        console.log(this.props)
    }
    componentDidMount(){
        this.mapDetail()
    }

    mapDetail=()=>{
        var mp = new window.BMap.Map("mapDetail");
        mp.centerAndZoom(new window.BMap.Point(116.3964,39.9093), 10);
        mp.enableScrollWheelZoom();
    }
    render(){
        return(
            <div className='detail_order'>
                <div id='mapDetail' style={{height:400}}></div>
            </div>
        )
    }
}