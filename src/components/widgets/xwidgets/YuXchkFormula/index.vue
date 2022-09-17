<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="校验公式">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="itemId"></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="itemName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="项目编号" prop="itemId" width="150"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="itemName" width="150"></yu-xtable-column>
          <yu-xtable-column label="财报类型" prop="fncConfTyp" width="150" data-code="STD_ZB_FNC_CONFTYP"></yu-xtable-column>
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
  name: 'YuXchkFormula',
  componentName: 'YuXchkFormula',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/fncconfitems/',
      // 表格中传出id数据的key
      queryCode: 'itemId',
      // 表格中显示到input框中的字段key
      textCode: 'itemName'
    };
  }
};
</script>
