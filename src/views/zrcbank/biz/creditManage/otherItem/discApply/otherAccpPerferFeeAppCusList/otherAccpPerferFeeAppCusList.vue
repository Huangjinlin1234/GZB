
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票手续费率优惠申请
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="otherAccpPerferFeeApp">
        <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="2">
              <yu-xform-item label="审批表编号" rules="required" disabled name="serno"></yu-xform-item>
              <yu-xform-item label="申请日期" rules="required" disabled name="inputDate"></yu-xform-item>
              <yu-xform-item label="客户经理" rules="required" disabled name="managerId"></yu-xform-item>
              <yu-xform-item label="分支机构" rules="required" disabled name="managerBrId"></yu-xform-item>
              <yu-xform-item label="申请理由" rules="required" ctype="textarea" name="appResn" rows="3" colspan="24" placeholder="2000个字符以内"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="申请银票手续费率优惠客户名单" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" v-show="saveBtnShow" @click="addFn">新增</yu-button>
            <yu-button type="primary" v-show="saveBtnShow" @click="modifyFn">修改</yu-button>
            <yu-button type="primary" @click="infoFn">查看</yu-button>
            <yu-button type="primary" v-show="saveBtnShow" @click="deleteFn">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="OtherAccpPerferFeeAppCusListTable" :default-load="false" :parse-response="requestSuccess" selection-type="radio" :data-url="dataUrl" requestType="POST">
            <yu-xtable-column label="序号" prop="pkId" hide-column></yu-xtable-column>
            <yu-xtable-column label="编号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="评级" prop="cusCrdGrade" data-code="STD_ZB_GRADE_RANK"></yu-xtable-column>
            <yu-xtable-column label="银票手续费率是否需要申请优惠" prop="isAppPrefer" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="按照管理办法测试的月手续费率" prop="chrgRateM"></yu-xtable-column>
            <yu-xtable-column label="分支行此次申请的手续费率" prop="curtChrgRate"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="cusListStatus" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="月手续费率对照表" name="checkTab">
        <iframe v-if="showCheck" :src="checkTabprintUrl" width="100%" height="700px" frameborder="0"></iframe>
      </yu-tab-pane>
      <yu-tab-pane label="影像材料" name="photoTab">
        <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="银票手续费率优惠申请表" name="approveTab">
        <iframe v-if="showApprove" :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
      </yu-tab-pane>
    </yu-tabs>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
      <yu-button v-show="cancelBtnShow" type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
import { clone, lookup, dateFormat } from '@/utils';
import { getRouterUrl } from "@/router/index";
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg(
  'STD_ZB_GRADE_RANK,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_CUS_LIST_STATUS'
);

