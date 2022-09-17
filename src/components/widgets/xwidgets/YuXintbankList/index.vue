<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <yu-panel title="同业客户">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="同业机构(行)名称" ctype="input" placeholder="同业机构(行)名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="同业机构类型" ctype="select" data-code="STD_ZB_INTB_TYPE" placeholder="同业机构类型" name="intbankType"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId" width="150"></yu-xtable-column>
          <yu-xtable-column label="同业机构(行)名称" prop="cusName" width="150"></yu-xtable-column>
          <yu-xtable-column label="同业机构类型" prop="intbankType" width="150" data-code="STD_ZB_INTB_TYPE"></yu-xtable-column>
          <yu-xtable-column label="同业机构子类型" prop="intbankSubType" width="150" data-code="STD_ZB_INTB_SUB_TYPE"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理" prop="manageName" width="150"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="mainBrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
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
  name: 'YuXintbankList',
  componentName: 'YuXintbankList',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusintbank/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
