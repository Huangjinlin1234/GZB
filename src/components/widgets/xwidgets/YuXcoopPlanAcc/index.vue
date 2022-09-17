<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方案台账列表">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="90px" :related-table-name="cusTableRefName">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType"></yu-xform-item>
     </yu-xform-group>
        </yu-xform>
        <yu-xtable :ref="cusTableRefName" :row-number="true" selection-type="radio" request-type="post" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" >
          <yu-xtable-column label="合作方案编号" prop="coopPlanNo" width="130"></yu-xtable-column>
          <yu-xtable-column label="合作方编号" prop="partnerNo" width="130"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName" width="160"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE" width="130"></yu-xtable-column>
          <yu-xtable-column label="总合作额度（元）" prop="totlCoopLmtAmt" width="160" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="合作起始日" prop="coopStartDate" width="130"></yu-xtable-column>
          <yu-xtable-column label="合作到期日" prop="coopEndDate" width="130"></yu-xtable-column>
          <yu-xtable-column label="保证金比例%" prop="bailPerc" width="130" :formatter="toPercent"></yu-xtable-column>
          <yu-xtable-column label="经办日期" prop="inputDate" width="130"></yu-xtable-column>
          <yu-xtable-column label="经办人" prop="inputIdName" width="130"></yu-xtable-column>
          <yu-xtable-column label="经办机构" prop="inputBrIdName" width="130"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" request-type="post" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
import mixin from '@/utils/mixin';
import mixinList from '@/utils/mixins/mixin-list';
import { request } from 'xy-utils';
export default {
  name: 'YuXcoopPlanAcc',
  componentName: 'YuXcoopPlanAcc',
  mixins: [popList, mixin],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/coopplanaccinfo/query',
      // 表格中传出id数据的key
      queryCode: 'partnerNo',
      // 表格中显示到input框中的字段key
      textCode: 'coopPlanNo',
      codeToText: false,
      cusTableRefName: 'yuXcoopPlanAccPopTb',
      baseParams: {condition: {'coopPlanStatus':'1', 'managerId': this.$xutils.getDefaultformulaData('$LoginLoginCode')}}
    };
  },
  methods: {
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    },
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {        
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }      
      return cellValue;
    }
  }
};
</script>
