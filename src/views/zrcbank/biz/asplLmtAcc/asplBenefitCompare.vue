
<template>
  <!--
    @created by 屈文
    @description 池效益对比分析
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="池效益对比分析" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="doView">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="资产池额度合计" prop="contAmt"></yu-xtable-column>
            <yu-xtable-column label="池内资产价值合计" prop="inpAssetValue"></yu-xtable-column>
            <yu-xtable-column label="资产池起始日期" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="资产池到期日期" prop="endDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      dataUrl: backend.cmisBiz + '/api/aspltotlincome/tosignlist'
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
      _this.addTab(jsoPar, op);
    },

    // 打开Tab页
    addTab: function (jsoPar, op) {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/asplLmtAcc/asplBenefitCompareBasicInfo',
        title: '资产池详情',
        key: 'key',
        data: {
          data: jsoPar,
          op: op
        }
      });
      _this.initList();
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>