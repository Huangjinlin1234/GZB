
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="本期授信申请情况" panel-type="simple">
        <yu-xtable ref="refTable" row-number :data="data" request-type="POST" selection-type="radio" :pageable="false">
            <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
            <yu-xtable-column label="单一流水号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="敞口额度合计（元）" prop="openLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="调查报告类型" prop="rptType" data-code="STD_RPT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="操作" width="120">
              <template slot-scope="scope">
                <a class="underline" @click="viewFn(scope.row)">成员客户调查报告</a>
              </template>
            </yu-xtable-column>
         </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_RPT_TYPE');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      data: []
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtgrpapp/getLmtAppByGrpSernoIsDeclare',
        data: _this.param.grpSerno,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null && response.data.length > 0) {
              _this.data = response.data;
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
    viewFn (data) {
      let _this = this;
      if (!data.serno || data.serno == null) {
        _this.$message({
          duration: 4000,
          message: '该成员未填写授信信息!',
          type: 'warning'
        });
        return;
      }
      if (!data.rptType || data.rptType == null) {
        _this.$message({
          duration: 4000,
          message: '该成员未选择调查报告类型!',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/rpg/rptFineReport.vue',
        // 自定义唯一页签key
        key: data.cusId + new Date().getTime(), // 必传
        // 页签名称
        title: '成员调查报告',
        // 传递的业务数据，可选配置
        data: data
      });
    }
  }

};
</script>
