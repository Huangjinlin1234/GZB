<template>
  <div>
    <yu-panel title="押品基本信息录入流程页面展示">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onView" @click="customClick('onView')">查看</yu-button>
          <yu-button ref="btn_upload" @click="customClick('upload')">上传影像</yu-button>
<!-- <yu-button ref="btn_jump" @click="customClick('jump')">跳转押品</yu-button> -->
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="押品类型" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="抵质押物类型名称" prop="pldimnMemo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/all',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/'
    };
  }
};
</script>