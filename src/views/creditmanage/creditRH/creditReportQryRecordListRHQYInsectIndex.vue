<template>
  <yu-tabs type="card">
    <yu-tab-pane label="征信信息">
      <d1-1-billcard ref="d1_1_BillCard"></d1-1-billcard>
      <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" lazy="true">
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billcard from './creditReportQryRecordListRHQYInsect_d1_1_BillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d11Billcard, imageSystem, yufpNwfInit},
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
      d11BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d11BillCard = this.$refs.d1_1_BillCard;
      this.d11BillCard.execBillCardDefaultValueFormula();
      this.d11BillCard.addEditChangeAction(this.d1BillCardChange);// 监听这个卡片事件

      let crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      if (crqlSerno && crqlSerno.data && crqlSerno.data.length > 0) {
        crqlSerno = crqlSerno.data[0];
      }
      this.imageBizParam[0].index.scanid = crqlSerno;
      // 设置授权书编号
      let authbookNo = this.$xutils.getSEQWithParamFromServer('AUTHBOOK_NO_SEQ');
      if (authbookNo && authbookNo.data && authbookNo.data.length > 0) {
        authbookNo = authbookNo.data[0];
      }

      this.d11BillCard.setItemValue('crqlSerno', crqlSerno, crqlSerno);
      this.d11BillCard.setItemValue('authbookNo', authbookNo, authbookNo);
      this.d11BillCard.setBillCardItemVisible('qryResnDec', false);
      this.d11BillCard.setItemEditable('crqlSerno', false);
      this.d11BillCard.setItemEditable('authbookNo', false);
    },

    d1BillCardChange (d1BillCard, thisItem, oldValue, newValue) {
      if (thisItem == 'qryResn') {
        let mborrowCorre = d1BillCard.getItemValue('borrowRel');

        // 主借款人  贷前审查
        if (mborrowCorre == '001' && newValue == '01') {
          d1BillCard.setItemValue('authbookContent', '008;007');
          // 主借款人（合作方、担保公司、楼盘、委贷等） 额度审批
        } else if (mborrowCorre == '001' && newValue == '17') {
          d1BillCard.setItemValue('authbookContent', '011;007');
          // 担保人 担保审查
        } else if (mborrowCorre == '007' && newValue == '18') {
          d1BillCard.setItemValue('authbookContent', '009;007');
          // 关联人  关联查询
        } else if (mborrowCorre == '003' && newValue == '05') {
          d1BillCard.setItemValue('authbookContent', '010;007');
          // 共同借款人  贷前审查
        } else if (mborrowCorre == '005' && newValue == '01') {
          d1BillCard.setItemValue('authbookContent', '008;007');
        } else {
          d1BillCard.setItemValue('authbookContent', '');
        }
      }

      if (thisItem == 'borrowRel') {
        let qryResn = d1BillCard.getItemValue('qryResn');

        // 主借款人  贷前审查
        if (qryResn == '01' && newValue == '001') {
          d1BillCard.setItemValue('authbookContent', '008;007');
          // 主借款人（合作方、担保公司、楼盘、委贷等） 额度审批
        } else if (qryResn == '17' && newValue == '001') {
          d1BillCard.setItemValue('authbookContent', '011;007');
          // 担保人 担保审查
        } else if (qryResn == '18' && newValue == '007') {
          d1BillCard.setItemValue('authbookContent', '009;007');
          // 关联人  关联查询
        } else if (qryResn == '05' && newValue == '003') {
          d1BillCard.setItemValue('authbookContent', '010;007');
          // 共同借款人  贷前审查
        } else if (qryResn == '01' && newValue == '005') {
          d1BillCard.setItemValue('authbookContent', '008;007');
        } else {
          d1BillCard.setItemValue('authbookContent', '');
        }
      }

      if (thisItem == 'qryResn') {
        let qryResn = d1BillCard.getItemValue('qryResn');

        if (qryResn == '27') {
          d1BillCard.setBillCardItemVisible('qryResnDec', true);
          d1BillCard.setItemValue('authbookDate', this.$xutils.getDefaultformulaData('$CURRDATE'));
          d1BillCard.setItemEditable('authbookDate', false);
          d1BillCard.setItemValue('authbookNo', null);
          d1BillCard.setItemEditable('authbookNo', true);
          d1BillCard.$data.isRequired = false;
        } else {
          d1BillCard.setBillCardItemVisible('qryResnDec', false);
          d1BillCard.setItemValue('authbookDate', null);
          d1BillCard.setItemEditable('authbookDate', true);
          d1BillCard.setItemValue('authbookNo', this.$xutils.getSEQWithParamFromServer('AUTHBOOK_NO_SEQ'));
          d1BillCard.setItemEditable('authbookNo', false);
          d1BillCard.$data.isRequired = true;
        }
      }

      if (thisItem == 'authbookNo') {
        if (d1BillCard.getItemValue('imageNo') && d1BillCard.getItemValue('authbookNo')) {
          this.imageBizParam[0].index.scanid = d1BillCard.getItemValue('imageNo');
          d1BillCard.setItemEditable('authbookContent', false);
        } else {
          this.imageBizParam[0].index.scanid = d1BillCard.getItemValue('crqlSerno');
          d1BillCard.setItemEditable('authbookContent', true);
        }
      }
    },

    onSave () {
      // 检验必输项
      const saveFlag = this.d11BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      var certType = this.d11BillCard.getBillCardItemValue('certType');
      if (certType === 'Q' || certType === 'R') {
        if (!isOrgCode(this.d11BillCard.getBillCardItemValue('certCode'), certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      if(certType == 'P2') {
        var tt = this.d11BillCard.getBillCardItemValue('certCode')
        if (!isZZM(this.d11BillCard.getBillCardItemValue('certCode'))) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      // 保存数据
      var _this = this;
      let model = {};
      // 保存数据
      yufp.clone(_this.$refs.d1_1_BillCard.$refs.refForm.formdata, model);
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
      const saveFlag = this.d11BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      var certType = this.d11BillCard.getBillCardItemValue('certType');
      if (certType === 'Q' || certType === 'R') {
        if (!isOrgCode(this.d11BillCard.getBillCardItemValue('certCode'), certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }
      if(certType == 'P2') {
        if (!isZZM(this.d11BillCard.getBillCardItemValue('certCode'))) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }

      var _this = this;
      let model = {};
      yufp.clone(_this.$refs.d1_1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      // 保存数据
      yufp.service.request({
        method: 'POST',
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/createandupdate',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.sendReport();
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    sendReport () {
      var _this = this;
      var crqlSerno = this.d11BillCard.getItemValue('crqlSerno');
      var qryCls = this.d11BillCard.getItemValue('qryCls');
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
            _this.afterSaveCommit();
          } else {
            _this.delete(crqlSerno);
            _this.$message({ message: response.erortx, type: 'error' });
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
      let loginUser = this.$xutils.getLoginUserInfo();
      let bizType = 'ZX001';
      // 区分是否是小微客户经理
      if (this.$store.getters.selectedRoles.code == 'R0010') {
        bizType = 'ZX002';
      } else {
        bizType = 'ZX001';
      }

      // 判断是否是东海机构
      if (loginUser.org.code.substring(0, 2) == '81') {
        bizType = 'DHM01';
      }

      let rsPars = {
        systemId: 'cmis',
        orgId: loginUser.org.id,
        bizId: this.d11BillCard.getItemValue('crqlSerno'),

        // 流程申请类型会自动创建队列
        // bizType: 'WFI_CRED_IQP_ZXZ',
        bizType: bizType,

        userId: loginUser.loginCode,

        // 客户名称
        bizUserName: this.d11BillCard.getBillCardItemValue('cusName'),

        // 客户编号
        bizUserId: this.d11BillCard.getBillCardItemValue('cusId'),

        // 条件判断
        param: {
          bizFlag: this.d11BillCard.getItemValue('qryResn'),
          bizQryCls: this.d11BillCard.getItemValue('qryCls')
        }
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
