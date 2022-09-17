<template>
  <div>
    <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
      <!--<yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>-->
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data="bailaccinfo" :base-params="baseParams">
        <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金币种" prop="bailCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="accobName"></yu-xtable-column>
        <yu-xtable-column label="保证金计息方式" prop="bailInterestMode"  data-code="STD_BAIL_INTEREST_MODE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_BAIL_INTEREST_MODE,STD_ZB_CUR_TYP');
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './ctrTfLocContBasic_dialog_BillCard';
export default {
  name: 'D1BABillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
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
