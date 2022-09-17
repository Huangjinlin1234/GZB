<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="流程节点列表">
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="节点编号" prop="nodeId"></yu-xtable-column>
          <yu-xtable-column label="节点名称" prop="nodeName"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuNodeId',
  componentName: 'YuNodeId',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: '',
      // 表格中传出id数据的key
      queryCode: 'nodeId',
      // 表格中显示到input框中的字段key
      textCode: 'nodeId'
    };
  },
  props: {
    parms: Object
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.dataUrl = backend.appOcaService + '/api/biz/allnode/';
    }
  }
};
</script>
