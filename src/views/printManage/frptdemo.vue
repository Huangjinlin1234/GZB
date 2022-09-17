<template>
  <div>
    <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      src: null,
      pageData: {},
      heihgt: 0
    };
  },
  mounted () {
    this.src = this.pageParams.src;
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    closeTab () {
      this.$dialog.close(this.dialogId);// 关闭查看页面
    }
  }
};
</script>
