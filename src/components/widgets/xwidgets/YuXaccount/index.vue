<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="账号信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="账号" ctype="input" placeholder="账号" name="acctNo"></yu-xform-item>
            <yu-xform-item label="账号名称" ctype="input" placeholder="账号名称" name="acctName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="账户属性" prop="acctAttr" data-code="STD_ZB_BR_ID_ATTR"></yu-xtable-column>
          <yu-xtable-column label="账号归属" prop="acctBelong" data-code="STD_ZB_ACCT_BELONG"></yu-xtable-column>
          <yu-xtable-column label="账号分类" prop="acctClass" data-code="STD_ZB_ACCT_CLASS"></yu-xtable-column>
          <yu-xtable-column label="账号" prop="acctNo"></yu-xtable-column>
          <yu-xtable-column label="账号名称" prop="acctName"></yu-xtable-column>
          <yu-xtable-column label="开户行行名" prop="opanOrgName"></yu-xtable-column>
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
  name: 'YuXaccount',
  componentName: 'YuXaccount',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'acctNo',
      // 表格中显示到input框中的字段key
      textCode: 'acctName'
    };
  }
};
</script>
