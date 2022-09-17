<template>
  <div>
    <yu-panel title="优农贷名单准入申请">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_byadd" @click="customClick('byadd')">新增</yu-button>
          <yu-button ref="btn_byupdate" @click="customClick('byupdate')">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="身份证号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="mobileNo"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex" data-code="STD_ZB_SEX"></yu-xtable-column>
        <yu-xtable-column label="学历" prop="edu" data-code="STD_ZB_EDU"></yu-xtable-column>
        <yu-xtable-column label="有无子女" prop="isHaveChildren" data-code="STD_IS_HAVE_CHILDREN"></yu-xtable-column>
        <yu-xtable-column label="本地户口" prop="localRegist" data-code="STD_CUS_LOCAL_REGIST"></yu-xtable-column>
        <yu-xtable-column label="经营地址" prop="operAddr"></yu-xtable-column>
        <yu-xtable-column label="经营年限" prop="operLmt"></yu-xtable-column>
        <yu-xtable-column label="婚姻状况" prop="marStatus"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYndListAppBaseInfo_dialog_BillCard';
yufp.lookup.reg('STD_CUS_LOCAL_REGIST,STD_ZB_APPR_STATUS');
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyndapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyndapp/delete/'
    };
  }
};
</script>