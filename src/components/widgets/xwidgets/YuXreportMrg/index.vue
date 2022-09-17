<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="格式化报告管理">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="模板编号" ctype="input" placeholder="模板编号" name="modeCode"></yu-xform-item>
            <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="modeName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="模板编号" prop="modeCode"></yu-xtable-column>
          <yu-xtable-column label="模板名称" prop="modeName"></yu-xtable-column>
          <yu-xtable-column label="文件路径" prop="filePath"></yu-xtable-column>
          <yu-xtable-column label="文件大小" prop="fileSize"></yu-xtable-column>
          <yu-xtable-column label="文件日期" prop="fileDate"></yu-xtable-column>
          <yu-xtable-column label="模板版本号" prop="ver"></yu-xtable-column>
          <yu-xtable-column label="模板状态" prop="status" data-code="DATA_STS"></yu-xtable-column>
          <yu-xtable-column label="报告类型" prop="fileRepType" data-code="STD_ZB_FILE_REP_TYPE"></yu-xtable-column>
          <yu-xtable-column label="文件编号" prop="fileCode"></yu-xtable-column>
          <yu-xtable-column label="文件名称" prop="fileCodeName"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="最后修改人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="最后修改机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
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
  name: 'YuXreportMrg',
  componentName: 'YuXreportMrg',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgfilereport/',
      // 表格中传出id数据的key
      queryCode: 'modeCode',
      // 表格中显示到input框中的字段key
      textCode: 'modeName'
    };
  }
};
</script>
