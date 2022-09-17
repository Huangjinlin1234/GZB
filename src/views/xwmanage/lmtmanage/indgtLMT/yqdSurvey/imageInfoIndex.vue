<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  // props: {
  //   pageParams: Object,
  //   dialogId: String
  // },
  components: {
    imageSystem
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'HLWYX',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            // [{"index":{"docid":"3aba9f1030d44fbfadeee91b48041731"},"top_outsystem_code":"HLWYX","outsystem_code":"HLWYX"}]
            'docid': this.showAction()
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

    showAction () {
      let _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        return this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        return _this.getFactory().bizPageData.instanceInfo.bizId;
      }
    }
  }
};
</script>

