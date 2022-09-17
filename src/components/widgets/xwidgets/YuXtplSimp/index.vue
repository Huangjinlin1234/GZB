<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="模板简易列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="模板编码" ctype="input" placeholder="模板编码" name="templetcode"></yu-xform-item>
            <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="templetname"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="模板编码" prop="templetcode"></yu-xtable-column>
          <yu-xtable-column label="模板名称" prop="templetname"></yu-xtable-column>
          <yu-xtable-column label="数据源名称" prop="datasource"></yu-xtable-column>
          <yu-xtable-column label="从哪张表取数" prop="fromtable"></yu-xtable-column>
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
  name: 'YuXtplSimp',
  componentName: 'YuXtplSimp',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'templetcode',
      // 表格中显示到input框中的字段key
      textCode: 'templetname'
    };
  }
};
</script>
