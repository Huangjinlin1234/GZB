<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './formatReport_d1_BillList.vue';
/**
 *格式化报告管理
 */
let bookmarks = '';

export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.$lookup.reg('STD_ZB_DATA_STS', 'STD_ZB_FILE_REP_TYPE', 'STD_ZB_OPR_TYPE');
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    myUploadSuccess (response, file, fileList) {
      this.$xutils.showMsgBox('提示', '上传成功！', 350, 150, () => {});
      this.d1_BillCard.setBillCardItemValue('file_path', response.data.filePath);
      this.d1_BillCard.setBillCardItemValue('file_size', response.data.fileSize);
      this.d1_BillCard.setBillCardItemValue('file_date', response.data.fileDate);
      bookmarks = response.data.bookmarks;
    }
  }
};
</script>
