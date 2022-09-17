<template>
  <div>
    <yu-panel title="格式化报告管理列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="模板编号" ctype="input" placeholder="模板编号" name="modeCode"></yu-xform-item>
          <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="modeName"></yu-xform-item>
          <yu-xform-item label="模板状态" ctype="select" data-code="STD_ZB_DATA_STS" placeholder="模板状态" name="status" ></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </yu-xform>
      
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="模板编号" prop="modeCode"></yu-xtable-column>
        <yu-xtable-column label="模板名称" prop="modeName"></yu-xtable-column>
        <yu-xtable-column label="模板版本" prop="ver"></yu-xtable-column>
        <yu-xtable-column label="模板大小" prop="fileSize"></yu-xtable-column>
        <yu-xtable-column label="模板版本" prop="ver"></yu-xtable-column>
        <yu-xtable-column label="上传时间" prop="fileDate"></yu-xtable-column>
        <yu-xtable-column label="模板状态" prop="status" data-code="STD_ZB_DATA_STS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './formatReport_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgfilereport/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgfilereport/delete/"
    }
  },
  mounted() {
    this.$lookup.reg("STD_ZB_DATA_STS", "STD_ZB_FILE_REP_TYPE", "STD_ZB_OPR_TYPE")
  },
}
</script>