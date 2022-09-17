<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="180px" v-model="formdata">
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" :hidden="true" name="iqpSerno" ctype="input" :disabled="isdisabled"></yu-xform-item>
          <yu-xform-item label="资产折算收入类型" prop="discountAssetType" :hidden="true" align="center" ctype="select" data-code="STD_ZB_DISCOUNT_ASSET_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="数据来源" name="dataSource" ctype="select"  data-code="STD_INCOME_DATA_SOUR" :disabled="isdisabled" ></yu-xform-item>
          <yu-xform-item label="分析时间段" name="analyTime" ctype="input"  :disabled="isdisabled" ></yu-xform-item>
          <yu-xform-item label="销售额（元）" name="saleAmt"   ctype="yu-num" :disabled="isdisabled"></yu-xform-item>
          <yu-xform-item label="推算年销售额（元）" name="yearSaleAmt" ctype="yu-num"   :disabled="isdisabled"></yu-xform-item>
          <yu-xform-item label="利润率（%）" name="profitRate" :precision="7"   ctype="yu-num"  sign="%" :multiple="100" :disabled="isdisabled"></yu-xform-item>
          <yu-xform-item label="年净利润（元）" name="yearProfit" ctype="yu-num" :disabled="isdisabled"></yu-xform-item>
          <yu-xform-item label="月收入（元）" name="mearn" ctype="yu-num" :disabled="isdisabled" @change="changeMearn"></yu-xform-item>
          <yu-xform-item label="小计（元）" name="subtotal" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="调查核实情况说明" name="indgtExpl" ctype="input" :disabled="isdisabled"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>

    <yu-form-buttons :padding-left="500">
      <yu-button type="primary" @click="saveFn" :hidden="isdisabled">保存</yu-button>
      <yu-button type="primary" @click="back" >返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_DISCOUNT_ASSET_TYPE,STD_ZB_INC_SOUR,STD_ZB_INCOME_SOUR');
export default {
  props: {
    pageParams: Object,
    dialogId: String

  },
  data: function () {
    return {
      formdata: {},
      isdisabled: true

    };
  },
  mounted () {
    let _this = this;
    debugger;
    if (_this.pageParams.op == 'ADD') {
      let iqpSerno = _this.pageParams.iqpSerno;
      let discountAssetType = _this.pageParams.discountAssetType;
      yufp.clone({iqpSerno: iqpSerno}, _this.formdata);
      yufp.clone({discountAssetType: discountAssetType}, _this.formdata);
      _this.isdisabled = false;
    } else if (_this.pageParams.op == 'UPDATE') {
      _this.isdisabled = false;
      yufp.clone(_this.pageParams, _this.formdata);
    } else if (_this.pageParams.op == 'VIEW') {
      _this.isdisabled = true;
      yufp.clone(_this.pageParams, _this.formdata);
    }
  },
  methods: {
    changeMearn (value) {
      let _this = this;
      _this.formdata.subtotal = value;
    },

    /**
      * 保存
      */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/create',
        data: model,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },

    /**
     * 返回按钮
     */
    back: function () {
      this.$dialog.close(this.dialogId);
    }

  }
};
</script>
