<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <!-- 若无个性化样式，请删除本行及下行 -->
    <yu-row>
      <yu-col :sm="4" :xs="24">
        <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
          <yu-submenu index="1">
            <template slot="title">
              客户概况
            </template>
            <yu-menu-item index="1-1">客户基础信息</yu-menu-item>
            <yu-menu-item index="1-2">发行股票信息</yu-menu-item>
            <yu-menu-item index="1-3">发行债券信息</yu-menu-item>
          </yu-submenu>
          <yu-menu-item index="2">评级必要信息</yu-menu-item>
          <yu-submenu index="3">
            <template slot="title">
              客户关联信息
            </template>
            <yu-menu-item index="3-1">高管人员信息</yu-menu-item>
            <yu-menu-item index="3-2">资本构成信息</yu-menu-item>
            <yu-menu-item index="3-3">对外投资信息</yu-menu-item>
          </yu-submenu>
          <yu-menu-item  v-if="viewType == 'VIEW'" index="4">影像资料</yu-menu-item>
          <yu-menu-item  v-if="viewType == 'VIEW'" index="5">财务报表</yu-menu-item>
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs v-if="activeIndex == '1-1'" v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="客户基础信息" name="cusCorpBase">
            <cusCorpBase ref="cusCorpBase" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBase>
          </yu-tab-pane>
          <yu-tab-pane label="企业证件信息" name="cusCorpCert">
            <cusCorpCert ref="cusCorpCert" :cusCorp="cusCorp" :viewType="viewType"></cusCorpCert>
          </yu-tab-pane>
          <yu-tab-pane label="登记注册信息" name="cusCorpBaseLogin">
            <cusCorpBaseLogin ref="cusCorpBaseLogin" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseLogin>
          </yu-tab-pane>
          <yu-tab-pane label="银企合作信息" name="cusCorpBankCoop">
            <cusCorpBankCoop ref="cusCorpBankCoop" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBankCoop>
          </yu-tab-pane>
          <yu-tab-pane label="外部评级信息" name="cusCorpExternalRate">
            <cusCorpExternalRate ref="cusCorpExternalRate" :cusCorp="cusCorp" :viewType="viewType"></cusCorpExternalRate>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusCorpBaseAddress">
            <cusCorpBaseAddress ref="cusCorpBaseAddress" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseAddress>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusCorpBaseProp">
            <cusCorpBaseProp ref="cusCorpBaseProp" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseProp>
          </yu-tab-pane>
          <yu-tab-pane label="客户我行保证金账户登记簿" name="cusCorpBaseBook">
            <cusCorpBaseBook ref="cusCorpBaseBook" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseBook>
          </yu-tab-pane>
          <yu-form-buttons v-if="viewType!='VIEW' && activeName!='cusCorpCert' && activeName!='cusCorpBaseBook'" class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="onSave">暂存</yu-button>
            <yu-button type="primary" v-if="bizType == 'A09' || bizType == 'A05'" @click="onCommit(false)">提交</yu-button>
            <yu-button type="primary" v-if="bizType == 'A06'" @click="onCommit(true)">提交</yu-button>
            <yu-button type="primary" @click="onBack">返回</yu-button>
          </yu-form-buttons>
        </yu-tabs>
        <cusCorpStock v-if="activeIndex == '1-2'" ref="cusCorpStock" :viewType="viewType"></cusCorpStock>
        <cusCorpBond v-if="activeIndex == '1-3'" ref="cusCorpBond" :viewType="viewType"></cusCorpBond>
        <cusCorpMaintainRate v-if="activeIndex == 2" ref="cusCorpMaintainRate"  :cusCorp="cusCorp"></cusCorpMaintainRate>
        <cusCorpMgr v-if="activeIndex == '3-1'" ref="cusCorpMgr" :viewType="viewType"></cusCorpMgr>
        <cusCorpApitalInfo v-if="activeIndex == '3-2'" ref="cusCorpApitalInfo" :viewType="viewType"></cusCorpApitalInfo>
        <cusPubRel v-if="activeIndex == '3-3'" ref="cusPubRel" :viewType="viewType"></cusPubRel>
        <imageSystem v-if="activeIndex == '4'" authority="download" :para="imageBizParam"></imageSystem>
        <fincReportQuery v-if="activeIndex == '5'" ref="fincReportQuery" :params="cusCorp" :onlyView="viewType === 'VIEW'"></fincReportQuery>
      </yu-col>
    </yu-row>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseList_d1_BillCard';
