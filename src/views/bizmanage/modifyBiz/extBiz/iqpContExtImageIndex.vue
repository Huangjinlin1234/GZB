<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
       影像查看
      */
    AfterInit () {
      // eslint-disable-next-line no-alert
      window.alert('待开发...');
      // 打开影像   外网测试使用
      // this.$xutils.getTopWindow().addTabbItem('IM0000', '影像测试', '影像测试', 'HTTPURL', 'http://www.baidu.com', true, true);
    },

    // 定义树切换调用方法
    showAction () {
      // this.$xutils.getTopWindow().addTabbItem('IM0000', '影像测试', '影像测试', 'HTTPURL', 'http://www.baidu.com', true, true);
    }
  }
};
</script>
