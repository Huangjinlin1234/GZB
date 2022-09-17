<template>
  <div>
    <yu-panel title="授信调查首页" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop :show-length="7"></yu-button-drop>
      </template>
       <yu-button ref="btn_doAdd" @click="customClick('doAdd')" type="primary" v-if="checkCtrl('doAdd')">新增</yu-button>
        <yu-button ref="btn_update" @click="update" type="primary" v-if="checkCtrl('update')">授信及调查信息录入</yu-button>
          <yu-button ref="btn_delete" @click="customClick('delete')" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
          <yu-button ref="btn_Submit" @click="customClick('Submit')" type="primary" v-if="checkCtrl('Submit')">提交审批</yu-button>
             <yu-button ref="btn_lookdate" @click="lookdate" type="primary" v-if="checkCtrl('lookdate')">查看</yu-button>
          <yu-button ref="btn_printTable" @click="customClick('printTable')" type="primary" v-if="checkCtrl('printTable')">打印优惠利率审批表</yu-button>
          <yu-button ref="btn_printReport" @click="customClick('printReport')" type="primary" v-if="checkCtrl('printReport')">打印调查报告</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition"  request-type="POST"  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl"  :base-params="params" :default-load="true">
        <yu-xtable-column label="调查流水号" prop="surveySerno" width="170"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="获客来源" prop="cusChannel" data-code="STD_CUS_CHANNEL"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" width="100"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="175"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="调查表类型" prop="surveyType" data-code="STD_SURVEY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="模型审批结果" prop="modelRstStatus" data-code="STD_JD_MODEL_STATUS"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSource" data-code="STD_DATA_SOUR"></yu-xtable-column>
        <yu-xtable-column label="申请时间" prop="createTime">
            <template slot-scope="scope">
            {{ dateFormat(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId" v-if="show" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <!-- <yu-xtable-column label="所属团队" prop="teamType" data-code="STD_TEAM_TYPE"></yu-xtable-column> -->
        <yu-xtable-column label="批复状态" prop="lmtStatus" width="100" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="是否需要线下调查" prop="onlineSurvey" width="100" data-code="STD_ZB_YES_NO" v-if="show"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup, dateFormat } from '@/utils';

lookup.reg('STD_DATA_SOUR,STD_ZB_YES_NO,BELG_TEAM,STD_ZB_APPR_STATUS,STD_SURVEY_TYPE,STD_COMMON_DEBIT_CORRE,STD_JD_MODEL_STATUS,STD_CUS_CHANNEL');

export default {
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'surveySerno',
      dialogTitle: '新增',
      // [{997通过},{996自行退出},{992打回},{000待发起},{990取消},{111审批中},{991拿回},{998否决},{993再议}]
      params: {
        condition: {
          whData: '000,111,992',
          managerId: this.$store.state.oauth.loginCode,
          oprType: '01'
        },
        sort: 'createTime desc'
      },
      dateFormat: dateFormat,
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/findlistbymodel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/delete/',
      name: ''
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  mounted () {
    // this.afterInit();
  },
  methods: {
    update () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      var data = this.$refs.refTable.selections[0];
      if (data.approveStatus != '000' && data.approveStatus != '992') {
        this.$message({message: '只能对审批状态为待发起或退回的申请录入授信及调查信息', type: 'warning'});
        return;
      }
      if (data.managerId != this.$store.state.oauth.loginCode) {
        this.$message({message: '只能对责任人是自己的申请录入授信及调查信息', type: 'warning'});
        return;
      }
      data.PageType = '03';
      this.nextPage(data);
    },
    lookdate () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      // this.$router.push({name: 'templetfactory', query: {tplId: 'CMG000262'}});
      var data = this.$refs.refTable.selections[0];
      data.PageType = '01';
      this.nextPage(data);
    },
    // 通用的进入页面方法
    nextPage (data) {
      if (data.surveyType == '11') {
        // 惠享贷调查报告
        data['model_group_no'] = 'CMG000262';
      } else if (data.surveyType == '10') {
        // 增享贷调查报告
        data['model_group_no'] = 'CMG000292';
      } else if (data.surveyType == '9') {
        // 优抵贷尽职调查报告
        data['model_group_no'] = 'CMG000360';
      } else if (data.surveyType == '15') {
        // 优抵贷税务调查报告
        data['model_group_no'] = 'CMG000355';
      } else if (data.surveyType == '7') {
        // 无还本普转调查报告
        data['model_group_no'] = 'CMG000271';
      } else if (data.surveyType == '14') {
        // 无还本优转调查报告
        data['model_group_no'] = 'CMG000301';
        data['nodeflag'] = '0';
      } else if (data.surveyType == '12') {
        // 优企贷调查报告
        data['model_group_no'] = 'CMG000273';
      } else if (data.surveyType == '13') {
        // 优享贷
        data['op'] = 'VIEW';
        this.$router.addTab({
          // 路由名称
          name: 'xwmanage/lmtmanage/indgtLMT/yxdmanage/yxdPage', // 菜单路径
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'dcbg' + new Date().getTime(), // 必传
          // key: 'custom_pvpLoanAppPage', // 必传
          // 页签名称
          title: '信息录入',
          // 传递的业务数据，可选配置
          data: data
        });
        return;
      } else {
        this.$message({message: '不支持的调查表类型'});
        return;
      }
      data['op'] = 'VIEW';
      data['serno'] = data.surveySerno;
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'dcbg' + new Date().getTime(),
        title: '信息录入',
        data: data,
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    }
  }
};
</script>
