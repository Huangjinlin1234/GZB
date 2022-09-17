<template>
<yu-tabs  type="card">
  <yu-tab-pane label="征信信息">
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </yu-tab-pane>
  <yu-tab-pane label="影像信息" lazy="true">
    <imageSystem authority="import;insert;download;scan;delImg" s="2" :para="imageBizParam"></imageSystem>
  </yu-tab-pane>
</yu-tabs>
</template>
<script>
import d1Billcard from './creditReportQryRecordListRHGRView_d1_BillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {d1Billcard, imageSystem},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'ZXCXSQZLGR',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            // [{"index":{"docid":"3aba9f1030d44fbfadeee91b48041731"},"top_outsystem_code":"HLWYX","outsystem_code":"HLWYX"}]
            'scanid': ''
            // 'businessid': 'XD00234997'
            // 'custname': this.pageParams.cusName,
            // 'custname': this.getFactory().contextData.cusName,
            // 'cardno': this.pageParams.cusName,
            // 'cardno': this.getFactory().contextData.cusName,
            // 'custphone': ''
          }
        }
      ],
      d1BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillCard = this.$refs.d1_BillCard;
      this.d1BillCard.queryDataByCondition({crqlSerno: this.pageParams.crqlSerno}, 'post');
      this.imageBizParam[0].index.scanid = this.pageParams.crqlSerno;
      this.d1BillCard.setItemEditable('*');
      if (this.pageParams.qryResn == '27') {
        this.d1BillCard.setBillCardItemVisible('qryResnDec', true);
        if (this.pageParams.imageNo) {
          this.imageBizParam[0].index.scanid = this.pageParams.imageNo;
        }
      } else {
        this.d1BillCard.setBillCardItemVisible('qryResnDec', false);
      }
      this.queryLoan();
    },
    // 查询贷款融资信息
    queryLoan () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportloanfina/querybycrqlserno',
        data: _this.pageParams.crqlSerno,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            if (response.data.otherBankIsFin || response.data.ourBankIsFin || response.data.applyFinAmt || response.data.applyFinTerm || response.data.applyFinGuarType || response.data.applyFinRemark) {
              _this.$refs.d1_BillCard.$data.isShowLoan = true;
              _this.$refs.d1_BillCard.$data.formdata.otherBankIsFin = response.data.otherBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.ourBankIsFin = response.data.ourBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.applyFinAmt = response.data.applyFinAmt;
              _this.$refs.d1_BillCard.$data.formdata.applyFinTerm = response.data.applyFinTerm;
              _this.$refs.d1_BillCard.$data.formdata.applyFinGuarType = response.data.applyFinGuarType;
              _this.$refs.d1_BillCard.$data.formdata.applyFinRemark = response.data.applyFinRemark;
            }
          } else {
            // _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
