/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-xform ref="pspPromiseAnalyForm" v-model="promiseData" label-width="120px">
      <yu-panel title="第一还款来源" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="生产状况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="produceStatus" rules="required"></yu-xform-item>
          <yu-xform-item label="企业经营状况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="operStatus" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="第二还款来源" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="担保人经营情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="guarOperStatus" rules="required"></yu-xform-item>
          <yu-xform-item label="担保意愿" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="guarWishCase" rules="required"></yu-xform-item>
          <yu-xform-item label="担保实力" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="guarAbi" rules="required"></yu-xform-item>
          <yu-xform-item label="抵押物情况:（包括但不限于抵押物余值是否能覆盖保证类贷款）" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="guarSitu" rules="required"></yu-xform-item>
          <yu-xform-item label="借款人或担保人名下有效资产分析（财产线索）" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="validAssetAnaly" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      promiseData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
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
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/psppromiseanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.promiseData);
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
