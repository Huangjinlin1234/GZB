/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-不定期检查-检查任务详情
 */
<template>
<yu-tabs v-model="activeName">
    <yu-tab-pane label="检查任务信息" name="base">
      <div id="pspCheckRst">
        <yu-panel title="" :collapse-hide="false">
          <!--检查任务信息展示-->
          <yu-panel title="检查任务信息" :collapse-hide="false">
            <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
              <yu-xform-group :column="2">
                <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
                <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_ZB_CHECK_STATUS"></yu-xform-item>
                <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                  <yu-button @click="do360View" type="primary">查看</yu-button>
                </yu-xform-item>
                <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
                <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
                <yu-xform-item label="任务开始日期 " disabled="viewFlag || !issueFlag" name="taskStartDt" rules="required"></yu-xform-item>
                <yu-xform-item label="任务到期日期" disabled="viewFlag || !issueFlag" name="taskEndDt" rules="required"></yu-xform-item>
                <yu-xform-item label="任务派发人员 " disabled name="issueId"></yu-xform-item>
                <yu-xform-item label="任务派发人员所属机构" disabled name="issueBrIdName"></yu-xform-item>
                <yu-xform-item label="任务下发日期" disabled name="issueDate"></yu-xform-item>
                <yu-xform-item label="提交日期" disabled hidden="true" name="checkDate"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
            <issueCheckContent v-show="viewFlag || checkFlag" ref="issueCheckContent"></issueCheckContent>
            <issueRiskInfo  ref="issueRiskInfo"></issueRiskInfo>
            <issueCheckRst v-show="viewFlag || checkFlag" ref="issueCheckRst"></issueCheckRst>
          <div style="text-align:center;">
            <yu-toolBar>
              <yu-button v-if="checkFlag && !viewFlag" type="primary" @click="saveFn('SUBMIT')">提交</yu-button>
              <yu-button v-if="!viewFlag && checkFlag" type="primary" @click="saveFn">保存</yu-button>
              <yu-button type="primary" @click="returnFn">返回</yu-button>
            </yu-toolBar>
          </div>
        </yu-panel>
        <yufpNwfInit ref="yufpNwfInit" @success-click="returnFn"></yufpNwfInit>
      </div>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="forth">
          <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
 </yu-tabs>
</template>
<script>
import {clone, lookup} from '@/utils';
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import issueCheckContent from './issueCheckContent.vue';
import issueRiskInfo from './issueRiskInfo.vue';
import issueCheckRst from './issueCheckRst.vue';
yufp.lookup.reg('STD_ZB_CHECK_STATUS');
export default {
  name: 'PspCheckRst',
  components: {yufpNwfInit, issueCheckContent, issueRiskInfo, issueCheckRst, imageSystem},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      image: '1',
      imageBizParam: [],
      activeName: 'base',
      viewFlag: false, // 是否查看页面
      issueFlag: false, // 是否派发人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      checkFlag: false // 是否检查人页面
    };
  },
  created () {
    this.init();
    if (this.$route.params.opType == 'view') {
      this.image = '2';
    }
    this.imageBizParam = [{
      'top_outsystem_code': 'DHJC',
      'index': {
        'businessid': this.$route.params.pspTask.taskNo,
        'custid': this.$route.params.pspTask.cusId

      }
    }];
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      if (_this.bizPageData) {
        _this.checkFlag = true;
        _this.$route.params.viewFlag = true;
        _this.$route.params.issueFlag = true;
        _this.workFolwInit();
      } else {
        let data = _this.$route.params;
        clone(data.pspTask, _this.taskData);
        _this.viewFlag = data.opType === 'view';
        _this.issueFlag = data.issueFlag;
        _this.checkFlag = data.checkFlag;
      }
      // const taskNo = data.pspTask.taskNo;
      // let params = {};
      // params.taskNo = taskNo;
      // // 通过任务编号获取贷后检查结果
      // _this.$xutils.request({
      //   // 异步请求
      //   async: true,
      //   url: _this.$backend.cmisPsp + '/api/pspcheckrst/querySingle',
      //   data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       const data = response.data;
      //       if (data != null) {
      //         yufp.clone(data, _this.taskData);
      //         // _this.updateFlag = true;
      //       }
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
      //     }
      //   },
      //   error: (result, b) => {
      //     _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },

    workFolwInit: function () {
      const _this = this;
      // _this.op = 'view';
      _this.viewFlag = true;
      _this.checkFlag = true;
      const data = _this.bizPageData.instanceInfo;
      var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      _this.rptType = flowParam.rptType;
      _this.taskNo = data.bizId;
      _this.cusId = data.bizUserId;
      _this.rptName = flowParam.rptName;
      _this.checkType = flowParam.checkType;
      _this.taskType = flowParam.taskType;
      clone(flowParam.pspTask, _this.taskData);
      // clone(flowParam.pspTask, _this.$route.params.pspTask);
      // _this.$route.params.pspTask.taskNo = data.bizId;
      _this.$route.params.pspTask = {
        taskNo: _this.taskNo
      };
      _this.$route.params.rptName = _this.rptName;
      console.log('_this.$route.params.pspTask.taskNo', _this.$route.params.pspTask.taskNo);
    },
    // 查看
    do360View: function () {
      // TODO 查看客户360视图
    },
    // 保存并提交流程
    submitFn: function () {
      let _this = this;
      // 开始提交流程
      debugger;
      let data = this.$route.params;
      // 任务编号
      const cusId = data.pspTask.cusId;
      const cusName = data.pspTask.cusName;
      const taskNo = data.pspTask.taskNo;
      var bizType = '';
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGK19';// 总行下发不定期贷后检查（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHK19';// 总行下发不定期贷后检查（东海）
        }
      } else {
        bizType = 'DH039';
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
      startdto.bizParam1 = data.pspTask.issueId; // 任务派发人员
      startdto.param = {
        orgType: '6',
        pspTask: data.pspTask,
        rptType: _this.rptType,
        op: 'submit'
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 保存/更新数据
    saveFn: function (params) {
      const _this = this;
      if (_this.checkFlag) {
        _this.updateFlag = _this.updateFlag == true ? _this.updateFlag : _this.$refs.issueCheckRst.updateFlag;
      }

      let validate = false;
      _this.$refs.issueCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      var selections = _this.$refs.issueRiskInfo.$refs.refTable.tabledata;
      if (selections.length == 0) {
        _this.$xutils.showMsgBox('提示目前主要风险点缺少内容');
        return;
      }
      let data = _this.$refs.issueCheckRst.rstData;
      data.taskNo = _this.taskData.taskNo;
      // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
      if (!_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisPsp + '/api/pspcheckrst/insert',
          data: data,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              // 更新状态 为 已保存
              _this.updateFlag = true;
              let uData = {pkId: _this.taskData.pkId, checkStatus: '2'};
              _this.updateStatus(uData);
              this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
              });
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
          url: _this.$backend.cmisPsp + '/api/pspcheckrst/update',
          data: JSON.stringify(data),
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              if (params == 'SUBMIT') {
                this.submitFn();
              } else {
                // 自动刷新列表数据
                this.$xutils.showMsgBox('提示', '更新成功！', 500, 140, () => {
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

<style scoped>

</style>
