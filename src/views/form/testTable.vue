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

</script>-->



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
                :isPagination='true'
                :isHandle='true'
                :tableData='tableData'
                :tableCols='tableCols'
                :pagination='pagination'
        >
        </ces-table>
        <!--<ces-search
                :that='that'
                size='mini'
                labelWidth = '50px'
                :searchData = "searchData"
                :searchForm = "searchForm"
                :searchHandle="searchHandle"></ces-search>
        <ces-table
                :that='that'
                size='mini'
                :isSelection='true'
                :isIndex='true'
                :isPagination='true'
                :isHandle='true'
                :tableData='tableData'
                :tableCols='tableCols'
                :tableHandles='tableHandles'
                :tablePage='tablePage'></ces-table>-->
    </div>
</template>

<script>
  /*import { createNamespacedHelpers } from 'vuex'
  const { mapGetters, mapActions } = createNamespacedHelpers('User')*/
  import {mapState,mapActions} from 'vuex'
  import SearchForm from './searchForm'
  import cesTable from './compomentTable'
  export default {
    data () {

      let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
      let sexProps={label:'label',value:'value'}
      // let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
      // let interstProps={label:'label',value:'value'}
      let btns = [
        {type:'primary',label:'编辑',isShow: true, handle:(that,index)=>this.showEditModal(that,index)},
        {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.confirmDel(row) }
      ]
      let btnProps = {type:'type',label:'label',isShow:'isShow',handle:'handle'}
      return {
        that : this,
        // 查询表单
        searchData:{
          name:null,
          age:null,
          sex:null,
          interst:null
        },
        searchForm:[
          // {type:'Input',label:'姓名',prop:'name',width:'180px',placeholder:'请输入姓名...'},
          {type:'Input',prop:'age',width:'180px',placeholder:'请输入年龄...'},
          {type:'Select',prop:'sex',width:'180px',options:sexs,props:sexProps,change:row=>this.selectSex(row),placeholder:'请选择性别...'},
          // {type:'Checkbox',label:'爱好',width:'180px',prop:'interst',checkboxs:intersts,props:interstProps}
        ],
        btnArr : [
          {type:'button',label:'编辑',isShow: true, handle:(that,index)=>this.showEditModal(that,index)}
        ],
        searchHandle:[
          {label:'查询',icon:"el-icon-search",type:'primary',handle:()=>this.searchNews()},
          // {label:'重置',type:'primary',handle:()=>''}
        ],

        // 表格
        // tableData:[
        //   {name:'张三',age:'12',sex:'男',interst:'女',},
        //   {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        //   {name:'张三',age:'12',sex:'男',interst:'女'},
        //   {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        //   {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        //   {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        //   {name:'筱华',age:'27',sex:'女',interst:'羽毛球'}
        //
        // ],
        tableCols:[
          {label:'姓名',prop:'name'},
          {label:'年龄',prop:'age'},
          {label:'性别',prop:'sex'},
          {label:'爱好',prop:'interst'},
          {label:'操作',type:'button',btnList:[
              // {type:'primary',label:'编辑',handle:(that,row)=>that.showEditModal(row)},
              // {type:'primary',label:'编辑',isShow:state.tableData.showEdit,handle:(that,index)=>this.showEditModal(that,index)},
              {type:'primary',label:'编辑',isShow: true, handle:(that,index)=>this.showEditModal(that,index)},
              {type:'danger',label:'删除',isShow: true,handle:(that,row)=>this.confirmDel(row) }
            ]}
        ],
        // tableHandles:[
        //   {label:'新增',type:'primary',handle:row=>''}
        // ],
        pagination:{
          pageSize:10,
          pageNum:1,
          total:14
        },
      }
    },
    components:{
      cesTable,
      SearchForm
    },
    methods : {
      // ...mapActions(['showEditModal'])
      showEditModal (that,index) {// 编辑
        console.log("点击了编辑",that)
        console.log("点击了编辑",index.id)
        console.log("点击了编辑",that.tableCols)
      },
      confirmDel (row) {
        console.log(row)
      },
      selectSex (row) {
        console.log(row)
        this.yeyu()
      },
      yeyu(){
        const {tableData} = this
        for (let i = 1; i< tableData.length; i++) {
          this.showDel = tableData[i].showDel
          console.log(this.showDel)
        }
      },
    },
    computed : {
      ...mapState(['tableData',]), //读数据
    },
    mounted () {
      // this.$store.dispatch('getDatas')//提交一个事件
    },
  }


/*

  export default {
    data () {
      return {
        that:this
      }
    },
    components:{
      SearchForm,
      cesTable,
    },
    computed:{
      ...mapGetters([
        'searchData','searchForm','searchHandle',
        'loading','tableData','tableCols','tableHandles','tablePage',
        'modalCfg',
        'editForm','editData','editRules'])
    },
    methods:{
      ...mapActions(['init','showEditModal','hideEditModal','getData','resetData','validateAdd','confirmDel','validateEdit'])
    },
    mounted(){
      this.init()
    }
  }
*/

</script>

<style>

</style>
