<template>
  <div>
    <yu-panel title="产品适用机构列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="机构编号" ctype="yu-xorg-query" name="orgId" placeholder="机构编号" @select-fn="commonSelectFn" :mapping="{ orgName: 'orgName', orgCode: 'orgId' }" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addPrdOrgRelFn" @click="customClick('addPrdOrgRelFn')">新增</yu-button>
          <yu-button ref="btn_$delete" @click="tab1DeleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" request-type="POST" row-number condition-key="condition" selection-type="radio"  :pageable="true" :data-url="dataUrl" :base-params="baseParams" >
        <yu-xtable-column label="适用范围" prop="suitScope" data-code="STD_ZB_APPLY_RANGE"></yu-xtable-column>
        <yu-xtable-column label="适用类型" prop="suitType" data-code="STD_ZB_APPLY_TYP"></yu-xtable-column>
        <yu-xtable-column label="机构编号" prop="orgId"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="orgName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('DATA_STS,STD_ZB_YES_NO,STD_ZB_PUTOUT_TYP,STD_ZB_OPR_TYPE,STD_ZB_APPLY_RANGE,STD_ZB_APPLY_TYP,STD_ZB_CHNL_SOUR,STD_ZB_FILE_TYPE');
import mixinList from '@/utils/mixins/mixin-list';

export default {
  name: 'D12BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      searchFormdata: {},
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprdorgrel/selectbymodel',
      baseParams: {condition: { oprType: '01', prdId: this.pageParams.prdId }}, // JSON.stringify()
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprdorgrel/delete/'
    };
  },
  mounted () {
    this.searchFormdata = { prdId: this.pageParams.prdId };
  },
  methods: {
    tab1DeleteFn () {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: function (action) {
          if (action === 'confirm') {
            _this
              .$request({
                url: _this.deleteUrl + '/' + row[_this.pkField],
                method: 'post'
              })
              .then(response => {
                if (response.code == '0') {
                  _this.doAutoQuery();
                  _this.$message('删除成功!');
                }
              })
              .catch(() => {
                // 处理请求失败的情况
                _this.$message({ message: '删除失败!', type: 'error' });
              });
          }
        }
      });
    }
  }
};
</script>
