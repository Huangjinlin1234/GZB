
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="通用版" panel-type="simple">
        <div id="opera">
       <table  cellspacing="0" cellpadding="0" border="1" >
       <colgroup class="el-table_group">
          <col width="10%">
          <col width="20%">
          <col width="5%">
          <col width="20%">
          <col width="50%">
        </colgroup>
        <tr height="50px">
          <td colspan="2">特许经营机制</td>
          <td colspan="3">
          <yu-input type="input" v-model="basicData.franchiseMechanism"></yu-input>
          </td>
        </tr>
        <tr height="50px">
          <td colspan="2" rowspan="6">产品</td>
          <td colspan="3">前三大主营业务占比情况（或主营产品）</td>
        </tr>
        <tr height="50px">
          <td colspan="2">主营业务</td>
          <td>占比或相关文字说明</td>
        </tr>
        <tr height="50px">
          <td>1.</td>
          <td><yu-input type="input" v-model="basicData.mainBusi1"></yu-input></td>
          <td><yu-input type="input" v-model="basicData.mainBusi1Memo"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>2.</td>
          <td><yu-input type="input" v-model="basicData.mainBusi2"></yu-input></td>
          <td><yu-input type="input" v-model="basicData.mainBusi2Memo"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>3.</td>
          <td><yu-input type="input" v-model="basicData.mainBusi3"></yu-input></td>
          <td><yu-input type="input" v-model="basicData.mainBusi3Memo"></yu-input></td>
        </tr>
        <tr height="50px">
          <td colspan="2">其他说明</td>
          <td><yu-input type="input" v-model="basicData.otherDesc"></yu-input></td>
        </tr>
        </table>
      </div>
       <yu-xform ref="basicForm" label-width="160px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-panel title="经营" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务概况" name="openBusiSurvey" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="经营模式及盈利模式" name="operProfitMode" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="销售" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="主要客户群" name="sealMainCustomer" ctype="input"></yu-xform-item>
            <yu-xform-item label="一般回款方式" name="sealPaymentCollType" ctype="input"></yu-xform-item>
            <yu-xform-item label="目前订单情况" name="sealCurrOrderStatus" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="采购" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="主要原材料及外购配套件" name="buyRawMaterial" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="主要供应商" name="buyMainSupplier" ctype="input"></yu-xform-item>
            <yu-xform-item label="一般付款方式" name="buyPaymentType" ctype="input"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="buyOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
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
      basicData: {},
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
        url: _this.$backend.cmisBiz + '/api/rptoperproductionoper/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.basicData = response.data;
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
      _this.basicFormData.serno = _this.param.serno;
      _this.basicFormData.mainBusi1 = _this.basicData.mainBusi1;
      _this.basicFormData.mainBusi1Memo = _this.basicData.mainBusi1Memo;
      _this.basicFormData.mainBusi2 = _this.basicData.mainBusi2;
      _this.basicFormData.mainBusi2Memo = _this.basicData.mainBusi2Memo;
      _this.basicFormData.mainBusi3 = _this.basicData.mainBusi3;
      _this.basicFormData.mainBusi3Memo = _this.basicData.mainBusi3Memo;
      _this.basicFormData.otherDesc = _this.basicData.otherDesc;
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
<style>
#opera tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
