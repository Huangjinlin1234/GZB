<template>
  <div>
    <yu-panel title="客户移交查询列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="接收人" ctype="yu-xuser" placeholder="接收人" name="receiverIdName"  @select-fn="commonSelectFn" :mapping="{'orgName':'receiverBrIdName','loginCode':'receiverId','userName':'receiverIdName','orgId':'receiverBrId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="移出人" ctype="yu-xuser" placeholder="移出人" name="handoverIdName"  @select-fn="commonSelectFn" :mapping="{'orgName':'handoverBrIdName','loginCode':'handoverId','userName':'handoverIdName','orgId':'handoverBrId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
          <yu-xform-item label="发起类型" ctype="select" data-code="STD_ZB_LAUNCH_TYPE" placeholder="发起类型" name="launchType" ></yu-xform-item>
          <yu-xform-item label="移交方式" ctype="select" data-code="STD_ZB_HAND_TYP" placeholder="移交方式" name="handoverMode" ></yu-xform-item>
          <yu-xform-item label="移交理由" ctype="select" data-code="STD_CUS_HANDOVER_RESN" placeholder="移交理由" name="handoverResn" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onInsert" v-if="checkCtrl('add')" @click="customClick('onInsert')">新增</yu-button>
        <yu-button type="primary" ref="btn_onUpdate" v-if="checkCtrl('edit')" @click="customClick('onUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_onDelete" v-if="checkCtrl('delete')" @click="customClick('onDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_onFind" v-if="checkCtrl('view')" @click="customClick('onFind')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'oprType':'01'}}" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="发起类型" prop="launchType" data-code="STD_ZB_LAUNCH_TYPE"></yu-xtable-column>
        <yu-xtable-column label="移交方式" prop="handoverMode" data-code="STD_ZB_HAND_TYP"></yu-xtable-column>
        <yu-xtable-column label="移出人" prop="handoverIdName" width="100px"></yu-xtable-column>
        <yu-xtable-column label="移出机构" prop="handoverBrIdName" width="100px"></yu-xtable-column>
        <yu-xtable-column label="接收人" prop="receiverIdName"></yu-xtable-column>
        <yu-xtable-column label="接收机构" prop="receiverBrIdName"></yu-xtable-column>
        <yu-xtable-column label="移交理由" prop="handoverResn" width="100px" data-code="STD_CUS_HANDOVER_RESN"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate" width="100px"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="100px" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_HAND_TYP,STD_CUS_HANDOVER_RESN,STD_ZB_APPR_STATUS,STD_ZB_LAUNCH_TYPE');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/delete/'
    };
  }
};
</script>
