<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="上传文件列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="文件名称" ctype="input" placeholder="文件名称" name="fileName"></yu-xform-item>
            <yu-xform-item label="文件存储路径 " ctype="input" placeholder="文件存储路径 " name="filePath"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="文件名称" prop="fileName"></yu-xtable-column>
          <yu-xtable-column label="文件存储路径 " prop="filePath"></yu-xtable-column>
          <yu-xtable-column label="文件扩展名" prop="extName"></yu-xtable-column>
          <yu-xtable-column label="上传时间" prop="uploadTime"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXuplodList',
  componentName: 'YuXuplodList',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminfileuploadinfo/',
      // 表格中传出id数据的key
      queryCode: 'fileName',
      // 表格中显示到input框中的字段key
      textCode: 'fileName'
    };
  },
  created: function () {
    // 设置初始条件
    this.baseParams = this.queryCondition;
  }
};
</script>
