<template>
  <div>
  <div v-if="visiable">
    <yu-xdialog :visible.sync="visiable"  :width="width">
    <!--:data-url="lazyUrl"   :data="treeData" @node-expand="nodeExpand"-->
      <yu-xtree ref="orgTree" :show-checkbox="needCheckbox" :height="height" :node-key="dataId" :expand-level="expandLevel" @get-tree-data="getTreeData" :root-visible="rootVisible" :check-strictly="checkStrictly" :default-expand-all="defaultExpandAll" :data-url="lazyUrl" lazy :data-id="dataId" :data-label="dataLabel" :data-params="dataParams" :data-pid="dataPid" :data-root="dataRoot" @node-click="nodeClick" request-type="post"></yu-xtree>
      <div style="float: right" v-if="needCheckbox">
        <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>
        <el-button @click="clearFn" size="small">取 消</el-button>
      </div>
    </yu-xdialog>
    </div>
    <el-input ref="treeInput" v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled" :size="size" name="" slot="reference" :on-icon-click="onIconClickFn" icon="search" :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></el-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popTreeAddr from '@/utils/mixins/pop-tree-addr';
export default {
  name: 'YuXdicTreeAddr',
  componentName: 'YuXdicTreeAddr',
  mixins: [popTreeAddr],
  methods: {
    getDefaultData: function () {
      return {
        treeData: [],
        pathVal: '',
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
        dataRoot: '100000',
        // 数据参数
        dataParams: {
          root: '',
          optType: '',
          levels:''
        },
        transVal: true,
        tempNodekeys: [],
        tempTreeData: [],
        lazyUrl: backend.cmisCfg + '/api/adminsmtreedic/lazytree',
        dataUrl: backend.cmisCfg + '/api/adminsmtreedic/tree',
        queryUrl: backend.cmisCfg + '/api/adminsmtreedic/queryLabelPath'
      };
    }
  }
};
</script>
