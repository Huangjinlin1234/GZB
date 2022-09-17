<template>
  <div>
    <yu-xdialog title="风险拦截" :visible.sync="riskdialogVisible" width="850px">
    <yu-xtable ref="refTablerisk" :pageable="false" :data="riskData" row-number>
      <yu-xtable-column label="风险拦截项目" width="300" prop="itemName"></yu-xtable-column>
      <yu-xtable-column label="拦截结果" prop="resultDesc"></yu-xtable-column>
      <yu-xtable-column label="是否通过" width="120" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.result==1" class="el-icon-yx-checkmark" style="margin-top: 7px;font-size: 30px;color: #13ce66;"></i>
          <i v-if="scope.row.result==2" class="el-icon-loading" style="margin-top: 7px;font-size: 28px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==1" class="el-icon-yx-info" style="margin-top: 7px;font-size: 30px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==2" class="el-icon-yx-warning" style="margin-top: 7px;font-size: 30px;color:#f7ba2a"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==3" class="el-icon-yx-cancel-circle" style="margin-top: 7px;font-size: 30px;color: #ff4949"></i>
        </template>
      </yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton" style="margin-top:8px;">
      <yu-button icon="check" type="primary" @click="checkRiskFn(true)">确定</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelRiskFn">取消</yu-button>
    </div>
  </yu-xdialog>
  </div>
</template>
<script>
/* eslint no-console:0 */
/**
 * yufp-nwf-init
 * 流程发起后第一个节点的审批人是节点配置的审批人员，
 * 和发起人并不一定是同一个人，
 * 所以发起后在进行一次提交操作一般是行不通的，
 * 所以在使用该组件时需要把流程图的第一个节点的办理人员设置为流程发起人自定义类
 * 这样发起人发起过后就可以在进行一次提交；
 * @created by zhouqh 2020-7-1
 * @description 流程初始化＋提交下一步组件
 */
import { mapGetters } from 'vuex';
export default {
  name: 'YufpNwfRisk',
  props: {
    commonParams: {
      type: Object,
      required: false
    },
    echainServerName: {
      type: String,
      default: backend.workflowService
    },
    el: String
  },
  data: function () {
    return {
      // 风险拦截相关
      riskData: [],
      riskParam: [],
      riskdialogVisible: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentUserId = this.userCode;
    this.currentOrgId = this.org.id;
  },
  methods: {
    riskFn: function (param, wfInitData) {
      var _this = this;
      // 流程参数
      wfInitData.nodeId = param.nodeId;
      wfInitData.instanceId = param.instanceId;
      _this.riskData.splice(0, _this.riskData.length);
      let model = {condition: JSON.stringify({ 'sceneId': param.nodeId, 'bizType': wfInitData.bizType })};
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskscene/getRiskItem',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.data) {
            if (response.data.length == 0) {
              // 没有返回数据，视风险拦截被关闭，直接回调父函数
              _this.$parent.saveData();
            } else {
              _this.riskStart(response.data, param, wfInitData);
            }
          } else {
            _this.$message({ message: '初始化风险拦截失败', type: 'error' });
            _this.beforeClose();
          }
        }
      });
    },
    // 发起风险拦截
    riskStart: function (data, param, wfInitData) {
      let arr = [];
      this.riskParam = param;
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.itemName = data[i].itemName;
        obj.riskLevel = data[i].riskLevel;
        obj.result = '2';
        this.riskData.push(obj);
        arr.push(this.riskitem(data[i], wfInitData, i));
      }
      this.riskdialogVisible = true;
      Promise.all(arr).then(res => {
        console.log(res);
      });
    },
    /** 单项拦截 */
    riskitem (item, wfInitData, i) {
      return new Promise((resolve, reject) => {
        let _this = this;
        // model.inputId = _this.loginCode;
        _this.$request({
          url: this.evil(item.itemClass) + '?i=' + i,
          method: 'POST',
          data: JSON.stringify({ condition: JSON.stringify(wfInitData) })
        }).then(({ code, message, data }) => {
          if (data) {
            item.result = data.riskResultType;
            item.resultDesc = data.riskResultDesc;
            _this.$set(_this.riskData, i, item);
          } else {
            item.result = '3';
            item.resultDesc = '检查失败';
            _this.$set(_this.riskData, i, item);
          }
          resolve(data);
        });
      });
    },
    // 转义代码
    evil (fn) {
      let Fn = Function;
      return new Fn('return ' + fn)();
    },
    /** 检查拦截结果 */
    checkRiskFn (btn) {
      var _this = this;
      for (let i = 0; i < _this.riskData.length; i++) {
        let item = _this.riskData[i];
        // 检查未完成
        if (item.result == 2) {
          this.riskdialogVisible = false;
          return;
        }
        // 检查不通过,且等级是拦截
        if (item.result == 3 && item.riskLevel == 3) {
          this.riskdialogVisible = false;
          return;
        }
      }
      this.riskdialogVisible = false;
      // 检查通过,回调父函数
      this.$parent.saveData();
    },
    cancelRiskFn () {
      this.riskdialogVisible = false;
    },
    /** 风险拦截相关 --- 结束 */
    isContainStarter: function (param) {
      for (let i = 0; i < param.length; i++) {
        let p = param[i];
        if (this.currentUserId === p.userId) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
