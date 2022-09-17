
import * as xutils from '@/utils/xutils.js';
import config from '@/config/index.js';
// import backend from '@/config/constant/app.data.service'
// 表格组件,最重要的组件之一
var popList = {
  props: {
    readonly: Boolean,
    placeholder: String,
    mapping: Object,
    parms: Object,
    requestUrl: String,
    size: [String, Number],
    width: {
      type: [String, Number],
      default: '960px'
    },
    value: [String, Number],
    clearable: {
      type: Boolean,
      default: true
    },
    // disabled 状态时search 按钮是否可以点击
    trigerClick: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    details: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      visiable: false,
      selectedVal: '',
      searchFormdata: {},
      baseParams: {},
      confirmFlag: false
    };
  },
  created: function () {
    xutils.clone(this.parms, this.baseParams);
    if (this.requestUrl) {
      this.dataUrl = this.requestUrl;
    }
  },
  computed:{
    tableRef: function(){
      return this.cusTableRefName || 'refTable';
    }
  },
  watch: {
    value: function (val) {
      if (!val) {
        this.selectedVal = '';
        return;
      }
      if (this.confirmFlag) {
        this.confirmFlag = false;
        return;
      }
      // codeToText 为false 表示不将id转换为text
      if (this.codeToText !== false) {
        this.getNameByKey(val, true);
      } else {
        this.selectedVal = val;
      }
    },
    selectedVal: function (val) {
      if (!val) {
        this.$emit('input', '');
      }
    }
  },
  mounted: function () {
    // codeToText 为false 表示不将id转换为text
    if (this.codeToText !== false) {
      this.getNameByKey(this.value, false);
    } else {
      this.selectedVal = this.value;
    }
  },
  methods: {
    onIconClickFn: function () {
      this.visiable = true;
    },
    confirmFn: function () {
      let _this = this;
      let selection = _this.$refs[this.tableRef].selections.length;
      if (selection != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let row = _this.$refs[this.tableRef].selections[0];
      // 赋值对象
      this.selectedVal = row[this.textCode];
      this.confirmFlag = true;
      this.$emit('input', row[this.getInputKey()]);
      this.$emit('change', row[this.getInputKey()]);
      this.$emit('select-fn', row, xutils.clone(this.mapping, {}));
      // select-fn 中可能有清空动作
      this.$nextTick(function () {
        if (!this.value) {
          this.selectedVal = '';
        }
      });
      this.visiable = false;
    },
    clearText: function () {
      this.selectedVal = '';
    },
    getNameByKey: function (val, flag) {
      // mounted的时候如果val为空就不查询
      if (!val) {
        this.selectedVal = '';
        return;
      }
      var _this = this;
      var dt = {};
      dt[_this.queryCode] = val;
      xutils.request({
        url: _this.dataUrl,
        data: dt,
        type: _this.requestType || config.defaultRequestType,
        success: response => {
          _this.selectedVal = _this.responseType == 'array' ? response.data && response.data[0] && response.data[0][_this.textCode] : response.data && response.data[_this.textCode];
        }
      });
    },
    getInputKey () {
      if (this.mapping) {
        for (let item in this.mapping) {
          if (this.mapping[item] == this.$parent.name) {
            return item;
          }
        }
      }
      return this.$parent.name || '';
    },
    focusFn: function () {
      this.onIconClickFn();
    },
    clearFn: function () {
      this.visiable = false;
    }
  }
};
export default popList;