<template>
    <div>
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
            docid: this.getFactory().contextData.biz_serno,
            contid: this.getFactory().contextData.biz_serno,
            businessid: '8400163524',
            custconduct: '94011911',
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
    _this.imageBizParam[0].top_outsystem_code = 'CDHPSQ';
  },
  methods: {
  }
};
</script>
