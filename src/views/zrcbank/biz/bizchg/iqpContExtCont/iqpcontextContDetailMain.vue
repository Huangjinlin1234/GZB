<template>
  <yu-row>
    <yu-col :span="4">
      <yu-menu default-active="1" @select="handleSelect">
        <yu-menu-item index="1">展期协议申请信息</yu-menu-item>
        <yu-menu-item index="2">原担保合同信息</yu-menu-item>
        <yu-menu-item index="3">追加担保合同信息</yu-menu-item>
        <yu-menu-item index="4">其他事项申报</yu-menu-item>
        <yu-menu-item index="5">影像资料</yu-menu-item>
        <yu-menu-item index="6">审批历史</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :span="20">
      <!--展期协议申请信息-->
      <div v-show="tabIndex == '1'">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform ref="refForm1" label-width="120px" v-model="formdata1" :disabled="formDisabled">
            <yu-xform-group :column="2">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input" colspan="10" disabled required></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                <yu-button type="primary" @click="viewIqpFn">查看</yu-button>
                </yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input" colspan="10" disabled required></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button type="primary" @click="viewContFn">查看</yu-button>
                </yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" required disabled></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" required disabled></yu-xform-item>
                <yu-xform-item label="合同金额" placeholder="合同金额" name="contAmt" ctype="input" required disabled></yu-xform-item>
                <yu-xform-item label="合同类型" placeholder="合同类型" name="contType" ctype="select" data-code="STD_CONT_TYPE" required disabled></yu-xform-item>
                <yu-xform-item label="合同起始日期" placeholder="合同起始日期" name="contStartDate" ctype="datepicker" required disabled></yu-xform-item>
                <yu-xform-item label="合同到期日期" placeholder="合同到期日期" name="contEndDate" ctype="datepicker" required disabled></yu-xform-item>
                <yu-xform-item label="业务条线" placeholder="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
                <yu-xform-item label="展期协议编号" placeholder="展期协议编号" name="argNo" ctype="input" required disabled></yu-xform-item>
                <yu-xform-item label="展期协议签订日期" placeholder="签订日期" name="signDate" ctype="datepicker" required></yu-xform-item>
                <yu-xform-item label="审批状态" name="contApproveStatus" ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="展期借据明细" panel-type="simple">
            <div class="yu-toolBar">
                <yu-button-group>
                    <yu-button  @click="viewBillFn">查看</yu-button>
                </yu-button-group>
            </div>
            <yu-xtable ref="refTable" row-number :data="tableData" :pageable="false" :default-load="false">
                <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
                <yu-xtable-column label="中文合同编号" prop="contCnNo" hidden></yu-xtable-column>
                <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
                <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
                <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
                <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
                <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
                <yu-xtable-column label="申请展期金额" prop="extAmt" ctype="yu-num" :disabled="formDisabled"></yu-xtable-column>
                <yu-xtable-column label="展期后到期日期" prop="extEndDate" ctype="datepicker" value-format="yyyy-MM-dd" :disabled="formDisabled"></yu-xtable-column>
                <yu-xtable-column label="展期执行利率（年）" prop="extRate"></yu-xtable-column>
                <yu-xtable-column label="申请展期次数" prop="extTimes"></yu-xtable-column>
            </yu-xtable>
            <el-row>
                <yu-xform ref="refForm2" label-width="120px" v-model="formdata2" :disabled="true">
                    <yu-xform-group :column="1">
                        <yu-xform-item label="申请展期原因及还款措施" placeholder="申请原因" name="appResn" ctype="textarea" :rows="2" ></yu-xform-item>
                        <yu-xform-item label="展期类型" placeholder="展期类型" name="extType" ctype="select" data-code="STD_REFINANCING_FLAG" ></yu-xform-item>
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


        <div class="yu-grpButton">
          <yu-button v-if="saveBtnShow"  @click="saveFn" type="primary">保存</yu-button>
          <yu-button v-if="saveBtnShow"  type="primary" @click="commitFn">提交</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
        <yu-xdialog title="借据明细详情" :visible.sync="dialogVisible">
            <yu-xform ref="refBillForm" label-width="120px" v-model="billFormdata" :disabled="true">
                <yu-xform-group>
                    <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                    <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                    <yu-xform-item label="中文合同编号" placeholder="中文合同编号" name="contCnNo" ctype="input"></yu-xform-item>
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
         <coop-approval :params="otherParams"></coop-approval>
       <!--  <processTrajectory v-if="show6Flag" :page-params="otherParams"> </processTrajectory> -->
      </div>
    </yu-col>
  </yu-row>
