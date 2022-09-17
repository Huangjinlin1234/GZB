<template>
  <div class="retail-review">
    <yu-collapse v-model="activeNames">
      <yu-collapse-item :title="titleList[index]" v-for="(item,index) in dataList.length" :key="index" :name="index">
        <yu-xform ref="reviewForm" label-width="200px" disabled>
          <yu-xform-group :column="2">
            <yu-xform-item label="数字解读值" name="digIntVal" v-model="reviewformdata.digIntVal"></yu-xform-item>
            <yu-xform-item label="数字解读值风险等级" name="digIntValRiskLvl" v-model="reviewformdata.digIntValRiskLvl"></yu-xform-item>
            <yu-xform-item label="申请评分" name="appScore" v-model="reviewformdata.appScore"></yu-xform-item>
            <yu-xform-item label="申请评分风险等级" name="appScoreRiskLvl" v-model="reviewformdata.appScoreRiskLvl" data-code=""></yu-xform-item>
            <yu-xform-item label="综合风险等级" name="inteRiskLvl" v-model="reviewformdata.inteRiskLvl"></yu-xform-item>
            <yu-xform-item label="规则风险等级"  ctype="select" name="ruleRiskLvl" v-model="reviewformdata.ruleRiskLvl" data-code="STD_INTE_RISK_LVL"></yu-xform-item>
            <yu-xform-item label="额度建议" name="lmtAdvice" v-model="reviewformdata.lmtAdvice"></yu-xform-item>
            <yu-xform-item label="客户等级" name="cusLvl" v-model="reviewformdata.cusLvl"></yu-xform-item>
            <yu-xform-item label="公积金缴存基数" name="pundDepositBase" v-model="reviewformdata.pundDepositBase"></yu-xform-item>
            <yu-xform-item label="AUM" name="aum" v-model="reviewformdata.aum"></yu-xform-item>
            <yu-xform-item label="代发工资" name="payrollCredit" v-model="reviewformdata.payrollCredit"></yu-xform-item>
            <yu-xform-item label="我行房贷授信金额" name="loanCredirAmtBank" v-model="reviewformdata.loanCredirAmtBank"></yu-xform-item>
            <yu-xform-item label="他行房贷授信金额" name="loanCredirAmtOtherBank" v-model="reviewformdata.loanCredirAmtOtherBank"></yu-xform-item>
            <yu-xform-item label="消费贷款累计金额" name="consumerLoanBalAmt" v-model="reviewformdata.consumerLoanBalAmt"></yu-xform-item>
            <yu-xform-item label="日费率" name="dailyFeeRate" v-model="reviewformdata.dailyFeeRate"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-collapse-item>
    </yu-collapse>
    <div class="yu-grpButton" v-if="node.pageType=='TODO'">
      <yu-button type="primary" @click="viewRuleFn">查看触发规则</yu-button>
    </div>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
lookup.reg('STD_INTE_RISK_LVL');
export default {
  name: 'RetailReview',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbyserno'
      },
      activeNames: [0, 1],
      reviewformdata: {},
      dataList: [],
      titleList: []
    };
  },
  methods: {
    getFormData () {
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.reviewformdata = clone(data[0] || {}, {});
          this.dataList = data || [];
          this.$lookup.bind('STD_CARD_APPLY_CARD_PRD', lookup => {
            if (this.dataList.length === 1) {
              this.titleList = [].concat([lookup[data[0].applyCardPrd]]);
            } else {
              this.titleList = [].concat([this.$lookup.convertKey('STD_CARD_APPLY_CARD_PRD', data[0].applyCardPrd), '普通卡']);
            }
          });
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    // 查看零售内评
    viewRuleFn () {
      const url = this.getLsnpRirsUrl();
      // let date = new Date();
      if (url != '') {
        this.$nextTick(function () {
          window.open(url, '_blank');
        });
      }
    },
    //  获取跳转押品系统url
    getLsnpRirsUrl () {
      let _this = this;
      let lsnprirsurl;
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqpcuslsnpinfo/getlsnprirsurl',
        data: {iqpSerno: this.node.bizId, managerId: _this.$xutils.getLoginUserInfo().loginCode},
        success: (response, status, xhr) => {
          if (response.data != null) {
            lsnprirsurl = response.data;
          }
        }
      });
      return lsnprirsurl;
    }
  },
  created () {
    this.getFormData();
  }
};
</script>
<style scoped>
.retail-review {
  height: 100%;
}
</style>