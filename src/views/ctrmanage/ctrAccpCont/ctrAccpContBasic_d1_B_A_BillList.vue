<template>
  <div>
    <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
      <!-- <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform> -->
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd" @click="customClick('onAdd')">新增</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number  selection-type="radio"  :data="bailaccinfo" request-type="post" :base-params="baseParams" >
        <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金币种" prop="bailCurType" data-code="STD_ZB_CUR_TYP" hide-column></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="开户行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" data-code="STD_BAIL_INTEREST_MODE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_BAIL_INTEREST_MODE');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/bailaccinfo/',
      baseParams: {},
      bailaccinfo: [],
      deleteUrl: this.$backend.cmisBiz + '/api/bailaccinfo/delete/'
    };
  },

  mounted () {
    var _this = this;
    let data = _this.getFactory().contextData;
    // 进入初始化
    _this.serno = data.serno;
    this.baseParams = { serno: _this.serno };
    this.getAllBailData(this.baseParams);
  },
  methods: {
    getAllBailData: function (baseParams) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: baseParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data;
        }
      });
    }
  }
};
</script>
