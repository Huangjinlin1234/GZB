
<template>
  <!--
    @created by creazyCder 2021-07-07 19:35:26
    @updated by 2021-08-28 14:54
    @updated by 2021-08-28 14:54
    @description 微业贷批处理记录
  -->
  <div>
    <yu-panel title="微业贷批量日志列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="批量日期" name="msgBuzdate" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item placeholder="批量状态" name="batStatus"  data-code="STD_RZ_TASK_STATUS" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="错误信息" name="batFailedMsg" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="是否人工" name="isArtificial" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      
      <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" style="width: 100%">
        <yu-xtable-column fixed label="批量日期 " prop="msgBuzdate"  value-format="yyyy-MM-dd"></yu-xtable-column>
        <yu-xtable-column label="批量状态" prop="batStatus" data-code="STD_RZ_TASK_STATUS"></yu-xtable-column>
        <yu-xtable-column label="是否人工触发" prop="isArtificial" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="批量开始时间 " prop="batStartTime" value-format="yyyy-MM-dd HH:mm:ss"></yu-xtable-column>
        <yu-xtable-column label="批量结束时间" prop="batEndTime" value-format="yyyy-MM-dd HH:mm:ss"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="batStatus" width="150px">
          <template slot-scope="scope">
              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="rowDblclick(scope.row)" :hidden="scope.row.batStatus =='100'">手动触发</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/wydbatrecord/selectByModel',
      formdata: {}
    };
  },
  methods: {
    /**
     * 手动触发
     */
    rowDblclick: function (row) {
      var pkId = row.pkId;
      let _this = this;
      yufp.service.request({
          method: 'POST',
          data: [],
          url: _this.$backend.cmisBiz + '/api/wydbatrecord/batArtificial/' + pkId,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({
                  duration: 2000,
                  message: '已成功手动触发该任务，请稍后查询批处理结果！',
                  type: 'success'
                });
                _this.$refs.refTable.remoteData();
            } else {
              if (response.message != null) {
                _this.$message({
                  duration: 6000,
                  message: '批处理异常:' + response.message,
                  type: 'error'
                });
              } else {
                _this.$message({
                  duration: 6000,
                  message: '批处理异常!',
                  type: 'error'
                });
              }
            }
          }
        });
    }
  }
};
</script>