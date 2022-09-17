<template>
  <yu-tabs type="card">
    <yu-tab-pane label="征信信息">
      <d1-billcard ref="d1_BillCard"></d1-billcard>
      <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
    </yu-tab-pane>
    <!-- <yu-tab-pane label="影像信息" lazy="true">
      <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane> -->
  </yu-tabs>
</template>
<script>
import d1Billcard from './creditSZReportQryInfoUpdate_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard, yufpNwfInit, imageSystem},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'ZXCXSQZLQY',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            // [{"index":{"docid":"3aba9f1030d44fbfadeee91b48041731"},"top_outsystem_code":"HLWYX","outsystem_code":"HLWYX"}]
            'scanid': ''
            // 'businessid': 'XD00234997'
            // 'custname': this.pageParams.cusName,
            // 'custname': this.getFactory().contextData.cusName,
            // 'cardno': this.pageParams.cusName,
            // 'cardno': this.getFactory().contextData.cusName,
            // 'custphone': ''
          }
        }
      ],
      d1BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillCard = this.$refs.d1_BillCard;
      this.d1BillCard.queryDataByCondition({'crqlSerno': this.pageParams.crqlSerno}, 'post');
      this.d1BillCard.setItemEditable('CUS_ID', false);
      this.d1BillCard.setItemEditable('crqlSerno', false);
      this.imageBizParam[0].index.scanid = this.pageParams.crqlSerno;

      if (this.pageParams.szApply == 'szApply') {
        this.d1BillCard.setItemEditable('cusName', false);
        this.d1BillCard.setItemEditable('certType', false);
        this.d1BillCard.setItemEditable('certCode', false);
      } else {
        this.d1BillCard.setItemEditable('cusName', true);
        this.d1BillCard.setItemEditable('certType', true);
        this.d1BillCard.setItemEditable('certCode', true);
      }
    },

    onContinue () {
      // 检验必输项
      const saveFlag = this.d1BillCard.validateBillCardValue();
      var _this = this;

      if (!saveFlag) {
        return;
      }

      var certType = this.d1BillCard.getBillCardItemValue('certType');
      if (certType === 'Q' || certType === 'R') {
        if (!isOrgCode(this.d1BillCard.getBillCardItemValue('certCode'), certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      if(certType == 'P2') {
        if (!isZZM(this.d1BillCard.getBillCardItemValue('certCode'))) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }

      let model = {};
      // 更新数据
      yufp.clone(_this.$refs.d1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/update',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '更新成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    },

    onCommit () {
      // var crqlSerno = this.d1BillCard.getItemValue('crqlSerno');

      // var _this = this;
      // yufp.service.request({
      //   // 同步请求
      //   async: false,
      //   method: 'POST',
      //   url: _this.$backend.cmisBiz + '/api/creditreportqrylst/sendCredReportDZ',
      //   data: {crqlSerno: crqlSerno},
      //   callback: function (code, message, response) {
      //     if (response.code == '0') {
      //       _this.$xutils.showMsgBox('提示', '发送成功!', 500, 300, function () {
      //         _this.$dialog.close(_this.dialogId, 'success');
      //         // _this.nextPage();
      //       });
      //     } else {
      //       _this.$message({ message: response.erortx, type: 'error' });
      //     }
      //   }
      // });

      // 检验必输项
      const saveFlag = this.d1BillCard.validateBillCardValue();
      var _this = this;

      if (!saveFlag) {
        return;
      }

      var certType = this.d1BillCard.getBillCardItemValue('certType');
      if (certType === 'Q' || certType === 'R') {
        if (!isOrgCode(this.d1BillCard.getBillCardItemValue('certCode'), certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      if(certType == 'P2') {
        if (!isZZM(this.d1BillCard.getBillCardItemValue('certCode'))) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }

      let model = {};
      // 更新数据
      yufp.clone(_this.$refs.d1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/update',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.sendReport();
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    },

    sendReport () {
      var _this = this;
      var crqlSerno = this.d1BillCard.getItemValue('crqlSerno');
      var qryCls = this.d1BillCard.getItemValue('qryCls');
      var outSystemCode = 'ZXCXSQZLQY';
      var imageId = this.imageBizParam[0].index.scanid;
      yufp.service.request({
        method: 'POST',
        // 同步请求
        async: true,
        url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/commitStart`,
        data: {crqlSerno: crqlSerno, qryCls: qryCls, outSystemCode: outSystemCode, imageId: imageId},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.handleData();
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    handleData () {
      var _this = this;
      var crqlSerno = this.d1BillCard.getItemValue('crqlSerno');
      yufp.service.request({
        method: 'POST',
        // 异步请求
        async: false,
        url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/handlecreitdata`,
        data: crqlSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '查询成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            if (response.code != 'ZX9999') {
              _this.nextPage();
            } else {
              _this.$message({ message: response.erortx, type: 'error' });
            }
          }
        }
      });
    },

    nextPage () {
      let loginUser = this.$xutils.getLoginUserInfo();

      let rsPars = {
        systemId: 'cmis',
        orgId: loginUser.org.id,
        bizId: this.d1BillCard.getItemValue('crqlSerno'),

        // 流程申请类型会自动创建队列
        // bizType: 'WFI_CRED_IQP_ZXZ',
        bizType: 'ZX003',

        userId: loginUser.loginCode,

        // 客户名称
        bizUserName: this.d1BillCard.getBillCardItemValue('cusName'),

        // 客户编号
        bizUserId: this.d1BillCard.getBillCardItemValue('cusId')
      };

      // this.$xutils.wfInit(rsPars, this.afterCommitCallBack);
      this.$refs.yufpNwfInit.wfInit(rsPars);
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      // 刷新列表页面
      // this.getFactory().back();
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>
