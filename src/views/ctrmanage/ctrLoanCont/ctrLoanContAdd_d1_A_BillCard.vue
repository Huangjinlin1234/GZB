<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" data-code="STD_CONT_TYPE" disabled></yu-xform-item>
          <!--<yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>-->
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <!--<yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled :colspan="12"></yu-xform-item>-->
          <yu-xform-item label="申请流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewIqpDataBySerno" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled :colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="合同币种" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" placeholder="合同金额" name="contAmt" disabled></yu-xform-item>
          <yu-xform-item label="最高可用信金额" ctype="yu-num" number-formatter="0,000.00" placeholder="最高可用信金额" name="highAvlAmt" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同起始日期" ctype="datepicker" placeholder="合同起始日期" name="contStartDate" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日期" ctype="datepicker" placeholder="合同到期日期" name="contEndDate" disabled></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate" rules="required"></yu-xform-item>
          <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" disabled  autofocus unit="月"></yu-xform-item>
          <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" hidden data-code="STD_ZB_YES_NO" placeholder="是否电子用印" :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" name="contStatus" hidden data-code="STD_CONT_STATUS" placeholder="合同状态" :colspan="12"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="creatTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xform label-width="120px" v-model="formtrddata">
        <yu-panel title="第三方信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否占用第三方额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否占用第三方额度" name="isOutstndTrdLmtAmt" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="第三方合同协议编号" ctype="input" placeholder="第三方合同协议编号" name="tdpAgrNo" :colspan="12" disabled :hidden="!isShowTrdDataFlg"></yu-xform-item>
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName" :hidden="!isShowTrdDataFlg" disabled :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <!-- 合同签订 -->
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="06" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_ASSURE_MEANS,STD_ZB_CUR_TYP,STD_ZB_GUAR_CONT_TYPE,STD_GUAR_WAY,STD_GUAR_CONT_STATE,STD_PRD_TYPE_PROP');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object
  },
  components: { cfgAssistantTip },
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/ctrloancont/selectByContNo',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      prdCode: '',
      prdTypeProp: '',
      isShow: false,
      formtrddata: {},
      isShowTrdDataFlg: false // 第三方信息
    };
  },
  mounted () {
    var _this = this;
    let iqpSerno = this.pageParams.iqpSerno;
    // if (this.bizPageData != null) {
    //   iqpSerno = this.bizPageData.instanceInfo.bizId;
    // } else {
    //   iqpSerno = this.$route.meta.params.iqpSerno;
    // }
    console.log(iqpSerno);
    yufp.service.request({
      method: 'POST',
      async: false,
      url: backend.cmisBiz + '/api/iqploanapp/queryByiqpSerno',
      data: iqpSerno,
      callback (code, message, response) {
        _this.formtrddata.isOutstndTrdLmtAmt = response.data.isOutstndTrdLmtAmt;
        _this.formtrddata.tdpAgrNo = response.data.tdpAgrNo;
        _this.formtrddata.coopCusName = response.data.coopCusName;
        _this.prdCode = response.data.prdId;
        _this.prdTypeProp = response.data.prdTypeProp;
        if (_this.formtrddata.isOutstndTrdLmtAmt == '1') {
          _this.isShowTrdDataFlg = true;
        } else {
          _this.isShowTrdDataFlg = false;
        }
      }
    });
  },
  methods: {

    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    // 对申请流水号的查看
    viewIqpDataBySerno () {
      if (this.formdata.iqpSerno == null || this.formdata.iqpSerno == '') {
        this.$xutils.showMsgBox('提示', '业务流水号为空!');
        return;
      }
      let json = {};
      json['model_group_no'] = 'CMG000243';
      json['op'] = 'VIEW';
      // json['opType'] = 'view';
      json['iqpSerno'] = this.formdata.iqpSerno;
      json['contType'] = this.formdata.contType;
      json['biz_op'] = 'view';
      json['period'] = '02';
      json['bizLine'] = '03';
      json['busiType'] = '01';
      // params['op'] = 'EDIT';
      // params['period'] = '02';
      // params['bizLine'] = '02';
      // params['busiType'] = '02';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json
      );
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
    }
  }
};
</script>
