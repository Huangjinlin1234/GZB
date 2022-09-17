<!--
    @created by
    @updated by
    @updated by
    @description 报表页面
    @params
  -->
<template>
    <div>
      <iframe :src="FineReportSrc" frameborder="0" :style="commonStyle" scrolling="yes"></iframe>
    </div>
</template>
<script>
export default {
  name: 'FineReport',
  props: {
    s: {
      type: String,
      default: '2'
    },
    authority: String,
    para: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      FineReportSrc: this.$backend.frptRptService,
      commonStyle: {
        width: '100%',
        height: (yufp.frame.size().height - 55) + 'px',
        border: 0
      }
    };
  },
  methods: {
    getFineReport () {
      let _this = this;
      let code = _this.para.top_outsystem_code;
      let appSerno = _this.para.index;
      _this.FineReportSrc = this.$backend.frptRptService + code + appSerno;
      window.encodeURI(_this.FineReportSrc);
    }

  },
  created () {
    this.getFineReport();
  },
  mounted () {

  }
};
</script>