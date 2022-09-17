<template>
  <div>
    <yu-panel title="对公企业证件信息列表" :hideFilter="false" :collapseHide="false">
      <!--<yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="资质名称" ctype="input" placeholder="资质名称" name="aptiName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>-->
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" @click="doInsect" v-if="viewType!='VIEW'">新增</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete" v-if="viewType!='VIEW'">删除</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate" v-if="viewType!='VIEW'">修改</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :base-params="baseParams" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="证件类型" prop="certType" :options="dicOptions.certTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="regiDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="颁证机关" prop="issuDep"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusCorpCertList_dialog_BillCard';
export default {
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  props: {
    cusCorp: Object,
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      baseParams: {condition: {cusId: this.cusCorp.cusId}},
      dataUrl: this.$backend.cmisCus + '/api/cuscorpcert/',
      deleteUrl: this.$backend.cmisCus + '/api/cuscorpcert/delete/',
      dicOptions: {certTypeOptions: [{'key': 'M', 'value': '营业执照'},
        {'key': 'N', 'value': '批文'}, {'key': 'O', 'value': '开户证明'}, {'key': 'P', 'value': '对公其他'},
        {'key': 'Q', 'value': '组织机构代码'}, {'key': 'R', 'value': '统一社会信用代码'},
        {'key': '09', 'value': '中征码'}, {'key': 'U', 'value': '登记证书'}, {'key': 'V', 'value': '境外企业代码'},
        {'key': '10', 'value': '特种经营许可证'}, {'key': '11', 'value': '企业资质证书'}]}
    };
  },
  created () {
    console.log(this.cusCorp);
  },
  methods: {
    doInsect () {
      var _this = this;
      _this.$dialog.open('企业证件信息新增', 'cusmanage/cusCorp/cusCorpMaintain/cusCorpCertInsectListIndex', '880', '800', {cusId: this.cusCorp.cusId}, function () {
        _this.queryDataByCondition();
      });
    }
  }
};
</script>
