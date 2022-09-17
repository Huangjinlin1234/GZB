
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期审批-影像资料
  -->
  <div>
    <yu-panel panel-type="simple" title="影像资料">
     <imageSystem authority="import;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </yu-panel>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  name: 'LargeLoanApplyInfoPic',
  components: {imageSystem},
  props: {
    applyInfoPicParams: Object
  },
  data: function () {
    return {};
  },
  computed: {
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'XXD_ZXFQ',
          'outsystem_code': 'XXD_ZXFQ01,XXD_ZXFQ02,XXD_ZXFQ03,XXD_ZXFQ04,XXD_ZXFQ05,XXD_ZXFQ06,XXD_ZXFQ07',
          'index': {
            'businessid': this.applyInfoPicParams.serno,
            'docid': this.applyInfoPicParams.serno,
            'custname': '',
            'cardno': '',
            'custphone': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  methods: {

  }
};
</script>
