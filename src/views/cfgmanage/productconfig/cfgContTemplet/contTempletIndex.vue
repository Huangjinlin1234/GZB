<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './contTemplet_d1_BillList.vue';
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
    this.$lookup.reg('STD_ZB_CONT_TPL_TYPE,STD_ZB_DATA_STS');
    this.AfterInit();
  },
  methods: {


    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    addContTemplet () {
      this.$dialog.open('新增合同模板', 'cfgmanage/productconfig/cfgContTemplet/addContTempletIndex', 1250, 600, null, null);
    },

    updateContTemplet () {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      }

      selPars.opType = 'update';

      this.$dialog.open(
        '修改合同模板',
        'cfgmanage/productconfig/cfgContTemplet/detailsContTempletIndex',
        -1,
        -1,
        selPars
      );
    },

    viewContTemplet () {
      let selPars = this.d1_BillList.getSelectedRowData();
      if (selPars == null || selPars == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      }
      selPars.opType = 'view';

      this.$dialog.open(
        '查看合同模板',
        'cfgmanage/productconfig/cfgContTemplet/detailsContTempletIndex',
        -1,
        -1,
        selPars
      );
    },

    webTest () {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      } selPars.officeOperType = 'edit';
      this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/productconfig/cfgContTemplet/webOfficePageIndex', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: 'WebOffice',
        // 传递的业务数据，可选配置
        data: selPars
      });
    }
  }
};
</script>
