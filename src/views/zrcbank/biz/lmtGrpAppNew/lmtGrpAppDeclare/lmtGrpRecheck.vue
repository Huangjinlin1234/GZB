<template>
  <div>
    <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
      <yu-panel title="一、上期授信情况"  :hideFilter="false" :collapseHide="false">
       <yu-xform-group :column="3">
          <yu-xform-item label="集团授信申请流水号" ctype="input" name="lmtSerno" disabled></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" disabled></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled></yu-xform-item>
          <yu-xform-item label="日期" ctype="input" name="inputDate" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xtable ref="refTable" row-number show-summary :data-url="dataUrl" condition-key="condition" :base-params="baseParams" selection-type="radio" request-type="POST">
          <yu-xtable-column label="serno" prop="serno" hide-column></yu-xtable-column>
          <yu-xtable-column label="成员名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="授信总额" prop="lmtAmt"></yu-xtable-column>
          <yu-xtable-column label="用信额度" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="复审授信金额" prop="reconsideAmt"></yu-xtable-column>
          <yu-xtable-column prop="todo" label="操作" width="120">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none"  @click="viewMemReCheck(scope.row)">查看当前成员复审表(电子版)</a>
          </template>
        </yu-xtable-column>
        </yu-xtable>
        <yu-panel title="二、客户经理审核意见"  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="1. 结合授信申请人财务、非财务因素作综合分析" ctype="textarea" name="inteAnaly" rules="required" ></yu-xform-item>
            <yu-xform-item label="2. 对贷款偿还存在的不利因素及相关风险控制意见" ctype="textarea" name="controlOpinion" rules="required" ></yu-xform-item>
            <yu-xform-item label="3. 结论（调查人同意的复审授信额度、业务品种、担保方式、金额、利/费率、保证金情况等" ctype="textarea" name="restDesc" rules="required" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" v-if="type!='VIEW'" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="printFn">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// yufp.lookup.reg('CUS_CIFC_TYPE,STD_ZB_GUAR_WAY,STD_ZB_RELATION,STD_ZB_CORP_TYPE,STD_HOUSE_USE');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      dataUrl: backend.cmisBiz + '/api/lmtrecheckdetail/queryLatestInfoByGrpSerno',
      baseParams: {}
    };
  },
  created () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      let lmtSerno = '';
      let grpSerno = '';
      let data = {};
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        data = _this.getFactory().contextData.instanceInfo;
        lmtSerno = data.bizId;
        _this.baseFormdata1.grpCusName =
        _this.type = 'VIEW';
      } else {
        data = _this.$route.meta.params;
        lmtSerno = data.grpSerno;
        _this.type = data.op;
      }
      _this.baseParams = {
        serno: lmtSerno
      };
      grpSerno = lmtSerno;
      // 获取页面信息
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtrecheckdetail/selectBySerno',
        data: lmtSerno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.baseFormdata1.lmtSerno = lmtSerno;
          });
        }
      });
      // 获取集团客户名称、编号信息
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/queryInfoByGrpSerno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            _this.baseFormdata1.grpCusId = response.data.grpCusId;
            _this.baseFormdata1.grpCusName = response.data.grpCusName;
          });
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtrecheckdetail/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.doMustCheck();
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.baseFormdata1.lmtSerno;
      obj.pageId = 'xhedfs';
      obj.pageName = '循环授信额度复审';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },

    // 成员客户复审表
    viewMemReCheck: function (data) {
      var _this = this;
      var params = data;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoxhsxedfsbdy';
      params.src = _this.$backend.frptRptService + 'DGSX-XHSXEDFSB-DY.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '循环授信额度复审表（单一）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 集团复审表
    printFn: function () {
      var _this = this;
      var params = _this.baseFormdata1;
      // var params = _this.baseFormdata1;// 模板工厂中的参数传递
      if (params.lmtSerno == null || params.lmtSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoxhsxedfsbjt';
      params.src = _this.$backend.frptRptService + 'DGSX-XHSXEDFSB-JT.cpt&op=view&grpSerno=' + params.lmtSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '循环授信额度复审表（集团）',
        // 传递的业务数据，可选配置
        data: params
      });
    }

  }
};
</script>
