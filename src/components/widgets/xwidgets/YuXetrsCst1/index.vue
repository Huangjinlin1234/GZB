<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width"  title="企业客户列表" >
        <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户状态" ctype="select" data-code="STD_CUS_STATE" placeholder="客户状态" name="cusState"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理名称" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          <!--
          <yu-xtable-column label="企业成立时间" prop="strDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode" width="200px"></yu-xtable-column>
          -->
        </yu-xtable>
        <div style="text-align:center;margin-top:10px;">
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
  name: 'YuXetrsCst1',
  componentName: 'YuXetrsCst1',
  mixins: [popList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusbase/baseCropByManageId',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusId',
      codeToText: false,
      baseParams: this.pageParams ? { condition: { cusRankCls: '02', cusCatalog: '2' } } : { condition: { cusCatalog: '2' } }
    };
  }
};
</script>
