<template>
   <div>
    <yu-panel title="资产负债" :hideFilter="false" :collapseHide="false">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :pageable="false" :data="baseData">
        <yu-xtable-column label="主键" prop="pkId"  ctype="input" hide-column></yu-xtable-column>
        <yu-xtable-column label="调查流水号" prop="surveySerno"  ctype="input" hide-column></yu-xtable-column>
        <yu-xtable-column label="科目" prop="subject"></yu-xtable-column>
        <yu-xtable-column label="科目代码" prop="subjectValue" hide-column></yu-xtable-column>
        <yu-xtable-column label="上期金额" prop="preAmt"  ctype="yu-num"  number-formatter="0,000.00" ></yu-xtable-column>
        <yu-xtable-column label="本期金额" prop="curtAmt" ctype="yu-num"  number-formatter="0,000.00" @blur="calculateAmt"></yu-xtable-column>
        <yu-xtable-column label="备注" prop="memo" ctype="input"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons align="center">
        <yu-button type="primary" @click="submit" :disabled="disabledflg" v-if="showBtn">保存</yu-button>
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
      disabledflg: false,
      showBtn: false
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
     * 优抵贷-资产负债信息
     */
    afterInit () {
      var _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        _this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        _this.surveySerno = _this.getFactory().bizPageData.instanceInfo.bizId;
      }
      if (this.$route.meta.params != null && this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        _this.showBtn = true;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtbsinfo/selectbysurveyserno',
        data: {surveySerno: _this.surveySerno},
        callback: function (code, message, response) {
          if (response.data.length > 0) {
            _this.baseData = response.data || [];
          }
        }
      });
    },

    calculateAmt () {
      var _this = this;
      var dataList = _this.baseData;
      var totalAsset = 0;
      var totalCurrentAsset = 0;
      var totalDebets = 0;
      var asset007 = 0;
      for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].subjectValue == '003' || dataList[i].subjectValue == '004' ||
            dataList[i].subjectValue == '005' || dataList[i].subjectValue == '006') {
          if (dataList[i].curtAmt != null) {
            totalCurrentAsset += parseFloat(dataList[i].curtAmt);
          }
        }
        if (dataList[i].subjectValue == '007' && dataList[i].curtAmt != null) {
          asset007 = parseFloat(dataList[i].curtAmt);
        }
        if (dataList[i].subjectValue == '009' || dataList[i].subjectValue == '010' ||
            dataList[i].subjectValue == '011') {
          if (dataList[i].curtAmt != null) {
            totalDebets += parseFloat(dataList[i].curtAmt);
          }
        }
      }
      totalAsset = totalCurrentAsset + asset007;
      for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].subjectValue == '001') {
          dataList[i].curtAmt = totalAsset;
        }
        if (dataList[i].subjectValue == '002') {
          dataList[i].curtAmt = totalCurrentAsset;
        }
        if (dataList[i].subjectValue == '008') {
          dataList[i].curtAmt = totalDebets;
        }
        if (dataList[i].subjectValue == '012') {
          dataList[i].curtAmt = totalAsset - totalDebets;
        }
      }
    },

    /**
     *
     */
    submit () {
      var _this = this;
      var saveData = _this.baseData;
      if (saveData.length == 0) {
        this.$xutils.showMsgBox('提示', '请核查数据！'); // 弹出提示
        return;
      }
      _this.disabledflg = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtbsinfo/savebsinfo',
        data: {'list': saveData},
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
