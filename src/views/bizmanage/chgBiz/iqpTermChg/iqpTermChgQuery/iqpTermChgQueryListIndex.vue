<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpTermChgQueryList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       *期限调整申请列表页面
       *  @author xuchao
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;

      this.d1_BillList.setAppendSQLCondition({oprType:"01", approveStatusList:"998,997,111"});

      this.d1_BillList.queryDataByCondition();
      // 过滤申请状态，保留【待发起、取消、追回、打回】等数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '000,990,991,992');

      // 因查询与申请列表共用一个模板，查询仅保留查看功能
      this.d1_BillList.setBillListButtonVisable('doAdd', false);

      this.d1_BillList.setBillListButtonVisable('onUpdate', false);
      this.d1_BillList.setBillListButtonVisable('onDelete', false);
      // this.d1_BillList.setBillListButtonVisable('提交', false);
    },

    // 查看
    onView() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000061';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';

      this.$dialog.open(
        '期限调整申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    }
  }
};
</script>
