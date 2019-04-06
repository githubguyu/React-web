import JSONP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import Utils from './../utils/utils'
export default class AXios{
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JSONP(options.url,{
                param:'callback'
            },function(err,respones){            
                if(!err){
                    resolve(respones)
                }else{
                    reject(err)
                }
            })
        })
    }
    //封装axios
    static ajax(options){
    //loading拦截
        let loading;
        if(options.data && options.data.inShowLoading !== false){
            loading = document.getElementById('ajaxLoading')
            loading.style.display= 'block'
        }

        let baseApi = 'https://easy-mock.com/mock/5c78fa7c05b5281aae96e57f/mockapi'
        // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                let res = response.data
                //loading
                if(options.data && options.data.inShowLoading !== false){
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display= 'none'
                }
                if(response.status === 200){
                    
                    if(res.code === 0 ){
                        resolve(res)
                    }else{
                        Modal.error({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(res)
                }
            })
            // .catch(error => {
            //     //超时之后在这里捕抓错误信息.
            //     if (error.response) {
            //         console.log('error.response')
            //         console.log(error.response);
            //     } else if (error.request) {
            //         console.log(error.request)
            //         console.log('error.request')
            //         if(error.request.readyState == 4 && error.request.status == 0){
            //             //我在这里重新请求
            //         }
            //     } else {
            //         console.log('Error', error.message);
            //     }
            //     console.log(error.config);
            // })
        })
    }  
    static requestList (_this,url,params){
        var data = {
            params:params
        }
        this.ajax({
            data,
            url
        }).then((data)=>{
            if( data && data.result ){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list:list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            } 
        })
    }
}