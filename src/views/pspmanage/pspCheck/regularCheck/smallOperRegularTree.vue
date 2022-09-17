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
          <yu-menu-item index="1-3" v-if="!autoFlag" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">预警信号分析</yu-menu-item>
          <yu-menu-item index="1-4" v-if="!autoFlag" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">经营状况分析</yu-menu-item>
          <yu-menu-item index="1-5" v-if="!autoFlag" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">财务因素分析</yu-menu-item>
          <yu-menu-item index="1-6" v-if="!autoFlag" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">非财务因素分析</yu-menu-item>
          <yu-menu-item index="1-7" v-if="!autoFlag" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">担保情况分析</yu-menu-item>
          <yu-menu-item index="1-8" v-if="!autoFlag && !normalFlag" :style="color['1-8'] && activeIndex == '1-8' ? color['1-8'] : 'color: #48576a;'">处置情况</yu-menu-item>
          <yu-menu-item index="1-9" v-if="!autoFlag" :style="color['1-9'] && activeIndex == '1-9' ? color['1-9'] : 'color: #48576a;'">检查结果及意见</yu-menu-item>
          <yu-menu-item index="1-10" v-if="!autoFlag" :style="color['1-10'] && activeIndex == '1-10' ? color['1-10'] : 'color: #48576a;'">定期检查报告-人工</yu-menu-item>
          <yu-menu-item index="1-11" v-if="autoFlag" :style="color['1-11'] && activeIndex == '1-11' ? color['1-11'] : 'color: #48576a;'">定期检查报告-自动</yu-menu-item>
          <yu-menu-item index="1-12" v-if="!autoFlag" :style="color['1-12'] && activeIndex == '1-10' ? color['1-12'] : 'color: #48576a;'">影像资料</yu-menu-item>

        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <regularCheckDetail v-show="activeIndex == '1-1'" ref="regularCheckDetail"></regularCheckDetail>
      <regularConsumeCusBase v-show="activeIndex == '1-2'" ref="regularConsumeCusBase"></regularConsumeCusBase>
      <regularWarningInfo v-show="activeIndex == '1-3'" ref="regularWarningInfo"></regularWarningInfo>
      <smallOperSituCheck v-show="activeIndex == '1-4'" ref="smallOperSituCheck"></smallOperSituCheck>
      <smallOperFinAnaly v-show="activeIndex == '1-5'" ref="smallOperFinAnaly"></smallOperFinAnaly>
      <smallOperNotFinAnaly v-show="activeIndex == '1-6'" ref="smallOperNotFinAnaly"></smallOperNotFinAnaly>
      <yu-panel v-show="activeIndex == '1-7'" panel-type="simple">
        <template>
          <regularSmallGuarntrInfo ref="regularSmallGuarntrInfo"></regularSmallGuarntrInfo>
        </template>
        <template>
          <regularSmallPldimnInfo ref="regularSmallPldimnInfo"></regularSmallPldimnInfo>
        </template>
      </yu-panel>
      <regularSmallDealSitu v-show="activeIndex == '1-8'" ref="regularSmallDealSitu"></regularSmallDealSitu>
      <regularConsumeCheckRst v-show="activeIndex == '1-9'" ref="regularConsumeCheckRst"></regularConsumeCheckRst>
      <pspCheckReport v-show="activeIndex == '1-10'" ref="pspCheckReport"></pspCheckReport>
      <pspCheckReport v-show="activeIndex == '1-11'" ref="pspCheckReport"></pspCheckReport>
      <yu-panel v-if="activeIndex === '1-12'" v-model="activeName" :collapse-hide="false" name="forth">
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
import regularBankFinSitu from '@/views/pspmanage/pspCheck/regularCheck/regularBankFinSitu';
import regularWarningInfo from '@/views/pspmanage/pspCheck/regularCheck/regularWarningInfo';
import smallOperSituCheck from '@/views/pspmanage/pspCheck/regularCheck/smallOperSituCheck';
import regularOtherCheck from '@/views/pspmanage/pspCheck/regularCheck/regularOtherCheck';
import regularConsumeCusBase from '@/views/pspmanage/pspCheck/regularCheck/regularConsumeCusBase';
import smallOperFinAnaly from '@/views/pspmanage/pspCheck/regularCheck/smallOperFinAnaly';
import smallOperNotFinAnaly from '@/views/pspmanage/pspCheck/regularCheck/smallOperNotFinAnaly';
import regularSmallGuarntrInfo from '@/views/pspmanage/pspCheck/regularCheck/regularSmallGuarntrInfo';
import regularSmallPldimnInfo from '@/views/pspmanage/pspCheck/regularCheck/regularSmallPldimnInfo';
import regularSmallDealSitu from '@/views/pspmanage/pspCheck/regularCheck/regularSmallDealSitu';
import regularConsumeCheckRst from '@/views/pspmanage/pspCheck/regularCheck/regularConsumeCheckRst';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  props: {
    bizPageData: Object,
    pageParams: Object
  },
  components: { imageSystem, regularCheckDetail, regularBankFinSitu, regularWarningInfo, smallOperSituCheck, regularOtherCheck, regularConsumeCusBase, smallOperFinAnaly, smallOperNotFinAnaly, regularSmallGuarntrInfo, regularSmallPldimnInfo, regularSmallDealSitu, regularConsumeCheckRst, pspCheckReport, yufpNwfInit },
  data: function () {
    return {
      color: ['1-1'],
      activeIndex: '1-1',
      rptType: '', // 1-正常，2-瑕疵，3-不良
      checkType: '', // 34-不定期检查（小微经营性），24-定期检查（小微经营性）
      autoFlag: false, // 是否自动检查
      viewFlag: false, // 是否查看页面
      vdata: {},
      updateUrl: '',
      addUrl: '',
      image: '1',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      normalFlag: true,
      imageBizParam: [],
      cusId: '',
      taskNo: ''
    };
  },
  mounted () {
    var _this = this;
    _this.normalFlag = _this.$route.params.pspTask.rptType == '1';
    _this.autoFlag = _this.$route.params.pspTask.taskType == '2';
    _this.viewFlag = _this.$route.params.opType === 'view';
  },
  created () {
    this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      // 判断从代办进入
      if (_this.bizPageData) {
        _this.image = '2';
        _this.workFolwInit();
      } else {
        _this.rptType = _this.$route.params.pspTask.rptType;
        _this.checkType = _this.$route.params.pspTask.checkType;
        _this.op = _this.$route.params.op;
        _this.viewFlag = _this.$route.params.opType === 'view';
        _this.normalFlag = _this.$route.params.pspTask.rptType == '1';
        _this.autoFlag = _this.$route.params.pspTask.taskType == '2';
        _this.cusId = _this.$route.params.pspTask.cusId;
        _this.taskNo = _this.$route.params.pspTask.taskNo;
        if (_this.viewFlag) {
          _this.image = '2';
        }
      }
      _this.imageBizParam = [{
        'top_outsystem_code': 'DHJC',
        'outsystem_code': 'DHJC05,DHJC06',
        'index': {
          'businessid': _this.taskNo,
          'custid': _this.cusId

        }
      }];
    },
    workFolwInit: function () {
      const _this = this;
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      // const taskNo = data.bizId;
      var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      _this.rptType = flowParam.rptType;
      _this.checkType = flowParam.checkType;
      _this.cusId = data.bizUserId;
      _this.taskNo = data.bizId;
      _this.$route.params.pspTask = {
        rptType: _this.rptType,
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
    submitFn: function (params) {
      let _this = this;
      // 开始提交流程
      // 提交校验
      _this.actionFlag = true;
      debugger;
      var validate1 = false;
      var validate2 = false;
      var validate3 = false;
      var validate4 = false;
      var validate5 = false;
      var validate6 = false;
      var validate7 = false;
      var validate8 = false;
      var validate9 = false;
      _this.$refs.regularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
        validate1 = valid;
      });
      _this.$refs.regularConsumeCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
        validate2 = valid;
      });
      if (_this.$refs.regularWarningInfo.$refs.refTable.tabledata.length < 1) {
        validate3 = true;
      } else {
        _this.$refs.regularWarningInfo.$refs.pspWarningInfoAnalyForm.validate(function (valid) {
          validate3 = valid;
        });
      }
      _this.$refs.smallOperSituCheck.$refs.pspSmallOperForm.validate(function (valid) {
        validate4 = valid;
      });
      _this.$refs.smallOperFinAnaly.$refs.pspFinaSituForm.validate(function (valid) {
        validate5 = valid;
      });
      _this.$refs.smallOperNotFinAnaly.$refs.pspNfinaSituForm.validate(function (valid) {
        validate6 = valid;
      });
      _this.$refs.regularSmallGuarntrInfo.$refs.pspGuarntrCheckForm.validate(function (valid) {
        validate7 = valid;
      });
      if (validate7) {
        _this.$refs.regularSmallPldimnInfo.$refs.pspPldimnCheckForm.validate(function (valid) {
          validate7 = valid;
        });
      }
      if (!_this.autoFlag && !_this.normalFlag) {
        _this.$refs.regularSmallDealSitu.$refs.pspDealSituForm.validate(function (valid) {
          validate8 = valid;
        });
      } else {
        validate8 = true;
      }
      _this.$refs.regularConsumeCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
        validate9 = valid;
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
        _this.$xutils.showMsgBox('提示', '预警信号分析录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }
      if (!validate4) {
        _this.$xutils.showMsgBox('提示', '经营状况分析录入信息不完整！');
        _this.activeIndex = '1-4';
        return;
      }
      if (!validate5) {
        _this.$xutils.showMsgBox('提示', '财务因素分析录入信息不完整！');
        _this.activeIndex = '1-5';
        return;
      }
      if (!validate6) {
        _this.$xutils.showMsgBox('提示', '非财务因素分析录入信息不完整！');
        _this.activeIndex = '1-6';
        return;
      }
      if (!validate7) {
        _this.$xutils.showMsgBox('提示', '担保情况分析录入信息不完整！');
        _this.activeIndex = '1-7';
        return;
      }
      if (!validate8) {
        _this.$xutils.showMsgBox('提示', '处置情况录入信息不完整！');
        _this.activeIndex = '1-8';
        return;
      }
      if (!validate9) {
        _this.$xutils.showMsgBox('提示', '检查结果及意见录入信息不完整！');
        _this.activeIndex = '1-9';
        return;
      }
      let data = _this.$route.params;
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      var bizType = '';
      if (_this.rptType == '1' && _this.checkType == '24') { // 小微经营性正常类-定期检查
        bizType = 'DH011';
      } else if (_this.rptType == '2' && _this.checkType == '24') { // 小微经营性瑕疵类-定期检查
        bizType = 'DH012';
      } else if (_this.rptType == '3' && _this.checkType == '24') { // 小微经营性不良类-定期检查
        bizType = 'DH013';
      } else if (_this.rptType == '1' && _this.checkType == '34') { // 小微经营性不良类-不定期检查
        bizType = 'DH028';
      } else if (_this.rptType == '2' && _this.checkType == '34') { // 小微经营性不良类-不定期检查
        bizType = 'DH029';
      } else if (_this.rptType == '3' && _this.checkType == '34') { // 小微经营性不良类-不定期检查
        bizType = 'DH030';
      } else {
        this.$xutils.showMsgBox('提示', '流程业务类型未配置！');
        return;
      }

      const loginUser = _this.$xutils.getLoginUserInfo();
      // 查询分中心负责人
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/xwcommonservice/getcentermanageridinfo',
        data: {managerId: loginUser.loginCode},
        callback: function (code, message, response) {
          if (response.code == '0') {
            // 提交流程
            if (response.data) {
              let startdto = {};
              startdto.systemId = 'cmis';
              startdto.orgId = loginUser.orgCode;
              startdto.userId = loginUser.loginCode;
              startdto.bizType = bizType;
              startdto.bizId = taskNo; // 流水号
              startdto.bizUserName = data.pspTask.cusName;
              startdto.bizUserId = data.pspTask.cusId;
              startdto.bizParam1 = response.data.userCode;// 分中心负责人
              startdto.param = {
                rptType: _this.rptType,
                checkType: _this.checkType,
                index: {
                  'businessid': _this.taskNo,
                  'billno': _this.billNo
                },
                topOutsystemCode: 'DHJC'
              };
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
              _this.$message.error('查询分中心负责人数据为空');
            }
          } else {
            _this.$message.error(response.message);
          }
        }
      });
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
        url = '/api/pspwarninginfoanaly/';
        _this.vdata = _this.$refs.regularWarningInfo.warnData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularWarningInfo.updateFlag;
        _this.$refs.regularWarningInfo.$refs.pspWarningInfoAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
        url = '/api/pspdebitopercaseanaly/';
        _this.vdata = _this.$refs.smallOperSituCheck.operData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.smallOperSituCheck.updateFlag;
        _this.$refs.smallOperSituCheck.$refs.pspSmallOperForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        url = '/api/pspdebitfinaanaly/';
        _this.vdata = _this.$refs.smallOperFinAnaly.finaData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.smallOperFinAnaly.updateFlag;
        _this.$refs.smallOperFinAnaly.$refs.pspFinaSituForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-6':
        url = '/api/pspdebitnotfinaanaly/';
        _this.vdata = _this.$refs.smallOperNotFinAnaly.nfinaData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.smallOperNotFinAnaly.updateFlag;
        _this.$refs.smallOperNotFinAnaly.$refs.pspNfinaSituForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-7':
        url1 = '/api/pspguarntrcheck/updateGuarntrAndPldimn';
        _this.vdata = {};
        yufp.clone(_this.$refs.regularSmallPldimnInfo.pldimnData, _this.vdata);
        _this.vdata.totlEvlu4Pldimn = _this.$refs.regularSmallPldimnInfo.pldimnData.totlEvlu;
        yufp.clone(_this.$refs.regularSmallGuarntrInfo.guarntrData, _this.vdata);
        _this.$refs.regularSmallGuarntrInfo.$refs.pspGuarntrCheckForm.validate(function (valid) {
          validate = valid;
        });
        if (validate) {
          _this.$refs.regularSmallPldimnInfo.$refs.pspPldimnCheckForm.validate(function (valid) {
            validate = valid;
          });
        }
        break;
      case '1-8':
        url = '/api/pspdealsitu/';
        _this.vdata = _this.$refs.regularSmallDealSitu.dealData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularSmallDealSitu.updateFlag;
        _this.$refs.regularSmallDealSitu.$refs.pspDealSituForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-9':
        url = '/api/pspcheckrst/';
        _this.vdata = _this.$refs.regularConsumeCheckRst.rstData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularConsumeCheckRst.updateFlag;
        _this.$refs.regularConsumeCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-10':
        validate = true;
        break;
      case '1-11':
        validate = true;
        break;
      case '1-12':
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
