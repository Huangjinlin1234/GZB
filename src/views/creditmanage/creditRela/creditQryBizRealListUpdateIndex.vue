<template>
  <d1-billcard ref="d1_BillCard" :paramsBillCard="pageParams"></d1-billcard>
</template>
<script>
import d1Billcard from './creditQryBizRealListUpdateIndex_d1_BillCard.vue';
import { isOrgCode, isZZM } from '@/utils/validate';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
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
      // this.d1BillCard.setItemEditable('cusId', false);
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

      // 保存
      var model = {};
      model = _this.pageParams;
      yufp.clone(_this.d1BillCard.$refs.refForm.formdata, model);
      model.flag = this.pageParams.flag; // 其他业务传入值
      model['qryFlag'] = '02';
      this.checkQryResn(model);

      // 修改数据
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/updateCreditAndRel',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '修改成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    },

    updateCreditQryBiz (model) {
      var _this = this;
      // 保存数据
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditqrybizreal/update',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '修改成功!', 500, 300, function () {
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
