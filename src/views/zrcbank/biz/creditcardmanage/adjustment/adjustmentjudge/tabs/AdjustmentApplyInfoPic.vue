
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额放款审批-影像资料
  -->
  <div>
    <yu-panel panel-type="simple" title="影像资料">
      <imageSystem authority="import;scan;delImg" :para="imageBizParam"></imageSystem>
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
          'top_outsystem_code': 'xyk',
          'outsystem_code': 'xyktezl',
          'index': {
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
