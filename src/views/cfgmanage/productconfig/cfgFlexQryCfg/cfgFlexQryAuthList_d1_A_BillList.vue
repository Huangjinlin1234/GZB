<template>
  <div>
    <yu-panel title="报表授权配置角色">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="角色代码" prop="roleCode"></yu-xtable-column>
        <yu-xtable-column label="角色名称" prop="roleName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      d1_B_BillList: null,
      pkField: 'roleId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api/adminsmrole/page",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api/delete/"
    }
  },
  methods: {
    // 选中数据后根据角色代码查询权限下的报表数据
    onRowClick() {
      // 获取选中行的角色代码
      let selectedRoleRow = this.$refs.refTable.selections[0];
      let roleCode = selectedRoleRow.roleCode;
      let params = {
        'roleCode': roleCode
      };
      this.$parent.$parent.$parent.checkedD1BListData(params);
    },
  }
}
</script>