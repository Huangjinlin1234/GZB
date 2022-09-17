<template>
  <yu-tabs v-model="activeName" type="card">
    <yu-tab-pane label="底层资产情况" name="first">
      <yu-xform ref="refForm" v-model="formdata" label-width="240px">
        <yu-panel title="基本情况" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否穿透至底层资产" placeholder="是否穿透至底层资产" name="isPassBasicAsset" :rules="rules[0]" @change="isPassBasicAssetChange" ctype="select" data-code="STD_ZB_YES_NO" :disabled="formDisabled">
            </yu-xform-item>
            <yu-xform-item label="是否全部穿透" placeholder="是否全部穿透" name="isTotalPassBasic" :rules="rules[0]" ctype="select" data-code="STD_ZB_YES_NO" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="是否能识别底层资产中单笔资产金额未超过1级资本净额0.15%部分" name="isBasicAsset" :rules="rules[0]" ctype="select" data-code="STD_ZB_YES_NO" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="底层资产中单笔资产金额未超过1级资本净额0.15%部分的合计金额（万元）" name="basicAssetTotalAmt" :rules="rules[0]" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="底层资产类型" placeholder="底层资产类型" name="basicAssetType" :rules="rules[0]" ctype="select" @change="basicAssetTypeChange" data-code="STD_ZB_BOTT_TYPE" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="资产包最大单项金额(万元)" placeholder="资产包最大单项金额(万元)" name="assetPackMaxSigAmt" :rules="rules[0]" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="资产包户数" placeholder="资产包户数" name="assetPackQnt" :rules="rules[0]" ctype="input" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1" v-if="showBasic">
            <yu-xform-item label="基本情况分析" placeholder="基本情况分析" name="basicAssetBasicCaseAnaly" :rules="rules[0]" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
              <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
            </yu-xform-item>
            <yu-xform-item label="其他需说明事项" placeholder="其他需说明事项" name="otherDesc" :rules="rules[0]" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button v-if="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-tab-pane>
    <yu-tab-pane v-if="group" label="底层资产明细" name="second">
      <proAssetSubInfo v-if="activeName=='second'" :children="children"></proAssetSubInfo>
    </yu-tab-pane>
    <yu-tab-pane label="底层资产清单(大额风险暴露）" name="third">
      <sigInvestDetails v-if="activeName=='third'" :children="children"></sigInvestDetails>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import proAssetSubInfo from "../loanInformation/proAssetSubInfo";
import sigInvestDetails from "../sigInvestDetailsInfo/sigInvestDetailsForInfoDetail";
yufp.lookup.reg("STD_ZB_YES_NO,STD_ZB_BOTT_TYPE");
import YuSingleUpload from "@/components/widgets/YuSingleUpload";
import {getFile, upImage, DeleteImage, numDM} from "@/utils/unitchange";
export default {
  components: {
    proAssetSubInfo,
    sigInvestDetails,
    YuSingleUpload,
  },
  props: {
    children: Object,
  },
  data() {
    return {
      rules: [
        {
          required: true,
          message: "必填项",
          trigger: "blur",
        },
        {
          validator: yufp.validator.number,
          message: "数字",
          trigger: "blur",
        },
      ],
      formdata: {},
      formDisabled: true,
      saveBtnShow: false,
      Param: {
        condition: JSON.stringify({
          serno: this.children.serno,
          oprType: "01",
        }),
      },
      activeName: "first",
      group: false,
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      viewType: "DETAIL",
      updateurl:
        backend.cmisBiz + "/api/lmtsiginvestbasicinfo/updatePicAbsoultPath",
      showBasic: true,
    };
  },
  created() {
    console.log("==============", this.children);
    let serno = this.children.serno;
    let cusId = this.children.cusId;

    if (this.children.op == "EDIT") {
      this.saveBtnShow = true;
      this.formDisabled = false;
    } else {
      this.saveBtnShow = false;
      this.formDisabled = true;
      console.log("==========", this.children.op);
    }
    this.getDetails(serno, cusId);
  },
  mounted() {
    let cl = document.getElementsByClassName("uploadbtn");
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName("button")[0].innerText = "上传图片";
    }
  },
  methods: {
    basicAssetTypeChange(val){
      if(val == '40'){
        this.showBasic = false;
      }else{
        this.showBasic = true;
      }
    },
    getDetails(serno, cusId) {
      var _this = this;
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/lmtsiginvestbasicinfo/selectBySerno",
          data: {
            serno: serno,
            cusId: cusId,
          },
        })
        .then((data) => {
          if (data.code == "0") {
            if (data.data) {
              let obj = data.data
              obj = numDM(obj, "D");
              yufp.clone(obj, _this.formdata);

              // 获取图片信息
              getFile(data.data.otherDescPicturePath, "yu-icon-img").then(
                (res) => {
                  _this.fileListInfo = res;
                }
              );

              if (_this.formdata.isPassBasicAsset == "0") {
                _this.group = false;
              }
            } else {
              _this.viewType = "ADD";
            }
          } else {
            _this.$message({ message: "请求失败", type: "error" });
          }
        });
    },

    isPassBasicAssetChange() {
      var _this = this;
      if (_this.formdata.isPassBasicAsset == "0") {
        _this.group = false;
      } else if (_this.formdata.isPassBasicAsset == "1") {
        _this.group = true;
      }
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
      model.serno = _this.children.serno;
      model.cusId = _this.children.cusId;
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model = numDM(model, "");
      var updateurl;
      if (this.viewType == "ADD" && model.pkId == null) {
        model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
        updateurl = backend.cmisBiz + "/api/lmtsiginvestbasicinfo/insertDczcfx";
      } else {
        updateurl = backend.cmisBiz + "/api/lmtsiginvestbasicinfo/updateDczcfx";
      }
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          _this.$message("修改成功");
        },
      });
    },

    // 查看
    doView() {
      var _this = this;
      let jsoPar = _this.$refs.refTable1.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }
    },
    // 返回
    cancelFn() {
      this.$emit("changed", false);
    },
    uploadedFn1(fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "otherDescPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.otherDescPicturePath = res.path;
      });
    },
    deleteFileFn1(file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "otherDescPicturePath", this.updateurl)
      this.formdata.otherDescPicturePath = "";
    },
  },
};
</script>
