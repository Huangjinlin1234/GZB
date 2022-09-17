
<!-- 流程关联机构配置 -->
<template>
  <div>
    <yu-panel title="流程关联机构配置">
      <template slot="right">
        <yu-toolbar>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
          <yu-button @click="viewFn">查看</yu-button>
        </yu-toolbar>
      </template>
      <yu-xform v-model="queryForm" ref="searchForm" related-table-name="refTable" :remove-empty="true">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" placeholder="请输入" ctype="select" name="bizType" :colspan="6" :options="bizTypes"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="请输入" ctype="input" name="flowName" fuzzy-query="both" :colspan="6"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable row-number ref="refTable" :data-url="queryUrl">
        <yu-xtable-column prop="bizType" label="业务类型" :options="bizTypes">
        </yu-xtable-column>
        <!-- <yu-xtable-column prop="orgId" label="机构号">
        </yu-xtable-column> -->
        <yu-xtable-column prop="orgName" label="机构名称">
        </yu-xtable-column>
        <!-- <yu-xtable-column prop="flowId" label="流程编号">
        </yu-xtable-column> -->
        <yu-xtable-column prop="flowName" label="流程名称">
        </yu-xtable-column>
      </yu-xtable>

      <!-- 增、改、查弹框 -->
      <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" @close="cancelFn">
        <yu-xform ref="refForm" label-width="100px" label-suffix="：" v-model="formdata" :disabled="disabled.form">
          <yu-xform-group>
            <yu-xform-item label="业务类型" rules="required" ctype="select" name="bizType" :options="bizTypes" @change="changeFn" :disabled="disabled.bizType"></yu-xform-item>
            <yu-xform-item label="适用机构" rules="required" ctype="yufp-org-tree" name="orgId"></yu-xform-item>
            <yu-xform-item label="流程编号" :hidden="hidden.flowId" placeHolder="点击右侧图标搜索" rules="required" ctype="input" name="flowId" :disabled="true" icon="search" @click="openFlowDialog"></yu-xform-item>
            <yu-xform-item label="流程名称" :hidden="hidden.flowName" rules="required" ctype="input" name="flowName" :disabled="true"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div slot="footer" class="dialog-footer">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="updateBtnShow" type="primary" @click="updateFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xdialog>

      <!-- 流程选择弹框 -->
      <yu-xdialog :visible.sync="flow.dialogVisible" @close="flowCancelFn">
        <yu-xform ref="flowRefForm" v-model="flow.queryForm" related-table-name="flowRefTable" form-type="search" :remove-empty="true">
          <yu-xform-group :column="3">
            <yu-xform-item label="流程编号" placeholder="请输入" ctype="input" name="flowId" :colspan="8"></yu-xform-item>
            <yu-xform-item label="流程名称" placeholder="请输入" ctype="input" name="flowName" fuzzy-query="both" :colspan="8"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable row-number ref="flowRefTable" :data-url="flow.queryUrl" :base-params="flow.baseParams">
          <yu-xtable-column prop="flowId" label="流程编号">
          </yu-xtable-column>
          <yu-xtable-column prop="flowName" label="流程名称">
          </yu-xtable-column>
        </yu-xtable>
        <div slot="footer" class="dialog-footer">
          <yu-button type="primary" @click="selectFn">选择</yu-button>
          <yu-button type="primary" @click="flowCancelFn">取消</yu-button>
        </div>
      </yu-xdialog>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validator } from "@/utils/validate";
