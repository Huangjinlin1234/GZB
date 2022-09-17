
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="集团额度信息" name="base">
        <yu-panel title="集团额度信息" panel-type="simple">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="集团客户编号" ctype="input" name="grpNo" disabled></yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="grpName" disabled></yu-xform-item>
              <yu-xform-item label="用信总余额" ctype="yu-num" name="loanBalance" disabled></yu-xform-item>
              <yu-xform-item label="用信敞口余额" ctype="yu-num" name="loanSpacBalance" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="assSumTable" stripe :pageable="false" :data-url="urls.assSumUrl" :base-params="assParam" request-type="POST">
            <yu-xtable-column prop="name" width="260" style="color:#747B89" align="center"></yu-xtable-column>
            <yu-xtable-column label="不含关联汇总" prop="noAssSum" align="center"></yu-xtable-column>
            <yu-xtable-column label="含关联汇总" prop="assSum" align="center"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="成员授信额度" name="indirect">
        <yu-panel title="成员客户额度列表" panel-type="simple">
          <yu-button-drop>
            <yu-button @click="infoFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="indirectContTable" row-number :data-url="urls.apprCoopBasicUrl" :base-params="indirectParam" :default-load="false" request-type="POST" selection-type="radio">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt">
                <template slot-scope="scope">
                  <span>{{ Currency(parseFloat(scope.row.totalAmt - scope.row.totalUseAmt).toFixed(2)) }}</span>
                </template>
              </yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalSpacUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt">
                <template slot-scope="scope">
                  <span>{{ Currency(parseFloat(scope.row.totalSpacAmt - scope.row.totalSpacUseAmt).toFixed(2)) }}</span>
                </template>
              </yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="并表额度" name="para">
        <yu-panel title="并表额度" panel-type="simple">
          <yu-xtable ref="refTable" row-number :data-url="urls.instuCdeCusLmtUrl" :base-params="instuCdeCusLmtParam" request-type="POST">
            <yu-xtable-column label="所属法人机构" prop="instuCde" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalSpacUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_LMT_MODE,STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_PARTNER_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_INSTU_CDE,STD_ZB_CUR_TYP');

export default {
  mixins: [mixin],
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      ifContShow: false,
      ifAccShow: false,
      ifIndirectShow: false,
      ifIndivDetailShow: false,
      urls: {
        instuCdeCusLmtUrl: '',
        cusLmtContUrl: '',
        cusLmtAccUrl: '',
        apprCoopBasicUrl: '',
        apprCoopSubInfoUrl: '',
        assSumUrl: '',
        dataUrl: '',
        relIndivDetailListUrl: ''
      },
      dataParam: {},
      Param: {},
      indAccParam: {},
      contParam: {},
      accParam: {},
      formdata: {},
      instuCdeCusLmtParam: {},
      relIndivDetailParam: {}// 关联个人授信明细列表查询参数
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
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
      _this.data = this.dataParam;
      _this.viewType = this.data.viewType;
      _this.cusId = this.data.cusId;
      _this.instuCde = this.$xutils.getDefaultformulaData('$LoginInstuCode'); ;
      yufp.clone(_this.data.formdata, _this.formdata);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisLmt + '/api/apprstrmtableinfo/selectGrpStrInfoByList',
        data: { condition: JSON.stringify({ oprType: '01', grpNo: _this.cusId, instuCde: _this.instuCde, cusType: '4' }) },
        callback: function (code, message, response) {
          if (response.data.length == 0 && _this.$route.meta.params) {
            _this.formdata.cusId = _this.$route.meta.params.cusId;
            _this.formdata.cusName = _this.$route.meta.params.borrowerCusName;
            _this.formdata.loanBalance = 0;
            _this.formdata.loanSpacBalance = 0;
          } else {
            yufp.clone(response.data[0], _this.formdata);
          }
        }
      });

      // 成员授信额度
      _this.urls.apprCoopBasicUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/queryGrpMemberLmtInfoList';
      _this.indirectParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde }) };
      // 客户额度汇总二维表
      _this.urls.assSumUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectAssSumByCusId';
      _this.assParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '4' }) };

      if (_this.instuCde == 'C1115632000023') {
        // 并表授信额度
        _this.urls.instuCdeCusLmtUrl =
          backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList';
        _this.instuCdeCusLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, notInstuCde: _this.instuCde, cusType: '4' }) };
      }
    },
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.indirectContTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'apprStrLmtDetail' + selectionsAry[0].cusId;
      model.cusId = selectionsAry[0].cusId;
      model.instuCde = selectionsAry[0].instuCde;
      model.formdata = selectionsAry[0];
      model.routeKey = routeKey;
      model.viewType = 'DETAIL';
      model.callback = _this.getReturn;
      if (selectionsAry[0].cusType == '2') {
        _this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: 'zrcbank/lmt/apprStrLmt/apprStrLmtDetail/apprStrLmtDetail',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: routeKey,
            // 页签名称
            title: '法人客户额度视图详情',
            // 传递的业务数据，可选配置
            data: model
          });
        });
      } else if (selectionsAry[0].cusType == '1') {
        _this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: 'zrcbank/lmt/apprStrLmt/apprStrLmtDetailIndiv/apprStrLmtDetailIndiv',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: routeKey,
            // 页签名称
            title: '个人客户额度视图详情',
            // 传递的业务数据，可选配置
            data: model
          });
        });
      }
    }
  }
};
</script>
