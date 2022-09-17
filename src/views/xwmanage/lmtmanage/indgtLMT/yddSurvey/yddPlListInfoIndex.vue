<template>
<div>
    <yu-panel title="损益表明细" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number condition-key="condition" :pageable="false" :data="baseData">
          <yu-xtable-column label="主键" prop="pkId"  ctype="input" hide-column></yu-xtable-column>
          <yu-xtable-column label="调查流水号" prop="surveySerno"  ctype="input" hide-column></yu-xtable-column>
          <yu-xtable-column label="科目" prop="subject"></yu-xtable-column>
          <yu-xtable-column label="上期金额" prop="preAmt" ctype="yu-num"  number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="最近一个完成年度(元)" prop="nearYearAmt" ctype="yu-num"  number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="备注" prop="memo" ctype="input"></yu-xtable-column>
        </yu-xtable>
    </yu-panel>
    <yu-panel title="营业额检验" :hideFilter="false" :collapseHide="false" >
        <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" >
            <yu-xform-group>
              <yu-xform-item label="营业额检验情况说明一" ctype="textarea" name="turnoverChkDesc1" placeholder="营业额检验情况说明一" :colspan="24" rules="required" :disabled="disabledflg1"></yu-xform-item>
              <yu-xform-item label="营业额检验情况说明二" ctype="textarea" name="turnoverChkDesc2" placeholder="营业额检验情况说明二" :colspan="24" :disabled="disabledflg1"></yu-xform-item>
              <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
              <yu-xform-item label="企业征信备注" ctype="input" placeholder="企业征信备注" name="corpCreditRemark" disabled hidden></yu-xform-item>
              <yu-xform-item label="个人征信备注" ctype="input" placeholder="个人征信备注" name="indivCreditRemark" disabled hidden></yu-xform-item>
              <yu-xform-item label="个人征信状态" ctype="input" placeholder="个人征信状态" name="indivCreditStatus" disabled hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
              <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
              <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
        <yu-button type="primary" @click="submit" :disabled="disabledflg" :hidden="showBtn">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      baseData: [],
      formdata: {},
      disabledflg: false,
      showBtn: true,
      formType: 'edit',
      disabledflg1: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
     * 优抵贷-损益明细信息
     */

    afterInit () {
      var _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的

        _this.surveySerno = this.$route.meta.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        if (this.$route.meta.params != null && this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
          // 修改逻辑
          _this.disabledflg1 = false;
          _this.showBtn = false;
        }
      } catch (e) {
        // 走审批模版工厂
        _this.surveySerno = _this.getFactory().bizPageData.instanceInfo.bizId;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtpllistinfo/selectbysurveyserno',
        data: {surveySerno: _this.surveySerno},
        callback: function (code, message, response) {
          // 2021年6月24日23:21:11  王浩  list 可能为空
          if (response.data.list != null && response.data.list.length > 0) {
            _this.baseData = response.data.list || [];
          }
          yufp.clone(response.data.otherInfo, _this.formdata);
        }
      });
    },
    submit () {
      var _this = this;
      var formdata = this.formdata;
      if (formdata.turnoverChkDesc1 == '' || formdata.turnoverChkDesc1 == null) {
        this.$message({message: '尚有必输项未填！', type: 'warning'});
        return;
      }
      _this.disabledflg = true;
      // this.jbxx.validateBillCardValue()

      var surveySerno = _this.surveySerno;

      formdata.surveySerno = surveySerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtpllistinfo/savedata',
        data: {
          list: _this.baseData,
          otherInfo: formdata
        },
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message({message: '保存成功！', type: 'success'});
          } else {
            _this.$message({message: '保存失败！', type: 'danger'});
          }
          _this.disabledflg = false;
        }
      });
    }
  }
};
</script>
