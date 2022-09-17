<template>
<div>
  <yu-tabs type="card" v-model="tabName">
    <yu-tab-pane label="基本信息" name="first">
      <d1-billcard ref="d1_BillCard"></d1-billcard>
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
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="sec">
      <imageSystem authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
  </yu-tabs>
</div>
</template>
<script>
yufp.lookup.reg('STD_LIMIT_TYPE');
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import d1Billcard from './iqpLoanInfo_d1_17_BillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
// import d117Billcard from './iqpLoanInfo_d1_BillCard.vue'
export default {
  components: {d1Billcard, yufpNwfRisk, imageSystem},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      activeName: 'first',
      d1_BillCard: null,
      // d1_17_BillCard: null,
      isView: false,
      visiable: false,
      dialogData: {},
      imageBizParam: [
        {
          'top_outsystem_code': 'GRXFDKSX;GRXFDKCZDY06',
          'index': {
            'businessid': this.bizPageData.instanceInfo.bizId
          }
        }
      ]
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 贷款申请基本信息*/
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
        this.isView = true;
      this.iqpSerno = this.bizPageData.instanceInfo.bizId;;
      
      // 初始化填充页面数据
      yufp.clone(this.queryData(this.iqpSerno), this.d1_BillCard.formdata);
      this.d1_BillCard.addEditChangeAction(this.onChange);
      const signMode = this.d1_BillCard.getItemValue('signMode');
      if (signMode == null || signMode == '') {
        this.d1_BillCard.signModeType = true;
      }
      const repayDate = this.d1_BillCard.getItemValue('repayDate');
      // 获取还款日
      if (repayDate == null || repayDate == '') {
        this.d1_BillCard.formdata.repayDate = this.selectRepayDay(this.iqpSerno);
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
      if (contType == '1' && this.d1_BillCard.formdata.payMode == null) {
        this.d1_BillCard.disabledFlg = false;
      }
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 2021年9月3日16:41:51 hubp 新增贷款投向控制  08为经营性  09为消费型
      // 经营性贷款，贷款投向必填    消费性贷款，贷款投向置灰，不允许选择，默认为空
      if (this.getPrdType(this.iqpSerno) == '08') {
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
          this.d1_BillCard.formdata.contTerm = month;
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
    },
    /** 更新申请数据
     */
    updateData () {
      var _this = this;
      var returnData = {};
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