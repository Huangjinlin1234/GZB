<template>
  <div>
    <yu-panel title="优享贷申请信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
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
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="mobileNo"></yu-xtable-column>
        <yu-xtable-column label="学历" prop="edu"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex"></yu-xtable-column>
        <yu-xtable-column label="是否本地户" prop="isRegion"></yu-xtable-column>
        <yu-xtable-column label="居住年限" prop="resiYears"></yu-xtable-column>
        <yu-xtable-column label="婚姻状态" prop="marStatus"></yu-xtable-column>
        <yu-xtable-column label="年收入" prop="yearn"></yu-xtable-column>
        <yu-xtable-column label="工作年限" prop="cprtYears"></yu-xtable-column>
        <yu-xtable-column label="职务" prop="duty"></yu-xtable-column>
        <yu-xtable-column label="工作单位" prop="workUnit"></yu-xtable-column>
        <yu-xtable-column label="居住地址" prop="resiAddr"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="年利率" prop="yearRate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huser"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrg"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus"></yu-xtable-column>
        <yu-xtable-column label="影像编号" prop="imageNo"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="lastUpdateId"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="lastUpdateBrId"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="lastUpdateDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYXDLoanListAppList_dialog_BillCard';
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
      dataUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/delete/'
    };
  }
};
</script>