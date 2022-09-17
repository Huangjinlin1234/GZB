
import * as xutils from '@/utils/xutils.js';
// import backend from '@/config/constant/app.data.service'
// 表格组件,最重要的组件之一
var listMixin = {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {}
    };
  },
  created: function () {
    this.rowClickAction = []; // 行点击事件
    this.rowDBClickAction = []; // 行点击事件
    this.cellClickAction = []; // 单元格 点击事件
    this.buttonClickAction = {}; // 按钮点击事件
    this.selectAction = [];// 表格多选时，选中一条数据
    this.custQueryAction = null;
    this.beforeQueryAction = null;
    this.afterAddInitAction = null;
    this.afterEditInitAction = null;
  },
  mounted: function () {
    this.table = this.$refs.refTable;
  },
  methods: {
    /**
     * @description 获取选中数据
     * @return {Object} 选中行数据对象
     */
    getSelectedRowData: function () {
      return this.$refs.refTable.selections[0];
    },

    /**
       * @description 获取选中数据行号,单选
       * @return {String} 返回选中行行号
       */
    getSelectedRowIndex: function () {
      this.$refs.refTable.selections[0]._Vkey;
    },

    /**
       * @description 获取选中数据，多选，默认返回数组
       * @return {Array<Object>} 选中行数据对象数组
       */
    getSelectedRowsData: function () {
      return this.$refs.refTable.selections;
    },

    /**
       * 直接在表格中插入一行数据,而且插入最上面
       * @param {String|Integer} _row 行号
       * @param {Object} _rowData 行数据
       */
    addRowData: function (_row, _rowData) {
      this.$refs.refTable.tabledata.push(_rowData);
    },

    /**
       * 获取全部数据
       * @return {Array<Object>}
       */
    getAllData: function () {
      return this.$refs.refTable.tabledata;
    },

    /**
       * 获取BillList所有数据,不知道这个与上面的getAllData()方法是否返回的结果一样？？
       */
    getBillListData: function () {
      return this.getAllData(); //
    },

    /**
       * 设置行号选中, 用于单选表格
       * @param {String|Integer} _row 行号
       * @param {Boolean} _select 是否选中
       */
    setSelectedRow: function (_row, _select) {
      var row = this.getRowDataByRowId(_row);
      if (row) {
        this.$refs.refTable.setCurrentRow(row);
      }
    },

    /**
       * 根据行号设置选中,支持多个值逗号分隔!!!xch--这个方法有问题,PK应该是表格的业务主键才对,这里其实是rowid
       * @param {String|Integer} _pkvalue 主键值
       */
    setSelectedRowByPK: function (_pkvalue) {
      var pks = (_pkvalue + '').split(',');
      for (var i = 0, l = pks.length; i < l; i++) {
        this.setSelectedRow(pks[i], true);
      }
    },

    /**
       * 清空所有选中行, 用于多选表格
       */
    clearSelected: function () {
      this.$refs.refTable.clearSelection();
    },

    /**
       * 选中所有行数据
       */
    selectedAll: function () {
      this.$refs.refTable.selectAll();
    },

    /**
     * 设置某一项或几项是否显示
     * @param {*} _itemKey 字符串 示例：【单字段  'username'】 【多字段 'username;usercode'】
     * @param {*} _editable 布尔值 true：显示  false：不显示
     */
    setBillListItemVisiable: function (_itemKeys, _visiable) {
      if (_visiable) {
        this.setShowColumns(_itemKeys);
      } else {
        this.setHiddenColumns(_itemKeys);
      }
    },

    /**
       * 设置显示某一列,支持多列逗号分隔配置
       * @param {String} _itemkeys 字段名称
       */
    showColumns: function (_itemkeys) {
      // TO-DO
      this.table.setShowColumns(_itemkeys.split(';'));
    },

    /**
       * 设置隐藏某一列,支持多列逗号分隔配置
       * @param {String} _itemkeys 字段名称
       */
    hiddenColumns: function (_itemkeys) {
      // TO-DO
      this.table.setHiddenColumns(_itemkeys.split(';'));
    },
    /**
       * 设置行数据
       * @param {String|Integer} _row 行号
       * @param {Object} _data 数据对象
       */
    setRowData: function (_row, _data) {
      var tabledata = this.table.tabledata;
      if (_row > tabledata.length) {
        console.error('setRowData: 行号不存在！');
        return;
      }
      tabledata.splice(_row - 1, 1, _data);
    },

    // 删除当前行
    removeCurrRow: function () {
      var rowData = this.getSelectedRowData();
      if (rowData == null) {
        return;
      }
      const index = this.table.tabledata.indexOf(rowData);
      if (index > -1) {
        this.table.tabledata.splice(index, 1);
      }
    },


    /**
       * 重置所有数据
       * @param {Array<Object>} _datas 数据集
       */
    setAllData: function (_datas) {
      this.setBillListData(_datas);
    },

    /**
       * 清空数据
       */
    clearAllData: function () {
      this.table.clearData();
    },
    /**
       * 获取按钮vue实例
       * @param {String} _btnCode 按钮编码
       */
    getBillListButton: function (_btnCode) {
      return this.$refs['btn_' + _btnCode];
    },

    /**
     * 设置列表上某个按钮消失
     * @param {String} btnCode 按钮编码
     * @param {Boolean} disabled 设置是否可点击 disabled
     * @param {Integer} index 按钮索引号
     */
    setBillListButtonVisable: function (btnCode, _enable) {
      var btn = this.getBillListButton(btnCode) || this.getButtonObjByText(btnCode);
      if (btn) {
        btn.varVisiabled = _enable;
      }
    },
    // 兼容yuxp 不对外暴露使用
    getButtonObjByText: function (btnCode) {
      for (let item in this.$refs) {
        if (this.$refs[item].$options && this.$refs[item].$options._componentTag === 'yu-button') {
          const text = this.$refs[item].$el.innerText;
          if (btnCode === text) {
            return this.$refs[item];
          }
        }
      }
      return null;
    },
    /**
       * 设置列表上某个按钮灰掉
       * @param {String} btnCode 按钮编码
       * @param {Boolean} disabled 设置是否可点击 disabled
       * @param {Integer} index 按钮索引号
       */
    setBillListButtonEnable: function (btnCode, _enable) {
      var btn = this.getBillListButton(btnCode);
      if (btn) {
        btn.varDisabled = _enable;
      }
    },

    /**
       * 直接设置BillList的数据
       * @param {Array<Object>} _data 表格数据数组
       */
    setBillListData: function (_data) {
      this.clearAllData();
      this.$refs.refTable.tabledata = _data;
    },

    /**
       * 设置补充SQL条件
       */
    setAppendSQLCondition: function (_sql) {
      // 追加参数
      xutils.clone({condition: this.dealDataCondition(_sql)}, this.baseParams);
    },
    doAutoQuery: function (queryCondition) {
      this.queryDataByCondition(queryCondition);
    },
    /**
       * 查询数据
       * @param {Object} _cons 查询条件
       * @param {Object} _orderby 排序条件
       * @param {Object} _isAutoQuery 是否自动查询 true/false
       */
    queryDataByCondition: function (_cons, _orderby, _isAutoQuery) {
      if (_cons) {
        if (typeof _cons === 'object') {
          const condition = xutils.toUpperCase(_cons, true);
          this.table.remoteData({ condition: JSON.stringify(_cons) });
        } else {
          let queryParam = this.dealDataCondition(_cons);
          this.table.remoteData({ condition: JSON.stringify(queryParam) });
        }
      } else {
        this.table.remoteData();
      }
    },

    /**
     * 添加新增弹窗弹出后事件
     * @param {*} _action
     */
    addAfterAddInitAction: function (_action) {
      this.afterAddInitAction = _action;
    },

    // 【新增】按钮逻辑
    onBillListInsert: function (_par, _src, _event) {
      this.dialogTitle = '新增';
      this.dialogVisible = true;
      this.formType = 'ADD';
      // this.$refs['dialog_BillCard'].$refs.refForm.resetFields();
      this.$nextTick(() => {
        this.$refs['dialog_BillCard'].formType = 'edit';
        this.$refs['dialog_BillCard'].$refs.refForm.resetFields();
        this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula && this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula();
        this.$refs['dialog_BillCard'].initFormData && this.$refs['dialog_BillCard'].initFormData();
      });
    },
    // 对应tableDataLoaded
    onLoaded: function (data, total, response) {

    },
    // onRowClick
    onRowClick: function (row, event, column, index) {
      for (let i = 0; i < this.rowClickAction.length; i++) {
        this.rowClickAction[i](row, event, column, index);
      }
    },
    onRowDBClick: function (row, event, column, index) {
      for (let i = 0; i < this.rowDBClickAction.length; i++) {
        this.rowDBClickAction[i](row, event, column, index);
      }
    },
    onCellClick: function (row, column, cell, event) {
      for (var i = 0; i < this.cellClickAction.length; i++) {
        var action = this.cellClickAction[i];
        action(row, column, cell, event);
      }
    },
    // 自定义按钮事件
    customBtnAction: function (actionName) {
      this.$parent[actionName] && this.$parent[actionName]();
    },
    /**
     * 添加编辑弹窗弹出后事件
     * @param {*} _action
     */
    addAfterEditInitAction: function (_action) {
      this.afterEditInitAction = _action;
    },

    // 【修改】按钮逻辑
    onBillListUpdate: function (event, onlyview) {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      this.dialogTitle = onlyview === true ? '查看' : '修改';
      if (onlyview === true) {
        this.formType = 'VIEW';
      } else {
        this.formType = 'EDIT';
      }
      this.dialogVisible = true;
      this.$nextTick(function () {
        this['dialog_BillCard'] = this.$refs['dialog_BillCard'];
        this['dialog_BillCard'].$refs.refForm.resetFields();
        this.$nextTick(function () {
          if (this.formType == 'EDIT') {
            this['dialog_BillCard'].formType = 'edit';
          }
          xutils.clone(row, this['dialog_BillCard'].formdata);
          if (this['dialog_BillCard'].formdatautrace) {
            xutils.clone(row, this['dialog_BillCard'].formdatautrace);
            if (this['dialog_BillCard'].utrace === false) { this['dialog_BillCard'].utrace = true }
          }
          if (this.formType == 'VIEW') {
            this['dialog_BillCard'].formType = 'details';
          }
        });
      });
    },

    /**
       * 【删除】
       */
    onBillListDelete: function () {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: function (action) {
          if (action === 'confirm') {
            _this.$request({
              url: _this.deleteUrl + row[_this.pkField],
              // params: row[_this.pkField],
              method: 'post'
            }).then((response) => {
              if (response.code == '0') {
                _this.doAutoQuery();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    },

    /**
     * 【逻辑删除】
     */
    onBillListLogicDelete: function (rowid) {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            var url = this.logicDeleteUrl || (this.dataUrl + 'update');
            var keyValue = row[this.pkField];
            var data = {'oprType': '02'};
            data[this.pkField] = keyValue;
            _this.$request({
              url: url,
              method: 'post',
              data: data
            }).then((response) => {
              if (response.code == '0') {
                _this.doAutoQuery();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    },

    /**
       * 【查看】
       */
    onBillListView: function (event) {
      this.onBillListUpdate(event, true);
    },
    /**
       * 【上传】上传列表
       */
    onBillListUploadAdd: function () {

    },

    /**
       * 【下载】上传列表
       */
    onBillListUploadDownload: function () {

    },

    /**
       * 【删除】上传列表
       */
    onBillListUploadDelete: function () {
      var _this = this;
      var jsoRowData = _this.getSelectedRowData();
      if (jsoRowData == null) {
        this.$msgbox.alert('必须选择一条记录进行操作!');
        return;
      }
      xutils.request({
        url: this.$backend.fileService + '/api/file/provider/deleteFile',
        type: 'get',
        data: {
          fileId: jsoRowData.file_path
        },
        success: function (resp) {
          _this.refreshCurrentPage();
        },
        error: function () {
          _this.refreshCurrentPage();
        }
      });
    },

    // 重置表格高度.
    resetHeight: function (_resizeHeight) {
      // TO-DO
    },

    // 第二种重绘,就是内部本身隐藏查询框,这里整体高度不变,只是fixed的高度变了,然后重绘表格
    resetHeight2: function (_resizeHeight) {
      // TO-DO
    },

    /**
       * 【发起流程】,与工作流可能有点麻烦
       */
    onBillListStartFlow: function () {
      // TO-DO
    },
    /**
       * 由用户人工添加单击事件
       * @param {Function} _action 事件方法
       */
    addRowClickAction: function (_action) {
      this.rowClickAction.push(_action); //
    },

    /**
       * 由用户人工添加单元格单击事件
       * @param {Function} _action 事件方法
       */
    addCellClickAction: function (_action) {
      this.cellClickAction.push(_action); //
    },

    /**
       * 由开发者人工添加双击事件
       * @param {Function} _action 事件方法
       */
    addRowDBClickAction: function (_action) {
      this.rowDBClickAction.push(_action); //
    },

    /**
       * 由开发者人工添加按钮事件
       * @param {String} _btnCode 按钮编码
       * @param {Function} _action 按钮对应得执行事件
       */
    addButtonAction: function (_btnCode, _action) {
      var btnObj = this.getBillListButton(_btnCode);
      if (btnObj == null) {
        return;
      }
      var _this = this;
      btnObj.removeAttribute('onclick'); // 一定要先清除原来的属性
      btnObj.addEventListener('click', function (_event) {
        _action(btnObj, _event, _this);
      });
    },

    /**
       * 设置查询之前的逻辑函数
       * @param {Function} _action 执行方法
       */
    addBeforeQueryAction: function (_action) {
      this.beforeQueryAction = _action; //
    },


    /**
       * 设置查询之后的逻辑函数,到底是在BillList中还是BillQuery中,有点犹豫
       * @param {Function} _action 执行方法
       */
    addAfterQueryAction: function (_action) {
      this.afterQueryAction = _action; //
    },

    /**
       * 设置查询的自定义逻辑函数
       * @param {Function} _action 执行方法
       */
    addCustQueryAction: function (_action) {
      // 经反复深度思考与试验，查询逻辑还是转到查询框中更合理!!查询框与BillList是互相绑定
      if (this.custQueryAction != null) {
        this.custQueryAction = _action;
      }
    },
    // 刷新当前行.
    refreshCurrentRow: function (_oldRowData) {
      // TO-DO
      this.table.remoteData();
    },
    /**
       * 获取表格列的简单信息
       */
    getBillListColumns: function () {
      return this.$refs.refTable.getTableColumns();
    },

    /**
       * 下载数据成Excel
       */
    downloadBillListDataAsExcel: function () {

    },

    /**
       * 下载数据成Csv
       */
    downloadBillListDataAsCsv: function () {

    },
    jqAddJsonData: function (data) {
      this.setBillListData(data);
    },
    /**
     * jqgrid 自身的addJSONData 方法可以添加数据，但是数据不能赋值到内部的row变量上，
     * 在使用排序时会获取本地数据（这个过程在jqgrid 内部）row，但是取不到，
     * @param {*} data
     */
    addJSONData: function (data) {
      this.setBillListData(data);
    },
    customSearch: function () {
      // 逻辑重写
      let dt = xutils.clone(this.searchFormdata, {});
      for (const item in dt) {
        if (dt[item] === '' || dt[item] === null || dt[item] === undefined || (dt[item] instanceof Array && dt[item].length === 0)) {
          delete dt[item];
        } else {
          const formItem = xutils.getItemRef(this.$refs.refForm.$children, item);
          if (formItem && formItem.fuzzyQuery) {
            if (formItem.fuzzyQuery == 'left') {
              dt[item] = '%' + dt[item];
            } else if (formItem.fuzzyQuery == 'right') {
              dt[item] = dt[item] + '%';
            } else if (formItem.fuzzyQuery == 'both') {
              dt[item] = '%' + dt[item] + '%';
            }
          }
        }
      }
      if (JSON.stringify(dt) == '{}') {
        dt = '';
      }
      if (this.custQueryAction) {
        this.this.custQueryAction(dt);
        return;
      }
      if (this.beforeQueryAction) {
        var rst = this.beforeQueryAction(dt);
        if (rst === false) {
          return;
        }
      }
      this.$refs.refTable.remoteData({ condition: JSON.stringify(dt) });
    },
    // onSelect: function () {
    //   for (var i = 0; i < this.select.length; i++) {
    //     var el = this.select[i];
    //     this.selectionAction(selection, row);
    //   }
    // },
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
    // 将sql的条件组装成json格式
    dealDataCondition: function (_cons) {
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
              cond[1] = cond[1].substring(0, cond[1].lastIndexOf('\''));
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
      const arr = typeof selections == 'string' ? selections.split(',') : selections;
      const selectOptions = this.$refs.refForm[itemkey + 'Options'];
      if (!selectOptions) {
        return;
      }
      if (type == 'hidden') {
        for (let i = 0; i < selectOptions.length; i++) {
          var element = selectOptions[i];
          if (arr.indexOf(element.value) > -1 || arr.indexOf(element.innerText) > -1) {
            selectOptions.splice(i, 1);
          }
        }
      } else if (type == 'add') {
        for (let i = 0; i < arr.length; i++) {
          selectOptions.push(arr[i]);
        }
      } else if (type == 'replaceAll') {
        while (selectOptions.lenth > 0) {
          selectOptions.pop();
        }
        for (let i = 0; i < arr.length; i++) {
          selectOptions.push(arr[i]);
        }
      }
    },
    setBillQueryItemEditable: function (_itemKey, _editable) {
      if (_itemKey.indexOf(';') > 0) {
        var _itemKeys = _itemKey.split(';');
        for (var i = 0; i < _itemKeys.length; i++) {
          this.$refs.refForm.setItemDisabled(_itemKeys[i], !_editable);
        }
      } else {
        this.$refs.refForm.setItemDisabled(_itemKey, !_editable);
      }
    },
    // addCustQueryAction: function () {

    // },
    getBillQueryValue: function () {
      return this.refs.refForm.searchFormdata;
    },
    setBillQueryItemVisible: function (_itemKey, _visible) {
      if (_itemKey.indexOf(';') > 0) {
        var _itemKeys = _itemKey.split(';');
        for (var i = 0; i < _itemKeys.length; i++) {
          _itemKeys[i] = xutils.toHump(_itemKeys[i]);
          this.refs.refForm.setItemHidden(_itemKeys[i], !_visible);
        }
      } else {
        _itemKey = xutils.toHump(_itemKey);
        this.refs.refForm.setItemHidden(_itemKey, !_visible);
      }
    },
    setBillQueryItemValue: function (_itemKey, _itemValue) {
      _itemKey = xutils.toHump(_itemKey);
      this.refs.refForm.searchFormdata[_itemKey] = _itemValue;
    },
    setBillCardValue: function (data) {
      xutils.clone(data, this.refs.refForm.searchFormdata);
    },
    getBillQueryItemValue: function (_itemKey) {
      return this.refs.refForm.searchFormdata[_itemKey];
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    },
    // 根据name 获取item对应的组件 不对外暴露
    getCompByName: function (itemkey) {
      var item = xutils.getItemRef(this.$refs.refForm.$children, itemkey);
      var ctypeComp = item.$children[0].$children[0];
      return ctypeComp;
    }
  }
};
export default listMixin;