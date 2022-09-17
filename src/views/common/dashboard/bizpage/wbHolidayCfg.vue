
<template>
    <!--
    @created by dongan
    @description 节假日配置界面
    -->
  <div >
      <yu-panel title="节假日信息" panel-type="normal">
          <yu-xform related-table-name="refTable" ref="searchForm" form-type="search" v-model="searchFormdata" label-width="100px" :custom-search-fn="searchFn" :custom-reset-fn="resetFn">
              <yu-xform-group :column="3">
              <yu-date-picker label="日期信息" value-format="yyyy-MM-dd"  v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
              <yu-xform-item label="日期标识" placeholder="---请选择---" name="type" ctype="select" data-code="STD_WB_DATE_TYPE" />
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
              <yu-button @click="addFn">新增</yu-button>
              <yu-button @click="modifyFn">修改</yu-button>
              <yu-button @click="deleteFn">删除</yu-button>
              <!-- <yu-button @click="synFn">节假日同步</yu-button>  日终同步-->
          </yu-button-drop>
          <yu-xtable ref="refTable" selection-type="checkbox" condition-key="condition" row-number :data-url="dataUrl" :base-params="params" :default-load="false" request-type="POST">
            <yu-xtable-column label="日期信息" prop="calendarDate"></yu-xtable-column>
            <yu-xtable-column label="日期标识" prop="type" data-code="STD_WB_DATE_TYPE"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>

      <!-- 新增、修改、查看表单弹窗 -->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
        <yu-xform ref="refForm" label-width="80px" v-model="formdata" >
          <yu-xform-group>
            <yu-xform-item label="日期" placeholder="日期" name="calendarDate"  rules="required" ctype="datepicker" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="类型" placeholder="类型" name="type"  rules="required" ctype="select" data-code="STD_WB_DATE_TYPE"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
            <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { lookup } from '@/utils';
lookup.reg('STD_WB_DATE_TYPE,CRUD_TYPE');

export default {
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/wbholidaycfg/',
      addUrl: backend.cmisCfg + '/api/wbholidaycfg/create',
      updateUrl: backend.cmisCfg + '/api/wbholidaycfg/update',
      batchDeleteUrl: backend.cmisCfg + '/api/wbholidaycfg/batchdelete/',
      activeName: '1',
      searchFormdata: {}, // 查询条件框
      formdata: {},
      params: { },
      param: {},
      pages: 10,
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      value: ''
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.params = { sort: 'calendar_date desc'};// 默认时间倒叙
  },
  methods: {
    // 自定义查询功能
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          if (_this.value != null && _this.value.length == 2) {
            _this.param = {
              condition: {
                startTime: _this.value[0],
                endTime: _this.value[1],
                type: _this.searchFormdata.type}
            };
          } else {
            _this.param = {condition: JSON.stringify(_this.searchFormdata)};
          }
          _this.$refs.refTable.remoteData(_this.param);
        } else {
          return;
        }
      });
    },
    // 自定义重置功能
    resetFn: function () {
      var _this = this;
      _this.value = null;
      _this.param = null;
      _this.$refs.searchForm.resetFields();
      _this.searchFn();
    },
    /**
     * 返回
     */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      if (viewType == 'ADD') {
        this.formDisabled = false;
      } else {
        this.formDisabled = true;
      }
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn();
      } else {
        this.editSaveFn();
      }
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        let obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].calendarDate);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.batchDeleteUrl + arr.join(','),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    /**
     * 新增-保存
     */
    addSaveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.addUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据新增成功！', type: 'info'});
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error'});
          }
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据更新成功！', type: 'info'});
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error'});
          }
        }
      });
    },
    /**
     * 节假日同步
     */
    synFn () {
    }
  }
};
</script>
