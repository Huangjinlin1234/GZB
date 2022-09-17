<template>
<div>
  <yu-tabs type="card">
    <yu-tab-pane label="无还本续贷申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="无还本续贷名单">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
   <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
</div>
</template>
<script>
import d11Billlist from './cusDgXwbmd_d1_1_BillList.vue';
import d12Billlist from './cusDgXwbmd_d1_2_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { d11Billlist, d12Billlist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      d1_1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 无还本续贷名单
     */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 启用
    start () {
      const selectedRowData = this.d1_2_BillList.getSelectedRowData();
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
    stop () {
      const selectedRowData = this.d1_2_BillList.getSelectedRowData();
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
        url: this.$backend.cmisCus + '/api/cuslstwhbxd/updateSelective',
        data: JSON.stringify(this.$xutils.toUpperCase(corp, true)),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('启用/停用 提示', '操作成功');
          this.d1_2_BillList.queryDataByCondition();
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


    // 删除
    doDelete () {
      let _this = this;
      const params = this.d1_1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const approveStatus = params.approveStatus;
      if (approveStatus !== '000' && approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只能删除审批状态为待发起或退回且经办人为自己的申请!');
        return;
      }

      _this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCus + '/api/cuslstwhbxdapp/delete/' + params.lwaSerno,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$refs.d1_1_BillList.queryDataByCondition();
                  _this.$message('删除成功!');
                } else {
                  _this.$message('删除失败!');
                }
              }
            });
          }
        }
      });
    },

    // 提交
    doSubmit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_1_BillCard = this.$refs.d1_1_BillList.$refs.dialog_BillCard;
      var _this = this;
      // 必填项校验
      const saveFlag = this.d1_1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }

      var op = this.d1_1_BillList.formType;
      var result;
      if (op == 'ADD') {
        result = this.d1_1_BillCard.saveBillCardData();
      } else {
        result = this.d1_1_BillCard.updateBillCardData();
      }
      var startdto = {};
      if (result != null) {
        this.d1_1_BillList.doAutoQuery();
        let formData = this.d1_1_BillCard.getBillCardValue();
        const loginUser = _this.$xutils.getLoginUserInfo();
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.code;
        startdto.userId = loginUser.loginCode;
        // 80 开头代表寿光村镇
        if (startdto.orgId.substring(0, 2) == '80') {
          startdto.bizType = 'SGA04';
        } else if (startdto.orgId.substring(0, 2) == '81') {
          startdto.bizType = 'DHA04';
        } else{
          startdto.bizType = 'KH017';
        }
        startdto.bizId = formData.lwaSerno;
        startdto.bizUserName = formData.cusName;
        startdto.bizUserId = formData.cusId;
        startdto.param = {
          listBelg: formData.listBelg
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
      } else {
        this.$xutils.showMsgBox('提示', '暂存失败', 350, 200);
      }
    }

  }
};
</script>
