
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票签发业务每周计划申请
  -->
  <div class="tab-search">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="申请信息" name="otherRecordAccpSignPlanAppSub">
          <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="审批表编号" rules="required" disabled name="serno"></yu-xform-item>
              <yu-xform-item label="申请日期" rules="required" disabled name="inputDate"></yu-xform-item>
              <yu-xform-item label="客户经理" rules="required" disabled name="managerIdName"></yu-xform-item>
              <yu-xform-item label="分支机构" rules="required" disabled name="managerBrIdName"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="银票签发业务每周计划申请信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="上报前一日银票余额" placeholder="上报前一日银票余额" rules="required" name="repBefDayRecBal" colspan="24"></yu-xform-item>
              <yu-xform-item label="下周计划签发银票金额" placeholder="下周计划签发银票金额" rules="required" name="nextWeekPlanSignAmt" colspan="24"></yu-xform-item>
              <yu-xform-item label="敞口银票计划签发金额" placeholder="敞口银票计划签发金额" rules="required" name="openRecPlanIssAmt"></yu-xform-item>
              <yu-xform-item label="敞口银票计划签发金额(纸票)" placeholder="敞口银票计划签发金额(纸票)" rules="required" name="openRecPlanIssAmtPaper"></yu-xform-item>
              <yu-xform-item label="全资质押类计划签发金额" placeholder="全资质押类计划签发金额" rules="required" name="whoImnPlanIssAmt"></yu-xform-item>
              <yu-xform-item label="全资质押类计划签发金额(纸票)" placeholder="全资质押类计划签发金额(纸票)" rules="required" name="whoImnPlanIssAmtPaper"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="银票签发业务每周计划申请明细" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-show="addBtnShow" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-show="modifyBtnShow" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-show="deleteBtnShow" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="otherRecordAccpSignPlanAppSubTable" :parse-response="requestSuccess" row-number selection-type="radio" :data-url="dataUrl" :base-params="queryParams" requestType="GET">
              <yu-xtable-column label="序号" prop="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column label="申请类型" prop="appType" data-code="STD_SIGN_APP_TYPE"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="拟签发日期" prop="planIssDate"></yu-xtable-column>
              <yu-xtable-column label="拟签发金额" prop="planIssAmt"></yu-xtable-column>
              <yu-xtable-column label="担保方式或质押类型" prop="guarMode" data-code="STD_SIGN_GUAR_TYPE"></yu-xtable-column>
              <yu-xtable-column label="保证金比例" prop="bailRate"></yu-xtable-column>
              <yu-xtable-column label="保证金利率" prop="rate"></yu-xtable-column>
              <yu-xtable-column label="票据期限" prop="drftTerm"></yu-xtable-column>
              <yu-xtable-column label="票据类型" prop="drftType" data-code="STD_PLD_DRFT_TYPE"></yu-xtable-column>
              <yu-xtable-column label="业务类型" prop="busiType" data-code="STD_BIZ_TYPE"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </yu-tab-pane>
        <yu-tab-pane label="影像材料" name="photoTab">
          <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
        </yu-tab-pane>
        <yu-tab-pane label="银票签发业务每周计划申请表" name="approveTab">
          <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
        </yu-tab-pane>
      </yu-tabs>
    </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
import { clone, lookup, dateFormat } from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg(
  'STD_SIGN_APP_TYPE,STD_SIGN_GUAR_TYPE,STD_PLD_DRFT_TYPE,STD_BIZ_TYPE'
);

