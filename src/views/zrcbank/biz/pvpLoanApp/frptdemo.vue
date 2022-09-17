<template>
  <div>
    <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object
  },
  data () {
    return {
      src: null,
      pageData: {},
      heihgt: 0
    };
  },
  created () {
    if (this.pageParams) {
      this.src = this.pageParams.src;
      this.height = '750px';
    } else {
      this.pageData = this.$route.meta.params;
      this.src = this.pageData.src;
      this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
    }
  },
  mounted () {

  },
  methods: {
    closeTab () {
      this.$route.closeTab(this.$route.meta.path);
    }
  }
};
</script>
