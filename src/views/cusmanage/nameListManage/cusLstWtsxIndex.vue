<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstWtsx_d1_BillList.vue';

export default {
  components: { d1Billlist },
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
     * 问题授信名单
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },


    // 查看
    viewFn () {
      const row = this.d1_BillList.getSelectedRowData();
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      row.opType = 'view';
      this.$dialog.open('', 'cusmanage/nameListManage/cusLstWtsxDetailIndex', -1, -1, row);
    },

    // 启用
    EnableButton () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '1') {
          this.$xutils.showMsgBox('提示', '该客户已被启用!');
          return;
        } else {
          selectedRowData.status = '1';
          this.sendStartState(selectedRowData);
        }
      }
    },

    // 停用
    StopUsingButton () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '0') {
          this.$xutils.showMsgBox('提示', '该客户已被停用!');
          return;
        } else {
          selectedRowData.status = '0';
          this.sendStartState(selectedRowData);
        }
      }
    },

    sendStartState (corp) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuslstwtsx/updateSelective',
        data: JSON.stringify(this.$xutils.toUpperCase(corp, true)),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('启用/停用 提示', '操作成功');
          this.d1_BillList.queryDataByCondition();
          if (response.data != null) {
            rsPars['data'] = response.data;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return rsPars;
    },

    // 停用申请
    doSubmit () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '1') {
          this.$xutils.showMsgBox('提示', '该客户已被停用!');
          return;
        } else {
          const loginUser = this.$xutils.getLoginUserInfo();

          // 设置流程提交参数
          const rsPars = {
            systemId: 'cmis',
            orgId: loginUser.orgId,
            bizId: selectedRowData.serno,
            bizType: 'WF_DIS_CREDIT_OUT',
            userId: loginUser.loginCode,
            bizUserName: selectedRowData.cusName,
            bizUserId: selectedRowData.cusId
          };
          // 流程提交
          this.$xutils.wfInit(rsPars, () => {
            selectedRowData.approve_status = '111';
            this.d1_BillList.queryDataByCondition();
          });
        }
      }
    }
  }
};
</script>
