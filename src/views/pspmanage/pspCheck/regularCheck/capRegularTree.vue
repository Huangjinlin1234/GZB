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
          <template slot="title">投后检查</template>
          <yu-menu-item index="1-1" :style="color['1-1'] && activeIndex == '1-1' ? color['1-1'] : 'color: #48576a;'">检查任务信息</yu-menu-item>
          <yu-menu-item index="1-2" :style="color['1-2'] && activeIndex == '1-2' ? color['1-2'] : 'color: #48576a;'">基本情况</yu-menu-item>
          <yu-menu-item index="1-3" :style="color['1-3'] && activeIndex == '1-3' ? color['1-3'] : 'color: #48576a;'">检查结果</yu-menu-item>
          <yu-menu-item index="1-4" :style="color['1-4'] && activeIndex == '1-4' ? color['1-4'] : 'color: #48576a;'">投后检查报告</yu-menu-item>

          <yu-menu-item index="1-5" :style="color['1-5'] && activeIndex == '1-5' ? color['1-5'] : 'color: #48576a;'">影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <capRegularCheckDetail v-if="activeIndex == '1-1'" ref="capRegularCheckDetail" :type="type"></capRegularCheckDetail>
      <yu-panel v-show="activeIndex == '1-2'" panel-type="simple">
        <template>
          <regularCapCusBase ref="regularCapCusBase"></regularCapCusBase>
        </template>
        <template>
          <capCorpBusiInfo ref="capCorpBusiInfo"></capCorpBusiInfo>
        </template>
      </yu-panel>
      <regularCapCheckRst v-show="activeIndex == '1-3'" ref="regularCapCheckRst"></regularCapCheckRst>
      <pspCheckReport v-if="activeIndex == '1-4'" ref="pspCheckReport" ></pspCheckReport>
      <yu-panel v-if="activeIndex === '1-5'" v-model="activeName" :collapse-hide="false" name="forth">
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
import capRegularCheckDetail from '@/views/pspmanage/pspCheck/regularCheck/capRegularCheckDetail';
import regularCapCusBase from '@/views/pspmanage/pspCheck/regularCheck/regularCapCusBase';
import capCorpBusiInfo from '@/views/pspmanage/pspCheck/regularCheck/capCorpBusiInfo';
import regularCapCheckRst from '@/views/pspmanage/pspCheck/regularCheck/regularCapCheckRst';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  props: {
    bizPageData: Object
  },
  components: { imageSystem, capRegularCheckDetail, regularCapCusBase, capCorpBusiInfo, regularCapCheckRst, pspCheckReport, yufpNwfInit },
  data: function () {
    return {
      bizData: {},

      // color,[2] : 'color: #48576a;',
      color: ['1-1'],
      activeIndex: '1-1',
      rptType: '',
      autoFlag: false, // 是否自动检查
      viewFlag: false, // 是否查看页面
      op: '',
      vdata: {},
      image: '1',
      updateUrl: '',
      addUrl: '',
      imageBizParam: [],
      updateFlag: false, // 是否更新
      changeFlag: true, // 是否切换页面
      tmpIndex: '1-1',
      cusId: '',
      taskNo: '',
      type: ''
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
      if (_this.bizPageData != null && _this.bizPageData != undefined) {
        _this.image = '2';
        _this.workFolwInit();
      } else {
        _this.rptType = _this.$route.params.rptType;
        _this.taskNo = _this.$route.params.pspTask.taskNo;
        _this.op = _this.$route.params.op;
        _this.viewFlag = _this.$route.params.opType === 'view';
        _this.cusId = _this.$route.params.pspTask.cusId;
        if (_this.viewFlag) {
          _this.image = '2';
        }
      }
      _this.imageBizParam = [{
        'top_outsystem_code': 'XXD_DJDH',
        'outsystem_code': 'XXD_DJDH01,XXD_DJDH02',
        'index': {
          'businessid': _this.taskNo

        }
      }];
      _this.type = _this.$route.params.type;
    },
    workFolwInit: function () {
      const _this = this;
      _this.op = 'view';
      _this.viewFlag = true;
      const data = _this.bizPageData.instanceInfo;
      var flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      _this.checkType = flowParam.checkType;
      _this.rptType = flowParam.rptType;
      _this.taskNo = data.bizId;
      _this.cusId = data.bizUserId;
      _this.$route.params.pspTask = {
        taskNo: _this.taskNo,
        rptType: _this.rptType,
        checkType: _this.checkType
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
      var validate3 = false;
      _this.$refs.regularCapCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
        validate3 = valid;
      });
      if (!validate3) {
        _this.$xutils.showMsgBox('提示', '检查结果录入信息不完整！');
        _this.activeIndex = '1-3';
        return;
      }
      let data = _this.$route.params;
      // 任务编号
      const cusId = data.pspTask.cusId;
      const cusName = data.pspTask.cusName;
      const taskNo = data.pspTask.taskNo;
      const checkType = data.pspTask.checkType;
      var bizType = '';
      if (checkType == '26') {
        bizType = 'DH019'; // 定期贷后检查-同业授信
      } else if (checkType == '27') {
        bizType = 'DH020'; // 定期贷后检查-主体授信
      } else if (checkType == '28') {
        bizType = 'DH021'; // 定期贷后检查-产品授信
      } else if (checkType == '36') {
        bizType = 'DH036'; // 不定期贷后检查-同业授信
      } else if (checkType == '37') {
        bizType = 'DH037'; // 不定期贷后检查-主体授信
      } else if (checkType == '38') {
        bizType = 'DH038'; // 不定期贷后检查-产品授信
      } else {
        this.$xutils.showMsgBox('提示', '流程业务类型未配置');
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      var dutyArr = [];
      var dutyArr1 = ['FZH01', 'JRB03', 'JRB07', 'JRB08'];
      var flag = false;
      dutysList.forEach(item => {
        if (dutyArr1.indexOf(item.code) == -1) {
          dutyArr.push(item.code);
        } else {
          dutyArr.push(item.code);
        }
      });

      dutysList.forEach(item => {
        if (dutyArr1.includes(item.code)) {
          flag = true;
        }
      });
      if (!flag) {
        _this.$message.warning('岗位不符，无法提交');
        return;
      }

      var str = dutyArr.join(',');
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
        rptType: str,
        checkType: checkType,
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
        _this.vdata = _this.$refs.capRegularCheckDetail.taskData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.capRegularCheckDetail.updateFlag;
        _this.$refs.capRegularCheckDetail.$refs.pspTaskListForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-2':
        url = '/api/pspcusbasecase/';
        _this.vdata = _this.$refs.regularCapCusBase.cusData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCapCusBase.updateFlag;
        _this.$refs.regularCapCusBase.$refs.pspCusBaseCaseForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-3':
        url = '/api/pspcheckrst/';
        _this.vdata = _this.$refs.regularCapCheckRst.rstData;
        _this.updateFlag = _this.changeFlag == false ? _this.updateFlag : _this.$refs.regularCapCheckRst.updateFlag;
        _this.$refs.regularCapCheckRst.$refs.pspCheckRstForm.validate(function (valid) {
          validate = valid;
        });
        break;
      case '1-4':
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
      if (_this.activeIndex == '1-1') {
        _this.updateUrl = _this.$backend.cmisPsp + url1;
      } else {
        _this.addUrl = url1 == '' ? _this.$backend.cmisPsp + url : _this.$backend.cmisPsp + url1;
        _this.updateUrl = _this.$backend.cmisPsp + url + 'update';
      }

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
                _this.submitFn();
                // 操作成功
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
