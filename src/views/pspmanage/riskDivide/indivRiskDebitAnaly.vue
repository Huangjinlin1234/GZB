/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspSmallOperCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="借款人情况分析" :collapse-hide="false">
        <yu-xform ref="riskDebitAnalyForm" v-model="debitData" label-width="360px">
          <yu-xform-group :column="1">
            <yu-xform-item label="是否按约定用途使用贷款" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" @change="isRight" data-code="STD_ZB_YES_NO" colspan="24" name="isRightPurp" rules="required"></yu-xform-item>
            <yu-xform-item label="贷款用途使用说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="loanPurpDesc" :rules="right"></yu-xform-item>
            <yu-xform-item label="有无不良行为、不良嗜好" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" @change="isBad" data-code="STD_ZB_YES_NO" name="isBadAction" rules="required"></yu-xform-item>
            <yu-xform-item label="不良行为嗜好说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="badActionDesc" :rules="bad"></yu-xform-item>
            <yu-xform-item label="有无不良信用记录（含他行信用）" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" :options="dicOptions.TypeOptions"  name="isBadCdtRecord" rules="required"></yu-xform-item>
            <yu-xform-item label="家庭状况是否正常" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isFamilyStatusNormal" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO, STD_RISK_BAD_CDT');

export default {
  name: 'PspCheckRst',
  data: function () {
    return {
      debitData: {},
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      right: false,
      bad: false,
      dicOptions: {TypeOptions: [{key: '10', value: '正常'}, {key: '20', value: '关注'}, {key: '30', value: '次级'}, {key: '40', value: '可疑'}, {key: '50', value: '损失'}]}
    };
  },

  created () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 是否按约定用途使用贷款判断
    isRight () {
      if (this.debitData.isRightPurp == '1') {
        this.right = false;
      } else if (this.debitData.isRightPurp == '0') {
        this.right = 'required';
      }
    },
    // 有无不良行为、不良嗜好判断
    isBad () {
      if (this.debitData.isBadAction == '1') {
        this.bad = 'required';
      } else if (this.debitData.isBadAction == '0') {
        this.bad = false;
      }
    },

    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务号获取借款人情况信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/riskdebitanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.debitData);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
