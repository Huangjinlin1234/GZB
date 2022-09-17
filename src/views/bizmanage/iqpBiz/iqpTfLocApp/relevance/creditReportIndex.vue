<template>
<h1>开发中</h1>
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
    AfterInit() {
      this.$xutils.showMsgBox('提示:', '待开发!');
    }
  }
};
</script>
