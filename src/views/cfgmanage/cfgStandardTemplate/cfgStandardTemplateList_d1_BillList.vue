<template>
  <div>
    <yu-panel title="制式模板文件配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="模板文件类型" ctype="select" data-code="STD_STANDARD_TEMPLATE" placeholder="模板文件类型" name="tplCode" ></yu-xform-item>
          <yu-xform-item label="模板文件名称" ctype="input" placeholder="模板文件名称" name="tplFileName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_importFile" @click="customClick('importFile')">模板文件上传</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="模板文件类型" prop="tplCode" data-code="STD_STANDARD_TEMPLATE"></yu-xtable-column>
        <yu-xtable-column label="模板文件路径" prop="tplFilePath"></yu-xtable-column>
        <yu-xtable-column label="模板文件名称" prop="tplFileName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './cfgStandardTemplateList_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'tplCode',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgstandardtemplate/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgstandardtemplate/delete/"
    }
  }
}
</script>