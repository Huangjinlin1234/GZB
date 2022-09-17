<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusPubBlackRefDialog_d1_BillList.vue';
import d2Billlist from './cusPubBlackRefDialog_d2_BillList.vue';
/*
* @author lq
* */
let defineMap, str_serviceName, billCardData;

export default {
  components: {d1Billlist, d2Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      d2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      billCardData = this.pageParams.BillCardData;
      defineMap = this.pageParams.ItemDefineMap;// 控件定义参数
      str_serviceName = this.pageParams.serviceName;
      let strTempletCode = ''; // 模板编码
      const whereSql = defineMap['查询条件']; // 查询条件
      const appl_type = billCardData.appl_type;

      // 列入
      if (appl_type == '01') {
        strTempletCode = 'cus_base_list_pop';
      } else if (appl_type == '02') { // 注销
        strTempletCode = 'cus_pub_black_list_pop';
      } else {
        this.$xutils.showMsgBox('提示', '无效的"申请类型"');
        return;
      }

      this.d1_BillList = this.$refs.d1_BillList;
      this.d2_BillList = this.$refs.d2_BillList;
      this.d1_BillList.setAppendSQLCondition(whereSql);
      this.d1_BillList.queryDataByCondition();
      this.d1_BillList.addRowDBClickAction(this.onRowDBClickAction);
    },

    onRowDBClickAction () {
      const selectDate = this.d1_BillList.getSelectedRowData();

      if (selectDate == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }

      this.$dialog.close(this.dialogId, selectDate);
    },

    onConfirm () {
      const selectDate = this.d1_BillList.getSelectedRowData();

      if (selectDate == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }

      this.$dialog.close(this.dialogId, selectDate);
    },

    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
