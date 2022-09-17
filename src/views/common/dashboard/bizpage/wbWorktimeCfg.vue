
<template>
    <!--
    @created by dongan
    @description 工作时间配置界面
    -->
  <div >
      <yu-panel title="工作时间配置" panel-type="normal">
          <yu-xtable ref="refTable" condition-key="condition" :data-url="dataUrl" :base-params="params" :default-load="false" request-type="POST" :disabled="formDisabled">
            <yu-xtable-column label="时令类型" prop="seasonType"  ctype="select" rules="required" data-code="STD_SEASON_TYPE" ></yu-xtable-column>
            <yu-xtable-column label="开始月日" prop="startDate" ctype="input" rules="required"></yu-xtable-column>
            <yu-xtable-column label="结束月日" prop="endDate" ctype="input" rules="required" ></yu-xtable-column>
            <yu-xtable-column label="工作时间(上午)" prop="workTimeAm" ctype="yu-time-picker" is-range rules="required">
              <template slot-scope="scope">
                  {{ setTime(scope.row.workTimeAm)  }}
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="工作时间(下午)" prop="workTimePm" ctype="yu-time-picker" is-range rules="required">
              <template slot-scope="scope">
                  {{ setTime(scope.row.workTimePm)  }}
              </template>
            </yu-xtable-column>
          </yu-xtable>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
      </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { lookup } from '@/utils';
lookup.reg('STD_SEASON_TYPE');

export default {
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/wbworktimecfg/',
      updateByListUrl: backend.cmisCfg + '/api/wbworktimecfg/updatebylist',
      activeName: '1',
      searchFormdata: {}, // 查询条件框
      formdata: {},
      params: { },
      pages: 10,
      dialogVisible: false,
      formDisabled: false,
      saveBtnShow: true
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.params = { };
  },
  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    getTime (time) {
      return yufp.util.dateFormat(time, '{h}:{i}:{s}');
    },
    setTime (time) {
      if (time != null && time != '' && (typeof time == 'string')) {
        return time;
      } else if (time != null && time != '' && (typeof time == 'object')) {
        let time1 = this.getTime(time[0]);
        let time2 = this.getTime(time[1]);
        return time1 + '--' + time2;
      } else {
        return '00:00:00--00:00:00';
      }
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      let _this = this;
      var _length = _this.$refs.refTable.tabledata.length;
      if (_length > 0) {
        for (let i = 0; i < _length; i++) {
          let workTimeAm1 = _this.$refs.refTable.tabledata[i].workTimeAm;
          if (typeof workTimeAm1 == 'object') {
            let time1 = _this.getTime(workTimeAm1[0]);
            let time2 = _this.getTime(workTimeAm1[1]);
            _this.$refs.refTable.tabledata[i].workTimeAm = time1 + '--' + time2;
          }
          let workTimePm1 = _this.$refs.refTable.tabledata[i].workTimePm;
          if (typeof workTimePm1 == 'object') {
            let time1 = _this.getTime(workTimePm1[0]);
            let time2 = _this.getTime(workTimePm1[1]);
            _this.$refs.refTable.tabledata[i].workTimePm = time1 + '--' + time2;
          }
        }
        yufp.service.request({
          method: 'POST',
          url: _this.updateByListUrl,
          data: _this.$refs.refTable.tabledata,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '更新成功！', type: 'info'});
              _this.$refs.refTable.remoteData();
              _this.$router.go(0)
            }
          }
        });
      } else {
        _this.$message({
          message: '请先初始化数据',
          type: 'warning'
        });
        return;
      }
    }
  }
};
</script>
