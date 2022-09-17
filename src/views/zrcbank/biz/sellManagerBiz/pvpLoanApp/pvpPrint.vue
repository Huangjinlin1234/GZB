<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
    </div>
</template>
<script>
export default {
  props: {
    bizPageData: Object
  },

  data: function () {
    return {
      src: null,
      heihgt: 0
    };
  },
  mounted () {
    this.src = this.$backend.frptRptService + 'JKJJ_td.cpt&pvpSerno=' + this.bizPageData.data.instanceInfo.bizId + '&contNo=' + this.bizPageData.data.instanceInfo.param.contNo;
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  }

};
</script>


