<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账通知明细查看
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata" :disabled="true">
      <yu-panel title="基本信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno"  ></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" ></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="交易对手账户" ctype="input" placeholder="交易对手账户" name="toppAccno" ></yu-xform-item>
            <yu-xform-item label="交易对手名称" ctype="input" placeholder="交易对手名称" name="toppName" ></yu-xform-item>
            <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="toppBankNo" ></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="toppBankName" ></yu-xform-item>
            <yu-xform-item label="交易对手金额" ctype="input" placeholder="交易对手金额" name="toppAmt"  ></yu-xform-item>
            <yu-xform-item label="状态" ctype="select" placeholder="状态" name="status"  data-code="TOPP_ACC_STATUS"></yu-xform-item>
            <yu-xform-item label="原因一" ctype="textarea" placeholder="原因一" name="reasonFirst"  ></yu-xform-item>
            <yu-xform-item label="原因二" ctype="textarea" placeholder="原因二" name="reasonSecond" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" ></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" ></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('TOPP_ACC_STATUS');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tableFormdata: {}
    };
  },

  mounted () {
    var _this = this;
    let data = _this.$route.meta.params;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/toppaccpaydetail/showdetial',
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.tableFormdata);
      }
    });
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      this.$router.go(-1);
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>