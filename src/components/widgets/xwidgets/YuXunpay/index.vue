<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="未受托支付">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="未受托支付类型" ctype="select" data-code="STD_ZB_UNTRU_PAY_TYPE" placeholder="未受托支付类型" name="untruPayType"></yu-xform-item>
            <yu-xform-item label="支付账号户名" ctype="input" placeholder="支付账号户名" name="acctName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="放款流水号" prop="pvpSerno"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100.00px"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100.00px"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="pvpAmt" width="100.00px"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="未受托支付类型" prop="untruPayType" data-code="STD_ZB_UNTRU_PAY_TYPE"></yu-xtable-column>
          <yu-xtable-column label="支付账号" prop="acctNo"></yu-xtable-column>
          <yu-xtable-column label="支付账号户名" prop="acctName"></yu-xtable-column>
          <yu-xtable-column label="支付金额" prop="tranAmt"></yu-xtable-column>
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
  name: 'YuXunpay',
  componentName: 'YuXunpay',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'contNo',
      // 表格中显示到input框中的字段key
      textCode: 'contNo'
    };
  }
};
</script>
