/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="18">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-submenu index="1">
          <template slot="title">定期贷后检查</template>
          <yu-menu-item index="1-1" :style="color['1-1'] && activeIndex == '1-1' ? color['1-1'] : 'color: #48576a;'">检查任务信息</yu-menu-item>
          <yu-menu-item index="1-2" :style="color['1-2'] && activeIndex == '1-2' ? color['1-2'] : 'color: #48576a;'">基本情况</yu-menu-item>
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">检查信息</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">检查结果及意见</yu-menu-item>
          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">定期检查报告-人工</yu-menu-item>
          <yu-menu-item index="1-7" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">征信报告</yu-menu-item>
          <yu-menu-item index="1-6" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <regularCheckDetail v-show="activeIndex == '1-1'" ref="regularCheckDetail"></regularCheckDetail>
      <yu-panel v-if="activeIndex == '1-2'" panel-type="simple">
        <template>
          <regularConsumeCusBase ref="regularConsumeCusBase"></regularConsumeCusBase>
        </template>
      </yu-panel>
      <regularConsumeCheckInfo v-show="activeIndex == '1-3'" ref="regularConsumeCheckInfo"></regularConsumeCheckInfo>
      <regularConsumeCheckRst v-show="activeIndex == '1-4'" ref="regularConsumeCheckRst"></regularConsumeCheckRst>
      <pspCheckReport v-if="activeIndex == '1-5'" ref="pspCheckReport"></pspCheckReport>
      <yu-panel v-if="activeIndex === '1-6'" v-model="activeName" :collapse-hide="false" name="forth">
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-panel>

      <d1-3-billlist ref="d1_3_BillList" v-if="activeIndex == '1-7'" :biz-page-data="bizPageData"></d1-3-billlist>

      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button v-if="!viewFlag" type="primary" @click="saveFn('SUBMIT')">提交</yu-button>
          <yu-button v-if="!viewFlag" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    </yu-col>
  </yu-row>
  <yufpNwfInit ref="yufpNwfInit" @success-click="returnFn"></yufpNwfInit>
</div>
  </template>
<script>
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex.vue';


