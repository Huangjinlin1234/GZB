<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="资产池基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180PX" label="资产池协议编号" ctype="input" name="contNo" disabled placeholder="资产池协议编号"></yu-xform-item>
            <yu-xform-item label-width="180PX" label="客户编号" ctype="input" name="cusId" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label-width="180PX" label="客户名称" ctype="input" name="cusName" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label-width="180PX" label="资产池授信额度" ctype="yu-num" number-formatter="0,000.00"  name="lmtAmt" disabled placeholder="资产池授信额度"></yu-xform-item>
            <yu-xform-item label-width="180PX" label="资产池协议生效日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" placeholder="资产池生效日期"></yu-xform-item>
            <yu-xform-item label-width="180PX" label="资产池协议到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="资产池到期日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="资产池融资信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="资产池融资额度" ctype="yu-num" number-formatter="0,000.00" name="assetPoolFinAmt" disabled placeholder="————" ></yu-xform-item>
            <yu-xform-item label-width="180px" label="核心保证金余额" ctype="yu-num" number-formatter="0,000.00" name="assetPoolBailAmt" disabled placeholder="————" ></yu-xform-item>
            <yu-xform-item label-width="180px" label="可用池融资额度" ctype="yu-num" number-formatter="0,000.00" name="assetPoolAvaAmt" disabled placeholder="————" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="池内质押资产清单" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refInPoolTable" :pageable="true" request-type="POST" :data-url="inPoolUrl" :base-params="inPoolParams">
            <yu-xtable-column label="资产编号" prop="assetNo"></yu-xtable-column>
            <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产价值" prop="assetValue"></yu-xtable-column>
            <yu-xtable-column label="资产到期日" prop="assetEndDate"></yu-xtable-column>
            <yu-xtable-column label="是否入池" prop="isPool" data-code="STD_ZB_YES_NO"   >
              <template slot-scope="scope">
                <yu-tag :type="scope.row.isPool === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.isPool=='0' ? '未入池' :'已入池' }}</yu-tag>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="是否入池" prop="isPledge" data-code="STD_ZB_YES_NO"   >
              <template slot-scope="scope">
                <yu-tag :type="scope.row.isPledge === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.isPledge=='0' ? '未质押' :'已质押' }}</yu-tag>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="入池时间" prop="inpTime"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <!--<yu-panel title="资产清单" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refAsplTable" :pageable="true" request-type="POST" :data-url="asplUrl" :base-params="asplParams">
            <yu-xtable-column label="资产编号" prop="assetNo"></yu-xtable-column>
            <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产价值" prop="assetValue"></yu-xtable-column>
            <yu-xtable-column label="资产到期日" prop="assetEndDate"></yu-xtable-column>
            <yu-xtable-column label="是否入池" prop="isPool" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否质押" prop="isPledge" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="入池时间" prop="inpTime"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>-->
      </yu-xform>
    <yu-form-buttons align="center">
      <yu-button @click="back" type="primary">返回</yu-button>
    </yu-form-buttons>
    <router-view :key="$route.params.Id"></router-view>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ASPL_ASSET_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formIsDisabled: false,
      formdata: {},
      formType: 'edit',
      asplParams: {condition: JSON.stringify({contNo: this.$route.meta.params.data.contNo})},
      asplUrl: backend.cmisBiz + '/api/asplassetslist/asplassetslist',
      inPoolParams: {condition: JSON.stringify({contNo: this.$route.meta.params.data.contNo})},
      inPoolUrl: backend.cmisBiz + '/api/asplassetslist/inpoolassetslist'
    };
  },

  created () {
    var _this = this;
    let jsoPar = _this.$route.meta.params.data;
    var contNo = jsoPar.contNo;
    if (_this.$route.meta.params.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    // 初始化资产池基本信息
    _this.initForm(contNo);
  },

  methods: {
    // 初始化表单
    initForm: function (contNo) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctraspldetails/queryCtrAsplDetail',
        data: {condition: JSON.stringify({contNo: contNo})},
        callback: function (code, message, response) {
          let isInit = response.code;
          if (isInit == 0) {
            yufp.clone(response.data, _this.formdata);
            _this.doCompute(response.data.contStatus);
          } else {
            _this.$message({ message: response.message, type: 'error'});
            return;
          }
        }
      });
    },

    // 返回
    back: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // 实时计算
    doCompute: function(contStatus) {
      if(contStatus != '200'){
        return;
      }
      let _this = this;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/ctraspldetails/doComputePoolAmt/' + this.formdata.contNo,
        data: {},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
          } else {
            _this.$message({ message: response.message, type: 'error'});
          }
        },
        error: (result, b) => {
          _this.$message({ message: result.message, type: 'error'});
        }
      });
    }
  }
};
</script>