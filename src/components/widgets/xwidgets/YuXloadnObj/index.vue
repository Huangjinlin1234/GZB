<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="测试产品">
      <yu-panel >
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="产品号" ctype="input" placeholder="产品号" name="prdId"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="产品号" prop="prdId"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100.00px"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="合同余额" prop="contBalance"></yu-xtable-column>
          <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
          <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
          <yu-xtable-column label="签订日期" prop="signDate"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-panel></yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXloadnObj',
  componentName: 'YuXloadnObj',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/ctrloancont/',
      // 表格中传出id数据的key
      queryCode: 'prdId',
      // 表格中显示到input框中的字段key
      textCode: 'prdName'
    };
  }
};
</script>