import YufpOrgTree from "@/components/widgets/YufpOrgTree/index.vue";
export default {
  components: { YufpOrgTree },
  data: function() {
    var _this = this;
    return {
      queryForm: {},
      queryUrl: backend.workflowService + "/api/bizorg/getdetail",
      insertUrl: backend.workflowService + "/api/bizorg/",
      updateUrl: backend.workflowService + "/api/bizorg/update",
      deleteUrl: backend.workflowService + "/api/bizorg/delete",
      dialogVisible: false,
      formdata: {},
      saveBtnShow: true,
      updateBtnShow: false,
      dialogTitle: "",
      disabled: {
        form: false,
        bizType: false
      },
      hidden: {
        flowId: false,
        flowName: false
      },
      flow: {
        baseParams: {
          condition: {}
        },
        dialogVisible: false,
        queryUrl: backend.workflowService + "/api/biz/"
      },
      bizTypes: []
    };
  },
  computed: {
    ...mapGetters(["org"])
  },
  mounted: function() {
    var _this = this;
    yufp.service.request({
      method: "GET",
      url: _this.flow.queryUrl,
      callback: function(code, message, response) {
        if (response.code == 0 && null != response.data) {
          var datas = response.data;
          for (var i = 0; i < datas.length; i++) {
            var opt = {
              key: datas[i].bizType,
              value: datas[i].ext
            };
            _this.bizTypes.push(opt);
          }
        } else {
          _this.$message({
            duration: 4000,
            message: "业务类型查询失败",
            type: "warning"
          });
        }
      }
    });
  },
  methods: {
    addFn: function() {
      var _this = this;
      _this.dialogVisible = true;
      _this.dialogTitle = "新增";

      _this.disabled.form = false;
      _this.disabled.bizType = false;
      _this.hidden.flowId = true;
      _this.hidden.flowName = true;
      _this.saveBtnShow = true;
      _this.updateBtnShow = false;

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
      });
    },
    modifyFn: function() {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ type: "warning", message: "请先选择一条记录!" });
        return;
      }
      _this.dialogVisible = true;
      _this.dialogTitle = "修改";

      _this.disabled.form = false;
      _this.disabled.bizType = true;
      _this.hidden.flowId = false;
      _this.hidden.flowName = false;
      _this.saveBtnShow = false;
      _this.updateBtnShow = true;

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
        yufp.clone(selections[0], _this.formdata);
      });
    },
    deleteFn: function() {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ type: "warning", message: "请先选择一条记录!" });
        return;
      }

      var params = "?bizType=" + selections[0].bizType;
      params += "&flowId=" + selections[0].flowId;
      params += "&orgId=" + selections[0].orgId;
      yufp.service.request({
        method: "POST",
        url: _this.deleteUrl + params,
        callback: function(code, message, response) {
          if (response.data > 0) {
            _this.$refs.refTable.remoteData();
            _this.$message({
              duration: 6000,
              message: "删除成功",
              type: "success"
            });
          } else {
            _this.$message({
              duration: 4000,
              message: "删除失败",
              type: "warning"
            });
          }
        }
      });
    },
    saveFn: function() {
      var _this = this;
      var isValid = true;
      _this.$refs.refForm.validate(function(result) {
        isValid = result;
      });
      if (!isValid) {
        return;
      }

      var model = _this.formdata;
      yufp.service.request({
        method: "POST",
        url: _this.insertUrl,
        data: model,
        callback: function(code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message({
              duration: 6000,
              message: "新增成功!",
              type: "success"
            });
            _this.dialogVisible = false;
          } else {
            _this.$message({
              duration: 4000,
              message: "新增异常:" + response.message.substring(0, 100),
              type: "error"
            });
          }
        }
      });
    },
    updateFn: function() {
      var _this = this;
      var isValid = true;
      _this.$refs.refForm.validate(function(result) {
        isValid = result;
      });
      if (!isValid) {
        return;
      }

      var model = _this.formdata;
      yufp.service.request({
        method: "POST",
        url: _this.updateUrl,
        data: model,
        callback: function(code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message({
              duration: 6000,
              message: "修改成功!",
              type: "success"
            });
            _this.dialogVisible = false;
          } else {
            _this.$message({
              duration: 4000,
              message: "修改异常:" + response.message.substring(0, 100),
              type: "error"
            });
          }
        }
      });
    },
    cancelFn: function() {
      this.dialogVisible = false;
      this.$refs.refForm.resetFields();
    },
    viewFn: function() {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ type: "warning", message: "请先选择一条记录!" });
        return;
      }
      _this.dialogVisible = true;
      _this.dialogTitle = "查看";

      _this.disabled.form = true;
      _this.disabled.bizType = true;
      _this.saveBtnShow = false;
      _this.updateBtnShow = false;
      _this.hidden.flowId = false;
      _this.hidden.flowName = false;

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
        yufp.clone(selections[0], _this.formdata);
      });
    },
    selectFn: function() {
      var _this = this;
      var selections = _this.$refs.flowRefTable.selections;
      if (selections.length > 0) {
        _this.formdata.flowId = selections[0].flowId;
        _this.formdata.flowName = selections[0].flowName;
      }
      _this.flow.dialogVisible = false;
      _this.$refs.flowRefForm.resetFields();
    },
    flowCancelFn: function() {
      this.flow.dialogVisible = false;
      this.$refs.flowRefForm.resetFields();
    },
    openFlowDialog: function() {
      this.flow.dialogVisible = true;
    },
    changeFn: function(newValue) {
      if (newValue == "") {
        this.hidden.flowId = true;
        this.hidden.flowName = true;
      } else {
        this.hidden.flowId = false;
        this.hidden.flowName = false;
        this.flow.baseParams.condition.bizType = newValue;
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            bizType: model.bizType ? '%' + model.bizType + '%' : "",
            flowName: model.flowName ? '%' + model.flowName + '%' : ""
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.refTable.remoteData(param);
        }
      })
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    },
  }
};
</script>
