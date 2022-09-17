<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  components: {
    imageSystem
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ',
          'index': {
            // 'docid': this.pageParams.serno,
            'contid': this.pageParams.iqpSerno,
            'businessid': this.pageParams.iqpSerno
            // 'businessid': 'XD00234997'
            // 'custname': this.pageParams.cusName,
            // 'custname': this.getFactory().contextData.cusName,
            // 'cardno': this.pageParams.cusName,
            // 'cardno': this.getFactory().contextData.cusName,
            // 'custphone': ''
          }
        }
      ]
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 影像资料
    afterInit () {
      // try {
      //   if (this.getFactory().contextData.flowData.instanceInfo.bizId != null) {
      //     this.getFactory().contextData.PageType = '01';
      //     this.getFactory().contextData.surveySerno = this.getFactory().contextData.flowData.instanceInfo.bizId;
      //   }
      // } catch (e) {}
    },

    showAction () {}
  }
};
</script>
