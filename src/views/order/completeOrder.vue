<template>
  <div>
    <div v-show="showTable">
      <div class="searchContent">
        <el-input placeholder="请输入车牌号" v-model="carPai" clearable></el-input>
        <el-input placeholder="请输入维修站" v-model="orgSearch" clearable @change="orgChange"></el-input>
        <el-input placeholder="请输入车系" v-model="carSeSearch" clearable></el-input>
        <el-select v-model="checkType" placeholder="请选择业务类型" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="检测" value="1"></el-option>
          <el-option label="治疗" value="2"></el-option>
          <el-option label="检测+治疗" value="3"></el-option>
        </el-select>
        <el-button
          type="primary"
          style="background: #009688;margin-left:15px;"
          @click="search"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
      <div>
        <el-table :data="listData" border style="width: 99%">
          <el-table-column prop="carNumber" label="车牌" align="center"></el-table-column>
          <el-table-column label="车辆信息" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.factoryName}}</span>
              <br />
              <span>{{scope.row.seriesName}}</span>
              <br />
              <span>{{scope.row.modelName}}</span>
              <br />
            </template>
          </el-table-column>
          <el-table-column
            prop="inputTime"
            align="center"
            label="下单时间"
            color="#f40"
            :formatter="formartTime"
          ></el-table-column>
          <el-table-column
            prop="orgName"
            align="center"
            label="下单站点"
            v-if="this.orderPageShowOrgName"
          ></el-table-column>
          <el-table-column align="center" label="业务类型">
            <template slot-scope="scope">
              <span>{{scope.row.checkType | type}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" align="center" label="故障描述"></el-table-column>
          <el-table-column prop="carCylinder" align="center" label="发动机缸数量"></el-table-column>
          <el-table-column label="检测报告" align="center" width="125">
            <template slot-scope="scope">
              <el-button
                @click="seeFirstReport(scope.row)"
                type="primary"
                size="small"
                :class="scope.row.step1 == 1 ? 'classB' : 'classA'"
                v-show="(scope.row.jobCode==1000 && scope.row.checkType !=2)|| (scope.row.jobCode==1010 && scope.row.checkType !=2)  || (scope.row.jobCode==1002&& scope.row.checkType !=2) || (scope.row.jobCode==1003&& scope.row.checkType !=2) ||  (scope.row.jobCode==1005&& scope.row.checkType !=2)"
              >查看检测报告</el-button>
            </template>
          </el-table-column>
          <el-table-column label="复查报告" align="center" width="125">
            <template slot-scope="scope">
              <el-button
                @click="seeRecheckReport(scope.row)"
                type="warning"
                size="small"
                :class="scope.row.step2 == 1 ? 'classB' : 'classA'"
                v-show="scope.row.jobCode==1000"
              >查看复查报告</el-button>
              <span v-show="scope.row.jobCode==1010">异常完成无报告</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="125">
            <template slot-scope="scope">
              <el-button
                @click="seeProUse(scope.row)"
                type="success"
                size="small"
                v-show="scope.row.jobCode==1000 || scope.row.jobCode==1010"
              >备注项</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作记录" align="center" width="140">
            <template slot-scope="scope">
              <el-button @click="lockOver(scope.row)" type="success" size="small">查看</el-button>
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
        <span v-show="isUse">暂无产品用料</span>
        <div v-show="!isUse">
          <el-table :data="seeProArr" border style="width: 100%">
            <el-table-column prop="productName" label="产品名" align="center"></el-table-column>
            <el-table-column prop="number" label="数量" align="center"></el-table-column>
          </el-table>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>-->
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible3" width="700px">
        <div style="width:100%">
          <el-table :data="seeArr" height="450" border style="width: 100%">
            <el-table-column prop="userName" label="操作人"></el-table-column>
            <el-table-column prop="remarks" label="操作内容"></el-table-column>
            <el-table-column prop="inputTime" :formatter="dateFormat" label="操作时间"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import net from "../../assets/js/public";
export default {
  data() {
    return {
      orderPageShowOrgName: false,
      listData: [],
      pageNo: 1,
      pageSize: 10,
      total: null,
      dialogVisible: false,
      jobId: "",
      jobCode: "",
      orgId: "",
      showRecheck: false,
      showFirstReport: false,
      showTable: true,
      //参数
      placeData: [],
      carCount: "",
      brandName: "",
      modelName: "",
      fuelTypeName: "",
      mile: "",
      seeProArr: [],
      isUse: false,
      carPai: null,
      orgSearch: null,
      carSeSearch: null,
      checkType: null,
      dialogVisible3: false,
      seeArr: [],
      switchPage: true,
      page: this.$route.params
    };
  },
  created() {
    var signInfo = JSON.parse(sessionStorage.getItem("signInfo"));
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
      return net.dateFormat(row.inputTime, 1);
    },
    orgChange(value) {
      if (value.length == 0) {
        localStorage.removeItem("orgSearch");
      }
    },
    seeProUse(row) {
      this.dialogVisible = true;
      net
        .request("admin/order/queryProductInfoList", "post", {
          jobId: row.jobId
        })
        .then(res => {
          if (res.retcode == 1) {
            var data = res.data.rows;
            var list = [];
            for (var i = 0; i < data.length; i++) {
              if (data[i].number != 0) {
                list.push(data[i]);
              }
            }
            if (list.length == 0) {
              this.isUse = true;
            } else {
              8;
              this.seeProArr = list;
            }
          } else {
            net.message(this, res.retmsg, "warning");
          }
        });
    },
    getlistData(param, data) {
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        {
          type: 9,
          carNumber: this.carPai,
          orgName: this.orgSearch,
          seriesName: this.carSeSearch,
          checkType: this.checkType
        }
      );
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        {
          type: 9,
          carNumber: this.carPai,
          orgName: this.orgSearch,
          seriesName: this.carSeSearch,
          checkType: this.checkType
        }
      );
    },
    // 查看检测报告
    seeFirstReport(row) {
      this.record(row.jobId, 1);
      this.$router.push({
        name: "InitSurvey",
        params: {
          operId: 1,
          row: row,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          carNumber: this.carPai,
          enter: true,
          print: true
        }
      });
    },
    //查看复查报告
    seeRecheckReport(row) {
      this.record(row.jobId, 2);
      this.$router.push({
        name: "recheck",
        params: {
          operId: 2,
          row: row,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          carNumber: this.carPai,

          enter: false
        }
      });
    },
    record(jobId, step) {
      net
        .request("/admin/order/OperationMark", "post", {
          jobId: jobId,
          step: step
        })
        .then(res => {
          console.log(res);
        });
    },
    search() {
      this.pageNo = 1;
      if (this.orgSearch != null && this.orgSearch.length !== 0) {
        localStorage.setItem("orgSearch", this.orgSearch);
      }
      (this.pageSize = 10),
        this.getlistData(
          { pageNo: this.pageNo, pageSize: this.pageSize },
          {
            type: 9,
            carNumber: this.carPai,
            orgName: this.orgSearch,
            seriesName: this.carSeSearch,
            checkType: this.checkType
          }
        );
    },
    //查看记录
    lockOver(row) {
      this.seeArr = [];
      this.dialogVisible3 = true;
      net
        .request("admin/order/queryOrderById", "post", { id: row.jobId })
        .then(res => {
          this.seeArr = res.data.list;
        });
    },
    dateFormat(row) {
      let time = net.dateFormat(row.inputTime);
      return time;
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
.classA {
  background: #009688;
}
.classB {
  background: #909399;
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
.seeRecheck {
  width: 800px;
  margin: 0 auto;
  .operBtn {
    display: flex;
    width: 100%;
  }
  .contentBody {
    .onlodList {
      width: 80%;
      margin: 0 auto 0;
      padding: 5px 0;
      max-height: 450px;
      overflow-y: scroll;
      .perform {
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #bfbfbf;
        display: flex;
        flex-direction: row;
        .left {
          width: 29%;
          height: 100%;
          border-right: 1px solid #bfbfbf;
          line-height: 150px;
        }
        .right {
          width: 70%;
          height: 100%;
        }
      }
    }
  }
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #009688;
}
</style>

