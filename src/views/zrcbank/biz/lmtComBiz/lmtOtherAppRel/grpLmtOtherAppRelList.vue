<template>
  <!--
    @created by qiantj
    @description 其他事项审批表
  -->
  <div>
    <yu-panel title="其他申请事项审批列表" :hideFilter="false" :collapseHide="false" >
    <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :pageable="false" :base-params="baseParams" selection-type="radio" request-type="POST">
        <yu-xtable-column label="业务流水号/审批表编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="otherAppType"  data-code="STD_LMT_OTHER_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>

// 注册字典项 审批状态
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_OTHER_APP_TYPE');
export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      baseParams: {condition: {serno: this.$route.meta.params.grpSerno, oprType: '01', approveStatusS: '' }},
      dataUrl: backend.cmisBiz + '/api/otheritemapp/selectotheritemappdatabyserno',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted () {

  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshRefTable');
  },
  methods: {
  }
};
</script>
