<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpWriteOffAppAdd_d1_BillCard.vue'
/**
 * title 呆账核销申请引导界面
 * author 马顺
 * date 2021-01-19
 * */
let condition = '';

export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    // 初始化页面
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
    },
  
    // 下一步
    doNextStep() {
      // 必输校验
      let validateFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!validateFlag) {
        return;
      }
  
      // 获取页面保存数据
      let params = this.d1_BillCard.getBillCardValue();
  
      // 调用后端生成放款申请记录的ajax请求
      let rtnData = {};
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisBiz + '/api/iqpwriteoffapp/saveIqpWriteOffAppLeadInfo/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
  
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
  
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }
  
      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
        return;
      }
  
      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');
        params['model_group_no'] = 'CMG000058';// 呆账核销信息模板组
        params['iqp_serno'] = rtnData.iqpSerno;
        params['op'] = 'EDIT';
  
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      });
    },
  
    // 取消
    doBack() {
      this.$xutils.getParentPage(this, null, 'refreshBillListData');
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
