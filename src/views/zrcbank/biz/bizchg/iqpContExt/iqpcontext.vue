
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @description 展期申请
  -->
  <div>
     <yu-tabs v-model="activeName">
      <yu-tab-pane label="展期申请" name="1">
        <iqpcontextAppList></iqpcontextAppList>
      </yu-tab-pane>
      <yu-tab-pane label="展期历史" name="2">
        <iqpcontextHistory></iqpcontextHistory>
      </yu-tab-pane>
    </yu-tabs>

  </div>
</template>
<script>
import iqpcontextAppList from './iqpcontextAppList';
import iqpcontextHistory from './iqpcontextHistory';

export default {
  components: {iqpcontextAppList, iqpcontextHistory},
  data: function () {
    return {
      activeName: '1'
    };
  }
};
</script>
