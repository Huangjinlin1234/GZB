/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspFinSituCheck">
    <!--检查任务信息展示-->
    <yu-panel title="融资情况分析" :collapse-hide="false">
      <yu-xform ref="pspCusFinAnalyForm" v-model="finData" label-width="180px">
        <yu-xform-group :column="2">
          <yu-xform-item label="上期贷后检查时融资总额（万元）" placeholder="含法人代表或实际控制人个人经营性贷款" :disabled="viewFlag||approveFlag||assistFlag" rules="required" :min="0" name="preFinAmt" @change="calcFn" ctype="yu-currency" :precision="2"></yu-xform-item>
          <yu-xform-item label="本期贷后检查时融资总额（万元）" placeholder="含法人代表或实际控制人个人经营性贷款" :disabled="viewFlag||approveFlag||assistFlag" @change="calcFn" rules="required" ctype="yu-currency" name="curtFinAmt" :min="0" :precision="2"></yu-xform-item>
          <yu-xform-item label="融资变化（万元）" disabled name="finChange"></yu-xform-item>
          <yu-xform-item label="融资变化情况分析" :disabled="viewFlag||approveFlag||assistFlag" rules="required" ctype="textarea" colspan="24" name="finChangeAnaly"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>

export default {
  name: 'PspFinSituCheck',
  data: function () {
    return {
      finData: {}, // 检查任务信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {
    //
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户融资情况分析
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcusfinanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.finData);
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
    },
    calcFn: function () {
      let preFinAmt = this.finData.preFinAmt;
      let curtFinAmt = this.finData.curtFinAmt;
      if (preFinAmt == null || preFinAmt == '' || curtFinAmt == null || curtFinAmt == '') {
        return;
      }
      let finChange = curtFinAmt - preFinAmt;
      this.finData.finChange = finChange;
    }
  }
};
</script>

<style scoped>

</style>
