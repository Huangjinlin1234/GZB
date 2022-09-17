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
  created () {
    this.pageData = this.pageParams;
  },
  mounted () {
    this.src = this.pageData.src;
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
