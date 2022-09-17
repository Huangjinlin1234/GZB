<template>
    <div>
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="原借据编号" colspan="24" name="billNo" ctype="yufp-zrc-selector" :params="contParms" :rules="{ required: true, message: '字段不能为空' }" @select-fn="selectCont"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">下一步</yu-button>
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
      formdata: {},
      baseParamsBillNo: {},
      contParms: {
        title: '选择原借据',
        queryFields: [{ placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '产品编号', field: 'prdId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '产品名称', field: 'prdName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.cmisBiz}/api/accloan/`,
        tableColumns: [{ label: '借据编号', prop: 'billNo' }, { label: '合同编号', prop: 'contNo' }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '产品编号 ', prop: 'prdId' }, { label: '产品名称', prop: 'prdName'}, { label: '贷款金额', prop: 'loanAmt' }]
      }
    };
  },
  mounted: function () {
  },
  methods: {
    selectCont: function (arr) {
      this.formdata.billNo = arr[0].billNo;
      this.formdata.accStatus = arr[0].accStatus;
    },
    /**
       * 取消
       */
    doNextStep () {
      let row = {};
      const selPars = this.formdata;
      if (selPars.accStatus != '1') {
        this.$xutils.showMsgBox('提示', '该借据不允许进行利率调整', 350, 150);
        return;
      }
      // 调用序列号生成的规则，生成放款申请序列号
      const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO', {});
      const iqpratechgapp = {
        'billNo': selPars.billNo,
        'iqpSerno': rateCHGSerno
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpratechgapp/iqpRateChg/saveLeadIqpRateChgInfo',
        data: iqpratechgapp,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            row = yufp.clone(response.data, {});
            row['model_group_no'] = 'CMG000042';
            row['op'] = 'EDIT';
            row['iqpSerno'] = 'rateCHGSerno';
            this.$dialog.open(
              '利率调整申请',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              row
            );
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /* 取消按钮*/
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
