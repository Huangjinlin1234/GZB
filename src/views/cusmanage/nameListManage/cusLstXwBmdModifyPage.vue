<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :rules="preRules">
        <yu-xform-group :column="2">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo" disabled></yu-xform-item>
          <yu-xform-item label="客户号" ctype="input" placeholder="证件号码" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="借据余额" ctype="yu-currency" placeholder="借据余额" name="billBal" disabled :min="0"></yu-xform-item>
          <yu-xform-item label="贷款起始日" ctype="datepicker" placeholder="贷款起始日" name="billStartDate" disabled></yu-xform-item>
          <yu-xform-item label="贷款到期日" ctype="datepicker" placeholder="贷款到期日" name="contEndDate" disabled></yu-xform-item>
          <yu-xform-item label="借据到期日" ctype="datepicker" placeholder="借据到期日" name="billEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="联系方式" ctype="input" placeholder="联系方式" name="linkMode" disabled></yu-xform-item>
          <yu-xform-item label="身份证号" ctype="input" placeholder="身份证号" name="certCode" disabled></yu-xform-item>
          <yu-xform-item label="借据产品名称" ctype="input" placeholder="借据产品名称" name="prdName" disabled ></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" placeholder="还款方式" name="repayMode" disabled data-code="STD_REPAY_MODE"></yu-xform-item>
          <yu-xform-item label="婚姻状况" ctype="select" placeholder="婚姻状况" name="marStatus"  data-code="STD_ZB_MAR_ST" @change="marChange"></yu-xform-item>
          <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" :hidden="marFlag"  rules="required"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="spouseCertCode"  :hidden="marFlag" rules="required"></yu-xform-item>
          <yu-xform-item label="手机号" ctype="input" placeholder="手机号" name="spousePhone" rules="required"  :hidden="marFlag"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="nextStep">保存</yu-button>
      <yu-button type="primary" @click="doCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
import { clone, lookup } from '@/utils';
import { validator } from '@/utils/validate';
lookup.reg('STD_ZB_MAR_ST,STD_REPAY_MODE');
export default {
  data () {
    return {
      formdata: {}, // 表单数据
      saveBtnShow: true, // 保存按钮控制
      dialogTableVisible: false, // dialog弹出控制
      dialogformdata: {}, // dialog查询条件表单
      baseParams: {condition: { managerId: yufp.session.userId }},
      marFlag: true,
      preRules: {
        spouseCertCode: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.IDCard, message: '请输入正确的身份证' }
        ],
        spousePhone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ]
      },
      dataUrl: backend.cmisBiz + '/api/cuslstmclwhbxd/getxdwhbinfo/' // 客户选择查询url
    };
  },
  created () {
    var _this = this;
    _this.$request({
      method: 'POST',
      url: backend.cmisBiz + '/api/cuslstmclwhbxd/selectbyserno',
      data: {serno: this.$route.meta.params.serno, billNo: this.$route.meta.params.billNo}
    }).then(({code, message, data}) => {
      if (data != null) {
        clone(data, _this.formdata);
      } else {
        _this.$message({message: message, type: 'error'});
      }
    });
  },
  methods: {
    marChange (val) {
      if (val == '20') {
        this.marFlag = false;
      } else {
        this.marFlag = true;
      }
    },
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
      jsoPar.listBelg = '小微';
      jsoPar.dataFrom = '01';
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cuslstmclwhbxd/update',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (code == '0') {
          yufp.router.removeTab(_this.$route.path);
          _this.$message({message: '修改成功', type: 'info'});
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
      _this.dialogTableVisible = false;
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
