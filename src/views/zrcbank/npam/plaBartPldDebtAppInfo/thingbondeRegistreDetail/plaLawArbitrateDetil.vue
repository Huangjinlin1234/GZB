<template>
  <!--
    @created by
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-tabs v-model="activeName"  @tab-click="handleClick">
      <yu-tab-pane label="以物抵债登记详情" name="base">

        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" :disabled="viewType == 'DETAIL'" v-model="formdata1">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" ctype="input" name="pdraiSerno" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled colspan="10"></yu-xform-item>
              <yu-button type="primary" @click="detailView('cusId')" colspan="2">查看</yu-button>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="贷款金额" name="loanAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="贷款余额" name="loanBalance" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="拖欠利息" ctype="input" name="totalTqlxAmt" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>

        <yu-panel title="抵债资产信息" :hideFilter="false" :collapseHide="false" >
          <yu-xform ref="refForm" label-width="200px" :disabled="viewType == 'DETAIL'" v-model="formdata">
            <yu-xform-group :column="2">
              <yu-xform-item label="是否我行抵押物" ctype="select" name="isBankPldimn" data-code="STD_ZB_YES_NO" rules="required" @change="dataUrlFn"></yu-xform-item>
              <yu-xform-item label="抵质押物编号" name="pldimnNo" icon="search" clearable rules="required" :params="cusParms" @click.native="selectFn" colspan="10"></yu-xform-item>
              <yu-button type="primary" @click="detailView('pldimnNo')" colspan="2" :disabled="!formdata.pldimnNo">查看</yu-button>
              <yu-xform-item label="抵债物类型" name="resistDebtType" ctype="select" rules="required" data-code="STD_RESIST_DEBT_TYPE"></yu-xform-item>
              <yu-xform-item label="最高可抵押金额" name="highPldAmt" ctype="num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="抵债押物名称" name="pldimnMemo" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="抵质押人名称" name="pldimnPerson" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权属证件号码" name="guarCertCode" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="抵押物状态" name="pldimnStatus" ctype="select" data-code="STD_PLDIMN_STATUS" disabled></yu-xform-item>

              <yu-xform-item label="抵债物取得方式" ctype="select" data-code="STD_RESIST_DEBT_GET_MODE" name="resistDebtGetMode" rules="required"></yu-xform-item>

              <yu-xform-item label="债务人名称" ctype="input" name="debtorName" rules="required"></yu-xform-item>
              <yu-xform-item label="债务金额" ctype="num" name="debtAmt" number-formatter="0,000.00" rules="required"></yu-xform-item>
              <yu-xform-item label="数量" name="qnt" ctype="num"  rules="required"></yu-xform-item>
              <yu-xform-item label="存放地址" name="depoAddr" ctype="textarea" rules="required" :colspan="24"></yu-xform-item>
              <yu-xform-item label="评估价值" name="evalValue" ctype="num" number-formatter="0,000.00" rules="required"></yu-xform-item>
              <yu-xform-item label="接收价值（法院裁定价值/协议价值）" name="rcvValue" number-formatter="0,000.00" ctype="num" :rules="rcvValue"></yu-xform-item>
              <yu-xform-item label="法律文书编号" name="legalInstruNo" ctype="input" :rules="{ required: requireFlag, message: '必填', trigger: 'blur' }"></yu-xform-item>
              <yu-xform-item label="法律文书名称" name="legalInstruName" ctype="input" :rules="{ required: requireFlag, message: '必填', trigger: 'blur' }"></yu-xform-item>
              <yu-xform-item label="法院/仲裁机构名称" name="court" ctype="input" :rules="{ required: requireFlag, message: '必填', trigger: 'blur' }"></yu-xform-item>
              <yu-xform-item label="是否出租" name="isRent" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
              <yu-xform-item label="租赁起始日" name="rentStartDate" ctype="datepicker" value-format="yyyy-MM-dd" ></yu-xform-item>
              <yu-xform-item label="租赁到期日" name="rentEndDate" ctype="datepicker" value-format="yyyy-MM-dd" ></yu-xform-item>
              <yu-xform-item label="法律文书生效日期" name="legalInstruInureDate" ctype="datepicker" value-format="yyyy-MM-dd" ></yu-xform-item>
              <yu-xform-item label="法律文书落款日期" name="legalInstruEndDate" ctype="datepicker" value-format="yyyy-MM-dd" :rules="{ required: requireFlag, message: '必填', trigger: 'blur' }"></yu-xform-item>
              <yu-xform-item label="责任人" name="managerId" ctype="YuXuser" rules="required" @select-fn="selectedUserFn" ></yu-xform-item>
             <!-- <yu-xform-item label="责任人" name="managerIdName"  hidden></yu-xform-item> -->
              <yu-xform-item label="责任机构" name="managerBrIdName" rules="required" ctype="yufp-search-tree" :params="treeParams" :select-value="selectValue1"  :details="true" :details-value="detailsValue1" @node-click="changeOrgFn"></yu-xform-item>
              <yu-xform-item label="账务机构名称" name="finaBrName" rules="required" ctype="yufp-search-tree" :params="treeParams" :select-value="selectValue2"  :details="true" :details-value="detailsValue2" @node-click="changeFinFn"></yu-xform-item>
             <!-- <yu-xform-item label="责任机构" name="managerBrId" ctype="input"  hidden></yu-xform-item> -->
              <yu-xform-item label="账务机构编号" name="finaBrId"   placeholder="账务机构编号" disabled ></yu-xform-item>
              <yu-xform-item label="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" rules="required" ctype="datepicker" value-format="yyyy-MM-dd" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>

        <yu-panel title="关联借据信息" :hideFilter="false" :collapseHide="false" >
          <yu-button-drop>
            <yu-button type="primary" @click="importFn" v-if="viewType != 'DETAIL'">引入</yu-button>
            <yu-button type="primary" @click="deleteDebtFn" v-if="viewType != 'DETAIL'">删除</yu-button>
            <yu-button type="primary" @click="saveDebtFn" v-if="viewType != 'DETAIL'">保存</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" @loaded="returnFn" @cell-mouse-leave="leaveFn" @cell-mouse-enter="enterFn" condition-key="condition" style="margin-top: 10px" row-number :data-url="dataContNoUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
            <yu-xtable-column align="center" label="合同编号 " prop="contNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
            <yu-xtable-column align="center" label="抵债本金" prop="resistCap" ctype="num" number-formatter="0,000.00" :rules="resistCap" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
            <yu-xtable-column align="center" label="抵债利息" prop="resistInt" ctype="num" number-formatter="0,000.00" :rules="resistInt" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
            <yu-xtable-column align="center" label=" 抵债费用" prop="resistExpense" ctype="num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div style="text-align: center;margin-top:10px">
        <yu-button-drop>
          <yu-button type="primary" @click="addFn" v-if="viewType != 'DETAIL'">提交</yu-button>
          <yu-button type="primary" @click="doSave" v-if="viewType != 'DETAIL'">保存</yu-button>
          <yu-button type="primary" @click="backFn">返回</yu-button>
        </yu-button-drop>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="forth" >
          <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="five">
        <coop-approval :params="childParams"></coop-approval>
      </yu-tab-pane>
               <!-- 借据引入pop框   -->
      <yu-xdialog title="借据引入" :visible.sync="authDialogVisible" >
       <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refDebtTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refDebtTable" :row-number="true" selection-type="checkbox" request-type="POST" :pageable="true" :data-url="dataDebtUrl" :default-load="true" condition-key="condition" :base-params="baseJParams">
          <yu-xtable-column  width="170" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column  width="170" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column  width="130" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column  width="150" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column  width="100" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column  width="100" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column  width="100" label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column  width="100" label="起始日期" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column  width="100" label="到期日期" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column  width="100" label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column  width="100" label="主办人" prop="managerIdName" ></yu-xtable-column>
          <yu-xtable-column  width="170" label="主办机构" prop="managerBrIdName" ></yu-xtable-column>
          <yu-xtable-column  width="100" label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectedJDebtFn" size="small">确认</el-button>
          <el-button @click="cancel" size="small">取消</el-button>
        </div>
      </yu-xdialog>
        <!--   抵质押物pop框   -->
      <yu-xdialog title="抵质押物信息" :visible.sync="authDialogVisible1" width="1100px">
       <yu-xform form-type="search" v-model="searchFormdata1" label-width="130px" related-table-name="refDebtTable1">
          <yu-xform-group :column="2" >
            <yu-xform-item label="抵质押物编号" placeholder="抵债押物编号" name="guarNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refDebtTable1" :row-number="true"  selection-type="radio" request-type="POST" :pageable="true" :data-url="dataDebtUrl1" :default-load="true" condition-key="condition" :base-params="baseJParams1">
          <yu-xtable-column  width="170" label="押品编号" prop="guarNo"></yu-xtable-column>
          <yu-xtable-column align="center" width="130" label="抵债押物名称" prop="pldimnMemo"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="所有权人" prop="guarCusName"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="权属证件号" prop="guarCertCode"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="抵押物状态" prop="regState" data-code="STD_ZB_GUAR_STATE"></yu-xtable-column>
          <yu-xtable-column align="center" width="150" label="最高可抵质押金额" prop="maxMortagageAmt"></yu-xtable-column>
        </yu-xtable>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectedJDebtFn1" size="small">确认</el-button>
          <el-button @click="cancel" size="small">取消</el-button>
        </div>
      </yu-xdialog>

    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ACC_STATUS,STD_FIVE_CLASS,STD_RESIST_DEBT_GET_MODE,STD_ZB_GUAR_STATE,STD_RESIST_DEBT_TYPE,STD_ZB_YES_NO,STD_ZB_CUR_TYP');
