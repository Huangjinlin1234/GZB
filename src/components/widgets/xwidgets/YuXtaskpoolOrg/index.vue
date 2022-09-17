<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="项目池分配规则关联的有权人机构">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="机构编码" ctype="input" placeholder="机构编码" name="orgCode"></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"></yu-xform-item>
            <yu-xform-item label="状态" ctype="select" data-code="NORM_STS2" placeholder="状态" name="orgSts"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="机构记录编号" prop="orgId" width="100"></yu-xtable-column>
          <yu-xtable-column label="机构编码" prop="orgCode" width="100"></yu-xtable-column>
          <yu-xtable-column label="机构名称" prop="orgName" width="100"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="orgSts" width="100" data-code="NORM_STS2"></yu-xtable-column>
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
  name: 'YuXtaskpoolOrg',
  componentName: 'YuXtaskpoolOrg',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'orgCode',
      // 表格中显示到input框中的字段key
      textCode: 'orgName'
    };
  }
};
</script>
