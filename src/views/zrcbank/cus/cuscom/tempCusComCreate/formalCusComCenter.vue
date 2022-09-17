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
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="onSave">暂存</yu-button>
            <yu-button type="primary" @click="onCommit">提交</yu-button>
            <yu-button type="primary" @click="onBack">返回</yu-button>
          </yu-form-buttons>
        </yu-tabs>
        <finc-report-query v-if="activeIndex == 2" ref="fincReportQuery" :params="cusCorp"></finc-report-query>
        <cusCorpMgr v-if="activeIndex == 3" ref="cusCorpMgr"></cusCorpMgr>
        <cusCorpStock v-if="activeIndex == 4" ref="cusCorpStock"></cusCorpStock>
      </yu-col>
    </yu-row>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseList_d1_BillCard';
import cusCorpBaseTempLoginList from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseLoginList_d1_BillCard';
import cusCorpBaseAddress from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseAddressList_d1_BillCard';
import cusCorpBaseProp from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBasePropList_d1_BillCard';
import fincReportQuery from '@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpStock from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpStockListIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { mapState } from 'vuex';
export default {
  components: { cusCorpBase, cusCorpBaseTempLoginList, cusCorpBaseAddress, cusCorpBaseProp, fincReportQuery, cusCorpMgr, cusCorpStock, yufpNwfInit, mapState},
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'cusCorpBase',
      cusCorp: {},
      bizType: ''
    };
  },
  created () {
    this.afterInit();
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  watch: {
    activeIndex (val) {
      if(val == '1'){
        this.afterInit();
      }
    }
  },
  methods: {
    /**
     * 查询客户详情
     */
    afterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      _this.bizType = _this.$route.meta.params.bizType;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.cusCorp = response.data;
            _this.cusCorp.bizType = _this.bizType;
            _this.checkComScaleOp(_this.cusCorp);
          } else {
            _this.$message({type: 'error', message: '查询客户基本信息失败!'});
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
      this.color[index] = 'color: #fff;';
    },

    /**
     * 校验企业规模
     */
    checkComScaleOp (params) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: `${backend.cmisCus}/api/cuscorp/checkcomscaleop`,
        data: params,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.cusCorp.corpScale = response.data ? response.data : '2';
          }
        }
      });
    },

    handleClick(active){
      if(active.name == 'cusCorpBaseAddress'){
        this.$refs.cusCorpBaseAddress.formdata.regiAddr = this.$refs.cusCorpBaseTempLoginList.formdata.regiAddr;
        this.$refs.cusCorpBaseAddress.formdata.operAddrAct = this.$refs.cusCorpBaseTempLoginList.formdata.operAddrAct;
      }else if(active.name == 'cusCorpBaseTempLoginList'){
        this.$refs.cusCorpBaseTempLoginList.formdata.regiEndDate = this.$refs.cusCorpBase.formdata.certIdate;
      }
    },
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {};
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp'];

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
    /**
     * 提交
     */
    onCommit () {
      var _this = this;
      // 判断必输项
      var validate = false;
      let data = {};
      var tabs = ['cusCorpBase', 'cusCorpBaseTempLoginList', 'cusCorpBaseAddress', 'cusCorpBaseProp'];
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
      // 集中作业更新为处理中
      model.taskStatus = '2';
      model.taskSerno = _this.$route.meta.params.serno;
      // 客户状态生效
      // model.cusState = "2";
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.submit(model);
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
    submit (model) {
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.code;
      startdto.userId = _this.userCode;
      if (_this.bizType == 'A12') { // 公司客户转正（集中作业）
        startdto.bizType = 'KH005';
      } else { // 公司正式客户创建（集中作业）
        startdto.bizType = 'KH001';
      }
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
