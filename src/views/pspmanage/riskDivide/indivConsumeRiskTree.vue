/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-个人消费客户风险分类
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
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">借款人收入情况分析</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">贷款情况分析</yu-menu-item>
          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">担保合同分析</yu-menu-item>
          <yu-menu-item index="1-6" :style="color['1-6'] && activeIndex == '1-6' ? color['1-6'] : 'color: #48576a;'">抵押物情况分析</yu-menu-item>
          <yu-menu-item index="1-7" :style="color['1-7'] && activeIndex == '1-7' ? color['1-7'] : 'color: #48576a;'">保证人情况分析</yu-menu-item>
          <yu-menu-item index="1-8" :style="color['1-8'] && activeIndex == '1-8' ? color['1-8'] : 'color: #48576a;'">初分</yu-menu-item>
          <yu-menu-item index="1-9" :style="color['1-9'] && activeIndex == '1-9' ? color['1-9'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <riskDivideDetail v-show="activeIndex == '1-1'" ref="riskDivideDetail"></riskDivideDetail>
      <indivRiskDebitAnaly v-show="activeIndex == '1-2'" ref="indivRiskDebitAnaly"></indivRiskDebitAnaly>
      <indivRiskIncomeAnaly v-show="activeIndex == '1-3'" ref="indivRiskIncomeAnaly"></indivRiskIncomeAnaly>
      <riskLoanSituAnaly v-show="activeIndex == '1-4'" ref="riskLoanSituAnaly"></riskLoanSituAnaly>
      <riskGuarContAnaly v-show="activeIndex == '1-5'" ref="riskGuarContAnaly"></riskGuarContAnaly>
      <riskPldimnAnaly v-show="activeIndex == '1-6'" ref="riskPldimnAnaly"></riskPldimnAnaly>
      <riskGuarntrAnaly v-show="activeIndex == '1-7'" ref="riskGuarntrAnaly"></riskGuarntrAnaly>
      <riskResultInfo v-show="activeIndex == '1-8'" ref="riskResultInfo" :type="type"></riskResultInfo>
      <yu-panel v-show="activeIndex === '1-9'" v-model="activeName" :collapse-hide="false" name="forth">
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
import indivRiskDebitAnaly from '@/views/pspmanage/riskDivide/indivRiskDebitAnaly';
import indivRiskIncomeAnaly from '@/views/pspmanage/riskDivide/indivRiskIncomeAnaly';
import riskLoanSituAnaly from '@/views/pspmanage/riskDivide/riskLoanSituAnaly';
import riskGuarContAnaly from '@/views/pspmanage/riskDivide/riskGuarContAnaly';
import riskPldimnAnaly from '@/views/pspmanage/riskDivide/riskPldimnAnaly';
import riskGuarntrAnaly from '@/views/pspmanage/riskDivide/riskGuarntrAnaly';
import riskResultInfo from '@/views/pspmanage/riskDivide/riskResultInfo';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  props: {
    bizPageData: {
      // 评论信息
      type: Array,
      default: function () {
        return null;
      }
    }
  },
  components: {imageSystem, riskDivideDetail, indivRiskDebitAnaly, indivRiskIncomeAnaly, riskLoanSituAnaly, riskGuarContAnaly, riskPldimnAnaly, riskGuarntrAnaly, riskResultInfo, yufpNwfInit },
  data: function () {
    return {
      color: ['1-1'],
      activeIndex: '1-1',
      taskType: '',
      op: '',
      viewFlag: false,
      vdata: {},
      image: '1',
      updateUrl: '',
      addUrl: '',
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      isHidden: false, // 是否隐藏button按钮
      taskNo: '',
      riskTask: {},
      table: '',
      text: '',
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
    var _this = this;
    _this.taskType = _this.$route.params.riskTask.taskType;
    _this.op = _this.$route.params.op;
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
      const taskNo = data.bizId;
      _this.$route.params.riskTask = {
        taskNo: taskNo
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
      // 开始提交流程
      let _this = this;
      let validate = false;
      if (_this.activeIndex == '1-8') {
        // url = '/api/risktasklist/';
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
        _this.addUrl = _this.$backend.cmisPsp + '/api/risktasklist/' + 'create';
        _this.updateUrl = _this.$backend.cmisPsp + '/api/risktasklist/' + 'update';
        data.taskNo = _this.$route.params.riskTask.taskNo;
        // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
        if (!_this.updateFlag) {
          this.$xutils.request({
          // 同步请求
            async: false,
            url: _this.addUrl,
            data: data,
            type: 'post',
            success: (response, status, xhr) => {
              if (response.code === '0') {
              // 操作成功
                _this.actionFlag = true;
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

      var flag1 = true;
      var selections4 = _this.$refs.riskLoanSituAnaly.$refs.refTable.tabledata;
      var selections5 = _this.$refs.riskGuarContAnaly.$refs.refTable.tabledata;
      var selections6 = _this.$refs.riskPldimnAnaly.$refs.refTable.tabledata;
      var selections7 = _this.$refs.riskGuarntrAnaly.$refs.refTable.tabledata;
      var validate2 = false;

      _this.$refs.indivRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
        validate2 = valid;
      });
      // !_this.$refs.indivRiskDebitAnaly.debitData.pkId
      if (!validate2) {
        _this.$xutils.showMsgBox('提示', '借款人情况分析录入信息不完整！');
        _this.activeIndex = '1-2';
        return;
      }

      if (!_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalIncome || !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalPay || !_this.$refs.indivRiskIncomeAnaly.incomeData.incomeBalance ||
      !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalAsset || !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalDebt || !_this.$refs.indivRiskIncomeAnaly.incomeData.famAssetBalance ||
      !_this.$refs.indivRiskIncomeAnaly.incomeData.isWorkStable || !_this.$refs.indivRiskIncomeAnaly.incomeData.isIncomeSuffice) {
        _this.$xutils.showMsgBox('提示', '借款人收入情况分析录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }


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

      if (flag1 && selections5) {
        selections5.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      };
      if (!flag1) {
        _this.$xutils.showMsgBox('提示担保合同分析存在未分析的数据');
        _this.activeIndex = '1-5';
        return;
      }

      if (flag1 && selections6) {
        selections6.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      };
      if (!flag1) {
        _this.$xutils.showMsgBox('提示抵押物情况分析存在未分析的数据');
        _this.activeIndex = '1-6';
        return;
      }

      if (flag1 && selections7) {
        selections7.forEach((item) => {
          if (item.analyStatus != '2') {
            flag1 = false;
          }
        });
      };
      if (!flag1) {
        _this.$xutils.showMsgBox('提示保证人情况分析存在未分析的数据');
        _this.activeIndex = '1-7';
        return;
      }
      if (!_this.$refs.riskResultInfo.rstData.manualClass || !_this.$refs.riskResultInfo.rstData.manualClassReason || !_this.$refs.riskResultInfo.rstData.autoClass) {
        _this.$xutils.showMsgBox('提示', '初分情况分析录入信息不完整！');
        _this.activeIndex = '1-8';
        return;
      }
      if (!flag1) {
        return;
      }
      let startdto = {};
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys; // 岗位
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGK24';// 个人消费性风险分类（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHK24';// 个人消费性风险分类（东海）
        }
      } else {
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'XWB01') { // 小微客户经理
              if (!_this.$refs.riskResultInfo.rstData.lastClassRst) {
                startdto.bizType = 'DH058';// 小微风险分类（新发放及未调整）新发放
              } else if (_this.$refs.riskResultInfo.rstData.lastClassRst == _this.$refs.riskResultInfo.rstData.manualClass) {
                startdto.bizType = 'DH058';// 小微风险分类（新发放及未调整）未调整
              } else if (_this.$refs.riskResultInfo.rstData.lastClassRst != _this.$refs.riskResultInfo.rstData.manualClass) {
                startdto.bizType = 'DH060';// 小微风险分类（大类调整）
              }
            } else { // 其他发起人
              if (!_this.$refs.riskResultInfo.rstData.lastClassRst && !_this.$refs.riskResultInfo.rstData.lastTenClassRst) {
                startdto.bizType = 'DH050';// 个人消费性风险分类（新发放及未调整）新发放
              } else if (_this.$refs.riskResultInfo.rstData.lastClassRst == _this.$refs.riskResultInfo.rstData.manualClass) {
                startdto.bizType = 'DH050';// 小微风险分类（新发放及未调整）未调整
              } else if (_this.$refs.riskResultInfo.rstData.lastClassRst != _this.$refs.riskResultInfo.rstData.manualClass) {
                startdto.bizType = 'DH055';// 个人消费性风险分类（大类调整）
              }
            }
          }
        } else {
          _this.$xutils.showMsgBox('提示', '该登录人无岗位无法提交');
          return;
        }
      }
      if (!startdto.bizType) {
        _this.$message('分类结果无调整', 'warning');
        return;
      }
      // 提交流程
      // console.log('startdto', startdto);
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
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
        _this.table = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskDivideDetail.updateFlag;
        _this.$refs.riskDivideDetail.$refs.riskTaskListForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-2':
        url = '/api/riskdebitanaly/';
        _this.vdata = _this.$refs.indivRiskDebitAnaly.debitData;
        _this.table = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.indivRiskDebitAnaly.updateFlag;
        _this.$refs.indivRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url = '/api/riskincomeanaly/';
        _this.vdata = _this.$refs.indivRiskIncomeAnaly.incomeData;
        _this.table = true;
        let pkId = _this.$route.params.riskTask.pkId;
        _this.vdata.pkId = pkId;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.indivRiskIncomeAnaly.updateFlag;
        // console.log('updateFlag', _this.$refs.indivRiskIncomeAnaly.updateFlag);
        _this.$refs.indivRiskIncomeAnaly.$refs.riskOperAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
        url = '/api/riskloananaly/';
        _this.vdata = _this.$refs.riskLoanSituAnaly.loanData;
        _this.text = '借据信息列表缺少信息';
        _this.table = _this.$refs.riskLoanSituAnaly.$refs.refTable.selections.length;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskLoanSituAnaly.updateFlag;
        // validate = true;
        _this.$refs.riskLoanSituAnaly.$refs.riskLoanAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-5':
        url = '/api/riskguarcontanaly/';
        _this.vdata = _this.$refs.riskGuarContAnaly.guarData;
        _this.updateFlag = true;
        _this.text = '担保合同列表缺少信息';
        _this.table = _this.$refs.riskGuarContAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskGuarContAnaly.$refs.riskGuarAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-6':
        url = '/api/riskpldimnlist/';
        _this.vdata = _this.$refs.riskPldimnAnaly.pldimnData;
        _this.updateFlag = true;
        _this.text = '抵质押物列表缺少信息';
        _this.table = _this.$refs.riskPldimnAnaly.$refs.refTable.selections.length;
        // validate = true;
        _this.$refs.riskPldimnAnaly.$refs.riskPldimnAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-7':
        url = '/api/riskguarntrlist/';
        _this.vdata = _this.$refs.riskGuarntrAnaly.guarntrData;
        _this.text = '保证人列表缺少信息';
        _this.table = _this.$refs.riskGuarntrAnaly.$refs.refTable.selections.length;
        _this.updateFlag = true;
        // validate = true;
        _this.$refs.riskGuarntrAnaly.$refs.riskGuarntrAnalyForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-8':
        url = '/api/risktasklist/';
        _this.vdata = _this.$refs.riskResultInfo.rstData;
        _this.table = true;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.riskResultInfo.updateFlag;
        _this.$refs.riskResultInfo.$refs.riskResultForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-9':
        url = '/api/risktasklist/';
        _this.vdata = _this.$refs.indivImage.rstData;
        _this.table = true;
        _this.updateFlag = true;
        _this.$refs.indivImage.$refs.riskResultForm.validate(function (valid) {
          validate = valid;
        });
        break;
      default:
        break;
      }
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      _this.changeFlag = false;
      // if (_this.activeIndex == '1-3') {
      //   _this.updateUrl = _this.$backend.cmisPsp + url + 'create';
      //   _this.addUrl = _this.$backend.cmisPsp + url + 'update';
      // } else {
      _this.addUrl = _this.$backend.cmisPsp + url + 'create';
      _this.updateUrl = _this.$backend.cmisPsp + url + 'update';
      // }


      return true;
    },
    // 保存/更新数据
    saveFn: function () {
      var flag1 = true;
      const _this = this;
      if (_this.activeIndex == '1-8') {
        var selections4 = _this.$refs.riskLoanSituAnaly.$refs.refTable.tabledata;
        var selections5 = _this.$refs.riskGuarContAnaly.$refs.refTable.tabledata;
        var selections6 = _this.$refs.riskPldimnAnaly.$refs.refTable.tabledata;
        var selections7 = _this.$refs.riskGuarntrAnaly.$refs.refTable.tabledata;
        var validate2 = false;

        _this.$refs.indivRiskDebitAnaly.$refs.riskDebitAnalyForm.validate(function (valid) {
          validate2 = valid;
        });
        // !_this.$refs.indivRiskDebitAnaly.debitData.pkId
        if (!validate2) {
          _this.$xutils.showMsgBox('提示', '借款人情况分析录入信息不完整！');
          _this.activeIndex = '1-2';
          flag1 = false;
          return;
        }

        if (!_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalIncome || !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalPay || !_this.$refs.indivRiskIncomeAnaly.incomeData.incomeBalance ||
       !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalAsset || !_this.$refs.indivRiskIncomeAnaly.incomeData.famTotalDebt || !_this.$refs.indivRiskIncomeAnaly.incomeData.famAssetBalance ||
        !_this.$refs.indivRiskIncomeAnaly.incomeData.isWorkStable || !_this.$refs.indivRiskIncomeAnaly.incomeData.isIncomeSuffice) {
          _this.$xutils.showMsgBox('提示', '借款人收入情况分析录入信息不完整！');
          _this.activeIndex = '1-3';
          flag1 = false;
          return;
        }


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

        if (flag1 && selections5) {
          selections5.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        };
        if (!flag1) {
          _this.$xutils.showMsgBox('提示担保合同分析存在未分析的数据');
          _this.activeIndex = '1-5';
          return;
        }

        if (flag1 && selections6) {
          selections6.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        };
        if (!flag1) {
          _this.$xutils.showMsgBox('提示抵押物情况分析存在未分析的数据');
          _this.activeIndex = '1-6';
          return;
        }

        if (flag1 && selections7) {
          selections7.forEach((item) => {
            if (item.analyStatus != '2') {
              flag1 = false;
            }
          });
        };
        if (!flag1) {
          _this.$xutils.showMsgBox('提示保证人情况分析存在未分析的数据');
          _this.activeIndex = '1-7';
          return;
        }

        if (!_this.$refs.riskResultInfo.rstData.manualClass || !_this.$refs.riskResultInfo.rstData.manualClassReason || !_this.$refs.riskResultInfo.rstData.autoClass) {
          _this.$xutils.showMsgBox('提示', '初分情况分析录入信息不完整！');
          _this.activeIndex = '1-8';
          flag1 = false;
          return;
        }
      }
      if (!flag1) {
        return;
      }
      if (!_this.chooseFn()) {
        return;
      };
      // if (!_this.table) {
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
          data: data,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
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
              if (_this.activeIndex === '1-5') {
                _this.$refs.riskGuarContAnaly.$refs.refTable.remoteData();
              }
              if (_this.activeIndex === '1-6') {
                _this.$refs.riskPldimnAnaly.$refs.refTable.remoteData();
              }
              if (_this.activeIndex === '1-7') {
                _this.$refs.riskGuarntrAnaly.$refs.refTable.remoteData();
              }
              _this.$refs.indivRiskDebitAnaly.init();
              _this.$refs.indivRiskIncomeAnaly.init();
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
