<template>
  <div>
    <yu-panel title="名单准入与停用申请">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="importResn"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huser"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrg"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="lastUpdateId"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="lastUpdateBrId"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="lastUpdateDate"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
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
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './cusWebFinWhiteListAppList_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/cuslstwjkhapp/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/cuslstwjkhapp/delete/"
    }
  }
}
</script>