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
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">融资及对外担保情况</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">预警信号分析</yu-menu-item>
          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">经营状况检查</yu-menu-item>
          <yu-menu-item index="1-6" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">财务状况检查</yu-menu-item>
          <yu-menu-item index="1-7" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">担保状况检查</yu-menu-item>
          <yu-menu-item index="1-8" v-if="normalFlag" :style="color['1-8'] && activeIndex == '1-8' ? color['1-8'] : 'color: #48576a;'">其他检查</yu-menu-item>
          <yu-menu-item index="1-9" :style="color['1-9'] && activeIndex == '1-9' ? color['1-9'] : 'color: #48576a;'">授信时贷后管理建议落实情况</yu-menu-item>
          <yu-menu-item index="1-10" :style="color['1-10'] && activeIndex == '1-10' ? color['1-10'] : 'color: #48576a;'">检查结果及意见</yu-menu-item>
          <yu-menu-item index="1-11" :style="color['1-11'] && activeIndex == '1-11' ? color['1-11'] : 'color: #48576a;'">不定期检查报告</yu-menu-item>
          <yu-menu-item index="1-13" :style="color['1-13'] && activeIndex == '1-13' ? color['1-13'] : 'color: #48576a;'">征信报告</yu-menu-item>
          <yu-menu-item index="1-12" :style="color['1-12'] && activeIndex == '1-12' ? color['1-12'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <regularCheckDetail v-if="activeIndex == '1-1'" ref="regularCheckDetail"></regularCheckDetail>
      <regularCusBase v-if="activeIndex == '1-2'" ref="regularCusBase"></regularCusBase>
      <yu-panel v-if="activeIndex == '1-3'" panel-type="simple">
        <template>
          <regularNormalFinAnaly ref="regularNormalFinAnaly"></regularNormalFinAnaly>
        </template>
        <template>
          <regularBankFinSitu ref="regularBankFinSitu"></regularBankFinSitu>
        </template>
        <template>
          <regularGuarCheck ref="regularGuarCheck"></regularGuarCheck>
        </template>
      </yu-panel>
      <regularWarningInfo v-if="activeIndex == '1-4'" ref="regularWarningInfo"></regularWarningInfo>
      <regularOperCommon v-if="activeIndex == '1-5'" ref="regularOperCommon"></regularOperCommon>
      <regularFinaAnaly v-if="activeIndex == '1-6'" ref="regularFinaAnaly"></regularFinaAnaly>
      <yu-panel v-if="activeIndex == '1-7'" panel-type="simple">
        <template>
          <regularGuarntrInfo ref="regularGuarntrInfo"></regularGuarntrInfo>
        </template>
        <template>
          <regularPldimnInfo ref="regularPldimnInfo"></regularPldimnInfo>
        </template>
      </yu-panel>
      <regularOtherCheck v-if="activeIndex == '1-8'" ref="regularOtherCheck"></regularOtherCheck>
      <regularImplementOpt v-if="activeIndex == '1-9'" ref="regularImplementOpt"></regularImplementOpt>
      <pspCheckRstB v-show="activeIndex == '1-10'" ref="regularCheckRst" :form-type="formType=='edit' ? 'edit' : 'details'"></pspCheckRstB>
      <pspCheckReport v-if="activeIndex == '1-11'" ref="pspCheckReport"></pspCheckReport>
      <d1-3-billlist v-if="activeIndex == '1-13'" ref="d1_3_BillList" :biz-page-data="bizPageData"></d1-3-billlist>
      <yu-panel v-if="activeIndex === '1-12'" v-model="activeName" :collapse-hide="false" name="forth">
            <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-panel>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button v-if="!viewFlag" type="primary" @click="saveFn('SUBMIT')">提交</yu-button>
          <yu-button v-if="!viewFlag || flag" type="primary" @click="saveFn">保存</yu-button>
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
import pspCheckRstB from '@/views/psp/pspchecktask/pspCheckRstB.vue';
import pspCheckRstA from '@/views/psp/pspchecktask/pspCheckRstA.vue';
import regularCheckDetail from '@/views/pspmanage/pspCheck/regularCheck/regularCheckDetail';
import regularCusBase from '@/views/pspmanage/pspCheck/regularCheck/regularCusBase';
import regularNormalFinAnaly from '@/views/pspmanage/pspCheck/regularCheck/regularNormalFinAnaly';
import regularBankFinSitu from '@/views/pspmanage/pspCheck/regularCheck/regularBankFinSitu';
import regularGuarCheck from '@/views/pspmanage/pspCheck/regularCheck/regularGuarCheck';
import regularWarningInfo from '@/views/pspmanage/pspCheck/regularCheck/regularWarningInfo';
import regularOperCommon from '@/views/pspmanage/pspCheck/regularCheck/regularOperCommon';
import regularGuarntrInfo from '@/views/pspmanage/pspCheck/regularCheck/regularGuarntrInfo';
import regularPldimnInfo from '@/views/pspmanage/pspCheck/regularCheck/regularPldimnInfo';
import regularImplementOpt from '@/views/pspmanage/pspCheck/regularCheck/regularImplementOpt';
import regularCheckRst from '@/views/pspmanage/pspCheck/regularCheck/regularCheckRst';
import regularOtherCheck from '@/views/pspmanage/pspCheck/regularCheck/regularOtherCheck';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import regularFinaAnaly from '@/views/pspmanage/pspCheck/regularCheck/regularFinaAnaly';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  props: {
    bizPageData: Object
  },
  components: {d13Billlist, pspCheckRstB, pspCheckRstA, imageSystem, regularCheckDetail, regularCusBase, regularNormalFinAnaly, regularBankFinSitu, regularGuarCheck, regularWarningInfo, regularOperCommon, regularGuarntrInfo, regularPldimnInfo, regularImplementOpt, regularCheckRst, regularOtherCheck, pspCheckReport, regularFinaAnaly, yufpNwfInit },
  data: function () {
    return {
      color: ['1-1'],
      activeIndex: '1-1',
      rptType: '',
      autoFlag: false, // 是否自动检查
      viewFlag: false, // 是否查看页面
      normalFlag: false, // 是否正常
      flag: false,
      op: '',
      show: false,
      vdata: {},
      updateUrl: '',
      image: '1',
      formType: '',
      addUrl: '',
      taskNo: '',
      cusId: '',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      imageBizParam: []
    };
  },

  watch: {
    // 页签的值，显示保存按钮。
    'activeIndex': function () {
      if (this.bizPageData) {
        if (this.activeIndex == '1-10') {
          this.flag = true;
        } else {
          this.flag = false;
        }
      } else {
        this.flag = false;
      }
    }
  },

  // mounted () {
  //   var _this = this;
  //   _this.rptType = _this.$route.params.rptType;
  //   _this.op = _this.$route.params.op;
  //   _this.viewFlag = _this.$route.params.opType === "view";
  // },
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
      _this.formType = 'edit';
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      _this.taskNo = data.bizId;
      _this.cusId = data.bizUserId;
      _this.$route.params.taskNo = _this.taskNo;
      _this.$route.params.formType = flowParam.formType;
      _this.$route.params.partnerNo = flowParam.partnerNo;
      _this.$route.params.partnerName = flowParam.partnerName;
      _this.rptName = flowParam.rptName;
      _this.taskType = flowParam.taskType;
      _this.rptType = flowParam.rptType === '2';
      _this.orgType = flowParam.orgType;
      _this.$route.params.pspTask = {
        taskNo: _this.taskNo,
        rptType: _this.rptType,
        taskType: _this.taskType,
        orgType: _this.orgType
      };

      _this.$route.params.opType = 'view';
      _this.$route.params.rptName = _this.rptName;
    //   if (data.nodeId == '500_5') {
    //     _this.$route.params.assistFlag = true;
    //   } else {
    //     _this.$route.params.assistFlag = false;
    //   }
      // console.log('data', data);
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
        _this.vdata = _this.$refs.regularCusBase.cusData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCusBase.updateFlag;
        _this.$refs.regularCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url1 = '/api/pspcusfinanaly/updateFinAndGuar';
        _this.vdata = {};
        yufp.clone(_this.$refs.regularNormalFinAnaly.finData, _this.vdata);
        yufp.clone(_this.$refs.regularGuarCheck.guarData, _this.vdata);
        _this.$refs.regularNormalFinAnaly.$refs.pspCusFinAnalyForm.validate(function (valid) {
          validate = valid;
        });
        if (validate) {
          _this.$refs.regularGuarCheck.$refs.pspGuarCheckForm.validate(function (valid) {
            validate = valid;
          });
        }
        break;
      case '1-4':
        url = '/api/pspwarninginfoanaly/';
        _this.vdata = _this.$refs.regularWarningInfo.warnData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularWarningInfo.updateFlag;
        _this.$refs.regularWarningInfo.$refs.pspWarningInfoAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        url = '/api/pspoperstatuscheck/';
        _this.vdata = _this.$refs.regularOperCommon.operData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularOperCommon.updateFlag;
        _this.$refs.regularOperCommon.$refs.pspOperstatusForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-6':
        _this.$refs.regularFinaAnaly.saveFn();
        url = '/api/pspcusbasecase/';
        _this.vdata = _this.$refs.regularFinaAnaly.finaData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularFinaAnaly.updateFlag;
        _this.$refs.regularFinaAnaly.$refs.pspFinaAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-7':
        url1 = '/api/pspguarntrcheck/updateGuarntrAndPldimn';
        _this.vdata = {};
        yufp.clone(_this.$refs.regularPldimnInfo.pldimnData, _this.vdata);
        _this.vdata.isOtherRiskEvent4Pldimn = _this.$refs.regularPldimnInfo.pldimnData.isOtherRiskEvent;
        _this.vdata.riskEventExpl4Pldimn = _this.$refs.regularPldimnInfo.pldimnData.riskEventExpl;
        yufp.clone(_this.$refs.regularGuarntrInfo.guarntrData, _this.vdata);
        _this.$refs.regularGuarntrInfo.$refs.pspGuarntrCheckForm.validate(function (valid) {
          validate = valid;
        });
        if (validate) {
          _this.$refs.regularPldimnInfo.$refs.pspPldimnCheckForm.validate(function (valid) {
            validate = valid;
          });
        }
        break;
      case '1-8':
        url = '/api/pspothercasecheckblemish/';
        _this.vdata = _this.$refs.regularOtherCheck.blemishData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularOtherCheck.updateFlag;
        _this.$refs.regularOtherCheck.$refs.pspOtherCaseCheckBlemishForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-9':
        break;
      case '1-10':
        url = '/api/pspcheckrst/';
        _this.vdata = _this.$refs.regularCheckRst.rstData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCheckRst.updateFlag;
        _this.$refs.regularCheckRst.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-11':
        break;
      case '1-12':
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
