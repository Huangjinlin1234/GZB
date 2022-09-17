
<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="用户信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" :related-table-name="cusTableRefName">
          <yu-xform-group :column="4">
            <yu-xform-item label="用户编号" ctype="input" placeholder="用户编号" name="loginCode"></yu-xform-item>
            <yu-xform-item label="用户名称" ctype="input" placeholder="用户名称" name="userName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable :ref="cusTableRefName" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="用户编号" prop="loginCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="用户名称" prop="userName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="所在机构编号" prop="orgId" width="150px"></yu-xtable-column>
          <yu-xtable-column label="所在机构名称" prop="orgName" width="160px"></yu-xtable-column>
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
import popList from '@/utils/mixins/pop-list';
import backend from '@/config/constant/app.data.service';
export default {
  name: 'YuXuserForDh',
  componentName: 'YuXuserForDh',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmuser/pageForDh',
      // 表格中传出id数据的key
      queryCode: 'loginCode',
      // 表格中显示到input框中的字段key
      textCode: 'userName',
      // 返回报文类型，默认string
      responseType: 'array',
      requestType: 'GET',
      cusTableRefName: 'yuXuserPopTb'
    };
  }
};
</script>
