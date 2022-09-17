<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './ctrMergeComMsg_d1_BillList.vue';
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
    // 并购企业信息
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // this.d1_BillList.setAppendSQLCondition({serno: this.getFactory().contextData.serno});
      // this.d1_BillList.queryDataByCondition();
    },

    // 新增申请
    onAdd () {
      this.$dialog.open(
        '并购企业新增界面',
        'bizmanage/iqpBiz/iqpLoanAppMergerConSub/ctrMergeComMsgAddIndex',
        800,
        600,
        this.getFactory().contextData,
        () => {
          this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.iqpSerno});
        }
      );
    },

    onUpdate () {
      let params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.open(
        '并购企业修改界面',
        'bizmanage/iqpBiz/iqpLoanAppMergerConSub/ctrMergeComMsgUpdateIndex',
        -1,
        -1,
        params,
        () => {
          this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.iqpSerno, oprType: '01'});
        }
      );
    },

    onDelete () {
      let params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/iqploanappmergerconsub/deleteByPkId',
            data: JSON.stringify(params),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                  // 列表刷新
                  this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.iqpSerno, oprType: '01'});
                });
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

    onCheck () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$dialog.open(
        '并购企业查看界面',
        'bizmanage/iqpBiz/iqpLoanAppMergerConSub/ctrMergeComMsgViewIndex',
        800,
        600,
        jsoPar
      );
    }
  }
};
</script>
