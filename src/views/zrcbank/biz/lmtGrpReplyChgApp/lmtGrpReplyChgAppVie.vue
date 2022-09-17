<template>
  <!--
    @created by yangwl
    @time  2021/4/22
    @description 批复变更向导
  -->
  <div>
    <yu-panel title="集团客户授信批复变更" :hideFilter="false" :collapseHide="false">
      <div style="padding:0 30%">
        <yu-xform label-width="120px" v-model="formdata">
          <yu-xform-group column="1">
            <yu-xform-item label="批复编号" ctype="custom" name="grpReplySerno" colspan="21">
              <yu-input v-model="formdata.grpReplySerno"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
              <yu-button type="primary" @click="selectFn">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" disabled="true"></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
    <yu-form-buttons style="text-align:center">
      <yu-button type="primary" @click="nextFn">下一步</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog title="集团客户授信批复" height="650px" width="800px" :visible.sync="dialogVisible">
      <yu-xform related-table-name="refTable" form-type="search" label-width="60px">
        <yu-xform-group :column="4">
          <yu-xform-item label="批复编号" placeholder="编号" ctype="input" name="grpReplySerno"></yu-xform-item>
          <yu-xform-item label="集团客户名称" placeholder="名称" ctype="input" name="grpCusName"></yu-xform-item>
          <yu-xform-item label="集团客户编号" placeholder="编号" ctype="input" name="grpCusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" label-width="100px" :data-url="dataUrl1" :base-params="baseParams" request-type="post" :pageable="true" condition-key="condition" :default-load="true">
        <yu-xtable-column label="批复编号" prop="grpReplySerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="replyStatus" data-code="STD_XD_REPLY_STATUS" hide-column></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton" style="text-align:center;">
        <yu-button type="primary" @click="saveFn">选取返回</yu-button>
        <yu-button type="primary" @click="cancelFn1">取消</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogId: String
  },
  data: function () {
    return {
      // 点击选取按钮弹出框列表查询路径
      dataUrl1: backend.cmisBiz + '/api/lmtgrpreply/getChangeableReplyNo',
      baseParams: {condition: {replyStatus: '01'}},
      userStatus: {},
      formdata: {}, // 编辑表格表单
      formdata1: {},
      dialogVisible: false
    };
  },
  methods: {
    /**
     * 下一步
     */
    nextFn: function (data) {
      var _this = this;
      var model = {};
      debugger;
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/lmtgrpreplychg/insertlmtgrpreplychg'; // 新增
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          _this.$router.addTab({
            // 路由名称
            name: 'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgDetail',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'lmtGrpReplyChgDetail_' + new Date().getTime(), // 必传
            // 页签名称
            title: '变更新增页面',
            // 传递的业务数据，可选配置
            data: {
              saveBtnShow: true,
              viewType: 'ADD',
              // selectionArys: _this.$refs.refTable.selections,
              grpReplySerno: response.data.grpReplySerno,
              grpSerno: response.data.grpSerno,
              grpCusId: response.data.grpCusId
            }
          });
          _this.$dialog.close(_this.dialogId);
        }
      });
    },
    // 返回
    cancelFn: function () {
      // yufp.router.removeTab('/zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgAppVie/lmtGrpReplyChgAppVie');
      this.$dialog.close(this.dialogId);
    },
    /**
     * 取消
     */
    cancelFn1: function (data) {
      this.dialogVisible = false;
    },
    // 选取按钮
    selectFn: function () {
      var _this = this;
      _this.dialogVisible = true;
    },
    // 选取弹框里面的下一步按钮
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
      yufp.clone(selectionAry[0], _this.formdata);
      // _this.formdata.lmtReplySerno = selectionAry[0].replySerno;
      // _this.formdata.grpCusId = selectionAry[0].grpCusId;
      // _this.formdata.grpCusName = selectionAry[0].grpCusName;
      _this.dialogVisible = false;
    }
  }
};
</script>
