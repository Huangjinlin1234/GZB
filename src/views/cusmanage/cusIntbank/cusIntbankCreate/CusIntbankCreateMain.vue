<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <!-- 若无个性化样式，请删除本行及下行 -->
    <yu-row>
      <yu-col :sm="4" :xs="24">
        <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
          <yu-menu-item index="1">机构基础信息</yu-menu-item>
          <yu-menu-item index="2">高管人员信息</yu-menu-item>
          <yu-menu-item index="3">资本构成信息</yu-menu-item>
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <cusCorpBase v-if="activeIndex == 1" ref="cusCorpBase" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBase>
        <cusCorpMgr v-if="activeIndex == 2" ref="cusCorpMgr" :cusCorp="cusCorp" :viewType="viewType"></cusCorpMgr>
        <cusCorpApitalInfo v-if="activeIndex == 3" ref="cusCorpApitalInfo" :cusCorp="cusCorp" :viewType="viewType"></cusCorpApitalInfo>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusIntbank/cusIntbankCreate/cusIntbankBaseIndex';
import cusCorpMgr from '@/views/cusmanage/cusIntbank/cusIntbankCreate/cusIntbankMrgIndex';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
export default {
  components: { cusCorpBase, cusCorpMgr, cusCorpApitalInfo },
  data: function () {
    return {
      color: [],
      activeIndex: '',
      activeName: 'cusCorpBase',
      cusCorp: {},
      viewType: 'EDIT'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 查询客户详情
     */
    AfterInit () {
      this.cusCorp = this.$route.meta.params;
      this.viewType = this.cusCorp.viewType;
      this.activeIndex = 1
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
    },
  }
};
</script>
<style>

</style>
