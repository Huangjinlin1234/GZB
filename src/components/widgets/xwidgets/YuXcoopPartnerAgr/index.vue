<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方协议台账列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="90px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合作类型" ctype="select" data-code="STD_COOP_TYPE" placeholder="合作类型" name="coopType"></yu-xform-item>
            <yu-xform-item label="协议状态" ctype="select" data-code="COOP_PARTNER_AGR_STS" placeholder="协议状态" name="agrStatus" ></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="datepicker" placeholder="登记日期" name="inputDate" ></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" request-type="post" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
          <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
          <yu-xtable-column label="合作类型" prop="coopType" data-code="STD_COOP_TYPE"></yu-xtable-column>
          <yu-xtable-column label="合作协议编号" prop="coopAgrNo"></yu-xtable-column>
          <yu-xtable-column label="协议金额" prop="coopAgrAmt" :formatter="Currency" width="160"></yu-xtable-column>
          <yu-xtable-column label="协议状态" prop="agrStatus" data-code="COOP_PARTNER_AGR_STS"></yu-xtable-column>
          <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
          <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
          <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
          <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="经办人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="经办机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" request-type="post" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXcoopPartnerAgr',
  componentName: 'YuXcoopPartnerAgr',
  mixins: [popList, mixin],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/cooppartneragraccinfo/query',
      // 表格中传出id数据的key
      queryCode: 'coopAgrNo',
      // 表格中显示到input框中的字段key
      textCode: 'coopAgrNo',
      codeToText: false,
      baseParams: {
        condition: {'agrStatus':'01'}
      },
    };
  } 
};
</script>
