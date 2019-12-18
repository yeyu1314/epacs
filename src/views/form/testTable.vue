<!--
<template>
    <table-template
        :tableData="tableData"
        :tableColumns="tableColumns"
        :selectionShow="false"
        :selectColumns="false"
        :tableOperationShow="true"
    ></table-template>
</template>

<script>
    import tableTemplate from "./compomentTable"
  export default {
    name: "testTable",
    components : {
      tableTemplate
    },
    data () {
      return {
        tableColumns: [
          {
            key: "company",
            title: "企业",
            width: "150",
            isShow: true // 控制当前列是否显示
          },
          {
            key: "networkAccessRate",
            title: "入网率",
            width: "150",
            isShow: true
          },
          {
            key: "networkAccessScore",
            title: "入网率得分",
            width: "150",
            isShow: true
          },
          {
            key: "onlineRate",
            title: "上线率",
            width: "150",
            isShow: true
          },
          {
            key: "onlineScore",
            title: "上线率得分",
            width: "150",
            isShow: true
          },
          {
            key: "trackIntegrityRate",
            title: "轨迹完整率",
            width: "150",
            isShow: true
          }
        ],
        tableData: [
          {company : 'a',networkAccessRate:'b',networkAccessScore:'c',onlineRate:'d',onlineScore:'e',trackIntegrityRate:'f',},
          {company : 'a',networkAccessRate:'b',networkAccessScore:'c',onlineRate:'d',onlineScore:'e',trackIntegrityRate:'f',},
        ]
      }
    }
  };
</script>

<style scoped>

</style>
-->

<!--

<template>
    <div class="table-page">
        <i-table
            :list="list"
             @handleSelectionChange="handleSelectionChange"
             @sizeChange="getSizeChange"
             @currentPage="getCurrentPage"
             :options="options"
             :columns="columns"
             :operates="operates"
             :pageShow="page.pageShow"
             :total="page.total"
        >
        </i-table>
    </div>
</template>

<script>
  import iTable  from './compomentTable'    //引入table组件
  export default{
    data(){
      return{
         page:{   //关于页码的相关参数
         pageShow:true,  //是否显示
          total:0,        //总条数
          pageSize:10,    //每页条数
          pageNo:1,       //第几页
        },
        handleSelection:[],  //checkbox选中行
        // list:[],// table数据
        options: {  // table样式参数
          stripe: false, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: true, // 是否支持列表项选中功能
        }, // table 的参数结束
        columns: [
          {  // 需要展示的列开始
              prop: 'typeName',
              label: '设备类型',
              align: 'center',
              isShow:true,
              formatter: (row, column, cellValue) => {   //formatter重构
                return `返回参数`
              }
            },
          {
            prop: 'model',
            label: '设备名称',
            align: 'center',
            isShow:true
          },
          {
            prop: 'company',
            label: '厂商',
            align: 'center',
            isShow:true
          }
        ],// 需要展示的列结束
        operates: {   //操作栏
          width:400,
          fixed: 'right',
          list: [
            {
              id:'1',
              label: '编辑',
              show: true,   //是否显示按钮
              className:'searchAll', //样式类名
              disabled: false,   //是否禁用按钮 默认是danger的禁用样式
              method: (index, row) => {
                this.handleEdit(index, row)
              }
            }, {
              id:'2',
              label: '删除',
              show: true,
              className:'searchAll',
              disabled: true,
              method: (index, row) => {
                this.handledel(index, row)
              }
            }
          ]
        }, // 列操作按钮
        list : [
          {typeName:'宝马'}
        ]

      } //return ending
    },
    methods:{
      handleSelectionChange (val) { //checkbox选中的数据val 是选中行的所有数组
        this.handleSelection=val;
      },
      getSizeChange(val){  //table组件发射的方法 用于改变每页数据量
        this.page.pageSize=val;
        //这下面需要重新调用 获取列表页的函数

      },
      getCurrentPage(val){  //table组件发射的方法  用于改变当前所在页码
        this.page.pageNo=val;
        //这下面需要重新调用 获取列表页的函数

      },
      handleEdit (index, row) {  //操作栏编辑按钮
        console.log(' index:', index)
        console.log(' row:', row)
      },
      handledel(index, row) {  //操作栏删除按钮
        console.log(' index:', index)
        console.log(' row:', row)
      },
    },
    components:{
      iTable
    },
    created(){
      //调用获取列表页的方法
    }
  }

</script>

-->


<!--
<template>
    <i-table
            :dataSource="dataSource"
            @selection-change="handleSelectionChange"
            @review="handleReview"
    >
    </i-table>
