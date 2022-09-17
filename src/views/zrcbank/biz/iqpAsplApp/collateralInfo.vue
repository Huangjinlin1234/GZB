
<template>
  <!--
    @created by 屈文
    @description 质押物
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="" name="messageTip">
        <yu-xtable ref="refTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="grtGuarContParams">
          <yu-xtable-column label-width="200px" label="权属证件号(资产编号)" prop="rightCertNo"></yu-xtable-column>
          <yu-xtable-column label="质押物编号" prop="guarNo"></yu-xtable-column>
          <yu-xtable-column label="质押物名称" prop="pldimnMemo"></yu-xtable-column>
          <!--字段不明-->
          <yu-xtable-column label="评估金额" prop="confirmAmt" ></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="评估日期" prop="evalDate"></yu-xtable-column>
          <!--<yu-xtable-column label="抵质押物状态" prop="guarState" data-code="STD_ZB_GUAR_STATE"></yu-xtable-column>-->
          <!--字段不明-->
          <!--<yu-xtable-column label="入池质押率" prop="pjcZyl"></yu-xtable-column>-->
          <yu-xtable-column label="入池时间" prop="rcDate"></yu-xtable-column>
          <!--<yu-xtable-column label="出池时间" prop="ccDate"></yu-xtable-column>-->
          <!--<yu-xtable-column label="票据状态" prop="rcState" data-code="STD_INOUT_TYPE"></yu-xtable-column>-->
        </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_STATE,STD_ZB_CUR_TYP');
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
      grtGuarContParams: {guarContNo: this.getFactory().contextData.guarContNo},
      dataUrl: backend.cmisBiz + '/api/iqpappaspl/getguarbaseinfobyparams',
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