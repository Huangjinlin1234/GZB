<template>
  <div>
    <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
    <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    <d1-b-b-billlist ref="d1_B_B_BillList"></d1-b-b-billlist>
  </div>
</template>
<script>
import d1ABilllist from '@/views/xwmanage/lmtmanage/indgtLMT/hxdmanage/hxdPage2_d1_A_BillList.vue';
import d1BABilllist from '@/views/xwmanage/lmtmanage/indgtLMT/hxdmanage/hxdPage2_d1_B_A_BillList.vue';
import d1BBBilllist from './surveyInfo_d1_B_B_BillList.vue';
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
      zcqk: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 优企贷-调查信息*/
    afterInit () {
      // 创建共同借款人信息
      this.gtjkr = this.$refs.d1_A_BillList;
      // 创建紧急联系人
      this.jjlxr = this.$refs.d1_B_A_BillList;
      // 创建资产情况
      this.zcqk = this.$refs.d1_B_B_BillList;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
    },


    showAction () {},


    /**
     * 新增共借人
     */
    addCob () {
      const surveySerno = this.surveySerno;

      this.$dialog.open('新增共借人', 'xwmanage/lmtmanage/indgtLMT/addCobIndex', 750, 350, {
        surveySerno,
        isAdd: true
      }, () => {
        this.gtjkr.$refs.refTable.remoteData();
      });
    },

    updateCob () {
      let rowData = this.gtjkr.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }
      rowData = rowData || {};
      rowData.surveySerno = this.surveySerno;
      rowData.isAdd = false;

      this.$dialog.open('修改共借人', 'xwmanage/lmtmanage/indgtLMT/addCobIndex', 750, 350, rowData, () => {
        this.gtjkr.$refs.refTable.remoteData();
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
      rowData.surveySerno = this.surveySerno;
      rowData.isAdd = false;
      this.$dialog.open('修改紧急联系人', 'xwmanage/lmtmanage/indgtLMT/addEgcIndex', 750, 350, rowData, () => {
        this.jjlxr.$refs.refTable.remoteData();
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
    },


    doAddDebitAsset () {
      this.zcqk.dialogVisible = true;


      this.$nextTick(function () {
        this.zcqk.$refs.refForm.resetFields();
        this.zcqk.formdata.surveySerno = this.surveySerno;
      });
    },

    doUpdateDebitAsset () {
      let rowData = this.zcqk.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      this.zcqk.dialogVisible = true;

      this.$nextTick(function () {
        yufp.clone(rowData, this.zcqk.formdata);
      });
    }
  }
};

</script>
