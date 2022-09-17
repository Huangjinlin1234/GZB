<template>
  <!--
    @created by hanl 2021-07-30
    @updated by
    @description 页面
  -->
  <yu-xform ref="refForm" label-width="120px" v-model="formdata">
    <yu-panel title="预警信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="预警单编号" prop="riskId" name="riskId" disabled></yu-xform-item>
        <yu-xform-item label="客户编号" prop="custId" name="custId" disabled></yu-xform-item>
        <yu-xform-item label="客户名称" prop="custName" name="custName" disabled></yu-xform-item>
        <yu-xform-item label="客户经理" prop="mainMgrName" name="mainMgrName" disabled></yu-xform-item>
        <yu-xform-item label="所属机构" prop="inputBrIdName" name="inputBrIdName" disabled></yu-xform-item>
        <yu-xform-item label="预警信号来源" prop="signSource" name="signSource" disabled></yu-xform-item>
        <yu-xform-item label="预警等级" prop="riskLvl" name="riskLvl" disabled></yu-xform-item>
        <yu-xform-item label="预警日期" prop="riskDate" name="riskDate" disabled></yu-xform-item>
        <yu-xform-item label="预警状态" prop="riskStatus" name="riskStatus" disabled></yu-xform-item>
      </yu-xform-group>>
    </yu-panel>
  </yu-xform>
</template>
<script>
import {clone} from "@/utils";
export default {
  data () {
    return {
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      clone(data, _this.formdata);
    }
  }
};
</script>
