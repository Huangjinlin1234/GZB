/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="" panel-type="simple">
      <yu-xform ref="pspCheckRstForm" v-model="rstData" label-width="120px">
        <yu-xform-group :column="1">
          <yu-panel title="检查结果及意见（管户客户经理）  " panel-type="simple">
            <yu-xform-item label="客户逾期行为恶意还是非恶意" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isBadOverdue"></yu-xform-item>
            <yu-xform-item label="有无偿还能力" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_HAVE_FLAG" name="repayAbi"></yu-xform-item>
            <yu-xform-item label="催收方式" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="collectWay"></yu-xform-item>
            <yu-xform-item label="有无向客户发送催收通知书" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_HAVE_FLAG" name="isCollect"></yu-xform-item>
            <yu-xform-item label="有无催收回执" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_HAVE_FLAG" name="isReceipt"></yu-xform-item>
            <yu-xform-item label="是否准备起诉" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isSue"></yu-xform-item>
          </yu-panel>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      rstData: {}, // 客户基本信息
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
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcheckrst/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.rstData);
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
