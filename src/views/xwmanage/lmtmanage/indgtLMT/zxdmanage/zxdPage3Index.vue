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
          'top_outsystem_code': 'JYD1',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 惠享贷
            'docid': this.getSerno(),
            // 经营性贷一
            'businessid': this.getSerno()
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

    },

    showAction () {},
    getSerno () {
      let _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        return _this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        return _this.getFactory().bizPageData.instanceInfo.bizId;
      }
    }
  }
};
</script>
