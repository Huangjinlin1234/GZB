<template>
  <yu-row>
    <yu-col :span="4">
      <yu-menu default-active="1" @select="handleSelect">
        <yu-menu-item index="1">展期申请信息</yu-menu-item>
        <yu-menu-item index="2">原担保合同信息</yu-menu-item>
        <yu-menu-item index="3">追加担保合同信息</yu-menu-item>
        <yu-menu-item index="4">其他事项申报</yu-menu-item>
        <yu-menu-item index="5">影像资料</yu-menu-item>
        <yu-menu-item index="6">审批历史</yu-menu-item>
        <yu-menu-item index="7">征信报告</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :span="20">
      <!--展期申请信息-->
      <div v-show="tabIndex == '1'">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform ref="refForm1" label-width="120px" v-model="formdata1" :disabled="true">
            <yu-xform-group :column="2">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input" required></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input" colspan="10" required></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button type="primary" @click="viewContFn">查看</yu-button>
                </yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" required></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" required></yu-xform-item>
                <yu-xform-item label="合同金额" placeholder="合同金额" name="contAmt" ctype="input" required></yu-xform-item>
                <yu-xform-item label="合同类型" placeholder="合同类型" name="contType" ctype="select" data-code="STD_CONT_TYPE" required></yu-xform-item>
                <yu-xform-item label="合同起始日期" placeholder="合同起始日期" name="contStartDate" ctype="datepicker" required></yu-xform-item>
                <yu-xform-item label="合同到期日期" placeholder="合同到期日期" name="contEndDate" ctype="datepicker" required></yu-xform-item>
                <yu-xform-item label="业务条线" placeholder="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
                <yu-xform-item label="是否使用授信额度" placeholder="是否使用授信额度" name="isUtilLmt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
                <yu-xform-item label="授信额度编号" placeholder="授信额度编号" name="lmtAccNo" ctype="input" ></yu-xform-item>
                <yu-xform-item label="批复编号" placeholder="批复编号" name="replyNo" ctype="input" colspan="10"></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <!-- 对公授信 才有授信 批复 -->
                    <yu-button type="primary" @click="viewLmtFn" >查看</yu-button>
                </yu-xform-item>
                <yu-xform-item label="批复类型" name="replyType" ctype="input" hidden disabled></yu-xform-item> <!-- 1是单一 2是集团 -->
                <yu-xform-item label="批复台账编号" name="grpAccNo" ctype="input" hidden disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="展期借据明细" panel-type="simple">
            <div class="yu-toolBar">
                <yu-button-group>
                    <yu-button v-if="saveBtnShow1"  @click="impBillFn">引入</yu-button>
                    <yu-button v-if="saveBtnShow1"  @click="deleteBillFn">删除</yu-button>
                    <yu-button  @click="viewBillFn">查看</yu-button>
                </yu-button-group>
            </div>
            <yu-xtable ref="refTable" row-number :data="tableData" :pageable="false" :default-load="false" :rules="rules">
                <yu-xtable-column label="合同编号" prop="contNo" width="100"></yu-xtable-column>
                <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
                <yu-xtable-column label="贷款金额" prop="loanAmt" width="100"></yu-xtable-column>
                <yu-xtable-column label="贷款余额" prop="loanBalance" width="100"></yu-xtable-column>
                <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="120"></yu-xtable-column>
                <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="120"></yu-xtable-column>
                <yu-xtable-column label="申请展期金额" prop="extAmt" width="130" ctype="input" :disabled="extAmtDisabled" @focus="extEndDateFocus" @change="checkExtAmt"></yu-xtable-column>
                <yu-xtable-column label="展期后到期日期" prop="extEndDate" width="140" v-model="extEndDate" ctype="datepicker" value-format="yyyy-MM-dd" @focus="extEndDateFocus" @change="extEndDateChange" :disabled="extAmtDisabled"></yu-xtable-column>
                <yu-xtable-column label="展期利率" prop="extRate"  :disabled="extRateDisabled" ctype="input"></yu-xtable-column>
                <yu-xtable-column label="申请展期次数" prop="extTimes" width="130"></yu-xtable-column>
            </yu-xtable>
            <el-row>
                <yu-xform ref="refForm2" label-width="120px" v-model="formdata2" :disabled="formDisabled">
                    <yu-xform-group :column="1">
                        <yu-xform-item label="申请展期原因及还款措施" placeholder="申请原因" name="appResn" ctype="textarea" :rows="2" rules="required"></yu-xform-item> 
                        <yu-xform-item label="展期类型" placeholder="展期类型" name="extType" ctype="select" data-code="STD_REFINANCING_FLAG" rules="required"></yu-xform-item> 
                    </yu-xform-group> 
                </yu-xform>
            </el-row>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
            <yu-xform ref="refForm3" label-width="120px" v-model="formdata3" :disabled="true">
                <yu-xform-group :column="2">
                    <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="责任人" placeholder="责任人" name="managerIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="责任机构" placeholder="责任机构" name="managerBrIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="登记日期" placeholder="登记日期" name="inputDate" ctype="input"></yu-xform-item>
                </yu-xform-group>
            </yu-xform>
        </yu-panel>

        <d1-3-billlist ref="d1_3_BillList" :biz-page-data="bizData" v-if="activeIndex == '1-13'"></d1-3-billlist>

        <div class="yu-grpButton">
          <yu-button v-if="saveBtnShow"  @click="saveFn" type="primary">保存</yu-button>
          <yu-button v-if="saveBtnShow1"  type="primary" @click="commitFn">提交</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
        <yu-xdialog title="借据明细详情" :visible.sync="dialogVisible">
            <yu-xform ref="refBillForm" label-width="120px" v-model="billFormdata" :disabled="true">
                <yu-xform-group>
                    <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                    <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                    <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
                    <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input"></yu-xform-item>
                    <yu-xform-item label="产品名称" placeholder="产品名称" name="prdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="贷款金额" placeholder="贷款金额" name="loanAmt" ctype="input"></yu-xform-item>
                    <yu-xform-item label="贷款余额" placeholder="贷款余额" name="loanBalance" ctype="input"></yu-xform-item>
                    <yu-xform-item label="贷款起始日" placeholder="贷款起始日" name="loanStartDate" ctype="input"></yu-xform-item>
                    <yu-xform-item label="贷款到期日" placeholder="贷款到期日" name="loanEndDate" ctype="input"></yu-xform-item>
                    <yu-xform-item label="展期金额" placeholder="展期金额" name="extAmt" ctype="input"></yu-xform-item>
                    <yu-xform-item label="展期到期日期" placeholder="展期到期日期" name="extEndDate" ctype="input"></yu-xform-item>
                    <yu-xform-item label="展期利率" placeholder="展期利率" name="extRate" ctype="input"></yu-xform-item>
                    <yu-xform-item label="展期次数" placeholder="展期次数" name="extTimes" ctype="input"></yu-xform-item>
                    <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="登记日期" placeholder="登记日期" name="inputDate" ctype="input"></yu-xform-item>
                </yu-xform-group>
            </yu-xform>
        </yu-xdialog>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="cancelFn"></yufp-nwf-init>
      </div>
      <!--原担保合同信息-->
      <div v-show="tabIndex == '2'">
        <ctrLoanCont v-if="show2Flag" :page-params="params"></ctrLoanCont>
      </div>
      <!--追加担保合同信息-->
      <div v-show="tabIndex == '3'" v-if="show3Flag">
        <!-- 担保合同(对公) -->
        <publicLetterManage v-if="formdata1.belgLine == '03'" :page-params="params"></publicLetterManage>
        <smallCreditManage v-else :page-params="params"></smallCreditManage>
      </div>
      <!--其他事项申报-->
      <div v-if="tabIndex == '4'">
        <sinLmtOtherAppRelList v-if="show4Flag" :page-params="otherParams"> </sinLmtOtherAppRelList>
      </div>
      <!--影像资料-->
      <div v-if="tabIndex == '5'">
        <!-- <h2>拼命开发中~~~</h2> -->
        <imageSystem authority="import;download;delImg;scan" :s="1" :para="imageBizParam"></imageSystem>
      </div>
      <!--审批历史-->
      <div v-if="tabIndex == '6'">
       <!--  <processTrajectory v-if="show6Flag" :page-params="otherParams"> </processTrajectory> -->
         <coop-approval :params="otherParams"></coop-approval>
      </div>
      <div v-if="tabIndex == '7'">
      <d13Billlist  v-if="show7Flag" :biz-page-data="bizData" ></d13Billlist>
      </div>
    </yu-col>
  </yu-row>
