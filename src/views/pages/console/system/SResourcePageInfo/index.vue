<template>
  <div class="resource-container">
    <el-row>
      <el-col :span="10">
        <el-button-group >

          <el-button icon="plus" @click="addFn" >新增</el-button>
          <el-button :icon="expandAll ? 'yx-menu4' : 'yx-menu3' "  @click="transExpand" >{{ expandAll ? '收缩所有节点' : '展开所有节点' }} </el-button>
        </el-button-group>
        <div class="tree-content">
          <yu-tree
             ref="rescTree"
            :data="treeData"
            :props="defaultProps"
            node-key="rescCode"
            :render-content="renderContent">
          </yu-tree>
        </div>
      </el-col>
      <el-col :span="14">
        <!-- 展示资源查看 -->
        <yu-xform ref="refFormDemo" label-width="120px" :hidden-rule="true" :disabled="disabled" v-model="formdata" form-type="edit" hidden-del-val>
          <yu-xform-group>
            <yu-xform-item v-for="(item,index) in formFileds" :key="index" :label="item.label"   :ctype="item.ctype"   :name="item.name"  ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getTreeData} from '@/api/systemManage/resource.js';
export default {
  data () {
    return {
      expandAll: false,
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'rescDesc'
      },
      formFileds: [
        { field: 'rescCode', label: '资源代码', disabled: true, rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32'}] },
        { field: 'rescDesc', label: '资源中文描述', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80'}] },
        { field: 'funcId', label: '路由', rules: [{ max: 32, message: '最大长度为32'}] },
        { field: 'rescIcon', label: '资源图标', rules: [{ max: 60, message: '最大长度为60'}] },
        { field: 'orderId', label: '序号', rules: [{ validator: yufp.validator.number, message: '序号必须为数字值'}]}
      ]
    };
  },
  created () {
    this.getTreeDataFn();
  },
  methods: {
    transExpand () {
      this.expandAll = !this.expandAll;
      let _this = this;
      let closeFn = function (obj) {
        var data = obj.childNodes;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].expanded = _this.expandAll;
            closeFn(data[i]);
          }
        }
      };
      let data = this.$refs.rescTree.root.childNodes;
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].expanded = this.expandAll;
          closeFn(data[i]);
        }
      }
    },
    transTree (list, rootValue) {
      let treeData = [];
      list.forEach(item => {
        if (!item.rescParentCode) {
          treeData.push(item);
        }
        const children = list.filter(data => data.rescParentCode === item.rescCode);
        if (!children.length) { return };
        item.children = children;
      });
      return treeData;
    },
    getTreeDataFn () {
      getTreeData({}).then(res => {
        if (res.code === '0') {
          let childrenArr = this.transTree(res.rows, '');
          this.treeData = childrenArr;
        }
      });
    },
    renderContent: function (h, obj) {
      var _this = this, data = obj.data, store = obj.store, node = obj.node;
      var btnArray = [{name: '增加', callback: function () { _this.append(store, data) }, type: 'primary'},
        {name: '删除', type: 'warning', callback: function () { _this.remove(store, data) }}];
      return h('span', {}, [
        h('span', {}, [h('span', {}, node.label)]),
        h('span', { attrs: { style: 'float: right; margin-right: 20px' } }, btnArray.map(function (item) {
          return h('yu-button', {props: {size: 'mini', type: item.type}, on: {click: item.callback}}, item.name);
        }))
      ]);
    }
  }
};
</script>

<style lang="scss" scoped>
.resource-container{
  .tree-content{
    height: 692px;
    overflow: auto;
  }
}
</style>