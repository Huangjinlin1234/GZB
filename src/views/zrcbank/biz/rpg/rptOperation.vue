
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="行业情况" panel-type="simple">
      <yu-xform ref="basicForm" label-width="120px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-xform-group>
          <yu-xform-item label="行业情况" name="tradeCase" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBasic" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </yu-panel>
    <yu-panel title="生产经营情况" panel-type="simple">
      <div :is="currentView" :param="param"></div>
      <energyCons :param="param" ref="energyCons"></energyCons>
    </yu-panel>
    <energySales :param="param" ref="energySales" v-if="sales"></energySales>
    <profitSituation :param="param" v-if="profit"></profitSituation>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import energyCons from './energyCons';
import energySales from './energySales';
import profitSituation from './profitSituation';
import manufacturing from './productionOper/manufacturing';
import wholeSaleAndRetail from './productionOper/wholeSaleAndRetail';
import construction from './productionOper/construction';
import agriculture from './productionOper/agriculture';
import service from './productionOper/service';
import finance from './productionOper/finance';
import normal from './productionOper/normal';
import develop from './productionOper/develop';
import { mapState } from 'vuex';

export default {
  components: {
    YufpDemoSelector,
    mapState,
    energyCons,
    energySales,
    profitSituation,
    manufacturing,
    wholeSaleAndRetail,
    construction,
    agriculture,
    service,
    finance,
    normal,
    develop
  },
  props: {
    param: Object
  },
  data: function () {
    return {
      currentView: '',
      basicFormData: {},
      sales: true,
      profit: true,
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    if (_this.param.sales) {
      _this.sales = _this.param.sales;
    }
    if (_this.param.profit) {
      _this.profit = _this.param.profit;
    }
    _this.op = _this.param.op;
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperation/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              yufp.clone(response.data, _this.basicFormData);
              var tradeClass = response.data.tradeClass;
              var trade = tradeClass.substring(0, 1);
              if (trade == 'C') {
                _this.currentView = 'manufacturing';
              } else if (trade == 'F') {
                _this.currentView = 'wholeSaleAndRetail';
              } else if (trade == 'E') {
                _this.currentView = 'construction';
              } else if (trade == 'A') {
                _this.currentView = 'agriculture';
              } else if (
                trade == 'I' ||
                trade == 'L' ||
                trade == 'M' ||
                trade == 'O'
              ) {
                _this.currentView = 'service';
              } else if (trade == 'J') {
                _this.currentView = 'finance';
              } else if (trade == 'K') {
                _this.currentView = 'develop';
              } else {
                _this.currentView = 'normal';
              }
            } else {
              let obj = {};
              obj.serno = _this.param.serno;
              yufp.service.request({
                method: 'POST',
                url:
                  _this.$backend.cmisBiz +
                  '/api/rptoperation/insertRptOperation',
                data: obj,
                callback: function (code, message, response) {
                  if (response.data > 0) {
                    _this.init();
                  } else {
                    // _this.$message({
                    //   duration: 4000,
                    //   message: "系统错误，请联系管理员！",
                    //   type: "warning",
                    // });
                    // return;
                  }
                }
              });
            }
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
    // 行业情况保存
    saveBasic: function () {
      var _this = this;
      var validate = false;
      _this.$refs.basicForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var obj = {};
      obj.serno = _this.basicFormData.serno;
      obj.tradeCase = _this.basicFormData.tradeCase;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperation/updateRptOperation',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.init();
            _this.$message({
              message: '操作成功！'
            });
            return;
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
    // 暂存
    tempSave: function () {
      var _this = this;
      // TODO
    }
  }
};
</script>
