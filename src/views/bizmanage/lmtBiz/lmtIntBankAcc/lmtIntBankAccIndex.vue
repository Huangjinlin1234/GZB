<template>
  <div>
    <yu-panel title="同业客户授信批复查询列表" panel-type="simple">
      <yu-panel title="查询条件" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno"></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" placeholder="批复状态" data-code="STD_REPLY_STATUS" name="accStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="同业客户授信批复查询列表" panel-type="simple">
      <yu-button-drop>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="detailFn">查看批复详情</yu-button>
        <yu-button type="primary" v-if="checkCtrl('vreport')" @click="onPrint">查看批复报告</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" requestType="POST"
                 @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick"
                 :pageable="true" :data-url="dataUrl" :base-params="Param" default-load="true" style="margin-top:5px">
        <yu-xtable-column label="批复台账编号" prop="accNo" width="110"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="授信金额(万元)" prop="lmtAmt" width="120">
          <template slot-scope="scope">
            <span>{{ formatterNum(scope.row.lmtAmt / 10000) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE" width="80"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="startDate" width="110"></yu-xtable-column>
        <yu-xtable-column label="批复到期日期" prop="endDate" width="110"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_REPLY_STATUS" width="80"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="85"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="管户人" prop="managerIdName" width="85"></yu-xtable-column>
        <yu-xtable-column label="管户机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
      </yu-panel>
    </yu-panel>

  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_REPLY_STATUS,STD_REPLY_STATUS,STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_FINAL_APPR_BR_TYPE');
export default{
  mixins: [mixinList, YufpDemoSelector],
  data: function () {
    return {
      pkField: 'pkId',
      dataUrl: this.$backend.cmisBiz + '/api/lmtintbankacc/selectByModel',
      Param: { condition: JSON.stringify({ oprType: '01' })}
    };
  },
  methods: {
    // 数字精度
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(6));
    },
    // 打印
    onPrint: function () {
      var _this = this;
      // 获取选中的数据
      let selectionsAry = this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const params = {};
      params.serno = selectionsAry[0].serno;
      params.cusId = selectionsAry[0].cusId;
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
      params.src = _this.$backend.frptRptService +
        'zjty-pf11.cpt&serno=' +
        params.serno +
        '&cusId=' +
        params.cusId;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '批复报告页面',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    detailFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var routeKey = 'lmtIntBankRepylIndexDetail';
      model.formdata = obj;
      model.routeKey = routeKey;
      model.viewTypeMain = 'DETAIL';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/lmtIntBankAcc/lmtIntBankAccIndexDetail',
          key: routeKey,
          // 页签名称
          title: '同业客户批复详情查看',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    }
  }

};
</script>
