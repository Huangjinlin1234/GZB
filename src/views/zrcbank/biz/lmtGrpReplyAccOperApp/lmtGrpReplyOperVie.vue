<template>
  <!--
    @created by ywl
    @updated by
    @description 新增向导
  -->
  <div>
    <yu-panel title="集团客户额度冻结/解冻/终止" :hideFilter="false" :collapseHide="false">
      <div style="padding:0 30%">
        <yu-xform label-width="120px" v-model="formdata">
          <yu-xform-group column="1">
            <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" colspan="21">
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
              <yu-button type="primary" @click="selectFn">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
    <yu-form-buttons style="text-align:center">
      <yu-button type="primary" @click="nextFn">下一步</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="dialogVisible" :width="width">
      <yu-panel title="客户额度选取" panel-type="simple">
        <yu-xform form-type="search" v-model="searchFormdataCorp" label-width="100px" related-table-name="refTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="grpNo"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="grpName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" request-type="post" :pageable="true" :data-url="dataUrl" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="grpNo"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="grpName"></yu-xtable-column>
          <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
          <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
          <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
        </yu-xtable>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">确定</yu-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    </div>
</template>
<script>
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE');
export default {
  data: function () {
    return {
      formdata: {},
      dialogVisible: false,
      baseParams: {},
      dataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectGrpStrInfoByList'
    };
  },
  methods: {
    // 选取按钮
    selectFn: function () {
      this.dialogVisible = true;
      this.baseParams = {condition: JSON.stringify({ cusType: '4', oprType: '01', apprStatus: this.formdata.lmtAccOperType })};
    },
    /**
     * 下一步
     */
    nextFn: function (data) {
      var _this = this;
      _this.queryOper(_this.formdata);
    },
    queryOper: function (model) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/selectlmtgrpreplyaccoperapp',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.rtnCode == '000000') {
              _this.addTab(response.data.serno);
            } else {
              _this.$message(response.data.rtnMsg);
              return;
            }
          } else {
            return;
          }
        }
      });
    },
    addTab: function (grpSerno) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperDetai',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai', // 必传
        // 页签名称
        title: '变更新增页面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'ADD',
          grpSerno: grpSerno
        }
      });
    },
    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    confirmNum: function () {
      var _this = this;
      if (_this.$refs.refTableNum.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTableNum.selections[0];
      this.formdata.grpCusId = params.cusid;
      this.formdata.grpCusName = params.cusname;
      this.dialogVisible = false;
    },

    // 确定按钮
    saveFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.$nextTick(function () {
        // yufp.extend(_this.formdata, selectionAry[0]);
        this.formdata.grpCusId = selectionAry[0].grpNo;
        this.formdata.grpCusName = selectionAry[0].grpName;
      });
      _this.dialogVisible = false;
    }
  }
};
</script>
