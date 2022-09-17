<template>
  <yu-panel title="" panel-type="simple">
    <div>
      <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </div>
     <div class="yu-grpButton">
      <yu-button type="primary" @click="goBackFn">返回</yu-button>
    </div>
  </yu-panel>
</template>
<script>
export default {
  props: {
    children: Object
  },
  data () {
    return {
      printUrl:
          '',
      indgtResult: '',
      saveBtnShow: false
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.printUrl = _this.data.src;
    },
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
