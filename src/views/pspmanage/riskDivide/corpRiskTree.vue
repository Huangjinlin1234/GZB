/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-公司客户风险分类
 */
<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="18">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-submenu index="1">
          <template slot="title">风险分类-任务初分</template>
          <yu-menu-item index="1-1" :style="color['1-1'] && activeIndex == '1-1' ? color['1-1'] : 'color: #48576a;'">任务基本信息</yu-menu-item>
          <yu-menu-item index="1-2" :style="color['1-2'] && activeIndex == '1-2' ? color['1-2'] : 'color: #48576a;'">借款人情况分析</yu-menu-item>
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">经营情况分析</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">贷款情况分析</yu-menu-item>
          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">影响偿还因素分析</yu-menu-item>
          <yu-menu-item index="1-6" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">担保合同分析</yu-menu-item>
          <yu-menu-item index="1-7" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">抵质押情况分析</yu-menu-item>
          <yu-menu-item index="1-8" :style="color['1-8'] && activeIndex == '1-8' ? color['1-8'] : 'color: #48576a;'">保证人情况分析</yu-menu-item>
          <yu-menu-item index="1-9" :style="color['1-9'] && activeIndex == '1-9' ? color['1-9'] : 'color: #48576a;'">财务情况分析</yu-menu-item>
          <yu-menu-item index="1-10" :style="color['1-10'] && activeIndex == '1-10' ? color['1-10'] : 'color: #48576a;'">非财务情况分析</yu-menu-item>
          <yu-menu-item index="1-11" :style="color['1-11'] && activeIndex == '1-11' ? color['1-11'] : 'color: #48576a;'">综合分析</yu-menu-item>
          <yu-menu-item index="1-12" :style="color['1-12'] && activeIndex == '1-12' ? color['1-12'] : 'color: #48576a;'">初分</yu-menu-item>
          <yu-menu-item index="1-13" :style="color['1-13'] && activeIndex == '1-13' ? color['1-13'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <riskDivideDetail v-show="activeIndex == '1-1'" ref="riskDivideDetail"></riskDivideDetail>
      <corpRiskDebitAnaly v-show="activeIndex == '1-2'" ref="corpRiskDebitAnaly"></corpRiskDebitAnaly>
      <corpRiskOperAnaly v-show="activeIndex == '1-3'" ref="corpRiskOperAnaly"></corpRiskOperAnaly>
      <riskLoanSituAnaly v-show="activeIndex == '1-4'" ref="riskLoanSituAnaly" ></riskLoanSituAnaly>
      <corpRiskRepayAnaly v-show="activeIndex == '1-5'" ref="corpRiskRepayAnaly"></corpRiskRepayAnaly>
      <riskGuarContAnaly v-show="activeIndex == '1-6'" ref="riskGuarContAnaly"></riskGuarContAnaly>
      <riskPldimnAnaly v-show="activeIndex == '1-7'" ref="riskPldimnAnaly"></riskPldimnAnaly>
      <riskGuarntrAnaly v-show="activeIndex == '1-8'" ref="riskGuarntrAnaly"></riskGuarntrAnaly>
      <riskFinaAnaly v-show="activeIndex == '1-9'" ref="riskFinaAnaly"></riskFinaAnaly>
      <riskNonFinaAnaly v-show="activeIndex == '1-10'" ref="riskNonFinaAnaly"></riskNonFinaAnaly>
      <riskCompAnaly v-show="activeIndex == '1-11'" ref="riskCompAnaly"></riskCompAnaly>
      <riskResultInfo v-show="activeIndex == '1-12'" ref="riskResultInfo" :type="type"></riskResultInfo>
      <yu-panel v-show="activeIndex === '1-13'" v-model="activeName" :collapse-hide="false" name="forth">
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-panel>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button v-show="!viewFlag" :hidden="isHidden" type="primary" @click="submitFn('SUBMIT')">提交</yu-button>
          <yu-button v-show="!viewFlag" :hidden="isHidden" type="primary" @click="saveFn">保存</yu-button>
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
import riskDivideDetail from '@/views/pspmanage/riskDivide/riskDivideDetail';
import corpRiskDebitAnaly from '@/views/pspmanage/riskDivide/corpRiskDebitAnaly';
import corpRiskOperAnaly from '@/views/pspmanage/riskDivide/corpRiskOperAnaly';
import riskLoanSituAnaly from '@/views/pspmanage/riskDivide/riskLoanSituAnaly';
import corpRiskRepayAnaly from '@/views/pspmanage/riskDivide/corpRiskRepayAnaly';
import riskGuarContAnaly from '@/views/pspmanage/riskDivide/riskGuarContAnaly';
import riskPldimnAnaly from '@/views/pspmanage/riskDivide/riskPldimnAnaly';
import riskGuarntrAnaly from '@/views/pspmanage/riskDivide/riskGuarntrAnaly';
import riskFinaAnaly from '@/views/pspmanage/riskDivide/riskFinaAnaly';
import riskNonFinaAnaly from '@/views/pspmanage/riskDivide/riskNonFinaAnaly';
import riskCompAnaly from '@/views/pspmanage/riskDivide/riskCompAnaly';
import riskResultInfo from '@/views/pspmanage/riskDivide/riskResultInfo';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {imageSystem, riskDivideDetail, corpRiskDebitAnaly, corpRiskOperAnaly, riskLoanSituAnaly, corpRiskRepayAnaly, riskGuarContAnaly, riskPldimnAnaly, riskGuarntrAnaly, riskFinaAnaly, riskNonFinaAnaly, riskCompAnaly, riskResultInfo, yufpNwfInit },
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      // color,[2] : 'color: #48576a;',
      selections4: false,
      color: ['1-1'],
      activeIndex: '1-1',
      op: '',
      viewFlag: false,
      vdata: {},
      updateUrl: '',
      addUrl: '',
      image: '1',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      isHidden: false, // 是否隐藏button按钮
      taskNo: '',
      riskTask: {},
      tabel: '',
      type: '',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_FXFL',
          'index': {
            'businessid': this.bizPageData == undefined ? this.$route.meta.params.riskTask.taskNo : this.bizPageData.instanceInfo.bizId
          }
        }
      ]
    };
  },
  created () {
    var _this = this;
    _this.init();
  },
  mounted () {
  },
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
        if (_this.viewFlag) {
          _this.image = '2';
        }
      }
      _this.type = _this.$route.params.type;
    },
    workFolwInit: function () {
      const _this = this;
      _this.op = 'view';
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      // var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      // flowParam = JSON.parse(flowParam);
      const taskNo = data.bizId;
      _this.$route.params.riskTask = {
        'taskNo': taskNo
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
      // console.log('提交流程！');
      // 开始提交流程
      let _this = this;

      let validate = false;
      if (_this.activeIndex == '1-12') {
        _this.addUrl = _this.$backend.cmisPsp + '/api/risktasklist/' + 'create';
        _this.updateUrl = _this.$backend.cmisPsp + '/api/risktasklist/' + 'update';
        // let url = '/api/risktasklist/';
        _this.vdata = _this.$refs.riskResultInfo.rstData;
        let data = _this.vdata;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskResultInfo.updateFlag;
        _this.$refs.riskResultInfo.$refs.riskResultForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          this.$xutils.showMsgBox('提示', '录入信息不完整！');
          return false;
        }
        data.taskNo = _this.$route.params.riskTask.taskNo;
        // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
        if (!_this.updateFlag) {
          this.$xutils.request({
          // 同步请求
            async: false,
            url: _this.addUrl,
            data: JSON.stringify(data),
            type: 'post',
            success: (response, status, xhr) => {
              if (response.code === '0') {
              // 操作成功
              // 更新状态 为 已保存
                _this.updateFlag = true;
                let uData = {pkId: _this.$route.params.riskTask.pkId, checkStatus: '2'};
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
              if (response.code === '0') {
              // 操作成功
              // 自动刷新列表数据
                this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
              }
            }
          });
        }
      }
      // data.pkId = null;


      var flag1 = true;
      var selections4 = _this.$refs.riskLoanSituAnaly.$refs.refTable.tabledata;
      var selections6 = _this.$refs.riskGuarContAnaly.$refs.refTable.tabledata;
      var selections7 = _this.$refs.riskPldimnAnaly.$refs.refTable.tabledata;
      var selections8 = _this.$refs.riskGuarntrAnaly.$refs.refTable.tabledata;
      var validate2 = false;
      var validate3 = false;
      var validate9 = false;
      var validate10 = false;
      var validate11 = false;
      // _this.$refs.corpRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
      //   validate = valid;
      // });
      _this.$refs.corpRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
        validate2 = valid;
      });
      _this.$refs.corpRiskOperAnaly.$refs.riskOperForm.validate(function (valid) {
        validate3 = valid;
      });
      _this.$refs.riskFinaAnaly.$refs.riskFinaAnalyForm.validate(function (valid) {
        validate9 = valid;
      });
      _this.$refs.riskNonFinaAnaly.$refs.riskNonFinaAnalyForm.validate(function (valid) {
        validate10 = valid;
      });
      _this.$refs.riskCompAnaly.$refs.riskCompAnalyForm.validate(function (valid) {
        validate11 = valid;
      });
      // !_this.$refs.corpRiskDebitAnaly.debitData.pkId
      if (!validate2) {
        _this.$xutils.showMsgBox('提示', '借款人情况分析录入信息不完整！');
        _this.activeIndex = '1-2';
        return;
      }

      // _this.$refs.corpRiskOperAnaly.$refs.riskOperForm.validate(function (valid) {
      //   validate = valid;
      // });
      // !_this.$refs.corpRiskOperAnaly.operData.pkId
      if (!validate3) {
        _this.$xutils.showMsgBox('提示', '经营情况分析录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }

      // _this.$refs.corpRiskRepayAnaly.$refs.riskRepayAnalyForm.validate(function (valid) {
      //   validate = valid;
      // });
      if (!_this.$refs.corpRiskRepayAnaly.repayData.repayWish || !_this.$refs.corpRiskRepayAnaly.repayData.repayCapAbility || !_this.$refs.corpRiskRepayAnaly.repayData.repayInterestAbility ||
      !_this.$refs.corpRiskRepayAnaly.repayData.debitInterestDesc || !_this.$refs.corpRiskRepayAnaly.repayData.cusLoanManage || !_this.$refs.corpRiskRepayAnaly.repayData.isExistsPenalty || !_this.$refs.corpRiskRepayAnaly.repayData.infactCtrl) {
        _this.$xutils.showMsgBox('提示', '影响偿还因素分析录入信息不完整！');
        _this.activeIndex = '1-5';
        return;
      }

      // _this.$refs.riskFinaAnaly.$refs.riskFinaAnalyForm.validate(function (valid) {
      //   validate = valid;
      // });
      // !_this.$refs.riskFinaAnaly.finaData.pkId
      if (!validate9) {
        _this.$xutils.showMsgBox('提示', '财务情况分析录入信息不完整！');
        _this.activeIndex = '1-9';
        return;
      }

      // _this.$refs.riskNonFinaAnaly.$refs.riskNonFinaAnalyForm.validate(function (valid) {
      //   validate = valid;
      // });
      // !_this.$refs.riskNonFinaAnaly.nfinaData.pkId
      if (!validate10) {
        _this.$xutils.showMsgBox('提示', '非财务情况分析录入信息不完整！');
        _this.activeIndex = '1-10';
        return;
      }

      // _this.$refs.riskCompAnaly.$refs.riskCompAnalyForm.validate(function (valid) {
      //   validate = valid;
      // });
      // !_this.$refs.riskCompAnaly.compData.pkId
      if (!validate11) {
        _this.$xutils.showMsgBox('提示', '综合分析录入信息不完整！');
        _this.activeIndex = '1-11';
        return;
      }

      // _this.$refs.riskResultInfo.$refs.riskResultForm.validate(function (valid) {
      //   validate = valid;
      // });


      if (selections4) {
        selections4.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      };
      if (!flag1) {
        _this.$xutils.showMsgBox('提示贷款情况分析存在未分析的数据');
        _this.activeIndex = '1-4';
        return;
      }

      if (flag1 && selections6) {
        selections6.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      }
      if (!flag1) {
        _this.$xutils.showMsgBox('提示担保合同分析存在未分析的数据');
        _this.activeIndex = '1-6';
        return;
      }

      if (flag1 && selections7) {
        selections7.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      }
      if (!flag1) {
        _this.$xutils.showMsgBox('提示抵质押情况分析存在未分析的数据');
        _this.activeIndex = '1-7';
        return;
      }

      if (flag1 && selections8) {
        selections8.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      }
      if (!flag1) {
        _this.$xutils.showMsgBox('提示保证人情况分析存在未分析的数据');
        _this.activeIndex = '1-8';
        return;
      }
      if (!_this.$refs.riskResultInfo.rstData.manualClass || !_this.$refs.riskResultInfo.rstData.manualTenClass || !_this.$refs.riskResultInfo.rstData.manualClassReason || !_this.$refs.riskResultInfo.rstData.autoClass) {
        _this.$xutils.showMsgBox('提示', '初分录入信息不完整！');
        _this.activeIndex = '1-12';
        return;
      }
      if (!flag1) {
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGK22';// 公司客户风险分类（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHK22';// 公司客户风险分类（东海）
        }
      } else {
        if (!_this.$refs.riskResultInfo.rstData.lastClassRst && !_this.$refs.riskResultInfo.rstData.lastTenClassRst) {
          startdto.bizType = 'DH048';// 对公及个人经营性风险分类（新发放及未调整）新发放
        } else if ((_this.$refs.riskResultInfo.rstData.lastTenClassRst == _this.$refs.riskResultInfo.rstData.manualTenClass) && (_this.$refs.riskResultInfo.rstData.lastClassRst == _this.$refs.riskResultInfo.rstData.manualClass)) {
          startdto.bizType = 'DH048';// 对公及个人经营性风险分类（新发放及未调整）未调整
        } else if (_this.$refs.riskResultInfo.rstData.lastClassRst != _this.$refs.riskResultInfo.rstData.manualClass) {
          startdto.bizType = 'DH053';// 对公及个人经营性风险分类（大类调整）
        } else if (_this.$refs.riskResultInfo.rstData.lastTenClassRst != _this.$refs.riskResultInfo.rstData.manualTenClass) {
          startdto.bizType = 'DH051';// 对公及个人经营性风险分类（小类调整）
        } else {
          _this.$message('分类结果无调整', 'warning');
          return;
        }
      }
      startdto.bizId = _this.$route.params.riskTask.taskNo; // 流水号
      startdto.bizUserName = _this.$route.params.riskTask.cusName;
      startdto.bizUserId = _this.$route.params.riskTask.cusId;
      startdto.param = {
        bizType: 'task',
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
      switch (_this.activeIndex) {
      case '1-1':
        url = '/api/risktasklist/';
        _this.vdata = _this.$refs.riskDivideDetail.taskData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskDivideDetail.updateFlag;
        _this.$refs.riskDivideDetail.$refs.riskTaskListForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-2':
        url = '/api/riskdebitanaly/';
        _this.vdata = _this.$refs.corpRiskDebitAnaly.debitData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.corpRiskDebitAnaly.updateFlag;
        _this.$refs.corpRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url = '/api/riskoperanaly/';
        _this.vdata = _this.$refs.corpRiskOperAnaly.operData;
        _this.vdata.corpOperSitu = _this.vdata.corpOperSitu + '';
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.corpRiskOperAnaly.updateFlag;
        _this.$refs.corpRiskOperAnaly.$refs.riskOperForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
        url = '/api/riskloananaly/';
        _this.vdata = _this.$refs.riskLoanSituAnaly.loanData;
        _this.updateFlag = true;
        _this.text = '借据信息列表缺少信息';
        _this.tabel = _this.$refs.riskLoanSituAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskLoanSituAnaly.$refs.riskLoanAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        url = '/api/riskrepayanaly/';
        _this.vdata = _this.$refs.corpRiskRepayAnaly.repayData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.corpRiskRepayAnaly.updateFlag;
        _this.$refs.corpRiskRepayAnaly.$refs.riskRepayAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-6':
        url = '/api/riskguarcontanaly/';
        _this.vdata = _this.$refs.riskGuarContAnaly.guarData;
        _this.updateFlag = true;
        _this.text = '担保合同列表缺少信息';
        _this.tabel = _this.$refs.riskGuarContAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskGuarContAnaly.$refs.riskGuarAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-7':
        url = '/api/riskpldimnlist/';
        _this.vdata = _this.$refs.riskPldimnAnaly.pldimnData;
        _this.updateFlag = true;
        _this.text = '抵质押物列表缺少信息';
        _this.tabel = _this.$refs.riskPldimnAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskPldimnAnaly.$refs.riskPldimnAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-8':
        url = '/api/riskguarntrlist/';
        _this.vdata = _this.$refs.riskGuarntrAnaly.guarntrData;
        _this.updateFlag = true;
        _this.text = '保证人列表缺少信息';
        _this.tabel = _this.$refs.riskGuarntrAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskGuarntrAnaly.$refs.riskGuarntrAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-9':
        url = '/api/riskfinaanaly/';
        _this.vdata = _this.$refs.riskFinaAnaly.finaData;
        _this.text = '近三期财务报表列表缺少信息';
        _this.tabel = _this.$refs.riskFinaAnaly.$refs.refTable.selections.length;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskFinaAnaly.updateFlag;
        _this.$refs.riskFinaAnaly.$refs.riskFinaAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-10':
        url = '/api/risknonfinaanaly/';
        _this.vdata = _this.$refs.riskNonFinaAnaly.nfinaData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskNonFinaAnaly.updateFlag;
        _this.$refs.riskNonFinaAnaly.$refs.riskNonFinaAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-11':
        url = '/api/riskcompanaly/';
        _this.vdata = _this.$refs.riskCompAnaly.compData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskCompAnaly.updateFlag;
        _this.$refs.riskCompAnaly.$refs.riskCompAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-12':
        url = '/api/risktasklist/';
        _this.vdata = _this.$refs.riskResultInfo.rstData;
        _this.tabel = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskResultInfo.updateFlag;
        _this.$refs.riskResultInfo.$refs.riskResultForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-13':
        url = '/api/risktasklist/';
        _this.vdata = _this.$refs.riskimage.rstData;
        _this.tabel = true;
        _this.updateFlag = true;
        _this.$refs.riskimage.$refs.riskResultForm.validate(function (valid) {
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
      _this.addUrl = _this.$backend.cmisPsp + url + 'create';
      _this.updateUrl = _this.$backend.cmisPsp + url + 'update';
      return true;
    },
    // 保存/更新数据
    saveFn: function () {
      const _this = this;
      var flag1 = true;
      if (_this.activeIndex == '1-12') {
        var selections4 = _this.$refs.riskLoanSituAnaly.$refs.refTable.tabledata;
        var selections6 = _this.$refs.riskGuarContAnaly.$refs.refTable.tabledata;
        var selections7 = _this.$refs.riskPldimnAnaly.$refs.refTable.tabledata;
        var selections8 = _this.$refs.riskGuarntrAnaly.$refs.refTable.tabledata;
        var validate2 = false;
        var validate3 = false;
        var validate9 = false;
        var validate10 = false;
        var validate11 = false;
        // _this.$refs.corpRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
        //   validate = valid;
        // });
        _this.$refs.corpRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
          validate2 = valid;
        });
        _this.$refs.corpRiskOperAnaly.$refs.riskOperForm.validate(function (valid) {
          validate3 = valid;
        });
        _this.$refs.riskFinaAnaly.$refs.riskFinaAnalyForm.validate(function (valid) {
          validate9 = valid;
        });
        _this.$refs.riskNonFinaAnaly.$refs.riskNonFinaAnalyForm.validate(function (valid) {
          validate10 = valid;
        });
        _this.$refs.riskCompAnaly.$refs.riskCompAnalyForm.validate(function (valid) {
          validate11 = valid;
        });
        // !_this.$refs.corpRiskDebitAnaly.debitData.pkId
        if (!validate2) {
          _this.$xutils.showMsgBox('提示', '借款人情况分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-2';
          return;
        }

        // _this.$refs.corpRiskOperAnaly.$refs.riskOperForm.validate(function (valid) {
        //   validate = valid;
        // });
        // !_this.$refs.corpRiskOperAnaly.operData.pkId
        if (!validate3) {
          _this.$xutils.showMsgBox('提示', '经营情况分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-3';
          return;
        }

        // _this.$refs.corpRiskRepayAnaly.$refs.riskRepayAnalyForm.validate(function (valid) {
        //   validate = valid;
        // });
        if (!_this.$refs.corpRiskRepayAnaly.repayData.repayWish || !_this.$refs.corpRiskRepayAnaly.repayData.repayCapAbility || !_this.$refs.corpRiskRepayAnaly.repayData.repayInterestAbility ||
        !_this.$refs.corpRiskRepayAnaly.repayData.debitInterestDesc || !_this.$refs.corpRiskRepayAnaly.repayData.cusLoanManage || !_this.$refs.corpRiskRepayAnaly.repayData.isExistsPenalty || !_this.$refs.corpRiskRepayAnaly.repayData.infactCtrl) {
          _this.$xutils.showMsgBox('提示', '影响偿还因素分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-5';
          return;
        }

        // _this.$refs.riskFinaAnaly.$refs.riskFinaAnalyForm.validate(function (valid) {
        //   validate = valid;
        // });
        // !_this.$refs.riskFinaAnaly.finaData.pkId
        if (!validate9) {
          _this.$xutils.showMsgBox('提示', '财务情况分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-9';
          return;
        }

        // _this.$refs.riskNonFinaAnaly.$refs.riskNonFinaAnalyForm.validate(function (valid) {
        //   validate = valid;
        // });
        // !_this.$refs.riskNonFinaAnaly.nfinaData.pkId
        if (!validate10) {
          _this.$xutils.showMsgBox('提示', '非财务情况分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-10';
          return;
        }

        // _this.$refs.riskCompAnaly.$refs.riskCompAnalyForm.validate(function (valid) {
        //   validate = valid;
        // });
        // !_this.$refs.riskCompAnaly.compData.pkId
        if (!validate11) {
          _this.$xutils.showMsgBox('提示', '综合分析录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-11';
          return;
        }

        // _this.$refs.riskResultInfo.$refs.riskResultForm.validate(function (valid) {
        //   validate = valid;
        // });


        if (selections4) {
          selections4.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        };
        if (!flag1) {
          _this.$xutils.showMsgBox('提示贷款情况分析存在未分析的数据');
          _this.activeIndex = '1-4';
          return;
        }

        if (flag1 && selections6) {
          selections6.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        }
        if (!flag1) {
          _this.$xutils.showMsgBox('提示担保合同分析存在未分析的数据');
          _this.activeIndex = '1-6';
          return;
        }

        if (flag1 && selections7) {
          selections7.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        }
        if (!flag1) {
          _this.$xutils.showMsgBox('提示抵质押情况分析存在未分析的数据');
          _this.activeIndex = '1-7';
          return;
        }

        if (flag1 && selections8) {
          selections8.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        }
        if (!flag1) {
          _this.$xutils.showMsgBox('提示保证人情况分析存在未分析的数据');
          _this.activeIndex = '1-8';
          return;
        }

        if (!_this.$refs.riskResultInfo.rstData.manualClass || !_this.$refs.riskResultInfo.rstData.manualTenClass || !_this.$refs.riskResultInfo.rstData.manualClassReason) {
          _this.$xutils.showMsgBox('提示', '初分录入信息不完整！');
          flag1 = false;
          _this.activeIndex = '1-12';
          return;
        }
      }
      if (!flag1) {
        return;
      }
      if (!_this.chooseFn()) {
        return;
      };

      // if (!_this.tabel) {
      //   this.$xutils.showMsgBox('提示', '请先选择一条信息');
      //   return;
      // };
      let data = _this.vdata;
      // data.pkId = null;
      data.taskNo = _this.$route.params.riskTask.taskNo;
      // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
      if (!_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.addUrl,
          data: JSON.stringify(data),
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              // 操作成功
              // 更新状态 为 已保存
              _this.updateFlag = true;
              let uData = {pkId: _this.$route.params.riskTask.pkId, checkStatus: '2'};
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
            if (response.code === '0') {
              // 操作成功
              // 自动刷新列表数据
              if (_this.activeIndex === '1-4') {
                _this.$refs.riskLoanSituAnaly.$refs.refTable.remoteData();
              }
              if (_this.activeIndex === '1-6') {
                _this.$refs.riskGuarContAnaly.$refs.refTable.remoteData();
              }
              if (_this.activeIndex === '1-7') {
                _this.$refs.riskPldimnAnaly.$refs.refTable.remoteData();
              }
              if (_this.activeIndex === '1-8') {
                _this.$refs.riskGuarntrAnaly.$refs.refTable.remoteData();
              }
              _this.$refs.corpRiskDebitAnaly.init();
              _this.$refs.corpRiskOperAnaly.init();
              _this.$refs.corpRiskRepayAnaly.init();
              _this.$refs.riskFinaAnaly.init();
              _this.$refs.riskNonFinaAnaly.init();
              _this.$refs.riskCompAnaly.init();
              _this.$refs.riskResultInfo.init();
              this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
              });
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
        url: _this.$backend.cmisPsp + '/api/risktasklist/updatebycondition',
        data: JSON.stringify(uData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // console.log('更新状态成功');
          } else {
            // console.log('更新状态失败');
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
