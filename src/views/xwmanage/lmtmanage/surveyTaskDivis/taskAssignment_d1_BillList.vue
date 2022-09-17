<template>
  <div>
    <yu-xform ref="refForm" form-type="search" related-table-name="refTable"  v-model="searchFormdata" label-width="120px">
      <yu-xform-group :column="3">
        <yu-xform-item label="客户经理编号" ctype="input" placeholder="客户经理编号" name="loginCode"></yu-xform-item>
        <yu-xform-item label="客户经理名称" ctype="input" placeholder="客户经理名称" name="userName"></yu-xform-item>
        <yu-xform-item label="所在机构编号" ctype="input" placeholder="所在机构编号" name="orgId" v-if="show"></yu-xform-item>
        <yu-xform-item label="所在机构名称" ctype="input" placeholder="所在机构名称" name="orgName" ></yu-xform-item>
      </yu-xform-group>
    </yu-xform>

    <yu-xtable ref="refTable" row-number request-type="POST"  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
      <yu-xtable-column label="客户经理编号" prop="loginCode"></yu-xtable-column>
      <yu-xtable-column label="客户经理名称" prop="userName"></yu-xtable-column>
      <yu-xtable-column label="所在机构编号" prop="orgId" v-if="show"></yu-xtable-column>
      <yu-xtable-column label="所在机构名称" prop="orgName"></yu-xtable-column>
    </yu-xtable>
      <div class="button-group" style="text-align:center">
 <yu-button type="primary"  @click="customClick('select')" :loading="buttonLoading">分配</yu-button>
    <yu-button autofocus  @click="customClick('closeopen')">返回</yu-button>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      // api/adminsmduty/userlist?dutyId=GW000017
      // dataUrl: this.$backend.appOcaService + '/api/adminsmrole/userlist?roleId=DF453F11943D4657A74C868B21E84C3B&checked=true',
      dataUrl: this.$backend.appOcaService + '/api/adminsmduty/userlistbygw',
      baseParams: {dutyId: 'XWB01'},
      buttonLoading: false
    };
  }
};
</script>