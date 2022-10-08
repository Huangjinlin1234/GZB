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
        title: '岗位管理',
        dataUrl: backend.console + '/api/s/dutys',
        formFileds: [
          {label: '岗位代码', name: 'dutyCode', ctype: 'input'},
          {label: '岗位名称', name: 'dutyName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '岗位代码', prop: 'orgCode'},
          {label: '岗位名称', prop: 'orgName'},
          {label: '状态', prop: 'status'}
        ]
      }
    };
  }
};
</script>