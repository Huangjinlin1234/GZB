<template>
  <div>
    <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
    <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    <d1-b-b-billlist ref="d1_B_B_BillList"></d1-b-b-billlist>
  </div>
</template>
<script>
/**
 * 授信调查-调查信息
 */
import d1ABilllist from './hxdPage2_d1_A_BillList.vue';
import d1BABilllist from './hxdPage2_d1_B_A_BillList.vue';
import d1BBBilllist from './hxdPage2_d1_B_B_BillList.vue';
export default {
  components: {d1ABilllist, d1BABilllist, d1BBBilllist},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      gtjkr: null,
      jjlxr: null,
      cmdc: null,
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      // if (this.bizPageData != null) {
      //   // 这个时候判断是审批页面进来的  直接查数据就行了
      //   this.surveySerno = this.bizPageData.instanceInfo.bizId;
      // } else if (this.$route.meta.params != null) {
      //   // 走新增tab进来的
      //   this.surveySerno = this.$route.meta.params.surveySerno;
      // } else {
      //   this.surveySerno = this.getFactory().contextData.surveySerno;
      // }
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.meta.params.surveySerno;
        this.$route.meta.params.bizType = '01';
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }


      // 创建共同借款人信息
      this.gtjkr = this.$refs.d1_A_BillList;
      // 创建紧急联系人
      this.jjlxr = this.$refs.d1_B_A_BillList;
      // 创建侧面调查表
      this.cmdc = this.$refs.d1_B_B_BillList;
    },

    showAction () {
      this.gtjkr.refTable.remoteData(); //  queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      this.jjlxr.refTable.remoteData(); // queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      this.cmdc.refTable.remoteData(); // queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
    },

    /**
     * 新增共借人
     */
    addCob () {
      var surveySerno = this.surveySerno;
      this.$dialog.open('新增共借人', 'xwmanage/lmtmanage/indgtLMT/addCobIndex', 750, 350, {
        surveySerno,
        isAdd: true
      }, () => {
        this.gtjkr.$refs.refTable.remoteData();
        // this.d1_A_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },

    updateCob () {
      let rowData = this.gtjkr.getSelectedRowData();
      if (rowData == null) {
        // this.$xutils.showMsgBox('提示', '请选择一条数据!');
        this.$message({message: '请选择一条数据!'});
        return;
      }
      rowData = rowData || {};
      const surveySerno = this.surveySerno;
      rowData.surveySerno = surveySerno;
      rowData.isAdd = false;

      this.$dialog.open('修改共借人', 'xwmanage/lmtmanage/indgtLMT/addCobIndex', 750, 350, rowData, () => {
        this.gtjkr.$refs.refTable.remoteData();
        // this.d1_A_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },

    /**
     * 新增紧急联系人信息
     */
    addEgc () {
      const surveySerno = this.surveySerno;
      this.$dialog.open('新增紧急联系人', 'xwmanage/lmtmanage/indgtLMT/addEgcIndex', 750, 350, {
        surveySerno,
        isAdd: true
      }, () => {
        this.jjlxr.$refs.refTable.remoteData();
        // this.d1_B_A_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },

    updateEgc () {
      let rowData = this.jjlxr.getSelectedRowData();
      if (rowData == null) {
        // this.$xutils.showMsgBox('提示', '请选择一条数据!');
        this.$message({message: '请选择一条数据!'});
        return;
      }
      rowData = rowData || {};
      const surveySerno = this.surveySerno;
      rowData.surveySerno = surveySerno;
      rowData.isAdd = false;
      this.$dialog.open('修改紧急联系人', 'xwmanage/lmtmanage/indgtLMT/addEgcIndex', 750, 350, rowData, () => {
        this.jjlxr.$refs.refTable.remoteData();
        // this.d1_B_A_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },

    /**
     * 新增侧面信息调查表
     */
    addProfile () {
      const surveySerno = this.surveySerno;

      this.$dialog.open('新增侧面信息', 'xwmanage/lmtmanage/indgtLMT/addProfileIndex', 750, 400, {
        surveySerno,
        isAdd: true
      }, () => {
        this.cmdc.$refs.refTable.remoteData();
        // this.d1_B_B_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },

    updateProfile () {
      let rowData = this.cmdc.getSelectedRowData();
      if (rowData == null) {
        // this.$xutils.showMsgBox('提示', '请选择一条数据!');
        this.$message({message: '请选择一条数据!'});
        return;
      }
      rowData = rowData || {};
      const surveySerno = this.surveySerno;
      rowData.surveySerno = surveySerno;
      rowData.isAdd = false;

      this.$dialog.open('修改侧面信息', 'xwmanage/lmtmanage/indgtLMT/addProfileIndex', 750, 350, rowData, () => {
        this.cmdc.$refs.refTable.remoteData();
        // this.d1_B_B_BillList.queryDataByCondition('survey_serno=' + this.getFactory().contextData.surveySerno + '');
      });
    },


    doSelectCob (rowDataJson) {
      this.$dialog.open(
        '共借人信息',
        'xwmanage/lmtmanage/indgtLMT/hxdmanage/hxdPage2LookCobIndex',
        750,
        600,
        rowDataJson,
        () => {}
      );
    }
  }
};
</script>
