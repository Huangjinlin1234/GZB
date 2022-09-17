<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './noRepayGuaranteeOwnerInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dypGyr: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 无还本续贷抵押品共有人信息页面
    /* 初始化页面*/
    afterInit () {
      this.dypGyr = this.$refs.d1_BillCard;
      this.dypGyr.formdata.surveySerno = this.pageParams.surveySerno;
      this.dypGyr.formdata.pldimnNo = this.pageParams.pkId;
    },

    // 【保存】按钮的逻辑
    save () {
      var _this = this;
      const saveFlag = _this.dypGyr.validateBillCardValue();
      _this.dypGyr.execBillCardDefaultValueFormula;
      if (!saveFlag) {
        return;
      }
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/lmtguarecommenownerinfo/savecommenownerinfo',
        method: 'post',
        data: _this.dypGyr.formdata
      }).then((response) => {
        if (response.code === '0') {
          _this.$dialog.close(_this.dialogId);
          _this.$message({ message: response.message, type: 'success' });
        } else {
          _this.$message({ message: response.message, type: 'warning' });
        }
      });
    },

    // 根据“共有人名称”、“共有人身份证号”去ecif查询客户编号并反显；若未查询到客户，则跳转到客户快捷创建页面。
    selectCusInfo () {
      var _this = this;
      var certType = 'A';
      if (_this.dypGyr.formdata.commenOwnerName == null ||
        _this.dypGyr.formdata.commenOwnerName.toString().length == 0 ||
       _this.dypGyr.formdata.commenOwnerCertCode == null ||
        _this.dypGyr.formdata.commenOwnerCertCode.toString().length == 0) {
        this.$message({message: '请补所有权人或所有权人证件号码'});
        return;
      }
      var certCode = _this.dypGyr.formdata.commenOwnerCertCode;
      var cusName = _this.dypGyr.formdata.commenOwnerName;
      var rqData = {};
      rqData['certType'] = certType;
      rqData['certCode'] = certCode;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/getCusMsg',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            _this.dypGyr.formdata.commenOwnerCusId = response.data.cusId;
            _this.dypGyr.formdata.commenOwnerName = response.data.cusName;
          } else {
          // 去快速创建
            _this.dypGyr.visiableCus = true;
            this.$nextTick(function () {
              _this.dypGyr.dialogData.cusName = cusName;
              _this.dypGyr.dialogData.certCode = certCode;
              _this.dypGyr.dialogData.certType = 'A';
            //   };
            });
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },
    /** 快捷创建
     */
    creat () {
      var validate = false, _this = this;
      _this.dypGyr.$refs.dialogKH.validate(function (valid) {
        validate = valid;
        valid ? console.log('验证通过') : _this.$message({message: '请输入正确的身份证号码', type: 'error'});
      });
      if (!validate) {
        return;
      }
      var rqData = _this.dypGyr.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          this.$message({message: '创建成功'});
          _this.dypGyr.formdata.cusId = response.data.cusId;
          _this.dypGyr.formdata.commenOwnerName = response.data.cusName;
          _this.dypGyr.formdata.commenOwnerCertCode = response.data.certCode;
          _this.dypGyr.visiableCus = false;
        } else {
          this.$message({message: response.message});
        }
      });
    },
    back () {
      this.dypGyr.dialogKH.resetFields();
      this.visiableCus = false;
    }
  }
};
</script>
