<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cfgStandardTemplateFileImport_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    myUploadSuccess (response, file, fileList) {
      this.$xutils.showMsgBox('提示', '上传成功！', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });
    }
    // myUploadFail (err, file, fileList) {
    //   this.$xutils.showMsgBox('提示', '上传失败！', 350, 150, () => {
    //     return;
    //   });
    // }
  }
};
</script>
