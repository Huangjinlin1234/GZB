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
          <template slot="title">不定期贷后检查</template>
          <yu-menu-item index="1-1" :style="color['1-1'] && activeIndex == '1-1' ? color['1-1'] : 'color: #48576a;'">检查任务信息</yu-menu-item>
          <yu-menu-item index="1-2" :style="color['1-2'] && activeIndex == '1-2' ? color['1-2'] : 'color: #48576a;'">基本情况</yu-menu-item>
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">融资分析</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">法律效力审查</yu-menu-item>
          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">风险成因</yu-menu-item>
          <yu-menu-item index="1-6" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">履约能力分析</yu-menu-item>
          <yu-menu-item index="1-7" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">担保状况检查</yu-menu-item>
          <yu-menu-item index="1-8" :style="color['1-8'] && activeIndex == '1-8' ? color['1-8'] : 'color: #48576a;'">检查结果及意见</yu-menu-item>
          <yu-menu-item index="1-9" :style="color['1-9'] && activeIndex == '1-9' ? color['1-9'] : 'color: #48576a;'">定期检查报告</yu-menu-item>
          <yu-menu-item index="1-10" :style="color['1-10'] && activeIndex == '1-10' ? color['1-10'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <regularCheckDetail v-show="activeIndex == '1-1'" ref="regularCheckDetail"></regularCheckDetail>
      <regularCusBase v-show="activeIndex == '1-2'" ref="regularCusBase"></regularCusBase>
      <regularBadFinAnaly v-show="activeIndex == '1-3'" ref="regularBadFinAnaly"></regularBadFinAnaly>
      <regularLegalCheck v-show="activeIndex == '1-4'" ref="regularLegalCheck"></regularLegalCheck>
      <regularRiskFactor v-show="activeIndex == '1-5'" ref="regularRiskFactor"></regularRiskFactor>
      <regularPromiseAnaly v-show="activeIndex == '1-6'" ref="regularPromiseAnaly"></regularPromiseAnaly>
      <yu-panel v-show="activeIndex == '1-7'" panel-type="simple">
        <template>
          <regularGuarntrInfo ref="regularGuarntrInfo"></regularGuarntrInfo>
        </template>
        <template>
          <regularPldimnInfo ref="regularPldimnInfo"></regularPldimnInfo>
        </template>
      </yu-panel>
      <regularOperBadCheckRst v-show="activeIndex == '1-8'" ref="regularOperBadCheckRst"></regularOperBadCheckRst>
      <pspCheckReport v-if="activeIndex == '1-9'" ref="pspCheckReport"></pspCheckReport>
      <yu-panel v-if="activeIndex == '1-10'" v-model="activeName" :collapse-hide="false" name="forth">
            <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-panel>
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
import imageSystem from '@/views/imageManage/imageSystem';
import regularCheckDetail from '@/views/pspmanage/pspCheck/regularCheck/regularCheckDetail';
import regularCusBase from '@/views/pspmanage/pspCheck/regularCheck/regularCusBase';
import regularGuarCheck from '@/views/pspmanage/pspCheck/regularCheck/regularGuarCheck';
import regularGuarntrInfo from '@/views/pspmanage/pspCheck/regularCheck/regularGuarntrInfo';
import regularPldimnInfo from '@/views/pspmanage/pspCheck/regularCheck/regularPldimnInfo';
import regularBadFinAnaly from '@/views/pspmanage/pspCheck/regularCheck/regularBadFinAnaly';
import regularLegalCheck from '@/views/pspmanage/pspCheck/regularCheck/regularLegalCheck';
import regularRiskFactor from '@/views/pspmanage/pspCheck/regularCheck/regularRiskFactor';
import regularPromiseAnaly from '@/views/pspmanage/pspCheck/regularCheck/regularPromiseAnaly';
import regularOperBadCheckRst from '@/views/pspmanage/pspCheck/regularCheck/regularOperBadCheckRst';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';

