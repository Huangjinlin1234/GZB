/**
 * @created by wangyouhong 2021-09-01
 * @updated by
 * @description 客户经理分成比例
 */
<template>
 <div>
   <yu-panel title="客户经理分成比例信息" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <yu-xtable ref="refTable"  condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center"  label="客户号" prop="cusId"  ></yu-xtable-column>
        <yu-xtable-column align="center"  label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center"  label="工号" prop="managerId" ></yu-xtable-column>
        <yu-xtable-column align="center"  label="姓名" prop="managerName"></yu-xtable-column>
        <yu-xtable-column align="center"  label="机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column align="center"  label="分成比例(%)" prop="dividePerc"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="性质" prop="managerProp" data-code="STD_CUS_MGR_PROP" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="是否生效" prop="isEffect" data-code="STD_ZB_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记人" prop="inputId"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记日期" prop="inputDate"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="datepicker" label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
 </div>
</template>
<script>
yufp.lookup.reg('STD_CUS_MGR_PROP,STD_ZB_APPR_STATUS,STD_ZB_STATUS');
export default {
  props: {
    bizPageData: Object,
  },
  data () {
    return {
      dataUrl: this.$backend.cmisCus + '/api/cusmgrdivideperc/queryListInfoByCusId',
      baseParams:{condition:{cusId: this.bizPageData.instanceInfo.bizUserId}},
    };
  },
  methods: {
   
  }
};
</script>
