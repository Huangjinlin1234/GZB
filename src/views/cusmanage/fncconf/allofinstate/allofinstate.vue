<template>

  <div style="padding: 0 5px;">
  <yu-panel panel-type="normal" title="财务报表配置">
  <template slot="filter">
  <yu-xform related-table-name="refTable" form-type="search"  :remove-empty="true">
    <yu-xform-group :column="3" colspan="8">
      <yu-xform-item ctype="input" name="fncId" placeholder="报表编号" ></yu-xform-item>
      <yu-xform-item ctype="input" name="fncName" placeholder="财务报表名称" ></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
  </template>
    <yu-button-drop>
      <yu-button icon="yx-plus" @click="addFn">新增</yu-button>
      <yu-button icon="yx-pencil" @click="modifyFn">修改</yu-button>
      <yu-button icon="yx-bin" @click="deleteFn">删除</yu-button>
      <yu-button icon="yx-file-empty" @click="infoFn">查看</yu-button>
    </yu-button-drop>
  <yu-xtable ref="refTable" condition-key="condition" :data-url="dataUrl" selection-type="radio" :stripe="true">
    <yu-xtable-column label="报表编号" prop="fncId" width="80" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="财务报表名称" prop="fncName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="资产负债表样式编号" prop="fncBsStyleId" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="损益表编号（收入支出总表）" prop="fncPlStyleId" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="现金流量编号(事业支出明细表)" prop="fncCfStyleId" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="财务指标编号" prop="fncFiStyleId" width="120" header-align="left">
    </yu-xtable-column>
  </yu-xtable>
  </yu-panel>
  <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
     width="650px" height="380px" -->
  <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="900px">
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group colspan="12">
        <yu-xform-item ctype="input" name="fncId" placeholder="请输入报表编号" label="报表编号" :rules="rules" :disabled="fncIdAble"></yu-xform-item>
        <yu-xform-item ctype="input" name="fncName" placeholder="请输入财务报表名称" label="财务报表名称" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncBsStyleId" placeholder="请选择" label="资产负债表样式编号" :hidden="isPlainReport" :options="options['01']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncPlStyleId" placeholder="请选择" label="损益表编号(收入支付总表)" :hidden="isPlainReport" :options="options['02']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncCfStyleId" placeholder="请选择" label="现金流量编号(事业支出明细表)" :hidden="isPlainReport" :options="options['03']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncFiStyleId" placeholder="请选择" label="财务指标编号" :hidden="isPlainReport" :options="options['04']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncBssStyleId" placeholder="请选择" label="资产负债简表编号" :hidden="!isPlainReport" :options="options['13']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncPssStyleId" placeholder="请选择" label="利润简表编号" :hidden="!isPlainReport" :options="options['14']"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncFasStyleId" placeholder="请选择" label="财务分析简表编号" :hidden="!isPlainReport" :options="options['15']"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="yx-checkmark" type="primary" @click="saveFn">保存</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-xdialog>
</div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
export default {
  data: function () {
    return {
      rules: [
        { required: true, message: '必填项', trigger: 'blur'},
        { max: 6, message: '最大长度不超过6个字符', trigger: 'blur'}
      ],
      isPlainReport: false,
      fncIdAble: false, // 报表编号灰显初始化
      dataUrl: backend.cmisCus + '/api/nrcs-cms/fncconftemplate/q/fncconftemplate/list', // 列表查询接口
      formdata: {}, // 弹框数据
      dialogVisible: false, // 弹框默认关闭
      formDisabled: false, // 弹框数据默认不灰显
      viewType: 'DETAIL', // 表头初始化
      viewTitle: yufp.lookup.find('CRUD_TYPE', false), // 弹框类型控制
      saveBtnShow: true, // 保存按钮默认显示
      options: {} // 初始化
    };
  },
  methods: {
    // 根据条件显示封装不同的下拉列表 option12: [{'key': '01', 'value': '选项一'}],
    getOptions: function () {
      var _this = this;
      // 向后台发送查询请求
      yufp.service.request({
        method: 'GET',
        url: backend.cmisCus + '/api/nrcs-cms/fncconfstyles/q/fncconfstyles/all/list',
        callback: function (code, message, response) {
          if (response.code == '0') {
            let arr = response.data;
            for (let i = 0; i < arr.length; i++) {
              let el = arr[i];
              if (!_this.options[el['fncConfTyp']]) {
                _this.options[el['fncConfTyp']] = [];
                _this.options[el['fncConfTyp']].push({key: el['styleId'], value: '[' + el['styleId'] + ']' + el['fncConfDisName']});
              } else {
                _this.options[el['fncConfTyp']].push({key: el['styleId'], value: '[' + el['styleId'] + ']' + el['fncConfDisName']});
              }
            }
          }
        }
      });
    },
    /**
         * 取消
         */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    /**
         * 保存
         */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisCus + '/api/nrcs-cms/fncconftemplate/s/fncconftemplate/add'; // 新增接口
      if (_this.viewType == 'EDIT') {
        url = backend.cmisCus + '/api/nrcs-cms/fncconftemplate/s/fncconftemplate/update'; // 修改接口
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
            _this.dialogVisible = false;
          } else {
            _this.$message.error(response.message);
            _this.dialogVisible = false;
          }
        }
      });
    },
    /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },
    /**
         * 新增按钮
         */
    addFn: function () {
      var _this = this;
      _this.fncIdAble = false;
      _this.switchStatus('ADD', true);
      _this.isPlainReport = false; // 只能新增非简表
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /**
         * 修改
         */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.fncIdAble = true;
      var selection = _this.$refs.refTable.selections[0];
      _this.switchStatus('EDIT', !selection.fncBssStyleId); // 如果选中记录为简表则不允许修改
      if (selection.fncBssStyleId) {
        yufp.util.message({ message: '简表类型不可以修改!', type: 'warning' });
      }
      _this.$nextTick(function () {
        _this.isPlainReport = !!selection.fncBssStyleId;
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },
    /**
         * 详情
         */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('DETAIL', false);
      _this.isPlainReport = !!selectionsAry[0].fncBssStyleId;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },
    /**
         * 删除
         */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].fncBssStyleId) {
        return yufp.util.message({ message: '简表类型不可以删除!', type: 'warning' });
      }
      var len = selections.length, arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCus + '/api/nrcs-cms/fncconftemplate/s/fncconftemplate/delete', // 删除接口
              data: {
                fncId: selections[0].fncId // 主键
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message.success('删除成功');
                  _this.$refs.refTable.remoteData();
                  _this.dialogVisible = false;
                } else {
                  _this.$message.error(response.message);
                  _this.dialogVisible = false;
                }
              }
            });
          }
        }
      });
    }
  },
  mounted: function () {
    var _this = this;
    _this.getOptions();
  }
};
</script>