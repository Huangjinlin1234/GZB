<!--报表样式-->
<template>
  <div>
    <yu-panel title="报表样式配置">
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
          <yu-button @click="detailFn">查看</yu-button>
          <yu-button @click="copyFn">复制</yu-button>
        </yu-button-drop>
      </template>
      <template slot="filter">
        <yu-xform
          v-model="formdata"
          ref="refBaseForm"
          related-table-name="refTable"
          label-width="110px"
        >
          <yu-xform-group :column="3">
            <yu-xform-item
              label="报表样式编号"
              placeholder="请输入"
              ctype="input"
              name="styleId"
            ></yu-xform-item>
            <yu-xform-item
              label="显示名称"
              placeholder="请输入"
              ctype="input"
              name="fncConfDisName"
            ></yu-xform-item>
            <yu-xform-item
              label=" "
              label-suffix=" "
              ctype="custom"
              name="custom"
              colspan="8"
              class="yu-adjust"
            >
              <yu-button type="primary" @click="search">查询</yu-button>
              <yu-button @click="resetFormFn">重置</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" :data-url="dataUrl" selection-type="radio">
        <yu-xtable-column label="报表样式编号" prop="styleId" min-width="140">
        </yu-xtable-column>
        <yu-xtable-column
          label="报表名称"
          prop="fncName"
          min-width="140"
        ></yu-xtable-column>
        <yu-xtable-column
          label="显示名称"
          prop="fncConfDisName"
          min-width="120"
        ></yu-xtable-column>
        <yu-xtable-column
          label="所属报表种类"
          prop="fncConfTyp"
          data-code="STD_ZB_FNC_CONFTYP"
          min-width="120"
        ></yu-xtable-column>
        <yu-xtable-column
          label="数据列数"
          prop="fncConfDataCol"
          data-code="STD_ZB_FNC_COL"
          min-width="120"
        ></yu-xtable-column>
        <yu-xtable-column
          label="栏位"
          prop="fncConfCotes"
          data-code="STD_ZB_FNC_COTES"
          min-width="120"
        >
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 编辑 -->
    <yu-xdialog
      :title="viewTitle[viewType]"
      class="no-body-padding xdialog-adjust"
      :middle="true"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata">
        <yu-panel title="报表样式列表" panel-type="simple">
          <yu-row>
            <yu-col :span="24">
              <yu-xform-item
                label="报表样式编号"
                ctype="input"
                :disabled="isEdit"
                placeholder="请输入报表样式编号"
                name="styleId"
                :rules="rule[0]"
              ></yu-xform-item>
              <yu-xform-item
                label="所属报表种类"
                ctype="select"
                :disabled="isCopy"
                placeholder="请选择"
                data-code="STD_ZB_FNC_CONFTYP"
                name="fncConfTyp"
                :rules="rule[0]"
              >
              </yu-xform-item>
              <yu-xform-item
                label="报表名称"
                placeholder="请输入报表名称"
                :colspan="24"
                ctype="input"
                name="fncName"
                :rules="rule[0]"
              >
              </yu-xform-item>
              <yu-xform-item
                label="显示名称"
                ctype="input"
                placeholder="请输入显示名称"
                name="fncConfDisName"
                :rules="rule[0]"
              >
              </yu-xform-item>
              <yu-xform-item
                label="数据列数"
                ctype="select"
                :disabled="isCopy"
                placeholder="请选择"
                name="fncConfDataCol"
                data-code="STD_ZB_FNC_COL"
                :rules="rule[0]"
              >
              </yu-xform-item>
              <yu-xform-item
                label="栏位"
                ctype="select"
                :disabled="isCopy"
                placeholder="请选择"
                name="fncConfCotes"
                data-code="STD_ZB_FNC_COTES"
                :rules="rule[0]"
              >
              </yu-xform-item>
            </yu-col>
          </yu-row>
        </yu-panel>
      </yu-xform>
      <div slot="footer" class="yu-grpButton">
        <yu-button type="primary" @click="saveFn">保存</yu-button>
        <yu-button @click="cancelFn">取消</yu-button>
      </div>
    </yu-xdialog>
    <!-- 详情 -->
    <yu-xdialog
      :title="viewTitle[viewType]"
      class="no-body-padding xdialog-adjust"
      :visible.sync="dialogDetailVisible"
      :middle="true"
      width="800px"
    >
      <yu-xform
        ref="detailForm"
        label-width="120px"
        v-model="detailFormdata"
        form-type="details"
      >
        <yu-panel title="报表样式列表" panel-type="simple">
          <yu-row>
            <yu-col :span="12">
              <yu-xform-item
                label="报表样式编号"
                ctype="input"
                name="styleId"
              ></yu-xform-item>
              <yu-xform-item
                label="报表名称"
                :colspan="24"
                ctype="input"
                name="fncName"
              >
              </yu-xform-item>
              <yu-xform-item
                label="数据列数"
                ctype="select"
                data-code="STD_ZB_FNC_COL"
                name="fncConfDataCol"
              >
              </yu-xform-item>
            </yu-col>
            <yu-col :span="12">
              <yu-xform-item
                label="所属报表种类"
                ctype="input"
                name="fncConfTyp"
                data-code="STD_ZB_FNC_CONFTYP"
              >
              </yu-xform-item>
              <yu-xform-item
                label="显示名称"
                ctype="input"
                name="fncConfDisName"
              >
              </yu-xform-item>
              <!-- <yu-xform-item label="栏位" ctype="select" name="fncConfCotes" data-code="FNCCONFCOTES">
              </yu-xform-item> -->
              <yu-xform-item
                label="栏位"
                ctype="select"
                placeholder="请选择"
                name="fncConfCotes"
                data-code="STD_ZB_FNC_COTES"
              >
              </yu-xform-item>
            </yu-col>
          </yu-row>
        </yu-panel>
      </yu-xform>
      <div slot="footer" class="yu-grpButton">
        <yu-button @click="cancelFn">返回</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_FNC_CONFTYP,STD_ZB_FNC_COL,STD_ZB_FNC_COTES");
