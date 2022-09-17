
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11 
    @updated by 2021-05-21 15:42:11
    @description 展期协议
  -->
  <div>
     <yu-tabs v-model="activeName">
      <yu-tab-pane label="待签协议" name="1">
        <iqpcontextContAppList></iqpcontextContAppList>
      </yu-tab-pane>
      <yu-tab-pane label="历史协议" name="2">
        <iqpcontextContHistory></iqpcontextContHistory>
      </yu-tab-pane>
    </yu-tabs>
      
  </div>
</template>
<script>
import iqpcontextContAppList from './iqpcontextContAppList';
import iqpcontextContHistory from './iqpcontextContHistory';

export default {
  components: {iqpcontextContAppList, iqpcontextContHistory},
  data: function() {
    return {
      activeName: '1'
    };
  }
};
</script>
