
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="历年数据查看" :collapseHide="false">
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" :default-load="false"  :base-params="params" request-type="POST">
        <yu-xtable-column label="年份" prop="inputdate"></yu-xtable-column>
        <yu-xtable-column label="共用笔数" prop="curtyeayutiltimes" ></yu-xtable-column>
        <yu-xtable-column label="结余笔数" prop="curtsurplusqnt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>


export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/taskurgentdetailinfo/groupSum',
      params: {},
      baseFormdata: {}
    };
  },
  mounted () {
    var model = {};
    model.userCode = this.$route.meta.params.inputId;
    this.params = { condition: JSON.stringify(model) };
  },
  methods: {
    back () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
