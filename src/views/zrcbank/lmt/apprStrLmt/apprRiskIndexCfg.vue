
<template>
  <!--
    @created by 陈杰 2021-09-16
    @description 风险暴露指标配置
  -->
  <div>
    <yu-panel title="风险暴露指标配置列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" :remove-empty="true" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="指标名称" placeholder="指标名称" name="riskType" ctype="select" data-code="STD_DE_RISK_TYPE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button @click="doUpdate" v-if="checkCtrl('edit')" type="primary">修改</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="指标名称" prop="riskType" data-code="STD_DE_RISK_TYPE"></yu-xtable-column>
        <yu-xtable-column label="指标限额要求（%）" prop="riskIndexReq">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.riskIndexReq * 100).toFixed(2) }}%</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="黄区阈值（%）" ctype="yu-num" sign="%" :multiple="100" prop="riskYellowReq" @blur="doSave">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.riskYellowReq * 100).toFixed(2) }}%</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="红区阈值（%）" ctype="yu-num" sign="%" :multiple="100" prop="riskRedReq" @blur="doSave">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.riskRedReq * 100).toFixed(2) }}%</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
yufp.lookup.reg("STD_DE_RISK_TYPE");

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
    };
  },
  mounted() {
    this.dataUrl = backend.cmisLmt + "/api/deriskindexcfg/selectByModel";
  },
  created(){

  },
  methods: {
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      var routeKey = "apprStrLmtDetail" + selectionsAry[0].cusId;
      model.cusId = selectionsAry[0].cusId;
      model.instuCde = selectionsAry[0].instuCde;
      model.formdata = selectionsAry[0];
      model.routeKey = routeKey;
      model.viewType = "DETAIL";
      model.callback = _this.getReturn;
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name:
            "zrcbank/lmt/apprStrLmt/apprStrLmtDetailIndiv/apprStrLmtDetailIndiv",
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: "个人客户额度视图详情",
          // 传递的业务数据，可选配置
          data: model,
        });
      });
    },
    doAdd() {
      var _this = this;
        let userInfo = this.$xutils.getLoginUserInfo();
        // let pkId = this.$xutils.getUUID();
        let row = {
          // pkId: pkId,
          serno: _this.serno,
          cusId: _this.cusId,
          oprType: "01",
          inputId: userInfo.loginCode,
          inputBrId: userInfo.orgCode,
          inputDate: this.$xutils.dateFormat("yyyy-MM-dd", new Date()),
          updId: userInfo.loginCode,
          updBrId: userInfo.orgCode,
          updDate: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()),
          createTime: this.$xutils.dateFormat(
            "yyyy-MM-dd hh:mm:ss",
            new Date()
          ),
        };
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
    },
    doUpdate() {},
    doDelete() {},
    doSave() {
      // 获取选中的数据
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisLmt + "/api/deriskindexcfg/update",
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$refs.refTable.remoteData();
            _this.$message({
              message: "保存失败",
              type: "warning",
            });
          }
        },
      });
    },
  },
};
</script>
