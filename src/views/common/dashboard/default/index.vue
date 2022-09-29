<template>
  <div class="yu-dashboard-container">
    <yu-row :gutter="16">
      <yu-col :span="16">
        <yu-row>
          <div class="yu-dashboard-box">
            <div class="yu-zrc-title">
              <h1>我的工作</h1>
            </div>
            <div class="yu-dashboard-flow-tips">
              <a href="javascript:void(0);" @click="openPage(0)">
                <i v-text="tipsData.back"></i>
                <span>审批退回件</span>
              </a>

              <a href="javascript:void(0);" @click="openPage(1)">
                <i v-text="tipsData.done"></i>
                <span>审批在途件</span>
              </a>
              <a href="javascript:void(0);" @click="openPage(2)">
                <i v-text="nums"></i>
                <!--<yu-countup ref="refCountup" :end-val="nums" :decimal-places="0" :duration="1"></yu-countup>-->
                <span>待处理任务</span>
              </a>
              <a href="javascript:void(0);" @click="openPage(3)">
                <i v-text="riskNum"></i>
                <span>风险预警</span>
              </a>
              <a href="javascript:void(0);" @click="openPage(4)">
                <i v-text="loanNum"></i>
                <span>贷款逾期</span>
              </a>
            </div>
          </div>
        </yu-row>
        <yu-row>
          <!-- 常用功能页面 -->
          <wbCommFunc></wbCommFunc>
        </yu-row>
      </yu-col>
      <yu-col :span="8">
        <yu-row>
          <!-- 提醒中心 -->
          <noticeCenter></noticeCenter>
        </yu-row>
      </yu-col>
    </yu-row>
    <yu-row :gutter="16">
      <yu-col :span="16">
        <div class="yu-dashboard-box">
          <div class="yu-zrc-title">
            <h1>系统链接</h1>
          </div>
          <div class="out-url-link" style="padding:0px 0px 16px;">
            <div>
              <span class="zrcbk-icon-xitonglianjie-yapinguanlixitong" v-if="checkCtrl('ypglxt', '7A6A7D0581FD452A9224942D49909CD8')"  @click="openGuar">押品管理系统</span>
              <span class="zrcbk-icon-xitonglianjie-feilingneiping" v-if="checkCtrl('flsnpxt', '7A6A7D0581FD452A9224942D49909CD8')" @click="enterNPSystem">非零内评系统</span>
              <span class="zrcbk-icon-xitonglianjie-fengxian" v-if="checkCtrl('fxyjxt', '7A6A7D0581FD452A9224942D49909CD8')" @click="doDel">风险预警系统</span>
              <span class="zrcbk-icon-xitonglianjie-zhinengshenpi" v-if="checkCtrl('znspxt', '7A6A7D0581FD452A9224942D49909CD8')" @click="sysApproval">智能审批系统</span>
              <span class="zrcbk-icon-xitonglianjie-jixiaoxitong" v-if="checkCtrl('jxxt', '7A6A7D0581FD452A9224942D49909CD8')" @click="sysPas" >绩效系统</span>
            </div>
            <div>
              <span class="zrcbk-icon-xitonglianjie-budongchandengji" v-if="checkCtrl('bdcdj', '7A6A7D0581FD452A9224942D49909CD8')"  @click="doHLWYP" plain>不动产登记</span>
              <span class="zrcbk-icon-xitonglianjie-xinweidai" v-if="checkCtrl('xwdxt', '7A6A7D0581FD452A9224942D49909CD8')"  @click="doXWD" plain>新微贷系统</span>
            </div>
          </div>
        </div>
      </yu-col>
      <yu-col :span="8">
        <div class="yu-dashboard-box" style="min-height: 160px;">
          <div class="yu-zrc-title">
            <h1>工具箱</h1>
          </div>
          <div class="yu-toolkit-box">
            <div @click="calendardialogVisible = !calendardialogVisible">
                <i class="zrcbk-icon-yirili"></i>
                <span>工作日历</span>
            </div>
            <div @click="loanCalcdialogVisible = !loanCalcdialogVisible">
                <i class="zrcbk-icon-yijisuanqi"></i>
                <span>贷款计算器</span>
            </div>
            <div @click="addwbprbCommFn">
                <i class="zrcbk-icon-yijiantucao"></i>
                <span>一键吐槽</span>
            </div>
            <div @click="openRepobaseFn">
                <i class="zrcbk-icon-yizhishiku"></i>
                <span>知识库</span>
            </div>
          </div>
        </div>
      </yu-col>
    </yu-row>
    <yu-row>
      <div class="yu-dashboard-box">
        <div class="yu-zrc-title">
          <h1>统计分析</h1>
        </div>
        <div style="padding:0 24px 20px 24px;">
          <wbCountAnalysis></wbCountAnalysis>
        </div>
      </div>
    </yu-row>
    <yu-xdialog title="工作日历" :visible.sync="calendardialogVisible" width="70%" :close-on-press-escape="true">
      <wbCalendarPage></wbCalendarPage>
    </yu-xdialog>
    <yu-xdialog title="贷款计算器" :visible.sync="loanCalcdialogVisible" :close-on-press-escape="true">
      <loanCalculator></loanCalculator>
    </yu-xdialog>
  </div>
