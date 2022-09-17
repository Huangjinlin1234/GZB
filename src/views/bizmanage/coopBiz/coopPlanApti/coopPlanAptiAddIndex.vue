<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanAptiAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      operate: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // //合作方资质信息 新增
    afterInit () {
      var data = this.pageParams;
      this.operate = this.pageParams.operate;
      const jsoPar = this.d1_BillCard = this.$refs.d1_BillCard;
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      jsoPar.managerId = jsoUser['loginCode'];// 主办人
      jsoPar.managerBrId = jsoUser['orgCode'];// 主办机构
      jsoPar.inputId = jsoUser['loginCode'];// 登记人
      jsoPar.inputBrId = jsoUser['orgCode'];// 登记机构
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 登记日期
      jsoPar.updId = jsoUser['loginCode'];// 最后修改人
      jsoPar.updBrId = jsoUser['orgCode'];// 最后修改机构
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 最后修改日期
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.addEditChangeAction(this.showStyleFun);
      this.d1_BillCard.setBillCardValue(data);
    },
    // 到期日期必须大于等于当前日期
    showStyleFun () {
      // 获取系统当前日期
      const beginDate = this.d1_BillCard.getBillCardItemValue('current_date');
      const endDate = this.d1_BillCard.getBillCardItemValue('apti_lice_regi_date');
      if (beginDate != '' && endDate != '' && beginDate > endDate) {
        this.$xutils.showMsgBox('提示', '到期日期必须大于等于当前日期!');
        return;
      }
    },
    // 【保存】按钮的逻辑
    save () {
      const _this = this;
      // 校验
      const isValidateSucess = _this.d1_BillCard.validateBillCardValue();
      if (!isValidateSucess) {
        return;
      }
      var pageData = _this.d1_BillCard.getBillCardValue();
      // 保存数据
      let url = '';
      if (_this.operate == 'add') {
        url = _this.$backend.cmisBiz + '/api/coopplanaptiinfo/';
      } else {
        url = _this.$backend.cmisBiz + '/api/coopplanaptiinfo/update';
      }
      _this.$xutils.request({
        url: url,
        data: JSON.stringify(pageData),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.$xutils.showMsgBox('提示', '保存成功');
            _this.$dialog.close(_this.dialogId);
          }
        }
      });
    },
    bycancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
