<template>
  <div>
    <yu-panel title="合作方资质信息列表" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_Add" v-if="operate!='details'" @click="customClick('add')">新增</yu-button>
          <yu-button type="primary" ref="btn_Update" v-if="operate!='details'" @click="customClick('update')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-if="operate!='details'" @click="customClick('delete')">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="customClick('view')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="证书类型" prop="liceType" data-code="STD_LICE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="证书名称" prop="liceName"></yu-xtable-column>
        <yu-xtable-column label="证书编号" prop="liceNo"></yu-xtable-column>
        <yu-xtable-column label="资质等级" prop="aptiLvl" data-code="STD_ZB_QUAL_LEVEL"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="aptiLiceRegiOrg"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="aptiLiceRegiDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="aptiLiceEndDate"></yu-xtable-column>
        <yu-xtable-column label="资质说明" prop="aptiDesc"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard" :operate="operate"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './coopPlanAptiAdd_d1_BillCard';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_ZB_QUAL_LEVEL,STD_LICE_TYPE');
export default {
  name: 'D1BillList',
  components: { dialogBillcard },
  props: {
    operate: String,
    serno: String
  },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'coopPlanSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanaptiinfo/query',
      baseParams: {
        condition: {}
      },
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanaptiinfo/delete/'
    };
  },
  mounted () {
    this.baseParams.condition.serno = this.serno;
  }
};
</script>
