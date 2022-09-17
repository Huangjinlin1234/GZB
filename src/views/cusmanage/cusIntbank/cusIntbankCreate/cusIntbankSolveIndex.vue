<template>
  <d1-billlist v-if="isShow" ref="d1_BillList" :pageParams="taskParams"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIntbankSolve_d1_BillList.vue';
/**
 *同业日常管理任务（待处理）
 */

export default {
  components: {d1Billlist},
  props: {
  },
  data () {
    return {
      d1_BillList: null,
      taskParams: {},
      isShow: false,
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // this.d1_BillList.setAppendSQLCondition({'bizType': data.bizType, 'taskStatus': '1'});
      // 默认加载条件在table标签上
      this.taskParams = this.$route.meta.params;
      this.isShow = true
      // this.d1_BillList.queryDataByCondition({'bizType': this.taskParams.bizType, 'taskStatus': '1'});
    },

    // 返回
    doBack () {
      this.$xutils.getParentPage(null, 'back');
    }
  }
};
</script>
