<template>
  <div class="container">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :rules="formRules">
      <yu-panel title="经营与财务分析" panel-type="simple">
        <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
          <yu-button type="primary" @click="doAddDraw">新增</yu-button>
          <yu-button type="primary" @click="saveDraw">保存</yu-button>
          <yu-button type="primary" @click="deleteDraw">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable01" condition-key="condition" :show-header="false" selection-type="radio" :data-url="manageDataUrl" :base-params="Param1" request-type="post"
          style="width: 100%; height: 100%; margin-top: 5px">
          <yu-xtable-column ctype="input" prop="fncSubject"></yu-xtable-column>
          <yu-xtable-column ctype="input" prop="n2SubjectValue"></yu-xtable-column>
          <yu-xtable-column ctype="input" prop="n2PreRise"></yu-xtable-column>
          <yu-xtable-column ctype="input" prop="n1SubjectValue"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item ctype="custom" class="upload_img" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo1" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn">
            </yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="经营情况和财务情况" placeholder="经营情况和财务情况" name="operFinaSitu" ctype="textarea" colspan="15" :autosize="{ minRows: 12}" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="调查结论" placeholder="调查结论" name="indgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 12}" :disabled="!saveBtnShow"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <div class="yu-grpButton" v-if="subBtn">
      <yu-button v-show="saveBtnShow" type="primary" @click="doConfirm">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg(
  "STD_ZB_YES_NO,STD_ZB_INTB_TYPE,STD_ZB_EVAL_RST,STD_ZB_OUT_APPR_ORG,STD_ZB_GRADE_RANK,STD_ZB_CORP_QLTY,STD_ZB_HOLD_TYPE"
);
import YuSingleUpload from "@/components/widgets/YuSingleUpload";
import {getFile, upImage, DeleteImage} from "@/utils/unitchange";
export default {
  name: "TemplateFactory",
  components: {
    YuSingleUpload,
  },
  props: {
    children: Object,
    dialogId: String,
    modelGroupNo: String,
  },
  data: function () {
    return {
      saveBtnShow: false,
      cusId: "",
      serno: "",
      formRules: {
        operFinaSitu: [
          {
            type: "string",
            required: true,
            message: "经营情况和财务情况",
            trigger: "blur",
          },
          { max: 2000, message: "经营情况和财务情况不超过2000个字符" },
        ],
        indgtResult: [
          {
            type: "string",
            required: true,
            message: "调查结论",
            trigger: "blur",
          },
          { max: 2000, message: "调查结论不超过2000个字符" },
        ],
      },
      nodeHistory: [],
      fileList: [],
      fileListInfo1: [],
      fileListInfo2: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + "/api/intbankorgadmitapp/updatePicAbsoultPath",
      subBtn: false,
      subData: "",
      formdata: {},
    };
  },

  created() {
    console.log("=============>>>>>>>>>>>>>>>>>", this.children);
    this.initData(this.children);

  },
  mounted() {
    let cl = document.getElementsByClassName("uploadbtn");
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName("button")[0].innerText = "上传图片";
    }
  },

  methods: {
    initData(form_data) {
      var _this = this;
      let serno, cusId, op, updateurl;

      console.log("formdata==subjectAnalyse.vue====>", form_data);
      if (form_data.org) {
        //同业授信 数据获取
        _this.updateurl = updateurl = backend.cmisBiz + "/api/lmtintbankapp/updatePicAbsoultPath"; //同业客户
        _this.subBtn = true;
        let model = {condition: JSON.stringify({oprType: '01', serno: form_data.serno})};
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
          data: model,
          callback: function (code, message, response) {
            yufp.clone(response.data[0], _this.formdata);
            getFile(_this.formdata.operFinaSituPicturePath, "yu-icon-img").then((res) => {
              // debugger;
              _this.fileListInfo1 = res;
            });
          }
        });
      } else {
        //同业机构准入
        _this.updateurl = updateurl = backend.cmisBiz + "/api/intbankorgadmitapp/updatePicAbsoultPath"; //同业机构
        getFile(form_data.operFinaSituPicturePath, "yu-icon-img").then((res) => {
          // debugger;
          _this.fileListInfo1 = res;
        });
        this.$nextTick(() => {
          yufp.clone(form_data, _this.formdata);
        });
      }
      op = form_data.op;
      if (op == "update" || op == "EDIT") {
        _this.saveBtnShow = true;
      } else {
        _this.saveBtnShow = false;
      }
      _this.serno = serno = form_data.serno;
      this.serno = form_data.serno;
      _this.cusId = cusId = form_data.cusId;
      _this.manageDataUrl = backend.cmisBiz + "/api/lmtsiginvestrelfinadetails/selectByModel";
      _this.Param1 = {
        condition: JSON.stringify({
          oprType: "01",
          serno: serno,
          cusId: cusId,
        }),
        "sort": "createTime asc"
      };
    },
    // 取消按钮
    cancelFn() {
      yufp.globalEventBus.$emit("refreshLmtIntbankTable");
      this.$emit("changed", false);
    },
    doConfirm() {
      var _this = this;
      var model = {};
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
      yufp.clone(_this.formdata, model);
      model.serno = this.serno;
      var updateurl = backend.cmisBiz + "/api/lmtintbankapp/updateZtfx";
      _this
        .$request({
          method: "POST",
          url: updateurl,
          data: model,
        })
        .then((data) => {
          if (data.code == "0") {
            _this.$message({ message: "保存成功", type: "success" });
          } else {
            _this.$message({ message: "保存失败", type: "error" });
          }
        });
    },
    childrenSave() {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      let data = {
        validate: validate,
        formdata: {
          operFinaSitu: _this.formdata.operFinaSitu,
          indgtResult: _this.formdata.indgtResult,
        },
      };
      return data;
    },
    // 新增 提款表格数据行
    doAddDraw() {
      let isRefTableValidateOk = true;
      this.$nextTick(() => {
        this.pushRefTable1Row(isRefTableValidateOk);
      });
    },
    // 添加数据 添加一条空白数据
    pushRefTable1Row: function (isRefTableValidateOk) {
      var _this = this;
      if (isRefTableValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        // let pkId = this.$xutils.getUUID();
        let row = {
          // pkId: pkId,
          serno: _this.serno,
          cusId: _this.cusId,
          oprType: "01",
          inputId: userInfo.loginCode,
          inputBrId: userInfo.orgCode,
          inputDate: this.$xutils.dateFormat("yyyy-MM-dd", new Date()),
          updId: userInfo.loginCode,
          updBrId: userInfo.orgCode,
          updDate: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()),
          createTime: this.$xutils.dateFormat(
            "yyyy-MM-dd hh:mm:ss",
            new Date()
          ),
        };
        this.$refs.refTable01.tabledata.push(row);
        this.$refs.refTable01.setCurrentRow(row);
      }
    },
    // 保存提款表格数据
    saveDraw() {
      var validate = false;
      let jsonListData = [];
      this.$refs.refTable01.validate(function (fields) {
        if (!fields) {
          // 如果校验通过, fields为null
          validate = true;
        }
      });
      if (!validate) {
        this.$message({
          message: "数据验证不通过，请修改后重新提交！",
          type: "error",
        });
        return;
      }
      jsonListData = this.$refs.refTable01.tabledata;
      var _this = this;
      _this
        .$request({
          url:
            this.$backend.cmisBiz +
            "/api/lmtsiginvestrelfinadetails/addOrUpdateAllTable",
          method: "post",
          data: jsonListData,
        })
        .then(({ code, message, data }) => {
          // 处理请求成功的情况
          if (code == "0") {
            _this.$message({ message: _this.$t("lookupdict.bccg") });
            _this.$refs.refTable01.remoteData();
          } else {
            _this.$message({ message: message, type: "error" });
          }
        });
      // 新增后 保存修改页面
      // _this.saveFn()
    },
    // 删除 提款表格数据
    deleteDraw() {
      let selections = [];
      selections = this.$refs.refTable01.selections;
      if (selections.length < 1) {
        this.$message({ message: "请选中一条数据！", type: "warning" });
        return;
      }
      this.confirmDeleteDrawRow(selections);
    },
    // 确定删除提款表格数据
    confirmDeleteDrawRow: function (selections) {
      let _this = this;
      this.$confirm("确认删除该条数据？", this.$t("lookupdict.ts"), {
        type: "warning",
        confirmButtonText: this.$t("lookupdict.qr"),
        cancelButtonText: this.$t("lookupdict.qx"),
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              url:
                backend.cmisBiz +
                "/api/lmtsiginvestrelfinadetails/deleteLogicByPkId",
              method: "post",
              data: {
                pkId: selections[0].pkId,
              },
              callback: function (code, message, data) {
                if (data === "0") {
                  // 后台查不到数据 则前端删除行操作
                  _this.$refs.refTable01.tabledata.splice(selections, 1);
                } else {
                  _this.$message({ message: _this.$t("lookupdict.sccg") });
                  _this.$refs.refTable01.remoteData();
                }
              },
            });
          }
        },
      });
    },
    uploadedFn1(fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "operFinaSituPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.operFinaSituPicturePath = res.path;
      });
    },
    deleteFileFn1(file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "operFinaSituPicturePath", this.updateurl)
      this.formdata.operFinaSituPicturePath = "";
    },
  },
};
</script>
