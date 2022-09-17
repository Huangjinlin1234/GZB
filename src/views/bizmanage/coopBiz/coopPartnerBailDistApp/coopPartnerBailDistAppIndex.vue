<template>
<div>
  <d1-billlist ref="billList"></d1-billlist>
  <yufpNwfInit ref="yufpNwfInit" @success-click="doAfterCommit" ></yufpNwfInit>
</div>
</template>
<script>
import d1Billlist from './coopPartnerBailDistApp_d1_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billlist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      billList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 保证金提取管理 列表
    afterInit () {
      this.billList = this.$refs.billList;
    },
    doView () {
      const selectedRowData = this.billList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      selectedRowData.operate = 'details';
      this.$dialog.open(
        '保证金提取申请新增',
        'bizmanage/coopBiz/coopPartnerBailDistApp/coopPartnerBailDistAppAddIndex',
        '-1',
        '-1',
        selectedRowData,
        () => {
          this.billList.queryDataByCondition();
        }
      );
    },

    // 删除申请
    doDelete () {
      var _this = this;
      const params = _this.billList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const approveStatus = params.apprStatus;
      const loginCode = _this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        _this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以删除!');
        return;
      }

      _this.$xutils.showConfirmBox('提示', '你真的想删除选中的记录行?\r\n请谨慎操作!', 350, 150, _isOK => {
        if (_isOK) {
          if (approveStatus == '000') { // 待发起--物理删除
            _this.$xutils.request({
              // 同步请求
              async: false,
              // 新增
              url: _this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/delete/' + params.serno,
              data: JSON.stringify(_this.$xutils.toUpperCase(params.serno, true)),
              success: (response, status, xhr) => {
                if (response.data) {
                  _this.$xutils.showMsgBox('提示', '删除成功');
                  _this.billList.queryDataByCondition();
                } else {
                  _this.$xutils.showMsgBox('提示', response.message);
                }
              },
              error: (result, b) => {
                _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          } else if (approveStatus == '992') { // 退回--修改审批状态为“自行退出”
            params.apprStatus = '996';
            _this.$xutils.request({
              url: _this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/update',
              data: JSON.stringify(params),
              type: 'POST',
              async: true,
              success: (response, status, xhr) => {
                if (response.code == 0) {
                  _this.$xutils.showMsgBox('提示', '删除成功', '300', '150', () => {
                  // 删除成功后刷新列表
                    _this.billList.queryDataByCondition();
                  });
                }
              }
            });
          }
        }
      });
    },
    addApp () {
      this.$dialog.open(
        '保证金提取申请新增',
        'bizmanage/coopBiz/coopPartnerBailDistApp/coopPartnerBailDistAppAddIndex',
        '-1',
        '-1',
        {operate: 'add'},
        () => {
          this.billList.queryDataByCondition();
        }
      );
    },
    updateApp () {
      const selectedRowData = this.billList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      const approveStatus = selectedRowData.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != selectedRowData.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以修改!');
        return;
      }
      selectedRowData.operate = 'UPDATE';
      this.$dialog.open(
        '保证金提取申请修改',
        'bizmanage/coopBiz/coopPartnerBailDistApp/coopPartnerBailDistAppAddIndex',
        '-1',
        '-1',
        selectedRowData
      );
    },
    doAfterCommit () {
      this.billList.queryDataByCondition();
    },
    // 保证金提取管理 逻辑删除功能
    // function doDelete () {
    //   var jsoPar = billList.getSelectedRowData();
    //   if (jsoPar == null || jsoPar == '') {
    //     YuXP.showMsgBoxAutoClose('提示', '必须先选择一条数据', 350, 150);
    //     return;
    //   }
    //   // 审批状态
    //   var apprStatus = jsoPar.apprStatus;
    //   // 经办人
    //   var inputId = jsoPar.input_id;
    //   // 获取当前登录人信息
    //   var userInfo = YuXPUtil.getLoginUserInfo();
    //   if (apprStatus == '000' || apprStatus == '992') {
    //     if(inputId == userInfo.loginCode){
    //       alert(111);
    //       // 进行逻辑删除
    //       billList.onBillListLogicDelete();
    //       YuXP.showMsgBoxAutoClose('提示', '删除成功');
    //       billList.
    //       billList.queryDataByCondition();
    //     } else {
    //       YuXP.showMsgBoxAutoClose('提示', '只能删除审批状态为待发起或退回且经办人为自己的申请', 350, 150);
    //     }
    //   } else {
    //     YuXP.showMsgBoxAutoClose('提示', '只能删除审批状态为待发起或退回且经办人为自己的申请', 350, 150);
    //   }
    // }
    doCommit () {
      const params = this.billList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      var bizType = 'HZ017';
      const approveStatus = params.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以提交!');
        return;
      } else {
        // 选择一条满足条件的申请，点击提交，进行以下：
        const loginUser = this.$xutils.getLoginUserInfo();
        const dutys = loginUser.dutys;
        var duty = '';
          for (let i = 0; i < dutys.length; i++) {
            // 如果是SGH01（寿光客户经理）或DHH01（东海客户经理），则是村镇银行客户经理)
            if (dutys[i].code == 'SGH01' || dutys[i].code == 'DHH01') {
              duty = dutys[i].code;
              break;
            }
          }
        if (loginUser.org.code.substring(0, 2) == '80' && duty == 'SGH01') {
          // 寿光村镇 合作方保证金提取-分支机构（寿光）
          bizType = 'SGB07';
        } else if (loginUser.org.code.substring(0, 2) == '80') {
          // 寿光村镇 合作方保证金提取-普惠金融部（寿光）
          bizType = 'SGB14';
        } else if (loginUser.org.code.substring(0, 2) == '81' && duty == 'DHH01') {
          // 东海村镇 合作方保证金提取-分支机构（东海）
          bizType = 'DHB07';
        } else if (loginUser.org.code.substring(0, 2) == '81') {
          // 东海村镇 合作方保证金提取-普惠金融部（东海
          bizType = 'DHB14';
        } else {
          bizType = 'HZ017';
        }
        const startdto = {
          'systemId': 'cmis',
          'orgId': loginUser.org.code,
          'bizId': params.serno,
          // 流程申请类型会自动创建队列
          'bizType': bizType,
          'userId': loginUser.loginCode,
          // 客户名称
          'bizUserName': params.partnerName,
          // 客户编号
          'bizUserId': params.partnerNo
        };
        this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },
    // 合作方保证金提取审批表打印
    printFn: function () {
      var _this = this;
      const params = _this.billList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemohzfbzjtqspb';
      params.src = _this.$backend.frptRptService + 'hzfbzjtqspb.cpt&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        key: keydemo, // 必传
        // 页签名称
        title: '合作方保证金提取审批表',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
