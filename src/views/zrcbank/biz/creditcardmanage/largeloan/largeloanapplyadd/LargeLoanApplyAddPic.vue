
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期申请信息-影像资料
  -->
  <div>
    <imageSystem :key="key" :authority="authority" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  name: 'LargeLoanApplyAddPic',
  components: {imageSystem},
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      key: 0
    };
  },
  computed: {
    authority () {
      if (this.pageParams.cusActionType === 'ADD' || this.pageParams.cusActionType === 'EDIT') {
        return 'import;scan;delImg';
      } else {
        return 'download';
      }
    },
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'XXD_ZXFQ',
          'outsystem_code': 'XXD_ZXFQ01,XXD_ZXFQ02,XXD_ZXFQ03,XXD_ZXFQ04,XXD_ZXFQ05,XXD_ZXFQ06,XXD_ZXFQ07',
          'index': {
            'businessid': this.pageParams.serno,
            'docid': this.pageParams.serno,
            'custname': this.pageParams.cusName,
            'cardno': this.pageParams.cusName,
            'custphone': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  watch: {
    pageParams: {
      deep: true,
      handler (oldVal, newVal) {
        this.imageBizParam[0].index.custname = newVal.cusName;
        this.imageBizParam[0].index.cardno = newVal.cardNo;
      }
    }
  },
  updated () {
    // this.$forceUpdate();
    // this.key += 1;
  },
  methods: {

  }
};
</script>
