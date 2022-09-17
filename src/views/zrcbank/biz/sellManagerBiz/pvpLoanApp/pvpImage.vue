<template>
  <div>
    <imageSystem authority="import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move" s="1" :para="imageBizParam"></imageSystem>
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
          'top_outsystem_code': this.imageData.topOutsystemCode,
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': this.imageData.docid,
            'businessid': this.imageData.contNo,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.imageData.contNo,
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }
      ]
    };
  }
};
</script>
