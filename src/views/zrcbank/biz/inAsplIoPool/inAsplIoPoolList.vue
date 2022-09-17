
<template>
  <!--
    @created by 屈文
    @description 资产入池查询列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="资产入池查询" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label-width="160px" label="流资产池协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label-width="160px" label="客户名称" ctype="input" placeholder="客户名称" name="cusName"  fuzzy-query="both"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <yu-button @click="doView" v-if="checkCtrl('view')" type="primary">查看</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="入池资产价值" prop="lmtAmt"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构号" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="录入时间" prop="inputDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/aspliopool/inpoollist',
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
    /**
     * 查看详情
     */
    doView: function () {
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
      // var _this = this;
      // var modelGroupNo = 'CMG000159';
      // jsoPar['model_group_no'] = modelGroupNo;
      // jsoPar['op'] = op;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   _this.initList(),
      //   true,
      //   true
      // );

      var _this = this;
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + 'add',
        title: '资产入池记录详情',
        data: {
          model_group_no: 'CMG000159',
          op: op,
          serno: jsoPar.serno
        }
      });
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>