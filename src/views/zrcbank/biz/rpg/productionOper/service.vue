
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="服务业" panel-type="simple">
      <yu-xform ref="basicForm" label-width="160px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="4">
          <yu-xform-item label="特许经营机制" name="franchiseMechanism" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="主营产品" name="mainProduct" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="经营模式" name="operMode" ctype="select" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="销售" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="主要客户群" name="sealMainCustomer" ctype="input"></yu-xform-item>
            <yu-xform-item label="一般回款方式" name="sealPaymentCollType" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="采购" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="主要供应商" name="buyMainSupplier" ctype="input"></yu-xform-item>
            <yu-xform-item label="一般付款方式" name="buyPaymentType" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-xform-item label="其他需说明事项" name="otherDesc" ctype="textarea"></yu-xform-item>
      </yu-xform>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      basicFormData: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperproductionoper/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.basicFormData);
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    saveBtn: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptoperproductionoper/updateProductionOper',
        data: _this.basicFormData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
