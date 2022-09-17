<template>
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <!--基本信息-->
      <yu-panel title="基本信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" :rules="rule[0]" ctype="select" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务流水号" name="serno" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :rules="rule[0]" ctype="input" colspan="24"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" :rules="rule[0]" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="协议币种" name="agrType" :rules="rule[0]" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="协议金额" name="agrAmt" :rules="rule[0]" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
          <yu-xform-item label="本协议项下最高可用信金额金额" name="agrContHighAvlAmt" :rules="rule[0]" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
          <yu-xform-item label="协议起始日" name="startDate" :rules="rule[0]" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="协议到期日" name="endDate" :rules="rule[0]" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="协议期限" name="agrTerm" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" name="paperContSignDate" :rules="rule[0]" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="是否在线抵押" name="isOlPld" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否电子用印" name="isESeal" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否续签合同" name="isRenew" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="原合同编号" name="origiContNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--使用额度信息-->
      <yu-panel title="使用额度信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUseLmtAmt" :rules="rule[0]" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--其它信息-->
      <yu-panel title="其它信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="其它约定" name="otherAgreed" ctype="textarea" colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--地址确认信息-->
      <yu-panel title="地址确认信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="联系人" name="linkman" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="电话" name="phone" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="传真" name="fax" ctype="input"></yu-xform-item>
          <yu-xform-item label="邮箱" name="email" ctype="input"></yu-xform-item>
          <yu-xform-item label="QQ" name="qq" ctype="input"></yu-xform-item>
          <yu-xform-item label="微信" name="wechat" ctype="input"></yu-xform-item>
          <yu-xform-item label="送达地址" name="deliveryAddr" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--登记信息-->
      <yu-panel title="登记信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="协议状态" name="contStatus" ctype="select" :rules="rule[0]" data-code="STD_CONT_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    <yu-form-buttons align="center">
      <!--<yu-button @click="traSave">暂存</yu-button>
      <yu-button type="primary" @click="saveFormFn">保存</yu-button>
      <yu-button @click="submitFormFn">提交</yu-button>-->
      <yu-button @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </yu-xform></div>
</template>
<script>
export default {
  data: function () {
    return {
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted: function () {
    var _this = this;
    var data = {};
    var contNo = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      contNo = data.param.contNo;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      contNo = data.contNo;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      contNo = data.contNo;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrhighamtagrcont/showdetial',
      data: {contNo: contNo},
      callback: function (code, message, response) {
        if (response.code == 0) {
          yufp.clone(response.data, _this.formdata);
        }
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    }

  }
};
</script>
