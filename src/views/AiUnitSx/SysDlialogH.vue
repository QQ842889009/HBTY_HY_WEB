<template>
  <div class="dialog-consumer">
    <el-dialog
      :modal-append-to-body="false"
      :title="title"
      :visible.sync="dialogVisible"
      :width="width + 'px'"
      :height="height + 'px'"
      :before-close="handleClose"
    >
      <div class="a">
        <div class="t">
          <span>换热站：{{ obj01.station }}</span>
          <span>小区:{{ obj01.housing }}</span>
          <span>楼：{{ obj01.tower }}</span>
          <span>单元：{{ obj01.unit }}</span>
          <!-- <span>室：{{ obj01.num }}</span>
          <span>联系人：{{ obj01.householder_name }}</span> -->
        </div>
        <div class="shijian">
          <DateTimePicker
            class="picker"
            @EmitDateTimePicker="receiveDateTimePicker"
          ></DateTimePicker>
        </div>
        <div class="quxian">
          <EchartLineDB
            :getData="indoorque"
            title_name="带户阀的单元阀"
            :isSort="false"
            :isShowDB="false"
            :showLenged="true"
            dbTem="35"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs"; //
import axios from "axios";
import EchartLineDB from "../Visual/components/EchartLineDBTwoyAxis.vue"; //
import DateTimePicker from "components/common/DateTimePicker";
export default {
  components: {
    DateTimePicker,
    EchartLineDB,
  },
  name: "ArticleList",

  props: {
    title: {
      type: String,
      default: "标题",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: Number,
      default: 1500,
    },
    height: {
      type: Number,
      default: 850,
    },
  },
  data() {
    return {
      //显示信息用到的//
      obj01: {},
      labelPosition: "right",
      sn: null,
      ai_num: null,
      startTime: null,
      endTime: null,
      value2: [],
      dialogVisible: false,
      indoorque: [
        {
          created_time: "2022-06-23",
          te1: "24",
          te2: "20",
          te3: "18",
          te4: "22",
          pt1: "12",
          pt2: "12",
          pt3: "12",
          pt4: "12",

          fv1fb: "12",
          fv2fb: "12",
        },
        {
          created_time: "2022-07-23",
          te1: "10",
          te2: "5",
          te3: "5",
          te4: "3",
          pt1: "4",
          pt2: "6",
          pt3: "6",
          pt4: "5",

          fv1fb: "12",
          fv2fb: "12",
        },
        {
          created_time: "2022-08-23",
          te1: "24",
          te2: "20",
          te3: "18",
          te4: "22",
          pt1: "12",
          pt2: "12",
          pt3: "12",
          pt4: "12",

          fv1fb: "12",
          fv2fb: "12",
        },
      ],
    };
  },
  created() {
    // this.getDate();
    // console.log("fffffff");
    // this.receiveDateTimePicker(v);
  },
  mounted() {
    // this.start();
  },
  watch: {
    //这个是要监听的数据
    rowData: {
      //这个是固定写法
      handler() {
        //watch的一个方法
        this.start22(); //要执行的方法
      },
      // immediate: true, //初始监听
      deep: true, //深度监听
    },
  },
  methods: {
    start() {
      // this.getDate();
      // this.getDate();
      // // this.sn = this.rowData.sn;
      // // console.log("kaishi----------", this.rowData.sn);
      // this.receiveDateTimePicker(this.value2);
      // this.gg();
    },
    start22() {
      // this.getDate();
      this.getDate();
      this.ai_num = this.rowData.aiNum;
      // this.sn = this.rowData.sn;
      // console.log("kaishi----------", this.rowData.sn);
      this.receiveDateTimePicker(this.value2);
      // this.gg();
    },
    Fungetdate(num) {
      var dd = new Date();
      dd.setDate(dd.getDate() + num);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();

      let myhh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mymm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      // if(mymm>1){
      // mymm = mymm-1;
      // }

      let myss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      return y + "-" + m + "-" + d + " " + myhh + ":" + mymm + ":" + myss;
    },
    getDate() {
      this.value2 = [];
      this.startTime = this.Fungetdate(-1);
      this.endTime = this.Fungetdate(0);
      this.value2.push(this.startTime, this.endTime);
      console.log("this.value2", this.value2);
      // let startTo = Date.parse(new Date(start).toString());
      // let endTo = Date.parse(new Date(end).toString());
    },

    handleClose(done) {
      this.dialogVisible = false;
      this.obj01 = {};
      this.indoorque = [
        {
          event_time: "2022-06-23",
          temp: "24",
        },
        {
          event_time: "2022-06-24",
          temp: "10",
        },
      ];
    },
    receiveDateTimePicker(v) {
      this.startTime = v[0];
      this.endTime = v[1];
      this.ai_num = this.rowData.aiNum;
      this.gg();
      if (v.length > 0) {
        // let a = v[0];
        // let b = v[1];
        // this.startingTime = Date.parse(new Date(a).toString());
        // this.endTime = Date.parse(new Date(b).toString());
        // console.log("1221", this.startingTime, this.endTime);
        // let data = {
        //   sn: this.sn,
        //   startTime: a,
        //   endTime: b,
        // };
        // this.$http
        //   .post(
        //     "TEhistory/roomtemperature/houser/searchDatasAndHouserholderInfoForSnAndTimeScope",
        //     data
        //   )
        //   .then((res) => {
        //     console.log("室内温度历史曲线", res);
        //     this.obj01 = res.houser;
        //     this.indoorque = res.datas;
        //     console.log("this.obj01", this.obj01);
        //   });
      }
    },
    gg() {
      console.log("gggg");
      let data = {
        ai_num: this.ai_num,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      console.log("黑蚂蚁楼宇的历史查询", data);
      this.$http
        .post("AiUnit/buildingms/datas/searchDatasbyAiNum", data)
        .then((res) => {
          console.log("42个的楼宇", res);
          this.obj01 = res.station_and_housiong;
          this.indoorque = res.result;
          console.log("this.indoorque", this.indoorque);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: flex !important;
  align-items: stretch !important;
  justify-content: center !important;
  flex-direction: column !important;
  padding: 0rem 0rem !important;
  transition: all 0.2s 0.7s !important;
  overflow: hidden !important;
  grid-column: 1 / 2 !important;
  grid-row: 1 / 2 !important;
}
::v-deep {
  .el-dialog__wrapper {
    .el-dialog {
      background-color: #fff !important;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .el-dialog__header {
        background-color: #1890ff !important;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 5px 15px 5px;
        //height: 30px;
        // text-align: center;
        .el-dialog__title {
          // position: relative;
          // top: 18px;
          // left: 10px;
          color: #fff;
          // font-size: 16px;
          // font-weight: 600;
        }
      }
      .el-dialog__headerbtn {
        position: absolute;
        top: 8px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
      .el-dialog__close {
        color: #fff;

        // position: relative;
        // top: -7px;
        // left: 10px;
      }
      .el-dialog__body {
        padding: 7px 7px !important;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
        width: 100%;
      }
    }
  }
}
.a {
  height: 450px;
  position: relative;
  .shijian {
    position: absolute;
    left: 1080px;
  }
  .t {
    width: 850px;
    height: 40px;
    // background-color: red;
    position: absolute;
    font-size: 15px;
    top: 10px;
    span {
      padding: 20px 10px;
    }
  }
  .quxian {
    height: 400px;
    width: 1480px;
    background-color: #fff;
    box-shadow: 10px 10px 25px #888888;
    position: absolute;
    top: 50px;
  }
}
</style>
