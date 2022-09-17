<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopOperateViewAgrList_d1_BillList.vue';
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
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setBillListButtonVisable('作废', false);
      this.d1_BillList.setAppendSQLCondition({partnerNo:this.$route.meta.params.cusId});
      this.d1_BillList.queryDataByCondition();
      // 设置查询框CHANGE事件

      this.d1_BillList.addCustQueryAction();
    },

    lookup () {
      const rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      let title = '合作方协议台账查看';
      let jsonParam = yufp.clone(rowData, {});
      jsonParam.op = 'details';
      jsonParam.from = 'coopPartnerAgrAcc';
      jsonParam.serno = jsonParam.coopAgrSerno;
      jsonParam.isFromOperateViewMenu = true;
      this.$router.addTab({
        name: 'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        key: 'custom_view_' + jsonParam.serno,
        title: title,
        data: jsonParam
      });
      // debugger
      // this.$dialog.open(
      //   title,
      //   'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
      //   1500,
      //   800,
      //   jsonParam
      // );
    }
  }
};
</script>
