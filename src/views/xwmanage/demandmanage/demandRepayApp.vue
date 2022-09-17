<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <!-- 追缴还款 -->
    <yu-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'">
      <yu-tab-pane label="基本信息" name="first">
        <yu-xform ref="refBaseForm" label-width="200px" v-model="baseFormdata" :form-type="formType">
          <yu-panel title="追缴流水明细" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="交易流水号" ctype="input" placeholder="交易流水号" name="pkId" disabled></yu-xform-item>
              <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo" colspan="12" disabled></yu-xform-item>
              <yu-xform-item label="核心交易流水" ctype="input" name="coreTranSerno" colspan="11" disabled></yu-xform-item>
              <yu-xform-item label="" ctype="yu-button" name="b2" @click="doReplyView" label-width="1" colspan="1">选择</yu-xform-item>
              <yu-xform-item label="归还正常本金" ctype="input" name="guihzcbj" disabled></yu-xform-item>
              <yu-xform-item label="归还逾期本金" ctype="input" name="guihyqbj" disabled></yu-xform-item>
              <yu-xform-item label="归还应收应计利息" ctype="input" name="ghysyjlx" disabled></yu-xform-item>
              <yu-xform-item label="归还催收应计利息" ctype="input" name="ghcsyjlx" disabled></yu-xform-item>
              <yu-xform-item label="归还应收欠息" ctype="input" name="ghynshqx" disabled></yu-xform-item>
              <yu-xform-item label="归还催收欠息" ctype="input" name="ghcushqx" disabled></yu-xform-item>
              <yu-xform-item label="归还应收应计罚息" ctype="input" name="ghysyjfx" disabled></yu-xform-item>
              <yu-xform-item label="归还催收应计罚息" ctype="input" name="ghcsyjfx" disabled></yu-xform-item>
              <yu-xform-item label="归还应收罚息" ctype="input" name="ghynshfx" disabled></yu-xform-item>
              <yu-xform-item label="归还催收罚息" ctype="input" name="ghcushfx" disabled></yu-xform-item>
              <yu-xform-item label="归还应计复息" ctype="input" name="ghyjfuxi" disabled></yu-xform-item>
              <yu-xform-item label="归还复息" ctype="input" name="ghfxfuxi" disabled></yu-xform-item>
              <yu-xform-item label="归还罚金" ctype="input" name="ghfajinn" disabled></yu-xform-item>
              <yu-xform-item label="核心交易日期" ctype="input" name="coreTranDate" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="submit" :hidden="hiddenFn">保存</yu-button>
          <yu-button type="primary" @click="submitLc" :hidden="hiddenFn">提交</yu-button>
          <yu-button @click="cancel" :hidden="hiddenFn">返回</yu-button>
        </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
      </yu-tab-pane>
      <yu-tab-pane label="还款情况信息" name="two">
        <yu-xform ref="refForm" label-width="200px" v-model="formdata" :form-type="formType">
          <yu-panel title="结算账户信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="交易流水号" ctype="input" placeholder="交易流水号" name="pkId" disabled hidden></yu-xform-item>
              <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo" disabled hidden></yu-xform-item>
              <yu-xform-item label="是否第三方还款" ctype="select" name="acctIdType" data-code="STD_ZB_YES_NO" @change="remotePo" rules="required" :disabled="disabledFlg"></yu-xform-item>
              <yu-xform-item label="还款账号" ctype="input" name="repayAcctNo" :hidden="hiddenFlg1" rules="required" :disabled="disabledFlg"></yu-xform-item>
              <yu-xform-item label="第三方还款账号" ctype="input" name="otherRepayAcctNo" :hidden="hiddenFlg2" rules="required" :disabled="disabledFlg"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="submitFormFn" :hidden="hiddenFn">保存</yu-button>
        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="影像扫描" name="three">
        <imageSystem ref="imageSystemRef" authority="import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move" :s="this.$route.meta.params.showFlg" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
    </yu-tabs>
    <yu-xdialog title="核心交易选取" :visible.sync="dialogFormVisible" :min-width="1000">
        <yu-xtable ref="refTable" row-number  condition-key="condition" :baseParams="baseParams" request-type="POST" selection-type="radio" :data-url="dataUrl" :default-load="true">
          <yu-xtable-column label="核心交易流水" prop="coreTranSerno"></yu-xtable-column>
          <yu-xtable-column label="归还正常本金" prop="guihzcbj"></yu-xtable-column>
          <yu-xtable-column label="归还逾期本金" prop="guihyqbj"></yu-xtable-column>
          <yu-xtable-column label="归还应收应计利息" prop="ghysyjlx"></yu-xtable-column>
          <yu-xtable-column label="归还催收应计利息" prop="ghcsyjlx"></yu-xtable-column>
          <yu-xtable-column label="归还应收欠息" prop="ghynshqx"></yu-xtable-column>
          <yu-xtable-column label="归还催收欠息" prop="ghcushqx"></yu-xtable-column>
          <yu-xtable-column label="还款账号" prop="replyAmt" ></yu-xtable-column>
          <yu-xtable-column label="交易日期" prop="replyAmt" ></yu-xtable-column>
          <yu-xtable-column  fixed="right"  label="操作">
             <template slot-scope="scope">
               <yu-button  @click.native.prevent="doSelect(scope.$index, scope.row)"  type="primary"  size="small">
                   选择
               </yu-button>
             </template>
          </yu-xtable-column>
       </yu-xtable>
      </yu-xdialog>
      <yufpNwfRisk ref="yufpNwfRisk"></yufpNwfRisk>
  </div>
