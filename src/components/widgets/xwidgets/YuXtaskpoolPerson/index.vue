<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="项目池关联的有权人">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="登录编号" ctype="input" placeholder="登录编号" name="loginCode"></yu-xform-item>
            <yu-xform-item label="用户名称" ctype="input" placeholder="用户名称" name="userName"></yu-xform-item>
            <yu-xform-item label="用户状态" ctype="select" data-code="NORM_STS2" placeholder="用户状态" name="userSts"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="用户记录编号" prop="userId" width="100"></yu-xtable-column>
          <yu-xtable-column label="登录编号" prop="loginCode" width="100"></yu-xtable-column>
          <yu-xtable-column label="用户编码" prop="userCode" width="100"></yu-xtable-column>
          <yu-xtable-column label="用户名称" prop="userName" width="100"></yu-xtable-column>
          <yu-xtable-column label="用户状态" prop="userSts" width="100" data-code="NORM_STS2"></yu-xtable-column>
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
  name: 'YuXtaskpoolPerson',
  componentName: 'YuXtaskpoolPerson',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'loginCode',
      // 表格中显示到input框中的字段key
      textCode: 'userName'
    };
  }
};
</script>
