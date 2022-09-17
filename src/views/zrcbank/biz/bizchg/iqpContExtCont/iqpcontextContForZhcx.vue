
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @description 展期协议
  -->
  <div>
        <iqpcontextContAppList></iqpcontextContAppList>
  </div>
</template>
<script>
import iqpcontextContAppList from './iqpcontextContAppListForZhcx';

export default {
  components: {iqpcontextContAppList},
  data: function() {
    return {
      activeName: '1'
    };
  }
};
</script>
