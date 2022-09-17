<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="项目池分配规则关联岗位">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="岗位代码" ctype="input" placeholder="岗位代码" name="dutyCde"></yu-xform-item>
            <yu-xform-item label="岗位名称" ctype="input" placeholder="岗位名称" name="dutyName"></yu-xform-item>
            <yu-xform-item label="所属机构编号" ctype="input" placeholder="所属机构编号" name="belongOrgId"></yu-xform-item>
            <yu-xform-item label="岗位状态" ctype="select" data-code="NORM_STS2" placeholder="岗位状态" name="dutySts"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="岗位记录编号" prop="dutyId" width="100"></yu-xtable-column>
          <yu-xtable-column label="岗位代码" prop="dutyCde" width="100"></yu-xtable-column>
          <yu-xtable-column label="岗位名称" prop="dutyName" width="100"></yu-xtable-column>
          <yu-xtable-column label="所属机构编号" prop="belongOrgId" width="100"></yu-xtable-column>
          <yu-xtable-column label="岗位状态" prop="dutySts" width="100" data-code="NORM_STS2"></yu-xtable-column>
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
  name: 'YuXtaskpoolRule',
  componentName: 'YuXtaskpoolRule',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'dutyCde',
      // 表格中显示到input框中的字段key
      textCode: 'dutyName'
    };
  }
};
</script>
