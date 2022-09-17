<template>
  <imageSystem authority="import;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {imageSystem},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'DSKHZL',
          index: {
            businessid: '',
            // custconduct: '',
            // operid: '',
            // custconductname: '',
            // orgid: '',
            // custtype: '',
            // orgname: '',
            // opername: '',
            custid: ''
            // maintaindate: '',
            // custname: ''
          }
        }
      ]
    };
  },
  created () {
    let data = this.$route.meta.params;
    console.log(data);
    this.imageBizParam[0].index.businessid = this.pageParams ? this.pageParams.bizId : data.serno;
    this.imageBizParam[0].index.custid = this.pageParams ? this.pageParams.cusId : data.cusId;
    let bizType = this.pageParams ? this.pageParams.bizType : data.bizType;
    if(bizType === 'A07' || bizType === 'A08') {
      this.imageBizParam[0].top_outsystem_code = 'DGKHZL'
    }
  },
  mounted () {
    this.AfterInit();
  },

  methods: {
    /*
       客户影像查看
      */
    AfterInit () {
      // 打开影像   外网测试使用
      // this.$route.addTab();
      // this.$xutils.getTopWindow().addTabbItem('IM0000', '影像测试', '影像测试', 'HTTPURL', 'http://www.baidu.com', true, true);
    },

    // 定义树切换调用方法
    showAction () {
      // this.$xutils.getTopWindow().addTabbItem('IM0000', '影像测试', '影像测试', 'HTTPURL', 'http://www.baidu.com', true, true);
    }
  }
};
</script>
