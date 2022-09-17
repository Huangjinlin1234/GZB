<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="公司客户">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="集团客户">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from '@/views/cusmanage/cusRelevance/cusXuanQu_d1_1_BillList.vue';
import d12Billlist from '@/views/cusmanage/cusgrp/cusgrpapp/cusGrpSelect_d1_BillList.vue';
/* 确定按钮*/
let jsoPar = '';

export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 选取对公客户
    importUser () {
      let jsoPar = '';

      // 未选择信息提示
      jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var rtdata = {};
      //rtdata(cusLstZlkh_dialog_BillCard)-jsoPar(cusXuanQu_d1_1_BillList)
      rtdata.cusId = jsoPar.cusId;//客户编号
      rtdata.cusName = jsoPar.cusName;//客户名称
      rtdata.cusType = jsoPar.cusCatalog;//客户类型
      rtdata.managerId = jsoPar.managerId;//管户客户经理编号
      rtdata.belgOrg = jsoPar.managerBrId;//所属机构编号
      rtdata.managerIdName = jsoPar.managerIdName;//管户客户经理名称
      rtdata.belgOrgName = jsoPar.managerBrIdName;//所属机构名称(主管机构名称)
      //rtdata(cusLstZlkh_dialog_BillCard)-accNumInfoChgUpdateIndex(当前系统登录对应信息)
      rtdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');//登记人
      rtdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');//登记机构
      rtdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');//登记人编码
      rtdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');//登记机构编码
      
      this.$dialog.close(this.dialogId, rtdata);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 选取集团客户
    // 选取
    importCusGrp () {
      let jsoPar = '';

      // 未选择信息提示
      jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var rtdata = {};
      rtdata.cusId = jsoPar.grpNo;
      rtdata.cusName = jsoPar.grpName;
      rtdata.managerId = jsoPar.managerId;
      rtdata.belgOrg = jsoPar.managerBrId;
      rtdata.cusType = '4';

      this.$dialog.close(this.dialogId, rtdata);
    }
  }
};
</script>
