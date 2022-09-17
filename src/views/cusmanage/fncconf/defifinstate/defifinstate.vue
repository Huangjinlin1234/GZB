<template>
<div class="defifinstate">
<yu-panel panel-type="normal" title="报表配置定义">
<template slot="filter">
  <yu-xform related-table-name="refTable" form-type="search"  :remove-empty="true">
    <yu-xform-group :column="3" colspan="8">
      <yu-xform-item ctype="input" name="styleId" placeholder="报表样式编号" :required="false" ></yu-xform-item>
      <yu-xform-item ctype="input" name="fncConfDisName" placeholder="显示名称" :required="false" ></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
</template>
  <yu-xtable ref="refTable" condition-key="condition" :data-url="dataUrl" selection-type="radio" stripe>
    <yu-xtable-column label="报表样式编号" header-align="left">
      <template slot-scope="scope">
        <span class="styleId" @click="navigate(scope.row)">{{ scope.row.styleId }}</span>
      </template>
    </yu-xtable-column>
    <yu-xtable-column label="报表名称" prop="fncName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="显示名称" prop="fncConfDisName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="所属种类报表" prop="fncConfTyp" header-align="left" data-code="STD_ZB_FNC_CONFTYP">
    </yu-xtable-column>
    <yu-xtable-column label="数据列数" prop="fncConfDataCol" header-align="left" data-code="STD_ZB_FNC_COL">
    </yu-xtable-column>
    <yu-xtable-column label="栏位" prop="fncConfCotes" header-align="left" data-code="STD_ZB_FNC_COTES">
    </yu-xtable-column>
  </yu-xtable>
</yu-panel>
</div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
yufp.lookup.reg('STD_ZB_FNC_CONFTYP,STD_ZB_FNC_COL,STD_ZB_FNC_COTES');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/nrcs-cms/fncconfstyles/q/fncconfstyles/list',
      formdata: {}
    };
  },
  methods: {
    /**
         * 跳转
         * @param row table行数据
         */
    navigate: function (row) {
      this.$router.addTab({
        name: 'cusmanage/fncconf/defifinstate/defifinstatedit/defifinstatedit.vue',
        key: 'custom_defifinstatedit' + row.styleId,
        title: '报表定义配置(' + row.styleId + ')',
        data: { row: row }
      });
    }
  }
};
</script>
<style>
  .defifinstate {
    padding: 0 5px;
  }
  .defifinstate .yu-toolBar .el-button {
    border-radius: 4px;
  }
  .defifinstate .styleId {
    color: #638fee;
    text-decoration: underline;
  }
  .defifinstate .styleId:hover {
    color: #ff6700;
    cursor: pointer;
  }
</style>