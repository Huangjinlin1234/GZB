<template>
  <div>
    <yu-panel title="行名行号配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"  fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListLogicDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
        <yu-xtable-column label="行号" prop="bankNo"></yu-xtable-column>
        <yu-xtable-column label="行名" prop="bankName"></yu-xtable-column>
        <yu-xtable-column label="行政地区" prop="areaName"></yu-xtable-column>
        <yu-xtable-column label="地区代码" prop="areaCode"></yu-xtable-column>
        <yu-xtable-column label="联系电话" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="邮政编码" prop="postcode"></yu-xtable-column>
        <yu-xtable-column label="地址" prop="addr"></yu-xtable-column>
        <yu-xtable-column label="上级行" prop="superBankNo"></yu-xtable-column>
       <!-- <yu-xtable-column label="生效日期" prop="inureDate"></yu-xtable-column>
        <yu-xtable-column label="注销日期" prop="logoutDate"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="bankStatus" data-code="STD_ZB_PRD_ST"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="orgName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="updName" width="100"></yu-xtable-column>
        <yu-xtable-column label="最后修改机构" prop="updBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
        -->
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cfgBankInfo_dialog_BillCard';
export default {
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'bankNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgbankinfo/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgbankinfo/delete/'
    };
  }
};
</script>
