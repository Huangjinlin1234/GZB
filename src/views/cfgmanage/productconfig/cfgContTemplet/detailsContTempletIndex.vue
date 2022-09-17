<template>
  <div>
    <div style="height:200px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 350px)">
      <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" @click="saveFn" v-if="saveBtn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1ABillcard from "./detailsContTemplet_d1_A_BillCard.vue";
import d1BBilllist from "./detailsContTemplet_d1_B_BillList.vue";
import d1B11Billlist from "./detailsContTemplet_d1_B_11_BillList.vue";
/**
 *合同模板管理
 */
let par = {};

let bookmarks = "";

export default {
  components: { d1ABillcard, d1BBilllist, d1B11Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      d1_B_11_BillList: null,
      saveBtn: false
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_CONT_TPL_TYPE,STD_ZB_DATA_STS,STD_ZB_YES_NO");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      par = this.pageParams;
      let opType = par.opType;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.setBillCardValue(par);

      if (opType == "update") {
        this.doEdit();
        this.saveBtn = true;
      } else {
        this.doView();
      }
    },

    doEdit() {
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_B_BillList.queryDataByCondition("CONT_TPL_CODE = '" + par.cont_tpl_code + "'");
    },

    doView() {
      this.d1_A_BillCard.setItemEditable("*", false);
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_B_BillList.queryDataByCondition("CONT_TPL_CODE = '" + par.cont_tpl_code + "'");
      this.d1_B_BillList.setBillListButtonVisable("$insert", false);
      this.d1_B_BillList.setBillListButtonVisable("$delete", false);
      this.d1_B_BillList.setBillListButtonVisable("$update", false);
    },

    cancelFn() {
      this.$dialog.close(this.dialogId);
    },

    saveFn() {
      let valid = this.d1_A_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }
      let resp = this.d1_A_BillCard.updateBillCardData();

      if (resp) {
        let userInfo = this.$xutils.getLoginUserInfo();

        this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, () => {
          // 刷新父级页面数据
          // window.parent.d1_BillList.queryDataByCondition('cus_id = \'' + par.cusId + '\'');
          this.$xutils.request({
            url: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/automark",
            type: "POST",
            data: JSON.stringify({
              bookmarkName: bookmarks,
              contTplCode: this.d1_A_BillCard.getBillCardItemValue("cont_tpl_code"),
              inputBrId: userInfo.orgCode,
              inputId: userInfo.loginCode,
              inputDate: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date())
            }),

            success: (response, status, xhr) => {
              if (response.code == 0) {
                this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");
                this.$dialog.close(this.dialogId);
              }
            }
          });
        });
      }
    },

    myUploadSuccess(response, file, fileList) {
      this.$xutils.showMsgBox("提示", "上传成功！", 350, 150, () => {});
      this.d1_A_BillCard.setBillCardItemValue("cont_tpl_path", response.data.filePath);
      this.d1_A_BillCard.setBillCardItemValue("file_size", response.data.fileSize);
      this.d1_A_BillCard.setBillCardItemValue("file_date", response.data.fileDate);
      bookmarks = response.data.bookmarks;
    },

    see() {
      window.open("WebOffice://|Officectrl|file:///C:/Users/liqiang/Desktop/webOffice-Test/edit.html", "_blank");
    }
  }
};
</script>
