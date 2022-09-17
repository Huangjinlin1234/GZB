<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="借据列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="startDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_ZB_FIVE_SORT"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ZB_ACC_TYP"></yu-xtable-column>
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
  name: 'YuXdebtList',
  componentName: 'YuXdebtList',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/accloan/',
      // 表格中传出id数据的key
      queryCode: 'billNo',
      // 表格中显示到input框中的字段key
      textCode: 'billNo'
    };
  }
};
</script>
