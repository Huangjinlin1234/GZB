<template>
<div>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSave" v-if="isView">保存</yu-button>
      <yu-button type="primary" @click="doSubmit" v-if="isView">提交</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="visiable" width="600px" title="批复信息">
        <yu-xform v-model="dialogData" ref="dialogKH" label-width="120px" related-table-name="refTable" form-type="details">
          <yu-xform-group :column="2">
            <yu-xform-item label="额度批复编号" ctype="input" placeholder="额度批复编号" name="replySerno"></yu-xform-item>
            <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input"  placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="批复额度类型" ctype="input" placeholder="批复额度类型" name="limitType" data-code="STD_LIMIT_TYPE"></yu-xform-item>
            <yu-xform-item label="批复金额" ctype="input" placeholder="批复金额" name="replyAmt"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-xdialog>
    <yufpNwfRisk ref="yufpNwfRisk"></yufpNwfRisk>
</div>
</template>
<script>
yufp.lookup.reg('STD_LIMIT_TYPE');
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import d1Billcard from './iqpLoanInfo_d1_17_BillCard.vue';
// import d117Billcard from './iqpLoanInfo_d1_BillCard.vue'
export default {
  components: {d1Billcard, yufpNwfRisk},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      // d1_17_BillCard: null,
      isView: false,
      visiable: false,
      dialogData: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 贷款申请基本信息*/
    afterInit () {

      this.d1_BillCard = this.$refs.d1_BillCard;
      this.op = this.$route.meta.params.op;
      if (this.op == 'UPDATE') {
        this.d1_BillCard.disabledFlg2 = false;
        this.isView = true;
      }
      const iqpSerno = this.$route.meta.params.iqpSerno;
      // 初始化填充页面数据
      yufp.clone(this.queryData(iqpSerno), this.d1_BillCard.formdata);

      this.d1_BillCard.addEditChangeAction(this.onChange);
      const signMode = this.d1_BillCard.getItemValue('signMode');
      if (signMode == null || signMode == '') {
        this.d1_BillCard.signModeType = true;
      }
      const repayDate = this.d1_BillCard.getItemValue('repayDate');
      // 获取还款日
      if (repayDate == null || repayDate == '') {
        this.d1_BillCard.formdata.repayDate = this.selectRepayDay(iqpSerno);
      }
      const guarWay = this.d1_BillCard.getItemValue('guarWay');
      // 担保方式不为抵押时隐藏
      if (guarWay != '10') {
        this.d1_BillCard.setItemVisible('isOlPld', false);
      }
      const contType = this.d1_BillCard.getItemValue('contType');
      // “申请贷款类型=一般合同”时显示且必输。
      if (contType == '1') {
        this.d1_BillCard.setBillCardItemRequired('irAdjustType', true);
        this.d1_BillCard.setBillCardItemRequired('defrayMode', true);
        this.d1_BillCard.setBillCardItemRequired('repaymentType', true);
        this.d1_BillCard.setBillCardItemRequired('loanPayoutAccNo', true);
      }
      // 贷款性质->默认“自营贷款”。
      if (this.d1_BillCard.formdata.loanCha == null) {
        this.d1_BillCard.formdata.loanCha = '01';
      }
      // 支付方式
      if (contType == '1' && this.d1_BillCard.formdata.payMode == null && this.op == 'UPDATE') {
        this.d1_BillCard.disabledFlg = false;
      }
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 2021年9月3日16:41:51 hubp 新增贷款投向控制  08为经营性  09为消费型
      // 经营性贷款，贷款投向必填    消费性贷款，贷款投向置灰，不允许选择，默认为空
      if (this.getPrdType(iqpSerno) == '08' && this.op == 'UPDATE') {
        this.d1_BillCard.disabledFlg1 = false;
        this.d1_BillCard.requiredFlg1 = 'required';
      } else {
        this.d1_BillCard.requiredFlg1 = '';
      }
    },

    /** 初始化方法-通过申请流水号查询数据
     */
    queryData (iqpSerno) {
      let returnData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoxw',
        data: {iqpSerno: iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {

            returnData = response.data;
          }
        }
      });
      return returnData;
    },
    getPrdType (iqpSerno) {
      let returnData = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/getprdinfo',
        data: {iqpSerno: iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            returnData = response.data;
          }
        }
      });
      return returnData;
    },
    /** 初始化方法-通过批复编号查询数据
     */
    queryReplyData (replySerno) {
      let returnData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtcrdreplyinfo/selectbyreplyserno',
        data: {replySerno: replySerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            returnData = response.data;
          }
        }
      });
      return returnData;
    },


    doSave () {
      // const flag = this.d1_BillCard.updateBillCardData();
      /*       if (!flag) {
        this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
        return;
      }
      this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {}); */
      // 获取批复信息，留作规则校验
      var _this = this;
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }
      this.d1_BillCard.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      let formdata = this.d1_BillCard.formdata;
      const replyData = this.queryReplyData(formdata.replyNo);
      if (formdata.contType == '1' && formdata.contAmt > replyData.replyAmt) {
        this.$message({ message: '合同金额必须小于等于批复金额', type: 'warning' });
        return;
      }
      if (formdata.contType == '1' && formdata.contTerm > replyData.appTerm) {
        this.$message({ message: '合同期限必须小于等于批复期限', type: 'warning' });
        return;
      }
      if (formdata.guarWay != '10') {
        if (formdata.contAmt != formdata.contHighAvlAmt) {
          this.$message({ message: '抵押方式不为抵押时，合同金额需与最高可用信金额一致！', type: 'warning' });
          return;
        }
      }

      const returnData = this.updateData();
      if (returnData.code == '0') {
        if (returnData.data == 1) {
          this.$message({ message: '保存成功', type: 'success' });
          // 覆盖路由跳转数据
          yufp.clone(this.d1_BillCard.formdata, this.$route.meta.params);
        } else if (returnData.data == -1) {
          this.$message({ message: '合同申请状态为通过，禁止修改', type: 'error' });
        } else {
          this.$message({ message: '保存失败  ', type: 'warning' });
        }
      } else {
        this.$message({ message: '保存失败  ', type: 'warning' });
      }
    },

    doSubmit () {
      var _this = this;
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }
      let formdata = _this.d1_BillCard.formdata;
      const replyData = _this.queryReplyData(formdata.replyNo);
      if (formdata.contType == '1' && formdata.contAmt > replyData.contAmt) {
        this.$message({ message: '一般合同金额必须小于等于批复金额', type: 'warning' });
        return;
      } else if (formdata.contType == '2' && formdata.contAmt > replyData.contAmt) {
        if (formdata.guarWay == '00' || formdata.guarWay == '30' || formdata.guarWay == '40' || formdata.guarWay == '60') {
          this.$message({ message: '仅有抵押类最高额合同合同金额允许超过批复金额', type: 'warning' });
          return;
        }
      }
      if (formdata.contType == '1' && formdata.contTerm > replyData.appTerm) {
        this.$message({ message: '一般合同期限必须小于等于批复期限', type: 'warning' });
        return;
      }
      if (formdata.execRateYear > replyData.execRateYear) {
        this.$message({ message: '一般贷款年利率必须大于等于批复年利率', type: 'warning' });
        return;
      }
      // WH 2021年7月7日15:04:17  修改这个bug
      // const returnData = this.updateData();
      // debugger;
      // if (returnData.code != '0') {
      //   this.$message({ message: '提交失败  ', type: 'warning' });
      //   return;
      // }
      // 申请流水号
      // const iqpSerno = this.$route.meta.params.iqpSerno;
      let param = {
        nodeId: '448_4'
      };
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = 'XWHT001';
      startdto.bizId = this.$route.meta.params.iqpSerno;
      startdto.bizUserName = this.$store.state.oauth.userName;
      startdto.bizUserId = this.d1_BillCard.formdata.cusId;
      _this.$refs.yufpNwfRisk.riskFn(param, startdto);
    },

    saveData () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/createctrloancontxw',
        data: this.d1_BillCard.formdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '提交成功  ', type: 'success' });
            yufp.router.removeTab(this.$route.path);
          } else {
            _this.$message({ message: response.erortx, type: 'warning' });
          }
        }
      });
    },

    // 基本信息界面查看客户信息  模板cus_base_list_pop
    doCusView () {
      // const jsoPar = {
      //   'cusId': this.d1_BillCard.getBillCardItemValue('cusId')
      // }; // 传到弹出窗口的参数

      // // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      // this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/cusBaseListIndex', 900, 400, jsoPar);
      var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = this.d1_BillCard.getBillCardItemValue('cusId');
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '个人客户查看';
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },

    /** 批复信息查看按钮
     */
    doReplyView () {
      // 获取批复编号
      this.visiable = true;
      let repayNo = this.d1_BillCard.formdata.replyNo;
      let repayData = this.queryReplyData(repayNo);
      yufp.clone(repayData, this.dialogData);
    },

    onChange (thisCard, itemKey, oldValue, newValue) {
      if (itemKey == 'startDate' || itemKey == 'endDate') {
        if (this.d1_BillCard.formdata.startDate != null && this.d1_BillCard.formdata.endDate != null) {
          let s = new Date(this.d1_BillCard.getBillCardItemValue('startDate'));
          let e = new Date(this.d1_BillCard.getBillCardItemValue('endDate'));
          if (e < s) {
            this.$message({message: '起始日期必须小于结束日期'});
            this.d1_BillCard.formdata.startDate = null;
            this.d1_BillCard.formdata.endDate = null;
            return;
          }
          let sMonth = (s.getFullYear() * 12) + s.getMonth();
          let eMonth = (e.getFullYear() * 12) + e.getMonth();
          let month = eMonth - sMonth;
          if (e.getDate() > s.getDate()) {
            month = month + 1;
          }
          if (month > 12) { // 借款种类赋值->合同期限大于一年为中长期借款，小于或等于为短期借款
            this.d1_BillCard.formdata.loanType = '06';
          } else {
            this.d1_BillCard.formdata.loanType = '05';
          }
          // this.d1_BillCard.formdata.contTerm = month;
          var _this = this;
          this.$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
            data: {startDate: s, endDate: e}
          }).then(({code, message, data}) => {
            if (code == 0) {
              if (data != null) {
                _this.d1_BillCard.formdata.contTerm = data;
              } else {
                _this.$message({message: '未查询到相关数据', type: 'warning'});
              }
            } else {
              _this.$message({message: message, type: 'warning'});
            }
          });
        }
      }
      if (itemKey == 'startDate') {
        if (this.d1_BillCard.formdata.startDate != null) {
          let sDate = new Date(this.d1_BillCard.formdata.startDate);
          let iDate = new Date(this.d1_BillCard.formdata.inputDate);
          if (sDate < iDate) {
            this.$message({ message: '合同起始日必须大于等于合同登记日期!', type: 'warning' });
            this.d1_BillCard.formdata.startDate = '';
          }
        }
      }
    },

    // 校验放款账号不为空，
    // 发接口去核心查询当前客户账号，若客户账号不存在或状态异常，系统自动情况“放款账号”值并给出明确提示；若存在正常状态的账号，则回显放款账号名称值。
    doAccNoView () {
      const loanPayoutAccno = this.d1_BillCard.formdata.loanPayoutAccno;
      if (loanPayoutAccno == '') {
        this.$xutils.showMsgBox('提示', '贷款发放账号不可为空！'); // 弹出提示
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              this.d1_BillCard.setItemValue('loanPayoutAccName', data.zhhuzwmc);
            } else {
              this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            if (message == null) {
              this.$message({message: '未查询到相关数据', type: 'warning'});
            } else {
              this.$message({message: message, type: 'warning'});
            }
          }
        } else {
          this.$message({message: message, type: 'warning'});
        }
      });


      // this.$xutils.request({
      //   // 同步请求
      //   async: true,
      //   url: this.$backend.cmisBiz + '/api/ctrloancont/opanorgname',
      //   data: this.d1_BillCard.formdata,
      //   success: (response, status, xhr) => {
      //     if (response.data == null) {
      //       this.$xutils.showMsgBox('提示', '账号不存在，获取名称失败'); // 弹出提示
      //       return;
      //     }
      //     this.d1_BillCard.setItemValue('loanPayoutAccName', response.data.zhhuzwmc);
      //   },
      //   error: (result, b) => {
      //     this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },
    /** 更新申请数据
     */
    updateData () {
      var _this = this;
      var returnData = {};
      debugger;
      let data = _this.d1_BillCard.formdata;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/updatexw',
        data: data,
        callback: function (code, message, response) {
          yufp.clone(response, returnData);
        }
      });
      return returnData;
    },
    /** 查询还款日
     */
    selectRepayDay (iqpSerno) {
      var returnData = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/repaydayrecordinfo/selectrepayday',
        data: {iqpSerno: iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            returnData = response.data;
          }
        }
      });
      return returnData;
    }
  }
};
</script>
