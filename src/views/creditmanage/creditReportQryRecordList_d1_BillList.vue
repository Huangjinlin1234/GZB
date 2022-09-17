<template>
  <div>
    <yu-panel title="征信报告查看信息记录列表" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="查询员工号" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="查看员工姓名" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="岗位编号" prop="dutyCde"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="查询ip地址" prop="ip"></yu-xtable-column>
        <yu-xtable-column label="成功查询时间" prop="qryTime"></yu-xtable-column>
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
    return {
      pkField: 'crqrSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      dicOptions: {qryResnOptions: [{key: '02', value: '贷款审批'}, {key: '08', value: '担保资格审查'}, {key: '22', value: '法人代表，出资人及关联人等资信查询'}, {key: '25', value: '资信审查'}, {key: '27', value: '贷后管理'}, {key: '17', value: '额度审批'}, {key: '01', value: '贷前审查'}, {key: '04', value: '其他原因'}, {key: '05', value: '关联查询'}, {key: '18', value: '担保审查'}, {key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}]},
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqryrecord/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqryrecord/delete/'
    };
  }
};
</script>
