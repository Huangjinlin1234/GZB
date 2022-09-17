<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="客户信息">
        <yu-xform form-type="search" v-model="searchFormdata" :default-sort="{prop:'cusId',order:'descending'}" label-width="150px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="请输入客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="请输入客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="请输入证件号码" name="certCode"></yu-xform-item>
            <yu-xform-item label="客户分类" ctype="select" placeholder="客户分类" name="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xform-item>
            <yu-xform-item label="管护客户经理工号" ctype="input" placeholder="管护客户经理工号" name="managerId" ></yu-xform-item>
            <yu-xform-item label="客户状态" ctype="select" placeholder="客户状态" name="cusState" data-code="STD_CUS_STATE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"  sortable></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="开户日期" prop="openDate" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理编号" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理名称" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
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
  name: 'YuXiaoWei',
  componentName: 'YuXiaoWei',
  mixins: [popList],
  data: function () {
    return {
      selectedVal: '',
      baseParams: {condition: {cusCatalog: '1',
        managerId: this.$xutils.getLoginUserInfo().loginCode,
        certType: 'A'
      },
      sort: 'createTime desc'
      },
      dataUrl: backend.cmisCus + '/api/cusbase/',
      // dataUrl: backend.cmisCus + '/api/cusbase/selectbycondition',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusId'
    };
  }
};
</script>