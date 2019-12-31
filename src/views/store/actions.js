/*
通过mutation间接更新state的多个方法的对象
*/
import {UPDATE_LIST} from './mutation_types'
import net from "../../assets/js/public";
import {getlistData,getOpaction,getRemarkData} from '../../api/index'

export default {
  //异步获取地址
  async getData({commit, state}) {
    const result = await getlistData(
      { pageNo:1, pageSize:10 },
      {
        type: 9,
        carNumber: '',
        orgName: '',
        seriesName: '',
        checkType: '',
      }
    )
    console.log(state)
    if(result.retcode === 1){//判断结果是否正确
      const listData = result.data
      const  showCheckReport = function(jobId){
        console.log("显示初检报告==》"+jobId)
      }
      const  showRemarkDemo = function(row,that){
        console.log("备注11==》"+row)
        console.log("备注22==》"+that)
      }


      commit(UPDATE_LIST, {listData,showCheckReport,showRemarkDemo})//提交一个mutation

    }
  },

  // async getRecord({commit, state}){
  //   const result = await getOpaction(
  //     {id:1}
  //   )
  // }

}
