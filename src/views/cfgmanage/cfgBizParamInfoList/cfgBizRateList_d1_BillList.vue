<template>
  <div>
    <yu-panel title="利率配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务品种" ctype="select" data-code="STD_ZB_OPRD_TYP" placeholder="业务品种" name="bizType"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="币种" name="curType"></yu-xform-item>
          <yu-xform-item label="生效日期" ctype="datepicker" format="yyyy-MM-dd" placeholder="生效日期" name="inureDate"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" format="yyyy-MM-dd" placeholder="登记日期" name="regiDate"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button ref="btn_outPort" @click="customClick('outPort')">导出</yu-button>
          <yu-button ref="btn_byImport" @click="customClick('byImport')">批量导入</yu-button>
          <yu-button ref="btn_byModelDown" @click="customClick('byModelDown')">模板下载</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="业务品种" prop="bizType" data-code="STD_ZB_OPRD_TYP"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="基准利率项目类型" prop="baseRemitType" data-code="STD_ZB_BIZ_TYP"></yu-xtable-column>
        <yu-xtable-column label="基准年利率" prop="baseRateY"></yu-xtable-column>
        <yu-xtable-column label="基准月利率" prop="baseRateM"></yu-xtable-column>
        <yu-xtable-column label="利率浮动上限" prop="rateFloatMax"></yu-xtable-column>
        <yu-xtable-column label="利率浮动下限" prop="rateFloatMin"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="生效日期" prop="inureDate"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="regiDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

</div></template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgrate/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgrate/delete/'
    };
  }
};
</script>
