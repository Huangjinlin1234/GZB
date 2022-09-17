/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-风险分类调整信息
 */
<template>
  <div id="riskAdjustDetail">
      <!--分类任务信息展示-->
    <yu-xform ref="riskAdjustForm" v-model="taskData" label-width="180px">
      <yu-panel title="检查任务信息" :collapse-hide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo" ></yu-xform-item>
            <yu-xform-item label="分类模型" disabled name="checkType" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" ></yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" disabled name="taskEndDt"></yu-xform-item>
          </yu-xform-group>
      </yu-panel>
      <yu-panel title="申请调整风险分类信息" :collapse-hide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" disabled name="serno" colspan="12"></yu-xform-item>
            <yu-xform-item label="" name="custom"  ctype="custom" ></yu-xform-item>
            <yu-xform-item label="调整前五级分类" disabled name="origiClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
            <yu-xform-item label="调整后五级分类" :disabled="viewFlag||showType" ctype="select" data-code="STD_FIVE_CLASS" name="appAdjClass"  rules="required"></yu-xform-item>
            <yu-xform-item label="调整前十级分类" disabled v-show="showType" name="origiTenClass" ctype="select" data-code="STD_TEN_CLASS"></yu-xform-item>
            <yu-xform-item label="调整后十级分类" :disabled="viewFlag" :rules="rules" v-show="showType" ctype="select" data-code="STD_TEN_CLASS" name="appAdjTenClass" @change="manualTenSelect" ></yu-xform-item>
            <yu-xform-item label="申请调整理由" :disabled="viewFlag" ctype="textarea" colspan="24" name="appAdjRemark" rules="required"></yu-xform-item>
            <yu-xform-item label="登记人" disabled name="inputIdName"></yu-xform-item>
            <yu-xform-item label="登记机构 " disabled name="inputBrIdName"></yu-xform-item>
            <yu-xform-item label="登记日期" disabled name="inputDate"></yu-xform-item>
            <yu-xform-item label="审批状态" disabled name="approveStatus" hidden="true"></yu-xform-item>
          </yu-xform-group>
      </yu-panel>
    </yu-xform>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button v-if="!viewFlag" :hidden="isHidden" type="primary" @click="submitFn('SUBMIT')">提交</yu-button>
          <yu-button v-if="!viewFlag" :hidden="isHidden" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="returnFn"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_RISK_CHECK_TYPE,STD_FIVE_CLASS,STD_TEN_CLASS');
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
  name: 'RiskAdjustDetail',
  components: {yufpNwfInit},
  data: function () {
    return {
      viewFlag: false, // 是否查看页面
      approvePage: false, // 是否审批页面
      riskTask: {},
      taskNo: '',
      consumeFlag: false,
      isHidden: false,
      adjustData: '',
      taskData: '',
      showType: false, // 判断是否十级分类
      rules: ''
    };
  },
  created () {
    var _this = this;
    const data = _this.bizPageData == null ? _this.$route.params : _this.bizPageData;
    var form = data.instanceInfo;
    if (form) {
      _this.riskTask.taskNo = form.bizId;
      // _this.$route.params.riskTask = _this.riskTask;
      _this.$route.params.opType = 'view';
      _this.$route.params.taskNo = form.bizId;
      _this.isHidden = true;
    }
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    workFolwInit: function () {
      const _this = this;
      _this.op = 'view';
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      // console.log(data);
      // var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      // flowParam = JSON.parse(flowParam);
      // console.log(data.flowParam);
      const serno = data.bizId;
      _this.$route.params.riskTask = {
        'serno': serno
      };
      _this.$route.params.opType = 'view';
    },
    // 初始化数据
    init: function () {
      const _this = this;
      // 判断从代办进入
      if (_this.bizPageData) {
        _this.workFolwInit();
        const data = _this.bizPageData.instanceInfo;
        let flowParam = JSON.parse(JSON.stringify(data.flowParam));
        flowParam = JSON.parse(flowParam);
        _this.showType = flowParam.showType;
        _this.rules = flowParam.showType == true ? 'required' : '';
      } else {
        _this.showType = _this.$route.params.riskTask.checkType != '3';
        _this.rules = _this.$route.params.riskTask.checkType != '3' ? 'required' : '';
        _this.checkType = _this.$route.params.checkType;
        _this.op = _this.$route.params.op;
        _this.viewFlag = _this.$route.params.opType === 'view';
      }
      let data = _this.$route.params;
      _this.adjustData = data.riskTask;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      const serno = data.riskTask.serno;
      let params = {};
      params.taskNo = taskNo;
      params.serno = serno;
      // 通过任务号获取分类调整信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risktasklist/queryTaskAndAdjust',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.taskData);
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    manualTenSelect () {
      if (this.taskData.appAdjTenClass == '11' || this.taskData.appAdjTenClass == '12' || this.taskData.appAdjTenClass == '13') {
        this.taskData.appAdjClass = '10';
      } else if (this.taskData.appAdjTenClass == '21' || this.taskData.appAdjTenClass == '22' || this.taskData.appAdjTenClass == '23') {
        this.taskData.appAdjClass = '20';
      } else if (this.taskData.appAdjTenClass == '31' || this.taskData.appAdjTenClass == '32') {
        this.taskData.appAdjClass = '30';
      } else if (this.taskData.appAdjTenClass == '40') {
        this.taskData.appAdjClass = '40';
      } else if (this.taskData.appAdjTenClass == '50') {
        this.taskData.appAdjClass = '50';
      }
    },
    // 保存并提交流程
    submitFn: function (params) {
      // 开始提交流程
      let _this = this;
      let validate = false;
      _this.$refs.riskAdjustForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/riskclasschgapp/update',
        data: JSON.stringify(_this.taskData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // 操作成功
            _this.actionFlag = true;
            // 自动刷新列表数据
          }
        }
      });

      _this.$refs.riskAdjustForm.validate(function (valid) {
        validate = valid;
      });

      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      var origiClass = _this.adjustData.origiClass;
      var origiTenClass = _this.adjustData.origiTenClass;
      var appAdjClass = _this.taskData.appAdjClass;
      var appAdjTenClass = _this.taskData.appAdjTenClass;
      var checkType = _this.taskData.checkType;

      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGK25';// 风险分类调整申请（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHK25';// 风险分类调整申请（东海）
        }
      } else {
        if (checkType == '1') {
          if (origiClass != appAdjClass) {
            startdto.bizType = 'DH053';// 对公及个人经营性风险分类（大类调整）
          } else if (origiTenClass != appAdjTenClass) {
            startdto.bizType = 'DH051';// 对公及个人经营性风险分类（小类调整）
          }
        } else if (checkType == '2') {
          const dutysList = loginUser.dutys; // 岗位
          if (dutysList != undefined) {
            for (let i = 0; i < dutysList.length; i++) {
              let item = dutysList[i];
              if (item.code === 'XWB01') { // 小微客户经理
                if (origiClass != appAdjClass) {
                  startdto.bizType = 'DH054';// 小微风险分类（大类调整）
                } else if (origiTenClass != appAdjTenClass) {
                  startdto.bizType = 'DH052';// 小微经营性风险分类（小类调整）
                }
              } else {
                if (origiClass != appAdjClass) {
                  startdto.bizType = 'DH053';// 对公及个人经营性风险分类（大类调整）
                } else if (origiTenClass != appAdjTenClass) {
                  startdto.bizType = 'DH051';// 对公及个人经营性风险分类（小类调整）
                }
              }
            }
          } else {
            _this.$xutils.showMsgBox('提示', '该登录人无岗位无法提交');
            return;
          }
        } else if (checkType == '3') {
          const dutysList = loginUser.dutys; // 岗位
          if (dutysList != undefined) {
            for (let i = 0; i < dutysList.length; i++) {
              let item = dutysList[i];
              if (item.code === 'XWB01') { // 小微客户经理
                if (origiClass != appAdjClass) {
                  startdto.bizType = 'DH054';// 小微风险分类（大类调整）
                }
              } else {
                if (origiClass != appAdjClass) {
                  startdto.bizType = 'DH055';// 个人消费性风险分类（大类调整）
                }
              }
            }
          } else {
            _this.$xutils.showMsgBox('提示', '该登录人无岗位无法提交');
            return;
          }
        }
      }
      if (!startdto.bizType) {
        _this.$xutils.showMsgBox('提示', '分类结果无调整');
        return;
      }
      startdto.bizId = _this.$route.params.riskTask.serno; // 流水号
      startdto.bizUserName = _this.taskData.cusName;
      startdto.bizUserId = _this.taskData.cusId;
      startdto.param = {dutyOrgType: loginUser.org.orgType, bizType: 'adjust', showType: _this.$route.params.riskTask.checkType != '3'};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 保存/更新数据
    saveFn: function () {
      const _this = this;
      let validate = false;
      _this.$refs.riskAdjustForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/riskclasschgapp/update',
        data: JSON.stringify(_this.taskData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // 操作成功
            _this.actionFlag = true;
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '更新成功！', 500, 140, () => {
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
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

<style scoped>

</style>
