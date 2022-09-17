/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-不定期检查-检查结果
 */
<template>
  <div>
    <yu-panel title="检查结论" panel-type="simple">
      <yu-xform ref="pspCheckRstForm" v-model="rstData" label-width="120px">
        <yu-xform-group :column="1">
            <yu-xform-item label="本次检查总体评价" ctype="textarea" :disabled="viewFlag || issueFlag" rules="required" name="checkComment"></yu-xform-item>
            <yu-xform-item label="后续授信建议" name="checkAdviceType" ctype="select" :disabled="viewFlag || issueFlag" rules="required" data-code="STD_ZB_CHECK_ADVICE"></yu-xform-item>
            <yu-xform-item label="说明理由" name="checkAdviceReason" ctype="textarea" :disabled="viewFlag || issueFlag" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_CHECK_ADVICE');
export default {
  name: 'D1BillList',
  components: {yufpNwfInit},
  mixins: [mixinList],
  data: function () {
    return {
      rstData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      checkFlag: false,
      issueFlag: false // 从流程进disable的禁用
    };
  },
  mounted () {
    // 初始化参数
    // const _this = this;
    this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.issueFlag = data.issueFlag;
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务号获取客户检查结果信息
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