// 获取仓库数据
import { mapState } from 'vuex';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { yufpNwfInit, imageSystem, coopApproval },
  data: function () {
    var _this = this;
    var checkMoney = function (rule, value, callback) {
      if (value != _this.totalMoney) {
        return callback(new Error('接收价值应该=抵债本金+抵债利息+抵债费用'));
      } else {
        callback();
      }
    };
    var checkResistCap = function (rule, value, callback) {
      if (value > _this.$refs.refTable.selections[0].loanBalance) {
        return callback(new Error('抵债本金不得大于贷款余额'));
      } else {
        callback();
      }
    };
    var checkResistInt = function (rule, value, callback) {
      if (value > _this.$refs.refTable.selections[0].totalTqlxAmt) {
        return callback(new Error('抵债利息不得大于拖欠利息'));
      } else {
        callback();
      }
    };
    return {
      authDialogVisible1: false,
      dataDebtUrl1: this.$backend.cmisBiz + '/api/guarbaseinfo/all',
      baseJParams1: {condition: JSON.stringify({approveStatus: '997'})}, // 查询审批通过的抵质押物信息GUAR_TYPE_CD
      totalMoney: 0,
      rcvValue: [
        {validator: checkMoney, trigger: 'blur'},
        {required: true, message: '该字段不能为空', trigger: 'blur'}
      ],
      //
      resistCap: [
        // {required:true, message: "必填"},
        {validator: checkResistCap}
      ],
      resistInt: [
        // {required:true, message: "必填"},
        {validator: checkResistInt}
      ],
      selectValue1: '',
      selectValue2: '',
      detailsValue1: '',
      detailsValue2: '',
      image: '1',
      baseParams: {condition: { pdraiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdraiSerno }},
      dataContNoUrl: backend.cmisNpam + '/api/plabartplddebtbillrel/queryByPdraiSerno',
      dataDebtUrl: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId',
      treeParams: {
        dataId: 'orgId',
        dataLabel: 'orgName',
        dataPid: 'updptId',
        dataUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
        placeholder: this.$t('sysUserManager.qxz'),
        searchKey: 'orgName', // 树过滤关键字
        dataParams: {
          orgSts: 'A'
        } // 额外请求参数 默认查询生效的机构
      }, // 机构树选择
      formdata: {},
      formdata1: {},
      baseJParams: {},
      activeName: 'base',
      authDialogVisible: false,
      imageBizParam: [],
      viewType: ''
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: (state) => state.oauth.userName,
      userId: (state) => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: (state) => state.oauth.org.name,
      orgCode: (state) => state.oauth.org.code
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.pdraiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    },
    requireFlag: function () {
      return this.formdata.resistDebtGetMode == '02';
    }
  },
  props: {
    bizPageData: Object
  },
  created () {
    var _this = this;

    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      _this.viewType = 'DETAIL';
    } else {
      _this.viewType = _this.$route.meta.params.viewType; // 业务类型
    };
    if (_this.viewType == 'DETAIL') {
      _this.image = '2';
    }
    _this.imageBizParam = [
      {
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ04',
        'index': {
          'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdraiSerno
          /** 客户名称 */
          // custname: this.bizPageData != undefined ? null : this.$route.meta.params.cusName,
          /** 客户号 */
          // custid: this.bizPageData != undefined ? null : this.$route.meta.params.cusId,
          /** 机构名称 */
          // orgname: this.bizPageData != undefined ? null : this.$route.meta.params.inputBrIdName
        }
      }
    ];
  },
  mounted () {
    var _this = this;
    var pdraiSerno = '';
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      pdraiSerno = _this.bizPageData.instanceInfo.bizId;
      _this.viewType = 'DETAIL';
    } else {
      pdraiSerno = _this.$route.meta.params.pdraiSerno;
      _this.viewType = _this.$route.meta.params.viewType; // 业务类型
    };

    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/plabartplddebtappinfo/getdetail',
      data: pdraiSerno,
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata); //  表格2 抵债资产信息表数据
          _this.detailsValue1 = _this.formdata.managerBrIdName;
          _this.selectValue1 = _this.formdata.managerBrId;
          _this.detailsValue2 = _this.formdata.finaBrName;
          _this.selectValue2 = _this.formdata.finaBrId;
          _this.imageBizParam[0] = {
            'top_outsystem_code': 'XXD_ZCBQ',
            'outsystem_code': 'XXD_ZCBQ04',
            'index': {
              'businessid': pdraiSerno,
              /** 客户名称 */
              custname: response.data.cusName,
              /** 客户号 */
              custid: response.data.cusId,
              /** 机构名称 */
              orgname: _this.formdata.inputBrIdName
            }
          };
          // 表格1 基本信息
          _this.formdata1.cusId = response.data.cusId;
          _this.formdata1.cusName = response.data.cusName;
          _this.formdata1.pdraiSerno = pdraiSerno;
        } else {
          _this.$message.error({message: response.message});
        }
      }
    });
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /* 查看详情 */
    detailView (a) {
      var _this = this;
      if (a == 'cusId') {
        // var select = {};
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
          data: _this.formdata1.cusId,
          callback: function (code, message, response) {
            if (code == 0) {
              let json = {};
              let title = '';
              let name = '';
              let key = '';
              json['cusId'] = _this.formdata1.cusId;
              yufp.clone(response.data, json);
              if (response.data.cusRankCls == '01') {
                json['modelGroupNo'] = 'CMG000296';
                json['viewType'] = 'VIEW';
                json['opType'] = 'view';
                title = '公司客户查看';
                name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
                // 个人正式客户创建 B01
                key = new Date().getTime();
                json.key = `/${name}/${key}`;
              } else {
                json['model_group_no'] = 'CMG000251';
                json['tplId'] = 'CMG000251';
                json['op'] = 'VIEW';
                json['viewType'] = 'view';
                title = '公司临时客户查看';
                name = 'zrcbank/cus/cuscom/tempCusComCreate/tempCusComCreate';
                // 对公正式客户创建 B01
                key = new Date().getTime();
                json.key = `/${name}/${key}`;
              }
              _this.$router.addTab({
              // 路由名称
                name: name,
                // 自定义唯一页签key,请统一使用custom_前缀开头
                key: key,
                // 页签名称
                title: title,
                // 传递的业务数据，可选配置
                data: json
              });
            }
          }
        });
      };
      // 查看抵债详情
      if (a == 'pldimnNo') {
        var params = {};
        params.guarNo = this.formdata.pldimnNo;
        // 获取登入信息
        var loginUserInfo = this.$xutils.getLoginUserInfo();
        loginUserInfo.roles.forEach(function (_item, _index) {
          params['SystemNo'] = '01';
          // 如果是小微客户经理
          // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
          if (_item.code == 'R0010' || _item.code == 'R0030') {
            params['SystemNo'] = '02';
          }
        });
        params['callMethod'] = 'tGuarDetailInfo';
        params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        this.goToYpSys(params);
      }
    },
    /** 跳转押品系统 */
    goToYpSys (paramDats) {
      paramDats.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      paramDats.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      const url = this.getGuarSysUrl(paramDats);
      window.open(url, '_blank');
    },
    /*  获取跳转押品系统url */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },

    /* pop框抵质押物编号弹出 */
    selectFn () {
      this.authDialogVisible1 = true;
    },
    /* pop框数据选取抵质押物编号 */
    selectedJDebtFn1 () {
      this.formdata.pldimnNo = this.$refs.refDebtTable1.selections[0].guarNo; // 抵质押物编号
      this.formdata.pldimnMemo = this.$refs.refDebtTable1.selections[0].pldimnMemo; // 抵债押物名称
      this.formdata.highPldAmt = this.$refs.refDebtTable1.selections[0].maxMortagageAmt; // 最高可抵质押金额
      this.formdata.guarCertCode = this.$refs.refDebtTable1.selections[0].guarCertCode; // 权属证件号
      this.formdata.pldimnPerson = this.$refs.refDebtTable1.selections[0].guarCusName; // 抵质押人名称
      this.formdata.pldimnStatus = this.$refs.refDebtTable1.selections[0].regState; // 抵押物状态
      this.authDialogVisible1 = false;
    },
    /* 基本信息金额更新 -----前端处理展示*/
    returnFn (data) {
      var _this = this;
      var loanAmt = 0;
      var loanBalance = 0;
      var totalTqlxAmt = 0;
      for (var i = 0; i < data.length; i++) {
        loanAmt = loanAmt + data[i].loanAmt;
        loanBalance = loanBalance + data[i].loanBalance;
        totalTqlxAmt = totalTqlxAmt + data[i].totalTqlxAmt;
        // _this.totalMoney = _this.totalMoney + data[i].resistCap + data[i].resistInt + data[i].resistExpense;
      }
      _this.formdata1.loanAmt = loanAmt; // 贷款金额
      _this.formdata1.loanBalance = loanBalance; // 贷款余额
      _this.formdata1.totalTqlxAmt = totalTqlxAmt; // 拖欠利息

      _this.formdata.loanAmt = loanAmt; // 贷款金额
      _this.formdata.loanBalance = loanBalance; // 贷款余额
      _this.formdata.totalTqlxAmt = totalTqlxAmt; // 拖欠利息
    },
    //清空上一次的计算数据
    enterFn () {
      this.totalMoney = 0;
    },
    leaveFn () {
      var data = this.$refs.refTable.tabledata;
      for (var i = 0; i < data.length; i++) {
        this.totalMoney = this.totalMoney + Number(data[i].resistCap) + Number(data[i].resistInt) + Number(data[i].resistExpense);
      }
    },
    // 清空上级机 @param node 当前选中机构信息
    clearUpOrgFn () {
      this.formdata.upOrgCode = '';
    },

    /**
    借据保存
     */
    saveBillFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableBill.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = selectionsAry;
      for (var i = 0; i < model.length; i++) {
        model[i].appSerno = _this.formdata.appSerno;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawbillrel/saveContNo',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    /** 选择责任人后的处理方法 */
    selectedUserFn (model) {
      var _this = this;
      _this.formdata.managerId = model.loginCode;
    },
    /**
    * 选择责任机构
    * @param value 当前输入信息
    * @param nodeData 当前节点属性信息
    * @param node 当前节点信息
    */
    changeOrgFn (node) {
      this.selectValue1 = node.orgId;
      this.formdata.managerBrId = node.orgId;
      this.formdata.managerBrIdName = node.orgName;
    },
    /**
    * 选择责任机构
    * @param value 当前输入信息
    * @param nodeData 当前节点属性信息
    * @param node 当前节点信息
    */
    changeFinFn (node) {
      this.selectValue2 = node.orgId;
      this.formdata.finaBrId = node.orgId;
      this.formdata.finaBrName = node.orgName;
    },
    /* 返回 */
    backFn () {
      yufp.router.removeTab(this.$route.path);
    },
    /* 工作流提交成功后回调*/
    submitSuccess () {
      this.backFn();
    },
    /* 引入*/
    importFn () {
      var _this = this;
      _this.baseJParams = {condition: {cusId: _this.formdata.cusId, accStatus: 'accStatus'}};
      _this.authDialogVisible = true;
    },
    /* 选择借据后添加到数据库，并刷新列表 */
    selectedJDebtFn () {
      var _this = this;
      if (_this.$refs.refDebtTable.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var model = _this.$refs.refDebtTable.selections;
      var newArray = [];
      model.forEach(function (item) {
        item.pdraiSerno = _this.formdata1.pdraiSerno;
        item.totalTqlxAmt = item.debitInt + item.penalInt + item.compoundInt;
        item.curType = item.contCurType;
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabartplddebtbillrel/savedebt',
        // data: newArray,
        data: JSON.stringify(newArray),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.authDialogVisible = false;
            _this.$refs.refTable.remoteData();
            _this.$message.success('引入成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    /** 关闭引入页面 */
    cancel () {
      this.authDialogVisible = false;
    },
    /** 保存关联借据信息 */
    saveDebtFn () {
      var _this = this;
      let data = _this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabartplddebtbillrel/save',
        data: data,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /** 删除引入 */
    deleteDebtFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify({ 'ptbrSerno': _this.$refs.refTable.selections[0].ptbrSerno,
          'ptaiSerno': _this.$refs.refTable.selections[0].ptaiSerno}),
        url: this.$backend.cmisNpam + '/api/plabartplddebtbillrel/delete',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          }
        }
      });
    },
    /*
    提交审批
     */
    addFn () {
      var _this = this;
      var validate = true;
      _this.$refs.refForm.validate((volid) => {
        validate = volid;
      });
      if (!validate) {
        return;
      }
      if (_this.$refs.refTable.tabledata.length <= 0) {
        _this.$message.warning('关联借据信息列表缺少内容');
        return;
      }
      this.doSave();
      var bizType = 'BQ012'; // 以物抵债登记审批流程（非小微）
      const loginUser = _this.$xutils.getLoginUserInfo();
      const rolesList = loginUser.roles;
      var cusId = _this.formdata1.cusId;
      var cusName = _this.formdata1.cusName;
      rolesList.forEach(function (item) { // 后期根据实际的角色编号修改-2021-06-12 huujn
        if (item.code === 'R0010') { // 以物抵债登记审批流程（小微）
          bizType = 'BQ013';
        }
      });
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.formdata1.pdraiSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      startdto.param = {
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
      };
      // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
      _this.$refs.yufpNwfInit.wfInit(startdto);
      // this.pushRefTableRow();
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
     // 保存
    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
          validate = volid
      });
      if(!validate){
        return
      };
      _this.$refs.refTable.validate(fields => {
          validate = fields
      });
      if(validate){
        return
      };
      _this.formdata.approveStatus = '000';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabartplddebtappinfo/update',
        async: false,
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
      _this.saveDebtFn()
    },
    dataUrlFn (value) {
      console.log('value', value);
      if (value == '1') {
        this.dataDebtUrl1 = this.$backend.cmisBiz + '/api/guarbaseinfo/selectByCusId';
        this.baseJParams1 = {condition: JSON.stringify({cusId: this.formdata1.cusId})};
      } else {
        this.dataDebtUrl1 = this.$backend.cmisBiz + '/api/guarbaseinfo/all';
        this.baseJParams1 = {condition: JSON.stringify({approveStatus: '997'})};
      }
    }
  }
};
</script>
