
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 报表项目配置
  -->
  <div>
    <div>
      <yu-panel title="报表项目配置">
        <template slot="filter">
          <yu-xform
            v-model="searchFormdata"
            ref="refBaseForm"
            related-table-name="refTable"
            label-width="130px"
            form-type="search"
          >
            <yu-xform-group :column="4">
              <yu-xform-item
                label="项目编号"
                :placeholder="placeSelect"
                ctype="input"
                name="itemId"
              ></yu-xform-item>
              <yu-xform-item
                label="项目名称"
                :placeholder="placeSelect"
                ctype="input"
                name="itemName"
              ></yu-xform-item>
              <yu-xform-item
                label="财报类型"
                :placeholder="placeSelect"
                ctype="select"
                name="fncConfTyp"
                data-code="STD_ZB_FNC_CONFTYP"
              ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </template>
        <template slot="right">
          <yu-button-drop>
            <yu-button ref="btn_onRelAdd" @click="onRelAdd">新增</yu-button>
            <yu-button ref="btn_onRelUpdate" @click="onRelUpdate"
              >修改</yu-button
            >
            <yu-button ref="btn_deleteFn" @click="deleteFn">删除</yu-button>
            <yu-button ref="btn_$query" @click="onView">查看</yu-button>
          </yu-button-drop>
        </template>
        <yu-xtable
          ref="refTable"
          row-number
          :data-url="dataUrl"
          selection-type="radio"
          :base-params="baseParams"
        >
          <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
          <yu-xtable-column
            label="财报类型"
            prop="fncConfTyp"
            data-code="STD_ZB_FNC_CONFTYP"
          ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="65%"
        top="5%"
        :middle="false"
      >
        <div>
          <div>
            <yu-xform
              ref="refForm"
              label-width="120px"
              :form-type="formType"
              v-model="formdata"
              :disabled="disabled"
              :rules="formRules"
              :form-change="triggerEditChangeEvent"
            >
              <yu-xform-group :column="3">
                <yu-xform-item
                  label="项目编号"
                  ctype="input"
                  placeholder="项目编号"
                  rules="required"
                  name="itemId"
                ></yu-xform-item>
                <yu-xform-item
                  label="项目名称"
                  ctype="input"
                  placeholder="项目名称"
                  rules="required"
                  name="itemName"
                ></yu-xform-item>
                <yu-xform-item
                  label="财报类型"
                  ctype="select"
                  placeholder="财报类型"
                  rules="required"
                  data-code="STD_ZB_FNC_CONFTYP"
                  name="fncConfTyp"
                ></yu-xform-item>
                <yu-xform-item
                  label="新旧报表标志"
                  ctype="select"
                  data-code="STD_ZB_FNC_ON_TYP"
                  placeholder="新旧报表标志"
                  name="isOrigiFncFlag"
                ></yu-xform-item>
                <yu-xform-item
                  label="单位"
                  ctype="input"
                  placeholder="单位"
                  name="itemUnit"
                ></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item
                  label="超链接"
                  ctype="textarea"
                  placeholder="超链接"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  name="url"
                ></yu-xform-item>
                <yu-xform-item
                  label="公式"
                  ctype="textarea"
                  placeholder="公式"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  name="formula"
                ></yu-xform-item>
                <yu-xform-item
                  label="备注"
                  ctype="textarea"
                  placeholder="备注"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  name="remark"
                ></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </div>
          <yu-form-buttons
            class="yubfp-button-group"
            style="text-align: center"
          >
            <yu-button
              type="primary"
              v-if="formType != 'details'"
              @click="onSaveData"
              >保存</yu-button
            >
            <yu-button type="primary" @click="onCancel">取消</yu-button>
          </yu-form-buttons>
        </div>
      </yu-xdialog>
    </div>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
yufp.lookup.reg("STD_ZB_FNC_CONFTYP,STD_ZB_FNC_ON_TYP");
export default {
  mixins: [mixinList],
  data: function () {
    return {
      dialogTitle: "新增",
      dataUrl: this.$backend.cmisCfg + "/api/cbps/fncConfItems/q/query",
      addUrl: this.$backend.cmisCfg + "/api/cbps/fncConfItems/s/add",
      updateUrl: this.$backend.cmisCfg + "/api/cbps/fncConfItems/s/modf",
      formType: "edit",
      dialogVisible: false,
      disabled: false,
      searchFormdata: {},
      formRules: {},
      formdata: {},
      baseParams: {
        condition: { opType: "01" },
      },
    };
  },
  mounted: function () {},
  methods: {
    onRelAdd() {
      this.formType = "add";
      this.dialogTitle = "新增";
      this.dialogVisible = true;
      this.disabled = false;
    },
    onRelUpdate() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择要修改的记录", type: "warning" });
        return;
      }
      this.formType = "edit";
      this.dialogTitle = "修改";
      this.dialogVisible = true;
      this.disabled = false;
      _this.$nextTick(() => {
        yufp.clone(selections[0], this.formdata);
      });
    },
    deleteFn() {
      var _this = this;
      const selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择要删除的记录", type: "warning" });
        return;
      }
      _this
        .$confirm("是否删除该项目？", "确认", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
        .then(function () {
          _this.deleteEvent(_this.$refs.refTable.selections[0]);
          _this.visible = false;
        })
        .catch(function () {});
    },
    // 调用后台进行逻辑删除
    deleteEvent(row) {
      // 获取业务规则方案编号查询条件
      let _this = this;
      _this
        .$request({
          url:
            this.$backend.cmisCfg +
            "/api/cbps/fncConfItems/s/del/" +
            row.itemId,
          method: "POST",
        })
        .then(({ code, message, data, total }) => {
          if (code == "0") {
            _this.$message({ message: message });
            _this.$refs.refTable.remoteData();
          }
        });
    },
    onView() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: "请先选择要查看的记录", type: "warning" });
        return;
      }
      this.formType = "details";
      this.dialogTitle = "查看";
      this.dialogVisible = true;
      this.disabled = true;
      _this.$nextTick(() => {
        yufp.clone(selections[0], this.formdata);
      });
    },
    onSaveData() {
      let _this = this;
      let params = this.$xutils.clone({}, this.formdata);
      _this.$refs.refForm.validate(function (valid) {
        let url = _this.formType == "edit" ? _this.updateUrl : _this.addUrl;
        if (valid) {
          _this
            .$request({
              url: url,
              method: "POST",
              data: params,
            })
            .then(({ code, message, data, total }) => {
              if (code == "0") {
                _this.$message({ message: message });
                _this.$refs.refTable.remoteData();
                _this.$refs.refForm.resetFields();
                _this.dialogVisible = false;
              }
            });
        }
      });
    },
    onCancel() {
      this.dialogVisible = false;
    },
  },
};
</script>
