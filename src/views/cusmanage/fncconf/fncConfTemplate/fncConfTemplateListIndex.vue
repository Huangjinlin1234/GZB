
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务报表配置
  -->
  <div>
    <yu-panel title="财务报表配置">
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
          <yu-button @click="detailFn">查看</yu-button>
          <yu-button @click="createJS">生成js</yu-button>
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
              label="报表编号"
              placeholder="请输入"
              ctype="input"
              name="fncId"
            ></yu-xform-item>
            <yu-xform-item
              label="报表名称"
              placeholder="请输入"
              ctype="input"
              name="fncName"
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
        <yu-xtable-column label="报表编号" prop="fncId"> </yu-xtable-column>
        <yu-xtable-column
          label="报表名称"
          prop="fncName"
          min-width="140"
        ></yu-xtable-column>
        <yu-xtable-column
          label="资产负债表"
          prop="fncBsStyleId"
          min-width="150"
        ></yu-xtable-column>
        <yu-xtable-column
          label="损益表"
          prop="fncPlStyleId"
          data-code="DEPARTMENT"
        ></yu-xtable-column>
        <yu-xtable-column
          label="现金流量表"
          prop="fncCfStyleId"
        ></yu-xtable-column>
        <yu-xtable-column
          label="财务指标表"
          prop="fncFiStyleId"
        ></yu-xtable-column>
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
      <yu-xform ref="refForm" label-width="130px" v-model="tableFormdata">
        <yu-panel title="财务报表列表">
          <yu-row>
            <yu-col :span="12">
              <yu-xform-item
                label="报表编号"
                ctype="input"
                placeholder="请输入报表编号"
                name="fncId"
                :rules="rule[0]"
                :disabled="disabled"
              ></yu-xform-item>
              <yu-xform-item
                class="yu-label-br"
                label="资产负债表"
                placeholder="请选择"
                :options="optionBs"
                ctype="select"
                name="fncBsStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                label="现金流量表"
                ctype="select"
                placeholder="请选择"
                :options="optionCf"
                name="fncCfStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                label="所有者权益变动"
                ctype="select"
                placeholder="请选择"
                :options="optionRi"
                name="fncRiStyleId"
              >
              </yu-xform-item>
            </yu-col>
            <yu-col :span="12">
              <yu-xform-item
                label="报表名称"
                ctype="input"
                placeholder="请输入报表名称"
                name="fncName"
                :rules="rule[0]"
              >
              </yu-xform-item>
              <yu-xform-item
                label="损益表"
                ctype="select"
                placeholder="请选择"
                :options="optionPl"
                name="fncPlStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                label="财务指标表"
                ctype="select"
                placeholder="请选择"
                :options="optionFi"
                name="fncFiStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                label="简表"
                ctype="select"
                placeholder="请选择"
                :options="optionSmp"
                name="fncSmpStyleId"
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
        label-width="130px"
        v-model="detailFormdata"
        form-type="details"
      >
        <yu-panel title="财务报表列表">
          <yu-row>
            <yu-col :span="12">
              <yu-xform-item
                class="yu-form-height"
                label="报表编号"
                ctype="input"
                name="fncId"
              ></yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="资产负债表样式编号"
                :colspan="24"
                ctype="input"
                name="fncBsStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="现金流量表"
                ctype="input"
                name="fncCfStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="所有者权益变动"
                ctype="input"
                name="fncRiStyleId"
              >
              </yu-xform-item>
            </yu-col>
            <yu-col :span="12">
              <yu-xform-item
                class="yu-form-height"
                label="报表名称"
                ctype="input"
                name="fncName"
              >
              </yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="损益表"
                ctype="input"
                name="fncPlStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="财务指标表"
                ctype="input"
                name="fncFiStyleId"
              >
              </yu-xform-item>
              <yu-xform-item
                class="yu-form-height"
                label="简表"
                ctype="input"
                name="fncSmpStyleId"
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
yufp.lookup.reg("  ");
import xymixin from "@/utils/mixin";
export default {
  name: "opFinSuppItemConfig",
  mixins: [xymixin],
  data: function () {
    return {
      dataUrl:
        this.$backend.cmisCfg + "/api/cbps/fncConfTemplate/q/quryRepList",
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false), // 标题字典
      dialogVisible: false, // 编辑弹框
      dialogDetailVisible: false, // 详情弹框
      formdata: {}, // 表单数据
      tableFormdata: {}, // 编辑表格表单
      detailFormdata: {},
      rule: [
        { required: true, message: "必填项" },
        { validator: yufp.validator.number, message: "数字" },
      ],
      disabled: false, // 新增或修改编号
      optionBs: [], // 资产负债表样式编号
      optionCf: [], // 现金流量表
      optionRi: [], // 所有者权益变动
      optionAcc: [], // 会计科目余额表
      optionPl: [], // 损益表
      optionFi: [], // 财务指标表
      optionSmp: [], // 简表
      optionDe: [], // 经济合作社财务收支明细表
    };
  },
  created: function () {
    this.getSelectData();
  },
  methods: {
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
     * 精确查询
     */
    search: function () {
      this.formdata.srchType = "1";
      const param = { condition: JSON.stringify(this.formdata) };
      this.$refs.refTable.remoteData(param);
    },
    /**
     * 重置所有表单内容
     */
    resetFormFn: function () {
      this.$refs.refBaseForm.resetFields();
    },
    /**
     * 新增
     */
    addFn: function () {
      const _this = this;
      _this.dialogVisible = true;
      _this.viewType = "ADD";
      _this.disabled = false;
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
      _this.dialogVisible = true;
      _this.dialogDetailVisible = false;
      _this.viewType = "EDIT";
      _this.disabled = true;
      _this.$nextTick(function () {
        yufp.extend(_this.tableFormdata, _this.$refs.refTable.selections[0]);
      });
    },
    /**
     * 获取新增修改弹窗中的下拉数据
     */
    getSelectData: function () {
      const _this = this;
      _this
        .$request({
          method: "GET",
          url:
            this.$backend.cmisCfg +
            "/api/cbps/fncConfTemplate/q/queryStylesList",
          data: "",
        })
        .then((response) => {
          // 处理请求成功的情况
          if (response.code == 0) {
            if (response.data["01"]) {
              // 资产负债表样式编号
              response.data["01"].forEach((item) => {
                _this.optionBs.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["02"]) {
              // 损益表
              response.data["02"].forEach((item) => {
                _this.optionPl.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["03"]) {
              // 现金流量表
              response.data["03"].forEach((item) => {
                _this.optionCf.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["04"]) {
              // 财务指标表
              response.data["04"].forEach((item) => {
                _this.optionFi.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["05"]) {
              // 所有者权益变动
              response.data["05"].forEach((item) => {
                _this.optionRi.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["06"]) {
              // 简表
              response.data["06"].forEach((item) => {
                _this.optionSmp.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["07"]) {
              // 会计科目余额表
              response.data["07"].forEach((item) => {
                _this.optionAcc.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
            if (response.data["08"]) {
              // 经济合作社财务收支明细表
              response.data["08"].forEach((item) => {
                _this.optionDe.push({
                  key: item.styleId,
                  value: "[" + item.styleId + "]" + item.fncConfDisName,
                });
              });
            }
          } else {
            _this.$message({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    /**
     * 新增保存
     */
    saveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.tableFormdata, model);
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.viewType == "ADD") {
        _this
          .$request({
            method: "POST",
            url: _this.$backend.cmisCfg + "/api/cbps/fncConfTemplate/s/addRep",
            data: model,
          })
          .then((response) => {
            //处理请求成功的情况
            if (response.code == 0) {
              _this.$refs.refTable.remoteData();
              _this.$message({
                message: response.data
              });
              _this.dialogVisible = false;
            } else {
              _this.$message({
                message: response.data
              });
            }
          });
      } else {
        _this
          .$request({
            method: "POST",
            url: _this.$backend.cmisCfg + "/api/cbps/fncConfTemplate/s/modfRep",
            data: model,
          })
          .then((response) => {
            //处理请求成功的情况
            if (response.code == 0) {
              _this.$refs.refTable.remoteData();
              _this.$message({
                message: response.data
              });
              _this.dialogVisible = false;
            } else {
              _this.$message({
                message: response.data
              });
            }
          });
      }
      // 向后台发送保存请求
    },
    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择要删除的记录", type: "warning" });
        return;
      }
      _this.$confirm("确定删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            _this
              .$request({
                method: "POST",
                url:
                  _this.$backend.cmisCfg + "/api/cbps/fncConfTemplate/s/delRep",
                data: {
                  fncId: selections[0].fncId,
                },
              })
              .then((response) => {
                //处理请求成功的情况
                if (response.code == 0) {
                  _this.dialogDetailVisible = false;
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: response.data,
                  });
                } else {
                  _this.$message({
                    message: response.data,
                    type: "error",
                  });
                }
              });
          }
        },
      });
    },
    // 生成js
    createJS: function () {
      const _this = this;
      const selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: "请先选择一条记录", type: "warning" });
        return;
      }
      if (selections.length > 1) {
        _this.$message({ message: "只能选择一条记录", type: "warning" });
        return;
      }
      _this
        .$request({
          method: "GET",
          url:
            _this.$backend.cmisCfg +
            "/api/cbps/fncConfTemplate/q/genFncPage/" +
            selections[0].fncId,
        })
        .then((response) => {
          //处理请求成功的情况
          if (response.code == 0) {
            _this.$message({
              message: response.data,
              type: "success",
            });
          } else {
            _this.$message({
              message: response.data,
              type: "error",
            });
          }
        });
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
      _this
        .$request({
          method: "GET",
          url:
            _this.$backend.cmisCfg + "/api/cbps/fncConfTemplate/q/quryRepDtal",
          data: {
            fncId: selections[0].fncId,
          },
        })
        .then((response) => {
          //处理请求成功的情况
          if (response.code == 0) {
            _this.viewType = "DETAIL";
            _this.dialogDetailVisible = true;
            _this.$nextTick(function () {
              yufp.extend(_this.detailFormdata, selections[0]);
              if (response.data.fncBsStyleId) {
                _this.detailFormdata.fncBsStyleId =
                  "[" + response.data.fncBsStyleId + "]" + response.data.bsName;
              }
              if (response.data.fncPlStyleId) {
                _this.detailFormdata.fncPlStyleId =
                  "[" + response.data.fncPlStyleId + "]" + response.data.plName;
              }
              if (response.data.fncCfStyleId) {
                _this.detailFormdata.fncCfStyleId =
                  "[" + response.data.fncCfStyleId + "]" + response.data.cfName;
              }
              if (response.data.fncFiStyleId) {
                _this.detailFormdata.fncFiStyleId =
                  "[" + response.data.fncFiStyleId + "]" + response.data.fiName;
              }
              if (response.data.fncRiStyleId) {
                _this.detailFormdata.fncRiStyleId =
                  "[" + response.data.fncRiStyleId + "]" + response.data.riName;
              }
              if (response.data.fncSmpStyleId) {
                _this.detailFormdata.fncSmpStyleId =
                  "[" +
                  response.data.fncSmpStyleId +
                  "]" +
                  response.data.smpName;
              }
            });
          } else {
            _this.$message({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    /**
     * 取消弹框
     */
    cancelFn: function () {
      this.dialogDetailVisible = false;
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.yu-label-br {
  height: 36px;
}
.yu-form-height {
  height: 50px;
}
</style>
<style lang="scss">
.yu-label-br > label {
  padding: 3px 12px 11px 0 !important;
}
</style>
