<template>
  <yu-panel  :collapse-hide="false" name="forth">
     <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </yu-panel>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { imageSystem},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': this.pageParams.imageCode,
          'outsystem_code': this.pageParams.imageCode2,
          'index': {
            'businessid': this.pageParams.bizSerno,
            'assuretype': '',
            'dzyid': '',
            'docid': '',
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.pageParams.contNo,
            'orgname': '',
            'opername': '',
            'custid': this.pageParams.cusId,
            'creditamount': '',
            'maintaindate': '',
            'billno': this.pageParams.billNo,
            'custname': '',
            'credittype': ''
          }
        }
      ]
      // baseTable: {}
    };
  }
};
</script>