<template>
  <div class="unit-container">
    <div class="table">
      <el-table
        v-loading="dataListLoading"
        fixed
        ref="report-table"
        :data="vv.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        max-height="910"
        class="customer-table"
        :cell-style="{ padding: '0.5px 0' }"
        :header-cell-style="headerStyle"
        id="el-table"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        :style="zebarCrossingStyle"
        :row-key="getRowKey"
      >
        <el-table-column
          label="站号"
          prop="s"
          width="500"
          align="center"
          fixed="left"
        >
        </el-table-column>

        <el-table-column
          label="Sid"
          prop="ip"
          width="600"
          align="center"
          fixed="left"
        >
        </el-table-column>

        <el-table-column label="操作" width="120" fixed="left">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="请求连接"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                size="mini"
                icon="iconfont icon-chain"
                @click="linkB(scope.$index, scope.row)"
                >请求连接</el-button
              >
            </el-tooltip>
            <!-- 查询结束 -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="vv.length"
      >
      </el-pagination>
    </div>
    <!-- <div v-show="tt === 5"></div> -->
  </div>
</template>
<script>
// import SysDlialog from "./SysDlialog"; ////
//临时数据
//import { options } from "assets/js/common/doorSelect";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      vv: [
        { s: "0#", ip: 0 },
        { s: "1#A", ip: 1 },
        { s: "1#B", ip: 2 },
        { s: "2#", ip: 3 },
        { s: "3#A", ip: 4 },
        { s: "3#B", ip: 5 },
        { s: "4#", ip: 6 },
        { s: "5#", ip: 7 },
        { s: "6#", ip: 8 },
        { s: "7#", ip: 9 },
        { s: "9#", ip: 10 },
        { s: "10#", ip: 11 },
        { s: "11#", ip: 12 },
        { s: "12#", ip: 13 },
        { s: "13#", ip: 14 },
        { s: "15#", ip: 15 },
        { s: "16#", ip: 16 },
        { s: "17#A", ip: 17 },
        { s: "17#B", ip: 18 },
        { s: "18#", ip: 19 },
        { s: "19#A", ip: 20 },
        { s: "19#B", ip: 21 },
        { s: "19#C", ip: 22 },
        { s: "20#", ip: 23 },
        { s: "22#", ip: 24 },
        { s: "23#高中", ip: 25 },
        { s: "23#高区", ip: 26 },
        { s: "23#低区", ip: 27 },
        { s: "24#", ip: 28 },
        { s: "25#A", ip: 29 },
        { s: "25#B", ip: 30 },
        { s: "26#A", ip: 31 },
        { s: "26#B", ip: 32 },
      ], //表需要的数组
      currentPage: 1, // 当前页码
      total: 50, // 总条数
      pageSize: 25, // 每页的数据条数
      dataListLoading: false,
      //斑马线颜色
      zebarCrossing: {
        crossingOne: "#0dc41a",
        crossingTwo: "#155f14",
        //crossingTwo: "#224394",
        colorOne: "#fff",
        colorTwo: "#fff",
      },
      selectID: [],
      station: "",

      community: "",
      noData: null,
      hour2: null,
      TonoData: null,
      Tohour2: null,
      pageIndex: 1,
      pageSize: 25,
      value: null,
      totalCount: 0,
      title: "室温曲线查询",
      selectStationSid: null,
      rowData: {},
      infoArr: [],
      multipleSelection: [],
      myData: [],
      tableData: [],
      info: "",
      dataForm: {
        malfunction: null, //故障
        communication: null, //通讯
      },

      // options: options,
      options: [],
      datah: 850, ///数据报表的高度 动态改
    };
  },
  created() {
    // this.askData();
    // this.asd();
    // this.requestIndoorData();
  },
  watch: {},
  computed: {
    // vv() {
    //   this.tableData333 = this.$store.getters.stationAlarmSet;
    //   return this.tableData333;
    // },
    headerStyle() {
      return {
        background: "#0dc41a",
        padding: "5px 0",
        height: "30px",
        borderColor: "#006CC1",
        textAlign: "center",
        // color: "#FEFEFE",
        fontSize: "14px",
        color: "#fff",
        borderColor: "black",
      };
    },
    // 斑马线的颜色
    zebarCrossingStyle() {
      return {
        "--crossingOne": this.zebarCrossing.crossingOne,
        "--crossingTwo": this.zebarCrossing.crossingTwo,
        "--colorOne": this.zebarCrossing.colorOne,
        "--colorTwo": this.zebarCrossing.colorTwo,
      };
    },
  },
  mounted() {
    // this.dd();
  },
  methods: {
    linkB(index, row) {
      this.ipzz = row.ip;
      let msg = {
        // name: "admin",
        sid: this.ipzz,

        status: 1,
      };
      if (this.$stompClient.connected === true) {
        this.$stompClient.send(
          "/hbty/fySetServerStatus",
          {},
          JSON.stringify(msg)
        );
        console.log("断线请求", msg);
      }
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    //解决[ElTable] prop row-key is required的错误
    getRowKey(row) {
      return row.id;
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.selectID.length == 0) {
        if ((rowIndex + 1) % 2 === 0) {
          return "crossingOne"; //类名
        } else {
          return "crossingTwo"; //类名
        }
      }
    },

    exportExcel111(excelName) {
      try {
        const $e = this.$refs["report-table"].$el;
        console.log("----", $e);
        let $table = $e.querySelector(".el-table__fixed");
        if (!$table) {
          $table = $e;
        }

        const wb = XLSX.utils.table_to_book($table, { raw: true });
        const wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${excelName}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.error(e);
      }
    },
  },
  components: {
    // SysDlialog,
  },
};
</script>
<style lang="scss" >
.el-cascader-menu__wrap {
  height: 208px;
  background-color: green !important;
  color: #fff !important;
}
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background-color: rgba(62, 243, 16, 0.69);
}
</style>
<style lang="scss" scoped>
::v-deep {
  .el-cascader__dropdown {
    margin: 5px 0;
    margin-top: 5px;
    font-size: 14px;
    background-color: #ebb563 !important;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  //去固定的线
  .el-table__fixed-right::before {
    background-color: transparent !important ;
  }
  .el-table__fixed::before {
    background-color: transparent !important ;
  }
  //el-table__fixed-body-wrapper
  //去表格的线
  .el-table--border,
  .el-table--group {
    border: none;
    // border-right-color: rgb(235, 238, 245);
    // border-right-style: solid;
    // border-right-width: 1px;
    // border-bottom-color: rgb(235, 238, 245);
    // border-bottom-style: solid;
    // border-bottom-width: 1px;
  }
  .table-SelectedRow-bgcolor {
    td {
      background-color: #ebb563 !important;
    }
  }
  .el-table__row > td {
    /* 去除表格线 */
    border: none;
  }
  .el-table th.is-leaf {
    border-bottom: none; //去多余的横线
  }
  .el-table th.is-leaf {
    border-bottom: none; //去多余的横线
  }
  .el-pagination {
    // text-align: center;
    color: #fff;
    height: 30px;
    // padding: 0.2rem 0.1rem;
    // background-color: rgb(241, 158, 62); //选中页码的颜色
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    color: rgb(141, 138, 138);
    background-color: #14375c; //没有被选中的页码颜色
    background-color: transparent !important;
    background-color: red;
    //background-color: transparent;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: rgb(241, 158, 62);
    background-color: rgb(241, 158, 62); //选中页码的颜色
    //background-color: transparent !important;
    //background-color: transparent;
  }
  .el-pagination__total,
  .el-pagination__jump {
    color: #fff;
  }
  .btn-prev {
    background-color: #14375c;
    background-color: transparent !important;
    //color: rgb(32, 245, 32);
  }
  .btn-next {
    background-color: transparent !important;
    color: #fff;
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    line-height: 28px;
    color: #303133;
    color: #fff;
  }
  .el-pager li {
    padding: 0 4px;
    background: transparent !important;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
  }
  .el-input__inner {
    background-color: transparent !important;
  }
  .el-pagination__jump {
    color: #fff !important; //前往xx页的字体颜色
  }
  .el-pagination__total {
    color: #fff !important; //总条数的颜色
  }
  .el-checkbox__inner {
    //color: rgb(241, 158, 62) !important; //总条数的颜色
    background-color: #66b1ff !important; //选框的颜色
    //border-radius: 50% !important; //圆角百分比
  }
  //斑马线的颜色
  .customer-table .crossingOne {
    background-color: var(--crossingOne);
    // background-color: red;
    color: var(--colorOne);
    opacity: 1;
  }
  .customer-table .crossingTwo {
    background-color: var(--crossingTwo);
    color: var(--colorTwo);
    opacity: 1;
  }

  //

  //分页的hover颜色
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
    background-color: #66b1ff !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #14375c;
    background-color: #66b1ff !important;
  }
  // //没有fixed的时候用
  // .el-table tbody tr:hover > td {
  //   background-color: #66b1ff;
  //   background-color: #c0ccee;
  //   color: #000;
  //   font-size: 18px;
  // }
  //有fixed的时候用
  .el-table__body .el-table__row.hover-row td {
    background-color: #66b1ff;
    color: #000;
    font-size: 13px;
  }
  /*最外层透明   表格透明*/
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
    // background-color: #061028;
  }
  /* 表格内背景颜色 表格透明 */
  .el-table th,
  .el-table tr,
  .el-table td {
    background-color: transparent;
  }
  //固定表头 目的是表头过长把单位用....表示   //表格头部多余内容...的第二步*第一部在methods中的tableRenderHeader
  .el-table th > .cell {
    // overflow: hidden; // 超出的文本隐藏
    // text-overflow: ellipsis; // 溢出用省略号显示
    // display: -webkit-box;
    // // white-space: nowrap; // 溢出不换行
    // //-webkit-line-clamp: 2;
    // white-space: nowrap;
    // -webkit-box-orient: vertical;
    // // color: red;
    white-space: pre;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    content: "";
    position: absolute;
    background-color: transparent; //去多余的横线
    z-index: 1;
  }
}
// 下拉菜单开始
/deep/.el-input--suffix .el-input__inner {
  //padding-right: 102px;
}
/deep/.el-input__inner {
  background-color: green;
  color: #fff;
  border: 1px solid #31cae4;
}

