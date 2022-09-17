<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="当前任务" name="first">
        <wydfirstcheck ref="wydfirstcheckPage"></wydfirstcheck>
      </yu-tab-pane>
      <yu-tab-pane label="历史任务" name="third">
        <wydfirstcheckHis ref="wydfirstcheckHisPage"></wydfirstcheckHis>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import wydfirstcheck from "./wydFirstCheck.vue";
import wydfirstcheckHis from "./wydFirstCheckHis.vue";
export default {
  components: {
    wydfirstcheck,
    wydfirstcheckHis,
  },
  data: function () {
    return {
      activeName: "first",
    };
  },
  mounted: function () {
    if(this.iskhjl()){
      this.$refs.wydfirstcheckPage.baseParams = {condition: {'approveStatusList': '997', execId: this.$xutils.getDefaultformulaData('$LoginLoginCode')}};
      this.$refs.wydfirstcheckPage.isShow = false;
    }else{
      this.$refs.wydfirstcheckPage.baseParams = {condition: {'approveStatusList': '000,111,992', execId: this.$xutils.getDefaultformulaData('$LoginLoginCode')}};
    }
  },
  methods:{
    // 标签页切换
    handleClick (e) {
      if (e.name === 'third') {
        let roles = this.$xutils.getLoginUserInfo().roles;
        for(let i = 0; i < roles.length; i++){
          let role = roles[i].code;
          if(role === 'R1045'){ //微业贷一级分配
           this.$refs.wydfirstcheckHisPage.baseParams = {condition: {'approveStatusList': '111,997'}};
          }else if(role === 'R1046'){ //微业贷二级分配
           this.$refs.wydfirstcheckHisPage.baseParams = {condition: {'approveStatusList': '997', issueBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode')}};
          }
        }
        }
      },
      iskhjl(){
        let roles = this.$xutils.getLoginUserInfo().roles;
        for(let i = 0; i < roles.length; i++){
          let role = roles[i].code;
          if(role === 'R0050'){ //小企业客户经理
           return true;
          }
        }
        return false;
      }

    }
};
</script>