</template>
<script>
import ctrLoanCont from '@/views/zrcbank/biz/bizchg/iqpContExt/GrtContQuery';
import smallCreditManage from '@/views/grtmanage/smallCreditManage/grtContIndex';
import publicLetterManage from '@/views/grtmanage/publicLetterManage/maxGuarInfoIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import sinLmtOtherAppRelList from '@/views/zrcbank/biz/bizchg/iqpContExt/sinLmtOtherAppRelList';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
import imageSystem from '@/views/imageManage/imageSystem';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';

export default {
  components: {ctrLoanCont, smallCreditManage, publicLetterManage, sinLmtOtherAppRelList, processTrajectory, yufpNwfInit, imageSystem, coopApproval},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontextbill/query',
      updateUrl: this.$backend.cmisBiz + '/api/iqpcontext/updateextapp',
      tabIndex: '1',
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formDisabled: false,
      saveBtnShow: true,
      detailUrl: this.$backend.cmisBiz + '/api/iqpcontext/show',
      iqpSerno: '',
      tableData: [],
      dialogVisible: false,
      billFormdata: {},
      params: {},
      imageBizParam: {},
      otherParams: {},
      show2Flag: false,
      show3Flag: false,
      show4Flag: false,
      show6Flag: false
    };
  },
  methods: {
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
    },
    // 保存
    saveFn: function (callbackParam) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata1, model);
      let validate = false;
      _this.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (!_this.tableData.length > 0) {
        _this.$message({message: '请添加展期借据', type: 'error'});
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
              _this.cancelFn();
            }
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error'});
          }
        }
      });
    },
    // 提交
    commitFn: function () {
      var _this = this
      _this.saveFn(function () {
        let loginUser = _this.$xutils.getLoginUserInfo();
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
          startdto.bizType = 'BG028';
        }
        // 零售
        if (rowData.belgLine == '02') {
          startdto.bizType = 'BG027';
        }
        // 对公
        if (rowData.belgLine == '03') {
          startdto.bizType = 'BG026';
          startdto.param = {
            approveStatus: _this.formdata1.contApproveStatus,
            contAmt: _this.formdata1.contAmt
          };
        }

      // 村镇银行
      if('A' == loginUser.org.orgType){
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH06';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH06';// （东海）
          }
      }

        _this.$refs.yufpNwfInit.wfInit(startdto);
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
            _this.tableData = response.data;
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
        {contNo: _this.formdata1.contNo},
        function (selections) {
          console.log(selections);
          if (selections && selections.length > 0) {
            for (let i = 0; i < selections.length; i++) {
              let tempData = yufp.clone(selections[i], {});
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
      let jsonParams = {};
      jsonParams.contNo = this.formdata1.contNo;
      jsonParams.iqpSerno = this.formdata1.iqpSerno;
      console.log('<<<<<<<<<<<<jsonParams:',jsonParams);
      this.$router.addTab({
        // 路由名称
        name: 'bizmanage/ctrBiz/ctrContImageAppList/ctrLoanContView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cont_' + this.formdata1.contNo, // 必传
        // 页签名称
        title: '合同详情',
        // 传递的业务数据，可选配置
        data: jsonParams,
        afterTabClose: () => {
        }
      });
    },
    // 查看申请详情
    viewIqpFn: function () {
      let jsonParams = {};
      jsonParams.iqpSerno = this.formdata1.iqpSerno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/bizchg/iqpContExt/iqpcontextDetailMain', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_iqpContExt_VIEW_' + this.formdata1.iqpSerno, // 必传
        // 页签名称
        title: '展期申请信息',
        // 传递的业务数据，可选配置
        data: jsonParams,
        afterTabClose: () => {
        }
      });
    }
  },
  created: function () {
    if (this.bizPageData) {
      this.iqpSerno = this.bizPageData.instanceInfo.bizId;
      if (!this.bizPageData.instanceInfo.flowEdit) {
        this.op = 'VIEW';
        this.formDisabled = true;
        this.saveBtnShow = false;
      }
    } else if(this.$route) {
      this.params = yufp.clone(this.$route.meta.params, {});
      this.params['showable'] = true;
      this.iqpSerno = this.$route.meta.params.iqpSerno;
      console.log('<<<<<<<<<<_this.$route.params>>>>iqpcontextContDetailMain', this.$route.meta.params);
      this.params['serno'] = this.iqpSerno;
      if (this.$route.meta.params.op && this.$route.meta.params.op == 'VIEW') {
        this.op = this.$route.meta.params.op;
        this.formDisabled = true;
        this.saveBtnShow = false;
      }
    }else if(this.$attrs) {
      this.iqpSerno = this.$attrs['biz-page-data'].instanceInfo.bizId;
      if (!this.$attrs['biz-page-data'].instanceInfo.flowEdit) {
        this.op = 'VIEW';
        this.formDisabled = true;
        this.saveBtnShow = false;
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
        top_outsystem_code: 'ZQCZ',
        index: {
          businessid: params.iqpSerno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          contid: params.contNo,
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
  }
};
</script>
