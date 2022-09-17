<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width"  title="灵活查询指标配置分组列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="名称" ctype="input" placeholder="名称" name="objGroupName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="指标配置编码" prop="indexCode"></yu-xtable-column>
          <yu-xtable-column label="创建类型" prop="createType" data-code="STD_ZB_CREATE_TYPE"></yu-xtable-column>
          <yu-xtable-column label="名称" prop="objGroupName"></yu-xtable-column>
          <yu-xtable-column label="数据源" prop="datasource"></yu-xtable-column>
          <yu-xtable-column label="来源表" prop="tablename"></yu-xtable-column>
          <yu-xtable-column label="表别名" prop="alias"></yu-xtable-column>
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
  name: 'YuXflexQueryGrp',
  componentName: 'YuXflexQueryGrp',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgflexqryindex/',
      // 表格中传出id数据的key
      queryCode: 'indexCode',
      // 表格中显示到input框中的字段key
      textCode: 'objGroupName'
    };
  }
};
</script>
