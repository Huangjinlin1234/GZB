<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="授信基本信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="100px" v-model="formReport">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="审批模式" name="apprMode" ctype="select" data-code="STD_APPR_MODE" disabled></yu-xform-item>
          <yu-xform-item label="终审机构" name="finalApprBrType" ctype="select" data-code="STD_FINAL_APPR_BR_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="发起人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="投资机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <div v-show="showBuild==3||showBuild==4">
            <yu-xform-item label="项目名称" name="proName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="项目总金额" name="intendActualIssuedScale" ctype="input" disabled></yu-xform-item>
          </div>
          <div v-show="showBuild==3">
            <yu-xform-item label="底层资产类型" name="basicAssetType" ctype="select" data-code="STD_ZB_BOTT_TYPE" disabled></yu-xform-item>
          </div>
          <div v-show="showBuild==4">
            <yu-xform-item label="计划类型" name="assetManaPrdType" ctype="select" data-code="STD_ZB_ASSET_MANA_PRD_TYP" disabled></yu-xform-item>
          </div>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="授信额度情况" panel-type="simple">
      <yu-button type="primary" v-show="saveBtnShow" @click="updateApprSubFn">修改</yu-button>
      <yu-button type="primary" @click="selectApprSubFn">查看</yu-button>
      <yu-xtable ref="refTable" condition-key="condition" row-number :pageable="false" :data="data">
        <yu-xtable-column label="申请流水号" prop="serno" align="center"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="lmtBizType" align="center" data-code="STD_ZB_PRD_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="授信金额(万元)" prop="lmtAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtAmt) }}</span>
          </template>
        </yu-xtable-column>
        <!-- <div v-show="showBuild==2">
          <yu-xtable-column label="其中，自营额度(万元)" prop="sobsAmt" align="center">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.sobsAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="其中，资管额度(万元)" prop="assetManaAmt" align="center">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.assetManaAmt) }}</span>
            </template>
          </yu-xtable-column>
        </div> -->
        <yu-xtable-column label="授信期限（月）" prop="lmtTerm" align="center"></yu-xtable-column>
        <yu-xtable-column label="利率" prop="rate" align="center">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.rate * 100).toFixed(2)) }}%</span>
          </template>
        </yu-xtable-column>
        <div v-show="showBuild!=3">
          <yu-xtable-column label="担保方式" prop="guarTypeName" align="center"></yu-xtable-column>
        </div>
        <yu-xtable-column label="是否循环" prop="isRevolv" align="center" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="授信额度情况" :visible.sync="dialogVisible" width="1000px">
      <yu-xform ref="refFormDialog" label-width="140px" v-model="formdataDialog">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="授信品种" name="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" ctype="select" disabled></yu-xform-item>
          <yu-xform-item label="授信金额((万元))" name="lmtAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          <!-- <div v-show="showBuild==2">
            <yu-xform-item label="其中，自营额度(万元)" name="sobsAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="其中，资管额度(万元)" name="assetManaAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          </div> -->
          <yu-xform-item label="授信期限（月）" ctype="input" rules="number" name="lmtTerm" :disabled="formDisabled"></yu-xform-item>
          <yu-xform-item label="利率" name="rate" ctype="yu-num" sign="%" :multiple="100" :disabled="formDisabled"></yu-xform-item>
          <div v-show="showBuild!=3">
            <yu-xform-item label="担保方式" name="guarTypeName" ctype="input" disabled></yu-xform-item>
          </div>
          <yu-xform-item label="是否循环额度" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveBtn">保存</yu-button>
          <yu-button type="primary" @click="canclFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

    <yu-panel v-show="showBuild==3||showBuild==4" title="基础资产情况" panel-type="simple">
      <yu-button type="primary" @click="doPrint" hidden="true">查看批复报告</yu-button>
      <yu-xtable ref="refTableBasic" condition-key="condition" row-number :pageable="false" :data-url="basicUrl" :base-params="basicParam" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="basicSerno" align="center"></yu-xtable-column>
        <yu-xtable-column label="底层融资人名称" prop="basicCusName" align="center" ></yu-xtable-column>
        <yu-xtable-column label="底层融资客户编号" prop="basicCusId" align="center"></yu-xtable-column>
        <yu-xtable-column label="基础资产类型" prop="basicAssetType" align="center" data-code="STD_ZB_BOTT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="投资产品名称" prop="basicLmtBizTypeName" align="center"></yu-xtable-column>
        <yu-xtable-column label="底层资产金额" prop="basicAssetBalanceAmt" align="center" ></yu-xtable-column>
        <yu-xtable-column label="我行授信额度" prop="lmtAmt" align="center" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="审批意见" panel-type="simple">
      <yu-panel title="其他要求" panel-type="simple">
        <yu-button-drop v-show="saveBtnShow" :show-length="8">
          <yu-button type="primary" @click="addLoanCond">添加</yu-button>
          <yu-button type="primary" @click="deleteLoanCond">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable1" condition-key="condition" row-number :pageable="false" :data-url="apprLoanUrl" :base-params="apprLoanParam" request-type="POST">
          <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-panel>
    <yu-xdialog title="其他要求" :visible.sync="dialogLoanCond" width="1000px">
      <yu-xform ref="refFormLoanCond" label-width="100px" v-model="formdataLoanCond">
        <yu-xform-group>
          <yu-xform-item label="具体内容" name="condDesc" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveLoanBtn">保存</yu-button>
          <yu-button type="primary" @click="canclLoanFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="doPrint('self')">查看批复报告</yu-button>
      <yu-button type="primary" @click="goBackFn">返回</yu-button>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import {numFn, approveProcess} from "@/utils/unitchange";
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_YES_NO,STD_APPR_MODE,STD_FINAL_APPR_BR_TYPE,STD_ZB_BOTT_TYPE,STD_ZB_ASSET_MANA_PRD_TYP');
export default {
  components: { YufpDemoSelector },
  mixins: [approveProcess],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      numFn,
    };
  },
  mounted () {
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestappr/selectBySerno',
        data: {
          condition: JSON.stringify({
            serno: _this.pageParams.serno,
            oprType: '01',
            issueReportType: '03'

          }),
          sort: 'createTime desc'
        },
        callback: function (code, message, response) {
          if (code == 0) {
            // 反显字段
            yufp.clone(response.data.lmtSigInvestAppr, _this.formReport);
            _this.approveSerno = response.data.lmtSigInvestAppr.approveSerno;
            // 表格反显
            response.data.lmtSigInvestAppr.guarTypeName = response.data.guarTypeName;
            _this.data = [];
            _this.data.push(response.data.lmtSigInvestAppr);
            if(_this.showBuild == 3 || _this.showBuild == 4){
              // 底层资产情况
              _this.basicUrl =
                _this.$backend.cmisBiz +
                '/api/lmtsiginvestbasiclmtappr/selectbasic';
              _this.basicParam = {
                condition: JSON.stringify({
                  approveSerno: _this.approveSerno,
                  oprType: '01'
                })
              };
            }

            _this.apprLoanUrl =
              _this.$backend.cmisBiz +
              '/api/lmtapprloancond/selectByQueryModel';
            _this.apprLoanParam = {
              condition: JSON.stringify({
                approveSerno: _this.approveSerno,
                condType: '01'
              })
            };
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
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 打印
    onPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
      params.src = _this.$backend.frptRptService + 'zjty-npf09.cpt&serno=' +
        params.serno + '&cusId=' + params.cusId + '&lmtBizType=' + _this.pageParams.lmtBizType;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 打印
    doPrint: function (type) {
      const params = {};
      if(type == 'self'){
        params.serno = this.formReport.serno;
        params.cusId = this.formReport.cusId;
      }else{
        // 获取选中的数据
        let jsoPar = this.$refs.refTableBasic.selections;
        if (jsoPar.length != 1) {
          this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
          return;
        }
        params.serno = jsoPar[0].serno;
        params.cusId = jsoPar[0].cusId;
      }

      let strPrint;
      if(this.showBuild == 1 || this.showBuild == 2){
        strPrint = 'zjty-npf09.cpt&serno=';
      }else if(this.showBuild == 3){
        strPrint = 'zjty-npf10.cpt&serno=';
      }else if(this.showBuild == 4){
        strPrint = 'zjty-npf12.cpt&serno=';
      }
      params.src =
        this.$backend.frptRptService + strPrint +
        params.serno + '&cusId=' + params.cusId + '&lmtBizType=' + this.pageParams.lmtBizType;
      this.$emit('doPrint', params);
    }
  }
};
</script>
