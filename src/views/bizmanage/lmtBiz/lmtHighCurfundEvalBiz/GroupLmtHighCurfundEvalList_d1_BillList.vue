<template>
  <div>
    <yu-panel title="集团流动资金测算列表" panel-type="simple">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="授信申请流水号" prop="singleSerno"></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" >
          <template slot-scope="scope">
            <yu-button
              @click.native.prevent="clickDataRow(scope.row)"
              type="text"
              size="small">
              流动资金测算表
            </yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      serno: '',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/getGrpHighCurfund',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/delete/'
    };
  },
  mounted: function () {
    var _this = this;
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      grpSerno = data.bizId;
    } else {
      data = _this.$route.meta.params;
      grpSerno = data.grpSerno;
    }
    _this.baseParams = {condition: {'grpSerno': grpSerno}};
  },
  methods: {
    clickDataRow (rowJsonData) {
      let jsoPar = rowJsonData;
      jsoPar['serno'] = jsoPar.singleSerno;
      this.$dialog.open(
        '流动资金测算表',
        'bizmanage/lmtBiz/lmtHighCurfundEvalBiz/lmtHhighCurfundEvalViewIndex',
        -1,
        -1,
        jsoPar
      );
    }
  }
};
</script>
