<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  props: {
    imageData: Object,
    dialogId: String
  },
  computed: {


  },

  components: {
    imageSystem
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'ZX_HXD',
          // 'outsystem_code': 'ZX_YXD06',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': this.$route.meta.params.surveySerno,
            'businessid': this.$route.meta.params.surveySerno

          }
        }
      ]
    };
  }
};
</script>
