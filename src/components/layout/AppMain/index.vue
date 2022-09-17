<template>
  <div class="ck" :id="'tabBox_' + containterID">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      const views = this.$store.state.tagsView.cachedViews.filter(view => !!view && !!view.name && view.name === this.$route.name);
      const cvs = [];
      views.forEach(element => {
        cvs.push(element.name);
      });
      return cvs.length === 0 ? cvs : undefined;
    },
    key () {
      return this.$route.fullPath;
    },
    containterID () {
      return this.$route.name;
    }
  }
};
</script>
