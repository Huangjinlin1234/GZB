<template>
  <div style="height:100%;">
    <yu-row :gutter="10" style="height:100%;">
      <yu-col :span="10">
        <imageSystem ref="imageSystemRef" :authority="authority" s="2" :para="imageBizParam"></imageSystem>
      </yu-col>
      <yu-col :span="14">
        <yu-xform ref="mainForm" v-model="formdata" label-width="160px" :rules="rules" :disabled="formDisable||node.pageType!=='TODO'">
          <yu-collapse v-model="activeNames">
            <yu-collapse-item title="申请的卡产品" name="1">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请类型" name="applyType" ctype="select" data-code="STD_CARD_APPLY_TYPE" disabled></yu-xform-item>
                <yu-xform-item label="申请卡产品" name="applyCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD" disabled></yu-xform-item>
                <yu-xform-item label="是否同时申请普通信用卡" name="isApplyCommonCard" ctype="select" data-code="STD_ZB_YES_NO" disabled :hidden="applyCardType=='S'"></yu-xform-item>
                <yu-xform-item label="普通信用卡申请卡产品" name="applyCommonCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD" disabled :hidden="applyCardType=='S'"></yu-xform-item>
                <yu-xform-item label="是否同意卡片降级" name="isAgreeCardDown" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
                <yu-xform-item label="是否自选卡号" name="isCustomizeCardNo" ctype="select" data-code="STD_ZB_YES_NO" @change="customSelectFn"></yu-xform-item>
                <!-- <yu-xform-item label="自选卡号" name="customizeCardNo" ctype="input" :hidden="customizeCardNoHid"></yu-xform-item> -->
                <yu-xform-item label="自选卡号" ctype="custom" colspan="6" :hidden="customizeCardNoHid">
                  <yu-input value="625208" disabled></yu-input>
                </yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="customizeCardNo" colspan="5" :hidden="customizeCardNoHid"  >
                  <yu-input v-model="customizeCardNo" :disabled="formDisable||node.pageType!=='TODO'" ></yu-input>
                </yu-xform-item>
                 <yu-xform-item label="" name="" ctype="custom" colspan="1" :hidden="customizeCardNoHid">
                  <yu-button type="primary" @click="confirmSelectCardNo">校验</yu-button>
                </yu-xform-item>
                <yu-xform-item label="是否实时发卡" name="isRealTimeCardIssue" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="个人信息" name="2" v-if="applyCardType=='A' || applyCardType=='B'">
              <yu-xform-group :column="2">
                <yu-xform-item label="中文姓名" name="cusName" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="拼音" name="pinyin" ctype="input" rules="required" ></yu-xform-item>
                <yu-xform-item label="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" name="certCode" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="出生日期" name="birthday" ctype="datepicker" :disabled="birthflag" ></yu-xform-item>
                <yu-xform-item label="性别" name="sex" ctype="select" data-code="STD_ZB_SEX" :disabled="birthflag"></yu-xform-item>
                <yu-xform-item label="婚姻状况" name="marStatus" ctype="select" data-code="STD_CARD_MAR_ST" rules="required"></yu-xform-item>
                <yu-xform-item label="国籍" name="nation" ctype="select" data-code="STD_ZB_COUNTRY" rules="required"></yu-xform-item>
                <yu-xform-item label="教育程度" name="qualification" ctype="select" data-code="STD_CARD_EDU" rules="required"></yu-xform-item>
                <yu-xform-item label="民族" name="folk" ctype="select" data-code="STD_ZB_INDIV_FOLK" rules="required"></yu-xform-item>
                <yu-xform-item label="证件是否长期有效" name="isLongVld" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                <yu-xform-item label="证件起始日期" name="certStartDate" ctype="datepicker" rules="required" @change="cardStartDateChange"></yu-xform-item>
                <yu-xform-item label="证件到期日" name="certEndDate" ctype="datepicker" rules="required" @change="certEndDateChange" :hidden="endflag"></yu-xform-item>
                <yu-xform-item label="发证机关" name="regiOrg" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="住宅状况" name="resiStatus" ctype="select" data-code="STD_CARD_LOCAL_RS" rules="required"></yu-xform-item>
                <yu-xform-item label="车辆状况" name="carStatus" ctype="select" data-code="STD_CAR_STATUS"></yu-xform-item>
                <yu-xform-item label="个人年收入(税后)(万元)" name="yearIncome" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="现职年限" name="workYears" ctype="input" ></yu-xform-item>
                <yu-xform-item label="单位全称" name="corpName" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="单位性质" name="corpCategory" ctype="select" data-code="STD_CARD_COM_TYPE" rules="required"></yu-xform-item>
                <yu-xform-item label="职务" name="duty" ctype="select" data-code="STD_CARD_JOB_TTL" rules="required"></yu-xform-item>
                <yu-xform-item label="职业" name="occu" ctype="select" data-code="STD_CARD_OCC" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="行业" name="trade" ctype="select" data-code="STD_CARD_TRADE_TYPE" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="预留问题" name="reserveQuestion" ctype="input" colspan="24"></yu-xform-item>
                <yu-xform-item label="答案" name="answer" ctype="input" colspan="24"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="联系信息" name="3" v-if="applyCardType=='A' || applyCardType=='B'">
              <yu-xform-group :column="2">
                <!--<yu-xform-item label="家庭地址省" name="familyAddr" ctype="yu-linkage-select" :options="options.addressOptions" :level="3" :props="addrProps" :labels="addrLabel" data-structure="tree" colspan="24" :value="[]" rules="required"></yu-xform-item>-->
                <yu-xform-item  label="家庭地址省" name="familyAddrProvince" rules="required" ctype="select"  colspan="10" :high-performance="true"  :props="props" :options="options.familyAddrProvince"></yu-xform-item>
                <yu-xform-item  label="市" label-width="20px" name="familyAddrCity"   rules="required" ctype="select" colspan="7"   :high-performance="true" :props="props" :options="options.familyAddrCity"></yu-xform-item>
                <yu-xform-item  label="区" label-width="20px" name="familyAddrZone"  rules="required" ctype="select" colspan="7" :props="props" :high-performance="true" :options="options.familyAddrZone"></yu-xform-item>
                <yu-xform-item label="家庭详细地址" name="familyDetailAddr" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="家庭地址邮编" name="familyAddrPost" ctype="input"></yu-xform-item>
                <yu-xform-item label="家庭电话" name="familyPhone" ctype="input" ></yu-xform-item>
                <!--<yu-xform-item label="单位地址省" name="unitAddr" ctype="yu-linkage-select" :options="options.addressOptions" :level="3" :props="addrProps" :labels="addrLabel" data-structure="tree" colspan="24" :value="[]" rules="required"></yu-xform-item>-->
                <yu-xform-item  label="单位地址省" name="unitAddrProvince" rules="required" ctype="select" colspan="10" :high-performance="true" :props="props" :options="options.unitAddrProvince"></yu-xform-item>
                <yu-xform-item  label="市" label-width="20px" name="unitAddrCity"  rules="required" ctype="select" colspan="7" :high-performance="true" :props="props" :options="options.unitAddrCity"></yu-xform-item>
                <yu-xform-item  label="区" label-width="20px" name="unitAddrZone"  rules="required"  ctype="select" colspan="7" :props="props" :high-performance="true" :options="options.unitAddrZone"></yu-xform-item>
                <!--<yu-xform-item label="家庭详细地址" name="familyDetailAddr" ctype="input" rules="required" colspan="24"></yu-xform-item>-->
                <yu-xform-item label="单位地址详细地址" name="unitDetailAddr" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="单位地址邮编" name="unitAddrPost" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="单位电话" name="unitPhone" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="客户本人手机号码" name="phone" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="电子邮箱" name="email" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="卡片邮寄地址" name="cardPostAddr" ctype="select" data-code="STD_CARD_POST_ADDR" rules="required"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="联系人信息" name="4" v-if="applyCardType=='A' || applyCardType=='B'">
              <yu-xform-group :column="2">
                <yu-xform-item label="亲属联系人中文姓名" name="relaLinkmanName" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="亲属联系人性别" name="relaLinkmanSex" ctype="select" data-code="STD_ZB_SEX"></yu-xform-item>
                <yu-xform-item label="亲属与申请人关系" name="relaCusCorre" ctype="select" data-code="STD_CARD_SELFPER_REL_TYP" rules="required"></yu-xform-item>
                <yu-xform-item label="亲属联系人手机" name="relaLinkmanPhone" ctype="input"></yu-xform-item>
                <yu-xform-item label="亲属联系人固定电话" name="relaLinkmanFixedPhone" ctype="input" colspan="12"></yu-xform-item>
                <yu-xform-item label="" ctype="custom" colspan="12"></yu-xform-item>
                <yu-xform-item label="其他联系人中文姓名" name="otherLinkmanName" ctype="input" @change="otherLinkRequired" :required="otherLinkFlag"></yu-xform-item>
                <yu-xform-item label="其他联系人性别" name="otherLinkmanSex" ctype="select" data-code="STD_ZB_SEX" ></yu-xform-item>
                <yu-xform-item label="其他与申请人关系" name="otherLinkmanCorre" ctype="select" data-code="STD_CARD_OTHER_REL_TYP" @change="otherLinkRequired" :required="otherLinkFlag"></yu-xform-item>
                <yu-xform-item label="其他联系人手机" name="otherLinkmanPhone" ctype="input" @change="otherLinkRequired" :required="otherLinkFlag"></yu-xform-item>
                <yu-xform-item label="其他联系人固定电话" name="otherLinkmanFixedPhone" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="附属卡申请人信息" name="5" v-if="applyCardType=='A' || applyCardType=='S'">
              <yu-xform-group :column="2">
                <yu-xform-item label="主卡卡号" name="mainCardNo" ctype="input" rules="required" colspan="10" :hidden="mainCardNoFlag"></yu-xform-item>
                <yu-xform-item label="" name="" ctype="custom" colspan="2"  :hidden="mainCardNoFlag">
                  <yu-button type="primary" @click="confirmCardFn(formdata.mainCardNo)">校验</yu-button>
                </yu-xform-item>
                <yu-xform-item label="附卡是否自选卡号" name="isSubCustomizeCardNo" ctype="select" data-code="STD_ZB_YES_NO" rules="required" @change="subCardChange"></yu-xform-item>
                <!-- <yu-xform-item label="附卡自选卡号" name="subCustomizeCardNo" ctype="input" :hidden="subCardHid"></yu-xform-item> -->
                <yu-xform-item label="附卡自选卡号" ctype="custom" colspan="6" :hidden="subCardHid">
                  <yu-input value="625208" disabled></yu-input>
                </yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="customizeCardNo" colspan="4" :hidden="subCardHid">
                  <yu-input v-model="subCustomizeCardNo" :disabled="formDisable||node.pageType!=='TODO'" name="secondCardNo"></yu-input>
                </yu-xform-item>
                <yu-xform-item label="" name="customizeCardNo2" ctype="custom" colspan="1" :hidden="subCardHid">
                  <yu-button type="primary" @click="confirmSelectSubCardNo">校验</yu-button>
                </yu-xform-item>
                <yu-xform-item label="附卡申请人中文姓名" name="subCardCusName" ctype="input"  rules="required" :disabled="applTypeFlag" colspan="24" ></yu-xform-item>
                <yu-xform-item label="附卡申请人拼音" name="subCardCusPinyin" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="附卡申请人手机" name="subCardCusPhone" ctype="input" ></yu-xform-item>
                <yu-xform-item label="附卡申请人证件类型" name="subCardCertType" ctype="select" data-code="STD_ZB_CERT_TYP"  rules="required" :disabled="applTypeFlag"></yu-xform-item>
                <yu-xform-item label="附卡申请人证件号码" name="subCardCertCode" ctype="input"  rules="required" :disabled="applTypeFlag" ></yu-xform-item>
                <yu-xform-item label="附卡申请人性别" name="subCardCusSex" ctype="select" data-code="STD_ZB_SEX"  rules="required" :disabled="applTypeFlag"></yu-xform-item>
                <yu-xform-item label="附卡申请人国籍" name="subCardCusNation" ctype="select" data-code="STD_ZB_COUNTRY" rules="required"></yu-xform-item>
                <yu-xform-item label="附卡申请人证件是否长期有效" name="isSubCardCertLongVld" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                <yu-xform-item label="附卡申请人证件起始日期" name="subCardStartDate" ctype="datepicker" rules="required" @change="subCardStartDateChange"></yu-xform-item>
                <yu-xform-item label="附卡申请人证件到期日" name="subCardEndDate" ctype="datepicker" rules="required" @change="subCardEndDateChange" :hidden="subendflag"></yu-xform-item>
                <yu-xform-item label="附卡申请人发证机关" name="subCardRegiOrg" ctype="input" rules="required"></yu-xform-item>
                <yu-xform-item label="附卡申请人民族" name="subCardIndivFolk" ctype="select" data-code="STD_ZB_INDIV_FOLK" rules="required"></yu-xform-item>
                <yu-xform-item label="附卡申请人职业" name="subCardOccu" ctype="select" data-code="STD_CARD_OCC" rules="required" colspan="24"></yu-xform-item>
                <!--<yu-xform-item label="附卡申请人家庭地址省" name="subCardFamily" ctype="yu-linkage-select" :options="options.addressOptions" :level="3" :props="addrProps" :labels="addrLabel" data-structure="tree" colspan="24" :value="[]" rules="required"></yu-xform-item>-->
                 <yu-xform-item  label="附卡申请人家庭地址省" name="subCardFamilyAddrProvince" rules="required" ctype="select" :high-performance="true" colspan="10"  :props="props" :options="options.subCardFamilyAddrProvince"></yu-xform-item>
                <yu-xform-item  label="市" label-width="20px" name="subCardFamilyAddrCity"   rules="required" ctype="select" colspan="7"  :high-performance="true"  :props="props" :options="options.subCardFamilyAddrCity"></yu-xform-item>
                <yu-xform-item  label="区" label-width="20px" name="subCardFamilyAddrZone"  rules="required" ctype="select" colspan="7" :high-performance="true" :props="props" :options="options.subCardFamilyAddrZone"></yu-xform-item>
                <yu-xform-item label="附卡申请人家庭详细地址" name="subCardFamilyDetailAddr" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <!--<yu-xform-item label="附卡申请人单位地址省" name="subCardUnitAddr" ctype="yu-linkage-select" :options="options.addressOptions" :level="3" :props="addrProps" :labels="addrLabel" data-structure="tree" colspan="24" :value="[]" rules="required"></yu-xform-item>-->
                 <yu-xform-item  label="附卡申请人单位地址省" name="subCardUnitAddrProvince" rules="required" ctype="select" :high-performance="true"  colspan="10"  :props="props" :options="options.subCardUnitAddrProvince"></yu-xform-item>
                <yu-xform-item  label="市" label-width="20px" name="subCardUnitAddrCity"  rules="required" ctype="select" colspan="7" :high-performance="true"   :props="props" :options="options.subCardUnitAddrCity"></yu-xform-item>
                <yu-xform-item  label="区" label-width="20px" name="subCardUnitAddrZone"  rules="required" ctype="select" colspan="7" :high-performance="true" :props="props" :options="options.subCardUnitAddrZone"></yu-xform-item>
                 <yu-xform-item label="附卡申请人单位地址详细地址" name="subCardUnitDetailAddr" ctype="input" rules="required" colspan="24"></yu-xform-item>
                <yu-xform-item label="附卡申请人卡片邮寄地址" name="subCardPostAddr" ctype="select" data-code="STD_CARD_POST_ADDR" rules="required"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="还款及账单信息" name="6">
              <yu-xform-group :column="2">
                <yu-xform-item label="约定还款类型" name="agreedRepayType" ctype="select" data-code="STD_CARD_AGREED_REPAY_TYPE" rules="required" @change="agreeChange"></yu-xform-item>
                <yu-xform-item label="约定还款扣款账号" name="agreedRepayCardNo" ctype="input" :disabled="agreedRepayCardNoDis" colspan="10" :required="cardnoRequired"></yu-xform-item>
                <yu-xform-item label="" name="" ctype="custom" colspan="2" :hidden="node.pageType!=='TODO'">
                  <yu-button type="primary" @click="checkCardFn(formdata.agreedRepayCardNo)">校验</yu-button>
                </yu-xform-item>
                <yu-xform-item label="约定还款人扣款姓名" name="agreedRepayCusName" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="银行填写" name="7">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户类型" name="cardCusType" ctype="select" data-code="STD_CARD_CUS_TYPE" disabled></yu-xform-item>
                <yu-xform-item label="推广渠道" name="recomChnl" ctype="select" data-code="STD_CARD_RECOM_CHNL" rules="required"></yu-xform-item>
                <yu-xform-item label="客户经理工号" name="managerId" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="客户经理姓名" name="managerName" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="客户经理手机" name="managerPhone" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="推荐人工号" name="recomId" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="推荐人姓名" name="recomName" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="征信授权日期" name="creditAuthDate" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="建议额度" name="suggestLmt" ctype="input" ></yu-xform-item>
                <yu-xform-item label="备注" name="remark" ctype="textarea" colspan="24"></yu-xform-item>
                <yu-xform-item label="客户号" name="cusId" ctype="input" hidden></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
          </yu-collapse>
        </yu-xform>
        <div class="yu-grpButton" v-if="node.pageType=='TODO'">
          <yu-button type="primary" v-if="!formDisable" @click="saveFn(null)">保存</yu-button>
          <yu-button type="primary" v-if="!formSubmitDisable" @click="saveFn('submitFn')">提交</yu-button>
          <yu-button type="primary" v-if="!formDisable" @click="backFn">返回</yu-button>
          <yu-button type="primary" v-if="!formSubmitDisable" @click="returnFn">退回</yu-button>
          <yu-button type="primary" v-if="!formSubmitDisable" @click="reset">还原</yu-button>
        </div>
        <yu-xdialog title="退回原因" size="tiny" :visible.sync="dialogVisible">
          <yu-xform ref="refFormDemo" label-width="120px" v-model="returnForm">
            <yu-xform-group :column="1">
              <yu-xform-item label="退回原因" ctype="select" name="returnReason" data-code="STD_CARD_RETURN_REASON" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <span slot="footer" class="dialog-footer">
            <yu-button @click="dialogVisible = false">取 消</yu-button>
            <yu-button type="primary" @click="doReturnFn">确 定</yu-button>
          </span>
        </yu-xdialog>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import { lookup, clone } from '@/utils';
