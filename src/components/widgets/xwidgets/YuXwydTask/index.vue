
<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="用户信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="refTable">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户名称" ctype="input" placeholder="用户编号" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams" request-type="post">
          <yu-xtable-column label="任务编号" align="center" prop="taskNo"  width="170px"></yu-xtable-column>
          <yu-xtable-column label="客户编号" align="center" prop="cusId" width="160px"> </yu-xtable-column>
          <yu-xtable-column label="客户名称" align="center" prop="cusName" width="120px"> </yu-xtable-column>
          <yu-xtable-column label="产品名称" align="center" prop="prdName" width="120px"></yu-xtable-column>
          <yu-xtable-column label="任务生成日期" align="center" prop="taskStartDt" width="150px"> </yu-xtable-column>
          <yu-xtable-column label="任务要求完成日期" align="center" prop="taskEndDt" width="150px"> </yu-xtable-column>
          <yu-xtable-column label="任务派发人" align="center"  prop="issueIdName"  width="120px"> </yu-xtable-column>
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
  name: 'YuXwydTask',
  componentName: 'YuXwydTask',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisPsp + '/api/pspwydtasklist/getPspWydTaskList',
      // 表格中传出id数据的key
      queryCode: 'loginCode',
      // 表格中显示到input框中的字段key
      textCode: 'taskNo',
      // 返回报文类型，默认string
      responseType: 'array'
    };
  }
};
</script>
