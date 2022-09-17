<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
       <yu-menu-item index="1">展期申请信息</yu-menu-item>
      <yu-menu-item index="2">影像信息</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="展期新增" name="first">
         <extInfo :page-params="pageParams"></extInfo>
      </yu-tab-pane>
      <yu-tab-pane label="借据列表" name="second">
        <loanInfo :page-params="pageParams"></loanInfo>
      </yu-tab-pane>
    </yu-tabs>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import extInfo from './iqpContExtAddIndex';
import loanInfo from './iqpLoanExtAppListIndex';
export default {
  components: {extInfo, loanInfo},
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
