<template>
  <div class="unit-container">
    <DateTimePicker
      class="picker"
      @EmitDateTimePicker="receiveDateTimePicker"
    ></DateTimePicker>
    <!-- {{ tableDataHHH }}
    <br />
    {{ tableDataGGG }}
    <br />
    {{ tableDataAAA }} -->
    <!-- <div class="condition-box">
      <el-form :inline="true" :model="dataForm" ref="dataForm">
        <el-form-item prop="name" label="">
          <DateTimePicker
            class="picker"
            @EmitDateTimePicker="receiveDateTimePicker"
          ></DateTimePicker>
        </el-form-item>

        <el-form-item>
          <el-button
            class="pickerC"
            size="medium"
            icon="el-icon-refresh-left"
            type="success"
            @click="exportExcel111('户阀数据')"
            >导出报表</el-button
          >
        </el-form-item>
      </el-form>
    </div> -->

    <div class="table">
      <el-table
        :data="tableData"
        border
        height="800"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="name" label="0"> </el-table-column>
        <el-table-column prop="amount1" label="1"> </el-table-column>
        <el-table-column prop="amount2" label="2"> </el-table-column>
        <!-- <el-table-column prop="amount2" label="2"> </el-table-column>
        <el-table-column prop="amount2" label="3"> </el-table-column>
        <el-table-column prop="space" label="space"> </el-table-column>
        <el-table-column prop="ft11_u" label="ft11_u"> </el-table-column>
        <el-table-column prop="ft21_u" label="ft21_u"> </el-table-column>
        <el-table-column prop="q1_u" label="q1_u"> </el-table-column>
        <el-table-column prop="te00" label="te00"> </el-table-column> -->
      </el-table>
      <!-- <el-table
      show-summary
        v-loading="dataListLoading"
        fixed
        ref="report-table"
        :data="tableData"
        style="width: 100%"
        max-height="980"
        class="customer-table"
       
        :cell-style="cellStyle"
        :render-header="tableRenderHeader"
        :header-cell-style="headerStyle"
        id="el-table"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        :style="zebarCrossingStyle"
        :row-key="getRowKey"
         show-overflow-tooltip
      >
        <el-table-column
          prop="Station"
          label="换热站名称"
          width="250"
          fixed
          align="center"
        >
         
       <template slot-scope="scope">
            
  <el-popover trigger="hover" placement="top">
       <P @click="rePeoplemessageCard(scope.row)">跳转换热站</P>
          <div slot="reference" class="name-wrapper">
           {{ scope.row.Station }}
          </div>
        </el-popover>
              
            </template>


        </el-table-column>
        <el-table-column
          prop="Space"
          label="面积(w㎡)"
          width="200"
          fixed
          align="center"
        >
        </el-table-column>
 
         

   
      <el-table-column label="供热模式" prop="LT" width="280"  align="center">
          </el-table-column>

          <el-table-column label="热量能耗(GJ)" prop="ZFT31" width="280"  align="center">
          </el-table-column>

          <el-table-column
            label="电量能耗(kWh)"
            prop="DL"
            width="280"
          
           align="center"
          >
          </el-table-column>
           <el-table-column
            label="补水量能耗(Kg)"
            prop="DL"
            width="280"
         
           align="center"
          >
          </el-table-column>
              <el-table-column
            label="室外温度(℃)"
            prop="DL"
            width="300"
          
           align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table> -->
      <!-- <el-table
        :data="tableDataCCC"
        border
        height="800"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="station" label="station"> </el-table-column>
        <el-table-column prop="sid" label="sid"> </el-table-column>
        <el-table-column prop="date" label="date"> </el-table-column>
        <el-table-column prop="time" label="time"> </el-table-column>
        <el-table-column prop="space" label="space"> </el-table-column>
        <el-table-column prop="ft11_u" label="ft11_u"> </el-table-column>
        <el-table-column prop="ft21_u" label="ft21_u"> </el-table-column>
        <el-table-column prop="q1_u" label="q1_u"> </el-table-column>
        <el-table-column prop="te00" label="te00"> </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>
