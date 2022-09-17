<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
       <yu-menu-item index="1">申请信息</yu-menu-item>
      <yu-menu-item index="2">影像资料</yu-menu-item>
      <yu-menu-item index="3">关联信息</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
     <rateInfo :page-params="pageParams"></rateInfo>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
    </div>
     <!--关联-->
    <div v-if="tabIndex == '3'">
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import rateInfo from './iqpRateChgApprovePageIndex.vue';
export default {
  components: {rateInfo},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      pageParams: this.$route.meta.params
    };
  },
  created () {
    this.pageParams = this.$route.meta.params;
  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
    }
  }
};
</script>
