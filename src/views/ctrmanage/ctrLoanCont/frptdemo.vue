<template>
  <div>
    <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      src: null,
      pageData: {},
      heihgt: 0
    };
  },
  created () {
    this.pageData = this.$route.meta.params;
  },
  mounted () {
    this.src = this.pageData.src;
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    closeTab () {
      this.$route.closeTab(this.$route.meta.path);
    }
  }
};
</script>
