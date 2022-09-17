<template>
 <!--
    @created by
    @updated by zhoumw
    @description 个人客户任务历史
  -->
  <div>
    <yu-panel title="个人客户任务历史" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doview" @click="customClick('doView')" hidden>查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" :datacode-filter="datacodeFilterFn" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" ></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus" hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" ></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUS_BIZ_TYPE,STD_ZB_CERT_TYP,STD_TASK_STATUS,STD_ZB_APPR_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },
  created () {
    let data = this.$route.meta.params;
    let inType = data.inType;
    if(inType == 'CREATE'){
      this.baseParams = { condition: { taskStatusList: '3,4', bizType:'B01,B02', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    }else if(inType == 'DEFEND'){
      this.baseParams = { condition: { taskStatusList: '3,4', bizType:'B03,B04,B05,B06,B07,B08', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    }else{
      this.baseParams = { condition: { taskStatusList: '3,4', bizType:'B09', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    }
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      let _this = this;
      let data = _this.$route.meta.params;
      let inType = data.inType;
      if (inType == 'CREATE') {
        return opts.filter(function (op) {
          if (op.key === 'B01' || op.key === 'B02') {
            return true;
          }
          return false;
        });
      } else if(inType == 'DEFEND'){
        return opts.filter(function (op) {
        if (op.key == 'B03' || op.key == 'B04' || op.key == 'B05' || op.key == 'B06' || op.key == 'B07' || op.key == 'B08') {
          return true;
        }
        return false;
      });
      } else {
        return opts.filter(function (op) {
          if (op.key === 'B09') {
            return true;
          }
          return false;
        });
      }
    },
  }
};
</script>


