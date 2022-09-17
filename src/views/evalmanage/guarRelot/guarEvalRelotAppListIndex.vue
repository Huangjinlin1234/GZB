<template>
  <div>
    <yu-panel title="重摇申请" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="重摇编号" ctype="input" placeholder="重摇编号" name="relotAppNo"></yu-xform-item>
          <yu-xform-item label="摇号状态" ctype="select" data-code="STD_ZB_RELOT_STATUS" placeholder="摇号状态" name="relotStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_addRelot" @click="addRelot">新增</yu-button>
          <yu-button ref="btn_updRelot" @click="updateRelot">修改</yu-button>
          <yu-button ref="btn_delRelot" @click="deleteRelot">删除</yu-button>
          <yu-button ref="btn_viewRelot" @click="viewRelot">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" condition-key="condition" :default-load="true">
        <yu-xtable-column  label="摇号编号" prop="relotAppNo"></yu-xtable-column>
        <yu-xtable-column  label="估值申请流水号" prop="evalAppSerno" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="担保分类名称" prop="guarTypeCdCnname" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="客户经理" prop="managerName"></yu-xtable-column>
        <yu-xtable-column  label="客户经理所属机构" prop="managerBrName" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="摇号状态" prop="relotStatus" data-code="STD_ZB_RELOT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="title" :visible.sync="dialogVisible" width="80%">
      <div style="overflow:hidden auto;height:100%">
        <yu-xform ref="refForm2" v-model="formdata" label-width="140px">
          <yu-xform-group :column="3">
            <yu-xform-item label="摇号编号" ctype="input" rules="required" placeholder="重摇编号" name="relotAppNo" disabled></yu-xform-item>
            <yu-xform-item label="估值申请号" ctype="yu-xguar-eval" rules="required" placeholder="估值申请号" name="evalAppSerno" :disabled="disabled" @select-fn="commonSelectFn" :mapping="{ evalAppSerno: 'evalAppSerno', guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', inputName: 'managerName', inputBrName: 'managerBrName' }" width="80%" height="550"></yu-xform-item>
            <yu-xform-item label="押品统一编号" ctype="input" rules="required" placeholder="押品统一编号" name="guarNo" disabled></yu-xform-item>
            <yu-xform-item label="担保分类名称" ctype="input" placeholder="担保分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
            <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerName" disabled></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrName" disabled></yu-xform-item>
            <yu-xform-item label="摇号状态" ctype="select" data-code="STD_ZB_RELOT_STATUS" placeholder="摇号状态" name="relotStatus" disabled></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" v-if="disabled == true ? false : true" @click="saveFn()" v-norepeat.loading>保存
            </yu-button>
            <yu-button type="primary" v-if="disabled == true ? false : true" @click="submit()">提交</yu-button>
            <yu-button type="primary" @click="cancelFn">返回</yu-button>
          </div>
        </yu-xform>
      </div></yu-xdialog
    >
  </div>
</template>
<script>
// import mixinList from '@/utils/mixins/mixin-list';
import mixinUtils from "@/utils/mixins/mixin-utils";
import popList from "@/utils/mixins/pop-list";
yufp.lookup.reg("STD_ZB_RELOT_STATUS");
export default {
  mixins: [popList, mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      title: "",
      disabled: true,
      formdata: {},
      flag: "",
      dialogVisible: false,
      baseParams: { condition: { relotStatus: "00" }, sort: "a.input_date desc" },
      dataUrl: this.$backend.cmisEval + "/api/guarevalrelotrst/selectRelotRst",
      saveFlag: false
    };
  },
  methods: {
    addRelot() {
      let _this = this;
      this.flag = "add";
      this.dialogVisible = true;
      this.title = "新增";
      this.disabled = false;
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        let dialogData = {
          relotAppNo: _this.$xutils.getDefaultformulaData("SEQ:RELOT_APP_NO"),
          relotStatus: "00"
        };
        yufp.clone(dialogData, _this.formdata);
      });
    },
    updateRelot() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData); //克隆数据
      this.dialogVisible = true;
      this.title = "修改";
      this.disabled = false;
      let params = { condition: { relotAppNo: selectRowData.relotAppNo } };
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        yufp.service.request({
          method: "GET",
          data: params,
          url: backend.cmisEval + "/api/guarevalrelotrstrel/",
          callback: function(code, message, response) {
            if (response.code == 0) {
              response.data[0].relotStatus = "00";
              yufp.clone(response.data[0], _this.formdata);
            }
          }
        });
      });
    },
    deleteRelot() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData); //克隆数据
      yufp.service.request({
        method: "POST",
        url: backend.cmisEval + "/api/guarevalrelotrst/delete/" + selectRowData.relotAppNo,
        callback: function(code, message, response) {
          if (response.code == 0) {
            _this.$message.success("删除成功!");
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error("删除失败!");
          }
        }
      });
    },

    viewRelot() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData); //克隆数据
      this.dialogVisible = true;
      this.title = "查看";
      this.disabled = true;
      let params = { condition: { relotAppNo: selectRowData.relotAppNo } };
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        yufp.service.request({
          method: "GET",
          data: params,
          url: backend.cmisEval + "/api/guarevalrelotrstrel/",
          callback: function(code, message, response) {
            if (response.code == 0) {
              response.data[0].relotStatus = "00";
              yufp.clone(response.data[0], _this.formdata);
            }
          }
        });
      });
    },

    /* 返回按钮*/
    cancelFn() {
      this.dialogVisible = false;
    },

    /* 保存按钮*/
    saveFn() {
      let _this = this;
      var validate = false;
      _this.$refs.refForm2.validate(function(valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message.warning("请检查页面要素是否录入完整!");
        return;
      }
      let params = {};
      yufp.clone(this.formdata, params);
      let userInfo = this.$store.state.oauth;
      if (this.flag == "add") {
        params["inputId"] = userInfo.userCode;
        params["inputBrId"] = userInfo.orgCode;
        yufp.service.request({
          method: "POST",
          data: params,
          url: backend.cmisEval + "/api/guarevalrelotrstrel/insertSelective",
          callback: function(code, message, response) {
            if (response.code == 0) {
              _this.$message.success("保存成功!");
              _this.saveFlag = true;
              _this.$refs.refTable.remoteData();
            } else {
              _this.$message.error("保存失败!");
            }
          }
        });
      }
    },
    // 提交
    submit() {
      let _this = this;
      let params = {};
      yufp.clone(this.formdata, params);
      let userInfo = this.$store.state.oauth;

      params["inputId"] = userInfo.userCode;
      params["inputBrId"] = userInfo.orgCode;
      yufp.service.request({
        method: "POST",
        data: params,
        url: backend.cmisEval + "/api/guarevalrelotrstrel/insertSubmit",
        callback: function(code, message, response) {
          if (response.code == 0) {
            _this.$message.success("保存成功!");
            _this.cancelFn();
            _this.$refs.refTable.remoteData();
          } else if (response.code == 100) {
            _this.$message.error(response.message);
          } else {
            _this.$message.error("保存失败!");
          }
        }
      });
    }
  }
};
</script>