</template>
<script>
  import iTable  from './compomentTable'    //引入table组件
  export default{
    components:{
      iTable
    },
    data(){
      return {
        dataSource: {
          data: [], // 表格数据
            cols: [
              {
                label: '仓库',
                prop: 'warehouseName',
                isTemplate: true
              },
              {
                label: '包裹号',
                prop: 'packageNum',
                width: '150'
              },
              {
                label: '订单类型',
                prop: 'orderType',
                isCodeTableFormatter: true,
              },
              {
                label: '订单号',
                prop: 'waybillNum',
                width: '150'
              },
              {
                label: '邮寄方式',
                prop: 'mailingMethod',
              }, {
                label: '商品数',
                prop: 'numberOfPackages',
              }, {
                label: '包装人',
                prop: 'packagesUserName',
              }, {
                label: '包装时间',
                prop: 'packagesTime',
                width: '160'
              }
            ], // 表格的列数据
            isSelection: true, // 表格有多选时设置
            isOperation: true, // 表格有操作列时设置
            isIndex: true, // 列表序号
            loading: false, // loading
            operation: {
            // 表格有操作列时设置
            label: "操作", // 列名
              width: "80", // 根据实际情况给宽度
              data: [
              {
                label: "查看", // 操作名称
                emitType: "review", // 触发父组件
                permission: "如URL" // 后期这个操作的权限，用来控制权限
              }
            ]
          }
        }
      }
    }
  }
</script>
-->




<template>
    <div class="ces-main">
        <!--<span>{{tableCols}}</span>-->
        <search-form
            size='medium '
            labelWidth = '80px'
            :searchData = "searchData"
            :searchForm = "searchForm"
            :searchHandle="searchHandle">
        </search-form>
        <ces-table
                :that='that'
                size='medium '
                :isSelection='true'
                :isIndex='true'
                :isHandle='true'
                :tableData='tableData'
                :tableCols='tableCols'
                :newBtnList="newBtnList"
                :isPagination='true'
                :tablePage='pagination'
                @CurrentChange = 'CurrentChange'
                @SizeChange = 'SizeChange'
                :bigData="bigData"
        >
        </ces-table>
        <operating-record
                :that='that'
                :redordData='redordData'
                :redordCols='redordCols'
                :isShowRecord="isShowRecord"
                @closeTip="closeTip"
        >

        </operating-record>
        <edit-form
                :that="that"
                :editCfg="editCfg"
                :editData="editData"
                :editRules="editRules"
                :showEdit = "showEdit"
                @closeTip="closeTip"
                :title="title"
                @handleSubmit="handleSubmit"
        >

        </edit-form>
    </div>
</template>

