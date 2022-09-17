<template>
  <div>
    <yu-panel title="小微放款还款计划试算" :hideFilter="false" :collapseHide="false">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" v-model="tabledata"  condition-key="condition"  parse-response="tableMessage" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="期数" prop="benqqish"></yu-xtable-column>
        <yu-xtable-column label="还款日" prop="huankriq"></yu-xtable-column>
        <yu-xtable-column label="应还本金" prop="jixibenj"></yu-xtable-column>
        <yu-xtable-column label="应还利息" prop="leijcslx"></yu-xtable-column>
         <yu-pagination small layout="prev, pager, next" :total="50"></yu-pagination>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    this.$message({message: '暂不支持还款计划试算', type: 'info'});
    return;
    // return {
    //   pkField: 'benqqish',
    //   dialogTitle: '新增',
    //   dialogVisible: false,
    //   formType: 'ADD',
    //   dataUrl: this.$backend.cmisBiz + '/api/pvploanapp/selectcalculate',
    //   baseParams: {},
    //   tabledata: []
    // };
  },
  mounted () {
    if (this.bizPageData != null) {
      // 这个时候判断是从审批流进来的  直接查数据就行了
      // 单页面 跳审批的时候 是这个
      // 审批走单一页面
      this.baseParams = {surveySerno: this.bizPageData.instanceInfo.bizId};
    } else if (this.$route.params.hasOwnProperty('pvpSerno')) {
      // 走路由
      this.baseParams = {surveySerno: this.$route.meta.params.pvpSerno};
    } else {
      // 走审批模版工厂
      this.baseParams = {surveySerno: this.getFactory().bizPageData.instanceInfo.bizId};
    }
    // try {
    //   // 走路由
    //   this.baseParams = {surveySerno: this.$route.meta.params.pvpSerno};
    // } catch (e) {
    //   try {
    //     // 审批走单一页面
    //     this.baseParams = {surveySerno: this.bizPageData.instanceInfo.bizId};
    //   } catch (e2) {
    //     // 走审批模版工厂 .params.
    //     this.baseParams = {surveySerno: this.getFactory().bizPageData.instanceInfo.bizId};
    //   }
    // }
  },
  methods: {
    tableMessage (code, message, response) {
      if (code != 0) {
        this.$message({message: message});
        yufp.clone([], this.tabledata);
        return false;
      }
      return true;
    }
  }
};
</script>
