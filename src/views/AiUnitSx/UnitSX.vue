<template>
  <div class="AAAAA" @wheel="handleWheel">
    <div class="losding" v-show="isLoading">losding</div>
    <div class="product" v-show="!isLoading">
      <div
        class="prod-list"
        :class="{ hidden: this.$store.getters.isFullscreen }"
      >
        <h1>产品list</h1>

        {{ this.$store.getters.isFullscreen }}
      </div>
      <div
        class="scene-list"
        :class="{ hidden: this.$store.getters.isFullscreen }"
      >
        <h1>场景list</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {},
  watch: {},
  computed: {
    // 斑马线的颜色
  },
  mounted() {
    window.addEventListener("mousewheel", (e) => {
      console.log(e);
    });
  },
  methods: {
    throttle(fn, gapTime) {
      let _this = this;
      return function () {
        let _nowTime = +new Date();
        if (_nowTime - _this._lastTime > gapTime || !_this._lastTime) {
          fn(...arguments); // 函数可以带参数
          _this._lastTime = _nowTime;
        }
      };
    },
    handleWheel(e) {
      e.stopPropagation();
      this.throttle(this.pageUpOrDown, 600)(e);
    },
    pageUpOrDown(e) {
      if (e.deltaY > 0) {
        //向下
        this.$store.commit("qqqqq", true);
        console.log("aaa");
        // this.clickNext(); //执行的事件逻辑。比如向下翻页
      } else if (e.deltaY < 0) {
        //向上
        this.$store.commit("qqqqq", false);
        console.log("bbb");
        // this.clickPrev(); //比如向上翻页
      }
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.AAAAA {
  width: 100%;
  height: 100%;
  background-color: palegreen;
}
.prod-list {
  width: 300px;
  height: 900px;
  background-color: red;
  position: fixed;
  top: 90px;
  left: 0;
  z-index: 999;
  transition: all 0.5s;
}
.prod-list.hidden {
  transform: translate(-100%, 0);
}
.scene-list.hidden {
  transform: translate(100%, 0);
}
.scene-list {
  width: 300px;
  height: 900px;
  background-color: gold;
  position: fixed;
  top: 90px;
  right: 0;
  z-index: 999;
  transition: all 0.5s;
}
</style>
