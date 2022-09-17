<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="押品基本信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
          <yu-xform-group :column="2">
            <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarno"></yu-xform-item>
            <yu-xform-item label="押品所有人名称" ctype="input" placeholder="押品所有人名称" name="guarCusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="押品统一编号" prop="guarno" width="120px"></yu-xtable-column>
          <yu-xtable-column label="担保分类代码" prop="guarTypeCd" width="100"></yu-xtable-column>
          <yu-xtable-column label="担保分类名称" prop="guarTypeCdCnname" width="120px"></yu-xtable-column>
          <yu-xtable-column label="我行确认价值" prop="evalAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="确认价值币种" prop="evalCurrency" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="押品所有人编号" prop="guarCusId" width="100"></yu-xtable-column>
          <yu-xtable-column label="押品所有人名称" prop="guarCusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="管护人" prop="accountManager" width="100"></yu-xtable-column>
          <yu-xtable-column label="创建机构" prop="createOrgid" width="100" data-code="STD_ZB_DATA_SOURCE"></yu-xtable-column>
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
  name: 'YuXcltrlBase2',
  componentName: 'YuXcltrlBase2',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'guarno',
      // 表格中显示到input框中的字段key
      textCode: 'guarno'
    };
  }
};
</script>
