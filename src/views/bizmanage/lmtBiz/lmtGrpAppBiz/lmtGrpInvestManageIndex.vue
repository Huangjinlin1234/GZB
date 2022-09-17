<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 投贷后管理情况
       * author yangwl
       * date 2021-04-13
       * */
    AfterInit() {
      this.$xutils.createHtml('d1', '待开发...');
    }
  }
};
</script>
