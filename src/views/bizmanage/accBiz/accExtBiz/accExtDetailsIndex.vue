<template>
   <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-panel title="展期信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="展期借据编号" ctype="input" placeholder="展期借据编号" name="extBillNo" disabled></yu-xform-item>
            <yu-xform-item label="展期协议编号" ctype="input" placeholder="展期协议编号" name="extCtrNo" disabled></yu-xform-item>
            <yu-xform-item label="展期金额" ctype="yu-currency" name="extAmt" placeholder="展期金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="展期到期日期" ctype="datepicker" name="extEndDate" value-format="yyyy-MM-dd" disabled placeholder="展期到期日期"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" disabled placeholder="备注" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原借据信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="原借据编号" ctype="input" placeholder="原借据编号" name="oldBillNo" disabled></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="oldContNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="原币种" ctype="select" name="fountCurType" disabled data-code="STD_ZB_CUR_TYP" placeholder="原币种"></yu-xform-item>
            <yu-xform-item label="原贷款金额" ctype="yu-currency" name="fountLoanAmt" disabled placeholder="原贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原贷款余额" ctype="yu-currency" name="fountLoanBalance" disabled placeholder="原贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原起贷日期" ctype="datepicker" name="fountStartDate" value-format="yyyy-MM-dd" disabled placeholder="原起贷日期"></yu-xform-item>
            <yu-xform-item label="原止贷日期" ctype="datepicker" name="fountEndDate" value-format="yyyy-MM-dd" disabled placeholder="原止贷日期"></yu-xform-item>
            <yu-xform-item label="原执行利率（年）" ctype="yu-interest-rate" name="oldRealityIrY" disabled placeholder="原执行利率（年）"></yu-xform-item>
            <yu-xform-item label="原执行利率(月)" ctype="yu-num" name="oldRealityIrM" disabled placeholder="原执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="原逾期利率（年）" ctype="yu-interest-rate" name="oldOverdueRateY" disabled placeholder="原逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="原违约利率（年）" ctype="yu-interest-rate" name="oldDefaultRateY" disabled placeholder="原违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率定价信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="利率依据方式" ctype="select" name="irAccordType" disabled data-code="STD_ZB_IR_WAY" placeholder="利率依据方式"></yu-xform-item>
            <yu-xform-item label="利率种类" ctype="select" name="irType" disabled data-code="STD_ZB_IR_TYP" placeholder="利率种类"></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="yu-interest-rate" name="rulingIr" disabled placeholder="基准利率（年）"></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="yu-num" name="rulingIrM" disabled placeholder="对应基准利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="计息方式" ctype="select" name="loanRatType" disabled data-code="STD_ZB_LOAN_RAT_TYPE" placeholder="计息方式"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" disabled data-code="STD_ZB_RADJ_TYP" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="yu-num" name="irAdjustTerm" disabled placeholder="利率调整周期(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="调息方式" ctype="select" name="praType" disabled hidden data-code="STD_ZB_PRA_MODE" placeholder="调息方式"></yu-xform-item>
            <yu-xform-item label="利率形式" ctype="select" name="rateType" data-code="STD_ZB_RATE_TYPE" placeholder="利率形式"></yu-xform-item>
            <yu-xform-item label="正常利率浮动方式" ctype="select" name="irFloatType" disabled data-code="STD_ZB_RFLOAT_TYP" placeholder="正常利率浮动方式"></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="yu-num" name="irFloatRate" disabled placeholder="利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="固定加点值" ctype="yu-num" name="irFloatPoint" disabled placeholder="固定加点值" :min="0" ></yu-xform-item>
            <yu-xform-item label="展期执行利率（年）" ctype="yu-interest-rate" name="extRealityIrY" disabled placeholder="展期执行利率（年）"></yu-xform-item>
            <yu-xform-item label="展期执行利率(月)" ctype="yu-num" name="extRealityIrM" disabled placeholder="展期执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="逾期利率浮动方式" ctype="select" name="overdueFloatType" disabled data-code="STD_ZB_RFLOAT_TYP" placeholder="逾期利率浮动方式"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动加点值" ctype="yu-num" name="overduePoint" disabled placeholder="逾期利率浮动加点值" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="yu-num" name="overdueRate" disabled placeholder="逾期利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="yu-interest-rate" name="overdueRateY" disabled placeholder="逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="违约利率浮动方式" ctype="select" name="defaultFloatType" disabled data-code="STD_ZB_RFLOAT_TYP" placeholder="违约利率浮动方式"></yu-xform-item>
            <yu-xform-item label="违约利率浮动加点值" ctype="yu-num" name="defaultPoint" disabled placeholder="违约利率浮动加点值" :min="0" ></yu-xform-item>
            <yu-xform-item label="违约利率浮动百分比" ctype="yu-num" name="defaultRate" disabled placeholder="违约利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="违约利率（年）" ctype="yu-interest-rate" name="defaultRateY" disabled placeholder="违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="台账状态" ctype="select" name="accStatus" disabled data-code="STD_ZB_ACC_TYP" placeholder="台账状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_IR_WAY,STD_ZB_IR_TYP,STD_ZB_LOAN_RAT_TYPE,STD_ZB_RADJ_TYP,STD_ZB_PRA_MODE,STD_ZB_RATE_TYPE,STD_ZB_RFLOAT_TYP,STD_ZB_ACC_TYP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/accext/update',
      addUrl: this.$backend.cmisBiz + '/api/accext/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      formDisabled: false
    };
  },
  mounted () {
    this.initData();
  },
  methods: {
    /**
       *展期台账详情页面
       *  @author liqichao
       */
    initData () {
      // this.queryFormData();
      yufp.clone(this.pageParams, this.formdata)
      // 根据利率依据方式IR_ACCORD_TYPE的值判断页面显示字段
      this.irAccordType();
      if (this.pageParams.op == 'VIEW') {
        // 若op为VIEW，则设置页面字段均为不可编辑
        this.formDisabled = true;
      }
    },
    queryFormData: function () {
      let _this = this;
      _this.$request({
        url: this.addUrl,
        method: 'post',
        data: {extBillNo: this.pageParams.extBillNo}
      }).then((response) => {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata);
        }
      }).catch(() => {
      });
    },
    // 根据利率调整方式IR_ADJUST_TYPE的值判断是否显示IR_ADJUST_TERM利率调整周期
    irAdjustTerm () {
      if (this.formdata.irAdjustType == '2') {
        this.$refs.refForm.setItemHidden('irAdjustTerm', false);
        // 如果利率调整方式为2-按指定周期调整，则显示利率调整周期字段
      } else {
        this.$refs.refForm.setItemHidden('irAdjustTerm', true);
      }
    },
    // 根据利率形式RATE_TYPE的值判断是否显示IR_FLOAT_TYPE正常利率浮动方式
    rateType () {
      if (this.formdata.rateType == '1') {
        // 如果利率形式为1-浮动利率，则显示正常利率浮动方式字段
        this.$refs.refForm.setItemHidden('irFloatType', false);
      } else {
        this.$refs.refForm.setItemHidden('irFloatType', true);
      }
      // 如果利率浮动方式为03-比例浮动 则显示逾期利率浮动百分比字段隐藏逾期利率浮动加点值字段
      if (this.formdata.irFloatType == '03') {
        this.$refs.refForm.setItemHidden('irFloatRate', false);
        this.$refs.refForm.setItemHidden('irFloatPoint', true);
      } else if (this.formdata.irFloatType == '02') {
        // 如果逾期利率浮动方式为02-点数浮动，则显示逾期利率浮动加点值字段隐藏逾期利率浮动百分比字段
        this.$refs.refForm.setItemHidden('irFloatRate', true);
        this.$refs.refForm.setItemHidden('irFloatPoint', false);
      } else {
        this.$refs.refForm.setItemHidden('irFloatRate', true);
        this.$refs.refForm.setItemHidden('irFloatPoint', true);
      }
    },
    // 根据逾期利率浮动方式OVERDUE_FLOAT_TYPE的值判断是否显示OVERDUE_POINT逾期利率浮动加点值、OVERDUE_RATE逾期利率浮动百分比字段
    overdueFloatType () {
      if (this.formdata.overdueFloatType == '03') {
        // 如果逾期利率浮动方式为03-比例浮动，则显示逾期利率浮动百分比字段隐藏逾期利率浮动加点值字段
        this.$refs.refForm.setItemHidden('overdueRate', false);
        this.$refs.refForm.setItemHidden('overduePoint', true);
      } else if (this.formdata.overdueFloatType == '02') {
        // 如果逾期利率浮动方式为02-点数浮动，则显示逾期利率浮动加点值字段隐藏逾期利率浮动百分比字段
        this.$refs.refForm.setItemHidden('overdueRate', true);
        this.$refs.refForm.setItemHidden('overduePoint', false);
      } else {
        this.$refs.refForm.setItemHidden('overdueRate', true);
        this.$refs.refForm.setItemHidden('overduePoint', true);
      }
    },
    // 根据违约利率浮动方式DEFAULT_FLOAT_TYPE的值判断是否显示DEFAULT_POINT违约利率浮动加点值、DEFAULT_RATE违约利率浮动百分比字段
    defaultFloatType () {
      if (this.formdata.defaultFloatType == '03') {
        // 如果违约利率浮动方式为03-比例浮动，则显示违约利率浮动百分比字段隐藏违约利率浮动加点值字段
        this.$refs.refForm.setItemHidden('defaultRate', false);
        this.$refs.refForm.setItemHidden('defaultPoint', true);
      } else if (this.formdata.defaultFloatType == '02') {
        // 如果违约利率浮动方式为02-点数浮动，则显示违约利率浮动加点值字段隐藏违约利率浮动百分比字段
        this.$refs.refForm.setItemHidden('defaultRate', true);
        this.$refs.refForm.setItemHidden('defaultPoint', false);
      } else {
        this.$refs.refForm.setItemHidden('defaultRate', true);
        this.$refs.refForm.setItemHidden('defaultPoint', true);
      }
    },
    // 根据利率依据方式IR_ACCORD_TYPE的值判断页面显示字段
    irAccordType () {
      const items = 'irType;rulingIr;rulingIrM;loanRatType;irAdjustType;irAdjustTerm;rateType;irFloatType;irFloatRate;irFloatPoint;overdueFloatType;overduePoint;overdueRate;defaultFloatType;defaultPoint;defaultRate';
      if (this.formdata.irAccordType == '01') {
        // 如果利率依据方式为01-议价利率依据，则只显示“执行利率（年）”、执行利率（月）、逾期利率（年）、违约利率（年）字段
        this.setItemHiddens(items, true);
      } else {
        this.setItemHiddens(items, false);
        // 根据利率调整方式IR_ADJUST_TYPE的值判断是否显示IR_ADJUST_TERM利率调整周期
        this.irAdjustTerm();
        // 根据利率形式RATE_TYPE的值判断是否显示IR_FLOAT_TYPE正常利率浮动方式
        this.rateType();
        // 根据逾期利率浮动方式OVERDUE_FLOAT_TYPE的值判断是否显示OVERDUE_POINT逾期利率浮动加点值、OVERDUE_RATE逾期利率浮动百分比字段
        this.overdueFloatType();
        // 根据违约利率浮动方式DEFAULT_FLOAT_TYPE的值判断是否显示DEFAULT_POINT违约利率浮动加点值、DEFAULT_RATE违约利率浮动百分比字段
        this.defaultFloatType();
      }
    },
    // 批量设置隐藏显示
    setItemHiddens: function (str, hidden) {
      let arr = str.split(';');
      for (let i = 0; i < arr.length; i++) {
        this.$refs.refForm.setItemHidden(arr[i], hidden);
      }
    },
    // 借据查看
    viewLoan () {
      if (this.pageParams.oldBillNo == '' || this.pageParams.oldBillNo == null) {
        this.$xutils.showMsgBox('提示', '借据号不能为空！');
        return;
      }
      const accLoan = {
        'billNo': this.pageParams.oldBillNo
      };

      this.$dialog.open(
        '借据信息查看',
        'bizmanage/chgBiz/iqpInterestChg/iqpRepayInterestChgViewLoanDetailIndex',
        900,
        650,
        accLoan
      );
    },
    // 客户信息查看
    viewCus () {
      if (this.pageParams.cusId == '' || this.pageParams.cusId == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }
      const cusDetail = { 'cusId': this.pageParams.cusId};
      this.$dialog.open(
        '客户信息查看',
        'bizmanage/chgBiz/chgReprayDate/iqpRepayWayDateChgViewCusDetailIndex',
        1300,
        700,
        cusDetail
      );
    },

    // 返回列表页面
    cancel () {
      this.$dialog.close(this.dialogId);// 关闭查看页面
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
