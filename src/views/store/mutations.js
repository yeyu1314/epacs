/*
直接更新state的多个方法的对象
 */
import {UPDATE_LIST} from './mutation_types'
import moment from "moment"
export default {
  [UPDATE_LIST](state,{listData,showCheckReport,showRemarkDemo}){
    state.paginationDemo = {
      pageNum:listData.pageNo,
      pageSize:listData.pageSize,
      total:listData.total
    };
    const data = listData.rows
    const tableArr = []
    const carMsgArr = []
    for (let i = 0; i< data.length; i++){
      tableArr.push({
        id:i +1,
        carNumber:data[i].carNumber,//车牌
        inputTime:moment(data[i].inputTime).format('YYYY-MM-DD HH:MM'),//下单时间
        checkType:data[i].checkType === 1 ? '检测' : (data[i].checkType === 3 ? '治疗+检测' : '治疗'),//业务类型
        checkTypeId : data[i].checkType,
        note:data[i].note,//故障描述
        carCylinder:data[i].carCylinder,//发动机缸数
        //车辆信息
        factoryName:data[i].factoryName,
        seriesName:data[i].seriesName,
        modelName:data[i].modelName,
        jobCode : data[i].jobCode,
        jobId : data[i].jobId,
        allData : data[i],
      })
      carMsgArr.push({//封装车辆信息格式
        id : i+1,
        note:[
          data[i].factoryName,
          data[i].seriesName,
          data[i].modelName,
        ]
      })
    }
    const checkButtonArr = []
    const checkButtonList = []// 二维数组
    const reviewButtonArr = []
    const reviewButtonList = []
    const remarkButtonArr = []
    const remarkButtonList = []
    console.log(tableArr)
    for (let i = 0; i < tableArr.length; i++) {
      if(tableArr[i].checkTypeId === 1 || tableArr[i].checkTypeId === 3) {// 控制显示隐藏的条件    1---检测 2----治疗  3 ----检测+治疗
        checkButtonArr.push({id:i,jobID:tableArr[i].jobId,type:'primary',label:'查看检测报告',isShow: true,size:'small ',
          handle:(row,jobid)=>{
            console.log("点击了" + jobid,row)
            showCheckReport(jobid,row)
          }
        })
      }else {
        checkButtonArr.push({id:i,type:'primary',label:'查看检测报告',isShow: false,})
      }
      if(tableArr[i].jobCode === 1000){
        reviewButtonArr.push({id:i,type:'warning',label:'查看复查报告',isShow: true, handle:(row,that)=>this.showReview(row,that)})
      }else {
        reviewButtonArr.push({id:i,type:'warning',label:'查看复查报告',isShow: false,} )
      }
      if(tableArr[i].jobCode === 1000 || tableArr[i].jobCode === 1010){
        remarkButtonArr.push({id:i,jobID:tableArr[i].jobId,allData:tableArr[i],type:'success',label:'备注项',isShow: true,
          handle:(row,that)=>{
          console.log(row)
            showRemarkDemo(row,that)
          }
        })
      }else {
        remarkButtonArr.push({id:i,type:'success',label:'备注项',isShow: false,} )
      }
    }
    // 封装按钮格式
    let reviewArr = [] //一维数组（长度为2）
    let checkArr = []
    let remarkArr = []
    checkButtonArr.forEach((c,index) => {
      if (checkArr.length === 1) {//如果小数组已经满了，创建一个新的  （两个为一组）
        checkArr = []
      }
      if(checkArr.length === 0) {//如果minArr是空的，将小数组保存到大数组中
        checkButtonList.push({
          id : index  +1,
          btnList : checkArr
        })
      }
      checkArr.push(c)//将当前分类保存到小数组中
    })
    reviewButtonArr.forEach((c,index) => {
      if (reviewArr.length === 1) {//如果小数组已经满了，创建一个新的  （两个为一组）
        reviewArr = []
      }
      if(reviewArr.length === 0) {//如果minArr是空的，将小数组保存到大数组中
        reviewButtonList.push({
          id : index  +1,
          btnList : reviewArr
        })
      }
      reviewArr.push(c)//将当前分类保存到小数组中
    })
    remarkButtonArr.forEach((c,index) => {
      if (remarkArr.length === 1) {//如果小数组已经满了，创建一个新的  （两个为一组）
        remarkArr = []
      }
      if(remarkArr.length === 0) {//如果minArr是空的，将小数组保存到大数组中
        remarkButtonList.push({
          id : index  +1,
          btnList : remarkArr
        })
      }
      remarkArr.push(c)//将当前分类保存到小数组中
    })

    state.tableDataDemo = tableArr
    state.longDatasDemo = carMsgArr
    state.checkButtonListDemo = checkButtonList
    state.reviewButtonListDemo = reviewButtonList
    state.remarkButtonListDemo = remarkButtonList



  },

}
