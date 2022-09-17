/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCheckRst">
      <!--检查任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
            <yu-xform-item label="检查类型" disabled name="checkType" ctype="select" data-code="STD_ZB_CHECK_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="checkFn" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execId"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrId"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" disabled name="taskEndDt"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="申请终止信息" :collapse-hide="false">
        <yu-xform ref="pspDelayForm" v-model="delayData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" disabled name="serno"></yu-xform-item>
            <yu-xform-item label="申请终止理由" :disabled="viewFlag" ctype="textarea" colspan="24" name="applyReason" rules="required"></yu-xform-item>
            <yu-xform-item label="登记人" disabled name="inputId"></yu-xform-item>
            <yu-xform-item label="登记机构" disabled name="inputBrId"></yu-xform-item>
            <yu-xform-item label="登记日期" disabled name="inputDate"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button v-if="!viewFlag" type="primary" @click="saveFn('submit')">提交</yu-button>
          <yu-button v-if="!viewFlag" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="returnFn"></yufpNwfInit>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_RISK_CUS_CATALOG,STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CHECK_STATUS');

export default {
  name: 'PspCheckRst',
  components: {yufpNwfInit},
  props: {
    bizPageData: Object
  },
  data: function () {
    var _this = this;
    var checkDelayDate = function (rule, value, callback) {
      var taskEndDt = +new Date(_this.taskData.taskEndDt);
      var delayDate = +new Date(value);
      if (taskEndDt > delayDate) {
        callback(new Error('申请延期完成日期必须大于任务要求完成日期!'));
      } else {
        callback();
      }
    };
    return {
      delayDate: [
        {validator: checkDelayDate},
        {required: true, message: '该字段必填'}
      ],
      title: '',
      taskData: {},
      delayData: {},
      viewFlag: false, // 是否查看页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      delayFlag: false // 是否申请延期
    };
  },
  created () {
    //
  },
  mounted () {
    // 初始化参数
    if (this.bizPageData) {
      this.workFolwInit();
    } else {
      this.init();
    }
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
      let flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      let applyType = flowParam.applyType;
      _this.delayFlag = applyType === '1';
      clone(flowParam.pspTask, _this.taskData);
      const serno = data.bizId;
      _this.$route.params.opType = 'view';
      _this.delayData.serno = serno;
      _this.delayDataInit(serno);
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      clone(data.pspTask, _this.taskData); // 检查任务信息
      _this.viewFlag = data.opType === 'view';
      _this.delayFlag = data.pspTask.applyType === '1';
      const serno = data.pspTask.serno;
      yufp.clone(data.pspTask, _this.delayData);
      _this.delayDataInit(serno);
    },

    delayDataInit (serno) {
      const _this = this;
      let params = {};
      params.serno = serno;
      // 页面下半部分 delayData
      // 通过任务号获取分类调整信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        type: 'post',
        url: _this.$backend.cmisPsp + '/api/psptaskdelayapp/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.delayData);

              _this.updateFlag = true;
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
    // 查看
    checkFn: function () {
      // console.log('查看！');
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
      // console.log('提交流程！');
      // 开始提交流程
      let data = _this.$route.params;
      // console.log('data.pspTask', data);
      // 任务编号
      const serno = data.pspTask.pkId;
      let bizType = '';
      const checkType = data.pspTask.checkType;
      const applyType = data.pspTask.applyType;


      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys; // 岗位
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGK21';// 贷后检查终止（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHK21';// 贷后检查终止（东海）
        }
      } else {
        if ((checkType == '11' || checkType == '12' || checkType == '21' || checkType == '22' || checkType == '31' || checkType == '32') && applyType == '1') {
          bizType = 'DH040'; // 贷后检查延期_对公及个人经营性
        } else if ((checkType == '13' || checkType == '23' || checkType == '33') && applyType == '1') {
          bizType = 'DH041'; // 个人消费性
        } else if ((checkType == '14' || checkType == '15' || checkType == '24' || checkType == '25' || checkType == '34' || checkType == '35') && applyType == '1') {
          bizType = 'DH042'; // 小微
        } else if ((checkType == '26' || checkType == '27' || checkType == '28' || checkType == '36' || checkType == '37' || checkType == '38') && applyType == '1') {
          bizType = 'DH043'; // 投后业务
        } else if ((checkType == '11' || checkType == '12' || checkType == '21' || checkType == '22' || checkType == '31' || checkType == '32') && applyType == '2') {
          bizType = 'DH044'; // 贷后检查终止_对公及个人经营性
        } else if ((checkType == '13' || checkType == '23' || checkType == '33') && applyType == '2') {
          bizType = 'DH045'; // 个人消费性
        } else if ((checkType == '14' || checkType == '15' || checkType == '24' || checkType == '25' || checkType == '34' || checkType == '35') && applyType == '2') {
          bizType = 'DH046'; // 小微
        } else if ((checkType == '26' || checkType == '27' || checkType == '28' || checkType == '36' || checkType == '37' || checkType == '38') && applyType == '2') {
          bizType = 'DH047'; // 投后业务
        } else {
          this.$xutils.showMsgBox('提示', '流程业务类型未配置');
          return;
        }
      }
      var dutyArr = [];
      dutysList.forEach(item => {
        dutyArr.push(item.code);
      });
      var str = dutyArr.join(',');

      if (bizType != 'DH042' && bizType != 'DH046') {
        // 提交流程
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.orgCode;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = bizType;
        startdto.bizId = serno; // 流水号
        startdto.bizUserName = _this.taskData.cusName;
        startdto.bizUserId = _this.taskData.cusId;
        startdto.param = {
          rptType: str,
          pspTask: data.pspTask
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
        return;
      }
      // 查询分中心负责人
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/xwcommonservice/getcentermanageridinfo',
        data: {managerId: loginUser.loginCode},
        callback: function (code, message, response) {
          if (response.data) {
            if (response.data.userCode) {
              // 提交流程
              let startdto = {};
              startdto.systemId = 'cmis';
              startdto.orgId = loginUser.orgCode;
              startdto.userId = loginUser.loginCode;
              startdto.bizType = bizType;
              startdto.bizId = serno; // 流水号
              startdto.bizUserName = _this.taskData.cusName;
              startdto.bizUserId = _this.taskData.cusId;
              startdto.bizParam1 = response.data.userCode;// 分中心负责人
              startdto.param = {
                rptType: str,
                pspTask: data.pspTask
              };
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
              _this.$message.error('查询分中心负责人数据为空');
            }
          } else {
            _this.$message.error('分中心负责人查询为空');
          }
        }
      });
    },
    // 保存/更新数据
    saveFn: function (op) {
      const _this = this;
      let validate = false;
      _this.$refs.pspDelayForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息未通过校验！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptaskdelayapp/update',
        data: JSON.stringify(_this.delayData),
        type: 'post',
        success: (response, status, xhr) => {
          // console.log('更新成功');
          if (response.code === '0') {
            // 操作成功
            _this.actionFlag = true;

            // 提交按钮,调用发起流程
            if (op === 'submit') {
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
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
