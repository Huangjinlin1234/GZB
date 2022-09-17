<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./addContTemplet_d1_BillCard.vue";
/**
 *合同模板管理
 */
let bookmarks = "";

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_CONT_TPL_TYPE,STD_ZB_DATA_STS");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      let modelSeq = this.$xutils.getSEQWithParamFromServer("CONT_MODEL_SEQ", {});
      this.d1_BillCard.setBillCardItemValue("contTplCode", modelSeq);
    },

    cancelFn() {
      this.$dialog.close(this.dialogId);
    },

    saveFn() {
      let valid = this.d1_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }

      // d1_BillCard.insertBillCardData();
      let pk_id = this.$xutils.getUUID();

      this.d1_BillCard.setItemValue("pkId", pk_id);
      let resp = this.d1_BillCard.insertBillCardData();

      if (resp) {
        let userInfo = this.$xutils.getLoginUserInfo();

        this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, () => {
          // 刷新父级页面数据
          this.$xutils.request({
            url: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/automark",
            type: "POST",

            data: JSON.stringify({
              bookmarkName: bookmarks,
              contTplCode: this.d1_BillCard.getBillCardItemValue("contTplCode"),
              inputBrId: userInfo.orgCode,
              inputId: userInfo.loginCode,
              inputDate: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date())
            }),

            success: (response, status, xhr) => {
              console.log(response.code);
              if (response.code == 0) {
                this.$xutils.showMsgBox("提示", "书签读取成功!", 350, 150, () => {
                  this.getFactory().back();
                });
              }
            }
          });
        });
      }
    },
    myUploadSuccess(response, file, fileList) {
      debugger;
      this.$xutils.showMsgBox("提示", "上传成功！", 350, 150, () => {});
      this.d1_BillCard.setBillCardItemValue("contTplPath", response.data.filePath);
      this.d1_BillCard.setBillCardItemValue("fileSize", response.data.fileSize);
      this.d1_BillCard.setBillCardItemValue("fileDate", response.data.fileDate);
    },

    see() {
      window.open("WebOffice://|Officectrl|file:///C:/Users/liqiang/Desktop/webOffice-Test/edit.html", "_blank");
    }
  }
};
</script>
