<template>
  <!--
    @created by
    @description 其他事项审批表
  -->
  <div>
    <yu-tabs>
      <yu-tab-pane label="其他申请事项审批表历史">
        <yu-panel title="其他申请事项审批表历史" :hideFilter="false" :collapseHide="false" >
          <yu-toolbar>
            <yu-button  type="primary" @click="infoHistFn">查看</yu-button>
          </yu-toolbar>
        <yu-xtable ref="refHistTable" condition-key="condition" row-number :data="refHistTableData" :default-load="false"  request-type="POST">
            <yu-xtable-column label="审批表编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_LMT_OTHER_APP_TYPE"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>

// 注册字典项 审批状态
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_OTHER_APP_TYPE');
export default {
  data: function () {
    return {
      contNo: '',
      baseParamsHist: {},
      refHistTableData: [],
      dataUrl: backend.cmisBiz + '/api/othercnyrateapp/getAppInfo',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      lmtSerno: '',
      limitSubNoList: ''

    };
  },
  mounted () {
    var _this = this;
    var data = {};
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      _this.contNo = data.param.contNo;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      _this.contNo = data.contNo;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      _this.contNo = data.contNo;
    }
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/selectotherappctrloan',
      data: {
        condition: JSON.stringify({
          contNo: _this.contNo,
          contStatus: '200',
          oprType: '01',
          belgLine: '03',
          isCyr: '01'
        })
      },
      callback: function (code, message, response) {
        if (response.data && response.data != null) {
          _this.init(response.data.cusId, response.data.lmtAccNo);
        }
      }});
    if (this.getFactory().conTextData) {
      this.getFactory().setButtonVisiable('commit', false);
      this.getFactory().setButtonVisiable('save', false);
      this.getFactory().setButtonVisiable('tempSave', false);
      this.getFactory().setButtonVisiable('back', false);
    }
  },
  methods: {
    // 查看按钮
    infoHistFn: function () {
      // 01人民币利率定价申请
      // 02外币利率定价申请
      // 03保证金存款特惠利率申请
      // 04银票手续费优惠申请表
      // 05贴现优惠利率申请
      // 06银票签发业务计划申请
      // 07中行代签电票申请
      // 08特殊贷款用信备案申请
      // 09免追加担保申请
      // 10授信抵质押物价值认定申请
      // 11其他事项申请
      // 12银票签发及全资质押类申请

      var _this = this;
      if (_this.$refs.refHistTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refHistTable.selections[0];
      var obj = selection;
      var path;
      if(obj.bizType == '01'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
      }else if(obj.bizType == '02'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRate/otherForRateApp/otherForRateAppAdd/OtherForRateAppAddIndex';
      }else if(obj.bizType == '03'){
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppAddIndex';
      }else if(obj.bizType == '04'){
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
      }else if(obj.bizType == '05'){
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      }else if(obj.bizType == '06'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      }else if(obj.bizType == '07'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo';
      }else if(obj.bizType == '08'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherRecordSpecialLoanAppAddIndex';
      }else if(obj.bizType == '09'){
        path = '';
      }else if(obj.bizType == '10'){
        path = 'zrcbank/biz/creditManage/otherItem/otherApprove/otherGrtValueIdentyApp/otherGrtValueIdentyAppAdd/OtherGrtValueIdentyAppAddIndex';
      }else if(obj.bizType == '11'){
        path = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/lmtOtherAppRelDetails';
      }else if(obj.bizType == '12'){
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOrAllPldApp/otherRecordAccpSignOrAllPldAppInfo';
      }
      obj['op'] = 'DETAIL';
      _this.$router.addTab({
        // 路由名称
        name: path, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: obj.bizType, // 必传
        // 页签名称
        title: '其他事项申报信息',
        // 传递的业务数据，可选配置
        data: {
          op: 'DETAIL', // 操作类型
          data: obj
        }
      });
    },
    init: function (cusId, lmtAccNo) {
      var _this = this;
      _this.getLimitSubNo(_this.replyNo);
      // String limitSubNo = (String) map.get("limitSubNo");//授信分项编号
      //   String cusId = (String) map.get("cusId");//客户编号
      //  String lmtSerno = (String) map.get("lmtSerno");//授信流水号
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/othercnyrateapp/getAppInfo',
        data: {
          limitSubNo: lmtAccNo,
          cusId: cusId
        },
        callback: function (code, message, response) {
          if (response.data != null && response.data) {
            _this.refHistTableData = response.data;
          }
        }});
    },
    /** 获取批复分项明细编号 */
    getLimitSubNo: function (replyNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/lmtreplyaccsubprd/getLmtReplyAccSubPrdByReplyNo',
        data: replyNo,
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(function (item) {
              var arg = {limitSubNo: item.replySubPrdSerno};
              _this.limitSubNoList.push(arg);
            });
          }
        }});
    }
  }
};
</script>
