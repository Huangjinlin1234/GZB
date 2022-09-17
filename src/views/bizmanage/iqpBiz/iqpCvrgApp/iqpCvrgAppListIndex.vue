<template>
  <yu-tabs type="card">
    <yu-tab-pane label="保函合同申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="保函合同申请历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpCvrgAppList_d1_1_BillList.vue';
import d12Billlist from './iqpCvrgAppList_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 保函合同申请
       * @letructor
       */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 新增申请
    doAdd () {
      this.$dialog.open(
        '',
        'bizmanage/iqpBiz/iqpCvrgApp/iqpCvrgAppAddIndex',
        800,
        700,
        {},
        () => {
          this.d1_1_BillList.queryDataByCondition();
        }
      );
    },

    // 删除
    doDelete () {
      let rtnData = {};
      let jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (jsoPar.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          let row = this.d1_1_BillList.getSelectedRowData();

          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }

          // get要换成post
          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'POST',
            url: this.$backend.cmisBiz + '/api/iqpcvrgapp/deleteIqpCvrgAppinfo',
            data: { serno: jsoPar.serno },
            success: (response, status, xhr) => {
              if (response.code == '0') {
                rtnData = response.data;
                this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
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

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 修改
    doUpdate () {
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      let jsoPar = yufp.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        return;
      }

      if (jsoPar.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '"审批中"状态的申请记录不能进行修改操作！', 350, 150);
        return;
      }

      jsoPar.opType = 'edit';
      jsoPar.op = 'EDIT';
      jsoPar.imageType = '2';
      this.goToDetailFn(jsoPar);
    },

    // 查看
    doView () {
      let _row = this.d1_1_BillList.getSelectedRowData();
      const row = this.$utils.clone(_row, row);
      if (_row == null || _row == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      row.opType = 'view';
      row.op = 'VIEW';
      this.goToDetailFn(row);
    },

    // 查看历史
    doViewHis () {
      let _row = this.d1_2_BillList.getSelectedRowData();
      let row = yufp.clone(_row, row);
      if (_row == null || _row == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      row.opType = 'view';
      row.op = 'VIEW';
      this.goToDetailFn(row);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      row.model_group_no = 'CMG000375';
      row.biz_serno = row.serno;

      // row.bizType = 'lmt';
      row.biz_op = row.op;

      row.period = '02';

      row.bizLine = '03';
      row.busiType = '08';
      row.guarWay = row.guarMode;
      if (row.guarMode == '21') {
        row['isAddGuar'] = '0';
      }
      row.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      row.imageParams = {
        contid: row.contNo,
        businessid: row.serno,
        docid: row.serno
      };

      // var _this = this;
      // this.$dialog.open(
      //   '保函合同申请',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   row,
      //   () => {
      //     this.refreshBillListData();
      //     // if (openMenuTab.length == 1 && openMenuTab[0].name == 'opentTitle') {
      //     //   // 关闭子页面的弹窗
      //     //   yufp.router.removeTab(openMenuTab[0].path);
      //     //   // this.$xutils.removeMenuTab(opentTitle);
      //     // }
      //   }
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.biz_serno + row.op,
        title: '保函合同申请',
        data: row
      });
      this.refreshBillListData();
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    }
  }
};
</script>
