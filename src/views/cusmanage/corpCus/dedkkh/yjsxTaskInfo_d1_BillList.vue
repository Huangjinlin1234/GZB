<template>
  <div>
    <yu-panel title="压降任务" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_practicable" v-if="checkCtrl('practicable')" @click="customClick('practicable')">压降情况落实</yu-button>
        <yu-button type="primary" ref="btn_apply" v-if="checkCtrl('apply')" @click="customClick('apply')">任务终止申请</yu-button>
        <yu-button type="primary" ref="btn_select" v-if="checkCtrl('view')" @click="customClick('select')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="post" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="任务编号" prop="taskNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="压降事项" prop="pressureDropItem" width="120" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.pressureDropItem" placement="top-start">
              <span v-if="scope.row.pressureDropItem !== null" >{{ scope.row.pressureDropItem.length > 8 ? scope.row.pressureDropItem.substr(0,8) + "..." : scope.row.pressureDropItem.substr(0,8) }}</span>
            </el-tooltip>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="计划压降金额（万元）" prop="planPdoAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="压降计划完成时间" prop="planPdoFinishTime" width="120"></yu-xtable-column>
        <yu-xtable-column label="实际压降金额（万元）" prop="actPdoAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="压降实际完成时间" prop="actPdoFinishDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="任务生成日期" prop="taskCreateDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="任务到期日期" prop="taskEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" width="150"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'taskNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsxtask/queryList',
      baseParams: {'sort': 'task_create_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsxtask/delete/'
    };
  }
};
</script>