/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="综合分析" panel-type="simple">
      <yu-xform ref="riskCompAnalyForm" v-model="compData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="综合分析(综合分析需包含前面所填的内容)" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="inteAnaly" rules="required"></yu-xform-item>
            <yu-xform-item label="影响偿还的各类风险因素" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="riskResn" rules="required"></yu-xform-item>
            <yu-xform-item label="防范风险的具体措施" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="riskMode" rules="required"></yu-xform-item>
            <yu-xform-item label="上一期分类时提出的风险防范化解措施的落实情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="actPact" rules="required"></yu-xform-item>
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
      compData:{},
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/riskcompanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.compData);
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
