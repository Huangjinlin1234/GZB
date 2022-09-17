import { extend } from '@/utils';
import * as xutils from '@/utils/xutils.js';
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
    details: Boolean
  },
  data: function () {
    return this.createData();
  },
  watch: {
    value: function (val) {
      if (this.codeToText !== false) {
        if (this.tempTreeData !== null && this.tempTreeData.length > 0) {
          if(this.tempTreeData[0].id && this.tempTreeData[0].id !== 'SZTC9999') { //行业分类需要展示四级取getPathValue的值
            this.selectedVal = this.getValueByKey(this.tempTreeData, val);
          }
        } else if (val) {
          // 远程获取text数据，比如修改
          this.getLabelByUrl(val);
        }
      } else {
        this.selectedVal = val;
      }
    },
    rawValue: function (val) {
      this.selectedVal = val;
    },
    tempTreeData: function (val) {
      if (this.codeToText !== false) {
        this.selectedVal = this.getValueByKey(val, this.value);
      }
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
      this.$nextTick(function () {
        if (!this.needCheckbox) {
          this.$refs.orgTree.setCheckedKeys(this.tempNodekeys);
        }
      });
    },
    getTreeData: function (data) {
      this.tempTreeData = data;
    },
    nodeClick: function (nodeData, node, self) {
      if(this.parms && this.parms.levels === '1' && this.parms.id === 'SZTC9999') { //优农贷 经营信息 一级行业名称
        this.selectedVal = this.getPathValue(node);
        this.$emit('input', nodeData[this.dataId]);
        this.$emit('select-fn', nodeData, xutils.clone(this.mapping, {}));
        this.visiable = false;
        return
      }
      var _this = this;
      if (!_this.menuNodeSelect && nodeData.children && nodeData.children.length > 0) { //如果还有子类则继续往下操作
        return;
      }
      if (!this.needCheckbox) {
        this.selectedVal = this.getPathValue(node);
        this.$emit('input', nodeData[this.dataId]);
        this.$emit('select-fn', nodeData, xutils.clone(this.mapping, {}));
        // 显示id时直接赋值
        if (this.codeToText === false) {
          this.selectedVal = nodeData[this.dataId];
        }
        // this.$nextTick(function () {
        //   _this.selectedVal = _this.getLabelString([nodeData], this.codeToText !== false ? this.dataLabel : this.dataId);
        // });
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
      if (temp.menuNodeSelect) {
        _this.menuNodeSelect = temp.menuNodeSelect;
      }
      // 深度拷贝
      extend(true, temp.dataParams, _this.parms);
      return temp;
    },
    getLabelByUrl: function (key) {
      if (!key || typeof key !== 'string') {
        return;
      }
      let dt = { code: key };
      let _this = this;
      yufp.clone(this.parms, dt);
      yufp.service.request({
        method: 'post',
        url: this.queryUrl ? this.queryUrl : this.dataUrl,
        data: dt,
        callback: function (code, message, response) {
          _this.selectedVal = response.data && response.data[0][_this.dataLabel];
        }
      });
    },
    focusFn: function () {
      this.onIconClickFn();
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
  }
};
export default popTree;
