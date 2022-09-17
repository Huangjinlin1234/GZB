<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cooPlanAppAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       * 合作方案申请向导
       * author yumeng@yusys.com.cn
       * date 2021-04-15
       **/
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.addEditChangeAction(this.cardChange);
      // 操作类型默认选中新增
      this.d1_BillCard.setItemValue('oprType', '1');
      // 合作方案编号默认不显示
      this.d1_BillCard.setItemVisible('coopPlanNo', false);
      // 合作方名称默认不可编辑
      this.d1_BillCard.setItemEditable('partnerName', false);
    },

    /**
       * 根据合作类型进行判断需要操作的内容
       **/
    cardChange (thisCard, key, oldValue, newValue) {
      // 操作类型为新增时不显示合作方案编号
      if (key == 'oprType' && newValue == '1') {
        this.d1_BillCard.setItemVisible('coopPlanNo', false);
        this.d1_BillCard.setItemEditable('partnerId;partnerType', true);
        this.d1_BillCard.setItemEditable('partnerName', false);
      } else if (key == 'oprType' && newValue != '1') {
        // 操作类型为变更时需要显示合作方案编号
        this.d1_BillCard.setItemVisible('coopPlanNo', true);
        this.d1_BillCard.setItemEditable('partnerId;partnerName;partnerType', false);
      }
      // 操作类型未其他时，合作方编号和名称可不填
      if (key == 'oprType' && newValue == '14') {
        this.d1_BillCard.setItemValue('partnerNo', '');
        this.d1_BillCard.setItemValue('partnerName', '');
        this.d1_BillCard.setItemEditable('partnerName;partnerId', true);
      } else if (key == 'oprType' && newValue != '14') {
        this.d1_BillCard.setItemValue('partnerNo', '');
        this.d1_BillCard.setItemValue('partnerName', '');
        this.d1_BillCard.setItemEditable('partnerName', false);
      }
    },
    /**
       * 保存合作方申请并跳转到详情页面
       **/
    nextSubmit () {
      const param = this.d1_BillCard.getBillCardValue();
      const validata = this.d1_BillCard.validateBillCardValue();
      if (!validata) {
        return false;
      }
      // 生成业务流水号
      param.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO', {
        'bizType': param.partnerType
      });
      let title = '合作方准入申请-新增';
      if (param.oprType == '1') {
        param.coopPlanNo = this.$xutils.getSEQWithParamFromServer('COOP_PLAN_NO');
      } else {
        title = '合作方准入申请-变更';
        const loginUser = this.$xutils.getLoginUserInfo();
        if (param.managerId != loginUser.loginCode) {
          this.$xutils.showMsgBox('提示', '合作方案责任人，才能对该合作方进行合作方变更！', 400, 300);
          return false;
        }
      }
      let _this = this;
      // 合作方准入create初始化数据默认审批类型为待发起
      param.apprStatus = '000';
      param.indgtResult = '01';
      param.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      param.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/coopplanapp/queryDataAndRisk',
        data: {condition: JSON.stringify({custId: param.partnerNo})},
        success: (response, status, xhr) => {
          if (response.code == 0) {
            param.isBankRiskAltCus = response.data.isBankRiskAltCus;
          } else {
            this.$xutils.showMsgBox('提示', '数据异常', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: this.$backend.cmisCus + '/api/cusgrpmemberrel/queryDataAndGrp',
        data: {condition: JSON.stringify({cusId: param.partnerNo})},
        success: (response, status, xhr) => {
          if (response.code == 0) {
            param.isGrpCus = response.data.isGrpCus;
            param.isBankCorre = response.data.isBankCorre;
          } else {
            this.$xutils.showMsgBox('提示', '数据异常', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/create',
        data: JSON.stringify(param),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            const appData = response.data;
            _this.$dialog.close(_this.dialogId);
            let jsonObjData = {};
            this.$xutils.clone(appData, jsonObjData);
            let name = 'bizmanage/coopBiz/coopPlanApp/cooPlanAppInfo';
            let key = 'cooPlanAppInfoAdd' + new Date().getTime();
            param.op = 'edit';
            jsonObjData.flag = '合作方';
            if (param.oprType != '1') {
              param.isFromAppChangeMenu = true;
            }
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key, // 必传
              // 页签名称
              title: title,
              // 传递的业务数据，可选配置
              data: jsonObjData
            });
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },
    /**
       * 关闭页面
       **/
    goback () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
