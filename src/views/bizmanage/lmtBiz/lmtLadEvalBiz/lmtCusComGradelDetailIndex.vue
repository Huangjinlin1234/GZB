<template>
  <div>
    <yu-xform  ref="refForm"  v-model="formdata" disabled>
      <yu-xform-group :column="2">
        <yu-xform-item label="业务流水号" name="serno" ctype="input"></yu-xform-item>
        <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
        <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
        <yu-xform-item label="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
        <yu-xform-item label="证件号码" name="certCode" ctype="input"></yu-xform-item>
        <yu-xform-item label="评级年度" name="gradeYear" ctype="input"></yu-xform-item>
        <yu-xform-item label="评级类型" name="gradeType" ctype="select" data-code="STD_ZB_GRADE_TYPE"></yu-xform-item>
        <yu-xform-item label="评级模型" name="gradeMode" ctype="select" data-code="STD_ZB_GRADE_MODE"></yu-xform-item>
        <yu-xform-item label="系统初始等级" name="sysRank" ctype="input"></yu-xform-item>
        <yu-xform-item label="调整后等级" name="adjRank" ctype="input"></yu-xform-item>
        <yu-xform-item label="建议等级" name="suggestRank" ctype="input"></yu-xform-item>
        <yu-xform-item label="最终等级" name="finalRank" ctype="input"></yu-xform-item>
        <yu-xform-item label="非零内评生效日期" name="effDt" ctype="input"></yu-xform-item>
        <yu-xform-item label="非零内评到期日期" name="dueDt" ctype="input"></yu-xform-item>
        <yu-xform-item label="非零内评失效日期" name="loseEffDt" ctype="input"></yu-xform-item>
        <yu-xform-item label="非零内评违约概率" name="pd" hidden></yu-xform-item>
        <yu-xform-item label="非零内评风险大类" name="bigriskclass" hidden></yu-xform-item>
        <yu-xform-item label="非零内评风险中类" name="midriskclass" hidden></yu-xform-item>
        <yu-xform-item label="非零内评风险小类" name="fewriskclass" hidden></yu-xform-item>
        <yu-xform-item label="非零内评风险划分日期" name="riskdividedate" hidden></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GRADE_MODE,STD_ZB_GRADE_TYPE');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {

    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      debugger;
      let par = this.pageParams;
      yufp.clone(par, this.formdata);
    }
  }
};
</script>
