<template>
  <div>
    <yu-panel title="上传文件列表POP框">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="文件名称" ctype="input" placeholder="文件名称" name="fileName"></yu-xform-item>
          <yu-xform-item label="文件存储路径 " ctype="input" placeholder="文件存储路径 " name="filePath"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="文件名称" prop="fileName"></yu-xtable-column>
        <yu-xtable-column label="文件存储路径 " prop="filePath"></yu-xtable-column>
        <yu-xtable-column label="文件扩展名" prop="extName"></yu-xtable-column>
        <yu-xtable-column label="上传时间" prop="uploadTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'fileId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api/adminfileuploadinfo/",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api/adminfileuploadinfo/delete/"
    }
  }
}
</script>