<template>
  <!--
    @created by ywl
    @updated by
    @description 新增向导
  -->
  <div>
    <yu-panel title="" :hideFilter="false" :collapseHide="false">
      <div style="padding:0 30%">
        <yu-xform label-width="120px" v-model="formdata">
          <yu-xform-group column="1">
            <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" colspan="21"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
              <yu-button type="primary" @click="selectFn">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
    <yu-form-buttons style="text-align:center">
      <yu-button type="primary" @click="nextFn">下一步</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="dialogVisible" >
      <yu-tabs v-model="tabName">
        <yu-tab-pane label="个人额度" name="corp">
          <yu-xform form-type="search" v-model="searchFormdataCorp" label-width="100px" related-table-name="refTableCorp">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refTableCorp" :row-number="true" selection-type="radio" :pageable="false" :data-url="corpdataUrl" request-type="post" condition-key="condition" :base-params="baseParamsCorp" :parse-response="requestSuccess1">
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
              <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
            </yu-xtable>
            <div style="text-align:center;">
              <el-button type="primary" @click="backToAddCorp" size="small">确认</el-button>
              <el-button @click="cancel" size="small">取消</el-button>
            </div>
        </yu-tab-pane>
        <yu-tab-pane label="法人额度" name="pers">
          <yu-xform form-type="search" v-model="searchFormdataPers" label-width="100px" related-table-name="refTablePers">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refTablePers" :row-number="true" selection-type="radio" :pageable="true" request-type="post" :data-url="persdataUrl" condition-key="condition" :base-params="baseParamsPers" :parse-response="requestSuccess">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
              <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
          </yu-xtable>
          <div style="text-align:center;">
            <el-button type="primary" @click="backToAddPers" size="small">确认</el-button>
            <el-button @click="cancel" size="small">取消</el-button>
          </div>
        </yu-tab-pane>
      </yu-tabs>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      dialogVisible: false,
      baseParamsCorp: {},
      baseParamsPers: {},
      corpdataUrl: this.$backend.cmisLmt + '/api/apprstrmtableinfo/queryLmtListBymodel',
      persdataUrl: this.$backend.cmisLmt + '/api/apprstrmtableinfo/queryLmtListBymodel',
      tabName: 'corp'
    };
  },
  methods: {
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTablePers.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
    },
    requestSuccess1 (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTableCorp.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
    },
    // 选取按钮
    selectFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      var lmtAccOperType = _this.formdata.lmtAccOperType;
      let loginUser = _this.$xutils.getLoginUserInfo();
      // managerId 主管客户经理     cusType客户类型    instueCode金融机构代码  djjdFlag冻结解冻标识   isGrp是否集团
      _this.baseParamsCorp = {condition: JSON.stringify({ cusType: '1', djjdFlag: lmtAccOperType, isGrp: '0'})};
      _this.baseParamsPers = {condition: JSON.stringify({ cusType: '2', djjdFlag: lmtAccOperType, isGrp: '0'})};
    },
    /**
     * 下一步
     */
    nextFn: function (data) {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      _this.queryOper(model);
    },

    queryOper: function (model) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperapp/selectlmtreplyaccoperapp',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.rtnCode == '000000') {
              _this.addTab(response.data.serno);
              // yufp.router.removeTab(this.$route.path);
              // this.$dialog.close(this.dialogId);
              // this.$nextTick(() => {
              //   this.$dialog.close(this.dialogId);
              // });
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
    addTab: function (serno) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperDetai',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai', // 必传
        // 页签名称
        title: '变更新增页面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'ADD',
          serno: serno
        }
      });
    },
    // 返回
    cancelFn: function () {
      // this.$dialog.close(this.dialogId);
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 法人选取返回
     */
    backToAddCorp () {
      var _this = this;
      var selectionAry = _this.$refs.refTableCorp.selections;
      if (selectionAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // const params = _this.$refs.refTableCorp.selections[0];
      // this.$emit('select-fn', params);
      this.$nextTick(function () {
        yufp.extend(this.formdata, selectionAry[0]);
      });
      this.dialogVisible = false;
    },
    /**
     * 个人选取返回
     */
    backToAddPers () {
      var _this = this;
      var selectionAry = _this.$refs.refTablePers.selections;
      if (selectionAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // const params = _this.$refs.refTablePers.selections[0];
      // this.$emit('select-fn', params);
      this.$nextTick(function () {
        yufp.extend(this.formdata, selectionAry[0]);
      });
      this.dialogVisible = false;
    },
    /**
     * 取消
     */
    cancel () {
      this.dialogVisible = false;
    }
  }
};
</script>
