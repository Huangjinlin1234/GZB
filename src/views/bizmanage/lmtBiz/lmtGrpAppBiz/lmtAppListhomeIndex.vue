<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtAppListhome_d1_BillList.vue'
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
       * title 集团成员授信填报
       * author xiamc
       * date 2021-04-01
       * */

    // 初始话方法
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 单一客户授信申报信息查看
    update() {
      var jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // jsoPar['pk_id'] = jsoPar.pk_id;
      // jsoPar['serno'] = jsoPar.serno;
      jsoPar['op'] = 'VIEW';
      jsoPar['scene'] = '01';// 授信场景

      // 弹出框调用
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGroupDeclareAppIndex',
        -1,
        -1,
        jsoPar,
        () => {},
        true,
        true
      );
    }
  }
};
</script>
