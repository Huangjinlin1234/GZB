<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <yu-row>
    <yu-col :span="4">
      <yu-menu default-active="1" @select="handleSelect">
        <yu-menu-item index="1">申请信息</yu-menu-item>
        <yu-menu-item index="2">影像资料</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :span="20">
      <div v-if="tabIndex == '1'">
        <yu-panel title="新增担保合同签订页面" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled="true"></yu-xform-item>
              <yu-xform-item label="合同编号" name="contNo" ctype="YufpZrcSelector" disabled="true" :params="contParms" @select-fn="selectCont"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group>
              <yu-xform-item label="担保变更类型" name="guarChgType" ctype="select" disabled="true" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group>
              <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
              <yu-xform-item label="合同金额" name="contAmt" disabled="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同申请类型" name="contType" disabled="true" ctype="select" data-code="STD_ZB_CONT_TYPE"></yu-xform-item>
              <yu-xform-item label="合同起始日" name="contStartDate" disabled="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同到期日" name="contEndDate" disabled="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="补充协议签订日期" name="signDate" value-format="yyyy-MM-dd" :disabled="viewType == 'VIEW'" :rules="viewType != 'VIEW'?'required':''" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="业务条线" name="belgLine" disabled ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="审批状态" name="contApproveStatus" ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="原担保合同列表" :collapseHide="false">

          <yu-xtable ref="refTable1" row-number request-type="post" condition-key="condition" :data-url="grtguarcontUrl" :base-params="baseparams.parm1" default-load="false">
            <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="担保金额" prop="guarAmt"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="标识" prop="opFlag" data-code="STD_BIZ_CHG_OP_FLAG"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="新担保合同列表" v-if="guarChgType != '03'" :collapseHide="false">
          <template slot="right">
            <yu-button-drop>
              <!--<yu-button @click="printFn">打印</yu-button>-->
              <!--<yu-button v-show="guarChgType != '01' && saveBtnShow" @click="importFn">引入</yu-button>-->
              <yu-button v-show="saveBtnShow" v-if="viewType!='VIEW'" @click="signFn">签订</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable2" row-number request-type="POST" condition-key="condition" :data-url="newguarcontUrl" :base-params="baseparams.parm2" default-load="false">
            <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
            <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
            <yu-xtable-column label="担保终止日" prop="guarEndDate"></yu-xtable-column>
            <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker" value-format="yyyy-MM-dd" :disabled="viewType=='VIEW'" @change="saveSignDate"></yu-xtable-column>
            <yu-xtable-column label="变更操作标识" prop="opFlag" data-code="STD_BIZ_CHG_OP_FLAG"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="登记信息" :collapseHide="false">
          <yu-xform ref="refForm1" label-width="120px" :disabled="true" v-model="baseForm" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="登记人" name="inputIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="责任人" name="managerIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" :hidden="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" :hidden="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="责任人" name="managerId" :hidden="true" ctype="input"></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrId" :hidden="true" ctype="input"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div class="yu-grpButton">
        <yu-button type="primary" @click="tempSave" v-if="viewType !== 'VIEW'">保存</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" v-if="viewType!='VIEW'" @click="submitFn">提交</yu-button>
          <yu-button v-show="!flowPage" @click="cancelFn">取消</yu-button>
        </div>
      </div>
      <!--影像-->
      <div v-if="tabIndex == '2'">
        <imageSystem authority="import;download;delImg;scan" :s="1" :para="imageBizParam"></imageSystem>
      </div>
    </yu-col>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </yu-row>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_BIZ_CHG_OP_FLAG,STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
