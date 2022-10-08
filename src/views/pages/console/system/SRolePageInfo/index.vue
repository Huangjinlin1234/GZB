<template>
  <div>
    <formTable :pageOptions="pageOptions">
      <yu-button type="primary" ref="btn_insertFn" v-if="checkCtrl('add')"  @click="customClick('insertFn')">新增</yu-button>
      <yu-button type="primary" ref="btn_updateFn" v-if="checkCtrl('edit')"  @click="customClick('updateFn')">修改</yu-button>
      <yu-button type="primary" ref="btn_deleteFn" v-if="checkCtrl('delete')"  @click="customClick('deleteFn')">删除</yu-button>
      <yu-button type="primary" ref="btn_viewFn" v-if="checkCtrl('view')"  @click="customClick('viewFn')">查看</yu-button>
    </formTable>
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
export default {
  components: { formTable },
  data () {
    return {
      pageOptions: {
        title: '角色管理',
        dataUrl: backend.console + '/api/s/rolesBaseOrgs',
        formFileds: [
          {label: '角色代码', name: 'roleCode', ctype: 'input'},
          {label: '角色名称', name: 'roleName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '角色代码', prop: 'roleCode'},
          {label: '角色名称', prop: 'roleName'},
          {label: '角色类型', prop: 'roleType'}
        ]
      }
    };
  }
};
</script>