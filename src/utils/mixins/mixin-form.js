import * as xutils from '@/utils/xutils.js';
// 表单组件,最重要的组件之一
var formMixin = {
  mounted: function () {
    this.editChangeAction = [];
    this.form = this.$refs.refForm;
    this.$nextTick(() => {
      this.form = this.form ? this.form : this.$refs.refForm;
    });
  },
  methods: {
    // 保存数据
    saveBillCardData: function (func) {
      var valid = this.validateBillCardValue();
      if (!valid) {
        return;
      }
      var data = this.doInsertBillCardData(func);
      if (data.code === '0') {
        this.cancelBillCard();
        return data; // 直接转调更新逻辑
      } else {
        this.$message({ message: data.erortx, type: 'error' });
      }
    },
    // 新增卡片数据,在卡片弹出新增界面中保存时会调用!
    insertBillCardData: function (func) {
      let req = this.doInsertBillCardData(func);
      if (req.code === '0') {
        this.cancelBillCard();
        return req; // 直接转调更新逻辑
      } else {
        this.$message({ message: req.erortx, type: 'error' });
      }
    },
    // 更新数据
    updateBillCardData: function (func) {
      var data = this.doUpdateBillCardData(func);
      if (data && data.code === '0') {
        this.cancelBillCard();
        return data; // 直接转调更新逻辑
      }
    },

    // 新增卡片数据
    doInsertBillCardData: function (func) {
      let _this = this;
      if (this.cardSaveJS != null && this.cardSaveJS != undefined) {
        var isOk = this.cardSaveJS(this, 'ADD');
        if (!isOk) {
          return null;
        }
      }
      var jsoRt = {};
      var valid = this.validateBillCardValue();
      if (valid) {
        var jsoCardData = this.getBillCardValue(); // 先取得表单的数据
        this.$request({
          url: this.addUrl,
          method: 'post',
          data: jsoCardData,
          async: false,
          success: function (response) {
            xutils.clone(response, jsoRt);
            if (response.code == '0') {
              // 暂不用递归
              _this.$parent && _this.$parent.doAutoQuery && _this.$parent.doAutoQuery();
              _this.$parent && _this.$parent.$parent && _this.$parent.$parent.doAutoQuery && _this.$parent.$parent.doAutoQuery();
              _this.$message('新增成功!');
            }
            typeof func === 'function' && func(response);
          },
          error: function () {
            // 处理请求失败的情况
            _this.$message({ message: '新增失败', type: 'error' });
            jsoRt = null;
          }
        });
        return jsoRt;
      } else {
        this.$message({ message: '校验未通过！', type: 'warning' });
        return null;
      }
    },

    // 修改卡片数据
    doUpdateBillCardData: function (func) {
      let _this = this;
      if (this.cardSaveJS != null && this.cardSaveJS != undefined) {
        var isOk = this.cardSaveJS(this, 'EDIT');
        if (!isOk) {
          return null;
        }
      }
      var jsoRt = {};
      var valid = this.validateBillCardValue();
      if (valid) {
        var jsoCardData = this.getBillCardValue(); // 先取得表单的数据
        this.$request({
          url: this.updateUrl,
          method: 'post',
          data: jsoCardData,
          async: false,
          success: (response) => {
            if (response.code == '0') {
              xutils.clone(response, jsoRt);
              _this.afterSaveSuccess && _this.afterSaveSuccess();
              this.$message('更新成功!');
              _this.$parent && _this.$parent.$parent && _this.$parent.$parent.doAutoQuery && _this.$parent.$parent.doAutoQuery();
            }
            typeof func === 'function' && func(response);
          },
          error: () => {
            // 处理请求失败的情况
            this.$message({ message: '更新失败', type: 'error' });
          }
        });
      } else {
        this.$message({ message: '校验未通过！', type: 'warning' });
        jsoRt = null;
      }
      return jsoRt;
    },
    // 根据设置规则校验所有数据
    validateBillCardValue: function (callback) {
      var _this = this;
      var validate = false;
      this.form.validate(function (valid) {
        validate = valid;
        typeof callback == 'function' ? callback.call(_this, valid) : '';
      });
      return validate;
    },
    // 取得卡片所有数据
    getBillCardValue: function () {
      return this.form.formdata;
    },
    // 简写的取值方法
    getItemValue: function (_itemKey) {
      let itemKey = xutils.toHump(_itemKey);
      return this.getBillCardItemValue(itemKey);
    },
    // 取得某一项的值
    getBillCardItemValue: function (_itemKey) {
      let itemKey = xutils.toHump(_itemKey);
      return this.form.formdata[itemKey];
    },
    cancelBillCard: function () {
      this.$parent.$parent.dialogVisible = false;
    },
    // 设置整个数据
    setBillCardValue: function (_data) {
      // 下划线转驼峰
      this.form.resetFields(); // 避免赋值即会触发必输校验
      let dt = xutils.clone(xutils.toUpperCase(_data, true));
      xutils.clone(dt, this.form.formdata);
    },
    // 设置值
    setItemValue: function (_itemKey, _itemValue, _realValue) {
      // key 转驼峰
      _itemKey = xutils.toHump(_itemKey);
      this.setBillCardItemValue(_itemKey, _itemValue, _realValue);
    },
    // 设置某个字段值
    setBillCardItemValue: function (_itemKey, _itemValue) {
      // key 转驼峰
      _itemKey = xutils.toHump(_itemKey);
      this.form.formdata[_itemKey] = _itemValue;
    },
    // 简写方式,相当于别名
    setItemVisible: function (_itemKey, _visible) {
      _itemKey = xutils.toHump(_itemKey);
      this.setBillCardItemVisible(_itemKey, _visible);
    },
    /**
    * 设置某一项或几项显示或隐藏
    * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
    * @param {*} _visible 布尔值 true：显示  false：隐藏
    */
    setBillCardItemVisible: function (_itemKey, _visible) {
      let _this = this;
      _this.$nextTick(() => {
        if (_itemKey.indexOf(';') > 0) {
          var _itemKeys = _itemKey.split(';');
          for (var i = 0; i < _itemKeys.length; i++) {
            _itemKeys[i] = xutils.toHump(_itemKeys[i]);
            _this.form.setItemHidden(_itemKeys[i], !_visible);
            console.log(_itemKeys[i], !_visible);
          }
        } else {
          _itemKey = xutils.toHump(_itemKey);
          _this.form.setItemHidden(_itemKey, !_visible);
          console.log(_itemKey, !_visible);
        }
      });
    },
    /**
    * 设置某一项或几项的值清空
    * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
    */
    setBillCardItemClearValue: function (_itemKey) {
      var aryiItemkey = _itemKey.split(';'); // 可能有多个,以分号分割
      for (var i = 0; i < aryiItemkey.length; i++) {
        var strItemKey = aryiItemkey[i].toLowerCase(); // 转小写
        strItemKey = xutils.toHump(strItemKey);
        // 有值的才清空，没值的就不处理（空数据字段再次赋值会导致change事件触发）
        if (this.form.formdata.strItemKey) {
          this.setBillCardItemValue(strItemKey, null, null); // 其实就是设值为空
        }
      }
    },
    // 设置整个表单是否可编辑
    setBillCardEditable: function (_editable) {
      this.form.disable = !_editable;
    },
    // 简写,相当于别名,因为编辑公式中要越短越好!
    setItemEditable: function (_itemKey, _editable) {
      this.setBillCardItemEditable(_itemKey, _editable);
    },
    /**
     * 设置某一项或几项是否可编辑
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     * @param {*} _editable 布尔值 true：可编辑  false：不可编辑
     */
    setBillCardItemEditable: function (_itemKey, _editable) {
      if (_itemKey === '*') {
        for (var item in this.formdata) {
          this.form.setItemDisabled(item, !_editable);
        }
      } else {
        if (_itemKey.indexOf(';') > 0) {
          var _itemKeys = _itemKey.split(';');
          for (var i = 0; i < _itemKeys.length; i++) {
            this.form.setItemDisabled(_itemKeys[i], !_editable);
          }
        } else {
          this.form.setItemDisabled(_itemKey, !_editable);
        }
      }
    },
    onClickRefButton: function (_itemKey) {

    },
    dealCondition: function (_cons) {
      var queryParam = {};
      if (_cons && typeof _cons === 'string') {
        // 处理多条件
        var andArray = _cons.split('and');
        for (var i = 0; i < andArray.length; i++) {
          var el = andArray[i];
          if (el) {
            // 处理条件
            var cond = el.split('=');
            cond[1] = cond[1].trim();
            if (cond[1].startsWith('\'')) {
              cond[1] = cond[1].replace('\'', '');
            }
            if (cond[1].endsWith('\'')) {
              cond[1] = cond[1].substring(cond[1].lastIndexOf('\'') - 1, 1);
            }
            queryParam[cond[0].trim()] = cond[1].trim();
          }
        }
      } else if (_cons && typeof _cons === 'object') {
        queryParam = _cons;
      }
      // 转换为驼峰
      queryParam = xutils.toUpperCase(queryParam, true);
      return queryParam;
    },
    queryDataByCondition: function (condition, type, callback) {
      if (!condition) {
        return;
      }
      const queryParam = this.dealCondition(condition);
      this.$request({
        url: this.addUrl,
        method: type || 'get', // 默认get请求
        data: {condition: JSON.stringify(queryParam)}
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          if (response.data instanceof Array) {
            // 数组就赋值第0项
            if (response.data.length > 0) {
              this.setBillCardValue(response.data[0]);
              callback && callback(response.data[0]);
            }
          } else {
            this.setBillCardValue(response.data);
            callback && callback(response.data);
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求表单数据失败', type: 'error' });
      });
    },
    tempSaveBillCardData: function (params) {
      // if (this.cardSaveJS != null && this.cardSaveJS != undefined) {
      //   var isOk = this.cardSaveJS(this, 'EDIT');
      //   if (!isOk) {
      //     return null;
      //   }
      // }
      var jsoCardData = this.getBillCardValue(); // 先取得表单的数据
      this.$request({
        url: this.addUrl,
        method: 'post',
        data: jsoCardData
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          // jsoRt = response;
          this.$message('暂存成功!');
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '暂存失败', type: 'error' });
      });
    },
    _updateBillCardData: function () {
      this.tempUpdateBillCardData();
    },
    tempUpdateBillCardData: function () {
      // if (this.cardSaveJS != null && this.cardSaveJS != undefined) {
      //   var isOk = this.cardSaveJS(this, 'EDIT');
      //   if (!isOk) {
      //     return null;
      //   }
      // }
      var jsoCardData = this.getBillCardValue(); // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          // jsoRt = response;
          this.$message({message: '暂存成功!', type: 'success'});
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '暂存失败', type: 'error' });
      });
    },

    // 默认保存（增，改）
    onSaveData: function () {
      if (this.$parent.$parent.formType == 'ADD') {
        this.saveBillCardData(this);
      } else {
        this.updateBillCardData(this);
      }
    },
    onCancel: function () {
      this.cancelBillCard();
    },
    // change事件
    addEditChangeAction: function (_action) {
      this.editChangeAction.push(_action); //
    },
    // 触发编辑事件,最关键的一个动作,这是由框架触发执行!
    triggerEditChangeEvent: function (_itemkey, _newValue, _oldValue) {
      // 再循环执行Api添加的监听事件
      for (var i = 0; i < this.editChangeAction.length; i++) {
        this.editChangeAction[i](this, _itemkey, '', _newValue);
      }
    },
    // 设置一项或者几项必输
    setBillCardItemRequired: function (_itemKey, _required) {
      // if (_itemKey.indexOf(';') > 0) {
      //   var _itemKeys = _itemKey.split(';');
      //   for (var i = 0; i < _itemKeys.length; i++) {
      //     this.setBillCardItemRules(xutils.toHump(_itemKeys[i]), [{ required: true, message: '该项为必输项', trigger: 'blur' }]);
      //   }
      // } else {
      //   this.setBillCardItemRules(xutils.toHump(_itemKey), [{ required: true, message: '该项为必输项', trigger: 'blur' }]);
      // }
      var _this = this;
      var _getBillCardItemRules = function (_itemKey) {
        var jsoData = _this.formRules;
        if (_itemKey.indexOf(';') > -1) {
          console.log('getBillCardItemRules方法仅支持单字段校验规则获取');
        } else {
          if (jsoData.hasOwnProperty(_itemKey)) {
            return jsoData[_itemKey];
          } else {
            console.log('getBillCardItemRules-字段【' + _itemKey + '】未设置任何校验规则');
            jsoData[_itemKey] = []; // 初始化一个空数组
            return jsoData[_itemKey];
          }
        }
      };

      var _setBillCardItemRequire = function (_ruleArry, _myrequired) {
        var hasProp = false; // 是否存在初始化设置的required规则
        for (var j = 0; j < _ruleArry.length; j++) { // 遍历规则，重置必输规则
          if (_ruleArry[j].hasOwnProperty('required')) {
            _ruleArry[j].required = _myrequired;
            hasProp = true;
            break;
          }
        }
        if (!hasProp) { // 不存在初始化设置的required规则，则新增规则
          var requiredRule = {
            required: _myrequired,
            message: '必输项不允许为空'
          };
          _ruleArry.push(requiredRule);
        }
      };
      var tmpRule = null;
      if (_itemKey.indexOf(';') > 0) {
        var _itemKeys = _itemKey.split(';');
        for (var i = 0; i < _itemKeys.length; i++) {
          tmpRule = _getBillCardItemRules(xutils.toHump(_itemKeys[i]));
          _setBillCardItemRequire(tmpRule, _required);
        }
      } else {
        tmpRule = _getBillCardItemRules(xutils.toHump(_itemKey));
        _setBillCardItemRequire(tmpRule, _required);
      }
    },
    /**
     * 设置某一项或几项的校验规则（将某一项或某几项的校验规则全部清空并重新设置）
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     * @param {*} _rule 字符串 示例：【单规则 'yufp.validator.number'】 【多规则 'yufp.validator.number;yufp.validator.age'】(规则是yufp.validator中默认提供规则集；也可以使用自定义的方法，只要将方法名传入即可)
     *      自定义校验方法：'myRuleNumber;myRuleCheckFn'
     */
    setBillCardItemRules: function (_itemKey, _rules) {
      this.formRules[_itemKey] = Array.isArray(_rules) ? _rules : [_rules];
    },
    /**
     *
     * @param {*} itemkey 字段的key，username
     * @param {*} type replaceAll: 替换所有选项为selections, hidden: 隐藏传递的selections选项，add:添加一个选项
     * @param {*} selections 选项 [{key: 01, value: 男}], 若只是要隐藏可直接传递要隐藏的选项对应的 key 或者 value,多个时','分隔
     */
    setSelectOptions: function (itemkey, type, selections) {
      if (!itemkey || !type) {
        return;
      }
      var ctypeComp = this.getCompByName(itemkey);
      if (type == 'hidden') {
        // 可能有组件未更新情况,所以多判断下方法是否存在
        ctypeComp.setExcludeKey && ctypeComp.setExcludeKey(selections);
      } else if (type == 'replaceAll') {
        ctypeComp.typeOptions = selections;
      } else if (type == 'add') {
        // 代码中没有调用，所以暂未实现
      } else {
        console.err('下拉框设置数据错误！字段：' + itemkey + '_方法类型:' + type + '塞值参数' + selections);
      }
    },
    // 根据name 获取item对应的组件 不对外暴露
    getCompByName: function (itemkey) {
      var item = xutils.getItemRef(this.$refs.refForm.$children, itemkey);
      var ctypeComp = item.$children[0].$children[0];
      return ctypeComp;
    },
    resetBillCardData: function () {
      this.form.resetFields();
    },
    customClick: function (methodName) {
      if (!methodName) {
        return;
      }
      // 递归获取父级方法
      let parent = this.$parent;
      while (parent) {
        if (parent[methodName]) {
          parent[methodName]();
          break;
        } else {
          parent = parent.$parent;
        }
      }
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    // 解析,把一个字符串中以_beginStr开始,_endStr结束的中间的字符串取出来!!
    parseStrMacroKeys: function (_str, _beginStr, _endStr) {
      var aryRt = []; // 返回的数组
      var liLen1 = _beginStr.length; // 开始字符串的长度
      var liLen2 = _endStr.length; // 结束字符串的位置

      var strRemain = _str; // 剩余的
      var liPos1 = strRemain.indexOf(_beginStr); // 开始位置

      // 如果有
      while (liPos1 > 0) {
        var liPos2 = strRemain.indexOf(_endStr); // 结束位置
        var strItem = strRemain.substring(liPos1 + liLen1, liPos2); //
        aryRt.push(strItem); // 加入
        strRemain = strRemain.substring(liPos2 + liLen2, strRemain.length); // 剩余
        liPos1 = strRemain.indexOf(_beginStr); // 再计算剩下的字符串的开始
      }
      return aryRt; // 返回
    }
  },
  /**
   * 销毁弹窗资源
   */
  beforeDestroy () {
    this.pageParams = null;
  }
};
export default formMixin;