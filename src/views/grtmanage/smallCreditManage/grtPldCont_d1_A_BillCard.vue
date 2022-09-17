<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="担保合同编号 " ctype="input"  name="guarContNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="担保合同中文编号" ctype="input"  name="guarContCnNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同类型" ctype="select" name="guarContType" rules="required" disabled data-code="STD_ZB_GUAR_CONT_TYPE" placeholder="请选择"></yu-xform-item>
          <yu-xform-item label="借款人客户编号" ctype="input"  name="cusId" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="借款人客户名称" ctype="input"  name="cusName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="纸质合同编号" ctype="input"  name="paperContNo" :disabled="pageParams.type == 'VIEW'" ></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="请选择" @change="guarWayChange"></yu-xform-item>
          <yu-xform-item label="是否授信项下" ctype="select" placeholder="请选择" data-code="STD_ZB_YES_NO"  name="isUnderLmt" disabled ></yu-xform-item>
          <yu-xform-item label="是否追加担保" ctype="select" name="isSuperaddGuar"  disabled data-code="STD_ZB_YES_NO"  placeholder="请选择"></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input"  name="lmtAccNo"  disabled></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input"  name="replyNo"  disabled></yu-xform-item>
          <yu-xform-item label="抵押顺位" ctype="select" placeholder="请选择" name="pldOrder" data-code="STD_ZB_PLD_ORDER" :hidden="DYHid" :rules="DYRule" :disabled="pageParams.type == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="是否浮动抵押" ctype="select" name="isFloatPld" data-code="STD_ZB_YES_NO" placeholder="请选择" :hidden="DYHid" :rules="DYRule" :disabled="pageParams.type == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="质押合同类型" ctype="select" placeholder="请选择" name="pldContType"  data-code="STD_ZB_PLD_CONT_TYPE" :hidden="ZYHid" :rules="ZYRule"></yu-xform-item>
          <yu-xform-item label="担保币种" ctype="select" name="curType"  data-code="STD_ZB_CUR_TYP"  disabled></yu-xform-item>
          <yu-xform-item label="是否将存量债务纳入担保范围" ctype="select" value="0" name="isDebtGuar" data-code="STD_ZB_YES_NO" placeholder="请选择" rules="required" :disabled="pageParams.type == 'VIEW'" @change="debtGuarChange"></yu-xform-item>
          <yu-xform-item label="担保合同金额" ctype="yu-num"  number-formatter="0,000.00"  name="guarAmt" rules="required" :disabled="pageParams.type == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="担保合同期限" ctype="input"  name="guarTerm" :disabled="pageParams.contType == '1'" ></yu-xform-item>
          <yu-xform-item label="担保起始日期" ctype="datepicker" name="guarStartDate" value-format="yyyy-MM-dd" placeholder="担保起始日期" rules="required" :disabled="pageParams.type == 'VIEW'" @blur="termChange"></yu-xform-item>
          <yu-xform-item label="担保到期日期" ctype="datepicker" name="guarEndDate"  value-format="yyyy-MM-dd" placeholder="担保到期日期" rules="required" :disabled="pageParams.type == 'VIEW'" @blur="termChange"></yu-xform-item>
          <yu-xform-item label="其他约定" ctype="input"  name="otherAgreedEvent" :disabled="pageParams.type == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="主合同编号" ctype="input" placeholder="主合同编号" name="contNo" hidden disabled></yu-xform-item>
          <yu-xform-item label="担保合同流水号 " ctype="input" placeholder="担保合同流水号 " name="guarPkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否追加担保  std_zb_y" ctype="input" placeholder="是否追加担保  std_zb_y" name="isSuperaddGuar" disabled hidden></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="select" placeholder="保证方式" name="assureWay" data-code="STD_ZB_GUARANTY_TYPE" :hidden="formdata.guarWay!=30&&formdata.guarWay!=40" rules="required" hidden-rule :disabled="pageParams.type == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="保证形式 std_zb_assu" ctype="input" placeholder="保证形式 std_zb_assu" name="assureModal" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="select" placeholder="是否在线抵押" name="isOnlinePld" disabled data-code="STD_ZB_YES_NO" :rules="{ required: true, message: '请确保主合同已经选择是否在线抵押!' }" v-if="!isOnlinePldHidden" :hidden="formdata.guarWay==30"></yu-xform-item>
          <yu-xform-item label="签订日期" ctype="input" placeholder="签订日期" name="signDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="input" placeholder="担保合同状态" name="guarContState" disabled hidden></yu-xform-item>
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
          <yu-xform-item label="业务条线" ctype="input" placeholder="业务条线" name="bizLine" data-code="STD_BIZ_LINE" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  props: {
    pageParams: Object,
    dialogId: String,
    contNoSerno: String
  },
  data: function () {
    return {
      DYRule: '',
      DYHid: true,
      ZYRule: '',
      ZYHid: true,
      updateUrl: this.$backend.cmisBiz + '/api/grtguarcont/update',
      addUrl: this.$backend.cmisBiz + '/api/grtguarcont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      disabledFlg2: false,
      isOnlinePldHidden: true,
      checkValue: true,
      checkMsg: ''
    };
  },
  mounted () {

  },
  methods: {
    guarWayChange (val) {
      // 10抵押 20 质押 30保证
      if (val == '10') {
        // 显示
        this.DYRule = 'required';
        this.DYHid = false;
        // 隐藏
        this.ZYRule = '';
        this.ZYHid = true;
      } else if (val == '20') {
        this.ZYRule = 'required';
        this.ZYHid = false;

        this.DYRule = '';
        this.DYHid = true;
      } else {
        this.ZYRule = '';
        this.ZYHid = true;
        this.DYRule = '';
        this.DYHid = true;
      }
    },

    termChange (value) { // 校验合同期限
      var _this = this;
      let guarStartDate = this.formdata.guarStartDate;
      let guarEndDate = this.formdata.guarEndDate;
      if (guarStartDate == 'undefined' || guarStartDate == null || guarStartDate == '') {
        return;
      }
      if (guarEndDate == 'undefined' || guarEndDate == null || guarEndDate == '') {
        return;
      }

      if (guarEndDate < guarStartDate) {
        this.$xutils.showMsgBox('提示', ' 担保合同到期日：' + guarEndDate + '，担保需大于合同起始日：' + guarStartDate); // 弹出提示
        this.formdata.guarTerm = '';
        this.formdata.guarEndDate = null;
        return;
      }
      // 计算月份
      let termMap = {
        startDate: guarStartDate,
        endDate: guarEndDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.guarTerm = data;
        }
      });
    },

    execBillCardDefaultValueFormula: function () {
      // this.formdata.guarContNo = this.$xutils.getSEQWithParamFromServer('GRT_GUAR_SERNO');
      // this.formdata.guarStartDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.pldOrder = '01';
      this.formdata.curType = 'CNY';
      this.formdata.oprType = '01';
      this.formdata.guarContState = '100';
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    },

    // isSameAsMainCont () {
    //   var guarStartDate = this.formdata.guarStartDate;
    //   var guarEndDate = this.formdata.guarEndDate;
    //   if (guarStartDate != this.pageParams.guarStartDate || guarEndDate != this.pageParams.guarEndDate) {
    //     this.$xutils.showMsgBox('提示', '担保起始日期、担保到期日期须与主合同保持一致!', 350, 150);
    //     this.checkValue = false;
    //     this.checkMsg = '担保起始日期、担保到期日期须与主合同保持一致!';
    //     return;
    //   }
    //   this.checkValue = true;
    //   this.checkMsg = '';
    // }

    debtGuarChange () {
      this.$emit('debtGuarClick', this.formdata.isDebtGuar);
    }
  }
};
</script>
