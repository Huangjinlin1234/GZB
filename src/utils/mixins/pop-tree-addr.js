import { extend } from '@/utils';
import * as xutils from '@/utils/xutils.js';
import { sessionStore } from 'xy-utils';
// 表格组件,最重要的组件之一
var popTree = {
  props: {
    // 输入框属性
    menuNodeSelect: {
          type: Boolean,
          default: false
    },
    disabled: Boolean,
    placeholder: String,
    size: String,
    rawValue: String,
    value: {
      type: [String, Number],
      required: true
    },
    needCheckbox: Boolean,
    parms: Object,
    rootVisible: Boolean,
    mapping: Object,
    clearable: {
      type: Boolean,
      default: true
    },
    // disabled 状态时search 按钮是否可以点击
    trigerClick: {
      type: Boolean,
      default: false
    },
    details: Boolean,
    pathValue: {
      type: Boolean,
      default: true
    },
    pathSplit: {
      type: String,
      default: ''
    },
    showLevel: {
      type: Number,
      default: 5
    }
  },
  data: function () {
    return this.createData();
  },
  watch: {
    value: function (val) {
      if (!this.transVal) {
        return;
      }
      if (this.codeToText !== false) {
        if (this.treeData !== null && this.treeData.length > 0) {
          this.selectedVal = this.getValueByKey(this.treeData, val);
        } else if (val) {
          // 远程获取text数据，比如修改
          // this.getLabelByUrl(val);
          this.getLabelPathByUrl(val);
          // this.getTreeDataByUrl(val);
        }
      } else {
        this.selectedVal = val;
      }
    },
    rawValue: function (val) {
      this.selectedVal = val;
    },
    parms: {
      immediate: true,
      deep: true,
      handler (newVal, oldVal) {
        var temp = this.createData();
        extend(true, this, newVal);
        this.dataParams = temp.dataParams;
        this.updateWidth();
      }
    }
  },
  // 挂载后
  mounted: function () {
    this.updateWidth();
  },
  methods: {
    getLabelByUrl (key) {
      if (!key) {
        return;
      }
      let dt = { code: key };
      let _this = this;
      yufp.clone(this.parms, dt);
      yufp.service.request({
        method: 'post',
        url: this.queryUrl,
        data: dt,
        callback: function (code, message, response) {
          _this.selectedVal = response.data && response.data[0][_this.dataLabel];
        }
      });
    },
    getLabelPathByUrl (key) {
      if (!key) {
        return;
      }
      let dt = { code: key };
      let _this = this;
      yufp.clone(this.parms, dt);
      yufp.service.request({
        method: 'post',
        url: this.queryUrl,
        data: dt,
        callback: function (code, message, response) {
          _this.selectedVal = response.data && response.data.labelPath;
        }
      });
    },
    updateWidth: function () {
      if (this.$refs.treeInput !== null && this.$refs.treeInput !== undefined) {
        this.width = this.$refs.treeInput.$el.scrollWidth;
      }
    },
    onIconClickFn: function () {
      if (this.disabled) {
        return;
      }
      this.visiable = true;
      this.$nextTick(() => {
        // this.$refs.orgTree.data = this.treeData;
        if (!this.needCheckbox) {
          this.$refs.orgTree.setCheckedKeys(this.tempNodekeys);
        }
      });
    },
    getTreeData: function (data) {
      this.treeData = data;
    },
    // nodeExpand (nodeData, node, self) {
    //   if (nodeData.needlazy) {
    //     this._requestChildren(nodeData);
    //   }
    // },
    // _requestChildren (node) {
    //   this.$request({
    //     url: this.lazyUrl,
    //     method: 'post',
    //     data: {levels: Number(node.levels) + 1, abvenName: node.id, optType: 'STD_ZB_AREA_CODE'}
    //   }).then((res) => {
    //     if (res.code === '0') {
    //       node.needlazy = false;
    //       node.children.shift();
    //       if (res.data.length > 0) {
    //         for (let i = 0; i < res.data.length; i++) {
    //           const element = res.data[i];
    //           // element.children = [{id: 'loading', label: '加载中...'}];
    //           this.$refs.orgTree.append(element, node);
    //         }
    //       }
    //     }
    //   });
    // },
    nodeClick: function (nodeData, node, self) {
      var _this = this;
      if (!_this.menuNodeSelect && (this.showLevel > nodeData.levels) && !node.isLeaf) {
          return;
         }
      // if (!_this.menuNodeSelect && nodeData.children && nodeData.children.length > 0) {
      //   return;
      // }
      if (!this.needCheckbox) {
        this.selectedVal = this.getPathValue(node);
        this.transVal = false;
        this.$emit('input', nodeData[this.dataId]);
        this.$emit('select-fn', nodeData, xutils.clone(this.mapping, {}));
        this.$emit('selectval-fn', this.selectedVal);
        // 显示id时直接赋值
        if (this.codeToText === false) {
          this.selectedVal = nodeData[this.dataId];
        }
        // this.$nextTick(function () {
        //   _this.selectedVal = _this.getLabelString([nodeData], this.codeToText !== false ? this.dataLabel : this.dataId);
        // });
        if (!_this.menuNodeSelect && (this.showLevel > nodeData.levels) && node.childNodes.length > 0) {
          return;
         }
        this.visiable = false;
      }
    },
    clearFn: function () {
      this.visiable = false;
    },
    // 清除查询参数,当修改url的时候调用
    clearSearchParams: function () {
      this.dataParams = {};
    },
    // 重置查询参数为默认
    resetDataParams: function () {
      this.dataParams = {
      };
    },
    confirmFn: function () {
      var _this = this;
      var da = this.$refs.orgTree.getCheckedKeys();
      if (da === null || da.length === 0) {
        _this.$message('请至少选择一条数据!', '提示');
        return;
      }
      var tt = this.$refs.orgTree.getCheckedNodes();
      this.$emit('input', this.getLabelString(tt, this.dataId));
      this.$emit('select-treefn', tt);
      this.tempNodekeys = da.concat();
      this.$nextTick(function () {
        _this.selectedVal = _this.getLabelString(tt, _this.showText ? _this.dataLabel : _this.dataId);
      });
      this.visiable = false;
    },
    // 根据key，递归查询label
    getValueByKey: function (array, k) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === k) {
          return array[i].label;
        } else if (array[i].children) {
          let val = this.getValueByKey(array[i].children, k);
          if (val) {
            return val;
          }
        }
      }
      return null;
    },
    getLabelString: function (array, label) {
      var ss = '';
      for (var i = 0; i < array.length; i++) {
        if (i === 0) {
          ss += array[i][label];
        } else {
          ss += ',' + array[i][label];
        }
      }
      return ss;
    },
    refreshData: function () {
      this.$refs.orgTree.remoteData();
    },
    // 对外提供选择器显示值
    getRawValue: function () {
      return this.selectedVal;
    },
    createData: function () {
      var _this = this;
      var temp = _this.getDefaultData();
      // 深度拷贝
      extend(true, temp.dataParams, _this.parms);
      return temp;
    },
    getTreeDataByUrl: function (key) {
      const _this = this;
      if (this.treeData.length > 0) {
        _this.selectedVal = _this.initPathVal(key);
        return;
      }
      let dt = {root: '', levels: this.showLevel + ''};
      yufp.clone(this.parms, dt);
      yufp.service.request({
        method: 'post',
        url: this.lazyUrl,
        // this.queryUrl ? this.queryUrl : this.dataUrl,
        data: dt,
        callback: function (code, message, response) {
          _this.treeData = [];
          _this.$utils.clone(response.data[0].children, _this.treeData);
          // _this.$utils.clone(response.data, _this.tempTreeData);
          _this.setTreeNodeParentId(_this.treeData);
          // _this.initTreeDataByLevel(_this.treeData);
          _this.selectedVal = _this.pathVal = _this.initPathVal(key);
          sessionStore.set('STD_ZB_AREA_CODE', JSON.stringify(_this.treeData));
          // _this.selectedVal = response.data && response.data[0][_this.dataLabel];
        }
      });
    },
    setTreeNodeParentId (tree, id) {
      if (tree.length > 0) {
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          element.parentId = id || 0;
          // element._level = level + 1 || 1;
          if (element.children && element.children.length > 0) {
            // this.setTreeNodeParentId(element.children, element.id, element._level);
            this.setTreeNodeParentId(element.children, element.id);
          } else if (element.levels == '3') {
            element.children = [{id: 'loading', label: '加载中...'}];
            element.needlazy = true;
          }
        }
      }
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },
    initPathVal (val) {
      if (val) {
        let pathArr = [];
        let node = this.findTreeNode(this.treeData, val);
        while (node && node.parentId && node.parentId != 0) {
          pathArr.push(node.label || '');
          node = this.findTreeNode(this.treeData, node.parentId);
        }
        return pathArr.reverse().join(this.pathSplit);
      }
    },
    getPathValue (node) {
      let pathArr = [];
      let currentLevelNode = node;
      while (currentLevelNode.level !== 0) {
        if (currentLevelNode.key && currentLevelNode.label) {
          pathArr.push(currentLevelNode.label);
        }
        currentLevelNode = currentLevelNode.parent;
      }
      return pathArr.reverse().join(this.pathSplit);
    },
    // initTreeDataByLevel (treedata) {
    //   if (this.showLevel === 0) {
    //     return;
    //   }
    //   this.deleteChildren(treedata);
    // },
    // deleteChildren (treedata) {
    //   for (let i = 0; i < treedata.length; i++) {
    //     const element = treedata[i];
    //     if (element.children && element.children.length > 0) {
    //       if (element._level === this.showLevel) {
    //         delete element.children;
    //       } else {
    //         this.deleteChildren(element.children);
    //       }
    //     }
    //   }
    // },
    focusFn: function () {
      this.onIconClickFn();
    }
  }
};
export default popTree;
