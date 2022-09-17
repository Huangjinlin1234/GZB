<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="灵活查询">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="查询报表编号" ctype="input" placeholder="查询报表编号" name="qryCode"></yu-xform-item>
            <yu-xform-item label="查询报表名称" ctype="input" placeholder="查询报表名称" name="qryName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="查询报表编号" prop="qryCode"></yu-xtable-column>
          <yu-xtable-column label="查询报表名称" prop="qryName"></yu-xtable-column>
          <yu-xtable-column label="数据策略" prop="datapolicy" width="100"></yu-xtable-column>
          <yu-xtable-column label="数据策略映射" prop="datapolicymap" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
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
  name: 'YuXflexQuery',
  componentName: 'YuXflexQuery',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'qryCode',
      // 表格中显示到input框中的字段key
      textCode: 'qryName'
    };
  }
};
</script>
