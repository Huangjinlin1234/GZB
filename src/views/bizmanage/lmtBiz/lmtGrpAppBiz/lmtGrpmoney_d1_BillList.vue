<template>
  <div>
    <yu-panel title="财务报表信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="报表类型" ctype="select" placeholder="报表类型" name="fncType"></yu-xform-item>
          <yu-xform-item label="报表年份" ctype="select" placeholder="报表年份" name="styleId1"></yu-xform-item>
          <yu-xform-item label="报表期间" ctype="select" placeholder="报表期间" name="styleId2"></yu-xform-item>
          <yu-xform-item label="报表口径" ctype="select" data-code="STD_ZB_FNC_STYLE" placeholder="报表口径" name="statStyle"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onInsert" @click="customClick('onInsert')" v-if="show">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')" v-if="show">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')" v-if="show">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')" v-if="show">查看</yu-button>
          <yu-button ref="btn_importDoc" @click="customClick('importDoc')" v-if="show">导入</yu-button>
          <yu-button ref="btn_outport" @click="customClick('outport')" v-if="show">导出</yu-button>
          <yu-button ref="btn_downLoad" @click="customClick('downLoad')" v-if="show">下载模板</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="报表类型" prop="fncType"></yu-xtable-column>
        <yu-xtable-column label="报表周期类型" prop="statPrdStyle" data-code="STD_ZB_FNC_STAT"></yu-xtable-column>
        <yu-xtable-column label="报表年份" prop="styleId1"></yu-xtable-column>
        <yu-xtable-column label="报表期间" prop="styleId2"></yu-xtable-column>
        <yu-xtable-column label="报表口径" prop="statStyle" data-code="STD_ZB_FNC_STYLE"></yu-xtable-column>
        <yu-xtable-column label="是否经过审计" prop="statIsAudit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否经过调整" prop="statIsAdjt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="状态（中文）" prop="stateFlgChinese"></yu-xtable-column>
        <yu-xtable-column label="报表录入类型" prop="reportType" data-code="STD_ZB_REPORT_TYPE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      show: true,
      pkField: 'cusId,statPrdStyle,statPrd,fncType,statStyle',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/fncstatbase/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/fncstatbase/delete/'
    };
  }
};
</script>
