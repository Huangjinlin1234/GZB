<template>
  <div></div>
</template>
<script>

export default {

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
    // this.AfterInit();
  },
  methods: {
    /* 合同申请列表*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;

      this.d1_BillList.queryDataByCondition({
        oprType: '01',
        belgLine: '00'
      });
    },

    /* 新增按钮*/
    doAdd () {
      this.$dialog.open(
        '合同申请新增向导',
        'xwmanage/iqpManage/iqpLoanApp/addIqpLoanIndex',
        750,
        490,
        {},
        () => {}
      );
    },

    /* 修改按钮*/
    doUpdate () {
      let rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }

      const approveStatus = rowData.approveStatus;
      const iqpSerno = rowData.iqpSerno;
      const inputId = rowData.inputId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;

      if (loginCode == inputId && approveStatus == '000') {
        this.$router.addTab({
          name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          key: '1',
          title: '业务申请',
          data: {
            model_group_no: 'CMG000350',
            op: 'UPDATE',
            iqpSerno: iqpSerno
          }
        });
      } else {
        this.$xutils.showMsgBox('提示', '仅能修改申请状态为待提交且责任人是自己的申请!');
        return;
      }
    },

    /* 删除按钮*/
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      const approve_status = params.approveStatus;
      const input_id = params.inputId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      if (loginCode == input_id && approve_status == '000') {
        this.$xutils.showConfirmBox('提示', '删除操作会删除业务申请主表以及子表信息！是否确认删除？', 350, 150, confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/iqploanapp/deleteIqpInfo',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_BillList.queryDataByCondition({
                      oprType: '01',
                      belgLine: '00',
                      approveStatus: '000'
                    });
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
      } else {
        this.$xutils.showMsgBox('提示', '仅能删除申请状态为待提交且责任人是自己的申请!');
        return;
      }
    },

    /* 查看按钮*/
    doView () {
      const rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }

      rowData['model_group_no'] = 'CMG000350';
      rowData['op'] = 'VIEW';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        rowData,
        _rt => {}
      );
    }
  }
};
</script>