import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { YufpDemoSelector, imageSystem, yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/otherrecordaccpsignplanappsub/',
      queryParams: {
        condition: { oprType: '01', serno: this.$route.meta.params ? this.$route.meta.params.data.serno : this.bizPageData.instanceInfo.bizId}
      },
      formdata: {},
      baseParams: {},
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
      formDisabled: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      submitBtnShow: true,
      addBtnShow: true,
      modifyBtnShow: true,
      deleteBtnShow: true,
      amtType: '',
      orgType: '',
      activeName: 'otherRecordAccpSignPlanAppSub'
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    console.log('==================>', this.bizPageData);
    // 判断是否为流程审批页面的打开
    if (this.bizPageData) {
      this.initPageData(this.bizPageData.instanceInfo.bizId).then((res) => {
        this.initPage(res);
      });
    } else {
      this.initPage();
    }
  },
  methods: {
    // 金额查询
    amtQuery () {
      let _this = this;
      yufp.service.request({
        method: 'GET',
        async: false,
        url: backend.cmisBiz + '/api/otherrecordaccpsignplanappsub/',
        data: {condition: JSON.stringify({
          serno: _this.formdata.serno,
          oprType: '01'
        })},
        callback: function (code, message, response) {
          if (response.code == '0') {
            var subdata = response.data;
            var subamt = 0;
            console.log(subdata);
            if(subdata.length > 0){
              for(var i = 0;i < subdata.length ; i++){
                subamt = subamt + subdata[i].planIssAmt;
                console.log(subdata[i].planIssAmt);
              }
              console.log(subamt);
              if(subamt > 10000000){
                _this.amtType = 'Y';
              }else{
                _this.amtType = 'N';
              }
            }
            console.log(_this.amtType);

            var isOver = null;
            var dialogData = {};
            const bizType = 'QT008'; // 银票签发业务每周计划表
            const loginUser = _this.$xutils.getLoginUserInfo();
            //机构判断
            _this.orgType = loginUser.org.orgType;

            // 提交流程
            let startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.orgCode;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = bizType;
            startdto.bizId = _this.formdata.serno; // 流水号
            startdto.bizUserName = subdata[0].cusName;
            startdto.bizUserId = subdata[0].cusId;
            if('1' == loginUser.org.orgType){
              _this.$dialog.open(
                '',
                'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppSelectDialog',
                900,
                650,
                dialogData,
                (retVal) => {
                  isOver = retVal;
                  if(isOver != "1" && isOver != "0"){
                  _this.$message({
                    message: '请选择是否保证金超过1000万',
                    type: 'warning'
                  });
                  return;
                }
                if(isOver == "1"){
                  isOver = "Y";
                }else{
                  isOver = "N";
                }
                startdto.param = {orgType: loginUser.org.orgType, amtType: isOver};
                console.log('业务类型--->', startdto.bizType);
                _this.$refs.yufpNwfInit.wfInit(startdto);
                },
                true,
                true
              );    
            }else {
              startdto.param = {orgType: loginUser.org.orgType, amtType: _this.amtType};
              console.log('业务类型--->', startdto.bizType);
              _this.$refs.yufpNwfInit.wfInit(startdto);
            }  
          } else {
            _this.$message({ message: '金额查询失败！', type: 'error'});
            return;
          }
        }
      });
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },

    initPage (res) {
      var _this = this;
      var params, formdata;
      if (res) {
        params = formdata = res[0];
        this.viewType = 'DETAIL';
      } else if (this.$route.meta.params) {
        this.viewType = this.$route.meta.params.actionType;
        params = formdata = this.$route.meta.params.data;
      }

      if (this.viewType === 'DETAIL') {
        yufp.clone(formdata, _this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
        this.addBtnShow = false;
        this.modifyBtnShow = false;
        this.deleteBtnShow = false;
      }
      if (this.viewType === 'EDIT') {
        yufp.clone(formdata, _this.formdata);
        this.formDisabled = false;
        _this.formdata.managerId = _this.userCode;
        _this.formdata.managerIdName = _this.userName;
        _this.formdata.managerBrId = _this.org.code;
        _this.formdata.managerBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputIdName = _this.userName;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.updDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.updateTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
      }

      if (this.viewType === 'ADD') {
        const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
        _this.formdata.serno = serno;
        _this.formdata.managerId = _this.userCode;
        _this.formdata.managerIdName = _this.userName;
        _this.formdata.managerBrId = _this.org.code;
        _this.formdata.managerBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputIdName = _this.userName;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.inputDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.createTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.updateTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
      }
      this.printUrl = _this.$backend.frptRptService + 'qtsx-ypqfywmzjh.cpt&serno=' + _this.formdata.serno;
      this.imageBizParam = [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'XXD_QTSXSQ',
          outsystem_code:"XXD_QTSXSQ0701",
          index: {
            businessid: params.serno,
            custtype: params.curType,
            custconductid: params.inputId,
            custconductname: params.inputIdName,
            orgid: params.inputBrId,
            orgname: params.inputBrIdName,
            opername: params.updIdName,
            custid: params.cusId,
            custname: params.cusName,
            custconduct: '',
            operid: '',
            maintaindate: '',
            contid: "",
            billno: ""
          }
        }
      ];
      this.show_img = false;
      this.$nextTick(() => {
        this.show_img = true;
      });
    },
    initPageData (bizId) {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$request({
            method: 'GET',
            url: backend.cmisBiz + '/api/otherrecordaccpsignplanapp/',
            data: {
              condition: JSON.stringify({
                serno: bizId,
                oprType: '01',
                approveStatusS: '000,111,992'
              })
            }
          })
          .then((data) => {
            resolve(data.data);
          });
      });
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.$xutils.getParentPage(_this, null, 'refresh');
      yufp.router.removeTab(this.$route.path);
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    addSaveFn: function (actionType) {
      var _this = this;

      _this.formdata.oprType = '01';
      _this.formdata.approveStatus = '000';

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignplanapp/`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error' });
        }
      });
    },

    editSaveFn: function (actionType) {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.formdata.oprType = '01';
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignplanapp/update`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据修改成功！', type: 'success' });
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据修改失败！', type: 'error' });
        }
      });
    },

    /**
     * 提交按钮
     */
    submitFn: function () {

      if (this.totalData == 0) {
        this.$xutils.showMsgBox('提示', '银票签发业务每周计划申请明细为空');
        return;
      }
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
     
      //金额判断
      _this.amtQuery ();

      
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var rowData = {};
      rowData['op'] = 'ADD';
      rowData['serno'] = this.formdata.serno;
      if (_this.formdata.otherType) {
        rowData['cusId'] = _this.formdata.cusId;
        rowData['cusName'] = _this.formdata.cusName;
        rowData['otherType'] = _this.formdata.otherType;
      }
      this.$dialog.open(
        '银票签发业务每周计划申请明细',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubInfo',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignPlanAppSubTable.remoteData();
        },
        true,
        true
      );
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignPlanAppSubTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'EDIT';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = false;
      this.$dialog.open(
        '修改银票签发业务每周计划申请明细',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubInfo',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignPlanAppSubTable.remoteData();
        },
        true,
        true
      );
    },

    /**
     * 申请详情查看
     */
    infoFn: function () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignPlanAppSubTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'DETAIL';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = true;
      this.$dialog.open(
        '查看银票签发业务每周计划申请明细',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubInfo',
        1200,
        600,
        rowData,
        () => {},
        true,
        true
      );
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections =
        _this.$refs.otherRecordAccpSignPlanAppSubTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      selections[0].oprType = '02';

      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/otherrecordaccpsignplanappsub/updateoprtypeunderlmt',
            data: selections[0],
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message({ message: '数据删除成功！', type: 'info' });
                _this.$refs.otherRecordAccpSignPlanAppSubTable.remoteData();
              } else {
                _this.$message({ message: '数据删除失败！', type: 'error' });
              }
            }
          });
        }
      });
    }
  }
};
</script>
