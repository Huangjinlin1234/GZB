<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="渠道配置管理列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="渠道代码" ctype="input" placeholder="渠道代码" name="chnlCode"></yu-xform-item>
            <yu-xform-item label="渠道名称" ctype="input" placeholder="渠道名称" name="chnlName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="渠道代码" prop="chnlCode"></yu-xtable-column>
          <yu-xtable-column label="渠道名称" prop="chnlName"></yu-xtable-column>
          <yu-xtable-column label="渠道类型" prop="chnlType" data-code="STD_ZB_CHNL_TYPE"></yu-xtable-column>
          <yu-xtable-column label="渠道性质" prop="chnlCha" data-code="STD_ZB_CHNL_CHA"></yu-xtable-column>
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
  name: 'YuXchnlMrg',
  componentName: 'YuXchnlMrg',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgchnlmana/',
      // 表格中传出id数据的key
      queryCode: 'chnlCode',
      // 表格中显示到input框中的字段key
      textCode: 'chnlName'
    };
  }
};
</script>
