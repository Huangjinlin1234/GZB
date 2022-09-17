/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="18">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
          <yu-menu-item index="1" :style="color[1] && activeIndex == 1 ? color[1] : 'color: #fff;'">检查任务信息</yu-menu-item>
          <yu-menu-item index="2"  v-if="bizType != 'B02'" :style="color[2] && activeIndex == 2 ? color[2] : 'color: #48576a;'">基本情况</yu-menu-item>
          <yu-menu-item index="3" :style="color[3] && activeIndex == 3 ? color[3] : 'color: #48576a;'">融资及对外担保情况</yu-menu-item>
          <yu-menu-item index="4" :style="color[4] && activeIndex == 4 ? color[4] : 'color: #48576a;'">预警信号分析</yu-menu-item>
          <yu-menu-item index="5" :style="color[5] && activeIndex == 5 ? color[5] : 'color: #48576a;'">经营状况检查</yu-menu-item>
          <yu-menu-item index="6" :style="color[6] && activeIndex == 6 ? color[6] : 'color: #48576a;'">财务状况检查</yu-menu-item>
          <yu-menu-item index="7" :style="color[7] && activeIndex == 7 ? color[7] : 'color: #48576a;'">担保状况检查</yu-menu-item>
          <yu-menu-item index="8" :style="color[8] && activeIndex == 8 ? color[8] : 'color: #48576a;'">授信时贷后管理建议落实情况</yu-menu-item>
          <yu-menu-item index="9" :style="color[9] && activeIndex == 9 ? color[9] : 'color: #48576a;'">检查结果及意见</yu-menu-item>
          <yu-menu-item index="10" :style="color[10] && activeIndex == 10 ? color[10] : 'color: #48576a;'">定期检查报告</yu-menu-item>
          <yu-menu-item index="11" :style="color[11] && activeIndex == 11 ? color[11] : 'color: #48576a;'">影像资料</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <regularCheckDetail v-if="activeIndex == 1" ref="regularCheckDetail"></regularCheckDetail>
      <cusIndivSocilaInfo v-if="activeIndex == 2" ref="cusIndivSocilaInfo"></cusIndivSocilaInfo>
      <cusIndivImage v-if="activeIndex == 3" ref="cusIndivImage"></cusIndivImage>
      <!--评级必要信息 -->
      <indivCusRankScore v-if="activeIndex == 4" ref="indivCusRankScore"></indivCusRankScore>
            <yu-tabs v-if="activeIndex == 5" v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="经营状况检查（通用）" name="cusIndivBase">
          <cusIndivBase ref="cusIndivBase"></cusIndivBase>
        </yu-tab-pane>
        <yu-tab-pane label="经营状况检查（农林牧渔业）" name="cusIndivContactInfo">
          <cusIndivContactInfo ref="cusIndivContactInfo"></cusIndivContactInfo>
        </yu-tab-pane>
        <yu-tab-pane label="经营状况检查（制造业）" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-tab-pane label="经营状况检查（批发零售业）" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-tab-pane label="经营状况检查（建筑业）" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-tab-pane label="经营状况检查（房地产开发贷）" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-tab-pane label="经营性物业贷款检查" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-tab-pane label="固定资产贷款、项目贷款检查" name="cusIndivUnitInfo">
          <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
        </yu-tab-pane>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="onSave" v-if="op!='VIEW'">暂存</yu-button>
          <yu-button type="primary" @click="onCommit" v-if="op!='VIEW'">提交</yu-button>
          <yu-button type="primary" @click="onBack" v-if="op!='VIEW'">返回</yu-button>
        </yu-form-buttons>
      </yu-tabs>
    </yu-col>
  </yu-row>
 </div>
  </template>
<script>
import cusIndivBase from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivCreatInfoIndex';
import cusIndivContactInfo from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivContactInfoIndex';
import cusIndivUnitInfo from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivUnitInfoIndex';
import cusIndivAttrInfo from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivAttrInfoIndex';
import cusIndivSocilaInfo from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivSocilaInfoListIndex';
import regularCheckDetail from '@/views/pspmanage/pspCheck/regularCheck/regularCheckDetail';
import cusIndivImage from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivImageIndex';
import indivCusRankScore from '@/views/cusmanage/indivCus/indivCusDefend/indivCusRankScoreIndex';
export default {
  components: { cusIndivBase, cusIndivContactInfo, cusIndivUnitInfo, cusIndivAttrInfo, cusIndivSocilaInfo, cusIndivImage, indivCusRankScore, regularCheckDetail },
  data: function () {
    return {
      // color: [1],
      activeIndex: 1,
      activeName: 'cusIndivBase',
      bizType: '',
      op: ''
    };
  },
  mounted () {
    var _this = this;
    _this.bizType = _this.$route.params.bizType;
    _this.op = _this.$route.params.op;
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
    /**
     * 关闭当前页面
     */
    onBack () {
      let data = this.$route.params;
      yufp.frame.removeTab(data.key);
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
