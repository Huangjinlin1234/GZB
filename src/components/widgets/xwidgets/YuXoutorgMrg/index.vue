<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width"  title="外部评估机构准入管理列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="组织机构代码" ctype="input" placeholder="组织机构代码" name="regCode"></yu-xform-item>
            <yu-xform-item label="评估机构名称" ctype="input" placeholder="评估机构名称" name="evalOutOrgName"></yu-xform-item>
            <yu-xform-item label="准入状态" ctype="select" data-code="STD_ZB_ADMIT_STATE" placeholder="准入状态" name="orgAdmitState"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
          <yu-xtable-column label="组织机构代码" prop="regCode"></yu-xtable-column>
          <yu-xtable-column label="评估机构名称" prop="evalOutOrgName"></yu-xtable-column>
          <yu-xtable-column label="联系人名称" prop="linkName"></yu-xtable-column>
          <yu-xtable-column label="准入状态" prop="orgAdmitState" data-code="STD_ZB_ADMIT_STATE"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
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
  name: 'YuXoutorgMrg',
  componentName: 'YuXoutorgMrg',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisEval + '/api/guarevaloutorgauapp/',
      // 表格中传出id数据的key
      queryCode: 'regCode',
      // 表格中显示到input框中的字段key
      textCode: 'evalOutOrgName'
    };
  }
};
</script>
