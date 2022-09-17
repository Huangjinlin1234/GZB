<template>
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      src: null,
      formdata: {},
      heihgt: 0
    };
  },
  mounted () {
    this.afterInit();
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    afterInit () {
      var _this = this;
      var pkId = this.pageParams.pkId;
      if (pkId == null || pkId == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      // 本地调试
      // this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwsx-dzy.cpt&pkId=' + pkId;
      this.src = _this.$backend.frptRptService + 'xwsx-dzy.cpt&pkId=' + pkId;
    }
  }
};
</script>
