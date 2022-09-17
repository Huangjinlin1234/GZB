
<template>
  <!--
    @created by 屈文
    @description 资产信息
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="" name="messageTip">
        <yu-panel title="出池资产信息" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable" :pageable="true" :data="asplList">
            <yu-xtable-column label="资产编号" prop="assetNo"></yu-xtable-column>
            <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产价值" prop="assetValue"></yu-xtable-column>
            <yu-xtable-column label="资产到期日" prop="assetEndDate"></yu-xtable-column>
            <yu-xtable-column label="资产状态" prop="assetStatus"  hide-column></yu-xtable-column>
            <yu-xtable-column label="是否质押" prop="isPledge" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
      </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      activeName: 'messageTip',
      asplList: []
    };
  },

  mounted () {
    var _this = this;
    let jsoPar = {};
    if (this.getFactory().contextData.instanceInfo) {
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    } else if (_this.$route.meta.params) {
      jsoPar = _this.$route.meta.params;
    } else {
      jsoPar = this.getFactory().contextData;
    }
    var serno = jsoPar.serno;
    if (jsoPar.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    _this.ininList(serno);
  },

  methods: {
    // 初始化资产列表
    ininList (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/aspliopooldetails/queryaspliopooldetailsdatabyparams',
        data: {serno: serno},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            // _this.$refs.refForm.resetFields();
            _this.asplList = response.data;
          } else {
            return;
          }
        }
      });
    },

    // 返回
    back: function () {
      // this.getFactory().back();
       yufp.router.removeTab(this.$route.path);
    },
  }
};
</script>
