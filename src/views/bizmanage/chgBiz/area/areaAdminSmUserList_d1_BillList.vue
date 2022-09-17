<template>
  <div>
    <yu-panel title="人员权限表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="用户码" ctype="input" placeholder="用户码" name="loginCode"></yu-xform-item>
          <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="userName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo"></yu-xform-item>
          <yu-xform-item label="所属机构编号" ctype="input" placeholder="所属机构编号" name="orgId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_relateFn" @click="customClick('relateFn')">关联信息</yu-button>
          <yu-button ref="btn_resetPassFn" @click="customClick('resetPassFn')">重设密码</yu-button>
          <yu-button ref="btn_setArea" @click="customClick('setArea')">设置区域</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="用户码" prop="loginCode" width="100"></yu-xtable-column>
        <yu-xtable-column label="姓名" prop="userName" width="180"></yu-xtable-column>
        <yu-xtable-column label="联系电话" prop="userMobilephone" width="100"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="所属机构编号" prop="orgId" width="100"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="orgName" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './areaAdminSmUserList_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'userId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api/adminsmuser/",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api/adminsmuser/delete/"
    }
  }
}
</script>