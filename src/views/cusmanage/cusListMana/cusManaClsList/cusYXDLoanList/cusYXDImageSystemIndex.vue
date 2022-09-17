<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {imageSystem},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageBizParam: [
        {
          top_outsystem_code: 'ZX_YXD',
          index: {
            'docid': this.getFactory().contextData.serno ? this.getFactory().contextData.serno : this.getFactory().contextData.instanceInfo.bizId
          }
        }
      ]
    };
  },
  mounted () {
  }
};
</script>
