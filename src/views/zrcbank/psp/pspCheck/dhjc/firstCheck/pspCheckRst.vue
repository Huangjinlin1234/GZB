<template>
  <!--
    @created by zhijunxiao 2021-06-10
    @description 首次检查-检查信息录入
  -->
  <div id="pspCheckRst">
    <yu-panel :title="viewTitle" :collapse-hide="false">
      <yu-row>
        <yu-col :sm="4" :xs="24">
          <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
            <yu-submenu index="1">
              <template slot="title">首次贷后检查</template>
              <yu-menu-item index="1-1"
                            :style="color['1-1'] && activeIndex === '1-1' ? color['1-1'] : 'color: #48576a;'">
                检查信息录入
              </yu-menu-item>
              <yu-menu-item index="1-2"
                            :style="color['1-2'] && activeIndex === '1-2' ? color['1-2'] : 'color: #48576a;'">
                首次检查报告
              </yu-menu-item>
              <yu-menu-item index="1-3"
                            :style="color['1-3'] && activeIndex === '1-3' ? color['1-3'] : 'color: #48576a;'">
                影像资料
              </yu-menu-item>
            </yu-submenu>
          </yu-menu>
        </yu-col>
        <!--检查任务信息展示-->
        <yu-col :sm="20" :xs="24">
          <yu-panel v-show="activeIndex === '1-1'" v-model="activeName" :collapse-hide="false">
            <yu-panel title="检查任务信息" :collapse-hide="false">
              <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
                <yu-xform-group :column="2">
                  <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
                  <!--任务类型 taskType-->
                  <yu-xform-item label="检查类型" disabled name="checkType" ctype="select"
                                 data-code="STD_ZB_CHECK_TYPE"></yu-xform-item>
                  <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button @click="checkFn(1)" type="primary">查看</yu-button>
                  </yu-xform-item>
                  <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
                  <yu-xform-item label="合同编号" disabled ctype="input" name="contNo" colspan="10"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button @click="checkFn(2)" type="primary">查看</yu-button>
                  </yu-xform-item>
                  <yu-xform-item label="借据编号" disabled ctype="input" name="billNo" colspan="10"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                    <yu-button @click="checkFn(3)" type="primary">查看</yu-button>
                  </yu-xform-item>
                  <yu-xform-item label="产品名称" disabled name="prdName"></yu-xform-item>
                  <yu-xform-item label="贷款金额(元)" disabled name="loanAmt"></yu-xform-item>
                  <yu-xform-item label="贷款起始日" disabled name="loanStartDate"></yu-xform-item>
                  <yu-xform-item label="贷款到日期" disabled name="loanEndDate"></yu-xform-item>
                  <yu-xform-item v-if="isGGShow" label="风险等级" disabled name="riskLvl"
                                 ctype="select" data-code="STD_CUST_RISK_STATUS"></yu-xform-item>
                  <yu-xform-item v-if="isGGShow" label="担保方式" disabled name="guarMode"
                                 ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                  <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
                  <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
                  <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
                  <yu-xform-item label="任务要求完成日期" disabled name="taskEndDt"></yu-xform-item>
                  <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select"
                                 data-code="STD_ZB_CHECK_STATUS"></yu-xform-item>
                  <yu-xform-item label="检查日期" disabled name="checkDate"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
            </yu-panel>
            <yu-panel title="检查录入信息" :collapse-hide="false">
              <yu-xform ref="jclrForm" v-model="jclrData" label-width="180px" :rules="jclrRules">
                <yu-xform-group :column="2">

                  <yu-xform-item :disabled="isDisabled"  label="是否受托支付"
                                 name="isUntruPayType" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                 <yu-xform-item :disabled="isDetailDisabled" v-if="isGGShow" label="购销合同金额"
                                 :rules="{ required: isHaveTo, message: '字段不能为空' }"
                                 name="contAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
                  <yu-xform-item :disabled="isDetailDisabled" label="交易对手名称"
                                 :rules="{ required: isHaveTo, message: '字段不能为空' }"
                                 name="contTranName"></yu-xform-item>

                  <yu-xform-item :disabled="isDetailDisabled" rules="required" label="贷款用途及资金流向"
                                 name="contAgreedUse" ctype="textarea" colspan="24"></yu-xform-item>

                  <yu-xform-item :disabled="isDetailDisabled" :hidden="!isGGShow" rules="required" label="贷款资金是否存在回流"
                                 name="isCapBack" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>

                  <yu-xform-item :disabled="isDetailDisabled" :hidden="!isGGShow" rules="required" label="与授信用途是否一致"
                                 name="isLmtUse" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>

                  <yu-xform-item :disabled="isDetailDisabled" v-show="isGGShow" label="贷款资金流向说明"
                                 :rules="{ required: capFlowHaveTo , message: '字段不能为空' }"
                                 name="capFlowRemark" ctype="textarea" colspan="24"></yu-xform-item>


                  <yu-xform-item :disabled="isDetailDisabled" rules="required" :hidden="!isXWShow" label="是否落实抵质押或担保" name="isGuarImple"
                                 ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>

                  <yu-xform-item :disabled="isDetailDisabled" v-if="isXWShow" label="说明"
                                 :rules="{ required: remarkHaveTo, message: '字段不能为空' }"
                                 name="impleRemark" ctype="textarea" colspan="24"></yu-xform-item>


                  <yu-xform-item :disabled="isDetailDisabled" v-if="isGXXWShow" rules="required" label="约见人"
                                 name="relatedPersonnel" ctype="input"></yu-xform-item>
                  <yu-xform-item :disabled="isDetailDisabled" v-if="isXWShow" rules="required" label="检查地点"
                                 name="checkPlace"></yu-xform-item>
                  <yu-xform-item :disabled="isDetailDisabled" rules="required" label="检查结果及检查人意见"
                                 name="checkComment" ctype="textarea" colspan="24"></yu-xform-item>
                  <!--协查人录入信息 对公以及个人-需要-->
                  <yu-xform-item  v-if="isXCRShow || dgcrflage || show" rules="required" label="协查人意见"
                                 name="assistComment" ctype="textarea" colspan="24" :disabled="!dgcrflage"></yu-xform-item>
                  <yu-xform-item hidden rules="required" disabled label="协查人" name="assistId"
                                 ctype="select" :options="assist"  ></yu-xform-item>
                                 <yu-xform-item v-if="isXCRShow || dgcrflage || show" rules="required" disabled label="协查人" name="assistIdName"
                                 ctype="select" :options="assist"  ></yu-xform-item>
                  <yu-xform-item hidden rules="required" disabled label="协查机构" name="assistOrgId"
                                 ctype="select" :options="assistOrg"  ></yu-xform-item>
                                 <yu-xform-item v-if="isXCRShow || dgcrflage || show" rules="required" disabled label="协查机构" name="assistOrgIdName"
                                 ctype="select" :options="assistOrg"  ></yu-xform-item>
                  <yu-xform-item v-if="isXCRShow || dgcrflage || show" rules="required" disabled label="协查日期"
                                 name="assistDate" ></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
            </yu-panel>
            <div style="text-align:center;">
              <yu-toolBar>
                <yu-button v-if="saveFnShow" type="primary" @click="submitFn">提交</yu-button>
                <yu-button v-if="!detailPage || show" type="primary" @click="saveFn(true)">保存</yu-button>
                <yu-button type="primary" @click="returnFn">返回</yu-button>
              </yu-toolBar>
            </div>
          </yu-panel>
          <pspCheckReport v-if="activeIndex == '1-2'" ref="pspCheckReport"></pspCheckReport>
          <yu-panel v-if="activeIndex === '1-3'" v-model="activeName1" :collapse-hide="false" name="forth">
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
          </yu-panel>
        </yu-col>
      </yu-row>
      <yufpNwfInit ref="yufpNwfInit" @success-click="returnFn"></yufpNwfInit>
    </yu-panel>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import {mapGetters} from 'vuex';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_JCFS_TYPE,STD_RISK_USE_NEG,STD_ZB_YES_NO');
