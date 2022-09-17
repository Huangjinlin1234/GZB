<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div style="padding-top:20px;">
    <div v-if="mode">
      <yu-xform ref="refForm" label-width="500px" v-model="formReport">
        <yu-xform-group :column="1">
          <yu-xform-item label="请选择核查报告撰写模式" name="indgtReportMode" ctype="select" data-code="STD_INDGT_REPORT_MODE"
                         colspan="12" @change="chooseFn" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="综合评价" name="inteAnaly" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"
                         :disabled="!saveBtnShow"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>

      <yu-panel title="核查意见及建议" panel-type="simple">
        <yu-xtable ref="refTable" condition-key="condition" row-number :pageable="false" :data="data">
          <yu-xtable-column label="申请流水号" prop="serno" align="center"></yu-xtable-column>
          <yu-xtable-column label="授信品种" prop="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" align="center"></yu-xtable-column>
          <yu-xtable-column label="是否循环额度" prop="isRevolv" align="center" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="授信金额(万元)" prop="lmtAmt" align="center">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" align="center" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="年利率" prop="rate" align="center">
            <template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.rate * 100).toFixed(2)) }}%</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarTypeName" align="center"></yu-xtable-column>
          <yu-xtable-column label="授信期限（月）" prop="lmtTerm" align="center"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="授信限额情况" panel-type="simple">
        <yu-panel title="用信条件" panel-type="simple">
          <yu-button-drop v-show="saveBtnShow" :show-length="8">
            <yu-button type="primary" @click="addLoanCond">添加</yu-button>
            <yu-button type="primary" @click="deleteLoanCond">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" selection-type="radio" condition-key="condition" row-number :pageable="false"
                     :data-url="apprLoanUrl" :base-params="apprLoanParam" request-type="POST">
            <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>

        <yu-xdialog title="用信条件" :visible.sync="dialogLoanCond" width="1000px">
          <yu-xform ref="refFormLoanCond" label-width="100px" v-model="formdataLoanCond">
            <yu-xform-group>
              <yu-xform-item label="具体内容" name="condDesc" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveLoanBtn">保存</yu-button>
              <yu-button type="primary" @click="canclLoanFn">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-panel title="风控建议" panel-type="simple">
          <yu-button-drop v-show="saveBtnShow" :show-length="8">
            <yu-button type="primary" @click="addLoanCondFn">添加</yu-button>
            <yu-button type="primary" @click="deleteLoanCondFn">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable2" condition-key="condition" selection-type="radio" row-number :pageable="false" :data-url="apprLoanUrl"
                     :base-params="apprLoanParam1" request-type="POST">
            <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog title="风控建议" :visible.sync="dialogLoanCond1" width="1000px">
          <yu-xform ref="refFormLoanCond1" label-width="100px" v-model="formdataLoanCond1">
            <yu-xform-group>
              <yu-xform-item label="具体内容" name="condDesc" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveLoanBtnFn">保存</yu-button>
              <yu-button type="primary" @click="canclFn">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="onPrint">查看核查报告</yu-button>
        <yu-button type="primary" @click="goBackFn">返回</yu-button>
      </div>

    </div>
    <div v-else>
      <yu-xform ref="refFormWord" label-width="500px" v-model="formdataWord">
        <yu-xform-group :column="1">
          <yu-xform-item label="请选择核查报告撰写模式" name="indgtReportMode" ctype="select" data-code="STD_INDGT_REPORT_MODE"
                         colspan="14" @change="chooseFn" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="选择上传文件" name="indgtReportPath1" ctype="input" colspan="12" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-button-drop colspan="12">
            <yu-xform-item ctype="custom" class="upload_img" style="margin-left:10px;">
              <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow"
                                :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn">
              </yu-single-upload>
            </yu-xform-item>
            <!-- <yu-button type="primary">上传文件</yu-button>
            <yu-button type="primary">删除文件</yu-button> -->
          </yu-button-drop>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */

import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
import YuSingleUpload from "@/components/widgets/YuSingleUpload";
import {isNull} from "../common/bizUtils";
import {getFile, upImage, DeleteImage, numFn} from "@/utils/unitchange";

