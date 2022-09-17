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
            <yu-menu-item index="1-4" v-if="isVillageBank">影像资料</yu-menu-item>
          </yu-submenu>
          <yu-menu-item index="2" :style="color[2] && activeIndex == 2 ? color[2] : 'color: #48576a;'">评级必要信息</yu-menu-item>
          <yu-submenu index="3">
            <template slot="title">
              客户关联信息
            </template>
            <yu-menu-item index="3-1">高管人员信息</yu-menu-item>
            <yu-menu-item index="3-2">资本构成信息</yu-menu-item>
            <yu-menu-item index="3-3">对外投资信息</yu-menu-item>
          </yu-submenu>
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs v-if="activeIndex == '1-1'" v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="客户基础信息" name="cusCorpBase">
            <cusCorpBase ref="cusCorpBase" :cusCorp="cusCorp"></cusCorpBase>
          </yu-tab-pane>
          <yu-tab-pane label="企业证件信息" name="cusCorpCert">
            <cusCorpCert ref="cusCorpCert" :cusCorp="cusCorp"></cusCorpCert>
          </yu-tab-pane>
          <yu-tab-pane label="登记注册信息" name="cusCorpBaseLogin">
            <cusCorpBaseLogin ref="cusCorpBaseLogin" :cusCorp="cusCorp"></cusCorpBaseLogin>
          </yu-tab-pane>
          <yu-tab-pane label="银企合作信息" name="cusCorpBankCoop">
            <cusCorpBankCoop ref="cusCorpBankCoop" :cusCorp="cusCorp"></cusCorpBankCoop>
          </yu-tab-pane>
          <yu-tab-pane label="外部评级信息" name="cusCorpExternalRate">
            <cusCorpExternalRate ref="cusCorpExternalRate" :cusCorp="cusCorp"></cusCorpExternalRate>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusCorpBaseAddress">
            <cusCorpBaseAddress ref="cusCorpBaseAddress" :cusCorp="cusCorp"></cusCorpBaseAddress>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusCorpBaseProp">
            <cusCorpBaseProp ref="cusCorpBaseProp" :cusCorp="cusCorp"></cusCorpBaseProp>
          </yu-tab-pane>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="onSave">暂存</yu-button>
            <yu-button type="primary" @click="onCommit">提交</yu-button>
            <yu-button type="primary" @click="onBack">返回</yu-button>
          </yu-form-buttons>
        </yu-tabs>
        <cusCorpStock v-if="activeIndex == '1-2'" ref="cusCorpStock"></cusCorpStock>
        <cusCorpBond v-if="activeIndex == '1-3'" ref="cusCorpBond"></cusCorpBond>
        <imageSystem v-if="activeIndex == '1-4'" authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
        <cusCorpMaintainRate v-if="activeIndex == 2" ref="cusCorpMaintainRate" :cusCorp="cusCorp"></cusCorpMaintainRate>
        <cusCorpMgr v-if="activeIndex == '3-1'" ref="cusCorpMgr"></cusCorpMgr>
        <cusCorpApitalInfo v-if="activeIndex == '3-2'" ref="cusCorpApitalInfo"></cusCorpApitalInfo>
        <cusPubRel v-if="activeIndex == '3-3'" ref="cusPubRel"></cusPubRel>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseOfficialList_d1_BillCard';
import cusCorpCert from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpCertList_d1_BillList';
import cusCorpBaseLogin from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseLoginOfficialList_d1_BillCard';
import cusCorpBankCoop from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBankCoopInfo_d1_BillCard';
import cusCorpExternalRate from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpExternalRateInfoList_d1_BillCard';
import cusCorpBaseAddress from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpAddressSubjList_d1_BillCard';
import cusCorpBaseProp from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBasePropList_d1_BillCard';
import cusCorpStock from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpStockListIndex';
import cusCorpBond from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpBondInfoListIndex';
import cusCorpMaintainRate from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpMaintainRateOffiListIndex';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
import cusPubRel from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusPubRelInfoInvestListIndex';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { cusCorpBase, cusCorpCert, cusCorpBaseLogin, cusCorpBankCoop, cusCorpExternalRate, cusCorpBaseAddress, cusCorpBaseProp, cusCorpStock, cusCorpBond, cusCorpMaintainRate, cusCorpMgr, cusCorpApitalInfo, cusPubRel, imageSystem},
  data: function () {
    return {
      color: {'1-1': 'color: #fff;'},
      activeIndex: '1-1',
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
  watch: {
    activeIndex: function (val) {
      if (val === '1-1') {
        this.AfterInit();
      }
    }
  },
  created () {
    this.imageBizParam[0].index.businessid = this.$route.meta.params.cusId;
    this.imageBizParam[0].index.custid = this.$route.meta.params.cusId;
    let loginUser = this.$xutils.getLoginUserInfo();
    // 区分总行和村镇（东海，寿光）,村镇所有信息自己录入
    var orgCode = loginUser.orgCode;
    // 80：寿光 81：东海
    if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
      this.isVillageBank = true;
    }
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
        async: false,
        callback: function (code, message, response) {
          _this.$utils.clone(response.data, _this.cusCorp);
          //_this.cusCorp = response.data;
        }
      });
    },

    handleClick(active){
      if(active.name == 'cusCorpBaseAddress'){
        this.$refs.cusCorpBaseAddress.formdata.regiAddr = this.$refs.cusCorpBaseLogin.formdata.regiAddr;
        this.$refs.cusCorpBaseAddress.formdata.operAddrAct = this.$refs.cusCorpBaseLogin.formdata.operAddrAct;
      }
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
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
    /**
     * 提交
     */
    onCommit () {
      var _this = this;
      // 判断必输项
      var validate = false;
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseLogin', 'cusCorpBankCoop', 'cusCorpExternalRate', 'cusCorpBaseProp'];
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs.[tabs[i]].$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
      }
      // 向后台发送保存请求
      var _this = this;
      var model = {};
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      model.taskStatus = '3';
      model.taskSerno = _this.$route.meta.params.serno;
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
