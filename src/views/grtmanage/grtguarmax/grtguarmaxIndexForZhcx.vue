<template>
  <d1-billlist ref="d1_BillList" :max="max"></d1-billlist>
</template>
<script>
import d1Billlist from './grtguarmax_d1_BillListForZhcx.vue';
export default {
  components: { d1Billlist },
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
    // 最高额担保合同列表界面
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition({
        guar_cont_type: '01',
        oprType: '01'
      });
      // 过滤申请状态，隐藏【信用】等数据字典
      this.d1_BillList.setSelectOptions('guarWay', 'hidden', '400');
    },

    // 查看担保合同
    onView () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      jsoPar['op'] = 'VIEW';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc,
        true,
        true
      );
    }
  }
};
</script>
