<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <!--<yu-xform-item label="合同号" ctype="input" placeholder="合同号" name="contNo" rules="required" disabled></yu-xform-item>-->
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" rules="required" disabled data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押 " ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押 "></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" @change="getCurTypeRate"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="num" placeholder="合同金额" name="contAmt" rules="required" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="appRate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="num" placeholder="折算人民币金额" name="cvtCnyAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num" number-formatter="0,000.00" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt" rules="required" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日期" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日期" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" rules="required" disabled autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="是否无缝对接" ctype="select" name="isSeajnt" data-code="STD_ZB_YES_NO" placeholder="是否无缝对接" :disabled="isSeajntDisabled"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="qq" ctype="input" placeholder="qq" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
<!--        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" name="debtLevel" disabled data-code="STD_DEBT_GRADE" placeholder="债项等级"></yu-xform-item>
            <yu-xform-item label="违约风险暴露ead" ctype="input" placeholder="违约风险暴露ead" name="ead" disabled></yu-xform-item>
            <yu-xform-item label="违约损失率lgd" ctype="input" placeholder="违约损失率lgd" name="lgd" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel> -->
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
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
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_CONT_TYPE,STD_LOAN_MODAL,STD_ZB_LOAN_PROP,STD_PRD_TYPE_PROP,STD_ZB_YES_NO');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      isSeajntDisabled: true,
      isShowButton: true
    };
  },
  methods: {
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
        this.$xutils.showMsgBox('提示', '合同到期日需大于合同起始日'); // 弹出提示
        this.formdata.contTerm = '';
        this.formdata.endDate = '';
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
          _this.formdata.contTerm = data;
        }
      });
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        // this.formdata.contAmt = '0';
        this.formdata.contHighAvlAmt = '';
      } else if (parseFloat(contAmt) > parseFloat(contHighAvlAmt)) {
        _this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      }
      this.formdata.cvtCnyAmt = this.formdata.appRate * contHighAvlAmt;
    },

    // 根据币种得到对应的汇率
    getCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.appRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.appRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
      }
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