yufp.lookup.reg(
  "STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_INDGT_REPORT_MODE,STD_ZB_PRD_BIZ_TYPE"
);
export default {
  components: { YufpDemoSelector, YuSingleUpload },
  props: {
    pageParams: Object,
  },
  data: function () {
    return {
      dialogLoanCond: false,
      dialogLoanCond1: false,
      data: [],
      mode: "1",
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      saveBtnShow: false,
      pkId: '',
      numFn
    };
  },
  mounted() {
    let op = this.pageParams.op;
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
    let cl = document.getElementsByClassName("uploadbtn");
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName("button")[0].innerText = "上传图片";
    }
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtsiginvestappr/selectBySerno",
        data: {
          condition: JSON.stringify({
            serno: _this.pageParams.serno,
            oprType: "01",
            issueReportType: "02",
          }),
          sort: "createTime desc",
        },
        callback: function (code, message, response) {
          if (code == 0) {
            let lmtSigInvestAppr = response.data.lmtSigInvestAppr;
            // 反显字段
            yufp.clone(response.data.lmtSigInvestAppr, _this.formReport);
            _this.approveSerno = response.data.lmtSigInvestAppr.approveSerno;
            //调查报告
            if (!isNull(lmtSigInvestAppr.indgtReportPath)){
              getFile(lmtSigInvestAppr.indgtReportPath, "yu-icon-img").then((res) => {
                _this.fileListInfo = res;
              });
            }
            //核查报告撰写模式切换
            if (lmtSigInvestAppr.indgtReportMode == "1") {
              _this.mode = true;
            } else {
              _this.mode = false;
            }
            //表格反显
            response.data.lmtSigInvestAppr.guarTypeName =
              response.data.guarTypeName;
            _this.data = [];
            _this.data.push(response.data.lmtSigInvestAppr);
            _this.pkId = response.data.lmtSigInvestAppr.pkId;
            //不为空则加载
            if (!isNull(_this.approveSerno)){
              _this.apprLoanUrl =
                _this.$backend.cmisBiz +
                "/api/lmtapprloancond/selectByQueryModel";
              _this.apprLoanParam = {
                condition: JSON.stringify({
                  approveSerno: _this.approveSerno,
                  condType: "01",
                }),
              };
              _this.apprLoanParam1 = {
                condition: JSON.stringify({
                  approveSerno: _this.approveSerno,
                  condType: "03",
                }),
              };
            }
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    /**
      其他要求弹窗返回按钮
     */
    canclFn: function () {
      var _this = this;
      _this.$refs.refFormLoanCond1.resetFields();
      _this.dialogLoanCond1 = false;
    },

    /**
      风控建议返回按钮
      */
    canclLoanFn: function () {
      var _this = this;
      _this.$refs.refFormLoanCond.resetFields();
      _this.dialogLoanCond = false;
    },
    /**
      添加要求按钮
     */
    addLoanCond: function () {
      var _this = this;
      _this.dialogLoanCond = true;
    },
    /**
      添加风控建议按钮
     */
    addLoanCondFn: function () {
      var _this = this;
      _this.dialogLoanCond1 = true;
    },
    /**
      其他要求保存按钮
      */
    saveLoanBtn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormLoanCond.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtapprloancond/insertLoanCond",
        data: {
          condition: JSON.stringify({
            condDesc: _this.formdataLoanCond.condDesc,
            approveSerno: _this.approveSerno,
            condType: "01",
          }),
        },
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message("操作成功");
            _this.dialogLoanCond = false;
            _this.$refs.refFormLoanCond.resetFields();
            _this.init();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    /**
      删除按钮
     */
    deleteLoanCond: function () {
      var _this = this;
      var selections = _this.$refs.refTable1.selections;
      var obj = _this.$refs.refTable1.selections[0];
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url: backend.cmisBiz + "/api/lmtapprloancond/deleteByPkId",
              data: obj,
              callback: function (code, message, response) {
                _this.$refs.refTable1.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },

    // 打印
    onPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.data[0].serno;
      params.cusId = _this.data[0].cusId;
      let name = "bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport";
      let key = "report";
      params.src =
        _this.$backend.frptRptService +
        "zjty-hcbg14.cpt&serno=" +
        params.serno +
        "&cusId=" +
        params.cusId;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: "帆软打印",
        // 传递的业务数据，可选配置
        data: params,
      });
    },

    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
      风控建议保存按钮
      */
    saveLoanBtnFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormLoanCond1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtapprloancond/insertLoanCond",
        data: {
          condition: JSON.stringify({
            condDesc: _this.formdataLoanCond1.condDesc,
            approveSerno: _this.approveSerno,
            condType: "03",
          }),
        },
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message("操作成功");
            _this.dialogLoanCond1 = false;
            _this.$refs.refFormLoanCond1.resetFields();
            _this.init();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    /**
      删除按钮
     */
    deleteLoanCondFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable2.selections;
      var obj = _this.$refs.refTable2.selections[0];
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url: backend.cmisBiz + "/api/lmtapprloancond/deleteByPkId",
              data: obj,
              callback: function (code, message, response) {
                _this.$refs.refTable2.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },
    /**
      页面保存
      */
    saveFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtsiginvestappr/updateAppr",
        data: _this.formReport,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message("操作成功");
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    chooseFn: function (val) {
      var _this = this;
      if (val == "1") {
        _this.mode = true;
      } else {
        _this.mode = false;
      }
    },
    uploadedFn1(fileItem) {
      this.upImg(fileItem, "2");
    },
    upImg(fileItem, indgtReportMode) {
      var _this = this;
      fileItem.icon && delete fileItem.icon;
      _this.fileList.push(fileItem);
      let model = {
        fileId: String(fileItem.fileId),
        pkId: _this.pkId,
        indgtReportMode: indgtReportMode,
      };
      var updateurl =
        backend.cmisBiz + "/api/lmtsiginvestappr/updateFilePath";
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == "0") {
            console.log("===============>>>>>fanhui", response);
            _this.$message({ message: "上传成功", type: "success" });
          } else {
            _this.$message({ message: "上传失败", type: "error" });
          }
        },
      });
    },
    deleteFileFn1(file) {
      this.deleteImg(file, "2");
    },
    deleteImg(file, indgtReportMode) {
      this.fileList.forEach((item, index) => {
        if (item.filePath === file.filePath) {
          this.fileList.splice(index, 1);
        }
      });
      var _this = this;
      let model = {
        fileId: "",
        pkId: _this.pkId,
        indgtReportMode: indgtReportMode,
      };
      var updateurl =
        backend.cmisBiz + "/api/lmtsiginvestappr/updateFilePath";
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == "0") {
            console.log("===============>>>>>fanhui", response);
            _this.$message({ message: "删除成功", type: "success" });
          } else {
            _this.$message({ message: "删除失败", type: "error" });
          }
        },
      });
    },
  },
};
</script>
