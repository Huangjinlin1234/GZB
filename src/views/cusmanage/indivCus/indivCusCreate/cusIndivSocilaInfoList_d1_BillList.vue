<template>
  <div>
    <yu-panel title="社会关系信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="customClick('doInsert')" v-if="op!='VIEW'">新增</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')" v-if="op!='VIEW'">删除</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')" v-if="op!='VIEW'">修改</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')" >查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" >
        <yu-xtable-column label="与客户关系" prop="indivCusRel" data-code="STD_ZB_SELFPER_REL_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="姓名" prop="name"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex" data-code="STD_ZB_SEX"></yu-xtable-column>
        <yu-xtable-column label="职业" prop="occu" data-code="STD_ZB_OCC"></yu-xtable-column>
        <yu-xtable-column label="职务" prop="duty" data-code="STD_ZB_JOB_TTL"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusindivsocial/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusindivsocial/delete/',
      op: ''
    };
  }
};
</script>