<!-- 
  @Created by   on 2021/5/17 下午9:46:42.
  @updated by
  @description 提前还款列表
-->

<template>
    <div>
        <yu-xform-q ref="refFormq" :field-data="queryFields" :more-data="moreQueryFields" :force-column="forceColumn" :thrift="thrift" :reset-button="resetButton" :float-search="displayMode" :columns="4" search-table="refTable"></yu-xform-q>
        <div class="yu-toolBar">
            <yu-button-group>
            <yu-button icon="plus" @click="addFn">新增</yu-button>
            <yu-button icon="edit" @click="modifyFn">修改</yu-button>
            <yu-button icon="document" @click="infoFn">详情</yu-button>
            <yu-button icon="yx-bin" @click="deleteFn">删除</yu-button>
            <yu-button icon="yx-file-excel" @click="exportFn">导出</yu-button>
            </yu-button-group>
        </div>
        <yu-xtable ref="refTable" row-number selection-type="radio" data-url="/trade/example/list" :hide-column="true">
            <yu-xtable-column prop="id" label="编码" width="110"></yu-xtable-column>
            <yu-xtable-column prop="title" label="名称" width="200" sortable></yu-xtable-column>
            <yu-xtable-column  prop="type" label="类型" width="110" data-code="NATIONALITY" type="input"></yu-xtable-column>
            <yu-xtable-column label="参与人" align="center">
            <yu-xtable-column prop="author" label="作者" width="110"></yu-xtable-column>
            <yu-xtable-column prop="auditor" label="审核人" width="110"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column prop="pageviews" label="阅读数" width="100"></yu-xtable-column>
            <yu-xtable-column prop="status" label="状态" width="120" data-code="PUBLISH_STATUS"></yu-xtable-column>
            <yu-xtable-column prop="createAt" label="时间"></yu-xtable-column>
        </yu-xtable>
        <!-- 说明: dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
            width="650px" height="380px" -->
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
            <yu-xform ref="refForm" label-width="100px" v-model="formdata" form-type="edit" :disabled="formDisabled">
            <yu-xform-group>
                <yu-xform-item label="名称" ctype="input" name="title" :rules="titleRules" :disabled="titleDisabled"></yu-xform-item>
                <yu-xform-item label="时间" ctype="datepicker" name="createAt"></yu-xform-item>
                <yu-xform-item label="作者" name="author" :hidden="true"></yu-xform-item>
                <yu-xform-item label="审核人" name="auditor" :disabled="auditorDisabled"></yu-xform-item>
                <yu-xform-item label="类型" ctype="select" name="type" data-code="NATIONALITY"></yu-xform-item>
                <yu-xform-item label="状态" ctype="select" name="status" data-code="PUBLISH_STATUS"></yu-xform-item>
                <yu-xform-item label="自定义" ctype="yufp-demo-selector" name="yourField"></yu-xform-item>
                <yu-xform-item label="点评" ctype="textarea" name="remark" :colspan="24" :rows="3"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
                <yu-button type="primary" @click="saveFn" icon="check" v-show="saveBtnShow">保存</yu-button>
                <yu-button type="primary" @click="cancelFn" icon="yx-undo2">取消</yu-button>
            </div>
            </yu-xform>
        </yu-xdialog>
    </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default {
    name: "d1_BillList",
    mixins:[mixinList],
    data: function () {
        return {
            queryFields: [{ placeholder: '标题', field: 'title', type: 'input' }, { placeholder: '时间', field: 'createAt', type: 'date' }, { placeholder: '类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' }],
            forceColumn: true, // 强制列紧随
            thrift: false, // 按钮是否是紧凑按钮，只显示图标
            resetButton: true, // 是否有重置按钮
            displayMode: false, // 高级搜索是否浮动
            moreQueryFields: [
            { placeholder: '作者', field: 'author', type: 'input' },
            { placeholder: '审核人', field: 'auditor', type: 'input' },
            { placeholder: '状态', field: 'status', type: 'select', dataCode: 'PUBLISH_STATUS' },
            { placeholder: '类型1', field: 'type1', type: 'select', dataCode: 'NATIONALITY' },
            { placeholder: '时间1', field: 'create_at1', type: 'date' },
            { placeholder: '时间2', field: 'create_at2', type: 'date' },
            { placeholder: '时间3', field: 'create_at3', type: 'date' },
            { placeholder: '类型2', field: 'type2', type: 'select', dataCode: 'NATIONALITY' }
            ],
            titleDisabled: true,
            auditorDisabled: true,
            saveBtnShow: false,
            formdata: {},
            titleRules: [{ required: true, message: '必填项', trigger: 'blur' }],
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        }
    },
    methods: {
        /**
        * 控制保存按钮、dialog-x、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
            var _this = this;
            _this.viewType = viewType;
            _this.formDisabled = !editable;
            if (_this.viewType == 'ADD') {
            _this.titleDisabled = false;
            _this.auditorDisabled = false;
            } else {
            _this.titleDisabled = true;
            _this.auditorDisabled = true;
            }
            _this.saveBtnShow = editable;
            _this.dialogVisible = true;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
        },
        /**
        * 保存
        */
        saveFn: function () {
          var validate = false;
          var _this = this;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/trade/example/save',
            data: _this.formdata,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
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
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
        },

        /**
         * 删除逻辑
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          yufp.service.request({
            method: 'POST',
            url: '/trade/example/delete',
            data: {
              ids: arr.join(',')
            },
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          var _this = this;
          yufp.util.exportExcelByTable({
            ref: _this.$refs.refTable,
            url: '/trade/example/list'
          });
        }
      }
}
</script>

