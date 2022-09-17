<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanList_d1_BillList.vue';
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
    this.afterInit();
  },
  methods: {
    /* 合同申请列表*/
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;

      // this.d1_BillList.queryDataByCondition({
      //   oprType: '01',
      //   belgLine: '00'
      // });
    },

    /* 新增按钮*/
    doAdd () {
      this.$dialog.open(
        '合同申请新增向导',
        'xwmanage/iqpManage/iqpLoanApp/addIqpLoanIndex',
        750,
        490,
        {},
        () => {
          this.d1_BillList.$refs.refTable.remoteData();
        }
      );
    },

    /* 修改按钮*/
    doUpdate () {
      let rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        // this.$xutils.showMsgBox('提示', '请选择一条数据!');
        this.$message({message: '请选择一条数据'});
        return;
      }

      const approveStatus = rowData.approveStatus; // 申请状态
      const iqpSerno = rowData.iqpSerno; // 申请流水号
      const inputId = rowData.inputId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      const guarWay = rowData.guarWay;// 担保方式
      const surveySerno = rowData.surveySerno; // 调查流水号
      const belgLine = rowData.belgLine;// 所属条线
      const cusId = rowData.cusId;// 客户ID
      const cusName = rowData.cusName;// 客户姓名
      rowData['model_group_no'] = 'CMG000350';
      rowData['op'] = 'UPDATE';
      rowData['isOnlinePld'] = rowData.isOlPld;
      const flg = this.getRole(userInfo.roles);
      if ((loginCode == inputId || flg) && approveStatus == '000') {
        this.$router.addTab({
          name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          key: new Date().getTime(),
          title: '业务申请',
          data: rowData,
          afterTabClose: () => {
            this.d1_BillList.$refs.refTable.remoteData();
          }
        });
      } else {
        // this.$xutils.showMsgBox('提示', '仅能修改申请状态为待提交且责任人是自己的申请!');
        this.$message({message: '仅能修改申请状态为待提交且责任人是自己的申请'});
        return;
      }
    },

    // 遍历岗位
    getRole (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].code == 'R1016' || list[i].code == 'R1062') {
          return true;
        }
      }
      return false;
    },
    /* 删除按钮*/
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        // this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        this.$message({message: '必须选择一条记录进行操作'});
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
              url: this.$backend.cmisBiz + '/api/iqploanapp/deletecontiqpinfo',
              data: params.iqpSerno,
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$message({message: '删除成功！', type: 'success'});
                  this.d1_BillList.$refs.refTable.remoteData();
                } else {
                  this.$message({message: '删除失败！', type: 'warning'});
                  this.d1_BillList.$refs.refTable.remoteData();
                }
              },
              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        });
      } else {
        // this.$xutils.showMsgBox('提示', '仅能删除申请状态为待提交且责任人是自己的申请!');
        this.$message({message: '仅能删除申请状态为待提交且责任人是自己的申请'});
        return;
      }
    },

    /* 查看按钮*/
    doView () {
      const rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        // this.$xutils.showMsgBox('提示', '请选择一条数据!');
        this.$message({message: '请选择一条数据'});
        return;
      }
      const iqpSerno = rowData.iqpSerno;
      const inputId = rowData.managerId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      const guarWay = rowData.guarWay;
      const surveySerno = rowData.surveySerno;
      // if (loginCode == inputId) {
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: new Date().getTime(),
        title: '业务申请',
        data: {
          model_group_no: 'CMG000350',
          op: 'view',
          iqpSerno: iqpSerno,
          guarWay: guarWay,
          surveySerno: surveySerno
        }
      });
      // }
      // else {
      //   // this.$xutils.showMsgBox('提示', '仅能查看责任人是自己的申请!');
      //   this.$message({message: '仅能查看责任人是自己的申请'});
      //   return;
      // }
    }
  }
};
</script>
