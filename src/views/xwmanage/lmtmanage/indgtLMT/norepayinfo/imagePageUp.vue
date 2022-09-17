<template>
  <div>
  <yu-panel panel-type="simple" title="影像资料">
    <imageSystem ref="imageSystemRef" :authority="authority" s="1" :para="imageBizParam"></imageSystem>
  </yu-panel>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  components: {
    imageSystem
  },
  computed: {
    authority () {
      if (this.$route.meta.params == null || this.$route.meta.params.PageType == '01') {
      // 查看逻辑
        return 'download';
      } else {
      // 修改逻辑
        return 'import;scan;delImg';
      }
    },
    imageBizParam () {
      var surveySerno = '';
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      let imageBizParam = [
        {
          'top_outsystem_code': 'JYD1',
          'index': {
            'businessid': surveySerno,
            'custid': '',
            'custname': '',
            'custconduct': '',
            'custconductname': '',
            'orgid': '',
            'orgname': '',
            'contid': '',
            'billno': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  data () {
    return {
    };
  },
  mounted () {
    this.$refs.imageSystemRef.commonStyle.height = '1000px';
    this.afterInit();
  },
  methods: {
    // 影像资料
    afterInit () {
      // try {
      //   if (this.getFactory().contextData.flowData.instanceInfo.bizId != null) {
      //     this.getFactory().contextData.PageType = '01';
      //     this.getFactory().contextData.surveySerno = this.getFactory().contextData.flowData.instanceInfo.bizId;
      //   }
      // } catch (e) {}
    },

    showAction () {}
  }
};
</script>
