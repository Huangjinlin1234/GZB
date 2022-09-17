<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusPubRelInvestList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      cusId: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
      对外投资信息
      */
    AfterInit () {
      let _this = this;
      _this.d1_BillList = _this.$refs.d1_BillList;
      let data = _this.$route.meta.params;
      let params = {};
      let condition = {};
      this.cusId = data.cusId;
      condition.cusId = this.cusId;
      params.condition = JSON.stringify(condition);
      _this.$refs.d1_BillList.$refs.refTable.remoteData(params);
    },

    // 新增
    doInsert () {
      let _this = this;
      _this.$dialog.open('对外投资新增', 'cusmanage/indivCus/indivCusDefend/indivCusPubRelInverstAddIndex', -1, -1, null, () => {
        _this.d1_BillList.queryDataByCondition({cusId: this.cusId});
      }
      );
    },
    // 修改
    doUpdate () {
      let _this = this;
      const jsoPar = _this.$refs.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      _this.$dialog.open('对外投资修改', 'cusmanage/indivCus/indivCusDefend/indivCusPubRelInverstUpdateIndex', -1, -1, jsoPar, () => {
        _this.d1_BillList.queryDataByCondition({cusId: this.cusId});
      }
      );
    },
    // 定义树切换调用方法
    showAction () {},

    // 删除
    doDelete () {
      const row = this.d1_BillList.getSelectedRowData();
      let _this = this;
      _this.d1_BillList = _this.$refs.d1_BillList;
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }
          const pkId = row.pkId;
          debugger;
          this.$xutils.request({
            // 同步请求
            async: true,
            url: this.$backend.cmisCus + '/api/cuspubrelinvest/delete/' + pkId,
            data: JSON.stringify(this.$xutils.toUpperCase({[this.d1_BillList.pkField]: pkId}, true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                // 自动刷新列表数据
                this.$xutils.showMsgBox('提示', '删除成功', 500, 300, () => {
                  _this.d1_BillList.queryDataByCondition({cusId: this.cusId});
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
    // 查看
    doView () {
      let _this = this;
      const jsoPar = _this.$refs.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['op'] = 'VIEW';
      this.$dialog.open('对外投资信息查看', 'cusmanage/indivCus/indivCusDefend/indivCusPubRelInverstUpdateIndex', -1, -1, jsoPar, () => {});
    }
  }
};
</script>
