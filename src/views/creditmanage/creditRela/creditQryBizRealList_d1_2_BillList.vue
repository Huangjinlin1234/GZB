<template>
  <div>
    <yu-panel title="苏州地方征信查询申请列表" :collapseHide="false">
      <template slot="right">
        <yu-button-drop style="padding: 0;">
          <yu-button type="primary" ref="btn_doInsect" v-if="!isGrp &&type!='VIEW'" @click="customClick('doInsectSZ')">新增</yu-button>
          <yu-button type="primary" ref="btn_doUpdate" v-if="!isGrp &&type!='VIEW'" @click="customClick('doUpdateSZ')">修改</yu-button>
          <yu-button type="primary" ref="btn_doView" v-if="!isManagerId" @click="customClick('doViewSZ')">查看</yu-button>
          <yu-button type="primary" ref="btn_doDelete" v-if="!isGrp &&type!='VIEW'" @click="customClick('doDeleteSZ')">删除</yu-button>
          <!-- <yu-button type="primary" ref="btn_doReportViewRecord" v-if="!isManagerId" @click="customClick('doReportViewRecordSZ')">征信报告查看记录</yu-button> -->
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST" :base-params="Param">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="查询对象名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" :options="dicOptions.certTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号" prop="certCode"></yu-xtable-column>
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
              <yu-button size="small" type="primary" v-if="!isGrp" @click="doApply(scope.$index, scope.row)">发起申请</yu-button>
              <yu-button size="small" type="primary" @click="doCreditReportView(scope.$index, scope.row)">查看报告</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_IS_HAVE_CHILDREN');
export default{
  props: {
    bizPageData: Object
  },
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cqbrSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], certTypeOptions: [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], sceneOptions: [{key: '01', value: '授信'}, {key: '02', value: '贷后'}, {key: '03', value: '对私贷后'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      Param: {},
      // Param: { condition: JSON.stringify({ bizSerno: "CRE2021051700000329", qryCls: "3"}) },
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/selectCreditInfoByCrqlSerno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/',
      isGrp: false,
      isManagerId: false,
      type: ''
    };
  },
  mounted () {
    let params = {};
    if (this.getFactory().contextData) {
      if (this.getFactory().contextData.biz_serno) {
        params['bizSerno'] = this.getFactory().contextData.biz_serno;
        this.type = this.$route.meta.params.op;
      } else if (this.getFactory().contextData.iqpSerno) {
        params['bizSerno'] = this.getFactory().contextData.iqpSerno;
      } else if (this.getFactory().contextData.grpSerno) {
        params['bizSerno'] = this.getFactory().contextData.grpSerno;
      } else if (this.getFactory().contextData.bizGrpSerno) {
        params['bizSerno'] = this.getFactory().contextData.bizGrpSerno;
      } else if (this.getFactory().contextData.pvpSerno) {
        params['bizSerno'] = this.getFactory().contextData.pvpSerno;
      } else if (this.getFactory().contextData.instanceInfo) {
        params['bizSerno'] = this.getFactory().contextData.instanceInfo.bizId;
      }
      if (this.getFactory().contextData.instanceInfo) {
        params['bizSerno'] = this.getFactory().contextData.instanceInfo.bizId;
        this.isGrp = true;
      }
      if (this.getFactory().contextData.period) {
        params['period'] = this.getFactory().contextData.period;
      } else {
        params['period'] = '01';
      }
    }
    // 投贷后
    if (this.$route.params) {
      if (this.$route.params.taskNo) {
        params['bizSerno'] = this.$route.params.taskNo;
        params['period'] = '04';
        if (this.$route.params.op == 'details') {
          this.isGrp = true;
        }
      }
    }
    if (this.$route.meta.params) {
      if (this.$route.meta.params.biz_serno) {
        params['bizSerno'] = this.$route.meta.params.biz_serno;
      } else if (this.$route.meta.params.iqpSerno) {
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
      } else if (this.$route.meta.params.grpSerno) {
        params['bizSerno'] = this.$route.meta.params.grpSerno;
      } else if (this.$route.meta.params.bizGrpSerno) {
        params['bizSerno'] = this.$route.meta.params.bizGrpSerno;
      } else if (this.$route.meta.params.pvpSerno) {
        params['bizSerno'] = this.$route.meta.params.pvpSerno;
      }
      if (this.$route.meta.params.period) {
        params['period'] = this.$route.meta.params.period;
      } else {
        params['period'] = '01';
      }
      // 合作方
      if (this.$route.meta.params.serno) {
        params['bizSerno'] = this.$route.meta.params.serno;
        if (this.$route.meta.params.op == 'details') {
          this.isGrp = true;
        }
      } else if (this.$route.meta.params.coopAgrSerno) {
        params['bizSerno'] = this.$route.meta.params.coopAgrSerno;
        params['period'] = '04';
        if (this.$route.meta.params.op == 'details') {
          this.isGrp = true;
        }
      }
      // 小微用 2021年7月9日10:06:00  wh
      if (this.$route.meta.params.PageType == '01') {
        this.isGrp = true;
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
      this.isGrp = this.bizPageData.isView;
    }

    const bizPageData = this.bizPageData || {};
    const instanceInfo = bizPageData.instanceInfo;
    if (instanceInfo && (instanceInfo.bizType == 'HZ001' || instanceInfo.bizType == 'HZ002' || instanceInfo.bizType == 'HZ003' || instanceInfo.bizType == 'HZ004' || instanceInfo.bizType == 'HZ005' || instanceInfo.bizType == 'HZ006' || instanceInfo.bizType == 'HZ007' || instanceInfo.bizType == 'HZ008' || instanceInfo.bizType == 'HZ018' || instanceInfo.bizType == 'HZ019')) {
      params['bizSerno'] = instanceInfo.bizId;
      this.isGrp = true;
    }
    params['qryCls'] = '3';
    this.Param = { condition: JSON.stringify(params), sort: 'isnull(approve_status),field(approve_status,000,992,111,997,993,996,998,991),if(isnull(report_create_time),0,1),report_create_time desc'};
  },
  methods: {
    doApply (index, params) {
      if (params.approveStatus != '000' && params.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许发起申请。');
        return;
      }

      params['model_group_no'] = 'CMG000361';
      params['op'] = 'VIEW';
      params['op_type'] = 'view';
      params['szApply'] = 'szApply';

      this.$dialog.open(
        '修改（苏州地方企业征信查询）',
        'creditmanage/creditSZ/creditSZReportQryInfoUpdateIndex',
        880,
        350,
        params,
        (rtData) => {
          if (rtData == 'success') {
            this.$refs.refTable.remoteData();
          }
        }
      );
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
    }
  },
  created () {
    // const contextData = this.getFactory().contextData || {};
    // if (contextData.bizGrpSerno) {
    //   this.isGrp = true;
    // }
    // if (contextData.$refs.refTable.selection[0].managerId !== this.$xutils.getLoginUserInfo().loginCode) {
    //   this.isManagerId = true;
    // }
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
