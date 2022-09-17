<template>
  <div>
    <yu-panel title="名单准入与停用申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button ref="btn_doAdd" type="primary" v-if="checkCtrl('add')" @click="customClick('doAdd')">新增</yu-button>
        <yu-button ref="btn_doUpdate" type="primary" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button ref="btn_$delete" type="primary" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button ref="btn_$query" type="primary" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="importResn"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusWebFinWhiteList_dialog_BillCard';
export default{
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/delete/'
    };
  }
};
</script>