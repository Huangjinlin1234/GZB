<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="待补录银承台账选取列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="放款流水号" ctype="input" name="pvpSerno" placeholder="放款流水号" width="110" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="协议编号" ctype="input" placeholder="协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="{condition:{oprType:'01'}}" request-type="post">
            <yu-xtable-column label="业务流水号" prop="pvpSerno" width="110"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" sortable></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="110"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="110"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="申请汇票数" prop="applyPorder" width="120"></yu-xtable-column>
            <yu-xtable-column label="是否电子票据" prop="isEDrft" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="资料全否" prop="fileSufFlag" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="影像流水号" prop="wyImageSerno" width="120" hide-column></yu-xtable-column>
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
  name: 'YuPvpAccpAppPop',
  componentName: 'YuPvpAccpAppPop',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/pvpaccpapp/toSelectAspl',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusId'
    };
  }
};
</script>
