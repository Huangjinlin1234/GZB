import * as xutils from '@/utils/xutils.js';

/**
 * 通用组件
 * @type {{}}
 */
let mixinUtils = {

  methods: {
    /**
     *  直接在tabble表格中插入一行数据
     * @param _tableName ref的名称
     * @param _rowData 需要插入的数据
     */
    addTabeleRowData: function (_refName, _rowData) {
      this.$refs[_refName].tabledata.push(_rowData);
    },

    /**
     * 获选中的单行数据
     * @param refName ref的名称
     * @returns {*}
     */
    getTableSelectedRowData: function (refName) {
      return this.$refs[refName].selections[0];
    },
    /**
     * 获取选中数据，多选，默认返回数组
     * @param refName ref的名称
     * @returns {*}
     */
    getTableSelectedRowsData: function (refName) {
      return this.$refs[refName].selections;
    },

    /**
     * 清空所有选中行, 用于多选表格
     * @param refName ref的名称
     */
    clearTableSelected: function (refName) {
      this.$refs[refName].clearSelection();
    },

    /**
     * 设置table某一列的展示和隐藏,支持多列逗号分隔配置
     * @param {string} refName
     * @param {string} _itemkeys
     * @param {boolean} flag
     */
    setTableItemVisiable: function (refName, _itemkeys, flag) {
      if (flag) {
        this.$refs[refName].setShowColumns(_itemkeys.split(';'));
      } else {
        this.$refs[refName].setHiddenColumns(_itemkeys.split(';'));
      }
    },

    /**
     * 设置form表单的某一项或几项显示或隐藏
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     * @param {*} _visible 布尔值 true：显示  false：隐藏
     */
    setFormItemVisible: function (_refName, _itemKey, _visible) {
      let _this = this;
      _this.$nextTick(() => {
        if (_itemKey.indexOf(';') > 0) {
          let _itemKeys = _itemKey.split(';');
          for (let i = 0; i < _itemKeys.length; i++) {
            _this.$refs[_refName].setItemHidden(_itemKeys[i], !_visible);
          }
        } else {
          _this.$refs[_refName].setItemHidden(_itemKey, !_visible);
        }
      })
    },

    /**
     * 设置form表单的某一项或几项是否可编辑
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     * @param {*} _editable 布尔值 true：可编辑  false：不可编辑
     */
    setFormItemEditable: function (_refName, _itemKey, _editable) {
      if (_itemKey === '*') {
        for (let item in this.formdata) {
          this.$refs[_refName].setItemDisabled(item, !_editable);
        }
      } else {
        if (_itemKey.indexOf(';') > 0) {
          let _itemKeys = _itemKey.split(';');
          for (let i = 0; i < _itemKeys.length; i++) {
            this.$refs[_refName].setItemDisabled(_itemKeys[i], !_editable);
          }
        } else {
          this.$refs[_refName].setItemDisabled(_itemKey, !_editable);
        }
      }
    },
    /**
     * 设置某一项或几项的值清空
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     */
    setFormItemClearValue: function (_refName, _itemKey) {
      let itemKeys = _itemKey.split(';'); // 可能有多个,以分号分割
      for (let i = 0; i < itemKeys.length; i++) {
        let key = itemKeys[i];
        // 有值的才清空，没值的就不处理（空数据字段再次赋值会导致change事件触发）
        if (this.$refs[_refName].formdata[key]) {
          this.$refs[_refName].formdata[key] = null;
        }
      }
    },

    /**
     * 该方法只做查询操作不做删除和修改操作
     * @param refName ref的名称 string
     * @param url 请求的地址
     * @param type 请求方法，默认get
     * @param condition 请求参数
     * @param callback 回调函数,请求响应之后执行的方法
     */
    queryFromByCondition: function (refName, url, type, condition, callback) {
      if (!condition) {
        return;
      }

      // 遮罩标志位
      let maskFlag = condition && condition.maskFlag;
      let loadingMask;
      // 判断是否需要进行遮罩处理
      if(maskFlag){
        // 添加遮罩
        loadingMask = this.$loading({
          body: true, // 遮罩是否全屏, true: 全屏，false: 非全屏
          background: "rgba(255,255,255,0.3)",
          text: "数据加载中。。。"
        });
      }
      this.$request({
        url: url,
        method: type ? type : 'get', //默认get请求
        data: condition
      }).then((res) => {
        if (res.code == '0') {
          // 判断是否存在显示遮罩标志位，若是存在，则关闭
          if (maskFlag) {
            loadingMask.close();
          }
          // 异步结果返回时原组件可能已被销毁
          if (!this.$refs[refName]) { return; }

          if (res.data instanceof Array) {
            // 数组就赋值第0项
            if (res.data.length > 0) {
              this.$refs[refName].resetFields();
              this.$xutils.clone(res.data[0], this.$refs[refName].formdata)
              callback && callback(res.data[0]);
            } else {
              callback && callback(res.data);
            }
          } else {
            this.$refs[refName].resetFields();
            this.$xutils.clone(res.data, this.$refs[refName].formdata)
            callback && callback(res.data);
          }
        }
      });
    },

    /**
     * 保存数据
     * 保存数据的方法只有post请求
     * @param refName ref的名称 string
     * @param url 请求地址
     * @param msg 提示信息
     * @param callback 回调方法
     */
    doSaveBillCardData: function (refName, url, msg, callback) {
      const _this = this;
      let validate = false;
      _this.$refs[refName].validate(function (valid) {
        validate = valid;
      })
      if (!validate) {
        // _this.$message("请检查页面要素是否录入完整");
        _this.$message.warning("请检查页面要素是否录入完整!");
        return validate;
      }
      let jsoCardData = {}
      _this.$xutils.clone(_this.$refs[refName].formdata, jsoCardData);
      _this.$request({
        url: url,
        method: 'post',
        data: jsoCardData,
      }).then(res => {
        if (res.code == '0') {
          // _this.$message({ message: msg ? msg : "保存成功", type: "success" });
          _this.$message.success(msg ? msg : "保存成功");
          callback && callback(res.data);
        }
      })
    },

    /**
     * 暂存数据无需校验
     * @param {string} refName ref的名称 string
     * @param {string} url
     * @param params
     */
    tempSaveFormData: function (refName, url, params) {
      const _this = this;
      let jsoCardData = {}; // 先取得表单的数据
      _this.$refs[refName].clearValidate();//暂存除去校验
      _this.$xutils.clone(params, jsoCardData)
      _this.$request({
        url: url,
        method: 'post',
        data: jsoCardData
      }).then((response) => {
        if (response.code == '0') {
          // this.$message({
          //   message: "暂存成功!",
          //   type: 'success'
          // });
          this.$message.success("暂存成功!");
        }
      }).catch(() => {
        // 处理请求失败的情况
        // this.$message({ message: '暂存失败', type: 'error' });
        // this.$message.error("暂存失败!");
      });
    },

    /**
     *下拉框初始化隐藏或展示字段
     * @param options
     * @param dataCode
     * @param name
     * @returns {*}
     */
    filterSelectOptions(options, dataCode, name) {
      const _this = this;
      let filterOpption = [];
      let type = "";
      _this.selectOptions.forEach((opp) => {
        if (opp.itemKey === name) {
          filterOpption = opp.selections.split(",");
          type = opp.type
          return;
        }
      })
      if (type === "hidden") {
        return options.filter(function (option) {
          return filterOpption.indexOf(option.key) === -1;
        });
      } else if (type === "show") {
        return options.filter(function (option) {
          return filterOpption.indexOf(option.key) !== -1;
        });
      } else {
        console.error('下拉框设置数据错误！字段：' + name + '_方法类型:' + type + '塞值参数' + filterOpption);
      }

    },
    /**
     * 字典项下拉选隐藏或展示选项
     * @param {string} dictName 字典项type
     * @param {string} option  需要展示或者隐藏的选项
     * @param {string} type show表示展示，hidden表示隐藏
     * @returns {[]}
     */
    filterSeleteDictOption(dictName, option, type) {
      let op = []
      yufp.lookup.bind(dictName, function (arr) {
        if (type === "show") {
          arr.forEach((item, index) => {
            if (option.indexOf(item.key) > -1) {
              op.push(item)
            }
          });
        } else if (type === "hidden") {
          arr.forEach((item, index) => {
            if (option.indexOf(item.key) == -1) {
              op.push(item)
            }
          });
        }
      })
      return op;
    },

    /**
     * 【逻辑删除】
     */
    onTableDataLogicDelete: function (_refName, callback) {
      let _this = this;
      let row = _this.$refs[_refName].selections[0]
      if (!row) {
        this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl || (this.dataUrl + 'update');
            let data = {};
            this.$utils.clone(row, data);
            data.oprType = "02";
            _this.$request({
              url: url,
              method: 'post',
              data: data
            }).then((response) => {
              if (response.code == '0') {
                // _this.$message({ message: '删除成功!', type: 'success' });
                //统一弹窗样式
                _this.$message.success("删除成功!");
                callback && callback()
              }
            }).catch(() => {
              // 处理请求失败的情况
              // _this.$message({ message: '删除失败!', type: 'error' });
              _this.$message.error("删除失败!");
            });
          }
        }
      });
    },

    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        // 是否指定form指定即按指定的赋值
        let refFormName = Object.keys(mapping).filter(item => item == 'refFormName');
        if (refFormName.length) {
          for (const item in mapping) {
            this.$refs[mapping[refFormName[0]]].formdata[mapping[item]] = data[item];
          }
        } else {
          for (const item in mapping) {
            this.formdata[mapping[item]] = data[item];
          }
        }

      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    /**
     * 参照公共的确认事件,针对表单数据命名为serachFormData专用
     */
    commonSelectFnSearch: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.searchFormdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.searchFormdata[item] = data[item];
        }
      }
    },

    // 列表金额格式化
    moneyFormat(row, col, val) {
      if (val) {
        let underFlag = false;
        // 针对数值小于0的场景
        if(val * 1 < 0){
          underFlag = true;
          val = val * -1;
        }

        val = val + '';

        // 默认精度
        var num = num && num > 0 && num <= 20 ? num : 2;
        var val = parseFloat((val + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = val.split('.')[0].split('').reverse();
        var r = val.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return underFlag ? ('-' + t.split('').reverse().join('') + '.' + r) : (t.split('').reverse().join('') + '.' + r);
      }else{
        return "0.00"
      }
    },
    // 利率格式化百分比
    rateFormat(row, col, val) {
      if (val) {
        return ((Math.round((val * 10000))) / 100.00).toFixed(2) + '%';
      }
    }
  }
};
export default mixinUtils;
