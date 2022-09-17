<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpAccpAppPorderSubList_d1_BillList.vue';
// 银承票据明细
let selfPars = {};

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
      selfPars = this.getFactory().contextData;
      this.d1_BillList = this.$refs.d1_BillList;
      if (selfPars.biz_op == 'VIEW') {
        // this.d1_BillList.setBillListButtonVisable('批量删除', false);
        // this.d1_BillList.setBillListButtonVisable('下载模板', false);
        // this.d1_BillList.setBillListButtonVisable('导入明细', false);
        this.d1_BillList.view = false;
      }
      this.d1_BillList.queryDataByCondition({ serno: selfPars.serno });
    },
    // 点击新增，跳转新增的页面
    onAdd () {
      this.$dialog.open('票据明细-新增页面', 'bizmanage/iqpBiz/iqpAccpApp/iqpAccpAppPorderSub/iqpAccpAppPorderSubAddIndex', -1, -1, selfPars, () => {
        this.refresh();
      });
    },
    // 逻辑删除
    onDel () {
      let rtnData = {};
      let rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录!');
        return;
      }
      // 进行逻辑删除
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            url: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/logicdelete',
            data: JSON.stringify(this.$xutils.toUpperCase(rowData, true)),

            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.refresh);
                rtnData = response.data;
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    // 刷新页面
    refresh () {
      // this.d1_BillList.queryDataByCondition({ serno: selfPars.serno });
      this.d1_BillList.$refs.refTable.remoteData();
    },
    showAction () {
      this.d1_BillList.queryDataByCondition({ serno: selfPars.serno });
    }
  }
};
</script>
