<template>
  <div>
    <formTable :pageOptions="pageOptions" @emitSelection="selectionFn">
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('ADD')">新增</yu-button>
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('EDIT')">修改</yu-button>
      <yu-button type="primary" ref="btn_deleteFn" @click="openDialog('DETAIL')">查看</yu-button>
    </formTable>
    <orgEdit
      ref="refOrgEdit"
      :dialogVisible.sync="showDialog"
      :dialogTitle="dialogTitle"
      :pageType="pageType"
      :orgInfo="orgInfo"></orgEdit>
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import orgEdit from './orgEdit.vue';
export default {
  components: { formTable, orgEdit },
  mixins: [minxinDiaFn],
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
      },
      selections: [],
      orgInfo: {}
    };
  },
  methods: {
    selectionFn (selections) {
      this.selections = selections;
      this.orgInfo = selections[0];
    }
  }
};
</script>