
<template>
  <!--
    @created by 屈文
    @description 保证金账户列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="保证金账户管理" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search"  v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
            <yu-xform-group :column="3">
              <yu-xform-item label-width="160px" label="协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo"></yu-xform-item>
              <yu-xform-item label-width="160px" label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label-width="160px" label="保证金账户编号" ctype="input" placeholder="保证金账户编号" name="bailAccNo"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <yu-button @click="doView" v-if="checkCtrl('view')" type="primary">查看</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno"  hide-cloumn></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="保证金账户编号" prop="bailAccNo"></yu-xtable-column>
            <yu-xtable-column label="保证金开户行名称" prop=""></yu-xtable-column>
            <yu-xtable-column label="账户状态" prop=""></yu-xtable-column>
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
      dataUrl: backend.cmisBiz + '/api/ctraspldetails/ctraspidetailsandbailaccinfolist',
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
      _this.addTab(jsoPar, op);
    },

    // 打开Tab页
    addTab: function (jsoPar, op) {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/bailAccInfo/bailAccExtractBasicInfo',
        title: '保证金详情',
        key: 'key',
        data: {
          data: jsoPar,
          op: op
        }
      });
    },

  }
};
</script>