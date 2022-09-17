<template>
  <div>
    <yu-panel title="产品授信批复查询" panel-type="simple">
      <yu-panel title="查询条件" panel-type="simple">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="批复台账编号" ctype="input" placeholder="批复台账编号" name="accNo"></yu-xform-item>
            <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo"></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="批复状态" ctype="select" placeholder="批复状态" data-code="STD_REPLY_STATUS" name="accStatus"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="产品授信批复查询列表" panel-type="simple">
        <yu-button-drop>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="detailFn">查看批复详情</yu-button>
          <yu-button type="primary" v-if="checkCtrl('vreport')" @click="onPrint">查看批复报告</yu-button>
          <yu-button type="primary" v-if="checkCtrl('edit')" @click="onGive">资产编号补录</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" requestType="POST" row-number
                   :pageable="true" :data-url="dataUrl" :base-params="Param" default-load="true" style="margin-top:5px">
          <yu-xtable-column label="批复台账编号" prop="accNo"></yu-xtable-column>
          <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
          <yu-xtable-column label="产品类型" prop="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" exclude-key="4002,4009,4010,4011,4012"></yu-xtable-column>
          <yu-xtable-column label="授信金额(万元)" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="利率" prop="rate">
            <template slot-scope="scope">
              <span>{{ rateFilter(scope.row) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
          <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="批复生效日期" prop="startDate"></yu-xtable-column>
          <yu-xtable-column label="批复到期日期" prop="endDate" ></yu-xtable-column>
          <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_REPLY_STATUS"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
          <yu-xtable-column label="管户人" prop="managerIdName" ></yu-xtable-column>
          <yu-xtable-column label="管户机构" prop="managerBrIdName" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-panel>
    <!-- 资产编号补录弹层 -->
    <yu-xdialog title="资产编号补录" :visible.sync="show_give_dialog" width="800px" height="200px">
      <yu-xform label-width="120px" ref="addForm" :form-type="formType" v-model="giveFormdata" :rules="rules">
        <yu-xform-group :column="2">
          <yu-xform-item label="批复台账编号" ctype="input" placeholder="批复台账编号" name="accNo" disabled></yu-xform-item>
          <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo" disabled></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" disabled></yu-xform-item>
          <yu-xform-item label="资产编号" ctype="input" placeholder="资产编号" name="assetNo"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="doConfirm">确定</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinList from '@/utils/mixins/mixin-list';
import {numFn} from '@/utils/unitchange';
import {assetNoEnter} from '@/views/bizmanage/lmtBiz/util/BizInvestCommonUtil.js';
yufp.lookup.reg('STD_REPLY_STATUS,STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_FINAL_APPR_BR_TYPE');
export default {
  mixins: [mixinList, YufpDemoSelector, assetNoEnter],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtsiginvestacc/selectByModel',
      Param: { condition: JSON.stringify({ oprType: '01', cusCatalog: '3' }) },
      show_give_dialog: false,
      numFn
    };
  },
  methods: {
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
      params.lmtBizType = selectionsAry[0].lmtBizType;
      params.src = _this.$backend.frptRptService + 'zjty-pf09.cpt&serno=' + params.serno + '&cusId=' + params.cusId + '&lmtBizType=' + params.lmtBizType;
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
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
      model.formdata = obj;
      model.viewTypeMain = 'DETAIL';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/lmtSigInvestAcc/lmtSigInvestAccDetail',
          key: 'lmtSigInvestAccDetail',
          // 页签名称
          title: '产品授信批复详情查看',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },
    rateFilter(row){
      let str;
      if(row.lmtBizType == '4001'){
        str = '无';
      }else{
        str = parseFloat(row.rate * 100).toFixed(2) + '%';
      }
      return str;
      // 
    },
  }
};
</script>
