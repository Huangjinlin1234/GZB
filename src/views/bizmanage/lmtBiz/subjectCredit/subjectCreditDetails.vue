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
    // ?????????????????????
    // ?????????4001                           02 proBondPool
    // ????????????4002                         01  proBondInvest
    // ??????-??????4003 ??????????????????                        07
    // ??????-???????????????????????????????????????4004    05
    // ???????????????4005                       07 assetManageBaseInfo
    // ?????????????????????????????????4006             03 proAssetBacked
    // ?????????????????????????????????4007             03
    // ???????????????????????????4008                01
    // ??????????????????????????????4009              05 proNoStandardInvest
    // ??????????????????????????????4010              05
    // ???????????????4011                       04 proFinanceOther
    // ????????????????????????4012                  04
    // ??????????????????????????????16010101          05
    // ??????????????????????????????16020101          05
    console.log("????????????bizPageData================>>>>>>>>>>>>", this.bizPageData)
    // ??????????????????
    var biz = this.bizPageData;
    if (biz == 'undefined' || biz == null || biz == '') {
    // ??????
      if (this.pageParams.serno) {
        console.log('===================??????', this.pageParams);
        let pageParams = this.pageParams;
        this.serno = pageParams.serno;
        this.cusId = pageParams.cusId;
        this.customer = Number(pageParams.cusCatalog); // 2???????????? 3????????????
        this.op = pageParams.op; // ????????????
        this.lmtBizType = pageParams.lmtBizType; // ????????????
        this.proName = pageParams.proName; // ????????????
        this.proNo = pageParams.proNo;
      } else if (this.$route.meta.params) {
        // ?????????
        console.log('===================?????????', this.$route.meta.params);
        let params = this.$route.meta.params;
        this.serno = params.serno;
        this.cusId = params.cusId;
        this.customer = Number(params.cusCatalog); // 2???????????? 3????????????
        this.op = params.op; // ????????????
        this.lmtBizType = params.lmtBizType; // ????????????
        this.proName = params.proName; // ????????????
        this.proNo = params.proNo;
      } else {
        this.$message({
          message: '?????????????????????',
          type: 'error'
        });
        this.$store.dispatch('tagsView/delView', this.$route);
        this.$router.go(-1);
      }
    } else {
      // ??????????????????
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
              console.log("????????????=====================>>>>>", response);
              json = JSON.parse(response.data[0].flowParam);
              this.appType = json.appType
            }else{
              this.$message({
                message: '?????????????????????',
                type: 'error'
              });
            }
          }
        });
      }

      this.serno = bizPageParams.serno ? bizPageParams.serno : bizPageParams.bizId;
      this.cusId = bizPageParams.cusId ? bizPageParams.cusId : bizPageParams.bizUserId;
      this.customer = bizPageParams.cusCatalog ? Number(bizPageParams.cusCatalog) : Number(json.cusCatalog); // 2???????????? 3????????????
      this.op = 'look'; // ????????????
      this.lmtBizType = bizPageParams.lmtBizType ? bizPageParams.lmtBizType : json.lmtBizType; // ????????????
      this.proName = bizPageParams.proName; // ????????????
      this.proNo = bizPageParams.proNo;//????????????
    }
    // ?????????????????????
    let data = {};
    data.id = '2-1';
    this.handleNodeClick(data);
    this.menuRecursion();
  },
  created () {},
  watch: {
    // ???????????????????????????
    serno (val) {
      if (val) {
        // ?????????????????????
        // let data = {};
        // data.id = "2-1";
        // this.handleNodeClick(data);
      } else {
        this.$message({
          message: '?????????????????????',
          type: 'error'
        });
        this.$store.dispatch('tagsView/delView', this.$route);
        this.$router.go(-1);
      }
    }
  },
  methods: {
    // ?????????
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
            label: '??????????????????',
            children: [
              {
                id: '2',
                label: '????????????',
                children: [
                  {
                    id: '2-1',
                    label: '??????????????????'
                  },
                  {
                    id: '2-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '3',
                label: '????????????',
                children: [
                  {
                    id: '3-1',
                    label: '??????????????????',
                    children: [
                      {
                        id: '3-1-1',
                        label: '????????????'
                      },
                      {
                        id: '3-1-2',
                        label: '??????????????????'
                      },
                      {
                        id: '3-1-3',
                        label: '????????????'
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '4',
                label: '??????????????????'
              },
              {
                id: '5',
                label: '????????????'
              },
              {
                id: '6',
                label: '????????????'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4001') {
        this.menu = [
          {
            id: '1',
            label: '??????????????????',
            children: [
              {
                id: '2',
                label: '????????????',
                children: [
                  {
                    id: '2-1',
                    label: '??????????????????'
                  }
                ]
              },
              {
                id: '3',
                label: '????????????',
                children: [
                  {
                    id: '3-1',
                    label: '??????????????????',
                    children: [
                      {
                        id: '3-1-1',
                        label: '????????????'
                      },
                      {
                        id: '3-1-2',
                        label: '??????????????????'
                      },
                      {
                        id: '3-1-3',
                        label: '????????????'
                      }
                    ]
                  }
                ]
              },
              {
                id: '4',
                label: '??????????????????'
              },
              {
                id: '5',
                label: '????????????'
              },
              {
                id: '6',
                label: '????????????'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4012' || this.lmtBizType == '4011') {
        this.menu = [
          {
            id: '1',
            label: '??????????????????',
            children: [
              {
                id: '2',
                label: '????????????',
                children: [
                  {
                    id: '2-1',
                    label: '??????????????????'
                  },
                  {
                    id: '2-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '3',
                label: '????????????',
                children: [
                  {
                    id: '3-1',
                    label: '??????????????????',
                    children: [
                      {
                        id: '3-1-1',
                        label: '????????????'
                      },
                      {
                        id: '3-1-2',
                        label: '??????????????????'
                      },
                      {
                        id: '3-1-3',
                        label: '????????????',
                        children: [
                          {
                            id: '3-1-3-1',
                            label: '????????????'
                          },
                          {
                            id: '3-1-3-2',
                            label: '?????????????????????????????????'
                          },
                          {
                            id: '3-1-3-3',
                            label: '????????????'
                          },
                          {
                            id: '3-1-3-4',
                            label: '????????????'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '4',
                label: '??????????????????'
              },
              {
                id: '5',
                label: '????????????'
              },
              {
                id: '6',
                label: '????????????'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4006' || this.lmtBizType == '4007') {
        this.menu = [
          {
            id: '1',
            label: '??????????????????',
            children: [
              {
                id: '2',
                label: '????????????',
                children: [
                  {
                    id: '2-1',
                    label: '??????????????????'
                  },
                  {
                    id: '2-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '3',
                label: '????????????',
                children: [
                  {
                    id: '3-1',
                    label: '?????????/???????????????????????????',
                    children: [
                      {
                        id: '3-1-1',
                        label: '????????????'
                      },
                      {
                        id: '3-1-2',
                        label: '??????????????????'
                      },
                      {
                        id: '3-1-3',
                        label: '????????????'
                      }
                    ]
                  },
                  {
                    id: '3-2',
                    label: '??????????????????',
                    children: [
                      {
                        id: '3-2-1',
                        label: '??????????????????'
                      },
                      {
                        id: '3-2-2',
                        label: '????????????????????????'
                      }
                    ]
                  }
                ]
              },
              {
                id: '4',
                label: '??????????????????'
              },
              {
                id: '5',
                label: '????????????'
              },
              {
                id: '6',
                label: '????????????'
              }
            ]
          }
        ];
      } else if (this.lmtBizType == '4003' || this.lmtBizType == '4005') {
        this.menu = [
          {
            id: '1',
            label: '??????????????????',
            children: [
              {
                id: '2',
                label: '????????????',
                children: [
                  {
                    id: '2-1',
                    label: '??????????????????'
                  },
                  {
                    id: '2-2',
                    label: '?????????????????????'
                  }
                ]
              },
              {
                id: '3',
                label: '????????????',
                children: [
                  {
                    id: '3-1',
                    label: '?????????????????????',
                    children: [
                      {
                        id: '3-1-1',
                        label: '????????????'
                      },
                      {
                        id: '3-1-2',
                        label: '??????????????????'
                      },
                      {
                        id: '3-1-3',
                        label: '????????????'
                      }
                    ]
                  },
                  {
                    id: '3-1.5',
                    label: '????????????'
                  },
                  {
                    id: '3-2',
                    label: '??????????????????'
                  }
                ]
              },
              {
                id: '4',
                label: '??????????????????'
              },
              {
                id: '5',
                label: '????????????'
              },
              {
                id: '6',
                label: '????????????'
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
          label: '???????????????'
        };
        this.menu[0].children.push(obj);
      }else if(appType == '02'){
        let obj = {
          id: '3-1-5',
          label: '???????????????'
        };
        this.menu[0].children.push(obj);
      }

      let obj = {
        id: '7',
        label: '????????????'
      }
      this.menu[0].children.push(obj);
    },
    // ?????????????????????
    handleNodeClick (data) {
      let lmtBizType = this.lmtBizType;
      this.children = {
        serno: this.serno,
        cusId: this.cusId,
        op: this.op,
        customer: this.customer, // ????????????2 ????????????3
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
        this.currentView = this.customer == 2 ? 'bussiness' : 'customer'; // ????????????2 ????????????3
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
            // TODO ??????????????????????????????
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
     * ?????????????????? ????????????
     * @param showStatus
     */
    onLabelChange: function(showStatus){
      let obj = {
        id: '2-2',
        label: '?????????????????????'
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
          this.$dialog.close(this.dialogId); // ?????? ??????
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