</template>
<script>
import defaultAvatar from '@/assets/common/images/user_default_pic.png';
import noticeCenter from './noticeCenter.vue';
import wbCommFunc from './wbCommFunc.vue';
import wbCountAnalysis from './wbCountAnalysis.vue';
import wbCalendarPage from '../workbox/wbCalendarPage.vue';
import loanCalculator from '../workbox/loanCalculator.vue';
import { clone, extend, lookup } from '@/utils';
import { mapGetters } from 'vuex';
export default {
  components: { noticeCenter, wbCommFunc, wbCalendarPage, loanCalculator, wbCountAnalysis },
  name: 'DashboardEditor',
  data: function () {
    return {
      defaultAvatar: defaultAvatar,
      /** 用户信息 */
      nameAndRole: '',
      rolesStr: '',
      timeTemp: '',
      usertitle: '',
      tipsData: { back: 0, done: 0 },
      Data1: {},
      Data2: {},
      Data3: {},
      Data4: {},
      nums: 0,
      loanNum: 0,
      /** 用户信息 */
      prmIndex: 1,
      // 工作日历页面
      calendardialogVisible: false,
      // 贷款计算器
      loanCalcdialogVisible: false,
      riskNum: 0 // 风险预警数量
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  watch: {
    theme: function (newVal) {
      this.theme = newVal;
      this.setThemeColor();
    }
  },
  mounted: function () {
    // 初始化数据
    this.init();
    // 我的工作台
    this.queryWorkbench();
    // 设置待处理事项的数量
    this.setTodoNums();
    // 设置主题色
    this.setThemeColor();
    // 查询贷款逾期数量
    this.queryLoanNum();
    // 查询风险预警数量
    this.queryRiskNum();
  },
  methods: {
    /** 绩效系统 */
    sysPas () {
      let _this = this;
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/jxxt',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            window.open(data + '/pas', '_blank');
          }
        });
    },
    /** 风险预警系统 */
    doDel () {
      var currentuserid = this.loginCode;
      // currentuserid = 'admin';
      let _this = this;
      var fxyjUrl = '';
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/fxyjxt',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            var url = data + '/cms/userSignOnYJD.do?currentuserid=' + currentuserid;
            window.open(url, '_blank');
          }
        });
    },
    /** 智能审批系统 */
    sysApproval () {
      var currentuserid = this.loginCode;
      // currentuserid = '00102002';
      let _this = this;
      var url0 = '';
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/znsp',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            var url = `${data}/imceasys/in/loginWithoutPwd?loginName=${currentuserid}`;
            window.open(url, '_blank');
          }
        });
    },
    /** 新微贷系统 */
    doXWD () {
      var currentuserid = this.loginCode;
      var orgCode = this.org.code; // 机构
      // currentuserid = 'admin';
      // orgCode = '123';
      let _this = this;
      var url0 = '';
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/xwdxt',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            var url = `${data}/#/loginzjg/${currentuserid}/${orgCode}/CMIS`;
            window.open(url, '_blank');
          }
        });
    },
    /** 不动产登记 */
    doHLWYP () {
      let _this = this;
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/bdcdj',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            window.open(data + '/pas', '_blank');
          }
        });
    },
    /** 非零售内部评级系统 */
    enterNPSystem () {
      var managerId = this.loginCode; // 客户经理的Id 90011219
      // managerId = '90011219';
      let _this = this;
      var flsnp = '';
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/irs',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            var url = data + '/SNB_IRS/LoanClient/IRSInterface.html?userid=' + managerId;
            window.open(url, '_blank');
          }
        });
    },
    /** 押品管理系统 */
    openGuar () {
      var currentuserid = this.loginCode;
      var orgCode = this.org.code; // 机构
      // 用户不存在 暂时先默认
      // currentuserid = 'admin';
      // orgCode = '990000';
      var org = '';
      if (orgCode != '016000') {
        org = '01';
      } else {
        org = '02';
      }
      let _this = this;
      var yphsxt = '';
      _this.$request({
        url: backend.cmisBiz + '/api/cmishomepage/getprefixurl/ypxt',
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            //  var url = data + `/cms/callPage.do?parameter=tWelCome|URLUSER|BB2C3CB8A662BFA3D3EB7335F99F59B1|${org}|${currentuserid}|${orgCode}|01`;
            var url = 'http://20.0.39.113:8080/cms/userSignOn.do?OutSys=' + orgCode + '&OperUser=' + currentuserid;
            window.open(url, '_blank');
          }
        });
    },
    /** 打开知识库页面 */
    openRepobaseFn () {
      this.$router.addTab({
        name: 'common/dashboard/repobase/wbRepoBase',
        title: '知识库查询',
        key: '1',
        data: {}
      });
    },
    /** 一键吐槽 */
    addwbprbCommFn () {
      let _this = this;
      _this.$dialog.open('发布问题', 'common/dashboard/bizpage/WbPrbCommAdd', 1200, 430, null, () => {});
    },
    /**
     * 跳转到对应的页面
     */
    openPage (index) {
      let route = '';
      let parms = {};
      switch (index) {
      case 0:
        route = '/callback';
        parms = { backPage: true };
        break;
      case 1:
        route = 'workflow/bench/done/done';
        break;
      case 2:
        route = 'common/dashboard/bizpage/myAgent';
        break;
      case 3:
        route = 'common/dashboard/default/riskSign';
        break;
      case 4:
        route = 'xwmanage/iqpManage/accLoan/accLoanListIndexForXd';
        // 2逾期
        parms = { accStatus: 2 };
        break;
      default:
      }
      if (index == 2 || index == 3) {
        let title = '待办事项';
        if (index == 3) {
          title = '风险预警';
        }
        this.$router.addTab({
          name: route,
          title: title,
          key: '1',
          data: {}
        });
      } else {
        this.$router.push({ path: route, query: parms });
      } // name:'', params:{}
    },
    // 查询工作台数量
    queryWorkbench () {
      let _this = this;
      let model = {};
      model.userId = _this.loginCode;
      _this
        .$request({
          url: backend.workflowService + '/api/custom/bench/count',
          method: 'post',
          data: JSON.stringify({ condition: JSON.stringify(model) })
        })
        .then(({ code, message, data }) => {
          if (data) {
            // yufp.clone(data, _this.formdata);
            _this.tipsData = data;
          }
        });
    },
    tableToggle (index) {
      this.prmIndex = index;
    },
    /**
     * 初始化数据
     */
    init () {
      let _this = this;
      let hour = new Date().getHours();
      if (hour < 13) {
        _this.timeTemp = '早上';
      } else if (hour < 19) {
        _this.timeTemp = '下午';
      } else {
        _this.timeTemp = '晚上';
      }
      let rolesname = [];
      for (let i = 0; i < _this.roles.length; i++) {
        // 判断是否包含客户经理角色
        rolesname.push(_this.roles[i].name);
      }
      _this.rolesStr = rolesname.join(',');
      _this.usertitle = `${_this.userName},${_this.rolesStr}`;
    },
    // 设置主题色
    setThemeColor: function () {
      console.log(this.theme.color);
    },
    // 增加点击链接事件
    preLmtlist: function () {
      // foward to  预授信明细列表，
      //  有多少成员可预授信，主表信息的过滤
      this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupWait/lmtGrpAppBacklogList',
        title: '申请列表',
        key: '1',
        data: {
          userId: '121',
          keyId: 12324,
          formData: {
            name: 'ST0001',
            gender: '4'
          }
        }
      });
    },
    // 查询客户管理待办事项数量
    queryViewData1 () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {};
        model.inputId = _this.loginCode;
        _this
          .$request({
            url: backend.cmisCus + '/api/cusmanatask/selectNumByInputId',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data }) => {
            if (data) {
              _this.Data1 = data[0];
              resolve(data);
            }
          });
      });
    },
    // 查询业务管理待办事项数量（授信、合同、出账通知）
    queryViewData2 () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {};
        model.inputId = _this.loginCode;
        _this
          .$request({
            url: backend.cmisBiz + '/api/ctrloancont/selectNumByInputId',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data }) => {
            if (data) {
              _this.Data2 = data[0];
              resolve(data);
            }
          });
      });
    },
    // 查询催收任务待办事项数量
    queryViewData3 () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {};
        model.inputId = _this.loginCode;
        _this
          .$request({
            url: backend.cmisNpam + '/api/plabcmtaskinfo/selectNumByInputId',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data }) => {
            if (data) {
              _this.Data3 = data[0];
              resolve(data);
            }
          });
      });
    },
    // 查询催收任务待办事项数量
    queryViewData4 () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {};
        model.inputId = _this.loginCode;
        _this
          .$request({
            url: backend.cmisPsp + '/api/psptasklist/selectNumByInputId',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data }) => {
            if (data) {
              _this.Data4 = data[0];
              resolve(data);
            }
          });
      });
    },
    // 设置待处理事项的数量
    setTodoNums () {
      let _this = this;
      Promise.all([_this.queryViewData1(), _this.queryViewData2(), _this.queryViewData3(), _this.queryViewData4()]).then(res => {
        _this.nums = (_this.Data1.num0 ? _this.Data1.num0 : 0) + (_this.Data2.num1 ? _this.Data2.num1 : 0) + (_this.Data2.num2 ? _this.Data2.num2 : 0) +
        (_this.Data2.num3 ? _this.Data2.num3 : 0) + (_this.Data4.num4 ? _this.Data4.num4 : 0) + (_this.Data3.num5 ? _this.Data3.num5 : 0);
      });
    },
    // 查询贷款逾期数
    queryLoanNum () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {
          accStatus: '2'
        };
        _this
          .$request({
            url: backend.cmisBiz + '/api/accloan/querymodelByCondition',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data, total }) => {
            if (data) {
              _this.loanNum = total;
              resolve(data);
            }
          });
      });
    },
    // 查询风险预警数
    queryRiskNum () {
      return new Promise((resolve, reject) => {
        let _this = this;
        let model = {
          inputId: _this.loginCode
        };
        _this
          .$request({
            url: backend.cmisBiz + '/api/batbizrisksign/',
            method: 'post',
            data: JSON.stringify({ condition: JSON.stringify(model) })
          })
          .then(({ code, message, data, total }) => {
            if (data) {
              _this.riskNum = total;
              resolve(data);
            }
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.out-url-link .el-button {
  width: calc(100% / 3 - 11px);
}
</style>
