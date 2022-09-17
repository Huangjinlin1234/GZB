
<template>
  <!--
    @created by 屈文
    @description 担保合同
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="列表信息" name="messageTip">
        <yu-button-drop>
          <yu-button @click="doView">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="grtGuarContParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
          <yu-xtable-column label="担保合同中文编号" prop="guarContCnNo"></yu-xtable-column>
          <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="担保金额（元）" prop="guarAmt"></yu-xtable-column>
          <yu-xtable-column label="担保合同状态" prop="guarContStatus" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
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
      grtGuarContParams: {serno: this.getFactory().contextData.serno},
      dataUrl: backend.cmisBiz + '/api/iqpappaspl/querygrtguarcontbyparams',
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
    // 查看
    doView () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var op = 'VIEW';
      _this.jumpFactory(jsoPar, op);
    },

    // 跳转模板工厂
    jumpFactory: function (jsoPar, op) {
      var _this = this;
      var modelGroupNo = 'CMG000543';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = op;
      _this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        800,
        jsoPar,
        _this.initList(),
        true,
        true
      );
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>