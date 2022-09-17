<template>
  <div>
    <yu-panel title="原账号信息" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="账户属性" prop="acctAttr" data-code="STD_ZB_BR_ID_ATTR"></yu-xtable-column>
        <yu-xtable-column label="账号归属" prop="acctBelong" data-code="STD_ZB_ACCT_BELONG"></yu-xtable-column>
        <yu-xtable-column label="账号分类" prop="acctClass" data-code="STD_ZB_ACCT_CLASS"></yu-xtable-column>
        <yu-xtable-column label="账号" prop="acctNo"></yu-xtable-column>
        <yu-xtable-column label="账号名称" prop="acctName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="账号状态" prop="acctStatus" data-code="STD_ZB_PVP_ACCT_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_BR_ID_ATTR,STD_ZB_ACCT_BELONG,STD_ZB_ACCT_CLASS,STD_ZB_CUR_TYP,STD_ZB_PVP_ACCT_ST');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      baseParams: {condition: {'oprType': '01', 'acctChgFlag': '01'}},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpacct/'
    };
  },
  mounted () {
    this.$refs.refTable.remoteData({iqpSerno: this.getFactory().contextData.iqpSerno});
  },
  methods: {
    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['opType'] = 'view';
      this.$dialog.open(
        '账号信息申请',
        'bizmanage/chgBiz/accInfoChgBiz/newAccInfoChgUpdateIndex',
        900,
        600,
        jsoPar
      );
    }
  }
};
</script>
