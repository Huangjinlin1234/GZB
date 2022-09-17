<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="disabledflg">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="协议类型" ctype="select" name="discContType" rules="required" disabled data-code="STD_DISC_CONT_TYPE" placeholder="协议类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled  colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="票据种类" ctype="select" name="drftType" rules="required" disabled data-code="STD_DRFT_TYPE" placeholder="票据种类"></yu-xform-item>
            <yu-xform-item label="是否电子票据" ctype="select" name="isEDrft" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子票据"></yu-xform-item>
            <yu-xform-item label="申请人账号" ctype="input" placeholder="申请人账号" name="rqstrAccNo" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('getAccNo')">获取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="申请人账户名称" ctype="input" placeholder="申请人账户名称" name="rqstrAccName" disabled></yu-xform-item>
            <yu-xform-item label="买入类型" ctype="select"  name="purType" rules="required" disabled placeholder="买入类型" data-code="STD_PUR_TYPE"></yu-xform-item>
            <yu-xform-item label="贴现币种" ctype="select" name="discCurType" rules="required" disabled placeholder="贴现币种" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="票面总金额" ctype="yu-num" number-formatter="0,000.00" name="drftTotalAmt" placeholder="票面总金额" :min="0" :rules="{ required: isDrftTotalAmtRequired, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="贴现协议金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" placeholder="贴现协议金额" :min="0"  :rules="{ required: isContAmtRequired, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="协议起始日" ctype="datepicker" name="startDate" rules="required" placeholder="协议起始日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="协议到期日" ctype="datepicker" name="endDate" rules="required" placeholder="协议到期日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否先贴后查" ctype="select" name="isAtcf" data-code="STD_ZB_YES_NO" placeholder="是否先贴后查"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式 " ctype="select" name="guarMode" disabled placeholder="担保方式" hidden-rule></yu-xform-item>
            <yu-xform-item label="付息方式" ctype="select" name="pintMode" placeholder="付息方式" data-code="STD_PINT_MODE"></yu-xform-item>
            <yu-xform-item label="是否使用授信额度 " ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度 "></yu-xform-item>
            <yu-xform-item label="申请人授信额度编号" ctype="input" placeholder="申请人授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="申请人批复编号" ctype="input" placeholder="申请人批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="承兑企业授信额度编号" ctype="input" placeholder="承兑企业授信额度编号" name="acptCrpLmtNo"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="承兑企业批复编号" ctype="input" placeholder="承兑企业批复编号" name="acptCrpReplyNo"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="承兑企业客户编号" ctype="input" placeholder="承兑企业客户编号" name="acptCrpCusId"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="承兑企业客户名称" ctype="input" placeholder="承兑企业客户名称" name="acptCrpCusName"  rules="required" disabled></yu-xform-item>
            <!--<yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" rules="required" disabled></yu-xform-item>-->
            <!--<yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" rules="required" disabled></yu-xform-item>-->
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
            <yu-xform-item label="业务类型" ctype="input" placeholder="业务类型" name="busiType" hidden></yu-xform-item>
            <yu-xform-item label="合同币种 std_zx_cur_" ctype="input" placeholder="合同币种 std_zx_cur_" name="curType" hidden></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" hidden></yu-xform-item>
            <yu-xform-item label="是否在线抵押 std_zb_ye" ctype="input" placeholder="是否在线抵押 std_zb_ye" name="isOlPld" hidden></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" hidden></yu-xform-item>
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
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            <yu-xform-item label="合同类型 std_zb_cont" ctype="input" placeholder="合同类型 std_zb_cont" name="contType" hidden></yu-xform-item>
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
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_PUR_TYPE,STD_ZB_CUR_TYP,STD_PINT_MODE,STD_DISC_CONT_TYPE,STD_DRFT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpdiscapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpdiscapp/',
      formdata: {},
      formType: 'edit',
      debtInfo: true,
      bizType: '01',
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      isShowButton: true,
      disabledflg: false,
      isDrftTotalAmtRequired: false,
      isContAmtRequired: false
    };
  },
  methods: {
    termChange (value) { // 校验合同期限
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
        this.formdata.startDate = '';
        this.formdata.endDate = '';
        return;
      }
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },
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
