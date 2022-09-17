<template>
  <div>
    <yu-panel title="项目信息列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="项目类型" name="proType" ctype="select" data-code="STD_COOP_PRO_TYPE" :exclude-key="excludekey" :datacode-filter="codefilterFn" placeholder="项目类型"></yu-xform-item>
          <yu-xform-item label="项目名称" name="proName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="项目状态" name="proStatus" ctype="select" data-code="STD_COOP_PRO_STATUS" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_Add" v-if="operate != 'details'" @click="customClick('Add')">新增</yu-button>
          <yu-button type="primary" ref="btn_Update" v-if="operate != 'details'" @click="customClick('Update')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-if="operate != 'details'" @click="customClick('Delete')">删除</yu-button>
          <yu-button type="primary" ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="合作方编号" prop="partnerNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" width="100" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
        <yu-xtable-column label="项目类型" prop="proType" data-code="STD_COOP_PRO_TYPE"></yu-xtable-column>
        <yu-xtable-column label="项目金额" prop="proLmt"></yu-xtable-column>
        <yu-xtable-column label="项目状态" prop="proStatus" data-code="STD_COOP_PRO_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_COOP_PRO_TYPE,STD_COOP_PRO_STATUS');
export default {
  name: 'D1BillList',
  props: {
    operate: String,
    serno: String
  },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanproinfo/query',
      baseParams: {
        condition: {}
      },
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanproinfo/delete/',
      excludekey: ''
    };
  },
  mounted () {
    this.baseParams.condition.serno = this.serno;
  },
  methods: {
    // 字典过滤
    codefilterFn (opts, datacode, name) {
      if (this.$route.meta.params && this.$route.meta.params.partnerType == '1') {
        this.excludekey = '2,3,4,5';
        return opts.filter(function (op) {
          if (op.key == '1') {
            return true;
          }
          return false;
        });
      }
      return opts;
    }
  },
  created () {
    this.param = this.$route.meta.params; 
    if (this.param.isFromAccMenu || this.param.isFromAgrMenu || this.param.isFromOperateViewMenu || this.param.isFromAgrBizPageMenu || this.param.isFromAppChangeMenu) {
      this.dataUrl = this.$backend.cmisBiz + '/api/coopplanproinfo/queryforacc';
    }
  } 
};
</script>
