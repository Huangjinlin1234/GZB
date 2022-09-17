<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="担保合同编号 " ctype="input" placeholder="担保合同编号 " name="guarContNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同中文编号" ctype="input" placeholder="担保合同中文编号" name="guarContCnNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="借款人客户编号" ctype="input" placeholder="借款人客户编号" name="cusId" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="借款人客户名称" ctype="input" placeholder="担保人名称" name="cusName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="是否授信项下" ctype="select" placeholder="请选择" data-code="STD_ZB_YES_NO" name="isUnderLmt" @change="isUnderLmtChange" rules="required"></yu-xform-item>
          <yu-xform-item label="是否追加担保 " ctype="select" placeholder="请选择" data-code="STD_ZB_YES_NO"  name="isSuperaddGuar"  :disabled="isSuperaddGuarDis" rules="required"></yu-xform-item>
          <yu-xform-item label="担保合同类型" ctype="select" name="guarContType"  data-code="STD_ZB_GUAR_CONT_TYPE" placeholder="请选择" rules="required"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="请选择" @change="changeDisabledFlag" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同流水号 " ctype="input" placeholder="担保合同流水号 " name="guarPkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="select" placeholder="保证方式" name="assureWay" data-code="STD_ZB_GUARANTY_TYPE" :hidden="formdata.guarWay!=30"></yu-xform-item>
          <yu-xform-item label="保证形式 std_zb_assu" ctype="input" placeholder="保证形式 std_zb_assu" name="assureModal" disabled hidden></yu-xform-item>
          <yu-xform-item label="纸质合同编号" ctype="input" placeholder="纸质合同编号" name="paperContNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="select" placeholder="是否在线抵押" name="isOnlinePld" :disabled="disabledFlg" data-code="STD_ZB_YES_NO" :rules="{ required: true, message: '请确保主合同已经选择是否在线抵押!' }" :hidden="formdata.guarWay!=10"></yu-xform-item>
          <yu-xform-item label="抵质押合同类型" ctype="input" placeholder="抵质押合同类型" name="pldContType" disabled hidden></yu-xform-item>
          <yu-xform-item label="抵押顺位" ctype="input" placeholder="抵押顺位" name="pldOrder" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否浮动抵押" ctype="input" placeholder="是否浮动抵押" name="isFloatPld" disabled hidden></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="input" placeholder="借款人编号" name="borrowerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否合格担保 std_zb_ye" ctype="input" placeholder="是否合格担保 std_zb_ye" name="isQualifiedGuar" disabled hidden></yu-xform-item>
          <yu-xform-item label="本次占用担保金额" ctype="input" placeholder="本次占用担保金额" name="guarAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="期限类型 std_zb_term" ctype="input" placeholder="期限类型 std_zb_term" name="termType" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保期限" ctype="input" placeholder="担保期限" name="guarTerm" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保起始日" ctype="input" placeholder="担保起始日" name="guarStartDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保终止日" ctype="input" placeholder="担保终止日" name="guarEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="签订日期" ctype="input" placeholder="签订日期" name="signDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="质押类型 std_zb_imn_" ctype="input" placeholder="质押类型 std_zb_imn_" name="imnType" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="input" placeholder="合同状态" name="guarContState" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保双录编号" ctype="input" placeholder="担保双录编号" name="guarIserchNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" disabled hidden></yu-xform-item>
          <yu-xform-item label="争议借据方式选项" ctype="input" placeholder="争议借据方式选项" name="billDispupeOpt" disabled hidden></yu-xform-item>
          <yu-xform-item label="法院所在地" ctype="input" placeholder="法院所在地" name="courtAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="仲裁委员会地点" ctype="input" placeholder="仲裁委员会地点" name="arbitrateAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他方式" ctype="input" placeholder="其他方式" name="otherOpt" disabled hidden></yu-xform-item>
          <yu-xform-item label="仲裁机构" ctype="input" placeholder="仲裁机构" name="arbitrateBch" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同份数" ctype="input" placeholder="合同份数" name="contQnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="甲方执合同份数" ctype="input" placeholder="甲方执合同份数" name="contQntOwner" disabled hidden></yu-xform-item>
          <yu-xform-item label="乙方执合同份数" ctype="input" placeholder="乙方执合同份数" name="contQntPartyB" disabled hidden></yu-xform-item>
          <yu-xform-item label="丙方执合同份数" ctype="input" placeholder="丙方执合同份数" name="contQntPartyC" disabled hidden></yu-xform-item>
          <yu-xform-item label="丁方执合同份数" ctype="input" placeholder="丁方执合同份数" name="contQntPartyD" disabled hidden></yu-xform-item>
          <yu-xform-item label="戊方执合同份数" ctype="input" placeholder="戊方执合同份数" name="contQntPartyE" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他主合同" ctype="input" placeholder="其他主合同" name="otherMainCont" disabled hidden></yu-xform-item>
          <yu-xform-item label="确认最高债权额方式 std_zb" ctype="input" placeholder="确认最高债权额方式 std_zb" name="maxClaimTp" disabled hidden></yu-xform-item>
          <yu-xform-item label="最高债权额" ctype="input" placeholder="最高债权额" name="maxClaimAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="其他约定事项" ctype="input" placeholder="其他约定事项" name="otherAgreedEvent" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同打印次数" ctype="input" placeholder="合同打印次数" name="contPrintNum" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请类型 std_zb_grt_" ctype="input" placeholder="申请类型 std_zb_grt_" name="approveType" disabled hidden></yu-xform-item>
          <yu-xform-item label="注销日期" ctype="input" placeholder="注销日期" name="logoutDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保类型" ctype="select" name="guarType" rules="required" data-code="STD_GUAR_TYPE" hidden placeholder="担保类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('next')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { lookup} from '@/utils';
lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE,STD_GUAR_TYPE,STD_ZB_YES_NO,STD_ZB_GUARANTY_TYPE');
export default{
  props: {
    pageParams: Object,
    dialogId: String
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      isSuperaddGuarDis: false,
      updateUrl: this.$backend.cmisBiz + '/api/guarcont/update',
      addUrl: this.$backend.cmisBiz + '/api/guarcont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      showAble1: true,
      showAble2: false,
      disabledFlg: false
    };
  },
  mounted () {
    this.getIsOnlinePld();
  },
  // 这个'是否授信项下'为啥写死啊？
  // created () {
  //   this.formdata.isUnderLmt = '0';
  // },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '10' || op.key === '20' || op.key === '30') {
          return true;
        }
        return false;
      });
    },
    changeDisabledFlag: function (value) {
      if (value == '00' || value == '30') {
        this.formdata.isOnlinePld = '0';
      }
    },

    isUnderLmtChange (val) {
      let belgLine = this.formdata.belgLine;
      if (this.pageParams.isAddGuar) {
        this.isSuperaddGuarDis = false;
      } else {
        if (val == '0') {
          this.formdata.isSuperaddGuar = '1';
          this.isSuperaddGuarDis = true;
        } else {
          this.formdata.isSuperaddGuar = '0';
          this.isSuperaddGuarDis = false;
        }
      }

      // 如果是小微条线，是否追加担保都可选
      if (belgLine === '01') {
        this.isSuperaddGuarDis = false;
      }
    },
    getIsOnlinePld () {
      let _this = this;
      if (_this.getFactory().contextData) {
        // $dialog 获取参数
        _this.formdata.isOnlinePld = _this.getFactory().contextData.isOnlinePld;
        _this.formdata.guarStartDate = _this.getFactory().contextData.guarStartDate;
        _this.formdata.guarEndDate = _this.getFactory().contextData.guarEndDate;
      } else if (_this.$route.meta.params) {
        // addTab 获取参数
        _this.formdata.isOnlinePld = _this.$route.meta.params.isOnlinePld;
        _this.formdata.guarStartDate = _this.$route.meta.params.guarStartDate;
        _this.formdata.guarEndDate = _this.$route.meta.params.guarEndDate;
      }
    }
  }
};
</script>
