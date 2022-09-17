/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-xform ref="pspLegalCheckForm" v-model="legalData" label-width="360px">
      <yu-panel title="合法性、有效性检查" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="借款合同、保证合同、抵（质）押合同等重要法律文本是否合法、有效" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isVld" ></yu-xform-item>
          <yu-xform-item label="主从合同能否衔接，无法律瑕疵" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isLnk"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="时效性检查" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="借款合同、保证合同、抵（质）押合同等重要法律文本是否具有时效性以确保诉讼时效，及时主张权利" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isTimeEffect"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
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
      legalData: {}, // 客户基本信息
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
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/psplegalcheck/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.legalData);
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
