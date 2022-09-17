<template>
  <!--
    @created by zhangming12
    @time  2021/4/27
    @description 批复变更向导
  -->
  <div>
    <yu-panel title="单一客户授信批复变更" :hideFilter="false" :collapseHide="false">
      <div style="padding:0 30%">
        <yu-xform label-width="120px" v-model="formdata">
          <yu-xform-group column="1">
            <yu-xform-item label="批复编号" ctype="custom" name="custom" colspan="21">
              <yu-input v-model="formdata.replySerno"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
              <yu-button type="primary" @click="selectFn">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
    <yu-form-buttons style="text-align:center">
      <yu-button type="primary" @click="nextFn">下一步</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog title="单一客户授信批复" height="650px" width="800px" :visible.sync="dialogVisible">
      <yu-xform related-table-name="refTable" form-type="search" label-width="60px" v-model="qurForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" label-width="100px" request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-button" style="text-align:center;">
        <yu-button type="primary" @click="selectedFn">下一步</yu-button>
        <yu-button type="primary" @click="closeDialog">取消</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/lmtreply/getChangeableReply',
      userStatus: {},
      formdata: {}, // 编辑表格表单
      changeableReplys: [],
      dialogVisible: false,
      qurForm: {},
      serno: ''
    };
  },
  mounted () {

  },
  methods: {
    /**
     * 下一步--批复变更页*/
    nextFn: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: {replySerno: _this.formdata.replySerno},
        url: backend.cmisBiz + '/api/lmtreplychg/insertAllReplyChg/',
        callback: function (code, message, response) {
          _this.serno = response.data;
          _this.$router.addTab({
            // 路由名称
            name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyCHg',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'lmtReplyCHg', // 必传
            // 页签名称
            title: '变更新增页面',
            // 传递的业务数据，可选配置
            data: {
              replySerno: _this.formdata.replySerno,
              serno: _this.serno
            }
          });
        }
      });
    },
    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 取消
     */
    closeDialog: function () {
      this.dialogVisible = false;
    },
    // 选取按钮
    selectFn: function () {
      var _this = this;
      _this.dialogVisible = true;
    },
    // 选取弹框里面的下一步按钮
    selectedFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      yufp.clone(selectionAry[0], _this.formdata);
      _this.dialogVisible = false;
    }
  }
};
</script>
