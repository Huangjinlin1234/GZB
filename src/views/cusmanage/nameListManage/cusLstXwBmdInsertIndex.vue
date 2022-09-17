<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="2">
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo" :on-icon-click="openDialog" icon="search" rules="required"></yu-xform-item>
          <yu-xform-item label="客户号" ctype="input" placeholder="证件号码" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="借据金额" ctype="input" placeholder="借据金额" name="billAmt" disabled></yu-xform-item>
          <yu-xform-item label="借据余额" ctype="yu-currency" placeholder="借据余额" name="billBal" disabled :min="0"></yu-xform-item>
          <yu-xform-item label="贷款起始日" ctype="datepicker" placeholder="贷款起始日" name="billStartDate" disabled></yu-xform-item>
          <yu-xform-item label="贷款到期日" ctype="datepicker" placeholder="贷款到期日" name="contEndDate" disabled></yu-xform-item>
          <yu-xform-item label="借据到期日" ctype="datepicker" placeholder="借据到期日" name="billEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="联系方式" ctype="input" placeholder="联系方式" name="linkMode" disabled colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="yu-button" name="b2" @click="getPhoneNo" colspan="1">获取</yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="certType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          <yu-xform-item label="身份证号" ctype="input" placeholder="身份证号" name="certCode" disabled></yu-xform-item>
          <yu-xform-item label="借据产品名称" ctype="input" placeholder="借据产品名称" name="prdName" disabled ></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" placeholder="还款方式" name="repayMode" disabled data-code="STD_REPAY_MODE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="nextStep">保存</yu-button>
      <yu-button type="primary" @click="doCancel">取消</yu-button>
    </yu-form-buttons>
    <!--dialog弹框-->
    <yu-xdialog title="客户选择" :visible.sync="dialogTableVisible" width="1500px" height="800px" center="true">

      <yu-xform v-model="dialogformdata" ref="refFrom"  related-table-name="dialogtable" form-type="search" :remove-empty="true">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="借据号" label="借据号" ctype="input" name="billNo" ></yu-xform-item>
          <yu-xform-item placeholder="客户号" label="客户号" ctype="input" name="cusId" ></yu-xform-item>
          <yu-xform-item placeholder="客户名称" label="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
          <!-- <yu-xform-item placeholder="合同编号" label="合同编号" ctype="input" name="contNo"></yu-xform-item> -->
        </yu-xform-group>
      </yu-xform>
<!--  -->
      <div class="button-group" style="text-align:left">
        <yu-button type="primary" @click="selectReturn">选取返回</yu-button>
      </div>
      <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" style="width: 100%" condition-key="condition" request-type="post"  @row-dblclick="selectReturn" :base-params="baseParams" >
        <yu-xtable-column label="借据号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="借据金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="借据起始日" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="借据到期日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="联系方式" prop="linkMode"></yu-xtable-column>
        <yu-xtable-column label="身份证号" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="借据产品名称" prop="prdName"></yu-xtable-column>
      </yu-xtable>
    </yu-xdialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {}, // 表单数据
      saveBtnShow: true, // 保存按钮控制
      dialogTableVisible: false, // dialog弹出控制
      dialogformdata: {}, // dialog查询条件表单
      baseParams: {condition: { managerId: yufp.session.userId }},
      dataUrl: backend.cmisBiz + '/api/cuslstmclwhbxd/getxdwhbinfo/' // 客户选择查询url
    };
  },
  created () {
    var _this = this;
    _this.formdata = {};
  },
  methods: {
    nextStep: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
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
      jsoPar.serno = this.$xutils.getDefaultformulaData('SEQ:MD_SERNO');
      jsoPar.listBelg = '小微';
      jsoPar.dataFrom = '01';
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cuslstmclwhbxd/insertCusLstMclWhbxd',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          yufp.router.removeTab(_this.$route.path);
          _this.$message({message: '新增成功', type: 'info'});
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
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
        this.$refs.refForm.resetFields();
      });
      yufp.router.removeTab(_this.$route.path);
    },
    // dialog打开
    openDialog: function () {
      var _this = this;
      _this.dialogTableVisible = true;
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
      this.formdata.billBal = selectionArr[0].loanBalance;
      this.formdata.billStartDate = selectionArr[0].loanStartDate;
      this.formdata.billEndDate = selectionArr[0].loanEndDate;
      this.formdata.billAmt = selectionArr[0].loanAmt;
      this.formdata.certType = 'A';
      _this.dialogTableVisible = false;
      this.getPhoneNo();
    },
    doCancel: function () {
      var _this = this;
      _this.$refs.refForm.resetFields();
      yufp.router.removeTab(_this.$route.path);
      // _this.$router.push({name: _this.$route.name});
    },
    /** 通过客户号，获取手机号码 */
    getPhoneNo () {
      let _this = this;
      let cusId = _this.formdata.cusId;
      if (cusId == null || cusId == '') {
        _this.$message({message: '请先选择借据号填入客户号', type: 'warning'});
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivcontact/selectbycusid',
        data: {cusId: cusId}
      }).then(({code, message, data}) => {
        if (data != null) {
          if (data.mobileNo == null || data.mobileNo == '') {
            _this.$message({message: '未获取到联系方式！', type: 'warning'});
          } else {
            _this.formdata.linkMode = data.mobileNo;
          }
        } else {
          _this.$message({message: message, type: 'error'});
        }
      });
    }
  }
};
</script>
