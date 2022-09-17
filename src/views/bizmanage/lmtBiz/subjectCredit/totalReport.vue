<template>
  <yu-panel title="调查报告" panel-type="simple">
    <div>
      <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
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
      rules: {
        indgtResult: [
          { required: true, message: '请输入调查结论', trigger: 'blur' }
        ]
      },
      printUrl:
          '',
      indgtResult: '',
      saveBtnShow: false
    };
  },
  created () {},
  mounted () {
    if (this.children.lmtBizType == '4001') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg02.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4002') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg01.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4003') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg07.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4004') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg05.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4005') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg07.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4006') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg03.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4007') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg03.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4008') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg01.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4009') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg05.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4010') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg05.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4011') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg04.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '4012') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg04.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '16010101') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg05.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
    if (this.children.lmtBizType == '16020101') {
      this.printUrl = this.$backend.frptRptService +
          'zjty-tcbg05.cpt&op=view&serno=' +
           this.children.serno + '&cusId=' + this.children.cusId;
    }
  },
  methods: {
  }
};
</script>
