<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="零售业务申请信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
              <yu-xform-item label="申请流水号" name="iqpSerno"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="业务流水号" prop="iqpSerno" sortable></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="申请金额" prop="appAmt" width="100" hide-column></yu-xtable-column>
          <yu-xtable-column label="申请期限" prop="appTerm" width="100" hide-column></yu-xtable-column>
          <yu-xtable-column label="申请执行利率" prop="execRateYear" width="100" hide-column></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" width="100" hide-column></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'IqpLoanAppRetail',
  componentName: 'IqpLoanAppRetail',
  mixins: [popList],
  data: function () {
    return {
      props: {
        parms: Object
      },

      baseParams: {condition: {
        managerId: this.$xutils.getLoginUserInfo().loginCode,
        belgLine: '02',
        applyExistsStatus: '000,997'
      }
      },
      dataUrl: backend.cmisBiz + '/api/iqploanapp/selectbymodel/',
      // 表格中传出id数据的key
      queryCode: 'iqpSerno',
      // 表格中显示到input框中的字段key
      textCode: 'iqpSerno',
      codeToText: false
    };
  }
};
</script>