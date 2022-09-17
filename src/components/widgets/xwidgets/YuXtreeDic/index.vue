<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="树型字典">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="通用代码" ctype="input" placeholder="通用代码" name="enName"></yu-xform-item>
            <yu-xform-item label="通用代码描述" ctype="input" placeholder="通用代码描述" name="cnName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams" :default-sort="{ prop: 'orderid' }">
          <yu-xtable-column label="通用代码" prop="enName"></yu-xtable-column>
          <yu-xtable-column label="通用代码描述" prop="cnName"></yu-xtable-column>
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="上级通用代码" prop="abvenName"></yu-xtable-column>
          <yu-xtable-column label="通用代码层级路径" prop="locate"></yu-xtable-column>
          <yu-xtable-column label="代码类别" prop="optType"></yu-xtable-column>
          <yu-xtable-column label="代码类别描述" prop="memo"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="comSts"></yu-xtable-column>
          <yu-xtable-column label="层级标识hh" prop="levels"></yu-xtable-column>
          <yu-xtable-column label="排序字段" prop="orderid"></yu-xtable-column>
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
  name: 'YuXtreeDic',
  componentName: 'YuXtreeDic',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmtreedic/',
      // 表格中传出id数据的key
      queryCode: 'enName',
      // 表格中显示到input框中的字段key
      textCode: 'cnName'
    };
  }
};
</script>
