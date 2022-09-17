/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  wangyouhong
 * @description 单客户呆账核销申请详情
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName" @tab-click="handleClick">
     <yu-tab-pane label="核销基本信息" name="applyBase">
       <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" :disabled="true">
         <yu-panel title="单户核销申请信息" panel-type="simple" >
           <yu-xform-group :column="2">
             <yu-xform-item ctype="input" name="pbdwasSerno"  label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="input" name="cusId" label="客户号" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="input" maxlength="200" name="cusName" label="客户名称" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffNum"  label="核销总笔数" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="select" name="writeoffType"  label="核销类型"  data-code="STD_WRITEOFF_TYPE" rules="required"></yu-xform-item>
             <yu-xform-item ctype="select" name="isReservaProsecute"  label="是否保留追诉权" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
             <yu-xform-item ctype="select" name="lawCase"  label="诉讼情况"  data-code="STD_LAW_CASE_MEMO"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="debitBaseCase"  label="借款人（被投资企业）基本情况和现状" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.debitBaseCase"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="bankLoanPayoutCase"  label="我行贷款(或债权、股权、投资、拆出资金等)发放（生）情况" row="2"  colspan="24"
                 placeholder="2000个字符以内" :rules="rules.bankLoanPayoutCase"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="becomeBadResn"  label="形成不良原因" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.becomeBadResn"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="loanRgtAssetCase"  label="贷款(或债权、股权、投资、拆出资金等)追索及企业财产清理情况" row="2"  colspan="24"
                 placeholder="2000个字符以内" :rules="rules.loanRgtAssetCase"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="doubtfulCase"  label="呆账责任认定和追究情况" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.doubtfulCase"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="writeoffResn"  label="核销理由和结论意见" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.writeoffResn"></yu-xform-item>
             <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.memo"></yu-xform-item>
           </yu-xform-group>
         </yu-panel>
         <yu-panel title="登记信息" panel-type="simple" >
           <yu-xform-group :column="2">
               <yu-xform-item ctype="input" name="inputIdName" label="登记人" :disabled="true" ></yu-xform-item>
               <yu-xform-item ctype="input" name="inputBrIdName" label="登记机构"  :disabled="true" ></yu-xform-item>
               <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
             </yu-xform-group>
         </yu-panel>

         <div class="yu-grpButton">
           <yu-button  type="primary" @click="cancelFn">返回</yu-button>
         </div>
       </yu-xform>
     </yu-tab-pane>
     <yu-tab-pane label="核销业务清单" name="applyBussList">
       <div class="yu-toolBar">
         <yu-button-group>
           <yu-button type="primary" @click="detailDebtSelectFn">借据台账查看</yu-button>
         </yu-button-group>
       </div>
       <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" request-type="POST" :base-params="baseBussParams">
         <yu-xtable-column label="合同编号" prop="contNo" width="180">
         </yu-xtable-column>
         <yu-xtable-column label="借据编号" prop="billNo" width="200" ></yu-xtable-column>
         <yu-xtable-column label="客户号" prop="cusId" width="200" ></yu-xtable-column>
         <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
         <yu-xtable-column label="产品名称" prop="prdName" width="200" ></yu-xtable-column>
         <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
         <yu-xtable-column label="贷款金额" prop="loanAmt" width="150" :formatter="Currency"></yu-xtable-column>
         <yu-xtable-column label="贷款余额" prop="loanBalance" width="150" :formatter="Currency"></yu-xtable-column>
         <yu-xtable-column label="拖欠利息总额" prop="totalTqlxAmt" width="150" :formatter="Currency"></yu-xtable-column>
         <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="150"></yu-xtable-column>
         <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="150"></yu-xtable-column>
         <yu-xtable-column label="执行年利率" prop="execRateYear" width="150"></yu-xtable-column>
         <yu-xtable-column label="五级分类" prop="fiveClass" width="150" data-code="STD_FIVE_CLASS"></yu-xtable-column>
         <yu-xtable-column label="责任人" prop="managerIdName" width="150"></yu-xtable-column>
         <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
       </yu-xtable>
     </yu-tab-pane>
     <yu-tab-pane label="核销申请审批表" name="applyReport" v-if="showReport">
        <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
     </yu-tab-pane>
     <yu-tab-pane label="影像资料" name="imageData">
       <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
     </yu-tab-pane>
     <yu-tab-pane label="审批历史信息" name="approveHist">
       <adjustment-judge-his :judge-his-params="childParams"></adjustment-judge-his>
     </yu-tab-pane>
   </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
import fineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_YES_NO,PUBLISH_STATUS,STD_WRITEOFF_TYPE,STD_LAW_CASE_MEMO');
export default {
  mixins: [mixin],
  props: {
    bizPageData: Object
  },
  components: {
    imageSystem, AdjustmentJudgeHis, fineReport
  },
  data: function () {
    return {
      showReport: true,
      viewType: '',
      pbdwasSerno: '',
      josnData: {},
      dialogVisible: false,
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryPlabaddebtwriteOffBillByContNo',
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      // baseBussParams: {condition: JSON.stringify({ serno: this.bizPageData == undefined ? this.$route.meta.params.josnData.pbdwasSerno : this.bizPageData.instanceInfo.bizId, cusId: this.bizPageData == undefined ? this.$route.meta.params.josnData.cusId : this.bizPageData.instanceInfo.cusId}) },
      baseBussParams: {},
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
      fineReportParam: {},
      imageBizParam: [],
      image: '1',
      rules: {
        debitBaseCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        bankLoanPayoutCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        becomeBadResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        loanRgtAssetCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        doubtfulCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        writeoffResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        memo: [{ max: 2000, message: '备注不超过2000个字符' }
        ]
      }
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.josnData.pbdwasSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  created () {
    this.afterInit();
  },

  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      const loginUser = this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        _this.pbdwasSerno = _this.bizPageData.instanceInfo.bizId;
        _this.josnData.pbdwasSerno = _this.pbdwasSerno;
        _this.image = '2';
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12
            let item = dutysList[i];
            if (item.code == 'TZB06') { // 特资部核销初审岗
              _this.image = '1';
            }
            if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
              _this.showReport = false
            }
          };
        }
      } else {
         dutysList.forEach(item => {
          if(item) {
            if(item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
              _this.showReport = false
            }
          }
        })
        _this.josnData = _this.$route.meta.params.josnData;
        _this.pbdwasSerno = _this.josnData.pbdwasSerno;
        _this.image = '2';
      }
      _this.baseBussParams = {condition: JSON.stringify({ serno: _this.pbdwasSerno}) };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabaddebtwriteoffappsig/queryPlaBadDebtWriteoffAppSigInfo',
        data: _this.josnData,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.clone(response.data, _this.applyBaseData);
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
      _this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppSigRp.cpt',
          'index': '&pbdwasSerno=' + _this.pbdwasSerno
        };
      _this.imageBizParam = [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : _this.$route.meta.params.josnData.pbdwasSerno
          }
        }
      ];
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    handleClick (tab, event) {
      if (tab.name == 'imageData') {
        this.$refs.imageSystemRef.getImageSrc();
      }
      // var _this = this;
      // if (tab.name === 'applyBussList') {
      //   if (_this.bizPageData != null || _this.bizPageData != undefined) {
      //     const model = {pbdwasSerno: _this.bizPageData.instanceInfo.bizId};
      //     const params = { condition: JSON.stringify(model) };
      //     _this.$refs.applyBussTable.remoteData(params);
      //   } else {
      //     const model = {pbdwasSerno: _this.$route.meta.params.josnData.pbdwasSerno};
      //     const params = { condition: JSON.stringify(model) };
      //     _this.$refs.applyBussTable.remoteData(params);
      //   }
      // } else if (tab.name === 'applyReport') {

      // } else if (tab.name === 'imageData') {

      // } else if (tab.name === 'approveHist') {

      // }
    },

    /** 查看借据 */
    detailDebtSelectFn () {
      let _this = this;
      // eslint-disable-next-line no-irregular-whitespace
      if (_this.$refs.applyBussTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var selectData = _this.$refs.applyBussTable.selections[0];
      var billNo = selectData.billNo;
      var curType = selectData.curType;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          curType: curType,
          viewType: 'DETAIL'
        }
      });
    }
  }
};
</script>
