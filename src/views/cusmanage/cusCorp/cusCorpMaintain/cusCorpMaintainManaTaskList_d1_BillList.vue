<template>
  <div>
  <yu-panel title="对公客户日常任务" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" exclude-key="A01,A02,A03,A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02" placeholder="业务类型" name="bizType"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus" :datacode-filter="filterTaskStatus"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right"> </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" :options="dicOptions.taskStatusOptions"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus"  data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px">
          <template slot-scope="scope">
            <yu-button-drop set-index="0" :show-length="1" type="text">
              <yu-button @click="editFn(scope.row)" type="text">处理</yu-button>
              <yu-button @click="cancleClick(scope.row)" type="text" size="small">作废</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column>
      </yu-xtable>
  </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dicOptions: { certCodeOptions: [{ key: '个人客户创建', value: '个人客户创建' }], taskStatusOptions: [{ key: '1', value: '待处理' }, { key: '2', value: '处理中' }, { key: '3', value: '已完成' }] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: { condition: { taskStatusList: '1,2', bizType: 'A04,A05,A06,A07,A08,A09,A10,A11', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} },
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },
  mounted () {
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === 'A04' || op.key === 'A05' || op.key === 'A06' || op.key === 'A07' || op.key === 'A08' || op.key === 'A09' || op.key === 'A10' || op.key === 'A11') {
          return true;
        }
        return false;
      });
    },
    // 字典项过滤
    filterTaskStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '2' || op.key === '3') {
          return true;
        }
        return false;
      });
    },
    editFn (row) {
      var _this = this;
      if (row.taskStatus == '2' && row.approveStatus != '992') {
        _this.$message({
          message: '当前正在处理中，请勿重复提交',
          type: 'warning'
        });
      } else {
        _this.nextPage(row);
      }
    },
    /** 下一个页面 */
    nextPage (json) {
      const biz_type = json.bizType;
      this.$dialog.closeAll();
      if (biz_type == 'A03' || biz_type == 'A06') {
        // 公司正式客户创建（集中作业）
        json['model_group_no'] = 'CMG000248';
        json['tplId'] = 'CMG000248';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = biz_type;

        let name = 'zrcbank/cus/cuscom/tempCusComCreate/formalCusComCenter';
        let key = 'formalCusComCenter' + json.cusId;
        json.key = `/${name}/${key}`;
        let title = biz_type === 'A03' ? '公司客户创建（集中作业）' : '公司正式客户客观信息维护（集中作业）';
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A04') {
        json['modelGroupNo'] = 'CMG000275';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A04';
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/cusTempMaintainA04';
        let key = 'cusTempMaintainA04' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司客户维护（临时）',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司客户维护（临时）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A05') {
        json['modelGroupNo'] = 'CMG000296';
        // json['op'] = 'VIEW';
        // json['op_type'] = 'view';
        json['biz_type'] = 'A05';

        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        let key = 'formalCusMaintainA05' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司正式客户主观信息维护',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司正式客户主观信息维护", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A07') {
        let name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        let key = 'fincReportQuery' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司客户财务报表新增（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A08') {
        let name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        let key = 'fincReportQuery' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司客户财务报表修改（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A09') {
        json['modelGroupNo'] = 'CMG000281';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A09';
        let name = ''
        let key = ''
        let loginUser = this.$xutils.getLoginUserInfo();
        // 区分总行和村镇（东海，寿光）,村镇所有信息自己录入
        var orgCode = loginUser.orgCode;
        // 80：寿光 81：东海
        if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
          name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA09';
          key = 'formalCusMaintainA09' + json.cusId;
        } else {
          name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
          key = 'formalCusMaintainA05' + json.cusId;
        }
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司正式客户信息维护',
          // 传递的业务数据，可选配置
          data: json
        });
        // this.$dialog.open("公司正式客户信息维护", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A10') {
        let name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        let key = 'fincReportQuery' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司客户财务报表新增',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A11') {
        let name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        let key = 'fincReportQuery' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key, // 必传
          // 页签名称
          title: '公司客户财务报表修改',
          // 传递的业务数据，可选配置
          data: json
        });
      }
    },
    //作废
    cancleClick (row) {
      var _this = this;
      let data = row;
      if (data.approveStatus === '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      data.taskStatus = '4'; // 4-作废
      _this.$xutils.request({
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cusmanatask/updateSelective',
          data: data,
          success: (response, status, xhr) => {
            var param = {
              bizId: data.serno
            };
            yufp.service.request({
              method: 'GET',
              url: backend.workflowService + '/api/core/deleteByBizId',
              data: param,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data != null) {
                    // 自动刷新列表数据
                    _this.$xutils.showMsgBox('提示', '作废成功', 500, 300, () => {
                      _this.$refs.refTable.remoteData();
                    });
                  }
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '获取数据异常:' + response.message.substring(0, 100),
                    type: 'error'
                  });
                }
              }
            });
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
    },
  }
};
</script>
