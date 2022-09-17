<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusYndListOperInfo_d1_BillList.vue';
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
    /**
       * 刘愿 优农贷名单准入经营信息
       */

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      if (this.getFactory().contextData.op == 'VIEW') {
        // this.d1_A_BillCard.changeStatus();
        this.d1_BillList.showBtn = false;
      }
      this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.serno});
    },

    // 新增按钮
    byadd () {
      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      const jsoPar = {
        'op': 'ADD',
        'serno': this.getFactory().contextData.serno
      };

      this.$dialog.open(
        '经营信息新增',
        'cusmanage/cusListMana/cusYndList/cusYndListOperInfoAddIndex',
        600,
        400,
        jsoPar,
        () => {
          this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.serno});
        }
      );
    },
    // 修改
    byEdit () {
      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      var row = this.d1_BillList.getSelectedRowData();
      if (!row) {
        this.$message({message:'请先选择一条记录！', type: 'warning'});
        return;
      }
      const jsoPar = {
        'op': 'EDIT',
        'row': row
      };

      this.$dialog.open(
        '经营信息修改',
        'cusmanage/cusListMana/cusYndList/cusYndListOperInfoAddIndex',
        600,
        400,
        jsoPar,
        () => {
          this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.serno});
        }
      );
    },
    // 查看
    byView () {
      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      var row = this.d1_BillList.getSelectedRowData();
      if (!row) {
        this.$message({message:'请先选择一条记录！', type: 'warning'});
        return;
      }
      const jsoPar = {
        'op': 'VIEW',
        'row': row
      };

      this.$dialog.open(
        '经营信息查看',
        'cusmanage/cusListMana/cusYndList/cusYndListOperInfoAddIndex',
        600,
        400,
        jsoPar,
        () => {
          this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.serno});
        }
      );
    },

    getDialogDataFunc () {},
    showAction () {}
  }
};
</script>