export default {
  name: 'PspCheckRst',
  props: {
    bizPageData: Object
  },
  components: {yufpNwfInit, pspCheckReport, imageSystem},
  data: function () {
    return {
      urls: {
        start: backend.workflowService + '/api/core/start',
        jump: backend.workflowService + '/api/core/jump'
      },
      viewTitle: '首次贷后检查', // 页面标题
      image: '1',
      taskData: {}, // 检查任务信息
      jclrData: {}, // 检查录入信息
      jclrRules: {}, // 检查录入规则
      xcrFlag: false, // 是否协查人查看
      dggrFlag: false, // 是否对公及个人经营性
      grxfFlag: false, // 是否个人消费性
      xwjyFlag: false, // 是否小微经营
      xwxfFlag: false, // 是否小微消费
      detailPage: false, // 是否查看页面
      color: [],
      show: false,
      activeIndex: '1-1', // 默认展示页面
      activeName: {}, // 展示页面
      updateFlag: false, // 是否更新
      pageName: '', // 处于哪个页面，传给流程页面使用
      assistOrg: [], // 协查机构名称和id
      assist: [], // 协查人名称和id
      actionFlag: false, // 页面数据是否已经操作成功
      imageBizParam: [],
      taskNo: '',
      billNo: '',
      dgcrflage: false,
      timexie: this.$xutils.dateFormat('yyyy-MM-dd', new Date())
    };
  },
  created () {
    // 判断是否展示协查人
    var _this = this;
    if (typeof _this.bizPageData !== 'undefined') {
      var params = _this.bizPageData.instanceInfo.param;
      if (params.checkType == '11' || params.checkType == '12') {
        _this.show = true;
      }
      if (params.pageName === 'dggr' || params.pageName === 'xcr') {
        const loginUser = this.$xutils.getLoginUserInfo();
        const dutysList = loginUser.dutys;
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12
            let item = dutysList[i];
            if (item.code === 'FZH01' || item.code === 'DHH01' || item.code === 'SGH01' || item.code === 'XWB01' || item.code === 'FZH02') { // 客户经理
              this.dgcrflage = true;
            }
          };
        }
      }
    }
  },
  mounted () {
    // 初始化参数
    this.init();
    this.jclrData.assistDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
    this.jclrData.assistIdName = this.userName;
    this.jclrData.assistId = this.userId;
    this.jclrData.assistOrgId = this.org.code;
    this.jclrData.assistOrgIdName = this.org.name;
  },
  computed: {
    ...mapGetters([
      'userCode', 'userName', 'org', 'instu', 'userId'
    ]),
    isHaveTo: function () {
      return this.jclrData.isUntruPayType === '1';
    },
    capFlowHaveTo: function () {
      return this.jclrData.isCapBack === '1' || this.jclrData.isLmtUse === '0';
    },
    remarkHaveTo: function () {
      return this.jclrData.isGuarImple === '0';
    },
    isDisabled: function () {
      return this.xwxfFlag || this.grxfFlag || this.detailPage || this.xcrFlag;
    },
    isDetailDisabled: function () {
      return this.detailPage || this.xcrFlag;
    },
    isGGShow: function () {
      return this.dggrFlag;
    }, // 对公及个人经营性 展示
    isXCRShow: function () {
      return this.xcrFlag;
    }, // 协查人 展示
    isGXXWShow: function () {
      return this.grxfFlag || this.xwjyFlag || this.xwxfFlag;
    }, // 个人消费性+小微 展示
    isGXShow: function () {
      return this.grxfFlag;
    }, // 个人消费性 展示
    isXWShow: function () {
      return this.xwjyFlag || this.xwxfFlag;
    }, // 小微 展示
    saveFnShow: function () {
      return !(this.xcrFlag || this.detailPage);
    } // 提交按钮 展示
  },
  methods: {
    // 初始化页面数据
    init: function () {
      const _this = this;
      let params = {};
      if (_this.jclrData.isUntruPayType == '0') {

      }
      // 从流程页面跳转后，页面数据初始化
      if (typeof _this.bizPageData !== 'undefined') {
        params = _this.bizPageData.instanceInfo.param;
        _this.taskNo = _this.bizPageData.instanceInfo.bizId;

        _this.billNo = params.taskData.billNo;
        _this.cusId = _this.bizPageData.instanceInfo.bizUserId;
        _this.image = '2';

        //   if (params.pageName === 'dggr' || params.pageName === 'xcr') {

        // }
        _this.fromBizPage(params);
        _this.$route.params.taskNo = _this.taskNo;
        _this.$route.params.rptName = params.rptName;
        console.log('_this.$route.params.taskNo', _this.$route.params.taskNo);
        console.log('_this.$route.params.rptName', _this.$route.params.rptName);
      } else {
        let params = _this.$route.meta.params;
        _this.taskNo = params.pspTask.taskNo;
        _this.billNo = params.pspTask.billNo;
        _this.cusId = params.pspTask.cusId;
        if (params.status == 'detail') {
          _this.image = '2';
        }
        // 从贷后检查任务页面跳转后，页面数据初始化
        _this.fromPspTaskPage(params);
      }
      // 页面标题初始化
      if (params.pageName === 'dggr' || params.pageName === 'xcr') {
        this.viewTitle = '首次贷后检查(对公及个人经营性)';
      } else if (params.pageName === 'grxf') {
        this.viewTitle = '首次贷后检查(个人消费性)';
      } else if (params.pageName === 'xwjy') {
        this.viewTitle = '首次贷后检查(小微经营性)';
      } else if (params.pageName === 'xwxf') {
        this.viewTitle = '首次贷后检查(小微消费性)';
      }
      this.imageBizParam = [{
        'top_outsystem_code': 'DHJC',
        'outsystem_code': 'DHJC05,DHJC06',
        'index': {
          'businessid': _this.taskNo,
          'billno': _this.billNo,
          'custid': _this.cusId
        }
      }];
    },
    // 从贷后检查任务页面跳转后，页面数据初始化
    fromPspTaskPage: function (params) {
      const _this = this;
      if (typeof params !== 'undefined' && JSON.stringify(params) !== '{}') {
        yufp.clone(params.pspTask, _this.taskData);
        _this.detailPage = params.status === 'detail';
        let pageName = params.pageName + 'Flag';
        _this.pageName = params.pageName;
        _this[pageName] = true;
        // 从借据信息中获取 是否受托支付
        _this.getIsUntruPayType(params.pspTask.billNo);
        // 初始化检查录入信息并判断【检查录入信息】是更新还是新增
        _this.getJclrData(params.pspTask.taskNo);
      }
    },
    // 从流程页面跳转后，页面数据初始化
    fromBizPage: function (params) {
      const _this = this;
      yufp.clone(params.taskData, _this.taskData);
      _this.$route.params.taskNo = params.taskData.taskNo;
      _this.$route.params.rptName = params.rptName;
      // yufp.clone(params.jclrData, _this.jclrData);
      // 查询录入信息 并设置【检查录入信息】为更新
      _this.getJclrData(params.taskData.taskNo);
      let pageName = params.pageName + 'Flag';
      _this[pageName] = true;
      if (params.pageName !== 'xcr') {
        _this.detailPage = true;
      } else {
        // 协查人走这段逻辑
        let orgInfo = {};
        orgInfo.key = _this.org.code;
        orgInfo.value = _this.org.name;
        _this.assistOrg.push(orgInfo);
        let assistInfo = {};
        assistInfo.key = _this.userCode;
        assistInfo.value = _this.userName;
        _this.assist.push(assistInfo);
        _this.$nextTick(() => {
          // _this.jclrData.assistId = _this.userCode;
          // _this.jclrData.assistOrgId = _this.org.code;
          // _this.jclrData.assistDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
          _this.detailPage = false;
        });
      }
    },
    // 从借据信息中获取 是否受托支付
    getIsUntruPayType: function (params) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/accloan/selectbillno/' + params,
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            if (response.data !== null) {
              _this.jclrData.isUntruPayType = response.data.isBeEntrustedPay;// 是否受托支付
            }
          } else {
            console.log('是否受托支付-获取失败');
          }
        },
        error: (result, b) => {
          console.log('是否受托支付-获取失败');
        }
      });
    },
    // 根据TaskNo获取检查录入信息 并 判断【检查录入信息】是更新还是新增
    getJclrData: function (params) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        data: {taskNo: params},
        url: _this.$backend.cmisPsp + '/api/pspcheckrst/querySingle',
        type: 'post',
        success: (response, status, xhr) => {
          if (response.data != null) {
            yufp.clone(response.data, _this.jclrData);
            _this.updateFlag = true;
          } else {
            console.log('2');
          }
        },
        error: (result, b) => {
          console.log('失败'); // 弹出提示
        }
      });
    },
    // 查看
    checkFn: function (op) {
      var _this = this;
      if (op == 1) {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
          data: _this.taskData.cusId,
          callback: function (code, message, response) {
            if (code == 0) {
              let json = {};
              let title = '';
              let name = '';
              let key = '';
              json['cusId'] = _this.taskData.cusId;
              if (response.data.cusCatalog == '1') {
                json['op'] = 'VIEW';
                title = '个人客户查看';
                name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
                // 个人正式客户创建 B01
                key = new Date().getTime();
                json.key = `/${name}/${key}`;
              } else if (response.data.cusCatalog == '2') {
                json['viewType'] = 'VIEW';
                title = '对公客户查看';
                name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
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
      } else if (op == 3) {
        var params = {};
        // 贷款台账模块
        yufp.service.request({
          method: 'post',
          url: _this.$backend.cmisBiz + '/api/accloan/selectbillno/' + _this.taskData.billNo,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, params);
              params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
              params['op'] = 'VIEW';
              params['bill_no'] = params.billNo;
              _this.$dialog.open(
                '贷款台账',
                'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                -1,
                -1,
                params
              );
            }
          }

        });
      } else if (op == 2) {
        _this.$router.addTab({
        // 路由名称
          name: 'zrcbank/psp/pspCheck/pspCheckctrLoanContDetail',
          // 自定义唯一页签key
          key: 1 + new Date().getTime(), // 必传
          // 页签名称
          title: '合同编号',
          // 传递的业务数据，可选配置
          data: _this.taskData
        });
      }
    },
    // 提交流程
    submitFn: function () {
      let _this = this;
      let validate = false;
      _this.$refs.jclrForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      // 保存/更新数据
      this.saveFn(false);
      if (_this.actionFlag) {
        // 开始提交流程
        const loginUser = _this.$xutils.getLoginUserInfo();
        const orgType = loginUser.org.orgType;
        // 提交流程
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.orgCode;
        startdto.userId = loginUser.loginCode;
        var bizType = '';
        if (_this.pageName == 'dggr') { // 对公及个人经营性
          // startdto.param.pageName = 'xcr'; // 从下面注释代码copy,未理清逻辑，发起流程后，从待办进入都是协查人？
          if (orgType == 'A') {
            if (loginUser.orgCode.startsWith('80')) {
              bizType = 'SGK01';// 首次贷后检查-对公及个人经营性（寿光）
            } else if (loginUser.orgCode.startsWith('81')) {
              bizType = 'DHK01';// 首次贷后检查-对公及个人经营性（东海）
            }
          } else {
            bizType = 'DH001';
          }
        } else if (_this.pageName == 'xwjy') { // 小微经营性
          bizType = 'DH002';
        } else if (_this.pageName == 'grxf') { // 个人消费性
          if (orgType == 'A') {
            if (loginUser.orgCode.startsWith('80')) {
              bizType = 'SGK02';// 首次贷后检查-个人消费性（寿光
            } else if (loginUser.orgCode.startsWith('81')) {
              bizType = 'DHK02';// 首次贷后检查-个人消费性（东海）
            }
          } else {
            bizType = 'DH004';
          }
        } else if (_this.pageName == 'xwxf') { // 小微消费性
          bizType = 'DH003';
        } else {
          this.$xutils.showMsgBox('提示', '流程业务类型未配置');
          return;
        }
        if (bizType == 'DH003' || bizType == 'DH002') {
          // 查询分中心负责人
          yufp.service.request({
            method: 'POST',
            async: false,
            url: _this.$backend.cmisBiz + '/api/xwcommonservice/getcentermanageridinfo',
            data: {managerId: loginUser.loginCode},
            callback: function (code, message, response) {
              if (response.code == '0') {
                startdto.bizParam1 = response.data.userCode;// 分中心负责人
              }
            }
          });
        }
        startdto.bizId = _this.taskData.taskNo; // 主键号
        startdto.bizUserName = _this.$route.meta.params.pspTask.cusName;
        startdto.bizUserId = _this.$route.meta.params.pspTask.cusId;
        startdto.param = {
          // jclrData: _this.jclrData,
          checkType: _this.$route.meta.params.pspTask.checkType,
          taskData: _this.taskData,
          pageName: _this.pageName,
          billNo: _this.$route.meta.params.pspTask.billNo,
          rptName: _this.$route.meta.params.rptName,
          index: {
            'businessid': _this.taskNo,
            'billno': _this.billNo
          },
          topOutsystemCode: 'DHJC'

        };
        startdto.bizType = bizType;
        _this.$refs.yufpNwfInit.wfInit(startdto);
        // 对公及个人经营性走这段
        // if (_this.pageName === 'dggr') {
        //   console.log('111111');
        //   startdto.param.pageName = 'xcr';
        //   this.$xutils.request({
        //     // 同步请求
        //     async: false,
        //     url: _this.urls.start,
        //     data: startdto,
        //     type: 'post',
        //     success: (response, status, xhr) => {
        //       if (response.code === '0') {
        //         if (response.data.flowStarterName) {
        //           _this.$message({
        //             message: response.data.flowStarterName + '成功发起@' + response.data.flowName,
        //             type: 'success',
        //             duration: 6000
        //           });
        //         }
        //       } else {
        //         this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
        //       }
        //     }
        //   });
        // }
        this.$xutils.showMsgBox('提示', '操作完成', 500, 140, () => {
          // this.returnFn();
        });
      } else {
        console.error('数据操作失败！无法提交流程！');
      }
    },
    // 保存/更新数据
    saveFn: function (msgBox) {
      const _this = this;

      // 拼接数据
      let data = _this.jclrData;
      data.taskNo = _this.taskData.taskNo;
      // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
      if (!_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisPsp + '/api/pspcheckrst/insert',
          data: data,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
              // 更新状态 为 已保存
              _this.updateFlag = true;
              let uData = {pkId: _this.taskData.pkId, checkStatus: '2'};
              _this.updateStatus(uData);
              if (msgBox) {
                this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
                });
              }
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      } else if (_this.updateFlag) {
        // 如果检查结果表里有数据（this.updateFlag=true），那么就更新这条检查结果
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisPsp + '/api/pspcheckrst/update',
          data: JSON.stringify(_this.jclrData),
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
              // 自动刷新列表数据
              if (msgBox) {
                this.$xutils.showMsgBox('提示', '更新成功！', 500, 140, () => {
                });
              }
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
    },
    // 更新状态
    updateStatus: function (uData) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptasklist/updatebycondition',
        data: JSON.stringify(uData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            console.log('更新状态成功');
          } else {
            console.error('更新状态失败');
            console.error(response);
          }
        }
      });
    },
    // 返回
    returnFn: function () {
      console.log('返回！');
      yufp.frame.removeTab(this.$route.path);
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
    }

  }
};
</script>

<style scoped>

</style>
