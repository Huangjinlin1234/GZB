<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusUnitDefend_d1_BillCard.vue'
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
    /*
      个人客户工作信息
       */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      if (this.getFactory().contextData != null && this.getFactory().contextData != 'undefined') {
        // 客户编号
        if (this.getFactory().contextData.cusId != null && this.getFactory().contextData.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cusId);
        }
  
        // 客户名称
        if (this.getFactory().contextData.bizType != null && this.getFactory().contextData.bizType != 'undefined') {
          //业务条线（1:正式/2:临时）
          var biz_type = this.getFactory().contextData.bizType;
  
          if (biz_type == 'B02') {
            // 雇佣状态;营业执照号码;经营状况;经营企业名称/工作单位;经营企业统一社会信用代码;单位性质;单位所属行业;单位地址;职务;职称;参加工作年份;收入币种;家庭年收入(元); 个人年收入
            this.d1_BillCard.setBillCardItemRequired(
              'employee_status;blic_no;oper_status;unit_name;unify_credit_code;indiv_com_typ;indiv_com_trade;unit_addr;job_ttl;indiv_crtfctn;' + 'work_date;earning_cur_type;;family_y_score;indiv_yearn',
              false
            );
          }
        }
      }
  
      // 加载默认值
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    // 暂存
    save() {
      const Data = this.d1_BillCard.getBillCardValue();
  
      this.$xutils.request({
        // 同步请求
        async: true,
  
        url: this.$backend.cmisCus + '/api/cusindivunit/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
  
        success: (response, status, xhr) => {
          if (response.code == '0') {
            //自动刷新列表数据
            this.$xutils.showMsgBox('提示', '暂存成功', 500, 300, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
  
            
            // exit;// ajax中return不生效，可以用exit
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          
        }
      });
    },
  
    // 返回
    doBack() {
      this.getFactory().back();
      // window.parent.back();
    },
  
    commit() {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      this.save();
    }
  }
};
</script>