<script>
import DateTimePicker from "components/common/DateTimePicker";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      sum: ["amount1"], //求和的字段和求平均数的字段名字
      avg: ["amount2"],

      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "1",
          amount2: "1",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "2",
          amount2: "2",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "3",
          amount2: "3",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "4",
          amount2: "4",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "5",
          amount2: "5",
          amount3: 15,
        },
      ],
      tableDataCCC: [],
      tableDataHHH: [],
      tableDataAAA: [],
      tableDataGGG: [],
      startTime: null,
      endTime: null,
      ///换热站新加开始
      // tableData: [],
      iconColor: "red",
      isShow: false,
      //换热站新加结束
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
      pageSize: 33,
      value: null,
      totalCount: 0,
      title: "室温曲线查询",
      selectStationSid: null,
      rowData: {},
      infoArr: [],
      multipleSelection: [],
      myData: [],

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
    this.aaa;
    // this.tableData = this.$store.getters.stationDataAndInfo; //表格数据
  },
  watch: {},
  computed: {
    // vv() {
    //   this.tableDataCCC = this.$store.getters.stationDataAndInfoReal;

    //   return this.tableDataCCC;
    // },
    aaa() {
      this.tableDataCCC = this.$store.getters.stationDataAndInfoReal;
      this.tableDataHHH = this.$store.getters.alarmArrJava;
      this.tableDataGGG = this.$store.getters.alarmArrJavaShow;
      console.log("tableDataHHH", this.tableDataHHH);
      for (let i = 0; i < this.tableDataHHH.length; i++) {
        this.tableDataAAA[i] = this.tableDataHHH[i].status;
      }
      console.log("this.tableDataAAA", this.tableDataAAA);
      // for (let i = 0; i < this.tableDataCCC.length; i++) {
      //   console.log("this.tableDataCCCiiiii", i);
      // }
    },
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
    // getSummaries(param) {
    //   console.log("算总和的第一步------AAA", param);
    //   const { columns, data } = param;
    //   console.log("算总和的第2步------BBB", columns);
    //   console.log("算总和的第3步------CCC", data);
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     console.log("算总和的第4步------DDD", column);
    //     console.log("算总和的第5步------DDD", index);
    //     if (index === 0) {
    //       sums[index] = "换热站总数";
    //       return;
    //     }
    //     const values = data.map((item) => Number(item[column.property]));
    //     console.log("算总和的第6步------666", values);
    //     if (!values.every((value) => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         if (!isNaN(value)) {
    //           return prev + curr;
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //       sums[index] += " 元";
    //     } else {
    //       sums[index] = "";
    //     }
    //   });

    //   return sums;
    // },
    // 求和操作某个列
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "合计:";
    //     }
    //     // if (index === 2) {
    //     //   sums[index] = "总记录数:";
    //     // }
    //     // index >= 5 || index <= 7 是你需要计算的列
    //     // 当然也可以指定一个或者多个列
    //     // index === 2 || index === 3 这样值求和第二个与第三个列
    //     else if (index === 1 || index === 1) {
    //       const values = data.map((item) => Number(item[column.property]));
    //       if (!values.every((value) => isNaN(value))) {
    //         sums[index] = values.reduce((prev, curr) => {
    //           console.log("11111111AAA", prev);
    //           console.log("22222222BBB", curr);
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             // 保存了两位小数点
    //             return Math.floor((prev + curr) * 100) / 100;
    //           } else {
    //             // 保存了两位小数点
    //             return Math.floor(prev * 100) / 100;
    //           }
    //         }, 0);
    //         sums[index] += " 元";
    //         //sums[index] += " 元";
    //       } else {
    //         sums[index] = "N/A";
    //       }
    //     } else if (index === 2 || index === 2) {
    //       const values = data.map((item) => Number(item[column.property]));
    //       if (!values.every((value) => isNaN(value))) {
    //         sums[index] = values.reduce((prev, curr) => {
    //           console.log("11111111AAA", prev);
    //           console.log("22222222BBB", curr);
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             // 保存了两位小数点
    //             let a = Math.floor(((prev + curr) * 100) / 100);
    //             console.log("aaa---", a);
    //             let b = a / 5.0;
    //             console.log("bbb---", b);
    //             return b;
    //           } else {
    //             // 保存了两位小数点
    //             return Math.floor(prev * 100) / 100;
    //           }
    //         }, 0);
    //         sums[index] += " 元";
    //         //sums[index] += " 元";
    //       } else {
    //         sums[index] = "N/A";
    //       }
    //     } else {
    //       // sums[index] = ''
    //     }
    //   });
    //   return sums;
    // },
    //  // 求和操作某个列和平均值
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计/平均";
          return;
        }
        const sumList = this.sum || [];
        const avgList = this.avg || [];
        const values = data.map((item) => {
          return Number(item[column.property]);
        });

        if (
          sumList.includes(column.property) ||
          avgList.includes(column.property)
        ) {
          let totalCount = 0; // 求平均数使用

          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);

            if (!isNaN(value)) {
              totalCount++;

              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (avgList.includes(column.property) && totalCount) {
            sums[index] = sums[index] / totalCount;
            sums[index] = sums[index].toFixed(2);
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },

    receiveDateTimePicker(v) {
      // this.startTime = v[0];
      // this.endTime = v[1];
      let start = v[0];
      let end = v[1];
      this.startTime = Date.parse(new Date(start).toString());
      this.endTime = Date.parse(new Date(end).toString());
      // let startTo = Date.parse(new Date(start).toString());
      // let endTo = Date.parse(new Date(end).toString());
      // this.valveCode = this.rowData.valveCode;
      this.gg();
    },
    gg() {
      // console.log("gggg");
      // let data = {
      //   startTime: this.startTime,
      //   endTime: this.endTime,
      // };
      // console.log("分析的第一个测试", data);
      // this.$http
      //   .post("plcdata/tems/plc/selectFt31SumAndQ1AndDL1 ", data)
      //   .then((res) => {
      //     console.log("返回分析的第一个测试---", res);
      //     // if (res.datas.length == 0) {
      //     //   this.$message({
      //     //     message: "没有查到数据",
      //     //     type: "error",
      //     //     duration: 1200,
      //     //   });
      //     // } else {
      //     //   this.obj01 = res.houser;
      //     //   this.indoorque = res.datas;
      //     // }
      //     // console.log("this.obj01", this.obj01);
      //   });
    },

    rePeoplemessageCard(v) {
      console.log("FFF");
      this.$router.push({ path: "/Visual6", query: { id: v.Sid } });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:4px!important;  padding:1px!important; ;color:#fff; font-family: 'Lao UI'; font-weight: 500;";
    },

    //解决[ElTable] prop row-key is required的错误
    getRowKey(row) {
      return row.sid;
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
    DateTimePicker,
  },
};
</script>
<style lang="scss" scoped>
.el-cascader-menu__wrap {
  height: 208px;
  background-color: green !important;
  // background-color: #909399;
  color: #fff !important;
}
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background-color: rgba(62, 243, 16, 0.69);
}
</style>
<style lang="scss" scoped>
::v-deep {
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
    color: #000;
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
    color: #000 !important; //前往xx页的字体颜色
  }
  .el-pagination__total {
    color: #000 !important; //总条数的颜色
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
  width: 100%;
  height: 100%;
  font-size: 30px;
  // background-color: rgb(228, 226, 213);
  background: linear-gradient(
    90deg,
    rgba(30, 224, 24, 0.4) 0,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(30, 224, 24, 0.4)
  );
  position: relative;
  .condition-box {
    height: 50px;

    // background-color: #fff;
    // position: absolute;
    // top: 30px;
    // left: 50px;
    font-size: 30px;
    .picker {
      position: absolute;
      top: 10px;
      left: 20px;
    }
    .pickerC {
      position: absolute;
      top: 10px;
      left: 1763px;
    }
  }
  .table {
    position: absolute;
    top: 50px;
    width: 1880px;
    height: 990px;
    // background-color: palevioletred;
    overflow: auto;
    margin: 0px 20px 20px 20px;
    margin: 0px 20px 20px 20px;

    padding: 0px 20px 20px 20px;
    padding: 0px;
  }
}
</style>
