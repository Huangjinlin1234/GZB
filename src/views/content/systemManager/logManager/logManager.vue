<!--
  @Created by zhuly8@yusys.com.cn 2021-2-20
  @updated by
  @description 日志管理
-->
<template>
  <div id="logManager">
    <yu-panel :title="$t('logManager.rzgl')">
      <template slot="right">
        <yu-toolBar>
          <yu-button @click="dialogVisible=true">{{ $t('logManager.dc') }}</yu-button>
          <yu-button @click="deleteLogInfo">{{ $t('logManager.sc') }}</yu-button>
        </yu-toolBar>
      </template>
      <template slot="filter">
        <yu-xform v-model="formdata" related-table-name="logtable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item :label="$t('logManager.rzlx')" :placeholder="$t('logManager.qxz')" ctype="select" name="logTypeId" data-code="LOG_TYPE"></yu-xform-item>
            <yu-xform-item :label="$t('logManager.czyh')" :placeholder="$t('logManager.qsr')" ctype="input" name="userName"></yu-xform-item>
            <yu-xform-item :label="$t('logManager.czdx')" :placeholder="$t('logManager.qsr')" ctype="input" name="operObjId"></yu-xform-item>
            <yu-xform-item :label="$t('logManager.czsjc')" :placeholder="$t('logManager.qxz')" ctype="datepicker" name="beginTime"></yu-xform-item>
            <yu-xform-item :label="$t('logManager.czsjz')" :placeholder="$t('logManager.qxz')" ctype="datepicker" name="endTime"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="logtable" row-number :data-url="dataUrl" selection-type="checkbox" @row-click="getSelectedRow">
        <yu-xtable-column :label="$t('logManager.czzxm')" prop="userName"></yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.czzjg')" prop="orgName"> </yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.rzlx')" prop="logTypeId" data-code="LOG_TYPE"></yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.czdx')" prop="operObjId"></yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.dl')" prop="loginIp" width="300px"></yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.czsj')" prop="operTime" width="160px"></yu-xtable-column>
        <yu-xtable-column :label="$t('logManager.cznr')" prop="content" width="460px"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :center="true" :title="$t('logManager.ts')" :visible.sync="dialogVisible" size="tiny">
      <span>{{ $t('logManager.sfqrdc') }}</span>
      <span slot="footer" class="dialog-footer">
        <yu-button @click="exportLog()" type="primary" :title="$t('logManager.bbjys')">{{ $t('logManager.qd') }}</yu-button>
        <yu-button @click="dialogVisible=false">{{ $t('logManager.qx') }}</yu-button>
      </span>
    </yu-xdialog>
  </div>
</template>

<script>
import { lookup} from '@/utils';
import { download } from '@/utils/util';
lookup.reg('LOG_TYPE');
export default {
  data () {
    return {
      formdata: {},
      pickerStartOptions: {
        disabledDate (time) {
          if (this.formdata.endTime) {
            return (
              time.getTime() > new Date(this.formdata.endTime).getTime()
            );
          }
        }
      },
      pickerEndOptions: {
        disabledDate (time) {
          if (this.formdata.beginTime) {
            return (
              time.getTime() < new Date(this.formdata.beginTime).getTime()
            );
          }
        }
      },
      dialogVisible: false,
      checkbox: true,
      // dataUrl: ''
      dataUrl: backend.appOcaService + '/api/monitor/auditlogdata/list'
    };
  },
  methods: {
    getSelectedRow (row) {
      // 获取选中行
    },
    deleteLogInfo () { // 删除日志信息
      var _this = this;
      var selects = _this.$refs.logtable.selections;
      if (selects.length == 0) {
        _this.$message(_this.$t('logManager.qzsxzytsj'), _this.$t('logManager.jg'));
        return false;
      }
      _this.$confirm(_this.$t('logManager.sfqdscsxsj'), _this.$t('logManager.ts'), {
        confirmButtonText: _this.$t('logManager.qd'),
        cancelButtonText: _this.$t('logManager.qx'),
        type: 'warning',
        callback (action) {
          if (action === 'confirm') {
            _this.$request({
              url: backend.appOcaService + '/api/monitor/auditlogdata/batchdelete',
              method: 'post',
              data: JSON.stringify(selects)
            }).then(({code, message, data}) => {
              if (code === '0') {
                _this.$message({
                  message: _this.$t('logManager.scjlcg'),
                  type: 'success'
                });
                _this.$refs.logtable.remoteData();
              } else {
                _this.$message({
                  message: message || _this.$t('logManager.scjlsb'),
                  type: 'warning'
                });
              }
            });
          }
        }
      });
    },
    exportLog () {
      var params = '';
      Object.keys(this.formdata).forEach(key => {
        if (this.formdata[key]) {
          params = `${params}&${key}=${this.formdata[key]}`;
        }
      });
      params = params.substring(1, params.length);
      var url = backend.appOcaService + '/api/monitor/auditlogdata/export?' + params;
      download(url);
      this.dialogVisible = false;
    }
  }
};
</script>