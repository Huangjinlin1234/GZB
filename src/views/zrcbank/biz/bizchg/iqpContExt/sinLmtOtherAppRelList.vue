<template>
  <!--
    @created by qiantj
    @description 其他事项审批表
  -->
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="其他申请事项审批表" name="rateAppTab">
        <yu-panel title="其他申请事项审批列表" :hideFilter="false" :collapseHide="false" >
          <yu-toolbar>
            <yu-button  type="primary"  @click="addFn" :hidden=" op == 'VIEW'">新增</yu-button>
            <yu-button  type="primary"  @click="modifyFn" :hidden=" op == 'VIEW'">修改</yu-button>
            <yu-button  type="primary"  @click="deleteFn" :hidden=" op == 'VIEW'">删除</yu-button>
            <yu-button  type="primary"  @click="infoFn">查看</yu-button>
          </yu-toolbar>
        <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :default-load="false" :base-params="baseParams" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="otherAppType"  data-code="STD_LMT_OTHER_APP_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="分支机构" prop="inputBrIdName" ></yu-xtable-column>
            <yu-xtable-column label="申请日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>

          <!--其他事项新增向导-->
      <yu-xdialog title="其他事项新增向导" :visible.sync="dialogVisibleGuide" width="650px">
        <yu-xform ref="refForm" label-width="140px" v-model="formdata" >
          <yu-xform-group column="1">
            <yu-xform-item label="申请流水号" ctype="input" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="展期申请流水号" ctype="input" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" colspan="22" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" placeholder="客户名称" disabled colspan="22"></yu-xform-item>
            <yu-xform-item label="其他事项申报类型" rules="required" ctype="select" placeholder="其他事项申报类型" name="otherAppType" data-code="STD_LMT_OTHER_APP_TYPE"  colspan="22"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFn">下一步</yu-button>
            <yu-button @click="cancelFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
        </yu-panel>

      </yu-tab-pane>

    </yu-tabs>
  </div>
</template>
<script>

