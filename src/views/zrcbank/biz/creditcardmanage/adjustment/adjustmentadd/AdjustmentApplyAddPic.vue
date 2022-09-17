
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-影像资料
  -->
  <div>
    <imageSystem :authority="authority" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  name: 'AdjustmentApplyAddPic',
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
      return this.pageParams.cusActionType === 'ADD' || this.pageParams.cusActionType === 'EDIT' ? 'import;scan;delImg' : 'download';
    },
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'xyk',
          'outsystem_code': 'xyktezl',
          'index': {
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
