<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="机构查询">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"></yu-xform-item>
            <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable request-type="GET" condition-key="condition" ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="机构名称" prop="orgName" width="300px"></yu-xtable-column>
          <yu-xtable-column label="机构编号" prop="orgCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="status" data-code="DATA_STS"></yu-xtable-column>
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
  name: 'YuXorgQuery',
  componentName: 'YuXorgQuery',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgdiscorglmt/',
      // 表格中传出id数据的key
      queryCode: 'orgCode',
      // 表格中显示到input框中的字段key
      textCode: 'orgName'
    };
  }
};
</script>
