<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="24">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-menu-item index="1">申请信息</yu-menu-item>
        <yu-menu-item index="2">影像资料</yu-menu-item>
        <yu-menu-item index="3">历史审批</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <!--申请信息-->
      <guarWarrantOutUpdateIndex v-show="activeIndex == '1'" ref="guarWarrantOutUpdateIndex" :params="pageParams" :wfData="bizPageData" :dialogId="dialogId"></guarWarrantOutUpdateIndex>
      <imageSystem v-if="activeIndex == '2'" authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
      <approvalIndex v-if="activeIndex == '3'" ref="approvalIndex" :params="pageParams" :wfData="bizPageData" :dialogId="dialogId"></approvalIndex>
    </yu-col>
  </yu-row>
 </div>
  </template>
<script>
// 申请信息
import guarWarrantOutUpdateIndex from '@/views/guarmanage/guarwarrant/guarwarrantout/guarWarrantOutUpdateIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import approvalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
export default {
  components: { guarWarrantOutUpdateIndex, imageSystem, approvalIndex},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      color: [],
      activeIndex: '1',
      activeName: 'cusIndivBase',
      bizType: '',
      cusId: {},
      op: '',
      imageBizParam: [
        {
          top_outsystem_code: 'CMSYPYX',
          index: {
            'docid': (this.pageParams && this.pageParams.serno) || (this.bizPageData && this.bizPageData.instanceInfo.guarNo)
          }
        }
      ]
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
      if(index == 2) {
        let serno = this.$refs.guarWarrantOutUpdateIndex.$refs.d1_BillCard.formdata.serno;
        this.imageBizParam[0] = {
          top_outsystem_code: 'CMSYPYX',
          index: {
            'docid': serno
          }
        }
      }
    }
  }
};
</script>
<style>

</style>