import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { YufpDemoSelector, yufpNwfInit, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/otheraccpperferfeeappcuslist/query',
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
      cancelBtnShow: true,
      totalData: '',
      activeName: 'otherAccpPerferFeeApp',
      showCheck: true,
      showApprove: true,
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    var _this = this;

    // 判断是否流程
    var biz = _this.bizPageData;
    var params;
    if (biz == 'undefined' || biz == null || biz == '') {
      var name = this.$route.meta.params.name;
      this.viewType = this.$route.meta.params.actionType;
      let formdata = params = this.$route.meta.params.data;
      if (this.viewType == 'DETAIL' || this.viewType == 'VIEW') {
        clone(formdata, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
        _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
          reportType: '1',
          serno: this.formdata.serno
        });
      }
      if (this.viewType == 'EDIT') {
        clone(formdata, this.formdata);
        this.formDisabled = false;
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
        _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
          reportType: '1',
          serno: this.formdata.serno
        });
      }

      if (this.viewType == 'ADD') {
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
    } else {
      // 流程页面跳转
      let reqData = {
        condition: JSON.stringify({
          serno: this.bizPageData.instanceInfo.bizId
        })
      };
      this.$request({
        url:
          this.$backend.cmisBiz +
          '/api/otheraccpperferfeeapp/getotheraccpperferfeeapp',
        method: 'POST',
        data: reqData
      }).then(({ code, message, data }) => {
        if (code == '0') {
          params = data[0];
          clone(data[0], _this.formdata);
          _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
            reportType: '1',
            serno: this.formdata.serno
          });
        } else {
          this.$message({ message: message || '操作失败', type: 'error' });
        }
      });

      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.cancelBtnShow = false;
    }
    this.printUrl = _this.$backend.frptRptService + 'qtsx-yhcdhpsxflyh.cpt&serno=' + _this.formdata.serno;
    this.checkTabprintUrl = _this.$backend.frptRptService + 'qtsx-ysxfldzb.cpt';
    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'XXD_QTSXSQ',
        outsystem_code:"XXD_QTSXSQ0401",
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
  methods: {
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
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
      // var _this = this;
      // // _this.$xutils.getParentPage(_this, null, 'refresh');
      // yufp.router.removeTab(this.$route.path);
      // // 返回列表页面
      // yufp.globalEventBus.$emit('refreshOtherAccpPerferFeeAppTable');
     // var path = "zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeApp/otherAccpPerferFeeApp"
      // getRouterUrl(path)

     /*  this.$router.addTab({
        name: path,
        key: "",
        title: '银票手续费率优惠申请列表',
        data: {}
      }); */
      if (this.$route.meta.params.data) {
        yufp.router.removeTab(this.$route.path);
      } else if (this.pageParams) {
        this.$dialog.close(this.dialogId);
      }
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      console.log('save...');
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
        url: `${backend.cmisBiz}/api/otheraccpperferfeeapp/`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          if (actionType == 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode
            };
            this.submitProcessFun(params);
          }
          if (this.viewType == 'ADD') {
            this.viewType = 'EDIT';
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
      _this.formdata.approveStatus = '000';
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otheraccpperferfeeapp/update`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据修改成功！', type: 'success' });
          }
        } else {
          _this.$message({ message: '数据修改失败！', type: 'error' });
        }
      });
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var rowData = {};
      if (_this.formdata.otherType) {
        rowData['cusId'] = _this.formdata.cusId;
        rowData['cusName'] = _this.formdata.cusName;
        rowData['otherType'] = _this.formdata.otherType;
      }
      rowData['op'] = 'ADD';
      rowData['serno'] = _this.formdata.serno;
      this.$dialog.open(
        '银票手续费率优惠登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusListAdd',
        1200,
        600,
        rowData,
        function () {
          console.log('=================>>刷新');
          _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
            reportType: '1',
            serno: _this.formdata.serno
          });
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
      var rowData = _this.$refs.OtherAccpPerferFeeAppCusListTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var status = rowData[0].cusListStatus;
      if (status != '00') {
        _this.$message({
          message: '生效和失效的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'EDIT';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = false;
      this.$dialog.open(
        '修改银票手续费率优惠登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusListAdd',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
            reportType: '1',
            serno: _this.formdata.serno
          });
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
      var rowData = _this.$refs.OtherAccpPerferFeeAppCusListTable.selections;
      if (rowData.length != 1) {
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
        '查看银票手续费率优惠登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusListAdd',
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
      var selections = _this.$refs.OtherAccpPerferFeeAppCusListTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var status = selections[0].cusListStatus;
      if (status == '01') {
        _this.$message({
          message: '生效的数据不允许删除',
          type: 'warning'
        });
        return;
      } else {
        selections[0].oprType = '02';
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/otheraccpperferfeeappcuslist/update',
            data: selections[0],
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message({ message: '数据删除成功！', type: 'info' });
                _this.$refs.OtherAccpPerferFeeAppCusListTable.remoteData({
                  reportType: '1',
                  serno: this.formdata.serno
                });
              } else {
                _this.$message({ message: '数据删除失败！', type: 'error' });
              }
            }
          });
        }
      });
    },
    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.totalData == 0) {
        this.$xutils.showMsgBox('提示', '申请银票手续费率优惠客户名单为空');
        return;
      }
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 流程提交
     */
    submitProcessFun: function (params) {
      let _this = this;
      var isOver = null;
      var dialogData = {};
      const loginUser = _this.$xutils.getLoginUserInfo();
      const bizType = 'QT005'; // 银票手续费率优惠申请
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = this.$refs.OtherAccpPerferFeeAppCusListTable.tabledata[0].cusName;
      startdto.bizUserId = this.$refs.OtherAccpPerferFeeAppCusListTable.tabledata[0].cusId;
      
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
        
          if('A' == loginUser.org.orgType){
            if (loginUser.orgCode.startsWith('80')) {
                 startdto.bizType = 'SGF06';// （寿光）
            } else if (loginUser.orgCode.startsWith('81')) {
                  startdto.bizType = 'DHF06';// （东海）
            }
          } 
          console.log('业务类型--->', startdto.bizType);
          _this.$refs.yufpNwfInit.wfInit(startdto);
          },
          true,
          true
        );    
      }else {
        startdto.param = {orgType: loginUser.org.orgType, amtType: "N"};
        if('A' == loginUser.org.orgType){
           if (loginUser.orgCode.startsWith('80')) {
                 startdto.bizType = 'SGF06';// （寿光）
            } else if (loginUser.orgCode.startsWith('81')) {
                  startdto.bizType = 'DHF06';// （东海）
            }
        }
        console.log('业务类型--->', startdto.bizType);
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }   
    },
    // 提交成功回调
    submitSuccess () {
      this.cancelFn();
    },
    handleClick: function (tab, event) {
      if(this.activeName == "checkTab"){
        this.showCheck = false;
        this.$nextTick(() => {
          this.showCheck = true;
        });
      }else if(this.activeName == "approveTab"){
        this.showApprove = false;
        this.$nextTick(() => {
          this.showApprove = true;
        });
      }
      
    }
  }
};
</script>
