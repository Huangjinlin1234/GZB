<template>
  <div>
    <yu-panel title="展期台账" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="展期协议编号" ctype="input" placeholder="展期协议编号" name="extCtrNo"></yu-xform-item>
          <yu-xform-item label="原借据编号" ctype="input" placeholder="原借据编号" name="oldBillNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="台账状态" ctype="select" data-code="STD_ZB_ACC_TYP" placeholder="台账状态" name="accStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="展期协议编号" prop="extCtrNo"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期到期日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ZB_ACC_TYP"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_ACC_TYP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/accext/',
      baseParams: {},
      searchFormdata: {}
    };
  },
  methods: {
    // 查看
    doView () {
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      params['op'] = 'VIEW';

      this.$dialog.open(
        '展期台账详情',
        'bizmanage/accBiz/accExtBiz/accExtDetailsIndex',
        -1,
        -1,
        params,
        null
      );
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
