
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="批复基本信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="180px" v-model="formdata">
        <yu-xform-group :clomn="2">
          <yu-xform-item label="批复编号" name="replySerno" ctype="input" colspan="10" disabled></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
            <yu-button type="primary" @click="selectAppFn">查看申报详情</yu-button>
          </yu-xform-item>
          <yu-xform-item label="批复生效日期" name="startDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="审批结论" name="apprResult" ctype="select" data-code="STD_ZB_APPR_STATUS" disabled></yu-xform-item>
          <yu-xform-item label="批复状态" name="accStatus" ctype="select" data-code="STD_REPLY_STATUS" disabled></yu-xform-item>
          <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrIdName" type="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="授信额度情况" panel-type="simple">
      <yu-xform ref="refForm1" label-width="180px" v-model="formdata1">
        <yu-xform-group :clomn="2">
          <yu-xform-item label="项目名称" name="proName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="产品类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="授信总额度 合计（万元）" name="lmtAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
          <yu-xform-item label="授信期限（月）" name="lmtTerm" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="利率(%)" name="rate" ctype="yu-num" sign="%" :multiple="100" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>

    <yu-panel title="其他批复要求" panel-type="simple">
      <yu-xtable ref="refTable" row-number :pageable="false" :data-url="accLoanCondUrl" :base-params="accLoanCondParam" request-type="POST">
        <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="goBackFn">返回</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg(
  'STD_REPLY_STATUS,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_ZB_PRO_LMT_TYPE,STD_ZB_APPR_STATUS,STD_ZB_PRD_BIZ_TYPE'
);

export default {
  components: { YufpDemoSelector, mapState },
  data: function () {
    return {
      dataUrl: '',
      formdata: {},
      formdata1: {},
      accLoanCondUrl: '',
      accLoanCondParam: {}
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
    yufp.lookup.bind('STD_ZB_APPR_STATUS', function (data) {
      console.log('=================lookup', data);
    });
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.$route.meta.params;
      _this.accNo = _this.data.formdata.accNo;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestacc/selectByModel',
        data: {
          condition: JSON.stringify({ accNo: _this.accNo, oprType: '01' })
        },
        callback: function (code, message, response) {
          if (code == 0) {
            // 反显字段
            yufp.clone(response.data[0], _this.formdata);
            yufp.clone(response.data[0], _this.formdata1);
            if (_this.formdata1.lmtAmt) {
              _this.formdata1.lmtAmt = parseFloat(
                parseFloat(response.data[0].lmtAmt / 10000).toFixed(6)
              );
            }
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
      // 表格反显
      _this.accLoanCondUrl =
        _this.$backend.cmisBiz + '/api/lmtreplyaccloancond/selectByModel';
      _this.accLoanCondParam = {
        condition: JSON.stringify({ accNo: _this.accNo, condType: '01' })
      };
    },
    /**
      查看申报详情
     */
    selectAppFn: function () {
      var _this = this;
      let model = {};
      model = _this.formdata;
      // model.serno = _this.formdata1.serno;
      // model.cusId = _this.formdata1.cusId;
      // model.selectType = 'Info';
      var routeKey = 'templetfactory' + _this.formdata.serno + 'DETAIL';
      model.routeKey = routeKey;
      model.op = 'look';
      // this.$router.addTab({
      //   name: 'bizmanage/lmtBiz/lmtIntBankApp/lmtIntBankAppDetails',
      //   key: routeKey,
      //   title: '查看申报详情',
      //   data: model
      // });
      console.log('=================', model);
      this.$dialog.open(
        '申报信息详情',
        'bizmanage/lmtBiz/subjectCredit/subjectCreditDetails',
        1200,
        800,
        model,
        (params) => {}
      );
    },
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
