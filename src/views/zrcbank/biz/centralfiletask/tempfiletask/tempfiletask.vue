<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="临时档案台帐" name="first">
        <tempfiletaskList></tempfiletaskList>
      </yu-tab-pane>
      <yu-tab-pane label="临时档案台帐历史" name="second">
        <tempfiletaskhis></tempfiletaskhis>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import tempfiletaskList from "./tempfiletaskList.vue";
import tempfiletaskhis from "./tempfiletaskhis.vue";
export default {
  components: {
    tempfiletaskList,
    tempfiletaskhis
  },
  data: function() {
    return {
      activeName: "first"
    };
  }
};
</script>
