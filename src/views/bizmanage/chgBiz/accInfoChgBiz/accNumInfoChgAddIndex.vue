<template>
  <div>
 <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
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
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formType:{}
    };
  },
  created: function () {
    const userInfo = this.$xutils.getLoginUserInfo();
    this.baseParams = {'managerId': userInfo.loginCode, 'accStatus': '1'};
  },
  methods: {
    // 下一步
    onContinue () {
      let selPars = this.$refs.refTable.selections;

      if (selPars == null || selPars == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      }
      selPars = this.$refs.refTable.selections[0];
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/insertIqpBillAcctChgAppByBillNo',
        data: selPars,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            selPars['model_group_no'] = 'CMG000070';
            selPars['op'] = 'EDIT';
            this.$dialog.open(
              '账号变更申请',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              selPars,
              null,
              true,
              true
            );// 回调函数close原本就没定义，所以传null->注：Lq
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          // eslint-disable-next-line no-console
          console.log('error====', result);
          this.$xutils.showMsgBox('提示', '错误信息：' + result.message); // 弹出提示
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
