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
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" name="lmtType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发起人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="投资机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="授信额度情况" panel-type="simple">
      <yu-button v-if="saveBtnShow" @click="updateApprSubFn" type="primary">修改</yu-button>
      <yu-button @click="selectApprSubFn" type="primary">查看</yu-button>
      <yu-xtable ref="refTable" condition-key="condition" row-number :pageable="false" :data-url="dataUrl" :base-params="dataParam" request-type="POST">
        <yu-xtable-column label="授信分项流水号" prop="subSerno" align="left"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="lmtBizTypeName" align="center"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolv" align="center" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="授信金额(万元)" prop="lmtAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtAmt) }}</span>
          </template>
        </yu-xtable-column>
        <!-- <yu-xtable-column label="其中，货币基金额度(万元)" prop="lmtMfAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtMfAmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="其中，单只货币基金额度(万元)" prop="lmtSingleMfAmt" align="center">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtSingleMfAmt) }}</span>
          </template>
        </yu-xtable-column> -->
        <yu-xtable-column label="授信期限（月）" prop="lmtTerm" align="center"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="授信额度详情" :visible.sync="dialogVisible" width="1000px">
      <yu-xform ref="refFormDialog" label-width="100px" v-model="formdataDialog">
        <yu-xform-group :column="2">
          <yu-xform-item label="授信分项流水号" name="subSerno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="授信品种" name="lmtBizTypeName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="是否循环额度" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="授信金额(万元)" name="lmtAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          <!-- <yu-xform-item label="其中，货币基金额度（万元）" name="lmtMfAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          <yu-xform-item label="其中，单只货币基金额度（万元）" name="lmtSingleMfAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item> -->
          <yu-xform-item label="授信期限（月）" ctype="input" rules="number" name="lmtTerm" :disabled="formDisabled"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveBtn('intBank')">保存</yu-button>
          <yu-button  type="primary" @click="canclFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-panel title="审批意见" panel-type="simple">
      <yu-panel title="其他要求" panel-type="simple">
        <yu-button-drop v-if="saveBtnShow" :show-length="8">
          <yu-button @click="addLoanCond" type="primary">添加</yu-button>
          <yu-button @click="deleteLoanCond" type="primary">删除</yu-button>
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
      <yu-button type="primary" @click="doPrint">查看批复报告</yu-button>
      <yu-button type="primary" @click="goBackFn">返回</yu-button>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import {numFn, approveProcess} from '@/utils/unitchange';
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_YES_NO');
export default {
  components: { YufpDemoSelector },
  mixins: [approveProcess],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      numFn
    };
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtintbankappr/selectBySerno',
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
            let obj = response.data;
            yufp.clone(obj, _this.formReport);
            _this.approveSerno = response.data.approveSerno;
            // 表格反显
            _this.dataUrl =
              _this.$backend.cmisBiz +
              '/api/lmtintbankapprsub/selectByApproveSerno';
            _this.dataParam = {
              condition: JSON.stringify({
                approveSerno: _this.approveSerno,
                oprType: '01'
              })
            };
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
      params.src = _this.$backend.frptRptService +
        'zjty-npf11.cpt&serno=' +
        params.serno +
        '&cusId=' +
        params.cusId;
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
    doPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      params.src =
        _this.$backend.frptRptService +
        'zjty-npf11.cpt&serno=' +
        params.serno +
        '&cusId=' +
        params.cusId;
      this.$emit('doPrint', params);
    }
  }
};
</script>
