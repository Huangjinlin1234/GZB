<template>
  <yu-panel title="检查报告" panel-type="simple">
    <div>
      <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </div>
  </yu-panel>
</template>
<script>
export default {
  props: {
    children: Object,
    bizPageData: Object
  },
  data () {
    return {
      printUrl: '',
      rptName: '',
      taskNo: '',
      indgtResult: '',
      saveBtnShow: false
    };
  },
  created () {
    // debugger;
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.params) {
      this.dataParam = this.$route.params;
    }
    // console.log('children', this.children)
    // console.log('this.$route.params', this.$route.params)
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      _this.data = _this.$route.params;
      let taskNo = _this.data.pspTask == undefined ? _this.data.taskNo : _this.data.pspTask.taskNo;
      // let taskNo = _this.data.pspTask ? _this.data.pspTask.taskNo : _this.data.taskNo;
      let rptName = _this.data.rptName;
      // _this.printUrl = _this.data.src;
      _this.printUrl = _this.$backend.frptRptService + rptName + '&taskNo=' + taskNo;
    },
    save () {
      return this.$message.success('保存成功');
    }
  }
};
</script>
