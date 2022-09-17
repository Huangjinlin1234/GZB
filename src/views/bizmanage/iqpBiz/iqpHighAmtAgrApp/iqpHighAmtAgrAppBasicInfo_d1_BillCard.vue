<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isEdit">
        <yu-panel title="基本信息" padding-top :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled colspan="24"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="协议币种" ctype="select" name="agrType" rules="required" disabled data-code="STD_ZB_CUR_TYP" placeholder="协议币种"></yu-xform-item>
            <yu-xform-item label="协议金额" ctype="yu-num" number-formatter="0,000.00" placeholder="协议金额" name="agrAmt" rules="required" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="本协议项下最高可用信金额" ctype="yu-num" number-formatter="0,000.00" placeholder="本协议项下最高可用信金额" name="agrContHighAvlAmt" rules="required" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="协议起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="协议起始日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="协议到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="协议到期日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="协议期限" ctype="yu-num" placeholder="协议期限" name="agrTerm" rules="required" autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" v-if="isOlPld" :disabled="isOlPldDisabled"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" rules="required" disabled  v-if="origiContNo"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" padding-top :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" padding-top :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="其他约定" ctype="textarea" placeholder="其他约定" name="otherAgreed"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" padding-top :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="qq" ctype="input" placeholder="qq" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" padding-top :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
          <yu-button type="primary" @click="customClick('tempSave')">暂存</yu-button>
          <yu-button type="primary" @click="customClick('save')">保存</yu-button>
          <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
          <yu-button type="primary" @click="customClick('back')">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      isOlPld: false,
      origiContNo: false,
      updateUrl: this.$backend.cmisBiz + '/api/iqphighamtagrapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqphighamtagrapp/',
      formdata: {},
      formType: 'edit',
      isEdit: false,
      formRules: {
        phone: [{
          validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'
        }],
        email: [{
          validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'
        }]
      },
      imageUrls: {},
      File: {},
      isShowButton: true,
      isOlPldDisabled: false
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let agrAmt = this.$refs.refForm.formdata.agrAmt;
      let agrContHighAvlAmt = this.$refs.refForm.formdata.agrContHighAvlAmt;
      let otherAgreed = this.$refs.refForm.formdata.otherAgreed;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(agrAmt) < parseFloat(agrContHighAvlAmt)) {
        // _this.$refs.refForm.formdata.contHighAvlAmt = null;
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        this.$refs.refForm.formdata.agrContHighAvlAmt = '';
      } else if (parseFloat(agrAmt) > parseFloat(agrContHighAvlAmt)) {
        _this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本协议项下可用信金额最高不超过' + agrContHighAvlAmt + '元。';
      }
    },

    termChange (value) { // 校验合同期限
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;
      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.agrTerm = '';
        return;
      }
      let termMap = {
        startDate: this.formdata.startDate,
        endDate: this.formdata.endDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.agrTerm = data;
        }
      });
    }

    // addrChange (value) { // 地址确认信息校验
    //   let email = this.$refs.refForm.formdata.email;
    //   let qq = this.$refs.refForm.formdata.qq;
    //   let wechat = this.$refs.refForm.formdata.wechat;
    //   if ((email == null || email == '') && (qq == null || qq == '') && (wechat == null || wechat == '')) {
    //     this.$xutils.showMsgBox('提示', '微信、QQ、Email地址三项中至少输入一项'); // 弹出提示
    //     return;
    //   }
    // },

  }
};
</script>
