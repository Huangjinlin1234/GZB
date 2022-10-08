<template>
  <div>
    <formTable :pageOptions="pageOptions">
      <yu-button type="primary" ref="btn_insertFn" v-if="checkCtrl('add')"  @click="customClick('insertFn')">新增</yu-button>
        <yu-button type="primary" ref="btn_updateFn" v-if="checkCtrl('edit')"  @click="customClick('updateFn')">修改</yu-button>
        <yu-button type="primary" ref="btn_deleteFn" v-if="checkCtrl('delete')"  @click="customClick('deleteFn')">删除</yu-button>
        <yu-button type="primary" ref="btn_viewFn" v-if="checkCtrl('view')"  @click="customClick('viewFn')">查看</yu-button>
        <yu-button type="primary" ref="btn_updateFn" @click="submitBeforeFn" hidden>提交</yu-button>
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
        title: '用户管理',
        dataUrl: backend.console + '/api/s/users',
        formFileds: [
          {label: '用户代码', name: 'orgCode', ctype: 'input'},
          {label: '用户姓名', name: 'orgName', ctype: 'input'},
          {label: '性别', name: 'orgName', ctype: 'input'},
          {label: '状态', name: 'orgName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '用户代码', prop: 'userCode'},
          {label: '用户姓名', prop: 'userName'},
          {label: '机构名称', prop: 'orgName'},
          {label: '联系电话', prop: 'telPhone'},
          {label: '性别', prop: 'sex'},
          {label: '状态', prop: 'status'},
          {label: '是否柜员', prop: 'isSyncUser'}
        ]
      }
    };
  }
};
</script>