<template>
  <div>
    <div class="searchContent">
      <el-input placeholder="请输入车牌号" v-model="carPai" clearable></el-input>
      <el-button
        type="primary"
        style="background: #009688;"
        @click="search"
        icon="el-icon-search"
      >搜索</el-button>
    </div>
    <div>
      <el-table :data="listData" border style="width: 99%">
        <el-table-column prop="carNumber" label="车牌" align="center"></el-table-column>
        <el-table-column label="车辆信息" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.factoryName}}</span><br/>
            <span>{{scope.row.seriesName}}</span><br/>
            <span>{{scope.row.modelName}}</span><br/>
          </template>
        </el-table-column>
        <el-table-column prop="inputTime" align="center" label="下单时间" color="#f40" :formatter="formartTime">
        </el-table-column>
        <el-table-column prop="orgName" align="center" label="下单站点" v-if="this.orderPageShowOrgName"></el-table-column>
        <el-table-column align="center" label="业务类型">
          <template slot-scope="scope">
            <span>{{scope.row.checkType | type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="note" align="center" label="故障描述"></el-table-column>
        <el-table-column prop="carCylinder" align="center" label="发动机缸数量"></el-table-column>
        <el-table-column prop="avgValue" fixed="right" label="报告解读" align="center" width="280">
          <!--<template slot-scope="scope">
            <div v-if="isShowPdf == 3">
              <el-button type="success" size="small">报告解读</el-button>
              <el-button type="success" size="small">车主答疑</el-button>
            </div>
            <div v-if="isShowPdf == 2">
              <el-button type="success" size="small">报告解读</el-button>
            </div>
          </template>-->
          <template slot-scope="scope">
            <div v-if="scope.row.avgValue == 3">
              <el-button type="success" size="small" @click="viewPdf30">报告解读</el-button>
              <el-button type="success" size="small">车主答疑</el-button>
            </div>
            <div v-if="scope.row.avgValue == 2">
              <el-button type="success" size="small" @click="viewPdf30">报告解读</el-button>
            </div>
            <div v-if="scope.row.avgValue == 0"></div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="280">
          <template slot-scope="scope">
            <el-button
              @click="start(scope.row)"
              type="success"
              style="background: #009688;"
              size="small"
            >是否接受治疗</el-button>
            <el-button
              @click="seeFirstReport(scope.row)"
              type="success"
              style="background: #009688;"
              size="small"
            >打印检测报告</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="冻结" align="center" width="100">
          <template slot-scope="scope">
            <el-button @click="frozen(scope.row)" type="danger" size="small">冻结工单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="40%">
      <span>当前订单检测已完成，车主是否接受治疗？</span>
      <br />
      <br />
      <div class="selectType" style="text-align:left;margin-left:10%">
        <p>治疗项目</p>
        <br />
        <el-checkbox-group v-model="step2Type2OptionList" @change="handleStep2Type2OptionList">
          <el-checkbox :label="0">动力康复</el-checkbox>
          <el-checkbox :label="1">缸内修复</el-checkbox>
          <el-checkbox :label="2">烧机油治理</el-checkbox>
        </el-checkbox-group>
      </div>
      <br />
      <div style="text-align:left;margin-left:10%">
        <span style="color:#f40">注意:</span>
        <br />
        <span
          style="color:#f40"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;治疗项目已经调整,请注意根据实际情况进行选择</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" style="color:red">*不治疗*</el-button>
        <el-button type="primary" @click="ensure">接受治疗</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import net from "../../assets/js/public";
import PDF from './pdf';
import Vue from 'vue'
export default {
  components: {PDF},
  data() {
    return {
      orderPageShowOrgName:false,
      listData: [],
      pageNo: 1,
      pageSize: 10,
      total: null,
      dialogVisible: false,
      step2Type2OptionList: [0],
      jobId: "",
      orgId: "",
      version: "",
      //查询
      carPai: null,
      page: this.$route.params,
      isShowPdf : 3
    };
  },
  created() {
    var signInfo = JSON.parse(sessionStorage.getItem("signInfo"));
    this.orderPageShowOrgName = signInfo.orgId==0;
    if (this.page.pageNo == undefined) {
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { type: 5 }
      );
    } else {
      this.getlistData(
        { pageNo: this.page.pageNo, pageSize: this.page.pageSize },
        { type: 5, carNumber: this.page.carNumber }
      );
      this.pageSize = this.page.pageSize;
      this.pageNo = this.page.pageNo;
      this.carPai = this.page.carNumber;
    }
  },
  filters: {
    type(d) {
      var arr = ["", "检测", "治疗", "检测+治疗"];
      return arr[d];
    }
  },
  methods: {
    formartTime(row) {
      return net.dateFormat(row.inputTime,1);
    },
    //冻结
    frozen(row) {
      this.$confirm("此操作将冻结此工单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        net
          .request("admin/abnormalOrder/frozenByUser", "post", {
            jobId: row.jobId,
            version: row.version
          })
          .then(res => {
            if (res.retcode == 1) {
              net.message(this, "操作成功", "success");
              this.getlistData(
                { pageNo: this.pageNo, pageSize: this.pageSize },
                { carNumber: this.carPai, type: 5 }
              );
            }
          });
      });
    },
    getlistData(param, data) {
      net
        .request("admin/order/queryListPage", "post", param, data)
        .then(res => {
          if (res.retcode == 1) {
            this.listData = res.data.rows;
            this.total = res.data.total;
            // this.isShowPdf = res.data.rows[i].avgValue
          } else {
            net.message(this, "获取数据失败", "warning");
          }
          console.log(res);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { type: 5 }
      );
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { type: 5 }
      );
    },
    start(row) {
      this.dialogVisible = true;
      this.jobId = row.jobId;
      this.orgId = row.orgId;
      this.version = row.version;
    },
    ensure() {
      net
        .request("admin/order/confirmedTreatment", "post", {
          jobId: this.jobId,
          orgId: this.orgId,
          version: this.version,
          step2Type2OptionList: this.step2Type2OptionList.join(",")
        })
        .then(res => {
          if (res.retcode == 1) {
            net.message(this, res.retmsg, "success");
            var skip = net.isJump("/treatOrder");
            if (skip) {
              this.$router.push({ path: "/treatOrder" });
            } else {
              this.getlistData(
                { pageNo: this.pageNo, pageSize: this.pageSize },
                { carNumber: this.carPai, type: 5 }
              );
            }
          } else {
            net.message(this, res.retmsg, "warning");
          }
        });
    },
    cancel() {
      net
        .request("admin/order/noTreatment", "post", {
          jobId: this.jobId,
          version: this.version
        })
        .then(res => {
          if (res.retcode == 1) {
            net.message(this, res.retmsg, "success");
            this.$router.push({ path: "/completeOrder" });
          } else {
            net.message(this, res.retmsg, "warning");
          }
        });
    },
    // 查看检测报告
    seeFirstReport(row) {
      this.$router.push({
        name: "InitSurvey",
        params: {
          operId: 2,
          row: row,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          carNumber: this.carPai,
          enter: false,
          print: true
        }
      });
    },
    handleClose() {},
    search() {
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { type: 5, carNumber: this.carPai }
      );
    },
    handleStep2Type2OptionList(value) {
      if (value.indexOf(0) == -1) {
        net.message(this, "治疗项目必须包含动力康复", "warning");
        value.push(0);
      }
    },
    viewPdf30 (){
      // const pdf = 'http://120.24.178.4/30.pdf';
      // window.open(pdf, 'PDF');
      // window.location.href = pdf
      window.location.href = 'http://120.24.178.4/30.pdf'
    }
  }
};
</script>
<style lang='less' scoped>
.searchContent {
  margin: 10px 0 20px 0;
  display: flex;
  flex-direction: row;
  .el-input--suffix {
    width: 200px;
    margin-right: 20px;
  }
}
.pagination {
  position: relative;
  margin-top: 20px;
  .el-pagination {
    position: absolute;
    left: 0px;
    .el-pager li:not(.disabled) {
      .active {
        background: #009688 !important;
      }
    }
  }
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #009688;
}
</style>

