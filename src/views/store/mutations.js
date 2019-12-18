/*
直接更新state的多个方法的对象
 */
import {RECEIVE_BTN_LIST} from './mutation_types'
export default {
  [RECEIVE_BTN_LIST](state,{newBtnList}){
    state.newBtnList = newBtnList
  },
}
