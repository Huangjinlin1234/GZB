
<template>
  <!--
    @created by 屈文
    @description 资产池协议变更列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="资产池协议注销" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label="协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="协议状态" ctype="select" placeholder="协议状态" name="contStatus"   data-code="STD_CONT_STATUS"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <!--<yu-button @click="doStop" type="primary">停用</yu-button>
            <yu-button @click="doStart" type="primary">启用</yu-button>-->
            <yu-button @click="doLogout" v-if="checkCtrl('logout')" type="primary">注销</yu-button>
            <!--<yu-button @click="doStopStartLog" type="primary">停用/启用日志</yu-button>-->
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="contAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险金额" prop="lowRiskAmt"></yu-xtable-column>
            <yu-xtable-column label="一般风险金额" prop="commonRiskAmt"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
      <!--启用/停用日志-->
      <yu-xdialog title="池额度协议停用/注销日志" :visible.sync="dialogVisibleGuide" width="650px">
        <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
          <yu-xtable ref="refTable" condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrlLog" request-type="POST">
            <yu-xtable-column label="操作类型" prop=""></yu-xtable-column>
            <yu-xtable-column label="操作时间" prop=""></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop=""></yu-xtable-column>
            <yu-xtable-column label="管理机构" prop=""></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop=""></yu-xtable-column>
          </yu-xtable>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="close">关闭</yu-button>>
          </div>
        </yu-xform>
      </yu-xdialog>
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
      dataUrl: backend.cmisBiz + '/api/ctraspldetails/tosignlist',
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
     * 启用、停用、注销通用方法
     */
    doCommon: function (jsoPar, contStatus, successMsg) {
      var _this = this;
      var pkId = '';
      jsoPar.forEach(item => {
        pkId = pkId + item.pkId + ',';
      });
      let sernoData = {
        pkId: pkId.substring(0, pkId.length - 1),
        contStatus: contStatus
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctraspldetails/ctraspldetailsstartstoplogout',
        data: sernoData,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$xutils.showMsgBox('提示', successMsg, 350, 150, _this.initList());
            } else {
              _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            return;
          }
        }
      });
    },

    /**
     * 停用
     */
    doStop: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length == 0) {
        _this.$xutils.showMsgBox('提示', '请至少选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections;
      for (let i = 0; i < jsoPar.length; i++) {
        if (jsoPar[i].contStatus == '500') {
          _this.$xutils.showMsgBox('提示', '已选合同存在合同状态为【中止】或【注销】，不允许停用', 350, 150);
          return;
        }
      }
      var contStatus = '500';
      var successMsg = '停用成功';
      _this.doCommon(jsoPar, contStatus, successMsg);
    },

    /**
     * 启用
     */
    doStart: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length == 0) {
        _this.$xutils.showMsgBox('提示', '请至少选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections;
      for (let i = 0; i < jsoPar.length; i++) {
        if (jsoPar[i].contStatus == '200' || jsoPar[i].contStatus == '600') {
          _this.$xutils.showMsgBox('提示', '已选合同存在合同状态为【生效】或【注销】，不允许启用', 350, 150);
          return;
        }
      }
      var contStatus = '200';
      var successMsg = '启用成功';
      _this.doCommon(jsoPar, contStatus, successMsg);
    },

    // 注销
    doLogout () {
      var _this = this;
      if (_this.$refs.refTable.selections.length == 0) {
        _this.$xutils.showMsgBox('提示', '请至少选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections;
      for (let i = 0; i < jsoPar.length; i++) {
        if (jsoPar[i].contStatus == '600') {
          _this.$xutils.showMsgBox('提示', '已选合同存在合同状态为【注销】，请勿重复操作！', 350, 150);
          return;
        }
      }
      var contStatus = '600';
      var successMsg = '注销成功';
      _this.doCommon(jsoPar, contStatus, successMsg);
    },

    /**
     * 启用/停用日志
     */
    doStopStartLog: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      _this.dialogVisibleGuide = true;
    },

    /**
     * 关闭
     */
    close: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>