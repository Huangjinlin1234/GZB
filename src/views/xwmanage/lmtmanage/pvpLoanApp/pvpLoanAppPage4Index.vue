<template>
  <div>
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  components: {
    imageSystem
  },
  computed: {

    imageBizParam () {
      debugger;
      var imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ';
      var docid = '';
      if (this.bizPageData != null) {
        // 这个时候判断是从审批流进来的  直接查数据就行了
        // 单页面 跳审批的时候 是这个
        // 审批走单一页面
        imageCode = this.bizPageData.instanceInfo.param.imageCode;
      } else if (this.$route.params.hasOwnProperty('imageCode')) {
        // 走路由
        imageCode = this.$route.meta.params.imageCode;
        docid = this.$route.meta.params.docid;
      } else {
        // 走审批模版工厂
        imageCode = this.getFactory().bizPageData.instanceInfo.param.imageCode;
        docid = this.getFactory().bizPageData.instanceInfo.param.docid;
      }
      let imageBizParam = [
        {
          'top_outsystem_code': imageCode,
          'index': {
            'businessid': this.getContId(),
            'contid': this.getContId(),
            'docid': docid
          }
        }
      ];
      return imageBizParam;
    }
  },
  data () {
    return {
      contid: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 影像资料
    afterInit () {
      // debugger;
      // this.$route.params.hasOwnProperty('imageCode') ? this.$route.meta.params.imageCode : this.bizPageData.instanceInfo.param.imageCode;
    },
    getContId () {
      var condit = '';
      if (this.bizPageData != null) {
        // 这个时候判断是从审批流进来的  直接查数据就行了
        // 单页面 跳审批的时候 是这个
        // 审批走单一页面
        condit = this.bizPageData.instanceInfo.bizId;
      } else if (this.$route.params.hasOwnProperty('pvpSerno')) {
        // 走路由
        condit = this.$route.meta.params.pvpSerno;
      } else {
        // 走审批模版工厂
        condit = this.getFactory().bizPageData.instanceInfo.bizId;
      }

      // try {
      // // 走路由
      //   condit = this.$route.meta.params.pvpSerno;
      // } catch (e) {
      //   try {
      //   // 审批走单一页面
      //     condit = this.bizPageData.instanceInfo.bizId;
      //   } catch (e2) {
      //   // 走审批模版工厂 .params.
      //     condit = this.getFactory().bizPageData.instanceInfo.bizId;
      //   }
      // }
      return condit;
    },

    showAction () {}
  }
};
</script>
