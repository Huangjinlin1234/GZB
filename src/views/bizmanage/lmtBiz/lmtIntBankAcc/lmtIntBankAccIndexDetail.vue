
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
      <yu-xform ref="refForm" label-width="200px" v-model="formdata1">
        <yu-xform-group>
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
      <yu-xform ref="refForm" label-width="200px" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="授信总额度 合计（万元）" name="lmtAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
          <yu-xform-item label="授信期限（月）" name="term" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button type="primary" @click="selectFn" style="margin-bottom:10px;">查看</yu-button>
      <yu-xtable ref="refTable" condition-key="condition" row-number :pageable="false" :data-url="accSubUrl" :base-params="accSubParam" request-type="POST">
        <yu-xtable-column label="授信分项流水号" prop="subSerno" align="center"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName" align="center"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtAmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" align="center" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" align="center" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="期限(月)" prop="lmtTerm" align="center"></yu-xtable-column>
        <yu-xtable-column label="是否涉及货币基金" prop="isIvlMf" data-code="STD_ZB_YES_NO" align="center"></yu-xtable-column>
        <yu-xtable-column label="货币基金总授信额度(万元)" prop="lmtMfAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtMfAmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="单只货币基金授信额度(万元)" prop="lmtSingleMfAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtSingleMfAmt) }}</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="goBackFn">返回</yu-button>
    </div>
    <yu-xdialog title="分项批复信息详情" :visible.sync="dialogVisible" width="800px">
      <yu-xform ref="refFormDialog" label-width="140px" :form-type="formType" v-model="formdataDialog">
        <yu-xform-group :column="1">
          <yu-xform-item label="分项额度号" name="accSubNo" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="授信品种编号" name="lmtBizType" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="授信品种名称" name="lmtBizTypeName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="是否循环" name="isRevolv" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
          <yu-xform-item label="授信金额(万元)" name="lmtAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
          <yu-xform-item label="期限（月)" name="lmtTerm" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="是否涉及货币基金" name="isIvlMf" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="货币基金总授信额度(万元)" name="lmtMfAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
          <yu-xform-item label="单只货币基金授信额度(万元)" name="lmtSingleMfAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="canclFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
import { mapState } from "vuex";
import { numFn, numDM } from "@/utils/unitchange";
yufp.lookup.reg(
  "STD_ZB_REPLY_STATUS,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_REPLY_STATUS,STD_ZB_APPR_STATUS"
);

export default {
  components: { YufpDemoSelector, mapState },
  data: function () {
    return {
      dataUrl: "",
      accSubUrl: "",
      formdata: {},
      accSubParam: {},
      dialogVisible: false,
      formdataDialog: {},
      numFn,
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
      _this.data = this.$route.meta.params;
      _this.accNo = _this.data.formdata.accNo;
      //表格反显
      _this.accSubUrl =
        _this.$backend.cmisBiz + "/api/lmtintbankaccsub/selectByAccNo";
      _this.accSubParam = { condition: JSON.stringify({ accNo: _this.accNo }) };
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtintbankacc/selectByAccNo",
        data: JSON.stringify({ accNo: _this.accNo }),
        callback: function (code, message, response) {
          if (code == 0) {
            // 反显字段
            yufp.clone(response.data, _this.formdata);
            yufp.clone(response.data, _this.formdata1);
            _this.formdata.lmtAmt = parseFloat(
              parseFloat(response.data.lmtAmt / 10000).toFixed()
            );
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    /**
    查看分项台账信息
   */
    selectFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      let obj = Object.assign({}, selectionAry[0]);
      obj = numDM(obj, "D");
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        yufp.clone(obj, _this.formdataDialog);
      });
    },
    //弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    /**
      查看申报详情
     */
    selectAppFn: function () {
      var _this = this;
      let model = [];
      model.obj = _this.formdata1;
      model.serno = _this.formdata1.serno;
      model.cusId = _this.formdata1.cusId;
      model.selectType = "Info";
      var routeKey = "templetfactory" + _this.formdata1.serno + "DETAIL";
      model.routeKey = routeKey;
      model.op = "DETAIL";
      // this.$router.addTab({
      //   name: 'bizmanage/lmtBiz/lmtIntBankApp/lmtIntBankAppDetails',
      //   key: routeKey,
      //   title: '查看申报详情',
      //   data: model
      // });
      this.$dialog.open(
        "申报信息详情",
        "bizmanage/lmtBiz/lmtIntBankApp/lmtIntBankAppDetails",
        1200,
        800,
        model,
        (params) => {}
      );
    },
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
  },
};
</script>
<style scoped>
.yu-grpButton {
  margin: 10px 0 !important;
}
</style>
