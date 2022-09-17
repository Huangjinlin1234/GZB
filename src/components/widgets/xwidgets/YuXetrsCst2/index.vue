<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="企业客户列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="select" data-code="STD_ZB_CORP_QLTY" placeholder="企业性质" name="corpQlty"></yu-xform-item>
            <yu-xform-item label="客户状态" ctype="select" data-code="STD_CUS_STATE" placeholder="客户状态" name="cusState"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId" width="150px"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode" width="200px"></yu-xtable-column>
          <yu-xtable-column label="企业性质" prop="corpQlty" width="100" data-code="STD_ZB_CORP_QLTY"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="企业成立时间" prop="strDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="企业类型" prop="corpType" width="100"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="mainBrName" width="100"></yu-xtable-column>
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
  name: 'YuXetrsCst2',
  componentName: 'YuXetrsCst2',
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
