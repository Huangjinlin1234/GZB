
<template>
  <div>
    <yu-panel panel-type="simple" title="影像资料" style="height:2000px">
      <imageSystem authority="import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move" :para="imageBizParam" style="height:2000px" :s="power" ></imageSystem>
    </yu-panel>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  name: 'LargeLoanApplyInfoPic',
  components: {imageSystem},
  data: function () {
    return {};
  },
  computed: {
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': this.$route.meta.params.topOutsystemCode,
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': '',
            'businessid': this.$route.meta.params.iqpSerno,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.$route.meta.params.iqpSerno,
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
      ];
      return imageBizParam;
    },
    power () {
      return this.$route.meta.params.s;
    }

  },
  methods: {

  }
};
</script>
