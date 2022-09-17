<template>
  <div>
    <yu-panel title="人行征信查询申请列表" :collapseHide="false">
      <template slot="right">
        <yu-button-drop style="padding: 0" :show-length="6">
          <!-- <yu-button type="primary" ref="btn_doImport" v-if="type!='VIEW'" @click="doImport">引入</yu-button> -->
          <yu-button type="primary" ref="btn_doInsect" v-if="type!='VIEW'" @click="customClick('doInsect')" >新增</yu-button>
          <yu-button type="primary" ref="btn_doUpdate" v-if="type!='VIEW'" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_doView" v-if="!isManagerId" @click="customClick('doView')">查看</yu-button>
          <yu-button type="primary" ref="btn_doDelete" v-if="type!='VIEW'" @click="customClick('doDelete')">删除</yu-button>
          <!-- <yu-button type="primary" ref="btn_doReportViewRecord" v-if="!isManagerId" @click="customClick('doReportViewRecord')">征信报告查看记录</yu-button> -->
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST" :base-params="Param">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="查询对象名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="征信查询类别" prop="qryCls" :options="dicOptions.qryClsOptions"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="与主借款人关系" prop="borrowRel" :options="dicOptions.borrowRelOptions"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="发起查询时间" prop="sendTime"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <!-- <yu-xtable-column label="有无报告">
          <template slot-scope="scope">
            <span>{{ scope.row.creditUrl ? '有' : '无' }}</span>
          </template>
        </yu-xtable-column> !-->
        <yu-xtable-column label="有无报告">
          <template slot-scope="scope">
            <span>{{ scope.row.reportCreateTime ? '有' : '无' }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
        <!-- <yu-xtable-column label="操作" prop="operateCredit" width="215">
          <template slot-scope="scope">
            <yu-button-drop class="btn">
              <yu-button size="small" type="primary" v-if="!type" @click="doApply(scope.$index, scope.row)">发起申请</yu-button>
              <yu-button size="small" type="primary" @click="doCreditReportView(scope.$index, scope.row)">查看报告</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
    <div>
      <yu-xdialog title="客户选择" :visible.sync="dialogTableVisible" width="1500px" height="800px" center="true">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="dialogtable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" fuzzy-query="both" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号" ctype="input" placeholder="证件号" fuzzy-query="both" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div class="button-group" style="text-align:left">
          <yu-button type="primary" @click="selectReturn">选取返回</yu-button>
          <yu-button type="primary" @click="cancel">关闭</yu-button>
        </div>
        <yu-xtable ref="dialogtable" row-number condition-key="condition" :baseParams="baseParamsCred" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dialogDataUrl" request-type="POST">
            <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="证件号" prop="certCode"></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop="managerIdName" ></yu-xtable-column>
            <yu-xtable-column label="所在机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="报告来源">
              <template slot-scope="scope">
                <span >{{ scope.row.qryCls == '3' ? '本地' : '人行' }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
        </yu-xtable>
      </yu-xdialog>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_IS_HAVE_CHILDREN');
export default{
  props: {
    bizPageData: Object
  },
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cqbrSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '02', value: '贷款审批'}, {key: '08', value: '担保资格审查'}, {key: '22', value: '法人代表，出资人及关联人等资信查询'}, {key: '25', value: '资信审查'}, {key: '27', value: '贷后管理'}, {key: '17', value: '额度审批'}, {key: '01', value: '贷前审查'}, {key: '04', value: '其他原因'}, {key: '05', value: '关联查询'}, {key: '18', value: '担保审查'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}, {key: '003', value: '关联人'}], sceneOptions: [{key: '01', value: '授信'}, {key: '02', value: '贷后'}, {key: '03', value: '对私贷后'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      Param: {},
      // Param: { condition: JSON.stringify({ bizSerno: "CRE2021051700000329"}) },
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/selectCreditInfoByCrqlSerno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/',
      isManagerId: false,
      type: '',
      dialogDataUrl: backend.cmisBiz + '/api/creditreportqrylst/importcreditreportlist',
      dialogTableVisible: false,
      baseParamsCred: {},
      importSerno: '' // 引入是需要流水号
    };
  },
  mounted () {
    let params = {};
    let bizScene = 'CRE01';
    if (this.getFactory().contextData) {
    //   if (this.getFactory().contextData.biz_serno) {
    //     params['bizSerno'] = this.getFactory().contextData.biz_serno;
    //   } else if (this.getFactory().contextData.iqpSerno) {
    //     params['bizSerno'] = this.getFactory().contextData.iqpSerno;
    //   } else if (this.getFactory().contextData.grpSerno) {
    //     params['bizSerno'] = this.getFactory().contextData.grpSerno;
    //   } else if (this.getFactory().contextData.bizGrpSerno) {
    //     params['bizSerno'] = this.getFactory().contextData.bizGrpSerno;
    //   } else if (this.getFactory().contextData.pvpSerno) {
    //     params['bizSerno'] = this.getFactory().contextData.pvpSerno;
    //   } else if (this.getFactory().contextData.instanceInfo) {
    //     params['bizSerno'] = this.getFactory().contextData.instanceInfo.bizId;
    //     this.type = 'VIEW'
    //   }
      if (this.getFactory().contextData.instanceInfo) {
        params['bizSerno'] = this.getFactory().contextData.instanceInfo.bizId;
        this.type = 'VIEW';
      }
      if (this.getFactory().contextData.flowParam) {
        let obj = this.getFactory().contextData.flowParam;
        if (obj.model_group_no && obj.model_group_no === 'CMG000150') {
          bizScene = 'CRE01'; // 单一客户授信通用审批
          params['period'] = '01'; // 01:授信管理
        } else if (obj.model_group_no && (obj.model_group_no === 'CMG000243' || obj.model_group_no === 'CMG000334' || obj.model_group_no === 'CMG000407' || obj.model_group_no === 'CMG000007')) {
          bizScene = 'CRE04'; // 合同申请
          params['period'] = '02'; // 02:合同签订
        } else if (obj.model_group_no && obj.model_group_no === 'CMG000153') {
          this.$nextTick(() => {
            // this.Param = {condition: JSON.stringify({grpSerno: params.bizSerno})};
            // this.dataUrl = this.$backend.cmisBiz + '/api/creditreportqrylst/getGrpCusRelation';
            this.initGrpcCredit(params);
          });
        } else if (obj.model_group_no && (obj.model_group_no === 'CMG000608' || obj.model_group_no === 'CMG000649' || obj.model_group_no === 'CMG000656')) { // 609贷款出账申请  608银承出账申请  656委托贷款出账申请
          bizScene = 'CRE05'; // 出账申请
          params['period'] = '03'; // 03:出账放款
        } else if (obj.model_group_no && obj.model_group_no === 'CMG000425') {
          bizScene = 'CRE06'; // 展期申请
        } else if (obj.model_group_no && obj.model_type && obj.model_type === 'postLoanManage') {
          bizScene = 'CRE10'; // 投贷后管理 taskNo-对公定期检查 coopAgrSerno-个人消费性定期检查、个人经营性定期检查、
          params['period'] = '04'; // 04:贷后检查
        } else if (obj.model_group_no && this.$route.meta.params.model_group_no === 'IQP_LOAN_APP_LS') {
          bizScene = 'CRE12'; // 零售业务修改
        } else if (obj.model_group_no && this.$route.meta.params.model_group_no === 'CMG000022') {
          bizScene = 'CRE13'; // 零售合同申请
        }
      }
    //   if (this.getFactory().contextData.period) {
    //     params['period'] = this.getFactory().contextData.period;
    //   } else {
    //     params['period'] = '01';
    //   }
    //   if (this.getFactory().contextData.bizType) {
    //     params['bizType'] = this.getFactory().contextData.bizType;
    //   }
    }

    if (this.$route.meta.params) {
      params['bizSerno'] = this.$route.meta.params.serno;
      params['period'] = '01'; // 01:授信管理 02:合同签订 03:出账放款 04:贷后检查 初始化为01
      if (this.$route.meta.params.model_group_no === 'CMG000702') { // 单一授信申报
        this.type = this.$route.meta.params.op === 'VIEW';
      } else if (this.$route.meta.params.model_group_no === 'CMG000334' || this.$route.meta.params.model_group_no === 'CMG000407' || this.$route.meta.params.model_group_no === 'CMG000007') { // 334最高授信协议申请 407贸易融合 007福费廷
        bizScene = 'CRE04'; // 合同申请
        params['bizSerno'] = this.$route.meta.params.biz_serno;
        params['period'] = '02'; // 02:合同签订
      } else if (this.$route.meta.params.model_group_no === 'CMG000153') { // 集团授信申报 单独的查询接口
        // this.type = 'VIEW';
        this.type = this.$route.meta.params.op === 'VIEW';
        this.$nextTick(() => {
          // this.Param = {condition: JSON.stringify({grpSerno: params.bizSerno})};
          // this.dataUrl = this.$backend.cmisBiz + '/api/creditreportqrylst/getGrpCusRelation';
          this.initGrpcCredit(params);
        });
      } else if (this.$route.meta.params.model_group_no === 'CMG000243') { // 普通贷款合同申请
        bizScene = 'CRE04'; // 合同申请
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
      } else if (this.$route.meta.params.model_group_no === 'CMG000608' || this.$route.meta.params.model_group_no === 'CMG000649' || this.$route.meta.params.model_group_no === 'CMG000656') { // 609贷款出账申请  608银承出账申请  656委托贷款出账申请
        params['bizSerno'] = this.$route.meta.params.pvpSerno;
        bizScene = 'CRE05'; // 出账申请
        params['period'] = '03'; // 03:出账放款
      } else if (this.$route.meta.params.model_group_no === 'CMG000425') {
        bizScene = 'CRE06'; // 展期申请
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
      } else if (this.$route.meta.params.model_type && this.$route.meta.params.model_type === 'postLoanManage') {
        bizScene = 'CRE10'; // 投贷后管理 taskNo-对公定期检查 coopAgrSerno-个人消费性定期检查、个人经营性定期检查
        params['bizSerno'] = this.$route.meta.params.taskNo || this.$route.meta.params.coopAgrSerno;
        params['period'] = '04'; // 04:贷后检查
      } else if (this.$route.meta.params.model_group_no === 'IQP_LOAN_APP_LS') {
        bizScene = 'CRE12'; // 零售业务修改
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
      } else if (this.$route.meta.params.model_group_no === 'CMG000022') {
        bizScene = 'CRE13'; // 零售合同申请
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
      } else if (this.$route.meta.params.model_group_no === 'CMG000411') {
        params['bizSerno'] = this.$route.meta.params.biz_serno;
      }
      if (this.$route.meta.params.bizType) {
        params['bizType'] = this.$route.meta.params.bizType;
      }
      // 合作方
      // if (this.$route.meta.params.serno) {
      //   params['bizSerno'] = this.$route.meta.params.serno;
      //   if (this.$route.meta.params.op == 'details') {
      //     this.type = 'VIEW'
      //   }
      // } else if (this.$route.meta.params.coopAgrSerno) {
      //   params['bizSerno'] = this.$route.meta.params.coopAgrSerno;
      //   params['period'] = '04';
      //   if (this.$route.meta.params.op == 'details') {
      //     this.type = 'VIEW'
      //   }
      // }
      if (this.$route.meta.params.op == 'details') {
        this.type = 'VIEW';
      }
      // 小微用 2021年7月9日10:06:00  wh
      if (this.$route.meta.params.PageType == '01') {
        this.type = 'VIEW';
      }
      // 判断是否是集团客户进入
      if (this.$route.meta.params.model_group_no) {
        // 集团授信进入 模板工厂编号 处理
        if (this.$route.meta.params.model_group_no == 'CMG000536' || this.$route.meta.params.model_group_no == 'CMG000537' || this.$route.meta.params.model_group_no == 'CMG000153') {
          // params.bizSerno = '';
          // params.bizGrpSerno = this.$route.meta.params.grpSerno;
          params.bizSerno = this.$route.meta.params.grpSerno;
          params.period = '01';
        }
      }
    }

    if (this.bizPageData.iqpSerno) {
      params['bizSerno'] = this.bizPageData.iqpSerno;
      params['period'] = '01';
      this.type = this.bizPageData.isView ? 'VIEW' : '';
    }

    const bizPageData = this.bizPageData || {};
    const instanceInfo = bizPageData.instanceInfo;
    if (instanceInfo && (instanceInfo.bizType == 'HZ001' || instanceInfo.bizType == 'HZ002' || instanceInfo.bizType == 'HZ003' || instanceInfo.bizType == 'HZ004' || instanceInfo.bizType == 'HZ005' || instanceInfo.bizType == 'HZ006' || instanceInfo.bizType == 'HZ007' || instanceInfo.bizType == 'HZ008' || instanceInfo.bizType == 'HZ018' || instanceInfo.bizType == 'HZ019')) {
      params['bizSerno'] = instanceInfo.bizId;
      this.type = 'VIEW';
    }
    this.importSerno = params['bizSerno'];
    this.Param = { condition: JSON.stringify(params), sort: 'isnull(approve_status),field(approve_status,000,992,111,997,993,996,998,991),if(isnull(report_create_time),0,1),report_create_time desc' };
    let setTime = this.$route.meta.params.model_type && this.$route.meta.params.model_type === 'postLoanManage' ? 2000 : 3000;
    setTimeout(() => {
      const data = this.$refs.refTable.tabledata;
      if (data.length == 0 && ((this.$route.meta.params.model_group_no && (this.$route.meta.params.model_group_no !== 'CMG000153' || this.$route.meta.params.model_group_no !== 'CMG000411')) || (this.$route.meta.params.model_type && this.$route.meta.params.model_type === 'postLoanManage'))) { // 非集团授信场景
        let _this = this;
        let model = {};
        model.serno = params.bizSerno;
        model.bizScene = bizScene;
        model.period = params.period; // 01:授信管理 02:合同签订 03:出账放款 04:贷后检查
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/creditreportqrylst/initCreditByScene',
          data: JSON.stringify(model),
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$refs.refTable.remoteData();
            } else {
              _this.$message({ message: response.message, type: 'error' });
            }
          }
        });
      }
    }, setTime);
  },
  methods: {
    doApply (index, params) {
      var _this = this;
      if (params.approveStatus != '000' && params.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许发起申请。');
        return;
      }

      if (params.qryCls == '0') {
        params['model_group_no'] = 'CMG000361';
        params['op'] = 'VIEW';
        params['op_type'] = 'view';
        params['creditRela'] = 'creditRela';
        params['isBorrowRel'] = 'isBorrowRel';

        this.$dialog.open(
          '修改（人行个人征信查询）',
          'creditmanage/creditRH/creditReportQryRecordListRHGRUpdateIndex',
          -1,
          -1,
          params,
          (rtData) => {
            if (rtData == 'success') {
              _this.$refs.refTable.remoteData();
            }
          }
        );
      }

      if (params.qryCls == '1') {
        params['creditRela'] = 'creditRela';
        params['isBorrowRel'] = 'isBorrowRel';
        this.$dialog.open(
          '修改（人行企业征信查询）',
          'creditmanage/creditRH/creditReportQryRecordListRHQYUpdateIndex',
          -1,
          -1,
          params,
          (rtData) => {
            if (rtData == 'success') {
              _this.$refs.refTable.remoteData();
            }
          }
        );
      }
    },

    doCreditReportView (index, params) {
      if (params.approveStatus == '997' && (params.creditUrl == null || params.creditUrl == '')) {
        this.$xutils.showMsgBox('提示', '征信中心无信用信息');
        return;
      }

      if (params.creditUrl == null || params.creditUrl == '') {
        this.$xutils.showMsgBox('提示', '暂未生成征信报告');
        return;
      }

      var _this = this;
      // 校验是否可查看征信报告
      yufp.service.request({
        method: 'POST',
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/checkoutreport',
        data: JSON.stringify(params),
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data) {
              _this.reportView(params);
            } else {
              _this.$xutils.showMsgBox('提示', '征信报告超过配置有效期，无法查看');
            }
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },
    reportView (params) {
      var _this = this;
      // 保存征信查看记录
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqryrecord/createCreditReport',
        data: JSON.stringify(params),
        callback: function (code, message, response) {
          if (response.code == '0') {
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });

      window.open(params.creditUrl);
      // this.$router.addTab({
      //   // 路由名称
      //   name: 'creditmanage/creditRH/creditReportAllView',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'creditReportView', // 必传
      //   // 页签名称
      //   title: '征信报告',
      //   // 传递的业务数据，可选配置
      //   data: {
      //     url: params.creditUrl
      //   }
      // });
    },
    doImport () {
      this.dialogTableVisible = true;
      this.$nextTick(function () {
        this.$refs.dialogtable.remoteData();
      });
    },
    // 选取返回
    selectReturn () {
      var _this = this;
      var selectionArr = _this.$refs.dialogtable.selections;
      if (selectionArr.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      selectionArr[0].bizSerno = this.importSerno;
      selectionArr[0].scene = '02'; // 01:授信管理 02:合同签订 03:出账放款 04:贷后检查
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/importcreditandrel',
        data: selectionArr[0],
        callback: function (code, message, response) {
          if (response.data != null) {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({message: message, type: 'error'});
          }
        }
      });
      _this.dialogTableVisible = false;
    },

    cancel () {
      var _this = this;
      _this.dialogTableVisible = false;
    },
    initGrpcCredit (params) {
      let _this = this;
      let model = {};
      model.serno = params.bizSerno;
      model.bizScene = 'CRE03';
      model.period = params.period; // 01:授信管理 02:合同签订 03:出账放款 04:贷后检查
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqrylst/initgrpcreditbyscene',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    }
  },
  created () {
  }
};
</script>

<style lang="less" scoped>
  .btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