import cusCorpCert from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpCertList_d1_BillList';
import cusCorpBaseLogin from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseLoginList_d1_BillCard';
import cusCorpBankCoop from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBankCoopSubjInfo_d1_BillCard';
import cusCorpExternalRate from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpExternalRateInfoList_d1_BillCard';
import cusCorpBaseAddress from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseAddressList_d1_BillCard';
import cusCorpBaseProp from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBasePropSubjList_d1_BillCard';
import cusCorpStock from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpStockListIndex';
import cusCorpBond from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBondInfoListIndex';
import cusCorpMaintainRate from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpMaintainRateOffiListIndex';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
import cusPubRel from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusPubRelInfoInvestListIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import fincReportQuery from '@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery';
import cusCorpBaseBook from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpCertBaseBookListIndex';
import { mapState } from 'vuex';
export default {
  components: { cusCorpBase,
    cusCorpCert,
    cusCorpBaseLogin,
    cusCorpBankCoop,
    cusCorpExternalRate,
    cusCorpBaseAddress,
    cusCorpBaseProp,
    cusCorpStock,
    cusCorpBond,
    cusCorpMaintainRate,
    cusCorpMgr,
    cusCorpApitalInfo,
    cusPubRel,
    yufpNwfInit,
    imageSystem,
    fincReportQuery,
    cusCorpBaseBook},
  data: function () {
    return {
      // color: {'1-1': 'color: #fff;'},
      activeIndex: '1-1',
      activeName: 'cusCorpBase',
      cusCorp: {},
      viewType: '',
      bizType: '',
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'DGKHZL',
          index: {
            businessid: '',
            // custconduct: '',
            // operid: '',
            // custconductname: '',
            // orgid: '',
            // custtype: '',
            // orgname: '',
            // opername: '',
            custid: ''
            // maintaindate: '',
            // custname: ''
          }
        }
      ],
      utraceOldFormData: {} // 小U留痕 修改前旧数据备份
    };
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  watch: {
    activeIndex: function (val) {
      if (val === '1-1') {
        this.AfterInit();
      }
    }
  },
  created () {
    this.AfterInit();
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  methods: {
    /**
     * 查询客户详情
     */
    AfterInit () {
      var _this = this;
      let cusId;
      if (_this.$route.meta.params) {
        cusId = _this.$route.meta.params.cusId;
        _this.viewType = _this.$route.meta.params.viewType;
        _this.bizType = _this.$route.meta.params.bizType;
      } else {
        cusId = this.pageParams.cusId;
        if (this.pageParams.viewType) {
          _this.viewType = this.pageParams.viewType;
        }
        _this.$route.meta.params = {};
        _this.$route.meta.params.cusId = cusId;
      }
      _this.imageBizParam[0].index.businessid = cusId;
      _this.imageBizParam[0].index.custid = cusId;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        data: {cusId: cusId},
        async: false,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            response.data.paidCapAmt = _this.accDiv(response.data.paidCapAmt, 10000);
            _this.$utils.clone(response.data, _this.cusCorp);
            // _this.$refs.cusCorpBaseLogin.formdata.paidCapAmt = this.accDiv(this.$refs.cusCorpBaseLogin.formdata.paidCapAmt, 10000);
            _this.$utils.clone(_this.cusCorp, _this.utraceOldFormData); // 备份原数据
            // _this.cusCorp = response.data;
          } else {
            _this.$message({type: 'error', message: '查询客户基础数据失败！'});
          }
        }
      });
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      // this.color[index] = 'color: #fff;';
    },

    handleClick (active) {
      if (active.name == 'cusCorpBaseAddress') {
        this.$refs.cusCorpBaseAddress.formdata.regiAddr = this.$refs.cusCorpBaseLogin.formdata.regiAddr;
        this.$refs.cusCorpBaseAddress.formdata.operAddrAct = this.$refs.cusCorpBaseLogin.formdata.operAddrAct;
      } else if (active.name == 'cusCorpBaseLogin') {
        this.$refs.cusCorpBaseLogin.formdata.regiEndDate = this.$refs.cusCorpBase.formdata.certIdate;
      }
    },
    // 除法获取准确值
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        t1 = arg1.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return this.accMul(r1 / r2, Math.pow(10, t2 - t1));
    },
    // 乘法获取准确值
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {};
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseLogin', 'cusCorpBankCoop', 'cusCorpExternalRate', 'cusCorpBaseProp'];
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      var openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      if (new Date(this.$refs.cusCorpBase.formdata.buildDate) > new Date(openday)) {
        this.$message({
          message: '成立日期不允许超过当前日期',
          type: 'warning'
        });
        return;
      }
      model.paidCapAmt = _this.accMul(model.paidCapAmt, 10000);
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.UTraceSet(model);
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
    UTraceSet (newForm) {
      var _this = this;
      // 循环每一个tab页签下的表单，执行小U留痕保存操作
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseLogin', 'cusCorpBankCoop', 'cusCorpExternalRate', 'cusCorpBaseProp'];
      for (let i = 0; i < tabs.length; i++) {
        if (_this.$refs[tabs[i]].$refs.refForm.utrace) {
          _this.$refs[tabs[i]].$refs.refForm.saveUTrace(_this.utraceOldFormData);
        }
      }
      // 留痕操作结束后，更新旧数据以便再次保存 utraceOldFormData
      yufp.extend(_this.utraceOldFormData, newForm);
    },
    /**
     * 提交
     */
    onCommit (flag) {
      var _this = this;
      // 判断必输项
      var validate = false;
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseLogin', 'cusCorpBankCoop', 'cusCorpExternalRate', 'cusCorpBaseProp'];
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs[tabs[i]].$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
      }
      // 向后台发送保存请求
      var model = {};
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      if (flag == true) {
        model.taskStatus = '2';
        model.cusState = '1';
      } else {
        model.taskStatus = '3';
        model.cusState = '2';
      }
      model.taskSerno = _this.$route.meta.params.serno;
      model.bizType = _this.$route.meta.params.bizType;
      model.paidCapAmt = _this.accMul(model.paidCapAmt, 10000);
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.UTraceSet(model);
            // 自动刷新列表数据
            if (flag === true) {
              _this.submit(model);
            } else {
              this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
                yufp.frame.removeTab(_this.$route.path);
              });
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          // this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
    submit (model) {
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.code;
      startdto.userId = _this.userCode;
      startdto.bizType = 'KH002';
      startdto.bizId = model.taskSerno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 关闭当前页面
     */
    onBack () {
      let data = this.$route.meta.params;
      yufp.frame.removeTab(data.key);
    }
  }
};
</script>
<style>
</style>