import { validator } from '@/utils/validate';
import cfgNodeRuleRelDetailList_d1_A_B_B_BillListVue from '../../../../../cfgmanage/productconfig/cfgBizRulePlan/cfgNodeRuleRelDetailList_d1_A_B_B_BillList.vue';
lookup.reg('STD_CARD_APPLY_TYPE,STD_CARD_APPLY_CARD_PRD,STD_CARD_CUS_TYPE');
lookup.reg('STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_ZB_SEX,STD_CARD_APP_CHNL,STD_CARD_MAR_ST');
lookup.reg('STD_ZB_COUNTRY,STD_ZB_EDU,STD_ZB_INDIV_FOLK,STD_CARD_LOCAL_RS,STD_CAR_STATUS');
lookup.reg('STD_ZB_COM_TYP,STD_CARD_JOB_TTL,STD_CARD_OCC,TRADE_CLASS,AREA_CODE');
lookup.reg('STD_CARD_SELFPER_REL_TYP,STD_CARD_AGREED_REPAY_TYPE,STD_CARD_RECOM_CHNL,STD_CARD_RETURN_REASON');
export default {
  name: 'MainAndSup',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    },
    applyCardType: {
      type: String,
      default: 'A'
    }
  },
  components: {imageSystem},
  computed: {
    authority () {
      return 'scan';
    },
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': this.node.flowParam.topoutsystemcode,
          'outsystem_code': this.node.flowParam.outsystemcode,
          'index': {
            'businessid': this.node.bizId,
            'custid': '',
            'custname': '',
            'custconduct': '',
            'custconductname': '',
            'orgid': '',
            'orgname': '',
            'contid': '',
            'billno': ''
          }
        }
      ];
      return imageBizParam;
    }
  },

  data () {
    return {
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
        addrUrl: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
        updateUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/update',
        cusUrl: this.$backend.cmisCus + '/api/cusindiv/createcreditcardcusinfo',
        // 约定还款扣款账号
        checkCardUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/confirmrepaycard',
        // 校验卡号有效性及状态
        confirmStatusUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/confirmcard',
        // 校验卡号是否已存在
        confirmCardAliceUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/confirmcardalive',
        ecifUrl: this.$backend.cmisCus + '/api/cusindiv/sendEcif',
        getAccountInfoUrl: this.$backend.cmisBiz + '/api/ctrloancont/opanorgname',
        returnUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/returnmainsup'
      },
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      formdata: {},
      returnForm: {},
      subCardHid: true,
      addressOptions: [],
      addrLabel: ['', '市:', '区:'],
      addrProps: { key: 'id', value: 'label', children: 'children' },
      customizeCardNoHid: false, // 是否自选卡片
      customizeCardNo: '', // 主卡自选卡号
      subCustomizeCardNo: '', // 附卡自选卡号
      rules: {
        otherLinkmanName: { required: false, message: '字段不能为空', trigger: 'blur' },
        otherLinkmanCorre: { required: false, message: '字段不能为空', trigger: 'blur' },
        agreedRepayType: { required: false, message: '字段不能为空', trigger: 'blur' },
        subCardCertCode: [
          { required: true, message: '字段不能为空', trigger: 'blur' },
          { validator: validator.IDCard, message: '请输入正确的证件号' }
        ],
        relaLinkmanPhone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ],
        subCardCusPhone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ],
        otherLinkmanPhone: [
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ],
        unitAddrPost: [
          { validator: validator.postcode, message: '请输入正确的邮政编码' }
        ],
        email: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.email, message: '请输入正确的邮箱地址' }
        ],
        familyAddrPost: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.postcode, message: '请输入正确的邮政编码' }
        ],
        familyPhone: [
          { validator: validator.qumobile, message: '请输入正确的区号+电话号码或者手机号' }
        ],
        unitPhone: [
          { validator: validator.qumobile, message: '请输入正确的区号+电话号码或者手机号' }
        ],
        pinyin: [
          { validator: validator.ENGLISH, message: '请输入大写英文字母或空格' }
        ],

        subCardCusPinyin: [
          { validator: validator.ENGLISH, message: '请输入大写英文字母或空格' }
        ]
      },
      count: 0, // 根据其他联系人 姓名、性别、与申请人关系字段有值的个数判断是否必输
      agreedRepayCardNoDis: false,
      dialogVisible: false, // 退回
      formDisable: false, // 表单只读状态和操作按钮的显隐
      formSubmitDisable: false,
      node1Disable: false,
      cardnoRequired: false,
      otherLinkFlag: false,
      cardCheck: false,
      aliveCardCheck: false,
      aliveSubCardCheck: false,
      repayCardCheck: false,
      firstInner: false,
      pageInfo: {},
      oldPhone: '',
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: '',
        userComment: '',
        ext: '无',
        optType: '',
        optReasTyp: ''
      },
      outsystemcode: 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605',
      topoutsystemcode: 'XXD_PK',
      // 地区字典项
      lazyUrl: backend.cmisCfg + '/api/adminsmtreedic/lazytree',
      props: { key: 'id', value: 'label' },
      options: {
        familyAddrProvince: [],
        familyAddrCity: [],
        familyAddrZone: [],
        unitAddrProvince: [],
        unitAddrCity: [],
        unitAddrZone: [],
        subCardFamilyAddrProvince: [],
        subCardFamilyAddrCity: [],
        subCardFamilyAddrZone: [],
        subCardUnitAddrProvince: [],
        subCardUnitAddrCity: [],
        subCardUnitAddrZone: []
      },
      endflag: false,
      subendflag: false,
      mainCardNoFlag: true,
      applTypeFlag: false,
      comment: '',
      birthflag: false

    };
  },
  watch: {
    'imageBizParam': function (val) {
      this.$nextTick(function () {
        this.$refs.imageSystemRef.getImageSrc();
      });
    },
    'formdata.isLongVld': function (val) {
      if (val) {
      // 证件长期有效，证件到期日隐藏
        if (val == '1') {
          this.endflag = true;
          this.formdata.certEndDate = '';
        } else {
          this.endflag = false;
        }
      }
    },
    'formdata.yearIncome': function (val) {
      if (val) {
        if (val < 1 || val > 1000) {
          this.formdata.yearIncome = '';
          this.$message({ message: '个人年收入不得小于1或大于1000万！', type: 'warning' });
        }
      }
    },
    'formdata.isSubCardCertLongVld': function (val) {
      if (val) {
      // 证件长期有效，证件到期日隐藏
        if (val == '1') {
          this.subendflag = true;
          this.formdata.subCardEndDate = '';
        } else {
          this.subendflag = false;
        }
      }
    },
    'formdata.subCardFamilyAddrProvince': function (val) {
      if (val) {
        this.formdata.subCardFamilyAddrCity = '';
        this.formdata.subCardFamilyAddrZone = '';
        this.querydict(val, 'subCardFamilyAddrCity');
        this.options.subCardFamilyAddrZone = [];
      }
    },
    'formdata.subCardFamilyAddrCity': function (val) {
      if (val) {
        if (this.formdata.subCardFamilyAddrCity != this.pageInfo.subCardFamilyAddrCity) {
          this.formdata.subCardFamilyAddrZone = '';
        }
        this.querydict(val, 'subCardFamilyAddrZone');
      }
    },
    'formdata.subCardUnitAddrProvince': function (val) {
      if (val) {
        this.formdata.subCardUnitAddrCity = '';
        this.formdata.subCardUnitAddrZone = '';
        this.querydict(val, 'subCardUnitAddrCity');
        this.options.subCardUnitAddrZone = [];
      }
    },
    'formdata.subCardUnitAddrCity': function (val) {
      if (val) {
        if (this.formdata.subCardUnitAddrCity != this.pageInfo.subCardUnitAddrCity) {
          this.formdata.subCardUnitAddrZone = '';
        }
        this.querydict(val, 'subCardUnitAddrZone');
      }
    },
    'formdata.unitAddrProvince': function (val) {
      if (val) {
        this.formdata.unitAddrCity = '';
        this.formdata.unitAddrZone = '';
        this.querydict(val, 'unitAddrCity');
        this.options.unitAddrZone = [];
      }
    },
    'formdata.unitAddrCity': function (val) {
      if (val) {
        if (this.formdata.unitAddrCity != this.pageInfo.unitAddrCity) {
          this.formdata.unitAddrZone = '';
        }
        this.querydict(val, 'unitAddrZone');
      }
    },
    'formdata.familyAddrProvince': function (val) {
      if (val) {
        this.formdata.familyAddrCity = '';
        this.formdata.familyAddrZone = '';
        this.querydict(val, 'familyAddrCity');
        this.options.familyAddrZone = [];
      }
    },
    'formdata.familyAddrCity': function (val) {
      if (val) {
        if (this.formdata.familyAddrCity != this.pageInfo.familyAddrCity) {
          this.formdata.familyAddrZone = '';
        }
        this.querydict(val, 'familyAddrZone');
      }
    },
    'firstInner': function (val) {
      if (val) {
        if (this.formdata.familyAddrProvince != null && this.formdata.familyAddrProvince != '') {
          this.querydict(this.formdata.familyAddrProvince, 'familyAddrCity');
          this.formdata.familyAddrCity = this.pageInfo.familyAddrCity;
          this.querydict(this.formdata.familyAddrCity, 'familyAddrZone');
          this.formdata.familyAddrZone = this.pageInfo.familyAddrZone;
        }
        if (this.formdata.unitAddrProvince != null && this.formdata.unitAddrProvince != '') {
          this.querydict(this.formdata.unitAddrProvince, 'unitAddrCity');
          this.formdata.unitAddrCity = this.pageInfo.unitAddrCity;
          this.querydict(this.formdata.unitAddrCity, 'unitAddrZone');
          this.formdata.unitAddrZone = this.pageInfo.unitAddrZone;
        }
        if (this.formdata.subCardFamilyAddrProvince != null && this.formdata.subCardFamilyAddrProvince != '') {
          this.querydict(this.formdata.subCardFamilyAddrProvince, 'subCardFamilyAddrCity');
          this.formdata.subCardFamilyAddrCity = this.pageInfo.subCardFamilyAddrCity;
          this.querydict(this.formdata.subCardFamilyAddrCity, 'subCardFamilyAddrZone');
          this.formdata.subCardFamilyAddrZone = this.pageInfo.subCardFamilyAddrZone;
        }
        if (this.formdata.subCardUnitAddrProvince != null && this.formdata.subCardUnitAddrProvince != '') {
          this.querydict(this.formdata.subCardUnitAddrProvince, 'subCardUnitAddrCity');
          this.formdata.subCardUnitAddrCity = this.pageInfo.subCardUnitAddrCity;
          this.querydict(this.formdata.subCardUnitAddrCity, 'subCardUnitAddrZone');
          this.formdata.subCardUnitAddrZone = this.pageInfo.subCardUnitAddrZone;
        }
      }
    }

  },
  methods: {
    querydict (val, name) {
      let _this = this;
      _this.formdata.familyAddr2 = '';
      _this.formdata.familyAddr3 = '';
      yufp.service.request({
        method: 'POST',
        url: _this.lazyUrl,
        data: {optType: 'STD_ZB_AREA_CODE', id: val, rootId: val},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.options[name] = response.data;
          }
        }
      });
    },
    cardStartDateChange () {
      let date = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);// 获取当前时间
      if (this.formdata.certStartDate) {
        if (new Date(this.formdata.certStartDate) > new Date(date)) {
          this.formdata.certStartDate = '';
          this.$message({ message: '证件起始日不能大于当前日期!', type: 'warning' });
        }
      }
    },
    // 证件到期日不能早于证件起始日
    certEndDateChange (date) {
      if (date) {
        if (new Date(date).getTime() < new Date(this.formdata.certStartDate).getTime()) {
          this.formdata.certEndDate = '';
          this.$message({ message: '证件到期日不能早于证件起始日!', type: 'warning' });
        }
      }
    },
    subCardStartDateChange () {
      let date = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);// 获取当前时间
      if (this.formdata.subCardStartDate) {
        if (new Date(this.formdata.subCardStartDate) > new Date(date)) {
          this.formdata.subCardStartDate = '';
          this.$message({ message: '附卡证件起始日不能大于当前日期!', type: 'warning' });
        }
      }
    },
    // 证件到期日不能早于证件起始日
    subCardEndDateChange (date) {
      if (date) {
        if (new Date(date).getTime() < new Date(this.formdata.subCardStartDate).getTime()) {
          this.formdata.subCardEndDate = '';
          this.$message({ message: '证件到期日不能早于证件起始日!', type: 'warning' });
        }
      }
    },
    // 重置方法
    reset () {
      this.subCustomizeCardNo = '';
      this.formdata.customizeCardNo = '';
      this.formdata.familyAddrPost = '';
      this.formdata.customizeCardNo = '';
      this.formdata.pinyin = '';
      this.formdata.marStatus = '';
      this.formdata.nation = '';
      this.formdata.qualification = '';
      this.formdata.folk = '';
      this.formdata.certStartDate = '';
      this.formdata.certEndDate = '';
      this.formdata.regiOrg = '';
      this.formdata.resiStatus = '';
      this.formdata.yearIncome = '';
      this.formdata.carStatus = '';
      this.formdata.workYears = '';
      this.formdata.corpName = '';
      this.formdata.corpCategory = '';
      this.formdata.duty = '';
      this.formdata.occu = '';
      this.formdata.trade = '';
      this.formdata.reserveQuestion = '';
      this.formdata.answer = '';
      this.formdata.familyAddrProvince = '';
      this.formdata.familyAddrCity = '';
      this.formdata.familyAddrZone = '';
      this.formdata.familyDetailAddr = '';
      this.formdata.familyPhone = '';
      this.formdata.unitAddrProvince = '';
      this.formdata.unitAddrCity = '';
      this.formdata.unitAddrZone = '';
      this.formdata.unitDetailAddr = '';
      this.formdata.unitAddrPost = '';
      this.formdata.unitPhone = '';
      this.formdata.email = '';
      this.formdata.cardPostAddr = '';
      this.formdata.relaLinkmanName = '';
      this.formdata.relaLinkmanSex = '';
      this.formdata.relaCusCorre = '';
      this.formdata.relaLinkmanPhone = '';
      this.formdata.relaLinkmanFixedPhone = '';
      this.formdata.otherLinkmanName = '';
      this.formdata.otherLinkmanSex = '';
      this.formdata.otherLinkmanCorre = '';
      this.formdata.otherLinkmanPhone = '';
      this.formdata.otherLinkmanFixedPhone = '';
      this.formdata.mainCardNo = '';
      this.formdata.isSubCustomizeCardNo = '';
      this.formdata.subCardCusNation = '';
      this.formdata.subCardStartDate = '';
      this.formdata.subCardEndDate = '';
      this.formdata.isSubCardCertLongVld = '';
      this.formdata.subCardRegiOrg = '';
      this.formdata.subCardIndivFolk = '';
      this.formdata.subCardOccu = '';
      this.formdata.subCardFamilyAddrProvince = '';
      this.formdata.subCardFamilyAddrCity = '';
      this.formdata.subCardFamilyAddrZone = '';
      this.formdata.subCardFamilyDetailAddr = '';
      this.formdata.subCardUnitAddrProvince = '';
      this.formdata.subCardUnitAddrCity = '';
      this.formdata.subCardUnitAddrZone = '';
      this.formdata.subCardUnitDetailAddr = '';
      this.formdata.subCardPostAddr = '';
      this.formdata.recomChnl = '';
      this.formdata.suggestLmt = '';
      this.formdata.remark = '';
      this.formdata.subCustomizeCardNo = '';
      this.formdata.subCardCusPinyin = '';
    },
    // 获取预录入申请信息数据
    getApplyInfo () {
      var _this = this;
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (!data) {
            return;
          }
          this.firstInner = true;
          if (data.certType == 'A') {
            _this.birthflag = true;
          }
          _this.oldPhone = data.phone;
          if (_this.node.currentNode == 'node2') {
            data.phone = '';
            data.subCardCusPhone = '';
          }
          if (data.applyType == 'A' || data.applyType == 'B') {
            if (data.familyAddrProvince == '' || data.familyAddrProvince == null) {
              data.familyAddrProvince = '320000';
              data.familyAddrCity = '320500';
            }
            if (data.unitAddrProvince == '' || data.unitAddrProvince == null) {
              data.unitAddrProvince = '320000';
              data.unitAddrCity = '320500';
            }
            data.nation = data.nation || 'CHN';
          }
          if (data.subCardIndivFolk == null || data.subCardIndivFolk == '') {
            data.subCardIndivFolk = '01';
          }
          if (data.isLongVld == null || data.isLongVld == '') {
            data.isLongVld = '0';
          }
          if (data.subCardCusNation == null || data.subCardCusNation == '') {
            data.subCardCusNation = 'CHN';
          }
          if (data.subCardCusNisSubCardCertLongVldation == null || data.isSubCardCertLongVld == '') {
            data.isSubCardCertLongVld = '0';
          }
          if (data.applyType == 'A' || data.applyType == 'S') {
            if (data.subCardFamilyAddrProvince == '' || data.subCardFamilyAddrProvince == null) {
              data.subCardFamilyAddrProvince = '320000';
              data.subCardFamilyAddrCity = '320500';
            }
            if (data.subCardUnitAddrProvince == '' || data.subCardUnitAddrProvince == null) {
              data.subCardUnitAddrProvince = '320000';
              data.subCardUnitAddrCity = '320500';
            }
            if (data.isSubCustomizeCardNo == '' || data.isSubCustomizeCardNo == null) {
              data.isSubCustomizeCardNo = '0';
            }
          }
          if (data.agreedRepayType == '' || data.agreedRepayType == null) {
            data.agreedRepayType = 'N';
          }
          clone(data, this.pageInfo);
          // this.setImage(data.cardCusType, data.applyCardPrd);
          _this.applyCardType = data.applyType;
          // 独立附卡
          if (this.applyCardType === 'S') {
            data.subCardCusNation = data.subCardCusNation || 'CHN';
            _this.mainCardNoFlag = false;
            _this.applTypeFlag = true;
          }
          clone(data, this.formdata);
          this.customizeCardNo = data.customizeCardNo ? data.customizeCardNo.replace(/625208/, '') : '';
          this.subCustomizeCardNo = data.subCustomizeCardNo ? data.subCustomizeCardNo.replace(/625208/, '') : '';
          if (data.folk == null || data.folk == '') {
            this.formdata.folk = '01';
          }
          if (data.isCustomizeCardNo == '' || data.isCustomizeCardNo == null) {
            _this.formdata.isCustomizeCardNo = '0';
          }
          if (data.isRealTimeCardIssue == '' || data.isRealTimeCardIssue == null) {
            _this.formdata.isRealTimeCardIssue = '0';
          }
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    // 是否自选卡片
    customSelectFn (e) {
      this.customizeCardNoHid = e === '0';
    },
    subCardChange (e) {
      this.subCardHid = e === '0';
    },
    otherLinkRequired (e) {
      if (e != null && e != '') {
        this.otherLinkFlag = true;
      } else {
        this.otherLinkFlag = false;
      }
    },
    agreeChange (e) {
      if (e === 'N') {
        this.formdata.agreedRepayCardNo = '';
        this.agreedRepayCardNoDis = true;
        this.cardnoRequired = false;
      } else {
        this.cardnoRequired = true;
        this.agreedRepayCardNoDis = false;
      }
    },
    validate () {
      let validate = false;
      this.$refs.mainForm.validate(valid => {
        validate = valid;
      });
      return validate;
    },
    saveFn (callback) {
      if (this.oldPhone != this.formdata.phone) {
        this.$message({message: '客户本人手机号码与预录入手机号不一致，请重新录入!', type: 'warning'});
        return false;
      }
      if (this.formdata.applyType == 'A' || this.formdata.applyType == 'B') {
        if (this.formdata.phone == this.formdata.relaLinkmanPhone || this.formdata.phone == this.formdata.otherLinkmanPhone || this.formdata.relaLinkmanPhone == this.formdata.otherLinkmanPhone) {
          this.$message({message: '本人手机，亲属联系人手机，其它联系人手机不可相同!', type: 'warning'});
          return false;
        }
      }
      if (this.formdata.applyType == 'A') {
        if (this.formdata.isCustomizeCardNo == '1' && (this.customizeCardNo == '' || this.customizeCardNo == null)) {
          this.$message({message: '请输入自选卡号!', type: 'warning'});
          return false;
        }
        if (this.formdata.isCustomizeCardNo == '1' && (this.customizeCardNo.length != 10)) {
          this.$message({message: '请输入正确的自选卡号!', type: 'warning'});
          return false;
        }
        if (this.formdata.isSubCustomizeCardNo == '1' && (this.subCustomizeCardNo == '' || this.subCustomizeCardNo == null)) {
          this.$message({message: '请输入附卡自选卡号!', type: 'warning'});
          return false;
        }
        if (this.formdata.isSubCustomizeCardNo == '1' && (this.subCustomizeCardNo.length != 10)) {
          this.$message({message: '请输入正确的附卡自选卡号!', type: 'warning'});
          return false;
        }
      } else if (this.formdata.applyType == 'B') {
        if (this.formdata.isCustomizeCardNo == '1' && (this.customizeCardNo == '' || this.customizeCardNo == null)) {
          this.$message({message: '请输入自选卡号!', type: 'warning'});
          return false;
        }
        if (this.formdata.isCustomizeCardNo == '1' && (this.customizeCardNo.length != 10)) {
          this.$message({message: '请输入正确的自选卡号!', type: 'warning'});
          return false;
        }
      } else {
        if (this.formdata.isSubCustomizeCardNo == '1' && (this.subCustomizeCardNo == '' || this.subCustomizeCardNo == null)) {
          this.$message({message: '请输入附卡自选卡号!', type: 'warning'});
          return false;
        }
        if (this.formdata.isSubCustomizeCardNo == '1' && (this.subCustomizeCardNo.length != 10)) {
          this.$message({message: '请输入正确的附卡自选卡号!', type: 'warning'});
          return false;
        }
      }
      if (this.formdata.isCustomizeCardNo == '1') {
        this.formdata.customizeCardNo = '625208' + this.customizeCardNo;
      } else {
        this.formdata.customizeCardNo = '';
      }
      if (this.formdata.isSubCustomizeCardNo == '1') {
        this.formdata.subCustomizeCardNo = '625208' + this.subCustomizeCardNo;
      } else {
        this.formdata.subCustomizeCardNo = '';
      }
      // 保存至个客人客户信息中
      this.$request({
        url: this.urls.cusUrl,
        method: 'POST',
        data: this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
        } else {
          this.$message({message: message || '保存失败', type: 'error'});
        }
      });
      this.$request({
        url: this.urls.updateUrl,
        method: 'POST',
        data: this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (callback) {
            this[callback](); // 执行提交方法
          } else {
            this.$message({message: '保存成功', type: 'success'});
          }
        } else {
          this.$message({message: message || '保存失败', type: 'error'});
        }
      });
    },

    // 获取流程提交参数
    getFlowParam (commentSign) {
      // 打回 O-1 退回 O-2 否决 O-8 同意 O-12
      const paramWF = {};
      for (let i = 0; i < this.node.flowParam.length; i++) {
        // 流程中业务参数更新
        paramWF[this.node.flowParam[i].key] = this.node.flowParam[i].value;
      }
      // 提交意见信息
      this.commentInfo.instanceId = this.node.instanceId;
      this.commentInfo.nodeId = this.node.nodeId;
      this.commentInfo.userId = this.node.currentUserId;
      this.commentInfo.commentSign = commentSign;
      const param = {
        opType: this.commentInfo.commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      let validate = false;
      this.$refs.mainForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        this.$message({message: '请将必填信息填写完整!', type: 'warning'});
        return false;
      }
      // 独立附卡或主附同申
      if ((this.formdata.applyType == 'S') && this.cardCheck != true) {
        this.$message({message: '请先校验主卡卡号 !', type: 'warning'});
        return;
      }
      if (this.formdata.applyType == 'B' || this.formdata.applyType == 'A') {
        if (this.formdata.isCustomizeCardNo == '1' && this.aliveCardCheck == false) {
          this.$message({message: '请先校验自选卡号是否已存在!', type: 'warning'});
          return;
        }
      }
      if (this.formdata.applyType == 'S' || this.formdata.applyType == 'A') {
        if (this.formdata.isSubCustomizeCardNo == '1' && this.aliveSubCardCheck == false) {
          this.$message({message: '请先校验附卡自选卡号是否已存在!', type: 'warning'});
          return;
        }
      }
      // 独立主卡或主附同申
      if ((this.formdata.applyType == 'B' || this.formdata.applyType == 'A') && this.repayCardCheck != true && this.formdata.agreedRepayType != 'N') {
        this.$message({message: '请先校验约定还款扣款账号 !', type: 'warning'});
        return;
      }
      const param = this.getFlowParam('O-12');
      this.$emit('submit', param);
    },
    // 返回
    backFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    },
    // 退回
    returnFn () {
      this.dialogVisible = true;
    },
    // 确定退回
    doReturnFn () {
      var _this = this;
      let validate = false;
      this.$refs.refFormDemo.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        this.$message({message: '请将必填信息填写完整!', type: 'warning'});
        return false;
      }
      var returnReason = this.returnForm.returnReason;
      const datacode = this.$lookup.find('STD_CARD_RETURN_REASON');

      var i = 0;
      for (i = 0; i < datacode.length; i++) {
        if (datacode[i].key == returnReason) {
          _this.commnent = datacode[i].value;
        }
      }

      this.$request({
        url: this.urls.returnUrl,
        method: 'POST',
        data: {
          serno: this.formdata.serno,
          returnReason: this.returnForm.returnReason
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          const param = this.getFlowParam('O-1');
          param.comment.userComment = _this.commnent;
          this.$emit('submit', param);
        } else {
          this.$message({message: message, type: 'error'});
        }
      });
    },

    // 约定还款扣款账号校验
    checkCardFn (number) {
      let _this = this;
      if (!_this.formdata.agreedRepayCardNo) {
        _this.$message({ message: '请输入约定还款扣款账号！', type: 'warning'});
        return;
      }
      this.$request({
        method: 'POST',
        async: true,
        url: _this.urls.getAccountInfoUrl,
        data: {loanPayoutAccno: _this.formdata.agreedRepayCardNo} // data: {loanPayoutAccno: this.formdata.loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (data == null) {
            _this.$xutils.showMsgBox('提示', '账号不存在，获取名称失败'); // 弹出提示
            return;
          } else {
            if (data.zhufldm2 != '301' && data.zhufldm2 != '310') {
              _this.$xutils.showMsgBox('提示', '非本行一类户，请重新录入！'); // 弹出提示
              return;
            }
            console.log(_this.formdata.cusId + ',' + data.kehuhaoo);
            if (data.kehuhaoo != _this.formdata.cusId) {
              _this.$xutils.showMsgBox('提示', '非本人账号，请重新录入！'); // 弹出提示
              return;
            } else {
              _this.repayCardCheck = true;
              _this.formdata.agreedRepayCusName = data.zhhuzwmc;
              _this.$xutils.showMsgBox('提示', '校验成功!'); // 弹出提示
            }
          }
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
    },
    // 校验自选卡号是否存在
    confirmSelectCardNo () {
      if (this.customizeCardNo.length != '10') {
        this.$xutils.showMsgBox('提示', '卡号长度有误!'); // 弹出提示
        return;
      }
      var selectCardNo = '625208' + this.customizeCardNo;
      var _this = this;
      this.$request({
        method: 'POST',
        url: this.urls.confirmCardAliceUrl,
        data: {
          mainCardNo: selectCardNo
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.aliveCardCheck = true;
          this.$message({ message: '校验成功，不存在已输入卡号!', type: 'success' });
        } else {
          this.$message({ message: message || data.status, type: 'error' });
        }
      });
    },
    // 校验附卡自选卡号是否存在
    confirmSelectSubCardNo () {
      if (this.subCustomizeCardNo.length != '10') {
        this.$xutils.showMsgBox('提示', '卡号长度有误!'); // 弹出提示
        return;
      }
      var selectCardNo = '625208' + this.subCustomizeCardNo;
      var _this = this;
      this.$request({
        method: 'POST',
        url: this.urls.confirmCardAliceUrl,
        data: {
          mainCardNo: selectCardNo
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.aliveSubCardCheck = true;
          this.$message({ message: '校验成功，不存在已输入卡号!', type: 'success' });
        } else {
          this.$message({ message: message || data.status, type: 'error' });
        }
      });
    },
    // 校验主卡卡号有效性及状态
    confirmCardFn (number) {
      var _this = this;
      this.$request({
        method: 'POST',
        url: this.urls.confirmStatusUrl,
        data: {
          serno: this.formdata.serno,
          mainCardNo: this.formdata.mainCardNo
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.cardCheck = true;
          this.$message({ message: '校验成功!', type: 'success' });
        } else {
          this.$message({ message: message || data.status, type: 'error' });
        }
      });
    }
  },
  created () {
    // 获取预录入申请信息数据
    this.getApplyInfo();
    // 流程节点只要不是 node2 则表单只读状态和按钮隐藏
    this.formDisable = this.node.currentNode !== 'node1' && this.node.currentNode !== 'node2' && this.node.currentNode !== 'node3';
    this.formSubmitDisable = this.node.currentNode !== 'node1' && this.node.currentNode !== 'node2';

    let _this = this;
    // 初始化省
    yufp.service.request({
      method: 'POST',
      url: _this.lazyUrl,
      data: {optType: 'STD_ZB_AREA_CODE', levels: '1', id: '100000', rootId: '100000'},
      callback: function (code, message, response) {
        if (response.code == '0') {
          _this.options.familyAddrProvince = response.data;
          _this.options.unitAddrProvince = response.data;
          _this.options.subCardFamilyAddrProvince = response.data;
          _this.options.subCardUnitAddrProvince = response.data;
        }
      }
    });
  }
};
</script>
