<template>
<!--小微征信报告模板-->
  <yu-tabs type="card">
    <yu-tab-pane label="征信信息">
      <d1-billcard ref="d1_BillCard"></d1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" lazy="true">
      <imageSystem authority="import;insert;download;scan;delImg" s="2" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billcard from './creditQryBizRealListViewIndex_d1_BillCard.vue';
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
      this.d1BillCard.queryDataByCondition({'crqlSerno': this.pageParams.crqlSerno}, 'post');
      this.d1BillCard.setItemEditable('cusId', false);
      this.d1BillCard.setItemEditable('qryCls', false);
      this.d1BillCard.setItemEditable('borrowRel', false);
      this.d1BillCard.setItemEditable('cusName', false);
      this.d1BillCard.setItemEditable('certType', false);
      this.d1BillCard.setItemEditable('certCode', false);
      this.imageBizParam[0].index.scanid = this.pageParams.crqlSerno;

      if (this.pageParams.qryCls == '1') {
        this.imageBizParam[0]['top_outsystem_code'] = 'ZXCXSQZLQY';
      }
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
