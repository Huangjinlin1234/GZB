<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  props: {
    pageParams: Object },
  components: {
    imageSystem
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'xyk',
          'outsystem_code': 'jzzy17,jzzy18,jzzy19,jzzy20,jzzy21,jzzy22,jzzy23',
          'index': {
            'docid': this.pageParams.iqpSerno,
            'custname': '',
            'cardno': '',
            'custphone': ''
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
