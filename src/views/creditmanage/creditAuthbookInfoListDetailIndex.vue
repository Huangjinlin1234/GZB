<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="基本信息">
      <d1-1-billcard ref="d1_1_BillCard"></d1-1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" lazy="true">
      <imageSystem authority="import;insert;download;scan;delImg" s="2" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billcard from './creditAuthbookInfoListDetail_d1_1_BillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {d11Billcard, imageSystem},
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
      d11BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d11BillCard = this.$refs.d1_1_BillCard;
      this.d11BillCard.queryDataByCondition({'caiSerno': this.pageParams.caiSerno}, 'post');
      this.imageBizParam[0].index.scanid = this.pageParams.imageNo;
      if (this.pageParams.qryCls == '1') {
        this.imageBizParam[0]['top_outsystem_code'] = 'ZXCXSQZLQY';
        this.d11BillCard.$data.dicOptions.authbookContentOptions = [{key: '008', value: '审核本单位信贷业务申请'}, {key: '009', value: '审核本单位作为担保人'}, {key: '010', value: '审核本单位作为关联人'}, {key: '011', value: '受理企业信用等级评定'}, {key: '007', value: '对已发放的信贷业务进行贷后风险管理'}];
      }
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
