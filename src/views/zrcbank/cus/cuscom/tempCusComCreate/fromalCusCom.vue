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
          <yu-menu-item index="1">客户基本信息</yu-menu-item>
          <yu-menu-item index="2">财务报表信息</yu-menu-item>
          <yu-menu-item index="3">高管人员信息</yu-menu-item>
          <yu-menu-item index="4">发行股票信息</yu-menu-item>
          <yu-menu-item index="5" v-if="isVillageBank">资本构成信息</yu-menu-item>
          <yu-menu-item index="6" v-if="isVillageBank">影像资料</yu-menu-item>
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs v-if="activeIndex == 1" v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="客户基础信息" name="cusCorpBase">
            <cusCorpBase ref="cusCorpBase" :cusCorp="cusCorp"></cusCorpBase>
          </yu-tab-pane>
          <yu-tab-pane label="登记注册信息" name="cusCorpBaseTempLoginList">
            <cusCorpBaseTempLoginList ref="cusCorpBaseTempLoginList" :cusCorp="cusCorp"></cusCorpBaseTempLoginList>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusCorpBaseAddress">
            <cusCorpBaseAddress ref="cusCorpBaseAddress" :cusCorp="cusCorp"></cusCorpBaseAddress>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusCorpBaseProp">
            <cusCorpBaseProp ref="cusCorpBaseProp" :cusCorp="cusCorp"></cusCorpBaseProp>
          </yu-tab-pane>
          <yu-tab-pane v-if="isVillageBank" label="银企合作信息" name="cusCorpBankCoop">
            <cusCorpBankCoop ref="cusCorpBankCoop" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBankCoop>
          </yu-tab-pane>
          <yu-tab-pane v-if="isVillageBank" label="外部评级信息" name="cusCorpExternalRate">
            <cusCorpExternalRate ref="cusCorpExternalRate" :cusCorp="cusCorp" :viewType="viewType"></cusCorpExternalRate>
          </yu-tab-pane>
          <yu-tab-pane v-if="isVillageBank" label="客户我行保证金账户登记簿" name="cusCorpBaseBook">
            <cusCorpBaseBook ref="cusCorpBaseBook" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseBook>
          </yu-tab-pane>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="onSave">暂存</yu-button>
            <yu-button type="primary" @click="onCommit">提交</yu-button>
            <yu-button type="primary" @click="onBack">返回</yu-button>
          </yu-form-buttons>
        </yu-tabs>
        <fincReportQuery v-if="activeIndex == 2" ref="fincReportQuery" :params="cusCorp"></fincReportQuery>
        <cusCorpMgr v-if="activeIndex == 3" ref="cusCorpMgr"></cusCorpMgr>
        <cusCorpStock v-if="activeIndex == 4" ref="cusCorpStock"></cusCorpStock>
        <cusCorpApitalInfo v-if="activeIndex == 5" ref="cusCorpApitalInfo" :viewType="viewType"></cusCorpApitalInfo>
        <imageSystem v-if="activeIndex == 6" authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseOfficialList_d1_BillCard';
import cusCorpBaseTempLoginList from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseLoginOfficialList_d1_BillCard';
import cusCorpBaseAddress from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseAddressList_d1_BillCard';
import cusCorpBaseProp from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBasePropList_d1_BillCard';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpStock from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpStockListIndex';
import fincReportQuery from '@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery';
import cusCorpBankCoop from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBankCoopSubjInfo_d1_BillCard';
import cusCorpExternalRate from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpExternalRateInfoList_d1_BillCard';
import cusCorpBaseBook from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpCertBaseBookListIndex';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { cusCorpBase, cusCorpBaseTempLoginList, cusCorpBaseAddress, cusCorpBaseProp, cusCorpMgr, cusCorpStock, fincReportQuery, cusCorpBankCoop, cusCorpExternalRate, cusCorpBaseBook, cusCorpApitalInfo, imageSystem},
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'cusCorpBase',
      cusCorp: {},
      isVillageBank: false,
      imageBizParam: [
        {
          top_outsystem_code: 'DGKHZL',
          index: {
            businessid: '',
            custid: ''
          }
        }
      ],
    };
  },
  created () {
    this.AfterInit();
  },
  methods: {
    /**
     * 查询客户详情
     */
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        callback: function (code, message, response) {
          _this.cusCorp = response.data;
        }
      });

      _this.imageBizParam[0].index.businessid = cusId;
      _this.imageBizParam[0].index.custid = cusId;

      let loginUser = this.$xutils.getLoginUserInfo();
      // 区分总行和村镇（东海，寿光）,村镇所有信息自己录入
      var orgCode = loginUser.orgCode;
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        this.isVillageBank = true;
      }
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
      if(index == 1){
        this.AfterInit();
      }
    },
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {};
      var tabs = [];
      if (this.isVillageBank) {
        tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp', 'cusCorpBankCoop', 'cusCorpExternalRate'];
      } else {
        tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp']
      }
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      // 客户状态设置成暂存
      model.cusState = '1';
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
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

    handleClick(active){
      if(active.name == 'cusCorpBaseAddress'){
        this.$refs.cusCorpBaseAddress.formdata.regiAddr = this.$refs.cusCorpBaseTempLoginList.formdata.regiAddr;
        this.$refs.cusCorpBaseAddress.formdata.operAddrAct = this.$refs.cusCorpBaseTempLoginList.formdata.operAddrAct;
      }
    },
    /**
     * 提交
     */
    onCommit () {
      var _this = this;
      // 判断必输项
      var validate = false;
      let data = {};
      var certIdate = _this.$refs.cusCorpBase.formdata.certIdate;
      var dateNow = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      if (certIdate < dateNow) {
        this.$xutils.showMsgBox('提示', '证件已过期!');
        return;
      }
      var tabs = [];
      if (this.isVillageBank) {
        tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp', 'cusCorpBankCoop', 'cusCorpExternalRate'];
      } else {
        tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp']
      }
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs[tabs[i]].$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
        if (tabs[i] == 'cusCorpBaseAddress') {
          yufp.clone(_this.$refs[tabs[i]].$refs.refForm.formdata, data);
          // 微信号
          const wechatNo = data.wechatNo;
          // QQ
          const qq = data.qq;
          // 邮箱
          const email = data.linkmanEmail;
          if ((wechatNo == '' || wechatNo == null) && (qq == '' || qq == null) && (email == '' || email == null)) {
            this.$xutils.showMsgBox('温馨提示', '微信、QQ、Email地址三项中至少输入一项!');
            return;
          }
        }
      }
      // 向后台发送保存请求
      var model = {};
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      model.taskStatus = '3';
      model.taskSerno = _this.$route.meta.params.serno;
      // 客户状态生效
      model.cusState = '2';

      model.cusRankCls = '01';//转正后客户分类：“正式客户”
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '提交成功！', 500, 140, () => {});
            _this.onBack();
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
