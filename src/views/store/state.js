/*
  状态管理对象
*/
let checkTypes=[{label:'全部',value:'0'},{label:'检测',value:'1'},{label:'治疗',value:'2'},{label:'检测+治疗',value:'3'}]
let checkTypeProps={label:'label',value:'value'}

export default {

  searchData:{// 查询表单
    carNumber:null,
    carMsg:null,
    station:null,
    checkType:null
  },
  searchForm:[//搜索栏
    {type:'Input',prop:'carNumber',width:'180px',placeholder:'请输入车牌'},
    {type:'Input',prop:'carMsg',width:'180px',placeholder:'请输入车系'},
    {type:'Input',prop:'station',width:'180px',placeholder:'请输入维修站'},
    {type:'Select',prop:'checkType',width:'180px',options:checkTypes,props:checkTypeProps,placeholder:'请选择业务类型'},
  ],
  editCfg:[// 编辑form表单
    {label:'车牌',prop:'carNumber',type:'input',width:'280px'},
    {label:'车系',prop:'carMsg',type:'input',width:'280px'},
    {label:'维修站',prop:'station',type:'input',width:'280px'},
    {label:'下单时间',prop:'inputTime',type:'dateTime',width:'280px'},
    {label:'业务类型',prop:'checkType',type:'select',options:checkTypes,props:checkTypeProps,width:'280px'}
  ],
  editData:{// 编辑form数据
    carNumber:null,
    carMsg:null,
    station:null,
    checkType:null,
    inputTime : null
  },
  redordCols : [//操作记录表头
    {label:'操作人',prop:'userName'},
    {label:'操作内容',prop:'remarks'},
    {label:'操作时间',prop:'inputTime'},
  ],


  // demo
  that : this,
  tableColsDemo: [
    {label:'车牌',prop:'carNumber'},
    {label:'车辆信息',type:'longData'},
    {label:'下单时间',prop:'inputTime'},
    {label:'业务类型',prop:'checkType'},
    {label:'故障描述',prop:'note'},
    {label:'发动机数量',prop:'carCylinder'},
    {label:'检测报告',type:'checkButton',},
    {label:'复查报告',type:'reviewButton',},
    {label:'备注',type:'remarkButton',},
    {label:'操作记录',type:'Button',btnList:[
        {type:'success',label:'查看',handle:(row,that)=>this.showRecord(row,that)},
      ]},
  ],
  tableDataDemo : [],
  newBtnListDemo : [],
  paginationDemo : {pageSize:10,pageNum:1,total:10},
  longDatasDemo : [],
  checkButtonListDemo : [],
  reviewButtonListDemo : [],
  remarkButtonListDemo : [],

}
