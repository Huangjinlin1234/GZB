<template>
  <d1-billlist ref="d1_BillList" :node="childParams"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanAppList_Common_View.vue';
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    childParams: function () {
      let params = {
        iqpSerno: this.node.iqpSerno
      };
      return params;
    }
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
    /* 业务申请-单笔单批业务申请 首页*/

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setBillQueryItemEditable('cus_name', false); // 设置查询 客户名称不能被修改
      // 过滤申请状态，保留【待发起、取消、追回、打回】等数据字典
      // this.d1_BillList.queryDataByCondition({
      //   oprType: '01',
      //   approveStatus: '000',
      //   inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')
      // });
    },
    // 新增申请
    doAdd () {
      var _this = this;
      this.$dialog.open(
        '引入共同借款人',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppList_Common_Add',
        1000,
        600,
        this.params,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
    // 修改申请
    doUpdate () {
      const params = this.d1_BillList.getSelectedRowData();
      params['op'] = 'EDIT';
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.open(
        '引入共同借款人',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppList_Common_Update',
        1000,
        600,
        params,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
    // 修改申请
    doView () {
      const params = this.d1_BillList.getSelectedRowData();
      params['op'] = 'VIEW';
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.open(
        '引入共同借款人',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppList_Common_Update',
        1000,
        600,
        params,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
    // 删除申请
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var pkId = params.pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '删除操作会删除业务申请主表以及子表信息！是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/lmtcobinfo/deletecobandcrql',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },
              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },


    // 刷新列表数据
    refreshBillListData () {
      this.d1_BillList.queryDataByCondition();
    }
  }
};
</script>
