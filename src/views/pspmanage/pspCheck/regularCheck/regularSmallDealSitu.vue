/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="处置情况" panel-type="simple">
      <yu-xform ref="pspDealSituForm" v-model="dealData" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item ctype="textarea" :disabled="viewFlag||approveFlag||assistFlag" label="出险成因" name="riskReason" rules="required" colspan="24"></yu-xform-item>
            <yu-xform-item label="是否寄送催收通知书" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="badFlag" data-code="STD_ZB_YES_NO" name="isCollect" rules="required" colspan="12"></yu-xform-item>
            <yu-xform-item label="是否有回执" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="badFlag" data-code="STD_ZB_YES_NO" name="isReceipt" rules="required" colspan="12"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="当前处置措施" :disabled="viewFlag||approveFlag||assistFlag" colspan="24" name="presentActionDesc" rules="required"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="下一步处置措施或建议" :disabled="viewFlag||approveFlag||assistFlag" colspan="24" name="nextStepAction" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      riskData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false // 是否不良
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
      if (data.pspTask.rptType == '3') {
        _this.badFlag = true;
      }
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspdealsitu/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.dealData);
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
