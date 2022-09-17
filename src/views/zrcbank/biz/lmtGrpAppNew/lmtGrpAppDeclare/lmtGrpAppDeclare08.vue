<!--
集团额度调剂申请表
-->
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
    var _this = this;
    _this.onPrint();
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    onPrint () {
      var _this = this;
      var params = {};
      var grpSerno = '';
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        params = _this.getFactory().contextData.instanceInfo;
        grpSerno = params.bizId;
      } else {
        params = _this.$route.meta.params;
        grpSerno = params.grpSerno;
      }
      if (grpSerno == null || grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      _this.src = _this.$backend.frptRptService + 'DGSX-EDTJSQS-JT.cpt&op=view&grpSerno=' + grpSerno;
    }
  }
};
</script>