// 注册字典项 审批状态
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_OTHER_APP_TYPE');
export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      serno: '',
      op: '',
      cusId: '',
      cusName: '',
      baseParams: {},
      // baseParamsHist: {condition: {oprType: '01', approveStatusS: '990,991,997,998', serno: this.$route.meta.params.serno || this.getFactory().contextData.serno || this.getFactory().contextData.instanceInfo}},
      bailaccinfo: [],
      dataUrl: '',
      activeName: 'rateAppTab',
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
      dialogVisibleGuide: false,
      refTableData: []
    };
  },
  mounted () {
    let _this = this;
    _this.dataUrl = backend.cmisBiz + '/api/otheritemapp/selectOtherItemByIqpSerno';
    // 页面转转
    if (_this.pageParams) {
      _this.serno = _this.pageParams.serno;
      _this.op = _this.pageParams.op;
    } else if (_this.getFactory().contextData.serno) {
      // 模板工厂进入
      _this.serno = _this.getFactory().contextData.serno;
      _this.op = _this.getFactory().contextData.op;
    } else if (_this.$route.meta.params) {
      // 路由进入
      _this.serno = _this.$route.meta.params.serno;
      _this.op = _this.$route.meta.params.op;
    }
    // 待办流程进入
    if (_this.serno === '') {
      _this.serno = _this.getFactory().contextData.instanceInfo.bizId;
      _this.op = 'VIEW';
    }
    _this.baseParams = {condition: {serno: _this.serno, oprType: '01', approveStatusS: '' }};
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshRefTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshRefTable: function () {
      let _this = this;
      _this.$refs.refTable.remoteData();
    },
    handleClick: function (tab, event) {
      // TODO
      if (tab.name == 'rateAppTab') {
        this.$refs.refTable.remoteData();
      } else if (tab.name == 'rateAppHistTab') {
        this.$refs.refHistTable.remoteData();
      }
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      // 初始化表单数据
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpcontext/show',
        data: _this.serno,
        callback: function (code, message, response) {
          _this.formdata.cusId = response.data.cusId;
          _this.formdata.cusName = response.data.cusName;
          _this.formdata.iqpSerno = response.data.serno;
        }
      });
      _this.dialogVisibleGuide = true;
    },
    // 下一步
    nextFn () {
      let _this = this;
      let jsoPar = _this.formdata;
      jsoPar.iqpSerno = _this.serno;
      _this.$confirm('是否确认新增?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/otheritemapp/insertOtherApproveByIqpSerno',
              data: jsoPar,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.dialogVisibleGuide = false;
                  response.data.iqpSerno = _this.serno;
                  _this.jumpOtherAppUpdatePage(response.data);
                } else {
                  _this.$message('新增失败!');
                }
              }
            });
          }
        }
      });
    },

    jumpOtherAppUpdatePage (data) {
      let otherAppType = data.otherAppType;
      let _this = this;
      data.name = this.$route.name;
      if (data.op) {
        // 存在,则不需要默认值
      } else {
        data.op = 'EDIT';
      }
      let path = '';
      if (otherAppType == '01') {
        // 人民币利率定价申请
        path = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/othercnyrateapp/selectbymodel',
          data: {condition: JSON.stringify({serno: data.serno, oprType: '01'})},
          callback: function (code, message, response) {
            data = response.data[0];
          }
        });
      } else if (otherAppType == '02') {
        // 外币利率定价申请
        path = 'zrcbank/biz/creditManage/otherItem/otherRate/otherForRateApp/otherForRateAppAdd/OtherForRateAppAddIndex';
      } else if (otherAppType == '03') {
        // 保证金存款特惠利率申请
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppAddIndex';
        data.otherType = true;
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
          data: {serno: _this.serno},
          callback: function (code, message, response) {
            data.cusId = response.data.cusId;
            data.cusName = response.data.cusName;
          }
        });
      } else if (otherAppType == '04') {
        // 银票手续费优惠申请表
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
        data.otherType = true;
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
          data: {serno: _this.serno},
          callback: function (code, message, response) {
            data.cusId = response.data.cusId;
            data.cusName = response.data.cusName;
          }
        });
      } else if (otherAppType == '05') {
        // 贴现优惠利率申请
        path = 'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      } else if (otherAppType == '06') {
        // 银票签发业务计划申请
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      } else if (otherAppType == '07') {
        // 中行代签电票申请
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo';
      } else if (otherAppType == '08') {
        // 特殊贷款用信备案申请
        path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherRecordSpecialLoanAppAddIndex';
      } else if (otherAppType == '09') {
        // 免追加担保申请
        this.$message('无免追加担保申请业务!');
        return;
      } else if (otherAppType == '10') {
        // 授信抵质押物价值认定申请
        path = 'zrcbank/biz/creditManage/otherItem/otherApprove/otherGrtValueIdentyApp/otherGrtValueIdentyAppAdd/OtherGrtValueIdentyAppAddIndex';
      } else if (otherAppType == '11') {
        // 其他事项申请
        path = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/lmtOtherAppRelDetails';
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/otheritemapp/selectbymodel',
          data: {condition: JSON.stringify({serno: data.serno, oprType: '01'})},
          callback: function (code, message, response) {
            data.cusId = response.data.cusId;
            data.cusName = response.data.cusName;
            yufp.clone(response.data[0], data);
            console.log('data====>', data);
          }
        });
      } else {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改其他申请事项审批表信息',
        data: {
          actionType: data.op, // 操作类型
          op: data.op, // 操作类型
          data: data,
          name: this.$route.name
        }
      });
    },

    // 新增向导页面返回
    cacelFn () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },
    // 修改按钮
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refTable.selections[0];
      if (!(selection.approveStatus == '000' || selection.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      selection.op = 'EDIT';
      _this.jumpOtherAppUpdatePage(selection);
    },
    // 查看按钮
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refTable.selections[0];
      selection.op = 'VIEW';
      _this.jumpOtherAppUpdatePage(selection);
    },

    // 删除按钮
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('确认删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.refTable.selections[0];
            var serno = selection.serno;
            let url = '';
            if (selection.otherAppType == '01') {
              // 人民币
              url = backend.cmisBiz + '/api/othercnyrateapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '02') {
              // 外币利率定价申请
              url = backend.cmisBiz + '/api/otherforrateapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '03') {
              // 保证金存款特惠利率申请
              url = backend.cmisBiz + '/api/otherbaildeppreferrateapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '04') {
              // 银票手续费优惠申请表
              url = backend.cmisBiz + '/api/otheraccpperferfeeapp/deleteBySerno';
            } else if (selection.otherAppType == '05') {
              // 贴现优惠利率申请
              url = backend.cmisBiz + '/api/otherdiscperferrateapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '06') {
              // 银票签发业务计划申请
              url = backend.cmisBiz + '/api/otherrecordaccpsignplanapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '07') {
              // 中行代签电票申请
              url = backend.cmisBiz + '/api/otherrecordaccpsignofbocapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '08') {
              // 特殊贷款用信备案申请
              url = backend.cmisBiz + '/api/otherrecordspecialloanapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '09') {
              // 免追加担保申请
              _this.$message({
                message: '未识别的其他事项申报类型!',
                type: 'warning'
              });
              return;
            } else if (selection.otherAppType == '10') {
              // 授信抵质押物价值认定申请
              url = backend.cmisBiz + '/api/othergrtvalueidentyapp/updateoprtypeunderlmt';
            } else if (selection.otherAppType == '11') {
              // 其他事项申请
              url = backend.cmisBiz + '/api/otheritemapp/updateoprtype';
            } else {
              _this.$message({
                message: '未识别的其他事项申报类型!',
                type: 'warning'
              });
              return;
            }
            yufp.service.request({
              method: 'POST',
              url: url,
              data: serno,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.deleteMemRelData(serno);
                  // _this.$refs.refTable.remoteData();
                  // if (selections[0].approveStatus == '992') {
                  //   _this.$message({ message: '自行退出成功！', type: 'info'});
                  // } else {
                  //   _this.$message({ message: '数据删除成功！', type: 'info'});
                  // }
                } else {
                  _this.$message('删除失败');
                }
              }
            });
          }
        }
      });
    },

    // 逻辑删除 关系表数据
    deleteMemRelData (serno) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtotherapprel/deletememreldata',
        data: serno,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message({ message: '删除成功！', type: 'info'});
        }
      });
    },

    infoHistFn: function () {
      var _this = this;
      if (_this.$refs.refHistTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refHistTable.selections[0];
      var obj = selection;
      obj['op'] = 'VIEW';
      _this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtOtherAppRel/lmtOtherAppRelDetails',
        -1,
        -1,
        obj,
        (params) => {
          _this.$refs.refHistTable.remoteData();
        }
      );
    },
    reload: function () {
      this.$refs.refTable.remoteData();
    },
    // 返回
    cancelFn(){
      this.dialogVisibleGuide = false;
    }
  }
};
</script>
