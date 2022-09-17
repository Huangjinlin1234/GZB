<template>
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisFlg">
      <!--基本信息-->
      <yu-panel title="基本信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" hidden ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务流水号" name="iqpSerno" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" rules="required" ctype="select" data-code="STD_ZB_CONT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
           <yu-xform-item label="贷款性质" name="loanCha" rules="required" ctype="select" data-code="STD_ZB_LOAN_PROP" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
          <yu-xform-item label="是否电子用印" name="isESeal" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否续签合同" name="isRenew" rules="required" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="原合同编号" name="origiContNo" ctype="input" disabled :hidden="isShowOriContNoFlg"></yu-xform-item >
        </yu-xform-group>
      </yu-panel>
      <!--期限金额-->
      <yu-panel title="期限金额" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" rules="required" @change="getCurTypeRate"></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="num" rules="required" @blur="contAmtChange"></yu-xform-item>
          <yu-xform-item label="汇率" name="appRate" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="折算人民币金额" name="cvtCnyAmt" ctype="num" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用信金额" name="contHighAvlAmt" ctype="num" rules="required" @blur="contHighAvlAmtChange"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" rules="required" @change="termChange"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" rules="required" @change="termChange"></yu-xform-item>
          <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" rules="required" :colspan="12" autofocus unit="月"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--使用额度信息-->
      <yu-panel title="使用额度信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" ctype="select" data-code="STD_ZB_YES_NO" name="isUtilLmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled>
            <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="viewReplyNo" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--其它信息-->
      <yu-panel title="其它信息" padding-top :collapseHide="false">
        <yu-xform-group>

          <!--<yu-xform-item label="贷款投向" ctype="yu-xtree-dic" name="loanTerName" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanDirectionName', enName: 'loanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }"></yu-xform-item>-->
          <!--<yu-xform-item label="贷款投向" ctype="yu-xtree-dic" name="loanTerName" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{id:'loanTer',label:'loanTerName'}" :parms="{optType: 'STD_ZB_TRADE_CLASS'}" :selectionType="radio" :colspan="24"></yu-xform-item>-->
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款投向码值" name="loanTer" ctype="input" :colspan="24" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="用途分析" name="purpAnaly" ctype="textarea" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="交叉核验详细分析" name="crossChkDetailAnaly" ctype="textarea" :colspan="24"></yu-xform-item>
          <yu-xform-item label="还款来源" name="repaySour" ctype="textarea" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="调查人结论" name="inveConclu" ctype="textarea" rules="required" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--地址确认信息-->
      <yu-panel title="地址确认信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="联系人" name="linkman" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="电话" name="phone" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="传真" name="fax" ctype="input"></yu-xform-item>
          <yu-xform-item label="邮箱" name="email" ctype="input"></yu-xform-item>
          <yu-xform-item label="QQ" name="qq" ctype="input"></yu-xform-item>
          <yu-xform-item label="微信" name="wechat" ctype="input"></yu-xform-item>
          <yu-xform-item label="送达地址" name="deliveryAddr" ctype="input" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--登记信息-->
      <yu-panel title="登记信息" padding-top :collapseHide="false">
        <yu-xform-group>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
          <yu-button type="primary" @click="tempSave">暂存</yu-button>
          <yu-button type="primary" @click="save">保存</yu-button>
          <yu-button type="primary" @click="commit">提交</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-form-buttons>
    </yu-xform>
      <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
      <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  components: { cfgAssistantTip },
  data: function () {
    return {
      formdata: {},
      bizType: '01',
      formDisFlg: false,
      isShowOriContNoFlg: true,
      topOutsystemCode: 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;',
      prdCode: '',
      isShow: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      isShowButton: true
    };
  },
  mounted: function () {
    var data = '';
    var iqpSerno = '';
    var op = '';

    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      iqpSerno = data.bizId;
      op = data.op;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      iqpSerno = data.biz_serno;
      op = data.op;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      iqpSerno = data.biz_serno;
      op = data.op;
    }
    // 表单只读处理
    if (op == 'VIEW' || op == 'view') {
      this.formDisFlg = true;
      this.isShowButton = false;
    }
    // 表单 数据加载
    this.$request({
      // async: false,
      method: 'post',
      url: this.$backend.cmisBiz + '/api/iqploanapp/queryByiqpSerno',
      data: iqpSerno
    })
      .then(response => {
        // 重置表单校验结果
        this.$refs.refForm.resetFields();
        // 给表单数据赋值
        this.$utils.clone(response.data, this.$refs.refForm.formdata);
        // 币种默认人民币
        this.formdata.curType = 'CNY';
        // 贷款性质默认为  自营贷款
        this.$refs.refForm.formdata.loanCha = '01';
        // 原合同编号字段控制
        let isRenew = this.$refs.refForm.formdata.isRenew;
        if (isRenew == '1') {
          this.isShowOriContNoFlg = false;
        } else {
          this.isShowOriContNoFlg = true;
        }
        if (this.formdata.lmtAccNo == null || this.formdata.lmtAccNo == '') {
          this.isLmtAccNoRequired = false;
          this.isReplyNoRequired = false;
        } else {
          this.isLmtAccNoRequired = true;
          this.isReplyNoRequired = true;
        }
      })
      .catch(() => {
        this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
      });
  },
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    getCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.appRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.appRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
      }
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/iqploanapp/update';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.prdCode = response.data.prdId;
          } else {
            _this.$message({ showClose: true, message: response.data.rtnMsg, type: 'error' });
          }
        }
      });
    },

    // 保存
    save: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/iqploanapp/update';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
          } else {
            _this.$message({ showClose: true, message: response.data.rtnMsg, type: 'error' });
          }
        }
      });
    },

    // 自动计算 折算人民币金额=合同金额*汇率
    contAmtChange (value) {
      var contAmt = this.formdata.contAmt;
      let contHighAvlAmt = this.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        this.formdata.contHighAvlAmt = '';
      }
      this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * this.formdata.appRate;
    },

    termChange (value) { // 校验合同期限
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate <= startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        return;
      }
      let termMap = {
        startDate: this.formdata.startDate,
        endDate: this.formdata.endDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.contTerm = data;
        }
      });
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },
    // 本合同项下最高可用信金额需小于等于合同金额
    contHighAvlAmtChange (value) {
      let contHighAvlAmt = this.formdata.contHighAvlAmt;
      let contAmt = this.formdata.contAmt;
      if (parseFloat(contHighAvlAmt) > parseFloat(contAmt)) {
        this.$xutils.showMsgBox('提示', '本合同项下最高可用信金额需小于等于合同金额！'); // 弹出提示
        this.formdata.contHighAvlAmt = '';
        return;
      }
      this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * parseFloat(this.formdata.appRate);
    },
    // 提交
    commit () {
      // 调用通用的保存方法
      // afterSaveCommit();
      let saveFlag = this.commonSave();

      if (saveFlag) {
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        this.afterSaveCommit();
      }
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      saveFlag = this.commitSave();
      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      let saveData = this.formdata;
      let saveFlag = true;
      let rtnData = {};

      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/iqploanapp/update',
        data: JSON.stringify(saveData),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            saveFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!saveFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return false;
      }

      if (rtnData != '1') {
        this.$xutils.showMsgBox('提示', '保存数据异常！'); // 弹出提示
        return false;
      }
      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      // 流程状态
      var _this = this;
      let loginUser = _this.$xutils.getLoginUserInfo();

      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX004';
      startdto.bizId = this.formdata.iqpSerno;
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = {
        contAmt: this.formdata.contAmt,
        lowRisk: '21',
        contNo: this.formdata.contNo,
        topOutsystemCode: _this.topOutsystemCode
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.back();
    },

    viewReplyNo () {
      var _this = this;
      if (_this.formdata.replyNo == null || _this.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = _this.formdata.replyNo;
      this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        -1,
        -1,
        params
      );
    },

    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.$refs.refForm.formdata.cusId == null || this.$refs.refForm.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.$refs.refForm.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
