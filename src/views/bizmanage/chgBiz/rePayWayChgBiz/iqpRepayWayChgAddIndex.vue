<template>
  <div>
    <yu-xform ref="refForm" label-width="120px"  v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="原借据编号" :mapping="{'billNo':'billNo'}" width="960" height="480" :parms="baseParamsBillNo" ></yu-xform-item>
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
      formdata: {}
    };
  },
  methods: {
    // 下一步
    onContinue () {
      let validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const iqpSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
      const iqpRepayWayChg = {
        'iqpSerno': iqpSerno,
        'billNo': this.formdata.billNo
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqprepaywaychg/insertIqpRepayWayChgByBillNo',
        data: iqpRepayWayChg,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            iqpRepayWayChg['model_group_no'] = 'CMG000033';
            iqpRepayWayChg['op'] = 'EDIT';
            iqpRepayWayChg['opType'] = 'EDIT';
            this.$dialog.open(
              '还款方式变更申请',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              iqpRepayWayChg,
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
        this.formdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
