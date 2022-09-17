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
        <yu-menu-item index="3" v-if="showHis">审批历史</yu-menu-item>
        <yu-menu-item index="4">征信报告</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :span="20">
      <div v-if="tabIndex == '1'">
        <yu-panel :title="viewTitle[viewType]" :collapseHide="false">
          <!--<template slot="right">
        <yu-button-drop>
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">提交</yu-button>
          <yu-button v-show="!flowPage" @click="cancelFn">取消</yu-button>
        </yu-button-drop>
      </template>-->
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled="true" @click="goSingleCustomer" @click.stop icon="search"></yu-xform-item>
              <!-- <yu-xform-item label="合同编号" name="contNo" ctype="YufpZrcSelector" disabled="true" :params="contParms" @select-fn="selectCont"></yu-xform-item> -->
              <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input" colspan="10" disabled required></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button type="primary" @click="viewContFn">查看</yu-button>
              </yu-xform-item>
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
              <yu-xform-item label="授信是否变更" name="isLmtChanged" ctype="select" data-code="STD_ZB_YES_NO" disabled="true" rules="required"></yu-xform-item>
              <yu-xform-item label="业务条线" name="belgLine" disabled ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="审批状态" name="approveStatus" ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="原担保合同列表" :collapseHide="false">
          <template slot="right">
            <yu-button-drop>
              <yu-button v-show="guarChgType == '02' && saveBtnShow" @click="guarchg('03')">置换</yu-button>
              <yu-button v-show="guarChgType == '02' && saveBtnShow" @click="guarchg('01')">取消置换</yu-button>
              <yu-button v-show="guarChgType == '03' && saveBtnShow" @click="guarchg('03')">撤销</yu-button>
              <yu-button v-show="guarChgType == '03' && saveBtnShow" @click="guarchg('01')">取消撤销</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable1" row-number request-type="post" condition-key="condition" :data-url="grtguarcontUrl" :base-params="baseparams.parm1" default-load="false">
            <yu-xtable-column label="担保合同编号" prop="guarContNo">
              <template slot-scope="scope">
                  <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="viewguarFn(scope.row)">{{ scope.row.guarContNo }}</span>
              </template>
            </yu-xtable-column>
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
              <yu-button v-show="saveBtnShow" @click="addguarFn">新增</yu-button>
               <yu-button v-show="saveBtnShow" @click="editguarFn">修改</yu-button>
              <!--<yu-button v-show="guarChgType != '01' && saveBtnShow" @click="importFn">引入</yu-button>-->
              <yu-button v-show="saveBtnShow" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable2" row-number condition-key="condition" request-type="post" :data-url="newguarcontUrl" :base-params="baseparams.parm2" default-load="false">
            <yu-xtable-column label="担保合同编号" prop="guarContNo">
              <template slot-scope="scope">
                  <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="viewguarFn(scope.row)">{{ scope.row.guarContNo }}</span>
              </template>
            </yu-xtable-column>
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
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">提交</yu-button>
          <yu-button v-show="!flowPage" @click="cancelFn">返回</yu-button>
        </div>
      </div>
      <!--影像-->
      <div v-if="tabIndex == '2'">
        <imageSystem authority="import;download;delImg;scan" :s="1" :para="imageBizParam"></imageSystem>
      </div>
      <!--审批历史-->
      <div v-if="tabIndex == '3'">
        <processTrajectory v-if="show3Flag" :page-params="pageParams"> </processTrajectory>
      </div>
      <div v-if="tabIndex == '4'">
        <d13Billlist  v-if="show4Flag" :biz-page-data="bizData" ></d13Billlist>
      </div>
    </yu-col>

    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </yu-row>
