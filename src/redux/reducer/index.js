import { type } from "./../action";

// Reducer 数据处理

// const initialState = {
//     menuName:'首页'
// }
const ebiKeData = ( state,action ) =>{
    switch(action.type){
        case type.SWITCH_MENU:
              return {
                  ...state,
                  menuName:action.menuName
              };
          default:
              return { ...state};      
    }
}
export default ebiKeData;