<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方协议申请列表" >
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方类型" ctype="input" placeholder="合作方类型" name="partnerType"></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" request-type="post" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="partnerType"></yu-xtable-column>
          <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
          <yu-xtable-column label="合作类型" prop="coopType"></yu-xtable-column>
          <yu-xtable-column label="合作协议编号" prop="coopAgrNo"></yu-xtable-column>
          <yu-xtable-column label="合作协议金额" prop="coopAgrAmt"></yu-xtable-column>
          <yu-xtable-column label="合作协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
          <yu-xtable-column label="合作协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
          <yu-xtable-column label="合作协议签订日期" prop="coopAgrSignDate"></yu-xtable-column>
          <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
          <yu-xtable-column label="合作方案申请流水号" prop="coopPlanSerno"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="合作方协议操作类型" prop="coopAgrOprType"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="最近修改人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="最近修改机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="最近修改日期" prop="updDate"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
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
  name: 'YuXcoopApply',
  componentName: 'YuXcoopApply',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/cooppartneragrapp/query',
      // 表格中传出id数据的key
      queryCode: 'partnerNo',
      // 表格中显示到input框中的字段key
      textCode: 'partnerName'
    };
  }
};
</script>
