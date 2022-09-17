<template>
<div style="height: 100%">
<iframe :src="url" frameborder="0" style="height: 100%;width:100%"></iframe>
</div>
</template>
<script>
export default {
  // components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      url: ''
    };
  },
  mounted () {
    this.url = this.$route.meta.params.url;
  },

  methods: {

  }
};
</script>