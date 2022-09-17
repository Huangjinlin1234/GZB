<template>
  <div>
    <yu-panel title="评价外部评估机构统计" panel-type="simple" >
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px"  related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="evalOutOrgName"></yu-xform-item>
<!--          <yu-xform-item label="任务发起行" ctype="input" placeholder="任务发起行" name="evalTaskStartOrgName"></yu-xform-item>-->
          <yu-xform-item label="外部评估机构组织机构码" ctype="input" placeholder="外部评估机构组织机构码" name="outOrgRegCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template >
        <yu-button-drop>
          <yu-button ref="btn_onView" @click="onView()">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="组织机构代码" prop="outOrgRegCode" ></yu-xtable-column>
        <yu-xtable-column  label="外部评估机构" prop="evalOutOrgName" ></yu-xtable-column>
<!--        <yu-xtable-column  label="任务发起行" prop="evalTaskStartOrgName" min-width="100"></yu-xtable-column>-->
        <yu-xtable-column  label="总评分" prop="avgScore"></yu-xtable-column>
        <yu-xtable-column  label="已完成评分押品总数" prop="needEvalGuarTotalNum" ></yu-xtable-column>
        <yu-xtable-column  label="需评分押品剩余数" prop="needEvalGuarSurplusNum" ></yu-xtable-column>
<!--        <yu-xtable-column  label="任务发起日期" prop="taskStartDate" min-width="120px"></yu-xtable-column>-->
<!--        <yu-xtable-column  label="任务结束日期" prop="tastEndDate" min-width="120px"></yu-xtable-column>-->
      </yu-xtable>
    </yu-panel>
  </div></template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils"

export default {
components:{},
mixins:[mixinUtils],
props: {
pageParams: Object,
dialogId: String
},
data() {
  return {
    pkField: 'totalSeno·',
    dialogTitle: '新增',
    dialogVisible: false,
    formType: 'ADD',
    dataUrl: this.$backend.cmisEval + "/api/guarevaloutorgscoretotal/query",
    baseParams: {condition:{}, sort:"totalSeno desc"},
    deleteUrl: this.$backend.cmisEval + "/api/guarevaloutorgscoretotal/delete/",
    searchFormdata:{},
  }
},
  mounted() {

  },
  methods:{
    onView() {
      const _this = this;
      if (this.$refs.refTable.selections.length == 0) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      _this.$xutils.clone(_this.$refs.refTable.selections[0], jsoPar);
      _this.$dialog.open(
        '评分统计详情',
        'evalmanage/evaloutorg/evaloutorgscoretotalviewIndex',
        -1,
        -1,
        jsoPar,
        null,
      );
    }
  }
};
</script>
