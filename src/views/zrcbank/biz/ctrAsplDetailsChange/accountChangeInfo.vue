
<template>
  <!--
    @created by 屈文
    @description 账户信息
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="列表信息" name="messageTip">
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <!--<yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>-->
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="保证金账号" prop="BAIL_ACC_NO"></yu-xtable-column>
            <yu-xtable-column label="保证金账号户名" prop="contAmt"></yu-xtable-column>
            <yu-xtable-column label="保证金留存比例" prop="contAmt"></yu-xtable-column>
            <yu-xtable-column label="结算账号" prop="agrAmt"></yu-xtable-column>
            <yu-xtable-column label="结算账号户名" prop="lowRiskAmt"></yu-xtable-column>
            <yu-xtable-column label="手续费比例" prop="inputId"></yu-xtable-column>
            <yu-xtable-column label="子序号" prop="BAIL_ACC_NO_SUB"></yu-xtable-column>
          </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
  }
};
</script>