</template>
<script>
yufp.lookup.reg('STD_BIZ_CHG_OP_FLAG,STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
import { mapGetters } from 'vuex';
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
import imageSystem from '@/views/imageManage/imageSystem';
import {toSingleCustomer} from '@/utils/unitchange';
export default {
  components: { yufpNwfInit ,processTrajectory, imageSystem, d13Billlist},
  mixins:[toSingleCustomer],
  data: function () {
    return {
      grtguarcontUrl: '',
      newguarcontUrl: '',
      saveBtnShow: false,
      saveBtnShow1: false,
      dialogVisible: false,
      guarChgType: '',
      viewType: '',
      show4Flag: false,
      serno: '',
      flowPage: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      formdata: {},
      baseForm: {},
      tabIndex: '1',
      baseparams: {
        parm1: { condition: { serno: this.serno, isUnderCont: '1' } },
        parm2: { condition: { serno: this.serno, isUnderCont: '0' } }
      },
      contParms: {
        title: '选择合同',
        queryFields: [{ placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.cmisBiz}/api/ctrloancont/`,
        tableColumns: [{ label: '合同编号', prop: 'contNo' }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '业务类型 ', prop: 'bizType' }, { label: '合同金额', prop: 'contAmt' }, { label: '合同余额', prop: 'contBalance' }]
      },
      showHis: false,
      show3Flag: false,
      pageParams: {},
      isOnlinePld: ''
    };
  },
  props: {
    bizPageData: Object
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted: function () {
    this.initInfo();
  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
      if(index == '1'){
        this.initInfo();
      }else if (index == '3'){
        this.show3Flag = true;
      }
      if (index == '4') {
        this.show4Flag = true;
      }
    },
    /** 新增担保 */
    addguarFn: function () {
      let model = {};
      debugger;
      model.cusId = this.formdata.cusId;
      model.cusName = this.formdata.cusName;
      model.contNo = this.formdata.contNo;
      model.contType = this.formdata.contType;
      model.guarWay = this.formdata.guarWay;
      model.isSuperaddGuar = '1';
      model['type'] = 'ADD';
      model.guarAdd = this.guarAdd;
      model.isOnlinePld = this.isOnlinePld;
      model.bizType = '担保变更'
      this.$dialog.open('新增担保合同向导页面', 'grtmanage/smallCreditManage/grtContListInsertIndex', 900, 350, model);
    },
    editguarFn () {
      var _this = this;
      if (_this.$refs.refTable2.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = {};
      debugger;
      yufp.clone(_this.$refs.refTable2.selections[0], params);
      params.guarEdit = this.guarEdit;
      params['guarContNo'] = _this.$refs.refTable2.selections[0].guarContNo;
      params['type'] = 'EDIT';
      params['isOnlinePld'] = _this.isOnlinePld;
      var title = params.guarWay == '30' ? '保证担保合同' : '抵质押担保合同';
      this.$dialog.open(
        title,
        'grtmanage/smallCreditManage/grtPldContIndex',
        1600,
        650,
        params,
        null,
        true,
        true
      );
    },
    viewguarFn (row) {
      var _this = this;
      var params = {};
      yufp.clone(row, params);
      params['guarContNo'] = row.guarContNo;
      params['type'] = 'VIEW';
      params['isOnlinePld'] = _this.isOnlinePld;
      var title = params.guarWay == '30' ? '保证担保合同' : '抵质押担保合同';
      this.$dialog.open(
        title,
        'grtmanage/smallCreditManage/grtPldContIndex',
        1600,
        650,
        params,
        null,
        true,
        true
      );
    },
    /** 引入原担保合同 */
    importFn () {
      this.dialogVisible = true;
    },
    /** 担保新增的方法 */
    guarAdd: function (obj) {
      let _this = this;
      var model = {};
      yufp.clone(this.formdata, model);
      model.serno = this.formdata.iqpSerno;
      model.guarContNo = obj.guarContNo;
      model.guarContType = obj.guarContType;
      model.guarWay = obj.guarWay;
      model.guarAmt = obj.guarAmt;
      model.guarContState = obj.guarContState;
      model.isUnderCont = '0';
      model.opFlag = '02';
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/iqpguarchgapprel/create`,
        data: model,
        callback: function (code, message, response) {
          // _this.$set(_this.$refs.refTable1.selections[0], 'opFlag', opFlag);
          _this.$refs.refTable2.remoteData();
        }
      });
    },

    /** 担保修改的方法 */
    guarEdit: function (obj) {
      let _this = this;
      var model = {};
      yufp.clone(obj, model);
      model.serno = this.formdata.iqpSerno;
      model.guarContNo = obj.guarContNo;
      model.guarContType = obj.guarContType;
      model.guarWay = obj.guarWay;
      model.guarAmt = obj.guarAmt;
      model.guarContState = obj.guarContState;
      model.isUnderCont = '0';
      model.opFlag = '02';
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/iqpguarchgapprel/update`,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable2.remoteData();
        }
      });
    },
    /**
     * 置换  取消置换
     */
    guarchg: function (opFlag) {
      var _this = this;
      if (_this.$refs.refTable1.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = {
        igcarSerno: _this.$refs.refTable1.selections[0].igcarSerno,
        opFlag: opFlag
      };
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/iqpguarchgapprel/update`,
        data: model,
        callback: function (code, message, response) {
          _this.$set(_this.$refs.refTable1.selections[0], 'opFlag', opFlag);
          _this.$message('操作成功');
        }
      });
    },
    /**
     * 选择合同方法
     */
    selectCont: function (arr) {
      this.formdata.contNo = arr[0].contNo;
      this.formdata.cusId = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
    },
    /**
     *  保存
     */
    saveFn: function () {
      var _this = this;

      var guarChgType = _this.formdata.guarChgType;
      let num = 0;
      let length = 0;
      var opFlag = '';
      if(guarChgType == '01' || guarChgType == '02'){//担保追加、担保置换
        length = _this.$refs.refTable2.tabledata.length;
        if(!length > 0){
          _this.$message({message: '请新增担保合同！', type: 'error'});
          return;
        }
      }
      if(guarChgType == '03' || guarChgType == '02'){//担保撤销、担保置换
        length = _this.$refs.refTable1.tabledata.length;
        if(!length > 0){
          _this.$message({message: '此合同无原担保合同！', type: 'error'});
          return;
        }
        for(let i = 0 ; i<length;i++){
          opFlag = _this.$refs.refTable1.tabledata[i].opFlag;
          if(opFlag == '03') {
            num++;
          }
        }
        if(num == 0){
          _this.$message({message: '此合同的原担保合同无更改，请先置换或撤销原担保合同！', type: 'error'});
          return;
        }
      }

      // 岗位校验
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys;
      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) {
          let item = dutysList[i];
          if (item.code === 'FZH01' && _this.formdata.belgLine != '03') { //  对公客户经理但条线不是对公的则不给提交
            this.$message('非对公条线请确认!');
            return;
          }
          if (item.code === 'FZH02' && _this.formdata.belgLine != '02') { //  零售客户经理但条线不是零售的则不给提交
            this.$message('非零售条线请确认!');
            return;
          }
          if (item.code === 'XWB01' && _this.formdata.belgLine != '01') { //  小微客户经理但条线不是小微的则不给提交
            this.$message('非小微条线请确认!');
            return;
          }
        };
      }

      
      // 村镇银行并且是否变更授信'是',不需要审批
      if('A' == loginUser.org.orgType){
          if(_this.formdata.isLmtChanged == '1'){
              var jsoCardData = this.formdata; // 先取得表单的数据
              jsoCardData.approveStatus = '997';
              jsoCardData.isSignAgr = '1';
              this.$request({
                  url: this.$backend.cmisBiz + '/api/iqpguarchgapp/update',
                  method: 'post',
                  data: jsoCardData,
                  async: false,
                  success: response => {
                    console.log("返回信息------------>",response);
                    if (response.code == '0') {
                      this.$message('更新成功!');
                      yufp.frame.removeTab(this.$route.path);
                    } else {
                      // 处理请求失败的情况
                      this.$message({ message: response.erortx, type: 'error' });
                    }
                  },
                  error: () => {
                    // 处理请求失败的情况
                    this.$message({ message: "接口调用失败!", type: 'error' });
                  }
              });
              return;
          }
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
        startdto.bizType = 'BG011';
        startdto.param = {approveStatus: _this.formdata.approveStatus, lmtAmt: "0", openTotalLmtAmt: "0" };
      }
      // 零售
      if (_this.formdata.belgLine == '02') {
        startdto.bizType = 'BG010';
        startdto.param = {
            isPc: '1', // 是否pc端发起:1-是,0-否
            isLsOrg: '1', // 是否零售支行:1-是,0-否
            isZh: '1', // 是否支行:1-是,0-否
            approvalModel: '01', // 审批模式：01单签模式 07双签模式一 08双签模式二 05贷审会模式
            isInteRiskLvl: '0', // 是否综合风险等级为A
            isLimitFlag: '0', // 是否自动审批
            isOfferRateMax: '0', // 是否大于等于报价利率
            ruleRiskLvl: 'D', // 规则风险等级
            isRelationSuperPower: '0', // 关联方交易是否超权 0-否,1-是
            appAmt: '0', // 授信申请金额
            prdT: '11', // 10-按揭，11-非按揭
            isSgh16: '0', // 是否资产保全客户经理  0-否,1-是
            isFCDY:'N',
            isRaise: '0', // 是否上调权限:1-是,0-否
            approveStatus: _this.formdata.approveStatus
        };
      }
      // 对公
      if (_this.formdata.belgLine == '03') {
        if(_this.formdata.isLmtChanged == '1'){
          startdto.bizType = 'BG009';
          startdto.param = {
            isLowRisk: '0',//是否低风险 否
            amt: _this.formdata.contAmt //合同金额
          };
        }else{
          startdto.bizType = 'BG008';
          startdto.param = {
            approveStatus: _this.formdata.approveStatus,
            orgLevel: '6',
            lmtAmt: "0",
            openTotalLmtAmt: "0",
            isTZBAppr:'0',
            isMJBAppr:'0',
            isXQYAppr:'0',
            isGSBAppr:'0',
            isCommitOtherDeptXDGLB:'0',
            apprMode:'01',
            isGLAppr:'0',
            approveResult:'0',
            isSubAutoAppr:'0',
            sxkdRiskResult:'0',
            isGrp:'0',
            isAppAmt30:'1',
            isRelationSuperPower:'0',
            isInteRiskLvl:'0',
            isLimitFlag:'0',
            isOfferRateMax:'0',
            ruleRiskLvl:'D',
            lowRiskNoRelAmt:'0'
            };
        }
      }
      if('A' == loginUser.org.orgType){
        startdto.param = {
                    approveStatus: _this.formdata.approveStatus,
                    orgLevel: '6',
                    lmtAmt: "0",
                    openTotalLmtAmt: "0",
                    isTZBAppr:'0',
                    isMJBAppr:'0',
                    isXQYAppr:'0',
                    isGSBAppr:'0',
                    isCommitOtherDeptXDGLB:'0',
                    apprMode:'01',
                    isGLAppr:'0',
                    approveResult:'0',
                    isSubAutoAppr:'0',
                    sxkdRiskResult:'0',
                    isGrp:'0',
                    isAppAmt30:'1',
                    isRelationSuperPower:'0',
                    isInteRiskLvl:'0',
                    isLimitFlag:'0',
                    isOfferRateMax:'0',
                    ruleRiskLvl:'D',
                    isFCDY:'N',
                    isRaise: '0', // 是否上调权限:1-是,0-否
                    lowRiskNoRelAmt:'0'
                    };
                    // 是否保全客户经理岗
                startdto.param.isZCBQB = '0';
                const dutysList = loginUser.dutys;
                if (dutysList != undefined && dutysList.length > 0) {
                  for (let i = 0; i < dutysList.length; i++) {
                    let item = dutysList[i];
                    if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
                      startdto.param.isZCBQB = '1';
                      break;
                    }
                  }
                }
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH07';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH07';// （东海）
          }
      }
       console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 删除方法     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable2.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var len = selections.length,
        arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].igcarSerno);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisBiz}/api/iqpguarchgapprel/batchdelete/${arr.join(',')}`,
              callback: function (code, message, response) {
                _this.$refs.refTable2.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    cancelFn: function () {
      let data = this.$route.meta.params;
      this.viewType = '';
      yufp.frame.removeTab(data.key);
    },
    initInfo(){
      var _this = this;
      _this.grtguarcontUrl =`${backend.cmisBiz}/api/iqpguarchgapprel/grt`;
      _this.newguarcontUrl =`${backend.cmisBiz}/api/iqpguarchgapprel/`;
      let data = _this.$route.meta.params;
      let params;
      if (_this.$route.meta.params) {
        _this.serno = data.serno;
        params = data
        // 进入初始化
        _this.viewType = data.viewType;
        _this.saveBtnShow = data.saveBtnShow;
        _this.saveBtnShow1 = data.saveBtnShow;
        if(_this.viewType == 'VIEW' || _this.viewType == 'DETAIL'){
          _this.showHis = true;
        }
      } else {
        _this.serno = _this.bizPageData.instanceInfo.bizId;
        params = _this.bizPageData.instanceInfo;
        // 进入初始化
        if (!_this.bizPageData.instanceInfo.flowEdit) {
          _this.viewType = 'VIEW';
          _this.saveBtnShow = false;
          _this.saveBtnShow1 = true;
          _this.flowPage = true;
          _this.showHis = true;
        }
      }

      _this.imageBizParam = [
        {
          top_outsystem_code: 'XXD_YWBGSQ',
          outsystem_code:"XXD_DBBGZL01",
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

      _this.baseparams.parm1 = { condition: { serno: _this.serno, isUnderCont: '1' } };
      _this.baseparams.parm2 = { condition: { serno: _this.serno, isUnderCont: '0' } };
      if (_this.viewType != 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisBiz}/api/iqpguarchgapp/${_this.serno}`,
          callback: function (code, message, response) {
            _this.guarChgType = response.data.guarChgType;
            yufp.clone(response.data, _this.formdata);
            yufp.clone(response.data, _this.baseForm);
            yufp.clone(response.data, _this.pageParams);
            _this.pageParams.serno = _this.serno;
            _this.queryPld();
          }
        });
      }
    },
    // 查看合同详情
    viewContFn: function () {

       var _this = this;
      var belgLine = _this.formdata.belgLine;
      var name='';
      debugger;
       if(belgLine=='01'){//小微
           name = 'xwmanage/iqpManage/contManage/conSignInfo';
       }
       if(belgLine=='02'){//零售
        name = 'zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContSign';
       }

       if(belgLine=='03'){//对公  还需要修改
            let params = _this.formdata;
            params.opType = 'view';
            params.op = 'VIEW';
            this.goToDetailFn(params);
       }
      this.$router.addTab({
        // 路由名称
          name : name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cont_' + this.formdata.contNo, // 必传
        // 页签名称
        title: '合同详情',
        // 传递的业务数据，可选配置p
        data: this.formdata,
        afterTabClose: () => {
        }
      });
    },


 goToDetailFn (row) {
      // row.model_group_no = 'CMG000243';
      row.bizOp = row.op;
      row['iqpSerno'] = row.serno;
      row['model_group_no'] = 'CMG000015';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        true,
        true
      );
    },


    //查询 是否在线抵押
    queryPld(){
      let _this = this;;
      _this.$request({
          url: backend.cmisBiz + '/api/ctrloancont/'+ _this.formdata.contNo,
          method: 'GET'
        }).then(({ code, message, data }) => {
          if (code == 0) {
            _this.isOnlinePld = data.isOlPld;
          }
      });
    }
  }
};
</script>