import imageSystem from '@/views/imageManage/imageSystem';
import { mapGetters } from 'vuex';
export default {
  components: { yufpNwfInit, imageSystem },
  data: function () {
    return {
      grtguarcontUrl: `${backend.cmisBiz}/api/iqpguarchgapprel/`,
      newguarcontUrl: `${backend.cmisBiz}/api/iqpguarchgapprel/cont`,
      saveBtnShow: 'false',
      guarChgType: '',
      viewType: 'VIEW',
      serno: '',
      flowPage: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      formdata: {},
      baseForm: {},
      baseparams: {
        parm1: { condition: { serno: this.serno, isUnderCont: '1' } },
        parm2: { condition: { serno: this.serno, isUnderCont: '0', opFlag: '02' } }
      },
      tabIndex: '1',
      contParms: {
        title: '选择合同',
        queryFields: [{ placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.cmisBiz}/api/ctrloancont/`,
        tableColumns: [{ label: '合同编号', prop: 'contNo' }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '业务类型 ', prop: 'bizType' }, { label: '合同金额', prop: 'contAmt' }, { label: '合同余额', prop: 'contBalance' }]
      }
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  created: function () {
    this.initInfo();
  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
      if(index == '1'){
        this.initInfo();
      }
    },
    /** 签订 */
    signFn () {
      var _this = this;
      if (_this.$refs.refTable2.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var row = _this.$refs.refTable2.selections[0];
      if(row.guarContState == '101'){
        _this.$message('该担保合同已生效，请勿重复签订!');
        return;
      }
      if(row.signDate == null || row.signDate == ''){
        _this.$message('请先选择纸质合同签订日期!');
        return;
      }
      _this.$confirm('是否签订该担保合同？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            let data = {};//关联表修改生效
            data.igcarSerno = row.igcarSerno;
            data.guarContState = '101';//生效
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisBiz}/api/iqpguarchgapprel/update`,
              data: JSON.stringify(data),
              callback: function (code, message, response) {
                _this.$refs.refTable2.remoteData();
              }
            });
          }
        }
      });
    },
    saveSignDate () {
      let jsoRt = null;
      var jsoCardData = this.$refs.refTable2.selections[0]; // 先取得表单的数据
      this.$request({
        url: `${backend.cmisBiz}/api/grtguarcont/update1`,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    },
    tempSave () {
      let jsoRt = null;
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: `${backend.cmisBiz}/api/iqpguarchgapp/update`,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    },
    /** 提交方法 */
    submitFn () {
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      var _this = this;
      var signDate = _this.formdata.signDate;//纸质合同签订日期
      //  hxl 2021-08-04
        var date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()); // 获取当前时间
      if(signDate >= date){
          _this.formdata.signDate = '';
          _this.$xutils.showMsgBox('提示', '纸质合同签订日期应该早于当前时间，请重新输入!', 350, 150);
          return;
      }
      if(_this.$refs.refTable2 != undefined){
      var data = _this.$refs.refTable2.tabledata;
      if(data.length > 0){
        var flag = false;
        var tableSignDate = '';
        for(let i = 0;i < data.length; i++){
          tableSignDate = _this.$refs.refTable2.tabledata[i].signDate;
          if(signDate < tableSignDate){
            flag = true;
            break;
          }
        }
        if(flag){
          _this.formdata.signDate = '';
          _this.$xutils.showMsgBox('提示', '补充协议签订日期不应早于纸质合同签订日期，请重新输入!', 350, 150);
          return;
        }
      }
    }
      var guarChgType = _this.formdata.guarChgType;
      let num = 0;
      let length = 0;
      var guarContState = '';
      if(guarChgType == '01' || guarChgType == '02'){//担保追加、担保置换
        length = _this.$refs.refTable2.tabledata.length;
        for(let i = 0 ; i<length;i++){
          guarContState = _this.$refs.refTable2.tabledata[i].guarContState;
          if(guarContState == '100') {
            num++;
          }
        }
        if(num > 0){
          _this.$message({message: '存在新担保合同未签订，请先签订！', type: 'error'});
          return;
        }
      }


      // 保存数据
      const saveResult = this.tempSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.code;
      startdto.userId = _this.loginCode;
      startdto.bizId = _this.serno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {};
      // 小微
      if (_this.formdata.belgLine == '01') {
        startdto.bizType = 'BG031';
      }
      // 零售
      if (_this.formdata.belgLine == '02') {
        startdto.bizType = 'BG030';
      }
      // 对公
      if (_this.formdata.belgLine == '03') {
        startdto.bizType = 'BG029';
        startdto.param = {
            approveStatus: _this.formdata.contApproveStatus,
            contAmt: _this.formdata.contAmt
        };
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      if('A' == loginUser.org.orgType){
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH08';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH08';// （东海）
          }
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 页面关闭方法 */
    cancelFn () {
      let data = this.$route.meta.params;
      this.viewType = '';
      yufp.frame.removeTab(data.key);
    },
    selectCont () {},

    initInfo(){
      var _this = this;
      let data = _this.$route.meta.params;
      let params;
      // 进入初始化
      if (_this.$route.meta.params) {
        _this.serno = data.serno;
        // 进入初始化
        _this.viewType = data.viewType;
        _this.saveBtnShow = data.saveBtnShow;
        params = data;
      } else {
        _this.serno = _this.bizPageData.instanceInfo.bizId;
        // 进入初始化
        if (!this.bizPageData.instanceInfo.flowEdit) {
          _this.viewType = 'VIEW';
          _this.saveBtnShow = false;
          _this.flowPage = true;
        }
        params = _this.bizPageData.instanceInfo
      }

      _this.imageBizParam = [
        {
         top_outsystem_code: 'XXD_YWBGSQ',
          outsystem_code:"XXD_DBBGZL01,XXD_DBBGZL02,XXD_DBBGZL03",
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
            // custname: params.updBrIdName,
          }
        }
      ];

      // 刷新表格
      _this.baseparams.parm1 = { condition: { serno: _this.serno, isUnderCont: '1' } };
      _this.baseparams.parm2 = { condition: { serno: _this.serno, isUnderCont: '0', opFlag: '02' } };
      if (_this.viewType != 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisBiz}/api/iqpguarchgapp/${_this.serno}`,
          callback: function (code, message, response) {
            _this.guarChgType = response.data.guarChgType;
            yufp.clone(response.data, _this.formdata);
            yufp.clone(response.data, _this.baseForm);
          }
        });
      }
    }
  }
};
</script>
