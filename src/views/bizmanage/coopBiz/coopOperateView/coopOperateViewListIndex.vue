<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopOperateViewList_d1_BillList.vue';
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
    },

    // 查看
    doView () {
      const rowData = this.d1_BillList.getSelectedRowData();
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      const openPar = {};
      openPar['type'] = 'doView';
      openPar['biz_serno'] = rowData.serno;
      openPar['cusId'] = rowData.partnerNo;
      openPar['cusName'] = rowData.partnerName;
      openPar['certCode'] = rowData.certCode;
      openPar['coop_plan_no'] = rowData.coop_plan_no;
      openPar['model_group_no'] = 'CMG000411';
      openPar['op'] = 'VIEW';
      openPar.planAppData = rowData;
      let name = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      let key = 'cfgmanage' + openPar.cusId;
      openPar.key = `/${name}/${key}`;
      openPar.isFromOperateViewMenu = true;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '合作方运营视图列表',
        // 传递的业务数据，可选配置
        data: openPar
      });
      // this.$dialog.open(
      //   '合作方营运视图列表',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   openPar,
      //   null
      // );
    }
  }
};
</script>
