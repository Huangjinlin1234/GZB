<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isFormDisabled">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="协议类型" ctype="select" name="discContType" rules="required" disabled data-code="STD_DISC_CONT_TYPE" placeholder="协议类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="票据种类" ctype="select" name="drftType" rules="required" disabled data-code="STD_DRFT_TYPE" placeholder="票据种类"></yu-xform-item>
            <yu-xform-item label="是否电子票据" ctype="select" name="isEDrft" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子票据"></yu-xform-item>
            <yu-xform-item label="申请人账号" ctype="input" placeholder="申请人账号" name="rqstrAccNo"></yu-xform-item>
            <yu-xform-item label="申请人账户名称" ctype="input" placeholder="申请人账户名称" name="rqstrAccName"></yu-xform-item>
            <yu-xform-item label="买入类型" ctype="select" name="purType" rules="required" disabled placeholder="买入类型"  data-code="STD_PUR_TYPE"></yu-xform-item>
            <yu-xform-item label="贴现币种" ctype="select" name="discCurType" rules="required" disabled placeholder="贴现币种" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="票面总金额" ctype="yu-num" number-formatter="0,000.00" name="drftTotalAmt" placeholder="票面总金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贴现协议金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" placeholder="贴现协议金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="协议起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" placeholder="协议起始日"></yu-xform-item>
            <yu-xform-item label="协议到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="协议到期日"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否先贴后查" ctype="select" name="isAtcf" data-code="STD_ZB_YES_NO" placeholder="是否先贴后查"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度 " ctype="select" name="isUseLmtAmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度 "></yu-xform-item>
            <yu-xform-item label="担保方式 " ctype="input" placeholder="担保方式 " name="guarMode"  data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="付息方式" ctype="input" placeholder="付息方式" name="pintMode"  data-code="STD_PINT_MODE"></yu-xform-item>
            <yu-xform-item label="申请人授信额度编号" ctype="input" placeholder="申请人授信额度编号" name="lmtAccNo"></yu-xform-item>
            <yu-xform-item label="申请人批复编号" ctype="input" placeholder="申请人批复编号" name="replyNo"></yu-xform-item>
            <yu-xform-item label="承兑企业批复编号" ctype="input" placeholder="承兑企业批复编号" name="acptCrpReplyNo"></yu-xform-item>
            <yu-xform-item label="承兑企业授信额度编号" ctype="input" placeholder="承兑企业授信额度编号" name="acptCrpLmtNo"></yu-xform-item>
            <yu-xform-item label="承兑企业客户编号" ctype="input" placeholder="承兑企业客户编号" name="acptCrpCusId"></yu-xform-item>
            <yu-xform-item label="承兑企业客户名称" ctype="input" placeholder="承兑企业客户名称" name="acptCrpCusName"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false" v-show="debtInfo">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="input" placeholder="债项等级" name="debtLevel" disabled></yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead" disabled></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="协议状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS" placeholder="协议状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_DRFT_TYPE,STD_DISC_CONT_TYPE,STD_CONT_STATUS,STD_ZB_GUAR_WAY,STD_PUR_TYPE,STD_ZB_CUR_TYP,STD_PINT_MODE');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrdisccont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrdisccont/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      debtInfo: true,
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false,
      isFormDisabled: false
    };
  },
  methods: {
    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>