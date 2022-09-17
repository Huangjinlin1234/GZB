
<template>
  <!--
    @created by css
    @description 超短贷线上用款开关
  -->
  <div style="height:280px">
    <yu-panel title="资产池-超短贷款开关" :hideFilter="false" :collapseHide="false">
      <yu-switch v-model="value1"  on-color="#13ce66" off-color="#ff4949" on-text="开关" off-value="0"></yu-switch>
    </yu-panel>
    <el-divider></el-divider>
    <yu-panel title="资产池-出票开关" :hideFilter="false" :collapseHide="false">
      <yu-switch v-model="value2"  on-color="#13ce66" off-color="#ff4949" on-text="开关" off-value="0"></yu-switch>
    </yu-panel>
    <!--<yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button @click="doUpdateBegin">启用</yu-button>
        <yu-button @click="doUpdateFinish">停用</yu-button>
        <yu-button @click="doView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="资产池协议编号" prop="contNo" utrace></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO" utrace></yu-xtable-column>
        <yu-xtable-column label="录入日期" prop="inputDate" utrace></yu-xtable-column>
      </yu-xtable>
    </yu-panel>-->
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctraspldetails/tosignlist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ],
      value1: true,
      value2: true
    };
  },
  methods: {
    /**
     * 启用
     */
    doUpdateBegin: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.isBegin == '1') {
        _this.$xutils.showMsgBox('提示', '不符合启用规则,禁止启用!', 350, 150);
        return;
      }
      jsoPar.isBegin = '1';
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/ctraspldetails/update',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('提示', '启用成功!', 350, 150, () => {
            this.initList();
          });
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    /**
     * 停用
     */
    doUpdateFinish: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.isBegin == '0') {
        _this.$xutils.showMsgBox('提示', '不符合停用规则,禁止停用!', 350, 150);
        return;
      }
      jsoPar.isBegin = '0';
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/ctraspldetails/update',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('提示', '停用成功!', 350, 150, () => {
            this.initList();
          });
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    doUpdateLog () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
    },
    /**
     * 列表详情
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
      var _this = this;
      var modelGroupNo = 'CMG000539';
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
