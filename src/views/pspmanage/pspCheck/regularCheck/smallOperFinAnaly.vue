/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspOperStatusCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="财务因素分析" :collapse-hide="false">
        <yu-xform :rules="rules" ref="pspFinaSituForm" v-model="finaData" label-width="360px">
          <yu-xform-group :column="2">
            <yu-xform-item label="借款人销售同比是否下降" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isChangeSale" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="changeSaleRemark"></yu-xform-item>
            <yu-xform-item label="应收款是否明显增加" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isGrowRec" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="growRecReark"></yu-xform-item>
            <yu-xform-item label="借款人负债是否明显增加" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isGrowDebt" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="growDebtRemark"></yu-xform-item>
            <yu-xform-item label="是否涉及民间借贷" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isDc" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="dcRemark"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_ENVI_EVLU');

export default {
  name: 'PspCheckRst',
  data: function () {
    return {
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      rules: {
        changeSaleRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        growRecReark: { required: false, message: '字段不能为空', trigger: 'blur' },
        growDebtRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        dcRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
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
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspdebitfinaanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.finaData);
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
    validateFn: function () {
      let isChangeSale = this.finaData.isChangeSale;
      let isGrowRec = this.finaData.isGrowRec;
      let isGrowDebt = this.finaData.isGrowDebt;
      let isDc = this.finaData.isDc;
      if (isChangeSale === '1') {
        this.rules.changeSaleRemark.required = true;
      } else {
        this.rules.changeSaleRemark.required = false;
      }
      if (isGrowRec === '1') {
        this.rules.growRecReark.required = true;
      } else {
        this.rules.growRecReark.required = false;
      }
      if (isGrowDebt === '1') {
        this.rules.growDebtRemark.required = true;
      } else {
        this.rules.growDebtRemark.required = false;
      }
      if (isDc === '1') {
        this.rules.dcRemark.required = true;
      } else {
        this.rules.dcRemark.required = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
