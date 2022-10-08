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
        title: '机构管理',
        dataUrl: backend.console + '/api/s/orgs',
        formFileds: [
          {label: '机构代码', name: 'orgCode', ctype: 'input'},
          {label: '机构名称', name: 'orgName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '机构代码', prop: 'orgCode'},
          {label: '机构名称', prop: 'orgName'},
          {label: '机构层级', prop: 'orgLvl'},
          {label: '上级机构代码', prop: 'orgParentCode'}
        ]
      }
    };
  }
};
</script>