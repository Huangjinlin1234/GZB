<template>
  <div>
    <yu-panel title="贴现明细" :hideFilter="false" :collapseHide="false">
      <!--<yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>-->
      <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" :pageable="true" :data-url="dataUrl" :default-load="false" :base-params="baseParams">
        <yu-xtable-column label="票据号码" prop="drftNo"></yu-xtable-column>
        <yu-xtable-column label="票面金额" prop="drftAmt"></yu-xtable-column>
        <yu-xtable-column label="到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="出票人" prop="drwr"></yu-xtable-column>
        <yu-xtable-column label="收款人" prop="pyee"></yu-xtable-column>
        <yu-xtable-column label="承兑人" prop="accptr"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './ctrDiscPorderSub_dialog_BillCard';
export default {
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrdiscpordersub/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrdiscpordersub/delete/'
    };
  },
  mounted () {
    var _this = this;
    var data = {};
    var serno = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      serno = data.bizSerno;
    }
    _this.baseParams = {serno: serno};
  }
};
</script>
