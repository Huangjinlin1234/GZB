<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="展期业务协议">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="展期申请流水号" ctype="input" placeholder="展期申请流水号" name="extSerno"></yu-xform-item>
            <yu-xform-item label="展期协议号" ctype="input" placeholder="展期协议号" name="extCtrNo"></yu-xform-item>
            <yu-xform-item label="原借据编号" ctype="input" placeholder="原借据编号" name="oldBillNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId"></yu-xform-item>
            <yu-xform-item label="展期协议状态" ctype="select" data-code="STD_ZB_CTR_ST" placeholder="展期协议状态" name="extCtrStatus"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="展期申请流水号" prop="extSerno"></yu-xtable-column>
          <yu-xtable-column label="展期协议号" prop="extCtrNo"></yu-xtable-column>
          <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
          <yu-xtable-column label="展期到期日期" prop="extEndDate"></yu-xtable-column>
          <yu-xtable-column label="展期执行利率（年）" prop="extRealityIrY"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="展期协议状态" prop="extCtrStatus" width="100" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
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
  name: 'YuXloanProto',
  componentName: 'YuXloanProto',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
