<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待领取" name="first">
        <centralfiletask ref="first"></centralfiletask>
      </yu-tab-pane>
      <yu-tab-pane label="待处理" name="second">
        <centralfiletaskTodo ref="second"></centralfiletaskTodo>
      </yu-tab-pane>
      <yu-tab-pane label="历史记录" name="third">
        <centralfiletaskHis ref="third"></centralfiletaskHis>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import centralfiletask from "./centralfiletask.vue";
import centralfiletaskTodo from "./centralfiletaskTodo.vue";
import centralfiletaskHis from "./centralfiltertaskHis.vue";
export default {
  components: {
    centralfiletask,
    centralfiletaskTodo,
    centralfiletaskHis,
  },
  data: function () {
    return {
      activeName: "first",
    };
  },
  watch:{
    activeName: function(val){
      if(val == "first"){
        this.$refs[val].$refs.refTableWg.remoteData();
      }else if(val == "second"){
        this.$refs[val].$refs.refTableTodo.remoteData();
      }else if(val == "third"){
        this.$refs[val].$refs.refTable2.remoteData();
      }
    }
  }
};
</script>
