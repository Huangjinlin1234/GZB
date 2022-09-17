<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopProAccList_d1_BillList.vue';
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
    // 项目台账信息 列表
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    // 查看
    doView () {
      const jsoPar = this.d1_BillList.$refs.accRefTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      this.$dialog.open(
        '楼盘项目信息',
        'bizmanage/coopBiz/coopProAcc/coopProAccViewIndex',
        -1,
        -1,
        jsoPar
      );
    }
  }
};
</script>
