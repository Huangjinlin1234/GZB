<template>
  <div>
    <formTable  :pageOptions="pageOptions" @emitSelection="selectionFn" >
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('ADD')">新增</yu-button>
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('EDIT')">修改</yu-button>
      <yu-button type="primary" ref="btn_deleteFn" @click="openDialog('DETAIL')">查看</yu-button>
      <yu-button type="primary" ref="btn_viewFn"   @click="cancelUser('user')">注销</yu-button>
      <yu-button type="primary" ref="btn_updateFn" @click="submitBeforeFn">提交</yu-button>
    </formTable>
    <userEdit
      ref="refUserEdit"
      :dialogVisible.sync="showDialog"
      :dialogTitle="dialogTitle"
      :pageType="pageType"
      :userInfo="userInfo"></userEdit>
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import userEdit from './userEdit.vue';
export default {
  components: { formTable, userEdit },
  mixins: [minxinDiaFn],
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
      },
      selections: []
    };
  },
  methods: {
    selectionFn (selections) {
      this.selections = selections;
      this.userInfo = selections[0];
    }
  }
};
</script>