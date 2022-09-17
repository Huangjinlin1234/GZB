
<template>
  <div>
    <yu-row :gutter="24">
      <yu-col :span="5">
        <yu-panel title="单一客户授信申报" class="adjust-height">
          <yu-xtree style="min-width: 174px;" ref="refTree" :height="height - 20" @node-click="nodeClickFn" data-url="/trade/example/tree" data-id="UNITID" data-label="UNITNAME" data-pid="SUPERUNITID" :data-async="async" :data-params="param" data-root="500"></yu-xtree>
        </yu-panel>
      </yu-col>
      <yu-col :span="19">
        <yu-panel title="快速查询" panel-type="combination" :hide-filter="false">
          <template slot="right">
            <yu-tool-bar>
              <yu-button  type="primary" @click="addFn">新增</yu-button>
              <yu-button  type="primary" @click="modifyFn">修改</yu-button>
              <yu-button  type="primary" @click="infoFn">详情</yu-button>
            </yu-tool-bar>
          </template>
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="4">
                <yu-xform-item label="标题" placeholder="标题" ctype="input" name="title"></yu-xform-item>
                <yu-xform-item label="类型" placeholder="类型" ctype="select" name="type" data-code="NATIONALITY">
                </yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl">
            <yu-xtable-column label="编码" prop="id"></yu-xtable-column>
            <yu-xtable-column label="名称" prop="title" sortable></yu-xtable-column>
            <yu-xtable-column label="类型" prop="type" data-code="NATIONALITY"></yu-xtable-column>
            <yu-xtable-column label="阅读数" prop="pageviews"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" data-code="PUBLISH_STATUS"></yu-xtable-column>
            <yu-xtable-column label="时间" prop="createAt"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";


export default {
  components: { YufpDemoSelector },
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBizService + "/api/lmtapp/",
      formdata: {},
      rule: [
        {
          required: true,
          message: "必填项",
          trigger: "blur"
        },
        {
          validator: yufp.validator.number,
          message: "数字",
          trigger: "blur"
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false),
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function() {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function() {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function(valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: "POST",
        url: "/trade/example/save",
        data: model,
        callback: function(code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message("操作成功");

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function(viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function() {
      var _this = this;

      _this.switchStatus("ADD", true);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function() {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      this.$router.addTab({
        name: "demo/demo1",
        title: "单一客户授信申请修改",
        key: null,
        data: {
          userId: this.userId
        }
      });

    },

    /**
     * 详情
     */
    infoFn: function() {
      var _this = this;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      _this.switchStatus("DETAIL", false);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function() {
      var _this = this;

      var selections = _this.$refs.refTable.selections;

      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      var len = selections.length,
        arr = [];

      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }

      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function(action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url: "/trade/example/delete",
              data: {
                ids: arr.join(",")
              },
              callback: function(code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message("操作成功");
              }
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function() {
      var _this = this;

      yufp.util.exportExcelByTable({
        fileName: "导出",
        importType: "service",
        ref: _this.$refs.refTable,
        url: "/trade/example/list"
      });
    }
  }
};
</script>
