<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" form-type="edit" v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="oldBillNo" rules="required" placeholder="原借据编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','curType':'fountCurType','overdueRateY':'oldOverdueRateY','serno':'serno','cusName':'cusName','prdName':'prdName','endDate':'fountEndDate','defaultRateY':'oldDefaultRateY','oldLoanBalance':'extAmt','contNo':'oldContNo','loanAmt':'fountLoanAmt','realityIrY':'oldRealityIrY','loanBalance':'fountLoanBalance','cusId':'cusId','realityIrM':'oldRealityIrM','billNo':'oldBillNo','startDate':'fountStartDate'}" width="960" height="480" :parms="baseParamsBillNo" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onContinue">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_FIVE_SORT,STD_ZB_ACC_TYP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
     formdata:{}
    };
  },
  mounted () {
  },
  methods: {

    // 下一步
    onContinue () {
       var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if(!validate){
        return;
      }
      // 获取当前登录信息
      const userInfo = this.$xutils.getLoginUserInfo();
      const iqpSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
      const iqpRepayTermChg = {
        // 'iqpSerno': iqpSerno,
        // 'billNo': selPars.billNo,
        // 'inputId': userInfo.loginCode,
        // 'inputBrId': userInfo.orgCode,
        // 'inputDate': this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        // 'updId': userInfo.loginCode,
        // 'updBrId': userInfo.orgCode,
        // 'updDate': this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
      };
      this.$xutils.request({
        // 新增
        url: this.$backend.cmisBiz + '/api/iqprepaytermchg/insertIqpRepayTermChgByBillNo',
        data: JSON.stringify(iqpRepayTermChg),
        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            iqpRepayTermChg['model_group_no'] = 'CMG000052';
            iqpRepayTermChg['op'] = 'EDIT';

            this.$dialog.open(
              '还款间隔周期变更申请',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              yufp.clone(iqpRepayTermChg, {}),
              null,
              true,
              true
            );
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
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
