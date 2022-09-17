<template>
  <!--
    @created by zxz
    @time  2021/5/5
    @description 项下业务信息
  -->
  <div>
        <yu-panel title="项下业务信息" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refbaseTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="dataParam" align="center" requestType="POST"  selection-type="radio">
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="银承核心编号" prop="coreBillNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
        <yu-xtable-column align="center" label="开票张数" prop="isseCnt"></yu-xtable-column>
        <yu-xtable-column align="center" label="票面总金额(元)" prop="drftTotalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="出票日期" prop="isseDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="保证金总金额(元)" prop="bailAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态" prop="accStatus" data-code="STD_ACC_ACCP_STATUS"></yu-xtable-column>
      </yu-xtable>
        </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');

export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      dataUrl: '',
      dataParam: {}
    };
  },
  created () {
    var _this = this;
    var data = {};
    var contNo = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      contNo = data.param.contNo;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      contNo = data.contNo;
    } else {
      data = _this.getFactory().contextData;
      contNo = data.contNo;
    }
    this.dataUrl = this.$backend.cmisBiz + '/api/accaccp/queryAll';
    this.dataParam = { condition: JSON.stringify({ contNo: contNo }) };
  },
  methods: {
    /* 查看详情 */
    doView () {
      var _this = this;
      var jsoPar = _this.$refs.refbaseTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['op'] = 'VIEW';
      let path = 'cusmanage/indivCus/indivBankQuery/indivBankQueryDetail';
      this.$router.addTab({
        name: path,
        key: jsoPar.coreBillNo + jsoPar.op,
        title: '银承台账详情',
        data: jsoPar
      });
    }
  }
};
</script>
