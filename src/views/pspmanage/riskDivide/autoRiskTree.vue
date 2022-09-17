/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-自动分类
 */
<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="18">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-submenu index="1">
          <template slot="title">风险分类-自动初分</template>
          <yu-menu-item index="1-1" :style="color['1-1'] && activeIndex == '1-1' ? color['1-1'] : 'color: #48576a;'">任务基本信息</yu-menu-item>
          <yu-menu-item index="1-2" :style="color['1-2'] && activeIndex == '1-2' ? color['1-2'] : 'color: #48576a;'">贷款情况分析</yu-menu-item>
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">担保情况分析</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">初分</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <riskDivideDetail v-if="activeIndex == '1-1'" ref="riskDivideDetail"></riskDivideDetail>
      <riskLoanSituAnaly v-if="activeIndex == '1-2'" ref="riskLoanSituAnaly"></riskLoanSituAnaly>
      <yu-panel v-if="activeIndex == '1-3'" panel-type="simple">
        <template>
          <riskGuarContAnaly ref="riskGuarContAnaly"></riskGuarContAnaly>
        </template>
        <template>
          <riskPldimnAnaly ref="riskPldimnAnaly"></riskPldimnAnaly>
        </template>
        <template>
          <riskGuarntrAnaly ref="riskGuarntrAnaly"></riskGuarntrAnaly>
        </template>
      </yu-panel>
      <autoRiskResultInfo v-if="activeIndex == '1-4'" ref="autoRiskResultInfo"></autoRiskResultInfo>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    </yu-col>
  </yu-row>
 </div>
  </template>
<script>
import riskDivideDetail from '@/views/pspmanage/riskDivide/riskDivideDetail';
import riskLoanSituAnaly from '@/views/pspmanage/riskDivide/riskLoanSituAnaly';
import riskGuarContAnaly from '@/views/pspmanage/riskDivide/riskGuarContAnaly';
import riskPldimnAnaly from '@/views/pspmanage/riskDivide/riskPldimnAnaly';
import riskGuarntrAnaly from '@/views/pspmanage/riskDivide/riskGuarntrAnaly';
import autoRiskResultInfo from '@/views/pspmanage/riskDivide/autoRiskResultInfo';
export default {
  components: { riskDivideDetail, riskLoanSituAnaly, riskGuarContAnaly, riskPldimnAnaly, riskGuarntrAnaly, autoRiskResultInfo },
  data: function () {
    return {
      color: ['1-1'],
      activeIndex: '1-1'
    };
  },
  mounted () {
  },
  methods: {
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
<style>
.tac {
  border: 1px solid #d1dbe5;
}
.tac .el-menu-item {
  color: #48576a !important;
  background: #fff;
}
</style>
