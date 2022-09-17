<template>
  <div>
    <yu-panel title="授信调查历史" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
        <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
        <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>

        </yu-button-drop>
      </template>
      <yu-button ref="btn_viewWfi" @click="customClick('viewWfi')" type="primary" v-if="checkCtrl('viewWfi')">授信业务审批表</yu-button>
           <yu-button ref="btn_findOne" @click="lookdate" type="primary" v-if="checkCtrl('lookdate1')">查看</yu-button>
          <yu-button ref="btn_handle" @click="customClick('handle')" type="primary" v-if="checkCtrl('handle')">重新办理</yu-button>
      <yu-xtable ref="refTable" row-number  request-type="POST"  condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="params" :default-load="true">
        <yu-xtable-column label="调查流水号" prop="surveySerno" width="170">
         <template slot-scope="scope">
            <a class="underline" @click="findOne(scope.row)">{{ scope.row.surveySerno }}</a>
          </template></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="95"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="获客来源" prop="cusChannel" data-code="STD_CUS_CHANNEL"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" width="100"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="175"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="调查表类型" prop="surveyType" data-code="STD_SURVEY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="replyStatus" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSource" data-code="STD_DATA_SOUR"></yu-xtable-column>
        <yu-xtable-column label="申请时间" prop="createTime">
            <template slot-scope="scope">
            {{ dateFormat(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <!-- <yu-xtable-column label="所属团队" prop="teamType" data-code="STD_TEAM_TYPE"></yu-xtable-column> -->

        <yu-xtable-column label="是否需要线下调查" prop="onlineSurvey" width="100" data-code="STD_ZB_YES_NO" v-if="show"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { dateFormat } from '@/utils';
export default{
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'surveySerno',
      dialogTitle: '新增',
      dateFormat: dateFormat,
      dialogVisible: false,
      // [{997通过},{996自行退出},{992打回},{000待发起},{990取消},{111审批中},{991拿回},{998否决},{993再议}]
      params: { condition: {whData: '997,996,992,990,991,998,993', managerId: this.$store.state.oauth.loginCode}, sort: 'createTime desc'},
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/findlistbymodel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/delete/'
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  mounted () {

  },
  methods: {
    findOne (data) {
      if (data == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      this.nextPage(data);
    },
    lookdate () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      // this.$router.push({name: 'templetfactory', query: {tplId: 'CMG000262'}});
      var data = this.$refs.refTable.selections[0];
      this.nextPage(data);
    },

    // 通用的查看方法
    nextPage (data) {
      // 根据不同类型进入不同界面 弹出不同窗口
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
      } else if (data.surveyType == '12') {
        // 优企贷调查报告
        data['model_group_no'] = 'CMG000273';
      } else if (data.surveyType == '13') {
        // 优享贷
        // 优享贷
        data['op'] = 'VIEW';
        data['PageType'] = '03';
        this.$router.addTab({
          // 路由名称
          name: 'xwmanage/lmtmanage/indgtLMT/yxdmanage/yxdPage', // 菜单路径
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: new Date().getTime(), // 必传
          // key: 'custom_pvpLoanAppPage', // 必传
          // 页签名称
          title: data.surveySerno,
          // 传递的业务数据，可选配置
          data: data
        });
        return;
      } else {
        this.$message({message: '不支持的调查表类型'});
        return;
      }


      // data['model_group_no'] = 'CMG000262';
      data['op'] = 'VIEW';
      data['PageType'] = '01';
      data['serno'] = data.surveySerno;
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'dcbg' + new Date().getTime(),
        title: data.surveySerno,
        data: data,
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    }

  }
};
</script>
