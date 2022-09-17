<template>
  <div>
    <yu-panel title="交易对手信息" panel-type="simple">
      <yu-toolBar>
        <yu-button ref="btn_onAdd" @click="customClick('onAdd')" :hidden="isShowButton">新增</yu-button>
        <yu-button ref="btn_onDelete" @click="customClick('onDelete')" :hidden="isShowButton">删除  </yu-button>
        <yu-button ref="btn_onUpdate" @click="customClick('onUpdate')" :hidden="isShowButton">修改</yu-button>
      </yu-toolBar>
      <yu-xtable ref="refTable" row-number condition-key="condition"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="业务主键号" prop="bizSerno" ></yu-xtable-column>
        <yu-xtable-column label="业务场景" prop="bizSence" hide-column></yu-xtable-column>
        <yu-xtable-column label="是否线上" prop="isOnline" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否本行账户" prop="isBankAcct" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
        <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: '',
      baseParams: {},
      isShowButton: false,
      data: {},
      iqpSerno: '',
      op: ''
    };
  },
  created () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      var _this = this;
      if (_this.getFactory().contextData.instanceInfo) {
        _this.data = _this.getFactory().contextData.instanceInfo;
        _this.iqpSerno = _this.data.bizId;
        _this.op = 'VIEW';
      } else if (_this.$route.meta.params) {
        _this.data = _this.$route.meta.params;
        _this.iqpSerno = _this.data.iqpSerno;
        _this.op = _this.data.op;
      } else {
        _this.data = _this.getFactory().contextData;
        _this.iqpSerno = _this.data.iqpSerno;
        _this.op = _this.data.op;
      }
      if (_this.op === 'VIEW') {
        this.isShowButton = true;
      }
      _this.dataUrl = this.$backend.cmisBiz + '/api/toppacctsub/selectBySerno';
      _this.baseParams = {condition: {serno: this.iqpSerno}};
    }
  }
};
</script>