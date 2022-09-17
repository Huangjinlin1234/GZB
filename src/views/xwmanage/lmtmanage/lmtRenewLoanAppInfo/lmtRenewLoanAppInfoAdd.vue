<template>
  <div>
    <yu-xform ref="formdata" label-width="120px" v-model="formdata">
      <yu-xform-group :column="2">
        <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" :on-icon-click="openDialog" icon="search" rules="required"></yu-xform-item>
        <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled rules="required"></yu-xform-item>
        <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="oldContNo" disabled rules="required"></yu-xform-item>
        <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" disabled rules="required" data-code="STD_CONT_TYPE"></yu-xform-item>
        <yu-xform-item label="合同金额" ctype="yu-currency" placeholder="合同金额" name="contAmt" disabled :min="0" rules="required"></yu-xform-item>
        <yu-xform-item label="借据余额" ctype="yu-currency" placeholder="借据余额" name="billBalance" disabled :min="0" rules="required"></yu-xform-item>
        <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="appPhone" disabled rules="required"></yu-xform-item>
        <yu-xform-item label="企业名称" ctype="textarea" placeholder="企业名称" name="conName" disabled ></yu-xform-item>
        <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="unifyCreditCode" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="doSave" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="onConfirm">取消</yu-button>
      </yu-form-buttons>
    </div>
    <!--dialog弹框-->
    <yu-dialog title="客户选择" :visible.sync="dialogTableVisible" :min-height="800" center="true">

      <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search" :remove-empty="true">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="客户名称" label="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="证件号" label="证件号" ctype="input" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
<!---->
      <div class="button-group" style="text-align:left">
        <yu-button type="primary" @click="selectReturn">选取返回</yu-button>
      </div>
      <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" style="width: 100%" condition-key="condition" @row-dblclick="selectReturn" :base-params="baseParams" >
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="申请人姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="申请人证件号" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="原合同编号" prop="oldContNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="billBalance"></yu-xtable-column>
        <yu-xtable-column label="申请人手机号" prop="appPhone"></yu-xtable-column>
        <yu-xtable-column label="企业名称" prop="conName"></yu-xtable-column>
        <yu-xtable-column label="统一社会信用代码" prop="unifyCreditCode"></yu-xtable-column>
        <yu-xtable-column label="客户经理工号" prop="managerId" v-show="false"></yu-xtable-column>
        <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId" v-show="false"></yu-xtable-column>
      </yu-xtable>
    </yu-dialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_TYPE');
export default {
  data () {
    return {
      formdata: {}, // 表单数据
      saveBtnShow: true, // 保存按钮控制
      dialogTableVisible: false, // dialog弹出控制
      dialogformdata: {}, // dialog查询条件表单
      baseParams: {condition: { managerId: yufp.session.userId }},
      dataUrl: backend.cmisBiz + '/api/lmtrenewloanappinfo/getRenewLoanCusInfo' // 客户选择查询url
    };
  },

  methods: {
    // dialog打开
    openDialog: function () {
      var _this = this;
      _this.dialogTableVisible = true;
    },
    // 保存
    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.formdata.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息补充完整！');
        return;
      }
      var jsoPar = {};
      yufp.clone(_this.formdata, jsoPar);
      jsoPar.inputId = yufp.session.userId;
      jsoPar.inputBrId = yufp.session.org.id;
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrenewloanappinfo/save',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          yufp.router.removeTab(_this.$route.path);
          _this.$message({message: '新增成功', type: 'info'});
          this.$router.push({name: _this.$route.name});
        } else {
          _this.$message({message: message, type: 'error'});
        }
      });
    },
    // 取消
    onConfirm: function () {
      var _this = this;
      this.$nextTick(function () {
        this.$refs.formdata.resetFields();
      });
      yufp.router.removeTab(_this.$route.path);
    },
    // 选取返回
    selectReturn: function () {
      var _this = this;
      var selectionArr = _this.$refs.dialogtable.selections;
      if (selectionArr.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      yufp.clone(selectionArr[0], _this.formdata);
      _this.dialogTableVisible = false;
    }
  }
};
</script>
