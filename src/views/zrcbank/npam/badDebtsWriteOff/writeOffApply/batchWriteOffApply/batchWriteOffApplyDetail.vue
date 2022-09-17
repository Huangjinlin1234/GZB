/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  wangYouhong
 * @description 单客户呆账核销申请详情
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName" @tab-click="handleClick">
              <yu-tab-pane label="核销基本信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" :disabled="true">
                  <yu-panel title="批量呆账核销业务列表" panel-type="simple" >
                  <div class="yu-toolBar">
                      <yu-button-group>
                        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="excel导出" :export-param="{condition:JSON.stringify({serno: searchFormdata})}"></yufp-excel-export>
                      </yu-button-group>
                      </div>
                      <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" :base-params="baseParams" request-type="POST">
                        <yu-xtable-column label="合同编号" prop="contNo" width="180">
                          <template slot-scope="scope">
                            <a class="underline" @click="detailDebtFn(scope.row)">{{ scope.row.contNo }}</a>
                          </template>
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
                        <yu-xtable-column label="责任人" prop="managerId" width="150"></yu-xtable-column>
                        <yu-xtable-column label="责任机构" prop="managerBrId" width="150"></yu-xtable-column>
                      </yu-xtable>
                  </yu-panel>
                  <yu-panel title="批量呆账核销申请信息" panel-type="simple" >
                      <yu-xform-group :column="2">
                        <yu-xform-item ctype="input" name="pbdwabSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="input" maxlength="200" name="totalWriteoffCus"  label="核销客户数" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="num" name="totalWriteoffNum"  label="核销总笔数"  rules="required" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="select" name="writeoffType"  label="核销类型"  data-code="STD_WRITEOFF_TYPE" rules="required"></yu-xform-item>
                        <yu-xform-item ctype="select" name="isReservaProsecute"  label="是否保留追诉权" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                        <yu-xform-item ctype="select" name="lawCase"  label="诉讼情况"  data-code="STD_LAW_CASE_MEMO"></yu-xform-item>
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
                  <yu-panel title="登记信息" panel-type="simple">
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
              <yu-tab-pane label="核销申报审批表" name="applyReport" v-if="showReport">
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
// import AdjustmentJudgeHis from './tabs/AdjustmentJudgeHis';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import imageSystem from '@/views/imageManage/imageSystem';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
yufp.lookup.reg('STD_ZB_YES_NO,PUBLISH_STATUS,STD_WRITEOFF_TYPE,STD_LAW_CASE_MEMO');
export default {
  mixins: [mixin],
  components: { imageSystem, AdjustmentJudgeHis, FineReport, YufpExcelImport, YufpExcelExport},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      showReport: true,
      fineReportParam: {},
      searchFormdata: '',
      viewType: '',
      pbdwasSerno: '',
      pbdwabSerno: '',
      image: '1',
      dialogVisible: false,
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryplabaddebtwriteoffbill',
      excelExportUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/exportPlaBadDebtWriteoffBillRel',
      ifShow: false,
      baseParams: {condition: JSON.stringify({ serno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.josnData.pbdwabSerno}) },
      applyBaseData: null,
      formdata: null,
      activeName: 'writeOffApply',
      // collapseTitle: ['收起', '展开'],
      applyActiveName: 'applyBase',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.josnData.pbdwabSerno
          }
        }
      ],
      rules: {
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
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.josnData.pbdwabSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    },
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    this.image = '2';
    var _this = this;

    const loginUser = _this.$xutils.getLoginUserInfo();
    const dutysList = loginUser.dutys; // 岗位
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      _this.pbdwabSerno = _this.bizPageData.instanceInfo.bizId;
      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改
          let item = dutysList[i];
          if (item.code === 'TZB06') { // 特资部核销初审岗
            this.image = '1';
          }
          if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
            _this.showReport = false;
          }
        }
      }
    } else {
      if (dutysList) {
        dutysList.forEach(item => {
          if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
            _this.showReport = false;
          }
        });
      };
      _this.pbdwabSerno = _this.$route.meta.params.josnData.pbdwabSerno;
      yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
      _this.searchFormdata = _this.pbdwabSerno;
    }
    _this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppBatchRp.cpt',
          'index': '&pbdwabSerno=' + _this.pbdwabSerno
        };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        _this.pbdwabSerno = _this.bizPageData.instanceInfo.bizId;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisNpam + '/api/plabaddebtwriteoffappbatch/queryPlaBadDebtWriteoffAppBatchInfo',
          data: {'pbdwabSerno': _this.bizPageData.instanceInfo.bizId},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.applyBaseData);
            }
          }
        });
      } else {
        _this.pbdwabSerno = _this.$route.meta.params.josnData.pbdwabSerno;
        yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
      }

      _this.fineReportParam =
        {
          'top_outsystem_code': 'dzhx-rp01.cpt',
          'index': '&pbdwasSerno=' + _this.pbdwabSerno
        };
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    handleClick (tab, event) {
      var _this = this;
      if (tab.name === 'applyBussList') {
        // const model = {pbdwasSerno: this.bizPageData != undefined ? _this.bizPageData.instanceInfo.bizId : _this.$route.meta.params.josnData.pbdwasSerno};
        // const params = { condition: JSON.stringify(model) };
        // _this.$refs.applyBussTable.remoteData(params);
      } else if (tab.name === 'applyReport') {

      } else if (tab.name === 'imageData') {
        _this.$refs.imageSystemRef.getImageSrc();
      } else if (tab.name === 'approveHist') {

      }
    },
    /**
     *保存
     */
    saveApplyFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.applyBaseData, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisNpam + '';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisible = false;
          }
        }
      });
    },
    /** 查看借据 */
    detailDebtFn () {
      let _this = this;
      if (_this.$refs.applyBussTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var selectData = _this.$refs.applyBussTable.selections[0];
      var billNo = selectData.billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          viewType: 'DETAIL'
        }
      });
    }
  }
};
</script>
