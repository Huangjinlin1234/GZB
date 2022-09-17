<template>
  <div>
    <yu-panel title="业务权人员选取" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="用户编号" ctype="input" placeholder="用户编号" name="loginCode" ></yu-xform-item>
          <yu-xform-item label="用户名称" ctype="input" placeholder="用户名称" name="userName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_choose" @click="customClick('choose')">选取</yu-button>
          <yu-button ref="btn_back" @click="customClick('back')">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="用户编号" prop="loginCode" width="150"></yu-xtable-column>
        <yu-xtable-column label="用户名称" prop="userName" width="150"></yu-xtable-column>
        <yu-xtable-column label="所在机构名称" prop="orgName" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'ChooseList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'userId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + '/api/adminsmuser/getcommonuserinfo',
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + '/api/adminsmuser/delete/'
    };
  }
};
</script>
