<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="规则集POP">
        <yu-xform
          form-type="search"
          v-model="searchFormdata"
          label-width="60px"
          related-table-name="refTable"
        >
          <yu-xform-group :column="3">
            <yu-xform-item
              label="规则集名称"
              ctype="input"
              placeholder="规则集名称"
              name="cnname"
            ></yu-xform-item>
            <yu-xform-item
              label="规则集描述"
              ctype="input"
              placeholder="规则集描述"
              name="descinfo"
            ></yu-xform-item>
            <yu-xform-item
              label="规则库"
              ctype="input"
              placeholder="规则库"
              name="sysid"
            ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable
          ref="refTable"
          :row-number="true"
          selection-type="radio"
          :pageable="true"
          :data-url="dataUrl"
          :default-load="true"
          condition-key="condition"
          :base-params="baseParams"
        >
          <yu-xtable-column label="规则集ID" prop="name"></yu-xtable-column>
          <yu-xtable-column label="规则集名称" prop="cnname"></yu-xtable-column>
          <yu-xtable-column
            label="规则集描述"
            prop="descinfo"
          ></yu-xtable-column>
          <yu-xtable-column label="规则库" prop="sysid"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align: center">
          <el-button type="primary" @click="confirmFn" size="small"
            >确认</el-button
          >
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input
      ref="refInput"
      v-model="selectedVal"
      :readonly="readonly"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      name="userName"
      slot="reference"
      :on-icon-click="onIconClickFn"
      icon="search"
      @click.stop
    ></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXrules',
  componentName: 'YuXrules',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/sfrulesetinfo/',
      // 表格中传出id数据的key
      queryCode: 'cnname',
      // 表格中显示到input框中的字段key
      textCode: 'cnname'
    };
  }
};
</script>
