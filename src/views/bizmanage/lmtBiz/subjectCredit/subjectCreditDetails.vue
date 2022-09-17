<template>
  <div class="container">
    <el-row>
      <el-col :span="3">
        <yu-tree class="filter-tree" :data="menu" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree2" node-key="id" highlight-current>
        </yu-tree>
      </el-col>
      <el-col :span="21">
        <div ref="refChildren" :is="currentView" :children="children" @labelChange="onLabelChange" @changed="cancelFn"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_PRD_BIZ_TYPE');
import proBondInvest from './projectInformation/bondInvest';
import proBondPool from './projectInformation/bondPool';
import proFinanceOther from './projectInformation/financeOther';
import proNoStandardInvest from './projectInformation/noStandardInvest';
import guarantSituation from './guarantSituation';
import bussiness from './bussinessInformation/bussiness';
import customer from './bussinessInformation/customer';
import proAssetBacked from './projectInformation/proAssetBacked';
import addLoanProject from './loanInformation/addLoanProject';
import loanProject from './loanInformation/loanProject';
import nonLoanProject from './loanInformation/nonLoanProject';
import proAssetSubInfo from './loanInformation/proAssetSubInfo';
import basicInfoSubjects from './subjectAnalyse/basicInfoSubjects';
import assetManageBaseInfo from './assetManageInformation/assetManageBaseInfo';
import assetManageDetails from './assetManageInformation/assetManageDetails';
import proInfoSubjects from './assetManageInformation/proInfoSubjects';
import stockSituation from './stockSituation/stockSituation';
import subBondInvest from './subjectAnalyse/bondInvest';
import subBondPool from './subjectAnalyse/bondPool';
import subFinanceOther from './subjectAnalyse/financeOther';
import guarantAnalyse from './guarantAnalyse';
import totalConclusion from './totalConclusion';
import reconsiderList from './reconsiderList';
import totalReport from './totalReport';
import changeApplication from './changeApplication';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
import { imageSystem } from '@/utils/unitchange';
export default {
  name: 'Templetfactory',
  components: {
    proBondInvest,
    proBondPool,
    proFinanceOther,
    proNoStandardInvest,
    guarantSituation,
    bussiness,
    customer,
    proAssetBacked,
    addLoanProject,
    loanProject,
    nonLoanProject,
    proAssetSubInfo,
    basicInfoSubjects,
    assetManageBaseInfo,
    assetManageDetails,
    proInfoSubjects,
    stockSituation,
    subBondInvest,
    subBondPool,
    subFinanceOther,
    guarantAnalyse,
    totalConclusion,
    reconsiderList,
    totalReport,
    changeApplication,
    coopApprovalIndex
  },
  props: {
    bizPageData: Object,
    pageParams: {
      type: Object,
      default: function () {
        return {};
      }
    },
    dialogId: String,
    modelGroupNo: String
  },
  data () {
    return {
      menu: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      show: 1,
      saveBtnShow: false,
      customer: '',
      activeName: 'first',
      refreshBuild: false,
      currentView: 'projectSituation',
      children: Object,
      serno: String,
      guarDescExt: '',
      appType: ''
    };
  },
  mounted () {
    // 产品类型字典项
    // 债券池4001                           02 proBondPool
    // 债券投资4002                         01  proBondInvest
    // 资产-其他4003 （资管计划）                        07
    // 资产-债权融资计划、理财直融工具4004    05
    // 净值型产品4005                       07 assetManageBaseInfo
    // 资产证券化产品（标准）4006             03 proAssetBacked
    // 资产证券化产品（非标）4007             03
    // 其他标准化债权投资4008                01
    // 债务融资工具（投资）4009              05 proNoStandardInvest
    // 理财直融工具（投资）4010              05
    // 结构化融资4011                       04 proFinanceOther
    // 其他非标债权投资4012                  04
    // 债权融资计划（承销）16010101          05
    // 理财直融工具（承销）16020101          05
    console.log("流程挂载bizPageData================>>>>>>>>>>>>", this.bizPageData)
    // 判断是否流程
    var biz = this.bizPageData;
    if (biz == 'undefined' || biz == null || biz == '') {
    // 弹窗
      if (this.pageParams.serno) {
        console.log('===================弹窗', this.pageParams);
        let pageParams = this.pageParams;
        this.serno = pageParams.serno;
        this.cusId = pageParams.cusId;
        this.customer = Number(pageParams.cusCatalog); // 2企业法人 3同业客户
        this.op = pageParams.op; // 按钮状态
        this.lmtBizType = pageParams.lmtBizType; // 申请类型
        this.proName = pageParams.proName; // 项目名称
        this.proNo = pageParams.proNo;
      } else if (this.$route.meta.params) {
        // 标签页
        console.log('===================标签页', this.$route.meta.params);
        let params = this.$route.meta.params;
        this.serno = params.serno;
        this.cusId = params.cusId;
        this.customer = Number(params.cusCatalog); // 2企业法人 3同业客户
        this.op = params.op; // 按钮状态
        this.lmtBizType = params.lmtBizType; // 产品类型
        this.proName = params.proName; // 项目名称
        this.proNo = params.proNo;
      } else {
        this.$message({
          message: '数据发生错误！',
          type: 'error'
        });
        this.$store.dispatch('tagsView/delView', this.$route);
        this.$router.go(-1);
      }
    } else {
      // 流程页面跳转
      let bizPageParams;
      if(biz.instanceInfo){
        bizPageParams = biz.instanceInfo.param ? biz.instanceInfo.param : biz.instanceInfo.params;
      }else{
        bizPageParams = biz;
      }
      let json
      if(!bizPageParams.lmtBizType){
        let obj = {
          instanceIds: bizPageParams.instanceId ? [bizPageParams.instanceId] : [biz.instanceInfo.instanceId],
          type: 0
        }
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.appOcaService + '/api/core/getInstanceInfoBatch',
          data: obj,
          callback: function (code, message, response) {
            if (code == '0') {
              console.log("开会投票=====================>>>>>", response);
              json = JSON.parse(response.data[0].flowParam);
              this.appType = json.appType
            }else{
              this.$message({
                message: '数据发生错误！',
                type: 'error'
              });
            }
          }
        });
      }

      this.serno = bizPageParams.serno ? bizPageParams.serno : bizPageParams.bizId;
      this.cusId = bizPageParams.cusId ? bizPageParams.cusId : bizPageParams.bizUserId;
      this.customer = bizPageParams.cusCatalog ? Number(bizPageParams.cusCatalog) : Number(json.cusCatalog); // 2企业法人 3同业客户
      this.op = 'look'; // 按钮状态
      this.lmtBizType = bizPageParams.lmtBizType ? bizPageParams.lmtBizType : json.lmtBizType; // 申请类型
      this.proName = bizPageParams.proName; // 项目名称
      this.proNo = bizPageParams.proNo;//项目编号
    }
    // 默认展示第一个
    let data = {};
    data.id = '2-1';
    this.handleNodeClick(data);
    this.menuRecursion();
  },
  created () {},
  watch: {
    // 监听申请流水号改变
    serno (val) {
      if (val) {
        // 默认展示第一个
        // let data = {};
        // data.id = "2-1";
        // this.handleNodeClick(data);
      } else {
        this.$message({
          message: '数据发生错误！',
          type: 'error'
        });
        this.$store.dispatch('tagsView/delView', this.$route);
        this.$router.go(-1);
      }
    }
  },
  methods: {
    // 菜单栏
    menuRecursion () {
      if (
        this.lmtBizType == '4002' ||
        this.lmtBizType == '4008' ||
        this.lmtBizType == '4004' ||
        this.lmtBizType == '4009' ||
        this.lmtBizType == '4010' ||
        this.lmtBizType == '16010101' ||
        this.lmtBizType == '16020101'
      ) {
        this.menu = [
          {
            id: '1',
            label: '资金业务授信',
            children: [
              {
                id: '2',
                label: '项目信息',
                children: [
                  {
                    id: '2-1',
                    label: '项目基本情况'
                  },
                  {
                    id: '2-2',
                    label: '担保及增信情况'
                  }
                ]
              },
              {
                id: '3',
                label: '分析报告',
                children: [
                  {
                    id: '3-1',
                    label: '企业情况分析',
                    children: [
                      {
                        id: '3-1-1',
                        label: '企业信息'
                      },
                      {
                        id: '3-1-2',
                        label: '存量业务情况'
                      },
                      {
                        id: '3-1-3',
                        label: '主体分析'
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '担保人情况分析'
                  }
                ]
              },
              {
                id: '4',
                label: '总体调查结论'
              },
              {
                id: '5',
                label: '调查报告'
              },
              {
                id: '6',
                label: '影像资料'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4001') {
        this.menu = [
          {
            id: '1',
            label: '资金业务授信',
            children: [
              {
                id: '2',
                label: '项目信息',
                children: [
                  {
                    id: '2-1',
                    label: '项目基本情况'
                  }
                ]
              },
              {
                id: '3',
                label: '分析报告',
                children: [
                  {
                    id: '3-1',
                    label: '企业情况分析',
                    children: [
                      {
                        id: '3-1-1',
                        label: '企业信息'
                      },
                      {
                        id: '3-1-2',
                        label: '存量业务情况'
                      },
                      {
                        id: '3-1-3',
                        label: '主体分析'
                      }
                    ]
                  }
                ]
              },
              {
                id: '4',
                label: '总体调查结论'
              },
              {
                id: '5',
                label: '调查报告'
              },
              {
                id: '6',
                label: '影像资料'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4012' || this.lmtBizType == '4011') {
        this.menu = [
          {
            id: '1',
            label: '资金业务授信',
            children: [
              {
                id: '2',
                label: '项目信息',
                children: [
                  {
                    id: '2-1',
                    label: '项目基本情况'
                  },
                  {
                    id: '2-2',
                    label: '担保及增信情况'
                  }
                ]
              },
              {
                id: '3',
                label: '分析报告',
                children: [
                  {
                    id: '3-1',
                    label: '企业情况分析',
                    children: [
                      {
                        id: '3-1-1',
                        label: '企业信息'
                      },
                      {
                        id: '3-1-2',
                        label: '存量业务情况'
                      },
                      {
                        id: '3-1-3',
                        label: '主体分析',
                        children: [
                          {
                            id: '3-1-3-1',
                            label: '经营情况'
                          },
                          {
                            id: '3-1-3-2',
                            label: '融资、对外担保、或有负'
                          },
                          {
                            id: '3-1-3-3',
                            label: '财务状况'
                          },
                          {
                            id: '3-1-3-4',
                            label: '其他情况'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '担保人情况分析'
                  }
                ]
              },
              {
                id: '4',
                label: '总体调查结论'
              },
              {
                id: '5',
                label: '调查报告'
              },
              {
                id: '6',
                label: '影像资料'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4006' || this.lmtBizType == '4007') {
        this.menu = [
          {
            id: '1',
            label: '资金业务授信',
            children: [
              {
                id: '2',
                label: '项目信息',
                children: [
                  {
                    id: '2-1',
                    label: '项目基本情况'
                  },
                  {
                    id: '2-2',
                    label: '担保及增信情况'
                  }
                ]
              },
              {
                id: '3',
                label: '分析报告',
                children: [
                  {
                    id: '3-1',
                    label: '委托人/原始权益人情况分析',
                    children: [
                      {
                        id: '3-1-1',
                        label: '企业信息'
                      },
                      {
                        id: '3-1-2',
                        label: '存量业务情况'
                      },
                      {
                        id: '3-1-3',
                        label: '主体分析'
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '底层资产分析',
                    children: [
                      {
                        id: '3-2-1',
                        label: '总体情况分析'
                      },
                      {
                        id: '3-2-2',
                        label: '底层基础资产明细'
                      }
                    ]
                  }
                ]
              },
              {
                id: '4',
                label: '总体调查结论'
              },
              {
                id: '5',
                label: '调查报告'
              },
              {
                id: '6',
                label: '影像资料'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4003' || this.lmtBizType == '4005') {
        this.menu = [
          {
            id: '1',
            label: '资金业务授信',
            children: [
              {
                id: '2',
                label: '项目信息',
                children: [
                  {
                    id: '2-1',
                    label: '项目基本情况'
                  },
                  {
                    id: '2-2',
                    label: '担保及增信情况'
                  }
                ]
              },
              {
                id: '3',
                label: '分析报告',
                children: [
                  {
                    id: '3-1',
                    label: '管理人情况分析',
                    children: [
                      {
                        id: '3-1-1',
                        label: '企业信息'
                      },
                      {
                        id: '3-1-2',
                        label: '存量业务情况'
                      },
                      {
                        id: '3-1-3',
                        label: '主体分析'
                      }
                    ]
                  },
                  {
                    id: '3-1.5',
                    label: '产品分析'
                  },
                  {
                    id: '3-2',
                    label: '底层资产分析'
                  }
                ]
              },
              {
                id: '4',
                label: '总体调查结论'
              },
              {
                id: '5',
                label: '调查报告'
              },
              {
                id: '6',
                label: '影像资料'
              }
            ]
          }
        ];
      }
      let appType = '';

      if(appType == '' || appType == null || appType == undefined){
        if (this.pageParams.serno) {
          appType = this.pageParams.appType;
        }
      }
      if(appType == '' || appType == null || appType == undefined){
        if (this.$route.meta.params) {
          appType = this.$route.meta.params.appType;
        }
      }
      if(appType == '' || appType == null || appType == undefined){
        if (this.bizPageData) {
          appType = this.bizPageData.appType ? this.bizPageData.appType : this.bizPageData.instanceInfo.param.appType;
        }
      }
      if(appType == '' || appType == null || appType == undefined){
        appType = this.appType;
      }
      if (appType == '05') {
        let obj = {
          id: '3-1-4',
          label: '复议申请表'
        };
        this.menu[0].children.push(obj);
      }else if(appType == '02'){
        let obj = {
          id: '3-1-5',
          label: '变更申请书'
        };
        this.menu[0].children.push(obj);
      }

      let obj = {
        id: '7',
        label: '流程轨迹'
      }
      this.menu[0].children.push(obj);
    },
    // 菜单栏点击事件
    handleNodeClick (data) {
      let lmtBizType = this.lmtBizType;
      this.children = {
        serno: this.serno,
        cusId: this.cusId,
        op: this.op,
        customer: this.customer, // 企业法人2 同业客户3
        proName: this.proName,
        proNo: this.proNo
      };
      console.log('=======================lmtBizType====children', lmtBizType, this.children);
      if (this.guarDescExt) {
        this.children.guarDescExt = this.guarDescExt;
      }
      if (data.id == '2-1') {
        if (lmtBizType == '4002' || lmtBizType == '4008') {
          this.currentView = 'proBondInvest';
        } else if (lmtBizType == '4001') {
          this.currentView = 'proBondPool';
        } else if (lmtBizType == '4012' || lmtBizType == '4011' || lmtBizType == '16010101' || lmtBizType == '16020101') {
          this.currentView = 'proFinanceOther';
        } else if (lmtBizType == '4006' || lmtBizType == '4007') {
          this.currentView = 'proAssetBacked';
        } else if (lmtBizType == '4003' || lmtBizType == '4005') {
          this.currentView = 'assetManageBaseInfo';
        } else if (
          lmtBizType == '4004' ||
          lmtBizType == '4009' ||
          lmtBizType == '4010'
        ) {
          this.currentView = 'proNoStandardInvest';
        }
      } else if (data.id == '2-2') {
        this.currentView = 'guarantSituation';
      } else if (data.id == '3-1-1') {
        if(this.lmtBizType == '4006' || this.lmtBizType == '4007'){
          this.children.showCus = true
        }else{
          this.children.showCus = false
        }
        if(this.lmtBizType == '4003' || this.lmtBizType == '4005' || this.lmtBizType == '4006' || this.lmtBizType == '4007'){
          this.children.admit = true
        }else{
          this.children.admit = false
        }
        this.currentView = this.customer == 2 ? 'bussiness' : 'customer'; // 企业法人2 同业客户3
      } else if (data.id == '3-1-2') {
        this.currentView = 'stockSituation';
      } else if (data.id == '3-1-3') {
        if (lmtBizType == '4002' || lmtBizType == '4008' || lmtBizType == '4004' || lmtBizType == '4009' || lmtBizType == '4010' || lmtBizType == '16010101' || lmtBizType == '16020101') {
          this.children.customer = 2;
          this.currentView = 'subBondInvest';
        } else if (lmtBizType == '4001') {
          this.currentView = 'subBondPool';
        } else if (lmtBizType == '4003' || lmtBizType == '4005' || lmtBizType == '4006' || lmtBizType == '4007') {
          this.currentView = 'basicInfoSubjects';
        }
      } else if (data.id == '3-1-4') {
        this.currentView = 'reconsiderList';
      } else if(data.id == '3-1-5'){
        this.currentView = 'changeApplication';
      } else if (data.id == '3-1.5') {
        this.currentView = 'proInfoSubjects';
      } else if (data.id == '3-2') {
        this.currentView = 'guarantAnalyse';
        if (lmtBizType == '4003' || lmtBizType == '4005') {
          this.currentView = 'assetManageDetails';
        }
      } else if (data.id == '4') {
        this.currentView = 'totalConclusion';
      } else if (data.id == '5') {
        this.children.lmtBizType = this.lmtBizType;
        this.currentView = '';
        this.$nextTick(() => {
          this.currentView = 'totalReport';
        });
      } else if (data.id == '6') {
        let params;
        if(this.pageParams.serno){
          params = this.pageParams;
        }else if(this.$route.meta.params){
          params = this.$route.meta.params;
        }else if(this.bizPageData.serno){
          params = this.bizPageData;
        }else if(this.bizPageData.instanceInfo.param){
          let instanceInfo = this.bizPageData.instanceInfo
          params = instanceInfo.param ? instanceInfo.param : instanceInfo.params;
        }
        let imageBizParam = [
          {
            // TODO 根据实际业务场景修正
            // top_outsystem_code: 'DGKHZL',
            top_outsystem_code: 'XXD_ZJTY',
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
        imageSystem (imageBizParam, "1", "import;download").then(res => {
          window.open(res);
        })

      } else if (data.id == '3-1-3-1') {
        if (lmtBizType == '4012' || lmtBizType == '4011') {
          this.children.subType = '1';
          this.currentView = '';
          this.$nextTick(() => {
            this.currentView = 'subFinanceOther';
          });
        }
      } else if (data.id == '3-1-3-2') {
        if (lmtBizType == '4012' || lmtBizType == '4011') {
          this.children.subType = '2';
          this.currentView = '';
          this.$nextTick(() => {
            this.currentView = 'subFinanceOther';
          });
        }
      } else if (data.id == '3-1-3-3') {
        if (lmtBizType == '4012' || lmtBizType == '4011') {
          this.currentView = 'subBondInvest';
        }
      } else if (data.id == '3-1-3-4') {
        if (lmtBizType == '4012' || lmtBizType == '4011') {
          this.children.subType = '3';
          this.currentView = '';
          this.$nextTick(() => {
            this.currentView = 'subFinanceOther';
          });
        }
      } else if (data.id == '3-2-1') {
        this.currentView = '';
        this.$nextTick(() => {
          this.currentViewLoanChange();
        });
      } else if (data.id == '3-2-2') {
        this.currentView = '';
        this.$nextTick(() => {
          this.currentView = 'proAssetSubInfo';
        });
      } else if(data.id == '7'){
        this.children.serno = this.serno;
        this.currentView = 'coopApprovalIndex';
      }
    },

    currentViewLoanChange () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestbasicinfo/selectBySerno',
        data: {
          serno: _this.serno,
          cusId: _this.cusId
        },
        callback: function (code, message, response) {
          if (code == '0') {
            if (response.data == null || response.data == '') {
              _this.currentView = 'addLoanProject';
            } else if (response.data.basicAssetType == '40') {
              _this.currentView = 'loanProject';
            } else {
              _this.currentView = 'nonLoanProject';
            }
          }
        }
      });
    },

    /**
     * 担保增信情况 是否显示
     * @param showStatus
     */
    onLabelChange: function(showStatus){
      let obj = {
        id: '2-2',
        label: '担保及增信情况'
      }
      let length = this.menu[0].children[0].children.length;
      if (showStatus == 1 && length < 2) {
        this.menu[0].children[0].children.push(obj);
      } else if (showStatus == 0 && length > 1) {
        this.menu[0].children[0].children.pop();
      }
    },

    cancelFn (msg) {
      if (msg) {
        console.log('=============================>>>', msg);
        this.guarDescExt = msg;
        if (msg == 'addLoanProject') {
          this.$nextTick(() => {
            this.currentViewLoanChange();
          });
        }
      } else {
        yufp.globalEventBus.$emit('refreshBizInvestTable1');
        if (this.pageParams.serno) {
          this.$dialog.close(this.dialogId); // 弹窗 关闭
        } else {
          yufp.router.removeTab(this.$route.path);
        }
      }
    }
  }
};
</script>

<style scoped>
/* .container {
  display: flex;
  padding: 20px;
}
.right {
  flex: 1;
} */
</style>
