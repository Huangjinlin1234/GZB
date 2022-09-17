<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="200px" v-model="formdata" disabled>
            <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批编号" ctype="input" name="iqpSerno" disabled ></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="input" name="appDate" disabled></yu-xform-item>
                <yu-xform-item label="客户经理" ctype="input" name="managerId" disabled></yu-xform-item>
                <yu-xform-item label="分支机构" ctype="input" name="managerBrId" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="客户信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="所属行业" ctype="input" name="tradeClass" rules="required" ></yu-xform-item>
                <yu-xform-item label="产品编号" ctype="input" name="prdId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="是否关联信息" :hideFilter="false" :collapseHide="false">
             <yu-xform-group :column="2">
               <yu-xform-item label="是否关联信息" ctype="input" name="tradeClass"  @click="gotradeClass" @click.stop icon="search"  disabled></yu-xform-item>
            </yu-xform-group>
            </yu-panel>
            <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请金额" ctype="num" unit="元" name="appAmt" rules="required" ></yu-xform-item>
                <yu-xform-item label="申请期限" ctype="input" unit="月" name="appTerm" rules="required" ></yu-xform-item>
                <yu-xform-item label="报价利率"  name="offerRate" ctype="yu-num" rules="required"   placeholder="报价利率" sign="%" :multiple="100" ></yu-xform-item>
                <yu-xform-item label="申请执行利率"  name="appRate" ctype="yu-num" rules="required"   placeholder="申请执行利率" sign="%" :multiple="100" ></yu-xform-item>
                <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" ></yu-xform-item>
                <yu-xform-item label="担保方式说明" ctype="textarea" rules="required" name="guarDetailMode" :rows="3" :colspan="24"></yu-xform-item>
                <yu-xform-item label="申请原因" ctype="textarea" rules="required" name="appReason" :rows="3" :colspan="24"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinForm from '@/utils/mixins/mixin-list';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_GUAR_WAY');
export default {
  mixins: [mixinForm],
  components: { yufpNwfInit, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      activeName: 'basicTab'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit: function () {
      var _this = this;
      // 流程页面跳转
      let iqpSerno = _this.$route.params.iqpSerno || _this.bizPageData.instanceInfo.bizId;

      _this.$request({
        url: backend.cmisBiz + '/api/retailprimerateapp/selectbyiqpserno',
        method: 'POST',
        data: iqpSerno
      }).then(({ code, message, data }) => {
        if (code == '0') {
          yufp.clone(data, _this.formdata);
        } else {
          _this.$message({ message: message || '操作失败', type: 'error' });
        }
      });

      // 非空判断
      if (_this.formdata.bankDepBal) {
        _this.formdata.bankDepBal = parseFloat(_this.formdata.bankDepBal / 10000).toFixed(6);
      }
      if (_this.formdata.depAverday) {
        _this.formdata.depAverday = parseFloat(_this.formdata.depAverday / 10000).toFixed(6);
      }
      if (_this.formdata.bankLoanBal) {
        _this.formdata.bankLoanBal = parseFloat(_this.formdata.bankLoanBal / 10000).toFixed(6);
      }
      if (_this.formdata.loanAverday) {
        _this.formdata.loanAverday = parseFloat(_this.formdata.loanAverday / 10000).toFixed(6);
      }
      if (_this.formdata.yearDiscAmt) {
        _this.formdata.yearDiscAmt = parseFloat(_this.formdata.yearDiscAmt / 10000).toFixed(6);
      }
    }
  }

};
</script>