import xymixin from "@/utils/mixin";
export default {
  name: "reportStyleConfig",
  mixins: [xymixin],
  data: function () {
    return {
      dataUrl: this.$backend.cmisCfg + "/api/repStylCnf/q/list",
      userStatus: {},
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false), // 标题字典
      dialogVisible: false, // 编辑弹框
      dialogDetailVisible: false, // 详情弹框
      formdata: {}, // 表单数据
      tableFormdata: {}, // 编辑表格表单
      isEdit: false, //是否禁止操作表单
      isCopy: false, //是否复制
      detailFormdata: {},
      rule: [
        { required: true, message: "必填项" },
        { validator: yufp.validator.number, message: "数字" },
      ],
      options: [
        { key: "default", value: "默认(8888)" },
        { key: "define", value: "自定义" },
      ],
      surePwd: "",
      pwdType: "default",
      // new
      optionQueryArr: {
        options: [
          { key: "all", value: "所有条件" },
          { key: "itemId", value: "项目编号" },
          { key: "itemName", value: "项目名称" },
        ],
      },
    };
  },
  created: function () {
    this.userStatus = yufp.lookup.find("USER_STATUS", false);
  },
  mounted() {},
  methods: {
    /**
     * 新增
     */
    addFn: function () {
      var _this = this;
      this.isEdit = false; //是否禁用操作表单
      this.isCopy = false; //是否复制
      this.dialogVisible = true;
      this.viewType = "ADD";
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择要修改的记录", type: "warning" });
        return;
      }
      this.dialogVisible = true;
      this.isEdit = true; //是否禁用操作表单
      this.isCopy = false; //是否复制
      this.dialogDetailVisible = false;
      this.viewType = "EDIT";
      this.$nextTick(function () {
        _this.$refs.refTable.selections[0].fncConfCotes = _this.$refs.refTable.selections[0].fncConfCotes.toString();
        _this.$refs.refTable.selections[0].fncConfDataCol = _this.$refs.refTable.selections[0].fncConfDataCol.toString();
        yufp.clone(this.$refs.refTable.selections[0], this.tableFormdata);
      });
    },
    /**
     * 启动/停用
     */
    toggleFn: function (data) {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (!data && selections.length < 1) {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
      var len = selections.length,
        arr = [];
      if (!data) {
        for (var i = 0; i < len; i++) {
          arr.push(selections[i].id);
        }
      } else {
        arr.push(data.id);
      }
      this.$request({
        method: "POST",
        url: this.$backend.cmisCfg + "/example/concise/changeStatus",
        data: {
          ids: arr.join(","),
        },
      }).then((code, message, response) => {
        //处理请求成功的情况
        _this.$refs.refTable.remoteData();
        _this.$message("操作成功");
      });
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      var url;
      yufp.clone(_this.tableFormdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      if (_this.viewType == "ADD" || _this.viewType == "COPY") {
        url = "/api/repStylCnf/s/add";
      } else if (_this.viewType == "EDIT") {
        url = "/api/repStylCnf/s/modf";
      }
      _this
        .$request({
          method: "POST",
          url: this.$backend.cmisCfg + url,
          data: model,
        })
        .then((response) => {
          //处理请求成功的情况
          _this.$refs.refTable.remoteData();
          _this.$message({ message: response.message });
          _this.dialogVisible = false;
        });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].styleId);
      }
      console.log(arr);
      _this.$confirm("确定删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            _this
              .$request({
                method: "POST",
                url: _this.$backend.cmisCfg + "/api/repStylCnf/s/del/" + arr[0],
                // data: {
                //   styleId: arr[0]
                // }
              })
              .then((code, message, response) => {
                //处理请求成功的情况
                _this.dialogDetailVisible = false;
                _this.$refs.refTable.remoteData();
                _this.$message("操作成功");
              });
          }
        },
      });
    },
    // 复制
    copyFn: function () {
      var _this = this;
      this.isCopy = true; //是否复制
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
      if (selections.length > 1) {
        _this.$message({ message: "只能选择一条记录", type: "warning" });
        return;
      }
      this.dialogVisible = true;
      this.dialogDetailVisible = false;
      this.viewType = "COPY";
      this.$nextTick(function () {
        _this.$refs.refTable.selections[0].fncConfCotes = _this.$refs.refTable.selections[0].fncConfCotes.toString();
        _this.$refs.refTable.selections[0].fncConfDataCol = _this.$refs.refTable.selections[0].fncConfDataCol.toString();
        yufp.extend(this.tableFormdata, this.$refs.refTable.selections[0]);
        this.tableFormdata.styleId = "";
      });
    },
    /**
     * 模糊查询
     */
    fuzzyQuery: function (data) {
      var param = {
        condition: JSON.stringify({ allCond: data.value, searchType: "0" }),
      };
      this.$refs.refTable.remoteData(param);
    },
    /**
     * 表格按钮组点击
     */
    noticeFn(message) {
      this.$alert(message);
    },
    /**
     * 详情
     */
    detailFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择要查看的记录", type: "warning" });
        return;
      }
      this.viewType = "DETAIL";
      this.dialogDetailVisible = true;
      this.$nextTick(function () {
        selections[0].fncConfCotes = selections[0].fncConfCotes.toString();
        selections[0].fncConfDataCol = selections[0].fncConfDataCol.toString();
        yufp.clone(selections[0], this.detailFormdata);
      });
    },
    /**
     * 取消弹框
     */
    cancelFn: function (data) {
      this.dialogDetailVisible = false;
      this.dialogVisible = false;
    },
    /**
     * 重置
     */
    resetFn: function (data) {
      this.$alert("您点击了重置密码");
    },
    /**
     * 精确查询
     */
    search: function () {
      this.formdata.searchType + "1";
      var param = { condition: JSON.stringify(this.formdata) };
      this.$refs.refTable.remoteData(param);
    },
    /**
     * 重置所有表单内容
     */
    resetFormFn: function () {
      this.$refs.refBaseForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-timelineItem_title {
  font-weight: 600;
  font-size: 15px;
}
.el-timeline.is-vertical {
  padding-left: 20px;
}
</style>
