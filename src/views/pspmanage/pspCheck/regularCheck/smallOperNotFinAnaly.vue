/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspOperStatusCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="非财务因素分析" :collapse-hide="false">
        <yu-xform :rules="rules" ref="pspNfinaSituForm" v-model="nfinaData" label-width="360px">
          <yu-xform-group :column="2">
            <yu-xform-item label="借款人及其家庭是否发生意外（包括借款人死亡、被拘留、家庭破裂、涉及黄赌毒等）" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isAccident" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="accidentRemark"></yu-xform-item>
            <yu-xform-item label="借款人是否面临重大诉讼" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isInvolveLawsuit" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="involveLawsuitRemark"></yu-xform-item>
            <yu-xform-item label="借款人对外是否提供过多担保或大量资产被抵押" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isOutguar" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="outguarRemark"></yu-xform-item>
            <yu-xform-item label="相关法律文本是否合法有效" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isVld" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="vldRemark"></yu-xform-item>
            <yu-xform-item label="对借款人的总体评价" :disabled="viewFlag||approveFlag||assistFlag" ctype="select" data-code="STD_PSP_GUAR_EVLU" name="totlEvlu" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <template>
        <d1-billlist ref="d1_BillList"></d1-billlist>
      </template>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_ENVI_EVLU');

export default {
  name: 'PspOperStatus',
  data: function () {
    return {
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      rules: {
        accidentRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        involveLawsuitRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        outguarRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        vldRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
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
      // 通过任务编号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspdebitnotfinaanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.nfinaData);
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
      let isAccident = this.nfinaData.isAccident;
      let isInvolveLawsuit = this.nfinaData.isInvolveLawsuit;
      let isOutguar = this.nfinaData.isOutguar;
      let isVld = this.nfinaData.isVld;
      if (isAccident === '1') {
        this.rules.accidentRemark.required = true;
      } else {
        this.rules.accidentRemark.required = false;
      }
      if (isInvolveLawsuit === '1') {
        this.rules.involveLawsuitRemark.required = true;
      } else {
        this.rules.involveLawsuitRemark.required = false;
      }
      if (isOutguar === '1') {
        this.rules.outguarRemark.required = true;
      } else {
        this.rules.outguarRemark.required = false;
      }
      if (isVld === '0') {
        this.rules.vldRemark.required = true;
      } else {
        this.rules.vldRemark.required = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
