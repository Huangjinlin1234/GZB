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
    dialogId: String,
    bizPageData: Object
  },
  components: {
    imageSystem
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'ZX_HXD',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            'businessid': this.getContId()
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
    getContId () {
      debugger;
      var condit = '';

      // 走路由
      condit = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;

      return condit;
    },
    showAction () {}
  }
};
</script>
