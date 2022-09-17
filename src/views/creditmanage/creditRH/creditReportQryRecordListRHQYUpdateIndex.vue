<template>
  <yu-tabs type="card">
    <yu-tab-pane label="征信信息">
      <d1-billcard :isBorrowRel="pageParams.isBorrowRel ? false : true" ref="d1_BillCard"></d1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" lazy="true">
    <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
  </yu-tabs>
</template>
<script>
import d1Billcard from './creditReportQryRecordListRHQYUpdate_d1_BillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard, imageSystem, yufpNwfInit},
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
      this.imageBizParam[0].index.scanid = this.pageParams.crqlSerno;
      // this.d1BillCard.setItemEditable('CUS_ID', false);
      this.d1BillCard.execBillCardDefaultValueFormula();
      this.d1BillCard.addEditChangeAction(this.d1BillCardChange);// 监听这个卡片事件
      this.d1BillCard.setBillCardItemVisible('qryResnDec', false);
      this.d1BillCard.setItemEditable('crqlSerno', false);
      this.d1BillCard.setItemEditable('authbookNo', false);
      if (this.pageParams.creditRela) {
        this.d1BillCard.setItemEditable('qryResn', false);
        this.d1BillCard.setItemEditable('borrowerCusId', false);
        this.d1BillCard.setItemEditable('borrowerCusName', false);
        this.d1BillCard.setItemEditable('borrowerCertCode', false);

        this.d1BillCard.setItemEditable('borrowRel', false);
        this.d1BillCard.setItemEditable('cusId', false);
        this.d1BillCard.setItemEditable('cusName', false);
        //this.d1BillCard.setItemEditable('certType', false);
        //this.d1BillCard.setItemEditable('certCode', false);
      }
      this.queryLoan();
      // if (this.pageParams.view) {
      //   this.d1BillCard.formDis = true;
      //   this.d1BillCard.showbtn = false;
      // }
    },

    d1BillCardChange (d1BillCard, thisItem, oldValue, newValue) {
      if (thisItem == 'qryResn') {
        const mborrowCorre = d1BillCard.getItemValue('borrowRel');

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
          if (!this.pageParams.authbookContent && this.pageParams.isBorrowRel != 'isBorrowRel') {
            d1BillCard.setItemValue('authbookContent', null);
          }
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
          if (!this.pageParams.authbookContent && this.pageParams.isBorrowRel != 'isBorrowRel') {
            d1BillCard.setItemValue('authbookContent', null);
          }
        }
      }

      if (thisItem == 'qryResn') {
        let qryResn = d1BillCard.getItemValue('qryResn');

        if (qryResn == '27') {
          d1BillCard.setBillCardItemVisible('qryResnDec', true);
          if (this.pageParams.isBorrowRel != 'isBorrowRel') {
            d1BillCard.setItemValue('authbookDate', this.$xutils.getDefaultformulaData('$CURRDATE'));
          }
          d1BillCard.setItemEditable('authbookDate', false);
          if (!this.pageParams.authbookNo && this.pageParams.isBorrowRel != 'isBorrowRel') {
            d1BillCard.setItemValue('authbookNo', null);
          }
          d1BillCard.setItemEditable('authbookNo', true);
          d1BillCard.$data.isRequired = false;
        } else {
          d1BillCard.setBillCardItemVisible('qryResnDec', false);
          if (!this.pageParams.authbookDate) {
            d1BillCard.setItemValue('authbookDate', null);
          }
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

      if (this.pageParams.creditRela && d1BillCard.getItemValue('authbookContent') && d1BillCard.getItemValue('qryResn') != '27') {
        d1BillCard.setItemEditable('authbookContent', false);
      }
    },

    // 查询贷款融资信息
    queryLoan () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportloanfina/querybycrqlserno',
        data: _this.pageParams.crqlSerno,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            if (response.data.legalName || response.data.legalPhone || response.data.otherBankIsFin || response.data.ourBankIsFin || response.data.applyFinAmt || response.data.applyFinTerm || response.data.applyFinGuarType || response.data.applyFinRemark) {
              _this.$refs.d1_BillCard.$data.isShowLoan = true;
              _this.$refs.d1_BillCard.$data.formdata.legalName = response.data.legalName;
              _this.$refs.d1_BillCard.$data.formdata.legalPhone = response.data.legalPhone;
              _this.$refs.d1_BillCard.$data.formdata.otherBankIsFin = response.data.otherBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.ourBankIsFin = response.data.ourBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.applyFinAmt = response.data.applyFinAmt;
              _this.$refs.d1_BillCard.$data.formdata.applyFinTerm = response.data.applyFinTerm;
              _this.$refs.d1_BillCard.$data.formdata.applyFinGuarType = response.data.applyFinGuarType;
              _this.$refs.d1_BillCard.$data.formdata.applyFinRemark = response.data.applyFinRemark;
            }
          } else {
            // _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    onSave () {
      // 检验必输项
      const saveFlag = this.d1BillCard.validateBillCardValue();
      var _this = this;
      let model = {};

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

      // 更新数据
      yufp.clone(_this.$refs.d1_BillCard.$refs.refForm.formdata, model);
      model['qryFlag'] = '01';
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/update',
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

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    onCommit () {
      var _this = this;

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

      let model = {};
      // 更新数据
      yufp.clone(_this.d1BillCard.$refs.refForm.formdata, model);
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
            _this.nextPage();
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },
    nextPage () {
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
        bizId: this.d1BillCard.getItemValue('crqlSerno'),

        // 流程申请类型会自动创建队列
        // bizType: 'WFI_CRED_IQP_ZXZ',
        bizType: bizType,

        userId: loginUser.loginCode,

        // 客户名称
        bizUserName: this.d1BillCard.getBillCardItemValue('cusName'),

        // 客户编号
        bizUserId: this.d1BillCard.getBillCardItemValue('cusId'),

        // 条件判断
        param: {
          bizFlag: this.d1BillCard.getItemValue('qryResn'),
          bizQryCls: this.d1BillCard.getItemValue('qryCls')
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
