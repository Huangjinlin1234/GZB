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
    this.AfterInit();
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    /* 零售-合同申请-授信批复信息*/
    AfterInit () {

      var _this = this;
      var iqpSerno = this.$route.meta.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.pageParams.iqpSerno;
      if (iqpSerno == null || iqpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      // 本地调试
      // this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=授信业务审批表.cpt&iqpSerno=' + iqpSerno;
      this.src = _this.$backend.frptRptService + 'ls-dksxrg-pf.cpt&iqpSerno=' + iqpSerno;
    }
  }
};
</script>