<script>
  import net from "../../assets/js/public";
  import {mapState,mapActions} from 'vuex'
  import SearchForm from './searchForm'
  import cesTable from './compomentTable'
  import operatingRecord from './operatingRecord'
  import editForm from './editForm'
  import moment from 'moment'
  export default {
    data () {
      let checkTypes=[{label:'全部',value:'0'},{label:'检测',value:'1'},{label:'治疗',value:'2'},{label:'检测+治疗',value:'3'}]
      let checkTypeProps={label:'label',value:'value'}
      return {
        that : this,
        msg:'你好 /n 你好',
        // 查询表单
        searchData:{
          carNumber:null,
          carMsg:null,
          station:null,
          checkType:null
        },
        searchForm:[//搜索栏
          {type:'Input',prop:'carNumber',width:'180px',placeholder:'请输入车牌'},
          {type:'Input',prop:'carMsg',width:'180px',placeholder:'请输入车系'},
          {type:'Input',prop:'station',width:'180px',placeholder:'请输入维修站'},
          {type:'Select',prop:'checkType',width:'180px',options:checkTypes,props:checkTypeProps,change:row=>this.selectCheckType(row),placeholder:'请选择业务类型'},
        ],
        searchHandle:[//搜索按钮
          {label:'查询',icon:"el-icon-search",type:'primary',handle:()=>this.searchNews()},
        ],


        tableData : [],// 表格数据
        newBtnList:[],// 按钮列表
        tableCols:[// 表头
          // {label:'姓名',type:'bigData'},
          {label:'车牌',prop:'carNumber'},
          {label:'车辆信息',prop:'carMsg'},
          {label:'下单时间',prop:'inputTime'},
          {label:'业务类型',prop:'checkType'},
          {label:'故障描述',prop:'note'},
          {label:'发动机数量',prop:'carCylinder'},
          {label:'操作记录',type:'Button',btnList:[
              {type:'success',label:'查看',handle:(row,that)=>this.showRecord(row,that)},
            ]},
          {label:'操作',type:'button',}
        ],
        bigData : [
          {name : 'a'},
          {name : 'b'},
          {name : 'c'}
        ],
        pagination:{
          pageSize:10,
          pageNum:1,
          total:110
        },
        orderPageShowOrgName : false,
        pageNo: 1,
        pageSize: 10,
        page: this.$route.params,
        redordCols : [
          {label:'操作人',prop:'userName'},
          {label:'操作内容',prop:'remarks'},
          {label:'操作时间',prop:'inputTime'},
        ],
        redordData : [
          {id:1,userName:'张三',remarks:'12',inputTime:'男'},
          {id:2,userName:'筱华',remarks:'27',inputTime:'女'},
          {id:3,userName:'张三',remarks:'12',inputTime:'男'},
        ],
        isShowRecord : false,//操作记录弹窗
        editCfg:[
          {label:'车牌',prop:'carNumber',type:'input',width:'280px'},
          {label:'车系',prop:'carMsg',type:'input',width:'280px'},
          {label:'维修站',prop:'station',type:'input',width:'280px'},
          {label:'下单时间',prop:'inputTime',type:'dateTime',width:'280px'},
          {label:'业务类型',prop:'checkType',type:'select',options:checkTypes,props:checkTypeProps,width:'280px'}
        ],
        editData:{
          carNumber:null,
          carMsg:null,
          station:null,
          checkType:null,
          inputTime : null
        },
        editRules:{
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ]
        },
        title : '',
        showEdit : false,//form弹窗
      }
    },
    components:{
      cesTable,
      SearchForm,
      operatingRecord,
      editForm,
    },
    methods : {
      showEditModal (row,that) {// 编辑
        console.log("点击了编辑",row,that)
      },
      showDelModal (that,row) {//删除
        console.log("点击了删除",row)
      },
      selectCheckType (row) {//类型下拉框
        console.log(row)
      },
      showRecord (row,that) {
        console.log("显示操作记录",row,that)
        // this.isShowRecord = true

        this.editData = {// 给弹窗赋值
          carNumber:that.carNumber,
          carMsg:that.carMsg,
          station:that.note,
          checkType:that.checkType,
          inputTime : that.inputTime
        }


        this.title = '车辆信息'
        this.showEdit = true
      },
      closeTip() {
        console.log("关闭弹窗")
        this.isShowRecord = false
        this.showEdit = false
        this.editData = {}      // 清空编辑弹窗
      },
      handleSubmit(){
        const aaa = this.editData
        console.log('点击了确定',aaa)
      },

    // 获取表格数据
      getlistData(param, data) {
        net
          .request("admin/order/queryListPage", "post", param, data)
          .then(res => {
            if (res.retcode == 1) {
              // this.listData = res.data.rows;
              // this.pagination.total = res.data.total;
              const pagination = {
                pageSize : res.data.pageSize,
                pageNum : res.data.pageNo,
                total : res.data.total,
              }
              this.pagination = pagination
            } else {
              net.message(this, "获取数据失败", "warning");
            }
            // console.log(res);
            const arr = []
            const data = res.data.rows
            console.log(data)
            for (let i = 0; i< data.length; i++){
              arr.push({
                id:i +1,
                carNumber:data[i].carNumber,
                carMsg:data[i].factoryName,
                inputTime:moment(data[i].inputTime).format('YYYY-MM-DD HH:MM'),
                checkType:data[i].checkType === 1 ? '检测' : (data[i].checkType === 3 ? '治疗+检测' : '治疗'),
                note:data[i].note,
                carCylinder:data[i].carCylinder,
                }
              )
            }
            this.tableData = arr

            // 按钮的显示隐藏
            const allBtnArr = []
            const newBtnList = []// 二维数组
            for (let i = 0; i < arr.length; i++) {
              if(arr[i].carCylinder === 4) {// 控制显示隐藏的条件
                allBtnArr.push(
                  {type:'primary',label:'编辑',isShow: true, handle:(row,that)=>this.showEditModal(row,that)},
                  {type:'danger',label:'删除',isShow: false},
                  // {type:'info',label:'操作记录',isShow: true, handle:(row,that)=>this.showRecord(row,that)},
                )
              }else {
                allBtnArr.push(
                  {type:'primary',label:'编辑',isShow: true, handle:(row,that)=>this.showEditModal(row,that)},
                  {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.showDelModal(that,row)},
                  // {type:'info',label:'操作记录',isShow: true, handle:(row,that)=>this.showRecord(row,that)},
                )
              }
            }
            // 封装按钮格式
            let minArr = [] //一维数组（长度为2）
            allBtnArr.forEach((c,index) => {//遍历categorys
              if (minArr.length === 2) {//如果小数组已经满了，创建一个新的  （两个为一组）
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
            this.newBtnList = newBtnList

          });
      },

    //翻页
      CurrentChange(val){
        console.log(val)
      },
      //选择 每页显示数量
      SizeChange(val){
        console.log(val)
      },
      //查询
      searchNews(){
        const carNumber = this.searchData.carNumber
        const carMsg = this.searchData.carMsg
        const station = this.searchData.station
        const checkType = this.searchData.checkType
        console.log(carNumber,carMsg,station,checkType)
      }

    },
    created () {
      // this.$store.dispatch('recordBtnList')//提交一个事件
      const signInfo = JSON.parse(sessionStorage.getItem("signInfo"));
      this.orderPageShowOrgName = signInfo.orgId == 0;
      let flag = localStorage.getItem("orgSearch");
      if (flag) {
        this.orgSearch = flag;
      }
      if (this.page.pageNo == undefined) {
        this.getlistData(
          { pageNo: this.pageNo, pageSize: this.pageSize },
          { type: 9, orgName: flag ? localStorage.getItem("orgSearch") : "" }
        );
      } else {
        this.getlistData(
          { pageNo: this.page.pageNo, pageSize: this.page.pageSize },
          {
            type: 9,
            carNumber: this.page.carNumber,
            orgName: flag ? localStorage.getItem("orgSearch") : ""
          }
        );
      }

    },
    computed : {
      // ...mapState(['tableData','newBtnList']), //读数据
    },
  }


</script>

<style>

</style>


<!--

<template>
    <div class="app-container calendar-list-container">
        <el-row>
            <el-col :span="24">
                <div>
                    <tabletext :list="list" @handleSelectionChange="handleSelectionChange" :options="options"
                               :columns="columns" :operates="operates">
                    </tabletext>
                    <div class="pagination-container">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
                                       :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
                                       :total="total"> </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import tabletext from './compomentTable';
  // import { page } from 'api/dl/meter/index';
  export default {
    name: 'table1',
    components: {
      tabletext
    },
    computed: {},
    data() {
      return {
        list: [
          {meterid:11,title:'名称'},
          {meterid:11,title:'名称'},
          {meterid:11,title:'名称'},
        ], // table数据
        listQuery: {
          page: 1,
          limit: 20,
          systemname: undefined
        },
        total: null,
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false, // 是否支持列表项选中功能
        }, // table 的参数
        columns: [
          {
            prop: 'meterid',
            label: '电表ID',
            align: 'center',
          }, {
            prop: 'title',
            label: '电表名称',
            align: 'center',
            // formatter: (row, column, cellValue) => {
            //   console.log(row.isenable)
            //   console.log(row)
            //   return `<span style="white-space: nowrap;color: dodgerblue;">${row.metername}</span>`
            // }
          },{
            prop: 'meteraddress',
            label: '电表地址',
            align: 'center',
          }, {
            prop: 'magnification',
            label: '倍率',
            align: 'center',
          },{
            prop: 'manufacturer',
            label: '厂家',
            align: 'center',
          },{
            prop: 'metermodel',
            label: '型号',
            align: 'center',
          },{
            prop: 'meterrule',
            label: '规约',
            align: 'center',
          },{
            prop: 'cabinetnum',
            label: '柜号',
            align: 'center',
          },{
            prop: 'remark',
            label: '备注',
            align: 'center',
          },{
            prop: 'isenable',
            label: '是否有效',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.isenable === '1' ? '是' : params.row.isenable === '2' ? '否' : '')
            }
          },
        ], // 需要展示的列
        // 按钮
        operates: {
          width: 150,
          list: [
            {
              id: '1',
              label: '编辑',
              style: 'cursor:pointer;color: #409eff;',
              show: true,
              class: 'el-icon-edit',
              plain: true,
              method: (scope, row) => {
                console.log(scope)
                console.log(row)
                this.handleEdit(row)
              }
            },
            {
              id: '2',
              label: '删除',
              style: 'cursor:pointer;color: #b3450e;',
              class: 'el-icon-delete',
              show: true,
              plain: false,
              method: (index, row) => {
                this.handleDel(index,row)
              }
            }
          ]
        } // 列操作按钮
      }
    },
    created() {
      this.getList();

      const test = [
         {meterid:11,title:'名称',isShowBtn:true},
         {meterid:11,title:'名称',isShowBtn:false},
         {meterid:11,title:'名称',isShowBtn:true},
      ]
      const isShowBtn = [true,false,true];
      for (let i = 0; i<test.length; i++){
        this.operates.list[0].show = test[i].isShowBtn
      }

    },
    methods: {
      // 选中行
      handleSelectionChange(val) {
        console.log('val:', val)
      },
      // 编辑
      handleEdit(index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      },
      // 删除
      handleDel(index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      },

      getList() {
        console.log(this.listQuery)
        // page(this.listQuery).then(response => {
        //   this.list = response.data.rows;
        //   this.total = response.data.total;
        // })
      },
      handleSizeChange(val) {
        console.log(val)
        this.listQuery.limit = val;
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(val)
        this.listQuery.page = val;
        this.getList()
      },
    }
  }
</script>

-->