</template>
<script>
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import ctrLoanCont from '@/views/zrcbank/biz/bizchg/iqpContExt/GrtContQuery';
import smallCreditManage from '@/views/grtmanage/smallCreditManage/grtContIndex';
import publicLetterManage from '@/views/grtmanage/publicLetterManage/maxGuarInfoIndex';
import sinLmtOtherAppRelList from '@/views/zrcbank/biz/bizchg/iqpContExt/sinLmtOtherAppRelList';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
export default {
  components: {ctrLoanCont, smallCreditManage, publicLetterManage, sinLmtOtherAppRelList, processTrajectory, yufpNwfInit, imageSystem, d13Billlist, coopApproval},
  props: {
    bizPageData: Object
  },
  data: function () {
    var checkExtAmt = function (rule, value, callback) {
      if (value === "" || !value) {
        return callback(new Error('金额不能为空'));
      }
      // setTimeout(function () {
        let ret = Number.parseInt(value);
        if (ret == NaN) {
          callback(new Error('请输入数字值'));
        } else {
          if (ret <= 0) {
            callback(new Error('金额必须大于0'));
          } else {
            callback();
          }
        }
      // }, 1000);
    };
    return {
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontextbill/query',
      updateUrl: this.$backend.cmisBiz + '/api/iqpcontext/updateextapp',
      otherItemUrl: this.$backend.cmisBiz + '/api/otheritemapp/selectOtherItemByIqpSerno',
      tabIndex: '1',
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formDisabled: false,
      saveBtnShow: true,
      saveBtnShow1: true,
      detailUrl: this.$backend.cmisBiz + '/api/iqpcontext/show',
      iqpSerno: '',
      tableData: [],
      tableDataSave: [],
      dialogVisible: false,
      billFormdata: {},
      params: {},
      otherParams: {},
      otherItemParams: {},
      show2Flag: false,
      show3Flag: false,
      show4Flag: false,
      show6Flag: false,
      show7Flag: false,
      op: '',
      extAmtDisabled: false,
      extRateDisabled: true,
      grpAccNo: '',
      accNo: '',
      contIqpSerno: '',
      rules:{
        extAmt: [
          { validator: checkExtAmt, trigger: 'blur' },
        ],
        extEndDate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      },
    };
  },
  created: function () {
      // 展期利率控制 小微客户经理才可以修改
       let roles = this.$xutils.getLoginUserInfo().roles;
       for (let i = 0; i < roles.length; i++) {
          if (roles[i].code == 'R0010') { // R0010 小微客户经理
             this.extRateDisabled = false;
            break;
          }
        }

    if (this.bizPageData) {
      this.iqpSerno = this.bizPageData.instanceInfo.bizId;
      if (!this.bizPageData.instanceInfo.flowEdit) {
        var nodeId = this.bizPageData.instanceInfo.nodeId;
        if( '256_106' != nodeId && '256_91' != nodeId){
          this.extAmtDisabled = true;
        }
        this.op = 'VIEW';
        this.formDisabled = true;
        this.saveBtnShow = true;//保存
        this.saveBtnShow1 = false;//提交
      }
      this.params['serno'] = this.iqpSerno;
    } else if(this.$route) {
      this.params = yufp.clone(this.$route.meta.params, {});
      this.params['showable'] = true;
      this.iqpSerno = this.$route.meta.params.iqpSerno;
      this.params['serno'] = this.iqpSerno;
      if (this.$route.meta.params.op && this.$route.meta.params.op == 'VIEW') {
        this.op = this.$route.meta.params.op;
        this.formDisabled = true;
        this.saveBtnShow = false;//保存
        this.extAmtDisabled = true;
        this.saveBtnShow1 = false;//提交
      }
    }else if(this.$attrs) {
      this.iqpSerno = this.$attrs['biz-page-data'].instanceInfo.bizId;
      if (!this.$attrs['biz-page-data'].instanceInfo.flowEdit) {
        this.op = 'VIEW';
        this.formDisabled = true;
        this.extAmtDisabled = true;
        this.saveBtnShow = true;//保存
        this.saveBtnShow1 = false;//提交
      }
    }
    let _this = this;
    var params;
    yufp.service.request({
      method: 'POST',
      url: _this.detailUrl,
      data: this.iqpSerno,
      async: false,
      callback: function (code, message, response) {
        if (response.code == '0') {
          params = response.data;
          yufp.clone(response.data, _this.params);
          yufp.clone(_this.params, _this.otherParams);
          _this.otherParams.serno = _this.params.iqpSerno;
          _this.otherParams.op = _this.op;
        } else {
          _this.$message({ message: '展期申请基础信息查询失败！', type: 'error'});
        }
      }
    });

    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'ZQSQYX',
        index: {
          businessid: params.iqpSerno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          custtype: params.curType,
          custconductname: params.updIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.inputIdName
          // custname: params.updBrIdName,
        }
      }
    ];
  },
  mounted: function () {
    this.initData();
    this.initTableData();
  },
  methods: {
    extEndDateFocus(){
      if(this.bizPageData){
        this.selectIndex = this.$refs.refTable.selections[0].index
        this.tableDataSave.forEach((item, index) => {
          if(this.selectIndex == index){
            this.extEndDate1 = item.extEndDate
            this.extAmt = item.extAmt
          }
        })
      }
    },
    extEndDateChange(val){
      if(this.bizPageData){
        if(this.extEndDate1 < val){
          this.$message({message: '流程审批时展期后到期日期不可上调！', type: 'error'});
          this.tableData[this.selectIndex].extEndDate = this.extEndDate1
        }
        console.log("=============>>>>>>", this.extEndDate1, val)
      }

    },
    handleSelect: function (index) {
      this.tabIndex = index;
      if (index == '2') {
        this.show2Flag = true;
      }
      if (index == '3') {
        this.show3Flag = true;
      }
      if (index == '4') {
        this.show4Flag = true;
      }
      if (index == '6') {
        this.show6Flag = true;
      }
      if (index == '7') {
        this.show7Flag = true;
      }

    },
    // 保存
    saveFn: function (callbackParam) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata2, model);
      let validate = false;

      _this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });

      if(!validate){
          _this.$message({message: '请录入申请展期原因及还款措施！', type: 'error'});
          return;
      }

      if (!_this.tableData.length > 0) {
        _this.$message({message: '请引入展期借据！', type: 'error'});
        return;
      }
      _this.tableData.forEach(item => {
        if(item.extAmt === "" || item.extAmt == null || item.extAmt == undefined){
          _this.$message({message: '申请展期金额不能为空！', type: 'error'});
          return;
        }
      })

      _this.$refs.refTable.validate(function(fields) {
        if (!fields) { // 如果校验通过, fields为null
          validate = true;
        }else{
          validate = false;
        }
      });
      if (!validate) {
        return;
      }
      let postParams = {
        iqpContExt: model,
        billList: this.tableData
      };
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: postParams,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (typeof callbackParam === 'function') {
              callbackParam.call(_this);
            } else {
              _this.$message({ message: '数据更新成功！', type: 'info'});
              // _this.cancelFn(); 不退出当前页
            }
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error'});
          }
        }
      });
    },
    // 提交
    commitFn: function () {
      let _this = this;
      //查询其他事项申报
      _this.otherItemQuery();

    },
    commitFuc: function () {
      let _this = this;
      this.saveFn(function () {
        let loginUser = this.$xutils.getLoginUserInfo();
        const rowData = _this.formdata1;
        const startdto = {
          'systemId': 'cmis',
          'orgId': loginUser.org.code,
          'bizId': rowData.iqpSerno,
          'userId': loginUser.loginCode,
          'bizUserName': rowData.cusName,
          'bizUserId': rowData.cusId
        };
        // 小微
        if (rowData.belgLine == '01') {
          startdto.bizType = 'BG007';
        }
        // 零售
        if (rowData.belgLine == '02') {
          startdto.bizType = 'BG006';
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
            isFCDY:'N',
            isRaise: '0', // 是否上调权限:1-是,0-否
            isSgh16: '0' // 是否资产保全客户经理  0-否,1-是
          };
        }
        // 对公
        if (rowData.belgLine == '03') {
          startdto.bizType = 'BG005';
          startdto.param = {
            approveStatus: rowData.approveStatus,
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
        // 村镇银行
      if('A' == loginUser.org.orgType){
        startdto.param = {
            approveStatus: rowData.approveStatus,
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
            startdto.bizType = 'SGH05';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH05';// （东海）
          }
      }
        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    cancelFn: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    // 初始化表单数据
    initData: function () {
      let _this = this;
      yufp.clone(_this.params, _this.formdata1);
      yufp.clone(_this.params, _this.formdata2);
      yufp.clone(_this.params, _this.formdata3);

      var replyNo = _this.formdata1.replyNo;
      var lmtAccNo = _this.formdata1.lmtAccNo;
      var contNo = _this.formdata1.contNo;
      var belgLine = _this.formdata1.belgLine;
      if( (replyNo && lmtAccNo) || (replyNo && belgLine == '02')){
        _this.getReplyData(replyNo,contNo);
      }
    },
    // 初始化借据明细数据
    initTableData: function () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.dataUrl,
        data: {condition: JSON.stringify({
          iqpSerno: this.iqpSerno
        })},
        callback: function (code, message, response) {
          if (response.code == '0') {
            response.data.forEach((item, index) => {
              item.index = index
            })
            _this.tableData = response.data
            yufp.clone(response.data, _this.tableDataSave);
          } else {
            _this.$message({ message: '展期申请借据明细查询失败！', type: 'error'});
          }
        }
      });
    },
    // 引入
    impBillFn: function () {
      let _this = this;
      _this.$dialog.open(
        '请选择贷款借据',
        'zrcbank/biz/bizchg/iqpContExt/accLoanPop',
        1200,
        650,
        {contNo: _this.formdata1.contNo, accStatus:"1"},
        function (selections) {
          //目前的借据选择是单选
          if (selections && selections.length > 0) {
            let flag = false;
            for(let j = 0;j<_this.tableData.length;j++){
              var billNo = _this.tableData[j].billNo;
              var billNoSel = selections[0].billNo
              if(billNo == billNoSel){
                flag = true;
              }
            }
            if(flag){
              _this.$message({ message: '该借据已引入！', type: 'info'});
            }else{
              let tempData = yufp.clone(selections[0], {});
              console.log('tempData-->', tempData)
               console.log('selections[0]-->', selections[0].execRateYear)
               tempData.extRate = selections[0].execRateYear;
              _this.tableData.push(tempData);
            }
          }

        }
      );
    },
    // 删除
    deleteBillFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let index = _this.tableData.indexOf(_this.$refs.refTable.selections[0]);
      _this.tableData.splice(index, 1);
    },
    // 查看
    viewBillFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refTable.selections[0];
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        _this.$refs.refBillForm.resetFields();
        yufp.clone(obj, _this.billFormdata);
      });
    },
    // 查看合同详情
    viewContFn: function () {
      let jsonParam = yufp.clone(this.formdata1, {});
      this.$router.addTab({
        // 路由名称
        name: 'bizmanage/ctrBiz/ctrContImageAppList/ctrLoanContView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cont_' + this.formdata1.contNo, // 必传
        // 页签名称
        title: '合同详情',
        // 传递的业务数据，可选配置
        data: jsonParam,
        afterTabClose: () => {
        }
      });
    },
    // 查看授信批复详情
    viewLmtFn(){
      let model = {};
      let _this = this;
      if( _this.formdata1.replyType == 1){
        model.accNo = _this.formdata1.grpAccNo;
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail', // 菜单路径 待确定
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_lmt_' + _this.formdata1.replyNo, // 必传
          // 页签名称
          title: '授信批复详情',
          // 传递的业务数据，可选配置
          data: model,
          afterTabClose: () => {
          }
        });
      }else if (_this.formdata1.replyType == 2){
        model.grpAccNo = _this.formdata1.grpAccNo;
        model.grpReplySerno = _this.formdata1.replyNo;
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/biz/LmtGrpReplyAcc/lmtGrpReplyAccDetail', // 菜单路径 待确定
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_lmt_' + _this.formdata1.replyNo, // 必传
          // 页签名称
          title: '授信批复详情',
          // 传递的业务数据，可选配置
          data: model,
          afterTabClose: () => {
          }
        });
      }else if (_this.formdata1.replyType == 3){
        model.iqpSerno = _this.formdata1.grpAccNo;
        //零售也有授信批复，是张报表
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContPiFu', // 菜单路径 待确定
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_lmt_' + _this.formdata1.replyNo, // 必传
          // 页签名称
          title: '授信批复详情',
          // 传递的业务数据，可选配置
          data: model,
          afterTabClose: () => {
          }
        });
      }else{
        _this.$xutils.showMessage('授信批复信息不存在！');
      }
    },
    //校验 展期金额
    checkExtAmt(val){
      let _this = this;
      // 流程时
      if(_this.bizPageData){
        if(_this.extAmt < val){
           _this.$message({message: '流程审批时申请展期金额不可增加！', type: 'error'});
           this.tableData[this.selectIndex].extAmt = this.extAmt
        }
      }else{
        var loanBalance = _this.$refs.refTable.selections[0].loanBalance;
        var extAmt = _this.$refs.refTable.selections[0].extAmt;
        if(extAmt > loanBalance){
          _this.$refs.refTable.selections[0].extAmt = '';
          _this.$xutils.showMessage('展期金额['+extAmt+']不能超过贷款余额['+loanBalance+']，请重新输入!');
        }
      }

    },
    getReplyData(replyNo,contNo){
      let _this = this;
      Promise.all([_this.queryViewData1(replyNo), _this.queryViewData2(replyNo), _this.queryViewData3(contNo)]).then(res => {
        if(_this.grpAccNo){//集团
          _this.formdata1.replyType = 2;
          _this.formdata1.grpAccNo = _this.grpAccNo;
        }else if (_this.accNo){// 单一
          _this.formdata1.replyType = 1;
          _this.formdata1.grpAccNo = _this.accNo;
        }else if (_this.contIqpSerno){//零售
          _this.formdata1.replyType = 3;
          _this.formdata1.grpAccNo = _this.contIqpSerno;
        }
      });
    },
    // 查询集团客户授信批复信息
    queryViewData1 (replyNo) {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {};
        model.grpReplySerno = replyNo;
        _this
          .$request({
            url: backend.cmisBiz + '/api/lmtgrpreplyacc/queryall',
            method: 'post',
            data: JSON.stringify({condition: JSON.stringify(model)})
          })
          .then(({ code, message, data }) => {
            if (data.length > 0) {
              _this.grpAccNo = data[0].grpAccNo;
            }
            resolve(data);
          });
      });
    },
    // 查询单一客户授信批复信息
    queryViewData2 (replyNo) {
      return new Promise((resolve, reject) => {
        let _this = this;;
        let model = {};
        model.replySerno = replyNo;
        _this.$request({
            url: backend.cmisBiz + '/api/lmtreplyacc/queryAll',
            method: 'post',
            data: JSON.stringify({condition: JSON.stringify(model)})
          })
          .then(({ code, message, data }) => {
            if (data.length > 0) {
              _this.accNo = data[0].accNo;
            }
            resolve(data);
          });
      });
    },
    // 查询零售授信批复信息
    queryViewData3 (contNo) {
      return new Promise((resolve, reject) => {
        let _this = this;;
        _this.$request({
            url: backend.cmisBiz + '/api/ctrloancont/'+ contNo,
            method: 'GET'
          }).then(({ code, message, data }) => {
            if (code == 0) {
              _this.contIqpSerno = data.iqpSerno;
              _this.params.isOnlinePld = data.isOlPld;
            }
            resolve(data);
          });
      });
    },
    // 其他事项申报查询
    otherItemQuery () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.otherItemUrl,
        data: {condition: JSON.stringify({
          serno: _this.otherParams.serno,
          oprType: '01',
          approveStatusS: '',
        })},
        callback: function (code, message, response) {
          if (response.code == '0') {
            console.log(response.data.length)
            if(response.data.length > 0){
              let arr = response.data
              for(let i = 0; i < arr.length; i ++){
                if(arr[i].otherAppType == '01' && arr[i].approveStatus != '997'){
                  _this.$message({ message: '存在人民币利率定价申请且审批状态不为通过,不允许提交！', type: 'error'});
                  return;
                }else{
                  _this.commitFuc();
                }
              }
            }else{
              _this.commitFuc();
            }

          } else {
            _this.$message({ message: '其他事项申报查询失败！', type: 'error'});
            return;
          }
        }
      });
    }
  }
};
</script>
