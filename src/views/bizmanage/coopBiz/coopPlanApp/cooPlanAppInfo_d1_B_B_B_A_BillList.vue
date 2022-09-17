<template>
  <div>
    <yu-panel title="合作方案特殊限额控制信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_quotaInsert" v-if="operate!='details'" @click="customClick('quotaInsert')">新增</yu-button>
          <!--<yu-button ref="btn_quotaUpdate" v-if="operate!='details' && source =='agr'" @click="customClick('quotaUpdate')">修改</yu-button>-->
          <yu-button ref="btn_quotaUpdate" v-if="operate!='details'" @click="customClick('quotaUpdate')">修改</yu-button>
          <yu-button ref="btn_quataDelete" v-if="operate!='details'" @click="customClick('quataDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <!--<yu-xtable-column label="合作产品名称" prop="coopPrdName"></yu-xtable-column>
        <yu-xtable-column label="合作产品编号" prop="coopPrdId"></yu-xtable-column>-->
        <yu-xtable-column label="产品名称" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP_COOP"></yu-xtable-column>
        <yu-xtable-column label="单个产品合作额度(元)" prop="singlePrdCoopLmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="单笔最低缴存金额(元)" prop="sigLowDepositAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="保证金比例(%)" prop="bailPerc" :formatter="toPercent"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_PRD_TYPE_PROP_COOP');
export default {
  name: 'D1BBBABillList',
  mixins: [mixinList, mixin],
  props: {
    operate: String,
    source: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanespecquotactrl/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanespecquotactrl/delete/'
    };
  },
  methods: {
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {        
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }      
      return cellValue;
    }
  },  
  created () {
    this.param = this.$route.meta.params; 
    if (this.param.isFromAccMenu || this.param.isFromAgrMenu || this.param.isFromOperateViewMenu || this.param.isFromAgrBizPageMenu || this.param.isFromAppChangeMenu) {
      this.dataUrl = this.$backend.cmisBiz + '/api/coopreplyappsub/query';
    }
  } 
};
</script>
