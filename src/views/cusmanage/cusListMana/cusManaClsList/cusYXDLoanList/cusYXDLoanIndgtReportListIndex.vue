<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusYXDLoanIndgtReportList_d1_BillList.vue';
export default {
  components: {d1Billlist},
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
     * 刘愿 优享贷客户名单申请侧面调查
     *
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      let bizId = this.getFactory().contextData.serno ? this.getFactory().contextData.serno : this.getFactory().contextData.instanceInfo.bizId
      // 查询优享贷名单下的侧面调查报告
      this.d1_BillList.queryDataByCondition('serno=\'' + bizId + '\'');

      this.getFactory().setButtonVisiable('save', false);
    },

    // 侧面调查 新增功能
    doAdd () {
      // 新增优享贷中的侧面调查
      let bizId = this.getFactory().contextData.serno ? this.getFactory().contextData.serno : this.getFactory().contextData.instanceInfo.bizId
      this.$dialog.open(
        '新增侧面调查',
        'cusmanage/cusListMana/cusManaClsList/cusYXDLoanList/cusYXDLoanIndgtReportAddIndex',
        -1,
        -1,
        this.getFactory().contextData,
        () => {
          this.d1_BillList.queryDataByCondition('serno=\'' + bizId + '\'');
        }
      );
    }
  }
};
</script>
