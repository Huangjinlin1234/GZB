<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './surveyCon_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      sonPage: null,
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 优企贷-调查结论*/
    afterInit () {
      var _this = this;
      _this.sonPage = _this.$refs.d1_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        _this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        _this.surveySerno = _this.getFactory().bizPageData.instanceInfo.bizId;
      }
      // 赋值给单子流水号
      yufp.clone(_this.$route.meta.params, _this.sonPage.formdata);

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/selectconinfobysurveyserno',
        data: {surveySerno: _this.surveySerno}
      }).then(({data, code, message}) => {
        if (data != null) {
          yufp.clone(data, this.sonPage.formdata);
        }
      });
    },

    showAction () {},

    doSave () {
      // 先进行校验
      var _this = this;
      var validate = false;
      _this.sonPage.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      var model = _this.sonPage.formdata;
      if (model.appLoanWay == 'W') { // 无还本续贷需校验上笔业务是否存在贷款余额，建议期限是否小于等于上笔业务调查表建议期限，还款方式是否等于上笔业务调查表还款方式
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyconinfo/getCusLastContInfo/' + model.cusId
        }).then(({data, code, message}) => {
          if (data != null) {
            if (data.loanBalance == null || data.loanBalance == undefined || !data.loanBalance > 0) {
              this.$message({message: '该客户上笔合同不存在贷款余额，不可选择无还本续贷！', type: 'warning'});
              return;
            }
            if (data.adviceTerm == null || data.adviceTerm == undefined || data.adviceTerm < model.adviceTerm) {
              this.$message({message: '该客户上笔业务调查建议期限为' + data.adviceTerm + '期，小于本次建议期限，不可选择无还本续贷！', type: 'warning'});
              return;
            }
            if (data.repayMode == null || data.repayMode == undefined || data.repayMode != model.repayMode) {
              this.$message({message: '该客户上笔业务调查还款方式与本次还款方式不同，不可选择无还本续贷！', type: 'warning'});
              return;
            }
          } else {
            this.$message({message: '该客户无上笔业务，不可选择无还本续贷！', type: 'warning'});
            return;
          }
        });
      }
      // TODO 流程
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/saveorupdateconinfo',
        data: this.sonPage.formdata
      }).then(({data, code, message}) => {
        if (data == 1) {
          this.$message({message: '保存成功', type: 'success'});
        }
      });
    }
  }
};
</script>