.el-select-dropdown__item {
  // font-size: 7px;
  //line-height: 19px;
  color: #fff;
  font-weight: 200;
  background-color: green;
}
// 背景全是绿

//三角色
// .el-popper .popper__arrow {
//   border-width: 6px;
//   border-top-width: 6px;
//   filter: drop-shadow(0 2px 12px rgba(5, 212, 23, 1));
// }
/deep/.el-select-dropdown {
  background-color: transparent;
  border: 1px solid blue;
}
/deep/.el-select-dropdown__list {
  padding: 0;
}
/deep/.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
/deep/.el-popper .popper__arrow,
/deep/.el-popper .popper__arrow::after {
  display: none;
}
.el-select-dropdown__item:hover {
  background-color: rgba(0, 225, 219, 0.690196078431373);
  background-color: rgba(62, 243, 16, 0.69);
}
.el-select-dropdown__list {
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
//下拉菜单结束
// 第一个选择站的开始

//第一个选择站的结束
// ::v-deep {
//   .el-form-item__label {
//     text-align: right;
//     vertical-align: middle;
//     float: left;
//     font-size: 23px;
//     color: #606266;
//     line-height: 40px;
//     padding: 0 12px 0 0;
//     box-sizing: border-box;
//   }
// }
.unit-container {
  color: #fff;
  width: 1920px;
  // height: 995px;
  font-size: 30px;
  //background-color: rgb(228, 226, 213);
  background: linear-gradient(
    90deg,
    rgba(30, 224, 24, 0.4) 0,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(30, 224, 24, 0.4)
  );
  position: relative;
  .condition-box {
    position: absolute;
    top: 30px;
    left: 50px;
    font-size: 30px;
  }
  .table {
    position: absolute;
    top: 70px;
    left: 280px;
    width: 1880px;
    // height: 970px;
    // background-color: palevioletred;
    overflow: auto;
    margin: 0px 20px 20px 20px;
    padding: 0px 20px 20px 20px;
  }
}
</style>
