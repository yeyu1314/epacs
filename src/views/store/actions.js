/*
通过mutation间接更新state的多个方法的对象
*/
import {RECEIVE_BTN_LIST} from './mutation_types'
import net from "../../assets/js/public";

export default {
  //记录用户信息
  async recordBtnList({commit , state}){
    const {tableData} = state
    const allBtnArr = []
    const newBtnList = []
    for (let i = 0; i < tableData.length; i++) {
      if(tableData[i].age === '12') {
        allBtnArr.push(
          {type:'primary',label:'编辑',isShow: true, handle:(row)=>this.showEditModal(row)},
          {type:'danger',label:'删除',isShow: false,handle:(that,row)=>this.confirmDel(that,row)},
        )
      }else {
        allBtnArr.push(
          {type:'primary',label:'编辑',isShow: true, handle:(row)=>this.showEditModal(row)},
          {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.confirmDel(that,row)},
        )
      }
    }
    // 封装按钮格式
    let minArr = [] //一维数组（长度为2）
    allBtnArr.forEach((c,index) => {//遍历categorys
      if (minArr.length === 2) {//如果小数组已经满了，创建一个新的
        minArr = []
      }
      if(minArr.length === 0) {//如果minArr是空的，将小数组保存到大数组中
        newBtnList.push({
          id : index / 2 +1,
          btnList : minArr
        })
      }
      minArr.push(c)//将当前分类保存到小数组中
    })
    console.log("newBtnList",newBtnList)

    /*const newBtnList = [
        {id:1,btnList:[
            {type:'primary',label:'编辑',isShow: true, handle:()=>this.showEditModal()},
            {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.confirmDel(row) }
            ]},
        {id:2,btnList:[
            {type:'primary',label:'编辑',isShow: true, handle:(that,index)=>this.showEditModal(that,index)},
            {type:'danger',label:'删除',isShow: false,handle:(that,row)=>this.confirmDel(row) }
            ]},
        {id:3,btnList:[
            {type:'primary',label:'编辑',isShow: false, handle:(that,index)=>this.showEditModal(that,index)},
            {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.confirmDel(row) }
            ]},
        ]*/
    commit(RECEIVE_BTN_LIST, {newBtnList})
  },

  async getlistData ({commit , state}){
    net
      .request("admin/order/queryListPage", "post", param, data)
      .then(res => {
        if (res.retcode == 1) {
          this.listData = res.data.rows;
          this.total = res.data.total;
        } else {
          net.message(this, "获取数据失败", "warning");
        }
        console.log(res);
      });
  },

}
