
<template>
    <div>
      <iframe :src="slUrl" frameborder="0" :style="commonStyle" scrolling="yes"></iframe>
    </div>
</template>
<script>
export default {
  name: 'ImageSystem',
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      imageSrcUrl: this.$backend.cmisCus + '/api/image/getImageSrc',
      slUrl: 'http://10.28.121.32/appbs_vplay.action?token=TK6674EG0HENKV9L',
      commonStyle: {
        width: '100%',
        height: (yufp.frame.size().height - 55) + 'px',
        border: 0
      }
    };
  },
  methods: {
  },
  created () {
  },
  mounted () {
    try {
      // 正常页面进入 审批
      // 走新增tab页签进来的
      var surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      this.slUrl += '&sno=' + surveySerno;
    } catch (e) {
      // 走审批模版工厂
      var surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      this.slUrl += '&sno=' + surveySerno;
    }
  }
};
</script>
