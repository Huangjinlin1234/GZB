<template>
  <div>
  <el-divider></el-divider>
    <yu-panel title="侧面信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_addProfile" @click="customClick('addProfile')" v-if="lookPage">新增</yu-button>
          <yu-button type="primary" ref="btn_update" @click="customClick('updateProfile')" v-if="lookPage">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="deletePro" v-if="lookPage">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="POST" @row-click="onRowClick" :base-params="baseParams" @row-dblclick="onRowDBClick" @cell-click="onCellClick"  :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="渠道" prop="chnl"></yu-xtable-column>
        <yu-xtable-column label="电话" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="备注" prop="remark"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtsurveyprofileinfo/selectbymodel',
      baseParams: {condition: {surveySerno: this.surveySerno}},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtsurveyprofileinfo/delete/',
      lookPage: false,
      surveySerno: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        this.baseParams.condition.surveySerno = this.surveySerno;
        this.$refs.refTable.remoteData();
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
        this.baseParams.condition.surveySerno = this.surveySerno;
        this.$refs.refTable.remoteData();
      }
      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
      }
    },
    deletePro () {
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var data = this.$refs.refTable.selections[0];
      // data.oprType = '02';
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyprofileinfo/deletebypkid',
        data: data
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          this.$message({ message: '删除成功', type: 'success' });
          this.$refs.refTable.remoteData();
        } else {
          // 操作失败
          this.$message({ message: '删除失败，请重试  ', type: 'warning' });
        }
      });
    }
  }
};
</script>