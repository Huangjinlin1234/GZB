
<template>
  <!--
    @created by 屈文
    @description 保证金提取列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="保证金提取列表" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label="协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480"></yu-xform-item>
                <yu-xform-item label="保证金账户编号" ctype="input" placeholder="保证金账户编号" name="bailAccNo"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <yu-button @click="doView" type="primary">查看</yu-button>
            <yu-button @click="submit" type="primary">提交</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="保证金账户编号" prop="bailAccNo"></yu-xtable-column>
            <yu-xtable-column label="本次提取金额" prop="curtExtractAmt"></yu-xtable-column>
            <yu-xtable-column label="保证金账户余额" prop="bailAccNoBal"></yu-xtable-column>
            <yu-xtable-column label="账户状态" prop="acctStatus" data-code="STD_ACCT_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS,STD_ACCT_STATUS');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
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
      dataUrl: backend.cmisBiz + '/api/bailextractapp/tosignlist',
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
        name: 'zrcbank/biz/bailAccInfo/bailAccBasicInfo',
        title: '资产池详情',
        key: 'key',
        data: {
          data: jsoPar,
          op: op
        }
      });
      _this.initList();
    },

    // 提交
    submit: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var model = {};
      yufp.clone(jsoPar, model);
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = model.managerBrId;
      startdto.userId = model.managerId;
      startdto.bizType = 'ZC003'; // 需要判断不同的授信类型，然后biz_type不同传参
      startdto.bizId = model.serno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    onBack () {
      this.initList();
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>