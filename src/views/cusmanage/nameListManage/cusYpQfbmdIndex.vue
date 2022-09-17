<template><div>
  <yu-tabs type="card">
    <yu-tab-pane label="白名单准入申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="银票签发白名单">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
  <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
</div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import d11Billlist from './cusYpQfbmd_d1_1_BillList.vue';
import d12Billlist from './cusYpQfbmd_d1_2_BillList.vue';
export default {
  components: { d11Billlist, d12Billlist, yufpNwfInit},
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
     * 银票签发白名单
     */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 白名单申请修改
    onUpdate () {
      const selectedRowData = this.d1_1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      selectedRowData.op = 'edit';
      this.$dialog.open(
        '修改(白名单准入申请信息)',
        'cusmanage/nameListManage/cusYpQfbmd_dialog_BillCard',
        '900',
        '600',
        selectedRowData,
        () => {
          this.d1_1_BillList.queryDataByCondition();
        }
      );
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
              url: backend.cmisCus + '/api/cuslstypqfwhiteapp/delete/' + params.lywaSerno,
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
        this.d1_1_BillCard.updateBillCardData();
      }
      result = this.d1_1_BillCard.formdata;
      var startdto = {};

      const loginUser = _this.$xutils.getLoginUserInfo();
      let dutysArry = []; //  loginUser.dutys
      for (let i = 0; i < loginUser.dutys.length; i++) {
        dutysArry.push(loginUser.dutys[i].code);
      }
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.code;
      startdto.userId = loginUser.loginCode;
      // 80 开头代表寿光村镇
      if (startdto.orgId.substring(0, 2) == '80') {
        startdto.bizType = 'SGA03';
      } else if (startdto.orgId.substring(0, 2) == '81') {
        startdto.bizType = 'DHA03';
      } else {
        startdto.bizType = 'KH018';
      }
      startdto.bizId = result.lywaSerno;
      startdto.bizUserName = result.cusName;
      startdto.bizUserId = result.cusId;
      startdto.param = {
        orgType: loginUser.org.orgType,
        dutys: dutysArry.join(',')
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 启用
    start () {
      const selectedRowData = this.d1_2_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '1') {
          this.$xutils.showMsgBox('提示', '该名单已被启用!');
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
          this.$xutils.showMsgBox('提示', '该名单已被停用!');
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
        url: this.$backend.cmisCus + '/api/cuslstypqfwhite/update',
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
    }
  }
};
</script>
