<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgStandardTemplateList_d1_BillList.vue";
yufp.lookup.reg("STD_STANDARD_TEMPLATE");
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    // 业务配置-制式模板文件配置
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    importFile() {
      this.$dialog.open("导入", "cfgmanage/cfgStandardTemplate/cfgStandardTemplateFileImportIndex", 900, 500, null);
    }
  }
};
</script>
