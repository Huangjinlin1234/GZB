<template>
  <yu-panel title="主体分析" panel-type="simple">
    <yu-xform label-width="160px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-xform-group :column="1">
        <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
          <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
        </yu-xform-item>
        <yu-xform-item label="一、经营情况与财务情况分析" placeholder="经营情况与财务情况分析" name="finaRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        <!-- <yu-xform-item label="二、主要风险点分析" placeholder="主要风险点分析" name="mainRiskAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item> -->
        <yu-xform-item label="二、调查结论" placeholder="调查结论" name="trueIndgtResult" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-panel>
</template>
<script>
import YuSingleUpload from "@/components/widgets/YuSingleUpload";
import {getFile, upImage, DeleteImage} from "@/utils/unitchange";
export default {
  components: { YuSingleUpload },
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object,
  },
  data: function () {
    return {
      formdata: {},
      dataParam: {},
      formDisabled: true,
      saveBtnShow: false,
      formRules: {
        finaRisk: [
          {
            type: "string",
            required: true,
            message: "财务情况分析",
            trigger: "blur",
          },
          { max: 2000, message: "财务情况分析不超过2000个字符" },
        ],
        mainRiskAnaly: [
          {
            type: "string",
            required: true,
            message: "主要风险点分析",
            trigger: "blur",
          },
          { max: 2000, message: "主要风险点分析不超过2000个字符" },
        ],
        trueIndgtResult: [
          {
            type: "string",
            required: true,
            message: "调查结论（委托人/原始权益人）",
            trigger: "blur",
          },
          {
            max: 2000,
            message: "调查结论（委托人/原始权益人）不超过2000个字符",
          },
        ],
      },
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + "/api/lmtsiginvestriskanly/updatePicAbsoultPath",
    };
  },
  created() {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
  },
  mounted: function () {
    let cl = document.getElementsByClassName("uploadbtn");
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName("button")[0].innerText = "上传图片";
    }
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      if (_this.op == "EDIT") {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
      yufp.service.request({
        method: "POST",
        url: backend.cmisBiz + "/api/lmtsiginvestriskanly/selectByModel",
        data: {
          condition: JSON.stringify({ oprType: "01", serno: _this.serno }),
        },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);

          // 获取图片信息
          getFile(response.data[0].finaRiskPicturePath, "yu-icon-img").then(
            (res) => {
              _this.fileListInfo = res;
            }
          );
        },
      });
    },
    saveFn: function () {
      var validate = false,
        _this = this;
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

      var model = {};
      yufp.clone(_this.formdata, model);
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var updateurl = backend.cmisBiz + "/api/lmtsiginvestriskanly/updateZtfx";
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          _this.$message("修改成功");
        },
      });
    },

    cancelFn() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    uploadedFn1(fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "finaRiskPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.finaRiskPicturePath = res.path;
      });
    },
    deleteFileFn1(file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "finaRiskPicturePath", this.updateurl)
      this.formdata.finaRiskPicturePath = "";
    },
  },
};
</script>