import imageSystem from '@/views/imageManage/imageSystem';
import regularCheckDetail from '@/views/pspmanage/pspCheck/regularCheck/regularCheckDetail';
import regularConsumeCusBase from '@/views/pspmanage/pspCheck/regularCheck/regularConsumeCusBase';
import regularConsumeCheckRst from '@/views/pspmanage/pspCheck/regularCheck/regularConsumeCheckRst';
import regularConsumeCheckInfo from '@/views/pspmanage/pspCheck/regularCheck/regularConsumeCheckInfo';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d13Billlist, imageSystem, regularCheckDetail, regularConsumeCusBase, regularConsumeCheckRst, regularConsumeCheckInfo, yufpNwfInit, pspCheckReport },
  props: {
    bizPageData: Object,
    pageParams: Object
  },
  data: function () {
    return {
      // color,[2] : 'color: #48576a;',
      color: ['1-1'],
      activeIndex: '1-1',
      rptType: '',
      autoFlag: false, // 是否自动检查
      viewFlag: false, // 是否查看页面
      op: '',
      vdata: {},
      updateUrl: '',
      addUrl: '',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      imageBizParam: [],
      taskNo: '',
      cusId: '',
      checkType: '',
      rptName: '',
      taskType: '',
      image: '1'
    };
  },
  created () {
    this.init();
  },
  // mounted () {
  //   var _this = this;
  //   _this.rptType = _this.$route.params.rptType;
  //   _this.op = _this.$route.params.op;
  //   _this.viewFlag = _this.$route.params.opType === "view";
  // },
  methods: {
    init: function () {
      var _this = this;
      // 判断从代办进入
      if (typeof _this.bizPageData !== 'undefined') {
        _this.$route.params.opType = 'view';
        _this.image = '2';
        _this.workFolwInit();
      } else {
        _this.rptType = _this.$route.params.rptType;
        _this.op = _this.$route.params.op;
        _this.taskNo = _this.$route.params.pspTask.taskNo;
        _this.viewFlag = _this.$route.params.opType === 'view';
        _this.cusId = _this.$route.params.pspTask.cusId;
        if (_this.viewFlag) {
          _this.image = '2';
        }
      }
      _this.imageBizParam = [{
        'top_outsystem_code': 'DHJC',
        'index': {
          'businessid': _this.taskNo,
          'custid': _this.cusId
        }
      }];
    },
    workFolwInit: function () {
      const _this = this;
      _this.op = 'view';
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      _this.rptType = flowParam.rptType;
      _this.taskNo = data.bizId;
      _this.cusId = data.bizUserId;
      _this.rptName = flowParam.rptName;
      _this.checkType = flowParam.checkType;
      _this.taskType = flowParam.taskType;
      _this.$route.params.pspTask = {
        taskNo: _this.taskNo,
        rptType: _this.rptType,
        checkType: _this.checkType,
        taskType: _this.taskType
      };
      _this.$route.params.rptName = _this.rptName;
    },
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
      if (this.tmpIndex != index) {
        this.changeFlag = true;
        this.tmpIndex = index;
      }
    },
    // 保存并提交流程
    submitFn: function () {
      let _this = this;
      // 开始提交流程
      var validate1 = false;
      var validate3 = false;
      var validate4 = false;
      _this.$refs.regularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
        validate1 = valid;
      });
      _this.$refs.regularConsumeCheckInfo.$refs.pspCheckInfoForm.validate(function (valid) {
        validate3 = valid;
      });
      _this.$refs.regularConsumeCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
        validate4 = valid;
      });
      if (!validate1) {
        _this.$xutils.showMsgBox('提示', '检查任务信息录入信息不完整！');
        _this.activeIndex = '1-1';
        return;
      }
      if (!validate3) {
        _this.$xutils.showMsgBox('提示', '检查信息录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }
      if (!validate4) {
        _this.$xutils.showMsgBox('提示', '检查结果及意见录入信息不完整！');
        _this.activeIndex = '1-4';
        return;
      }
      let data = _this.$route.params;
      // 任务编号
      const cusId = data.pspTask.cusId;
      const cusName = data.pspTask.cusName;
      const taskNo = data.pspTask.taskNo;
      const checkType = data.pspTask.checkType;
      const rptName = data.rptName;
      const rptType = data.pspTask.rptType;
      const taskType = data.pspTask.taskType;
      var bizType = '';
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          if (checkType == '23') {
            bizType = 'SGK09'; // 定期贷后检查--个人消费性（寿光）
          } else if (checkType == '33') {
            bizType = 'SGK17'; // 不定期贷后检查-个人消费性（寿光）
          }
        } else if (loginUser.orgCode.startsWith('81')) {
          if (checkType == '23') {
            bizType = 'DHK09'; // 定期贷后检查--个人消费性（东海）
          } else if (checkType == '33') {
            bizType = 'DHK17'; // 不定期贷后检查-个人消费性（东海）
          }
        }
      } else {
        if (checkType == '23') {
          bizType = 'DH017'; // 定期贷后检查-个人消费性
        } else if (checkType == '33') {
          bizType = 'DH034'; // 不定期贷后检查-个人消费性
        } else {
          this.$xutils.showMsgBox('提示', '流程业务类型未配置');
          return;
        }
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = taskNo; // 流水号
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      startdto.param = {
        rptType: rptType,
        checkType: checkType,
        rptName: rptName,
        taskType: taskType,
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        },
        topOutsystemCode: 'DHJC'
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 根据活动页保存数据
    chooseFn: function () {
      const _this = this;
      let validate = false;
      let url = '';
      let url1 = '';
      switch (_this.activeIndex) {
      case '1-1':
        url1 = '/api/psptasklist/updateTaskAndRst';
        _this.vdata = _this.$refs.regularCheckDetail.taskData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCheckDetail.updateFlag;
        _this.$refs.regularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-2':
        url = '/api/pspcusbasecase/';
        _this.vdata = _this.$refs.regularConsumeCusBase.cusData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularConsumeCusBase.updateFlag;
        _this.$refs.regularConsumeCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url = '/api/pspcheckinfo/';
        _this.vdata = _this.$refs.regularConsumeCheckInfo.infoData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularConsumeCheckInfo.updateFlag;
        _this.$refs.regularConsumeCheckInfo.$refs.pspCheckInfoForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
        url = '/api/pspcheckrst/';
        _this.vdata = _this.$refs.regularConsumeCheckRst.rstData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularConsumeCheckRst.updateFlag;
        _this.$refs.regularConsumeCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        validate = true;
        break;
      default:
        break;
      }
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return false;
      }
      _this.changeFlag = false;
      _this.addUrl = url1 == '' ? _this.$backend.cmisPsp + url : _this.$backend.cmisPsp + url1;
      _this.updateUrl = url1 == '' ? _this.$backend.cmisPsp + url + 'update' : _this.$backend.cmisPsp + url1;
      url = '';
      url1 = '';
      return true;
    },
    // 保存/更新数据
    saveFn: function (params) {
      const _this = this;
      if (!_this.chooseFn()) {
        return;
      };
      let data = _this.vdata;
      data.pkId = null;
      let url = _this.addUrl;
      data.taskNo = _this.$route.params.pspTask.taskNo;
      // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
      if (!_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.addUrl,
          data: data,
          type: 'post',
          success: (response, status, xhr) => {
            console.log('新增成功');
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
              // 更新状态 为 已保存
              _this.updateFlag = true;
              let uData = {pkId: _this.$route.params.pspTask.pkId, checkStatus: '2'};
              _this.updateStatus(uData);
              // this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
              // });
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
      // 如果检查结果表里有数据（this.updateFlag=true），那么就更新这条检查结果
      if (_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.updateUrl,
          data: JSON.stringify(_this.vdata),
          type: 'post',
          success: (response, status, xhr) => {
            console.log('更新成功');
            if (response.code === '0') {
              if (params == 'SUBMIT') {
                // 进入流程发起
                _this.submitFn();
                _this.actionFlag = true;
              } else {
                // 操作成功
                _this.actionFlag = true;
                // 自动刷新列表数据
                this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
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
            console.log('更新状态失败');
            console.log(response);
          }
        }
      });
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
<style>
.tac {
  border: 1px solid #d1dbe5;
}
.tac .el-menu-item {
  color: #48576a !important;
  background: #fff;
}
</style>
