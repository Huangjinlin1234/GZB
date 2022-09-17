<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <el-tree-x ref="orgTree" :show-checkbox="needCheckbox" :height="height" :expand-level="expandLevel" :root-visible="rootVisible" :check-strictly="checkStrictly" :default-expand-all="defaultExpandAll" :data-url="dataUrl" :data-id="dataId" :data-label="dataLabel" :data-params="dataParams" :data-pid="dataPid" :data-root="dataRoot" @node-click="nodeClick" @get-tree-datas="getTreeData" request-type="post"></el-tree-x>
      <div style="float: right" v-if="needCheckbox">
        <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>
        <el-button @click="clearFn" size="small">取 消</el-button>
      </div>
    </yu-xdialog>
    <el-input ref="treeInput" v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled" :size="size" name="" slot="reference" :on-icon-click="onIconClickFn" icon="search" :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></el-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popTree from '@/utils/mixins/pop-tree';
export default {
  name: 'YuXmtablConf',
  componentName: 'YuXmtablConf',
  mixins: [popTree],
  methods: {
    getDefaultData: function () {
      return {
        // 展示参数
        selectedVal: '',
        width: 480,
        height: 800,
        visiable: false,
        checkStrictly: false,
        expandLevel: 2, // 默认展开层级
        defaultExpandAll: false,
        // 节点参数属性
        dataId: 'id',
        dataLabel: 'label',
        dataPid: '',
        dataRoot: '',
        // 数据参数
        dataParams: {},
        tempNodekeys: [],
        tempTreeData: [],
        dataUrl: backend.cmisLmt + '/api/lmtstrmtableconf/tree'
      };
    }
  }
};
</script>
