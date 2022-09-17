<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusFncStatBase_d1_BillList.vue';
/**
财报信息（维护）
*/
let data = {};

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
      data = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;

      if (data != null && data != 'undefined') {
        if (data.cusId != null && data.cusId != 'undefined') {
          this.d1_BillList.queryDataByCondition({cus_id: data.cusId, approve_status: '000'});
          // 固定查询条件
          this.d1_BillList.setAppendSQLCondition({cus_id: data.cusId, approve_status: '000'});
        }
      }
    },

    // 新增
    doInsert () {
      if (data != null && data != 'undefined') {
        if (data.cusId != null && data.cusId != 'undefined') {
          var cusId = data.cusId;
          this.$dialog.open(
            '个人客户财务报表新增',
            'cusmanage/indivCus/indivCusDefend/indivCusFncStatBaseAddIndex',
            1200,
            600,
            cusId,
            () => {
              this.d1_BillList.queryDataByCondition();
            }
          );
        }
      }
    },

    submint () {
      data.opr_type = '9';

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/save/',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data != null) {
              const serno = response.data;
              const jsoRowData = this.d1_BillList.getSelectedRowData();
              const loginUser = this.$xutils.getLoginUserInfo();

              const rsPars = {
                'systemId': 'cmis',
                'orgId': loginUser.orgId,
                'bizId': serno,
                'bizType': 'WF_PERSONAL_FINANCIAL_REPORT',
                'userId': loginUser.loginCode,
                'bizUserName': '',
                'bizUserId': ''
              };

              this.$xutils.wfInit(rsPars, this.onCancelPage);
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            //
            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
        }
      });
    },

    onCancelPage () {}
  }
};
</script>
