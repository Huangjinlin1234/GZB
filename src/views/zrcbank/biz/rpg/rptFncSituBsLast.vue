
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务情况————以最近一期报表分析
  -->
  <div>
    <yu-panel title="以最近一期报表分析" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
      </yu-toolbar>
      <yu-xtable ref="situBsLastTable" row-number :data="situBsLastdata" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="资产"></yu-xtable-column>
        <yu-xtable-column prop="curYearLastMonth" label="金额"></yu-xtable-column>
        <yu-xtable-column prop="briefDescription" ctype="input" label="简要说明或分析" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      <yu-toolbar :show-length="8" style="margin-top:20px;">
        <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
      </yu-toolbar>
      <yu-xtable ref="situBsLastTable1" row-number :data="situBsLastdata1" style="margin-top:20px" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="负债和所有者权益"></yu-xtable-column>
        <yu-xtable-column prop="curYearLastMonth" label="金额"></yu-xtable-column>
        <yu-xtable-column prop="briefDescription" ctype="input" label="简要说明或分析" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="situBsLastForm1" label-width="240px" v-model="formdataSituBsLast1" :disabled="op =='VIEW'">
        <yu-xform-group :column="1">
          <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn" v-show="op!='VIEW'">保存</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      formdataSituBsLast1: {},
      situBsLastdata: [],
      situBsLastdata1: [],
      dialogSitu: false,
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.initSituBsBelast1();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/rptfncsitubs/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.formdataSituBsLast1);
          }
        }
      });
    },
    initSituBsBelast1: function () {
      var _this = this;
      this.situBsLastdata = [];
      this.situBsLastdata1 = [];
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/initSmallStandard',
        data: {
          cusId: this.param.cusId, serno: this.param.serno, fncFlag: '1'
        },
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(function (item) {
              if (item.subjectType == '01') {
                _this.situBsLastdata.push(item);
              } else if (item.subjectType == '02') {
                _this.situBsLastdata1.push(item);
              }
            });
            _this.init();
          }
        }
      });
    },
    saveFn: function () {
      var _this = this;
      var data1 = _this.situBsLastdata;
      for (let i = 0; i < data1.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/rptfncsitubsanys/save',
          data: data1[i],
          callback: function (code, message, response) {
            if (code == 0) {
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
            }
          }
        });
      }
      var data2 = _this.situBsLastdata1;
      for (let i = 0; i < data2.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/rptfncsitubsanys/save',
          data: data2[i],
          callback: function (code, message, response) {
            if (code == 0) {
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
            }
          }
        });
      }
      _this.formdataSituBsLast1.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubs/saveSitu',
        data: _this.formdataSituBsLast1,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功！'
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    updateFnc: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/updateFnc',
        data: _this.param.serno,
        callback: function (code, message, response) {
          _this.initSituBsBelast1();
        }});
    }
  }
};
</script>
