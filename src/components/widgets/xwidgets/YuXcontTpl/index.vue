<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合同模板管理">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同模板编号" ctype="input" placeholder="合同模板编号" name="contTplCode"></yu-xform-item>
            <yu-xform-item label="合同模板名称" ctype="input" placeholder="合同模板名称" name="contTplName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="合同模板编号" prop="contTplCode"></yu-xtable-column>
          <yu-xtable-column label="合同模板名称" prop="contTplName"></yu-xtable-column>
          <yu-xtable-column label="合同模板类型" prop="contTplType" data-code="STD_ZB_CONT_TPL_TYPE"></yu-xtable-column>
          <yu-xtable-column label="模版路径" prop="contTplPath"></yu-xtable-column>
          <yu-xtable-column label="文件大小" prop="fileSize"></yu-xtable-column>
          <yu-xtable-column label="文件日期" prop="fileDate"></yu-xtable-column>
          <yu-xtable-column label="模板版本号" prop="ver"></yu-xtable-column>
          <yu-xtable-column label="模板状态" prop="status" data-code="DATA_STS"></yu-xtable-column>
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
  name: 'YuXcontTpl',
  componentName: 'YuXcontTpl',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgconttpllabel/',
      // 表格中传出id数据的key
      queryCode: 'contTplCode',
      // 表格中显示到input框中的字段key
      textCode: 'contTplName'
    };
  }
};
</script>