</template>
<script>

import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import { validator } from '@/utils/validate';
import batTaskRelVue from '../../batchmanage/bat/batTaskRel.vue';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GUAR_WAY,STD_RATE_ADJ_MODE,STD_RATE_ADJ_DATE,STD_INST_SETTLE_TYPE,STD_HX_HKFS,STD_CONT_MODE,STD_ZB_YES_NO');
export default {
  components: {imageSystem, yufpNwfRisk},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      activeName: 'first',
      dialogFormVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectcorebymodel',
      formType: 'edit',
      baseFormdata: {},
      formdata: {},
      baseParams: {},
      hiddenFlg1: false,
      hiddenFlg2: true,
      outsystemcode: 'XD_ZDZJCZ01,XD_ZDZJCZ02',
      coreTranSerno: '',
      disabledFlg: true,
      hiddenFn: true
    };
  },
  computed: {
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'XD_ZDZJCZ',
          'outsystem_code': this.outsystemcode,
          'index': {
            'businessid': this.getPkId(),
            'custid': '',
            'custname': '',
            'custconduct': '',
            'custconductname': '',
            'orgid': '',
            'orgname': '',
            'contid': '',
            'billno': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  mounted () {
    var _this = this;
    if (_this.$route.params.hasOwnProperty('showFlg')) {
      _this.showFlg = _this.$route.meta.params.showFlg;
    } else {
      _this.showFlg = '02';
    }
    if (_this.showFlg == null || _this.showFlg == '02') {
      _this.disabledFlg = true;
    } else {
      _this.disabledFlg = false;
      _this.hiddenFn = false;
    }
    _this.selectData();
  },
  methods: {
    doSelect (index, rows) {
      let _this = this;
      if (rows == null) {
        _this.$message({message: '请选择一条数据'});
        return;
      }
      yufp.clone(rows, _this.baseFormdata);
      _this.baseFormdata.coreTranDate = rows.jiaoyirq; // 核心交易日期
      _this.dialogFormVisible = false;
    },
    doReplyView () {
      let _this = this;
      _this.dialogFormVisible = true;
      // 前往核心获取数据
      let billNo = _this.baseFormdata.billNo;
      _this.baseParams = {condition: {billNo: billNo}};
    },
    doCancel () {
      this.dialogFormVisible = false;
    },
    /** 初始化载入数据专用 */
    selectData () {
      let _this = this;
      let pkId = this.$route.params.hasOwnProperty('pkId') ? this.$route.meta.params.pkId : this.bizPageData.instanceInfo.bizId;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectbypkid',
        data: {pkId: pkId},
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.baseFormdata);
          yufp.clone(response.data, _this.formdata);
        }
      });
    },
    /** 是否第三方账号 */
    remotePo (acctIdType) {
      if (acctIdType == '1') {
        this.hiddenFlg1 = true;
        this.formdata.repayAcctNo = '';
        this.hiddenFlg2 = false;
      } else {
        this.hiddenFlg1 = false;
        this.formdata.otherRepayAcctNo = '';
        this.hiddenFlg2 = true;
      }
    },
    /** 基本数据保存 */
    submit () {
      let _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpdemandrepayappinfo/updatepvpdemandrepayapp',
        data: _this.baseFormdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({message: '保存成功！', type: 'success'});
          } else {
            _this.$message({message: '保存失败！', type: 'warning'});
          }
        }
      });
    },
    /** 第三方数据保存 */
    submitFormFn () {
      let _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpdemandrepayappinfo/updatepvpdemandrepayappinfo',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({message: '保存成功！', type: 'success'});
          } else {
            _this.$message({message: '保存失败！', type: 'warning'});
          }
        }
      });
    },
    /**
     * 流程提交节点选择框
     */
    startAndSubmit () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      // startdto.bizType = 'XWYW01';
      startdto.bizType = 'XW010';
      // startdto.bizType = 'XD_PERFER_RATE_APPLY_TEST';
      startdto.bizId = _this.baseFormdata.pkId;
      startdto.bizUserName = _this.baseFormdata.cusName;
      startdto.bizUserId = _this.baseFormdata.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 提交审批
    submitLc () {
      var _this = this;
      var validate = false;
      var validate2 = false;
      this.$refs.refBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }
      _this.submit();
      this.$refs.refForm.validate(function (valid) {
        validate2 = valid;
      });
      if (!validate2) {
        _this.$message({ message: '请录入还款情况信息！', type: 'warning' });
        return;
      }
      _this.submitFormFn();
      _this.startAndSubmit(); // 提交流程
    },
    cancel () { // 关闭
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    getPkId () {
      return this.$route.params.hasOwnProperty('pkId') ? this.$route.meta.params.pkId : this.bizPageData.instanceInfo.bizId;
    }
  }
};
</script>
