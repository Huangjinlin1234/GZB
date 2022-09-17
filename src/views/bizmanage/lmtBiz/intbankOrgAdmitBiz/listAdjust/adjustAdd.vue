<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" @click="replyOnChange" @focus="replyOnChange" icon="search" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" name="origiReplySerno" placeholder="批复编号" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button v-norepeat.loading type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog title="" :visible.sync="show_dialog" style="width:80%">
      <checkDialog :btn="btn" @changed="selectData"></checkDialog>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
import { validator } from "@/utils/validate";
import checkDialog from "../listCheck/dialog";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  components: {
    checkDialog,
  },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtintbankapp/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtintbankapp/",
      formdata: {},
      formType: "edit",
      formRules: {
        buildDate: [
          {
            validator: validator.isDate,
            message: "不是正确的日期",
            trigger: "blur",
          },
        ],
      },
      imageUrls: {},
      File: {},
      d1_BillList: null,
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/selectByModel",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/delete/",
      show_dialog: false,
      newSerno: "",
      newPkId: "",
    };
  },
  created() {
    this.newPkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
    this.newSerno = this.$xutils.getSEQWithParamFromServer('BIZ_SERNO');
    // 新增清空数据
    this.$nextTick(() => {
      this.$refs.refForm.resetFields();
    });
  },
  methods: {
    replyOnChange() {
      this.btn = "add";
      this.show_dialog = true;
    },
    selectData(msg) {
      msg.origiReplySerno = msg.replySerno;
      yufp.clone(msg, this.formdata);
      this.show_dialog = false;
    },

    customClick(type) {
      let postData = {};
      yufp.clone(this.formdata, postData);
      postData.appType = "03";
      postData.approveStatus = "000";
      postData.oprType = "01";
      //前台生成，防止重复提交
      postData.newSerno = this.newSerno;
      postData.newPkId = this.newPkId;

      // 下一步
      if (type === "doNext") {
        if (this.formdata.cusId != "") {
          this.$request({
            method: "POST",
            url: this.$backend.cmisBiz + "/api/intbankorgadmitapp/adjust",
            data: postData,
          })
            .then((data) => {
              if (data.code == "0") {
                this.$message({ message: "创建成功" });
                this.$dialog.close(this.dialogId);
                // 新建页签
                let model = {};
                var routeKey = "templetfactory" + this.formdata.cusId + "EDIT";
                model = data.data;
                model.routeKey = routeKey;
                model.model_group_no = "CMG000235";
                model.op = "update";
                this.$router.addTab({
                  name: "bizmanage/lmtBiz/intbankOrgAdmitBiz/listAdjust/adjustDetails",
                  key: routeKey,
                  title: "修改名单调整详情",
                  data: model,
                });
              }else{
                this.$message({ message: "创建失败", type: "error" });
              }
            })
        } else {
          this.$message({ message: "请先选择客户名称", type: "error" });
        }
        // 返回
      } else if (type === "doCancel") {
        this.$dialog.close(this.dialogId);
      }
    },
  },
};
</script>
