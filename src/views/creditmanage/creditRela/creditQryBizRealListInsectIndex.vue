<template>
  <d1-billcard ref="d1_BillCard" :paramsBillCard="pageParams"></d1-billcard>
</template>
<script>
import d1Billcard from './creditQryBizRealListInsectIndex_d1_BillCard.vue';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillCard: null,
      crqlSerno: ''
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
      this.crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      // this.d1BillCard.setBillCardItemValue('crqlSerno', crql_serno);
      this.d1BillCard.setBillCardItemValue('scene', '01');
    },

    checkQryResn (model) {
      // 授信管理-01 合同签订-02 出账放款-03 贷后检查-04

      // 个人
      if (model.qryCls == '0') {
        // 主借款人(共同借款人) 授信管理 -> 贷款审批
        // 主借款人(共同借款人) 合同签订 -> 贷款审批
        // 主借款人(共同借款人) 出账放款 -> 贷款审批

        // 主借款人(共同借款人) 贷后检查 -> 贷后管理
        // 担保人 贷后检查 -> 贷后管理
        // 法定代表、出资人及关联人等 贷后检查 -> 贷后管理
        // 其他关系人 贷后检查 -> 贷后管理

        if ((model.borrowRel == '001' || model.borrowRel == '005') && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '02';
        } else if ((model.borrowRel == '001' || model.borrowRel == '005' || model.borrowRel == '007' || model.borrowRel == '008' || model.borrowRel == '009') && this.pageParams.period == '04') {
          model.qryResn = '27';

        // 担保人 授信管理 -> 担保资格审查
        // 担保人 合同签订 -> 担保资格审查
        // 担保人 出账放款 -> 担保资格审查
        } else if (model.borrowRel == '007' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '08';

        // 法定代表、出资人及关联人等 授信管理 -> 法人代表、出资人及关联人等资信审查
        // 法定代表、出资人及关联人等 合同签订 -> 法人代表、出资人及关联人等资信审查
        // 法定代表、出资人及关联人等 出账放款 -> 法人代表、出资人及关联人等资信审查
        } else if (model.borrowRel == '008' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '22';

        // 其他关系人 授信管理 -> 资信审查
        // 其他关系人 合同签订 -> 资信审查
        // 其他关系人 出账放款 -> 资信审查
        } else if (model.borrowRel == '009' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '25';
        }
      } else {
        // 企业

        // 主借款人 授信管理 -> 贷前审查/额度审批
        // 主借款人 合同签订 -> 贷前审查/额度审批
        // 主借款人 出账放款 -> 贷前审查/额度审批

        // 主借款人 贷后检查 -> 贷后管理
        // 共同借款人 贷后检查 -> 贷后管理
        // 担保人 贷后检查 -> 贷后管理
        // 关联人 贷后检查 -> 贷后管理
        if (model.borrowRel == '001' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '01';
        } else if ((model.borrowRel == '001' || model.borrowRel == '005' || model.borrowRel == '007' || model.borrowRel == '008') && this.pageParams.period == '04') {
          model.qryResn = '27';

        // 共同借款人 授信管理 -> 贷前审查
        // 共同借款人 合同签订 -> 贷前审查
        // 共同借款人 出账放款 -> 贷前审查
        } else if (model.borrowRel == '005' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '01';

        // 担保人 授信管理 -> 担保审查
        // 担保人 合同签订 -> 担保审查
        // 担保人 出账放款 -> 担保审查
        } else if (model.borrowRel == '007' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '18';

        // 关联人 授信管理 -> 关联查询
        // 关联人 合同签订 -> 关联查询
        // 关联人 出账放款 -> 关联查询
        } else if (model.borrowRel == '003' && (this.pageParams.period == '01' || this.pageParams.period == '02' || this.pageParams.period == '03')) {
          model.qryResn = '05';
        }
      }

      // 合作方、担保公司、楼盘、委贷等进行准入时“征信查询原因”为额度审批，“与主借款人关系”为主借款人
      if (model.flag == '合作方' && model.borrowRel == '001' && model.qryCls == '1') {
        model.qryResn = '17';
      }
    },

    onSave () {
      // 添加权限校验得代码
      const saveFlag = this.d1BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      var certType = this.d1BillCard.getBillCardItemValue('certType');
      var qryCls = this.d1BillCard.getBillCardItemValue('qryCls');
      if(!((certType == 'A' || certType == 'B' || certType == 'C' || certType == 'D' || certType == 'E' || certType == 'F' || certType == 'G'
       || certType == 'H' || certType == 'I' || certType == 'J' || certType == 'K' || certType == 'L' || certType == 'S' || certType == 'W' || certType == 'X' || certType == 'Y'))) { // 征信查询类别为个人类型
        this.$message({ message: '请选择个人客户查询', type: 'warning' });
        return;
      }
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

      // 保存数据
      var _this = this;
      var model = {};

      yufp.clone(_this.d1BillCard.$refs.refForm.formdata, model);
      model.crqlSerno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
      model.bizSerno = this.pageParams.bizSerno; // 其他业务传入值
      model.flag = this.pageParams.flag; // 其他业务传入值
      model['qryFlag'] = '01';
      model['scene'] = this.pageParams.period;
      // 设置授权书编号
      let authbookNo = this.$xutils.getSEQWithParamFromServer('AUTHBOOK_NO_SEQ');
      if (authbookNo) {
        model['authbookNo'] = authbookNo;
      }
      this.checkQryResn(model);

      yufp.service.request({ // 此页面只能拿到主借款人客户号，现用客户号取查询该客户信息
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: this.pageParams.borrowerCusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            model.borrowerCusId = response.data.cusId; // 客户号
            model.borrowerCusName = response.data.cusName; // 客户姓名
            model.borrowerCertCode = response.data.certCode; // 证件号码
            // 保存征信信息数据
            yufp.service.request({
              // 同步请求
              async: false,
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/creditreportqrylst/createCreditAndRel',
              data: JSON.stringify(model),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  // _this.saveCreditQryBiz(model);
                  _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
                    _this.$dialog.close(_this.dialogId, 'success');
                  });
                } else {
                  _this.$message({ message: response.erortx, type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    saveCreditQryBiz (model) {
      var _this = this;
      // 保存关联征信业务信息
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditqrybizreal/createBySerno',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
