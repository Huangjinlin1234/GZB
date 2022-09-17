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
import d1Billcard from './creditSZReportQryInfoInsect_d1_BillCard.vue';
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
      this.d1BillCard.setItemValue('qryCls', '苏州地方', '3');
      this.d1BillCard.execBillCardDefaultValueFormula();
      const crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      this.d1BillCard.setItemValue('crqlSerno', crqlSerno, crqlSerno);
      this.d1BillCard.setItemEditable('crqlSerno', false);
      this.imageBizParam[0].index.scanid = crqlSerno;
    },

    onSave () {
      // 检验必输项
      const saveFlag = this.d1BillCard.validateBillCardValue();
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

      var _this = this;
      let model = {};
      // 保存数据
      yufp.clone(_this.$refs.d1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/create',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    },

    onCommit () {
      // 添加权限校验得代码
      const saveFlag = this.d1BillCard.validateBillCardValue();

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

      var _this = this;
      var model = {};
      // 标签名 _this.$refs. 后面的是 ref="cusCorpBase" 属性
      yufp.clone(_this.$refs.d1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      // 保存数据
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/creditreportqrylst/createandupdate',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.sendReport();
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);

            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
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
        async: false,
        url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/commitStart`,
        data: {crqlSerno: crqlSerno, qryCls: qryCls, outSystemCode: outSystemCode, imageId: imageId},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.handleData();
          } else {
            _this.delete(crqlSerno);
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
              _this.afterSaveCommit();
            } else {
              _this.$message({ message: response.erortx, type: 'error' });
              _this.delete(crqlSerno);
            }
          }
        }
      });
    },

    // 回滚操作
    delete (crqlSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/delete/${crqlSerno}`
      });
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      // var crqlSerno = this.d1BillCard.getItemValue('crqlSerno');
      // this.$xutils.request({
      //   // 同步请求
      //   async: false,

      //   url: this.$backend.cmisBiz + '/api/creditreportqrylst/sendCredReport',
      //   data: {crqlSerno: crqlSerno},

      //   success: (response, status, xhr) => {
      //     if (response.data > 0) {
      //       this.$xutils.showMsgBox('提示', '发送成功', 350, 150, () => {
      //          //this.afterSaveCommit();
      //       });
      //     }
      //   },

      //   error: (result, b) => {
      //     this.$xutils.showMsgBox('提示', b + '；错误信息：' + result.responseJSON.message); // 弹出提示
      //   }
      // });

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

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      // 刷新列表页面
      // this.getFactory().back();
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>
