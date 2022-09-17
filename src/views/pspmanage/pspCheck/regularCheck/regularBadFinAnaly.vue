/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="融资分析" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-panel title="" panel-type="simple">
      <yu-xform ref="pspCusFinForm" v-model="finData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="融资总额（万元）" disabled name="totalFinAmt" colspan="8"></yu-xform-item>
            <yu-xform-item label="支行催收情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="collectSitu" rules="required"></yu-xform-item>
            <yu-xform-item label="借款人还款意愿" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="repayWish" rules="required"></yu-xform-item>
            <yu-xform-item label="整体融资分析" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="entireFinAnaly" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <template>
      <regularDebtInfo ref="regularDebtInfo"></regularDebtInfo>
    </template>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import regularDebtInfo from './regularDebtInfo.vue';
yufp.lookup.reg('STD_FIVE_CLASS');
export default {
  name: 'D1BillList',
  components: { regularDebtInfo},
  mixins: [mixinList],
  data: function () {
    return {
      cusData: {}, // 客户基本信息
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
    }
  }
};
</script>
