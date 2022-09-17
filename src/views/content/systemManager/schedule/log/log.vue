<!--
  @Created by gaoxin5@yusys.com.cn 2021-03-01
  @updated by
  @description 定时任务-日志列表
-->
<template>
  <div class="data-scheduleLog">
    <yu-panel title="日志列表" :collapse-hide="false">
      <template slot="right">
        <yu-toolBar>
          <yu-input style="float:left;line-height:36px;margin-right:10px;" :placeholder="$t('schedule.rwid')" v-model="inputVal" @keyup.enter.native="logQueryFn">
            <i slot="suffix" class="el-input__icon yu-icon-search1" @click="logQueryFn"></i>
          </yu-input>
          <yu-button @click="backScheduleFn" type="danger">{{ $t('schedule.fh') }}</yu-button>
        </yu-toolBar>
      </template>
      <yu-xtable :data-url="serviceUrl" row-number ref="scheduleLogTable">
        <yu-xtable-column prop="logId" :label="$t('schedule.rzid')"></yu-xtable-column>
        <yu-xtable-column prop="jobId" :label="$t('schedule.rwid')"></yu-xtable-column>
        <yu-xtable-column prop="beanName" :label="$t('schedule.beanmc')"></yu-xtable-column>
        <yu-xtable-column prop="params" :label="$t('schedule.cs')"></yu-xtable-column>
        <yu-xtable-column :label="$t('schedule.zht')">
          <template slot-scope="scope">
            <yu-tag v-if="scope.row.status == 0" type="success" size="small">成功</yu-tag>
            <yu-tag v-if="scope.row.status == 1" type="danger" size="small">失败</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="times" :label="$t('schedule.hs')"></yu-xtable-column>
        <yu-xtable-column prop="createTime" :label="$t('schedule.zxsj')"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serviceUrl: backend.appOcaService + '/api/scheduleLog/list', // 数据模板表单查询URL
      inputVal: ''
    };
  },

  methods: {
    /**
    * 简洁搜索框模糊查询
    */
    logQueryFn() {
      var param = {jobId: this.inputVal};
      this.$refs.scheduleLogTable.remoteData(param);
    },

    // 返回定时任务列表
    backScheduleFn () {
      this.$router.go(-1)
    }
  }
}
</script>