/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 信用卡核销申请修改
 */
<template>
  <div>
            <yu-tabs v-model="applyActiveName"  @tab-click="handleClick">
              <yu-tab-pane label="信用卡核销申请信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" :disabled="true">
                  <yu-panel title="核销基本信息" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item ctype="input" name="pcwaSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" maxlength="200" name="totalWriteoffCus"  label="总账户数" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="overdraftAmt"  label="透支余额" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalInt"  label="利息合计" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalCostAmt"  label="费用合计" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="writeoffCap"  label="逾期本金总金额" number-formatter="0,000.00"   :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="writeoffInt"  label="核销利息" number-formatter="0,000.00"   :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="writeoffCost"  label="核销费用" number-formatter="0,000.00"  :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="select" name="isReservaProsecute"  label="是否保留追诉权" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="cardholderBaseCase"  label="持卡人基本情况" row="2"  colspan="24"
                          placeholder="2000个字符以内" :rules="rules.cardholderBaseCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="cardholderDoubtfulCase"  label="信用卡发放情况" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.cardholderDoubtfulCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="certInventory"  label="信用卡债权追索情况" row="2"  colspan="24"
                          placeholder="2000个字符以内" :rules="rules.certInventory"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="becomeBadResn"  label="呆账形成原因" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.becomeBadResn"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="dutyResn"  label="责任认定情况" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.dutyResn"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="writeoffReason"  label="申请核销理由" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.writeoffResn"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.memo"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="登记信息" panel-type="simple">
                    <yu-xform-group :column="2">
                        <yu-xform-item ctype="input" name="inputIdName" label="登记人" :disabled="true" hidden></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputId" label="登记人" :disabled="true" ></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputBrIdName" label="登记机构"  :disabled="true" hidden></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputBrId" label="登记机构"  :disabled="true" ></yu-xform-item>
                        <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true" ></yu-xform-item>
                      </yu-xform-group>
                  </yu-panel>
                  <div class="yu-grpButton">
                    <yu-button type="primary" @click="cancelFn">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-tab-pane>
              <yu-tab-pane label="信用卡核销明细" name="creditBill">
                      <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" :base-params="baseParams" request-type="POST">
                        <yu-xtable-column label="账户编号" prop="accno" width="180">
                          <template slot-scope="scope">
                            <a class="underline" @click="detailDebtFn(scope.row)">{{ scope.row.accno }}</a>
                          </template>
                        </yu-xtable-column>
                        <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
                        <yu-xtable-column label="身份证号码" prop="certCode" width="200" ></yu-xtable-column>
                        <yu-xtable-column label="信用卡卡号" prop="cardNo" width="200" ></yu-xtable-column>
                        <yu-xtable-column label="授信额度" prop="lmtAmt" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column label="账龄" prop="overdueDay" width="150" ></yu-xtable-column>
                        <yu-xtable-column label="逾期本金金额" prop="writeoffCap" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column label="核销利息" prop="writeoffInt" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column label="核销费用" prop="writeoffCost" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column label="核销总金额" prop="totalWriteoffAmt" width="150" :formatter="Currency"></yu-xtable-column>
                      </yu-xtable>
              </yu-tab-pane>

              <yu-tab-pane label="影像资料" name="imageData">
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
              </yu-tab-pane>
              <yu-tab-pane label="核销申请审批表" name="applyReport">
                 <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
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
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import fineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
yufp.lookup.reg('STD_ZB_YES_NO,STD_WRITEOFF_TYPE,STD_BCM_MODE,STD_DATABOOK_TYPE,STD_WRITEOFF_ASSET_TYPE,STD_ZB_GUAR_WAY');
export default {
  props: {
    bizPageData: Object
  },
  mixins: [mixin],
  components: { imageSystem, yufpNwfInit, YufpExcelExport, YufpExcelImport, AdjustmentJudgeHis, fineReport },
  data: function () {
    return {
      fineReportParam: {},
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.josnData.pcwaSerno
          }
        }
      ],
      image: '2',
      viewType: '',
      dialogVisible: false,
      ifShow: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseParams: null,
      pbdwabSerno: null,
      bizDataParams: {pwbrSerno: null},
      applyBussDataUrl: this.$backend.cmisNpam + '/api/placardinforel/queryPlaCardInfoRelList',
      excelImportUrl: this.$backend.cmisNpam + '/api/placardinforel/importplanDetail',
      exportTemplateUrl: backend.cmisNpam + '/api/placardinforel/exportplanDetail',
      formdata: null,
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
      rules: {
        cardholderBaseCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        cardholderDoubtfulCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        certInventory: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        becomeBadResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        dutyResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
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
        serno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.josnData.pcwaSerno
      };
      return params;
    }
  },
  created () {
    if (this.bizPageData) {
      var _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12
          let item = dutysList[i];
          if (item.code === 'TZB06') {
            _this.image = '1';
          }
        }
      }
      this.pcwaSerno = this.bizPageData.instanceInfo.bizId;
    } else {
      this.pcwaSerno = this.$route.meta.params.josnData.pcwaSerno;
    }
    this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppSigHXRp.cpt',
          'index': '&pcwaSerno=' + this.pcwaSerno
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
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisNpam + '/api/placardwriteoffapp/queryPlaCardWriteoffAppInfo',
          data: {'pcwaSerno': _this.bizPageData.instanceInfo.bizId},
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$nextTick(function () {
                yufp.clone(response.data, _this.applyBaseData);
                _this.baseParams = {condition: JSON.stringify({ pcwaSerno: _this.applyBaseData.pcwaSerno}) };
                _this.bizDataParams = {pcwaSerno: _this.applyBaseData.pcwaSerno};
              });
            }
          }
        });
      } else {
        yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
        _this.baseParams = {condition: JSON.stringify({ pcwaSerno: _this.applyBaseData.pcwaSerno}) };
        _this.bizDataParams = {pcwaSerno: _this.applyBaseData.pcwaSerno};
      }
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    handleClick (tab, event) {
      var _this = this;
      if (tab.name === 'creditBill') {
        const model = {pcwaSerno: this.bizPageData != undefined ? _this.bizPageData.instanceInfo.bizId : _this.applyBaseData.pcwaSerno};
        const params = { condition: JSON.stringify(model) };
        _this.$refs.applyBussTable.remoteData(params);
      }
    },
    /** 查看借据 */
    detailDebtFn (row) {
      let _this = this;
      _this.$dialog.open(
        '借据详情',
        'xwmanage/lmtmanage/indgtLMT/zxdmanage/zxdPage4CardIndex',
        -1,
        -1,
        row,
        () => {}
      );
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.applyBussTable.remoteData();
    }
  }
};
</script>
