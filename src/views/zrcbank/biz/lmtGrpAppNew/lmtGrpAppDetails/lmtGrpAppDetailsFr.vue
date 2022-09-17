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
      var params = _this.getFactory().contextData;
      if (params.grpSerno == null || params.grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      this.src = _this.$backend.frptRptService + '授信细化申请书（集团）.xlsx.cpt&op=view&GRPSERNO=' + params.grpSerno;
    }
  }
};
</script>