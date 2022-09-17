<template>
  <div>
    <yu-panel title="诚易融"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                <yu-xform-item label="是否首次申请诚意融" ctype="radio" name="isFirstApp" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-panel title="首次申请“诚易融”调查内容"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="企业股权结构变化" ctype="radio" name="isEnterEqyuityChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="企业股权结构变化说明" ctype="textarea"  name="enterEquityChgDesc"></yu-xform-item>
                  <yu-xform-item label="借款人（实控人）婚姻状况变化" ctype="radio" name="isMarriedChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="借款人（实控人）婚姻状况变化说明" ctype="textarea"  name="marriedChgDesc"></yu-xform-item>
                  <yu-xform-item label="经营场所变化" ctype="radio" name="isSiteOfBusinessChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="经营场所变化说明" ctype="textarea"  name="siteOfBusinessChgDesc"></yu-xform-item>
                  <yu-xform-item label="家庭住址、联系方式变化" ctype="radio" name="isAddressPhoneChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="家庭住址、联系方式变化说明" ctype="textarea"  name="addressPhoneChgDesc"></yu-xform-item>
                  <yu-xform-item label="经营资产情况变化" ctype="radio" name="isBussinessAssetsChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="经营资产情况变化说明" ctype="textarea"  name="bussinessAssetsChgDesc"></yu-xform-item>
                  <yu-xform-item label="个人信用状况变化" ctype="radio" name="isIndivCreditChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="个人信用状况变化说明" ctype="textarea"  name="indivCreditChgDesc"></yu-xform-item>
                  <yu-xform-item label="企业信用状况变化" ctype="radio" name="isCorpCreditChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="企业信用状况变化说明" ctype="textarea"  name="corpCreditChgDesc"></yu-xform-item>
                  <yu-xform-item label="关联方变化" ctype="radio" name="isRelationChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="关联方变化说明" ctype="textarea"  name="relationChgDesc"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
                <yu-panel title="本次贷款申请与存量房抵贷（或前次授信）的经营信息有无变化"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="资产负债情况及主要科目变化" ctype="radio" name="isMainSubChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="资产负债情况及主要科目变化说明" ctype="textarea"  name="mainSubChgDesc"></yu-xform-item>
                  <yu-xform-item label="主要财务指标变化" ctype="radio" name="isMainTargetChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="主要财务指标变化说明" ctype="textarea"  name="mainTargetChgDesc"></yu-xform-item>
                  <yu-xform-item label="经营流水、纳税、水电气用量情况" ctype="radio" name="isManageCondChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="经营流水、纳税、水电气用量情况说明" ctype="textarea"  name="manageCondChgDesc"></yu-xform-item>
                  <yu-xform-item label="销售额变化情况" ctype="radio" name="isSaleChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="销售额变化情况说明" ctype="textarea"  name="saleChgDesc"></yu-xform-item>
                  <yu-xform-item label="关联企业变化情况" ctype="radio" name="isRelationCorpChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="关联企业变化情况说明" ctype="textarea"  name="relationCorpChgDesc"></yu-xform-item>
                  <yu-xform-item label="销贷比是否超过60%" ctype="radio" name="isPinToBorrowThan" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="销贷比是否超过60%说明" ctype="textarea"  name="pinToBorrowThanDesc"></yu-xform-item>
                  <yu-xform-item label="资产负债率是否超过75%" ctype="radio" name="isAssetLiabilityThan" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="资产负债率是否超过75%说明" ctype="textarea"  name="assetLiabilityThanDesc"></yu-xform-item>
                  <yu-xform-item label="是否连续两年亏损" ctype="radio" name="isTwoYearLoss" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="是否连续两年亏损说明" ctype="textarea"  name="twoYearLossDesc"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
                <yu-panel title="存量房抵贷抵押物变化情况"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="抵押物状态、地类用途、所有权人等基本情况变化" ctype="radio" name="isBasicCondChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="抵押物状态、地类用途、所有权人等基本情况变化说明" ctype="textarea"  name="basicCondChgDesc"></yu-xform-item>
                  <yu-xform-item label="抵押物评估价值、使用情况、租金年限及价格变化" ctype="radio" name="isGuarCondChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="抵押物评估价值、使用情况、租金年限及价格变化说明" ctype="textarea"  name="guarCondChgDesc"></yu-xform-item>
                  <yu-xform-item label="抵押人与借款人关系变化" ctype="radio" name="isBorrowRelationChg" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="抵押人与借款人关系变化说明" ctype="textarea"  name="borrowRelationChgDesc"></yu-xform-item>
                  <yu-xform-item label="抵押物状态查询结果" ctype="radio" name="isGuarSearchResultNormal" data-code="STD_ZB_YES_NO"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
               <yu-panel title="融资变化情况"  :hideFilter="false" :collapseHide="false">
               <yu-xform-group :column="2">
                  <yu-xform-item label="融资变化情况我行授信总额" ctype="num"  name="lmtAmtChg"  ></yu-xform-item>
                  <yu-xform-item label="融资变化情况授信有效期" ctype="input" name="lmtTermChg"  ></yu-xform-item>
                  <yu-xform-item label="融资变化情况我行贷款余额" ctype="num" name="loanBalanceChg"  ></yu-xform-item>
                  <yu-xform-item label="个人贷款变化" ctype="textarea" name="indivLoanChg"  ></yu-xform-item>
                  <yu-xform-item label="企业贷款变化" ctype="textarea" name="corpLoanChg"  ></yu-xform-item>
                  <yu-xform-item label="个人消费及按揭贷款、信用卡（额度变化、用信总额、还款情况等）" ctype="textarea" name="consumeChg"  ></yu-xform-item>
               </yu-xform-group>
               </yu-panel>
                <yu-panel title="存量“诚易融”续授信调查事项"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="个人准入条件" ctype="textarea" name="indivAccessCondi"  ></yu-xform-item>
                  <yu-xform-item label="企业准入条件" ctype="textarea" name="corpAccessCondi"  ></yu-xform-item>
                  <yu-xform-item label="存量房抵贷条件" ctype="textarea" name="stockFddCondi"  ></yu-xform-item>
                  <yu-xform-item label="补充说明" ctype="textarea" name="supplementaryNotes"  ></yu-xform-item>
                  <yu-xform-item label="还款来源分析" ctype="textarea" name="repaymentSourceAnalysis"  ></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="op!='VIEW'">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      op: ''
    };
  },
  mounted () {
    this.op = this.param.op;
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.param.serno;
      // var op = _this.$route.meta.params.op;
      // _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      this.baseFormdata1.flag = '1';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanyscyr/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      comitData = _this.baseFormdata1;
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptspdanyscyr/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    }

  }
};
</script>
