<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="业务合同">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo"></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName"></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
            <yu-xform-item label="项目状态" ctype="select" data-code="STD_COOP_PRO_STATUS" placeholder="项目状态" name="proStatus"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId"></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="POST">
          <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName" width="100"></yu-xtable-column>
          <yu-xtable-column label="项目额度（元）" prop="proLmt"></yu-xtable-column>
          <yu-xtable-column label="项目开工时间" prop="proStartDate"></yu-xtable-column>
          <yu-xtable-column label="项目竣工时间" prop="proEndDate"></yu-xtable-column>
          <yu-xtable-column label="交付日期" prop="deliverDate"></yu-xtable-column>
          <yu-xtable-column label="项目状态" prop="proStatus" data-code="STD_COOP_PRO_STATUS"></yu-xtable-column>
          <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
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
  name: 'YuXprjAcct',
  componentName: 'YuXprjAcct',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'proNo',
      // 表格中显示到input框中的字段key
      textCode: 'proName'
    };
  }
};
</script>
