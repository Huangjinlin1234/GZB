<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="集团客户">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo"></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
          <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
          <yu-xtable-column label="核心客户编号" prop="coreCusId"></yu-xtable-column>
          <yu-xtable-column label="核心客户名称" prop="coreCusName"></yu-xtable-column>
          <yu-xtable-column label="客户管户经理" prop="managerId" width="100px" hide-column></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId" width="100px" hide-column></yu-xtable-column>
          <yu-xtable-column label="客户管户经理" prop="managerIdName" width="100px"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName" width="100px"></yu-xtable-column>
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
  name: 'YuXgrpCustom',
  componentName: 'YuXgrpCustom',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusgrp/selectCusGrpList',
      // 表格中传出id数据的key
      queryCode: 'grpNo',
      // 表格中显示到input框中的字段key
      textCode: 'grpNo',
      baseParams: {}
    };
  },
  created () {
    var _this = this;
    let loginUser = _this.$xutils.getLoginUserInfo();
    _this.baseParams = {
      condition: JSON.stringify({'oprType': '01', 'groupCusStatus': '01', managerId: loginUser.loginCode})
    };
  },
};
</script>
