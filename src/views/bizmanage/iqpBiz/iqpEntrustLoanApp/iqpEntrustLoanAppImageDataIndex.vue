<template>
    <div style="width: 100%; height: 100%; margin-top: 5px">
      <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {
    imageSystem
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: '',
          index: {
            businessid: '8400163524',
            custconduct: '94011911',
            docid: this.getFactory().contextData.biz_serno,
            contid: this.getFactory().contextData.biz_serno,
            operid: '94011911',
            custconductname: '沙涛',
            orgid: '019000',
            custtype: '211',
            orgname: '西张支行',
            opername: '沙涛',
            custid: '8400163524',
            maintaindate: '20210531202026',
            custname: '苏州隆阳医疗幼垛有限公司'
          }
        }
      ]
    };
  },
  mounted () {
    // this.AfterInit()
    var _this = this;
    if (this.getFactory().contextData.guarMode == '10') {
      _this.imageBizParam[0].top_outsystem_code = 'WTDKDYHT';
    } else if (this.getFactory().contextData.guarMode == '20') {
      _this.imageBizParam[0].top_outsystem_code = 'WTDKZYHT';
    } else if (this.getFactory().contextData.guarMode == '30') {
      _this.imageBizParam[0].top_outsystem_code = 'WTDKBZDBHT';
    }
  },
  methods: {
  }
};
</script>
