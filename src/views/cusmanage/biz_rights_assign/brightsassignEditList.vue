<template>
  <div>
    <yu-panel title="业务权获取人员" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_INSERT" v-if="operate!='details'" @click="customClick('INSERT')">添加</yu-button>
          <yu-button ref="btn_$delete" v-if="operate!='details'" @click="deleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务权获得人用户号" prop="bizRightsRecipientUser"></yu-xtable-column>
        <yu-xtable-column label="业务权获得人姓名" prop="bizRightsRecipientUserName"></yu-xtable-column>
        <yu-xtable-column label="业务权获得人所属机构" prop="bizRightsRecipientBelgOrg"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'd1_B_BillList',
  mixins: [mixinList],
  props: {
    operate: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbizacquuserlst/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbizacquuserlst/delete/'
    };
  },
  methods: {
    deleteFn(){
      let _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let row = selections[0];
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: function (action) {
          if (action === 'confirm') {
            if(row.pkId){ // 有pkId  原有数据
                _this.$request({
                url: _this.deleteUrl + '/' + row[_this.pkField],
                method: 'post'
              }).then((response) => {
                if (response.code == '0') {
                  _this.$refs.refTable.tabledata.splice(_this.$refs.refTable.tabledata.indexOf(row), 1);
                  _this.$message('删除成功!');
                }
              }).catch(() => {
                // 处理请求失败的情况
                _this.$message({ message: '删除失败!', type: 'error' });
              });
            }else{ // 无pkId  新增数据
              _this.$refs.refTable.tabledata.splice(_this.$refs.refTable.tabledata.indexOf(row), 1);
              _this.$message('删除成功!');
            }
          }
        }
      });
    }
  }
};
</script>