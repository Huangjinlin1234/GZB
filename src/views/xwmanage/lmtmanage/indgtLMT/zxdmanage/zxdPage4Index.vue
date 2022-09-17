<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './zxdPage4_d1_BillList.vue';
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      jjlb: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.jjlb = this.$refs.d1_BillList;
      this.getBillNO();
    },

    showAction () {},

    getBillNO () {
      let _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = _this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = _this.getFactory().bizPageData.instanceInfo.bizId;
      }
      // 根据调查流水号去后台返回借据号
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/getbillno',
        data: {surveySerno: this.surveySerno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          this.jjlb.baseParams = {condition: {billNo: data}};
        }
      });
    },
    doSelect () {
      // console.log(this);
      let _this = this;
      if (this.jjlb.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      let rowDataJson = _this.jjlb.$refs.refTable.selections[0];
      // 贷款台账模块
      rowDataJson['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      rowDataJson['op'] = 'VIEW';
      rowDataJson['bill_no'] = rowDataJson.billNo;

      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        rowDataJson
      );
    }

  }
};
</script>
