<template>
  <div style="height:100%">
    <div class="searchContent">
      <el-input placeholder="请输入车牌号" v-model="carNumber" clearable></el-input>

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
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template slot-scope="scope">
            <div style="display:flex;">
              <el-button
                @click="start(scope.row)"
                type="success"
                style="background: #009688;"
                size="small"
              >开始检测</el-button>
              <el-button @click="frozen(scope.row)" type="danger" size="small">冻结工单</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      carNumber: ""
    };
  },
  created() {
    var signInfo = JSON.parse(sessionStorage.getItem("signInfo"));
    this.orderPageShowOrgName = signInfo.orgId == 0;
    this.getlistData(
      { pageNo: this.pageNo, pageSize: this.pageSize },
      { type: 1 }
    );
  },
  filters: {
    type(d) {
      console.log(d)
      var arr = ["", "检测", "治疗", "检测+治疗"];
      return arr[d];
    }
  },
  methods: {
    formartTime(row) {
      return net.dateFormat(row.inputTime, 1);
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
        { type: 1 }
      );
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { type: 1 }
      );
    },
    // 开始检测
    start(row) {
      net
        .request("admin/order/startTesting", "post", {
          jobId: row.jobId,
          version: row.version
        })
        .then(res => {
          if (res.retcode == 1) {
            net.message(this, res.retmsg, "success");
            var skip = net.isJump("/waitOrder");
            if (skip) {
              this.$router.push({ path: "/onloadPic" });
            } else {
              this.getlistData(
                { pageNo: this.pageNo, pageSize: this.pageSize },
                { type: 1 }
              );
            }
          } else {
            net.message(this, res.retmsg, "warning");
          }
        });
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
                { carNumber: this.carNumber, type: 1 }
              );
            }
          });
      });
    },
    search() {
      this.getlistData(
        { pageNo: this.pageNo, pageSize: this.pageSize },
        { carNumber: this.carNumber, type: 1 }
      );
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

