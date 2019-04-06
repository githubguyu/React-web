import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom' 
import App from './App'
import Admin from './Admin' 
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import Nomatch from './pages/nomatch'
import Home from './pages/home'
import FormLogin from './pages/form/login'
import Register from './pages/form/register'
import Modals from './pages/ui/modals'
import BasicsTable from './pages/table/basicsTable'
import SenoirTable from './pages/table/seniorTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import Jurisdition from './pages/jurisdictios'
import GetInto from './logout/login'
export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                   <Switch>
                        <Route path='/getinto' component={GetInto}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={()=>
                            <Common> 
                                 <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        }/>
                        <Route path="/"  render={()=>
                                <Admin>

                                    <Switch>   
                                         {/* 完全匹配 exact  */}
                                        <Route path="/" exact component={Home}/>                                     
                                        <Route path="/home" component={Home}/>
                                        <Route path="/ui/buttons" component={Buttons}/>
                                        <Route path="/ui/modals" component={Modals}/>
                                        <Route path="/form/login" component={FormLogin}/>
                                        <Route path="/form/reg" component={Register}/>
                                        <Route path="/table/basic" component={BasicsTable}/>
                                        <Route path="/table/high" component={SenoirTable}/>
                                        <Route path="/city" component={City}/> 
                                        <Route path="/order" component={Order}/>  
                                        <Route path="/user" component={User}/>     
                                        <Route path="/permission" component={Jurisdition}/>                                  
                                        <Route  component={Nomatch}/>       
                                    </Switch>
                                </Admin>
                                
                        } />
                        <Route path="/order/detail" component={Login}/>       
                   </Switch>
                </App>
            </HashRouter>
        );
    }
}