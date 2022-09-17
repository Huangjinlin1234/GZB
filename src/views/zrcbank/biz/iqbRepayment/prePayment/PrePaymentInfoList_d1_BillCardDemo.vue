<!-- 
  @Created by   on 2021/5/17 下午9:46:42.
  @updated by
  @description 提前还款列表
-->

<template>
    <div>
      <yu-panel title="提前还款列表" show-search-input placeholder="请输入" @search="fuzzyQuery" padding-top @toggle-fn="toggleFn">
        <template slot="right">
          <yu-button-drop type="button">
            <yu-button key="add" @click="handleClick">新增</yu-button>
            <yu-button key="start" @click="handleClick">启用</yu-button>
            <yu-button key="pause" @click="handleClick">停用</yu-button>
            <yu-button key="delete" @click="handleClick">删除</yu-button>
            <yu-button key="import" @click="handleClick">导入</yu-button>
            <yu-button key="export" @click="handleClick">导出</yu-button>
            <yu-button key="resetPwd" @click="handleClick">重置密码</yu-button>
          </yu-button-drop>
        </template>
        <template slot="search">
          <yu-input placeholder="自定义查询"></yu-input>
        </template>
        <template slot="filter">
          <yu-xform v-model="formdata" ref="refForm" related-table-name="refTable" label-width="90px" form-type="search">
            <yu-xform-group :column="2">
              <yu-xform-item label="姓名" placeholder="请输入" ctype="input" name="name"></yu-xform-item>
              <yu-xform-item label="工号" placeholder="请输入" ctype="input" name="num"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </template>
        <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="baseParams" :default-load="true">
          <yu-xtable-column label="业务流水号" prop=""></yu-xtable-column>
          <yu-xtable-column label="申请编号" prop=""></yu-xtable-column>
          <yu-xtable-column label="合同号" prop=""></yu-xtable-column>
          <yu-xtable-column label="借据号" prop=""></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop=""></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop=""></yu-xtable-column>
          <yu-xtable-column label="贷款业务名称" prop=""></yu-xtable-column>
          <yu-xtable-column label="提前还款金额" prop=""></yu-xtable-column>
          <yu-xtable-column label="申请时间" prop=""></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop=""></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
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

