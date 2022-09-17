<template>
  <div>
    <yu-panel  title="" panel-type="normal">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="100px" :custom-search-fn="customSearch">
          <yu-xform-group :column="2">
            <yu-xform-item name="coopPrdId" label="合作产品编号" placeholder="合作产品编号"></yu-xform-item>
            <yu-xform-item name="coopPrdName" label="合作产品名称" placeholder="合作产品名称"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" row-number="true" selection-type="radio" request-type="get"  :pageable="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :data-url="dataUrl" :default-load="false" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="产品名称" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP_COOP"></yu-xtable-column>
          <yu-xtable-column label="单个产品合作额度(元)" prop="singlePrdCoopLmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="单笔最低缴存金额(元)" prop="sigLowDepositAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="保证金比例(%)" prop="bailPerc" :formatter="toPercent"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="onClose" size="small">取消</el-button>
        </div>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dicOptions: {},
      dataUrl: backend.cmisBiz + '/api/coopreplyaccsub/',
      baseParams: {}
    };
  },
  mounted () {
    this.afterInit();
  },

  methods: {
    afterInit () {     
      // 刷新数据//查询条件改变时,会默认刷新页面
      this.baseParams = {condition: {
        coopPlanNo: this.pageParams.coopPlanNo
      }};     
    },
    /** *确认****/
    confirmFn () {
      const jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    },
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {        
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }      
      return cellValue;
    }
  }
};
</script>