export default {
  props: {
    bizPageData: Object
  },
  components: { imageSystem, regularCheckDetail, regularCusBase, regularGuarCheck, regularGuarntrInfo, regularPldimnInfo, regularBadFinAnaly, regularLegalCheck, regularRiskFactor, regularPromiseAnaly, regularOperBadCheckRst, pspCheckReport, yufpNwfInit },
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
      image: '1',
      addUrl: '',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      imageBizParam: [],
      cusId: '',
      taskNo: '',
      isPlace: ''
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
      if (_this.bizPageData) {
        _this.image = '2';
        _this.workFolwInit();
      } else {
        _this.rptType = _this.$route.params.rptType;
        _this.op = _this.$route.params.op;
        _this.viewFlag = _this.$route.params.opType === 'view';
        _this.cusId = _this.$route.params.pspTask.cusId;
        _this.taskNo = _this.$route.params.pspTask.taskNo;
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
      _this.taskNo = data.bizId;
      _this.cusId = data.bizUserId;
      _this.$route.params.pspTask = {
        taskNo: _this.taskNo
      };
      _this.$route.params.opType = 'view';
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
      var validate2 = false;
      var validate3 = false;
      var validate4 = false;
      var validate5 = false;
      var validate6 = false;
      // var validate7 = false;
      var validate8 = false;
      _this.$refs.regularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
        validate1 = valid;
      });
      _this.$refs.regularCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
        validate2 = valid;
      });
      _this.$refs.regularBadFinAnaly.$refs.pspCusFinForm.validate(function (valid) {
        validate3 = valid;
      });
      _this.$refs.regularLegalCheck.$refs.pspLegalCheckForm.validate(function (valid) {
        validate4 = valid;
      });
      _this.$refs.regularRiskFactor.$refs.pspRiskFactorForm.validate(function (valid) {
        validate5 = valid;
      });
      _this.$refs.regularRiskFactor.$refs.pspRiskFactorForm.validate(function (valid) {
        validate6 = valid;
      });
      // _this.$refs.regularGuarntrInfo.$refs.pspGuarntrCheckForm.validate(function (valid) {
      //   validate7 = valid;
      // });
      _this.$refs.regularOperBadCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
        validate8 = valid;
      });
      if (!validate1) {
        _this.$xutils.showMsgBox('提示', '检查任务信息录入信息不完整！');
        _this.activeIndex = '1-1';
        return;
      }
      if (!validate2) {
        _this.$xutils.showMsgBox('提示', '基本情况录入信息不完整！');
        _this.activeIndex = '1-2';
        return;
      }
      if (!validate3) {
        _this.$xutils.showMsgBox('提示', '融资分析录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }
      if (!validate4) {
        _this.$xutils.showMsgBox('提示', '法律效力审查录入信息不完整！');
        _this.activeIndex = '1-4';
        return;
      }
      if (!validate5) {
        _this.$xutils.showMsgBox('提示', '风险成因录入信息不完整！');
        _this.activeIndex = '1-5';
        return;
      }
      if (!validate6) {
        _this.$xutils.showMsgBox('提示', '履约能力分析录入信息不完整！');
        _this.activeIndex = '1-6';
        return;
      }
      // if (!validate7) {
      //   _this.$xutils.showMsgBox('提示', '担保状况检查录入信息不完整！');
      //   _this.activeIndex = '1-7';
      //   return;
      // }
      if (!validate8) {
        _this.$xutils.showMsgBox('提示', '检查结果及意见录入信息不完整！');
        _this.activeIndex = '1-8';
        return;
      }
      let data = this.$route.params;
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      // 报告类型
      const rptType = data.pspTask.rptType;
      // 检查类型
      const checkType = data.pspTask.checkType;
      var bizType = '';
      const loginUser = _this.$xutils.getLoginUserInfo();
      _this.orgType = loginUser.org.orgType;
      if (_this.orgType == '3' || _this.orgType == '4') {
        _this.isPlace = 'T';
      } else {
        _this.isPlace = 'F';
      }
      if (_this.orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          if (checkType == '22') {
            bizType = 'SGK08'; // 定期贷后检查-个人经营性不良类（寿光）
          } else if (checkType == '32') {
            bizType = 'SGK16'; // 不定期贷后检查-个人经营性不良类（寿光）
          }
        } else if (loginUser.orgCode.startsWith('81')) {
          if (checkType == '22') {
            bizType = 'DHK08'; // 定期贷后检查-个人经营性不良类（东海）
          } else if (checkType == '32') {
            bizType = 'DHK16'; // 不定期贷后检查-个人经营性不良类（东海）
          }
        }
      } else {
        if (rptType == '3' && checkType == '22') {
          bizType = 'DH010';
        } else if (rptType == '3' && checkType == '32') {
          bizType = 'DH010';
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
      startdto.bizUserName = _this.$route.params.pspTask.cusName;
      startdto.bizUserId = _this.$route.params.pspTask.cusId;
      startdto.param = {
        isPlace: _this.isPlace,
        orgType: '6',
        pspTask: data.pspTask,
        rptType: _this.rptType,
        op: 'submit',
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
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
        url = '/api/pspcheckrst/';
        _this.vdata = _this.$refs.regularCheckDetail.taskData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCheckDetail.updateFlag;
        _this.$refs.regularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-2':
        url = '/api/pspcusbasecase/';
        _this.vdata = _this.$refs.regularCusBase.cusData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCusBase.updateFlag;
        _this.$refs.regularCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url = '/api/pspcusfinanaly/';
        _this.vdata = _this.$refs.regularBadFinAnaly.finData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularBadFinAnaly.updateFlag;
        _this.$refs.regularBadFinAnaly.$refs.pspCusFinForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
        url = '/api/psplegalcheck/';
        _this.vdata = _this.$refs.regularLegalCheck.legalData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularLegalCheck.updateFlag;
        _this.$refs.regularLegalCheck.$refs.pspLegalCheckForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        url = '/api/pspriskfactor/';
        _this.vdata = _this.$refs.regularRiskFactor.riskData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularRiskFactor.updateFlag;
        _this.$refs.regularRiskFactor.$refs.pspRiskFactorForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-6':
        url = '/api/psppromiseanaly/';
        _this.vdata = _this.$refs.regularPromiseAnaly.promiseData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularPromiseAnaly.updateFlag;
        _this.$refs.regularPromiseAnaly.$refs.pspPromiseAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-7':
        url1 = '/api/pspguarntrcheck/updateGuarntrAndPldimn';
        _this.vdata = {};
        yufp.clone(_this.$refs.regularPldimnInfo.$refs.refTable.tabledata, _this.vdata);
        yufp.clone(_this.$refs.regularGuarntrInfo.$refs.refTable.tabledata, _this.vdata);
        _this.$refs.regularGuarntrInfo.$refs.refTable.validate(function (fields) {
          if (!fields) { // 如果校验通过, fields为null
            validate = true;
          } else {
            validate = false;
          }
        });
        if (validate) {
          _this.$refs.regularPldimnInfo.$refs.refTable.validate(function (fields) {
            if (!fields) { // 如果校验通过, fields为null
              validate = true;
            } else {
              validate = false;
            }
          });
        }
        break;
      case '1-8':
        url = '/api/pspdealsitu/';
        _this.vdata = _this.$refs.regularOperBadCheckRst.rstData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularOperBadCheckRst.updateFlag;
        _this.$refs.regularOperBadCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
          validate = valid;
        });
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
    saveFn: function (param) {
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
              // 操作成功
              _this.actionFlag = true;
              if (param === 'SUBMIT') {
                _this.submitFn();
              } else {
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
