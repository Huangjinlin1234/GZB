<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstGlfGljyyjedList_d1_BillList.vue';
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 关联交易预计额度列表
     *  @author 刘权
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 批量导出
    byExport () {
      this.$xutils.reflectCall('d1_BillList', 'downloadBillListDataAsExcel', '', this);
    }
  }
};
</script>
