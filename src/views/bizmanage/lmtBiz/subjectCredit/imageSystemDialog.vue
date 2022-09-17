<template>
  <div>
<!--    <div ref="refChildren" authority="import;download" :s="1" :is="currentView" :children="children" :para="imageBizParam" @changed="cancelFn"></div>-->
    <image-system authority="import;download" :s="imageType" :para="imageBizParam"></image-system>
  </div>
</template>

<script>
import imageSystem from '@/views/imageManage/imageSystem';
import ImageSystem from '../../../imageManage/imageSystem';
export default {
  name: 'ImageSystemDialog',
  components: {ImageSystem},
  props: {
    children: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      currentView: '',
      imageBizParam: {},
      imageType: '1'
    };
  },
  created () {
    console.log('this.pageParams====>', this.pageParams);
    this.imageBizParam = this.pageParams;
    if (this.pageParams[0].imageType) {
      this.imageType = this.pageParams[0].imageType;
    }
    this.currentView = 'imageSystem';
  },
  methods: {
    cancelFn: function () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>

<style scoped>

</style>
