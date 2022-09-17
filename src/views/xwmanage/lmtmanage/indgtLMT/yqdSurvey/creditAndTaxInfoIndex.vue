<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    <hyxxCard ref="hyxxCard"></hyxxCard>
  </div>
</template>
<script>
import d1ABillcard from './creditAndTaxInfo_d1_A_BillCard.vue';
import d1BBillcard from './creditAndTaxInfo_d1_B_BillCard.vue';
import hyxxCard from './checkInfoIndex.vue';
export default {
  components: {d1ABillcard, d1BBillcard, hyxxCard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      zxxx: null,
      swxx: null,
      hyxx: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 优企贷-征信及税务信息*/
    afterInit () {
      this.zxxx = this.$refs.d1_A_BillCard;
      this.swxx = this.$refs.d1_B_BillCard;
      this.hyxx = this.$refs.hyxxCard;
      // this.zxxx.queryDataByCondition('surveySerno=' + '' + this.getFactory().contextData.surveySerno + '');
      // this.swxx.queryDataByCondition('surveySerno=' + '' + this.getFactory().contextData.surveySerno + '');
      // 查询俩数据
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtdebitcreditinfo/selectone',
        data: {surveySerno: this.surveySerno}
      }).then(({data, code, message}) => {
        if (data != null) {
          // data.toinvResn = data.toinvResn.split(';');
          yufp.clone(data.lmtDebitCreditInfo, this.zxxx.formdata);
          yufp.clone(data.lmtSurveyReportComInfo, this.swxx.formdata);
        }
      });
    },

    showAction () {}
  }
};
</script>
