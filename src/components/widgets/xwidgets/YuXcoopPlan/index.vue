<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方案申请">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus"></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId"></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
          <yu-xtable-column label="总合作额度（元）" prop="totlCoopLmtAmt"></yu-xtable-column>
          <yu-xtable-column label="合作起始日" prop="coopStartDate"></yu-xtable-column>
          <yu-xtable-column label="合作到期日" prop="coopEndDate"></yu-xtable-column>
          <yu-xtable-column label="保证金比例" prop="bailPerc"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType" data-code="STD_COOP_PLAN_OPR_TYPE"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="经办人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="经办机构" prop="inputBrId"></yu-xtable-column>
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
  name: 'YuXcoopPlan',
  componentName: 'YuXcoopPlan',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/coopplanapp/',
      // 表格中传出id数据的key
      queryCode: 'partnerNo',
      // 表格中显示到input框中的字段key
      textCode: 'partnerName'
    };
  }
};
</script>
