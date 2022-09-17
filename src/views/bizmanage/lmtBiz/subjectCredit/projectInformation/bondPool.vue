<template>
  <yu-xform ref="refForm" label-width="240px" v-model="formdata" related-table-name="refTable" :rules="rules">
    <yu-panel title="基本信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
        <yu-xform-item label="项目编号" placeholder="项目编号" name="proNo" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="申请部门" placeholder="申请部门" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="企业名称" placeholder="企业名称" name="cusName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="业务类型" placeholder="业务类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" disabled></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="1">
        <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2">
        <!-- <yu-xform-item label="资产编号" placeholder="资产编号" name="assetNo" ctype="input" maxlength="40" :disabled="!saveBtnShow"></yu-xform-item> -->
        <!-- 债项内部分档（主体内部分档） -->
        <yu-xform-item label="主体内部分档" placeholder="主体内部分档" name="debtInnerLevel" ctype="select" data-code="STD_ZB_DEBT_INNER_LEVEL" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <div :hidden="appType=='01'">
      <yu-panel title="原授信批复信息" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="原授信批复编号" placeholder="原授信批复编号" name="origiLmtReplySerno" ctype="input" @click="goApply" @click.stop icon="search" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="原授信期限（月）" placeholder="原授信期限（月）" name="origiLmtTerm" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="利率" placeholder="利率" name="origiRate" ctype="yu-num" sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="原授信额度（万元）" placeholder="原授信额度（万元）" name="origiLmtAmt" ctype="yu-num" number-formatter="0,000" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </div>
    <yu-panel title="授信方案" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="授信金额（万元）" placeholder="授信金额（万元）" name="lmtAmt" ctype="yu-num" number-formatter="0,000" @blur="getLargeLmtInfo" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="审批权限" placeholder="审批权限" name="apprMode" ctype="select" data-code="STD_APPR_MODE" disabled></yu-xform-item>
        <yu-xform-item label="最高投资剩余期限（年）" placeholder="最高投资剩余期限（年）" name="highLmtInvestSurplusTerm" ctype="input" maxLength="200" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
        <yu-xform-item label="授信币种" placeholder="授信币种" name="curType" ctype="select" filterable data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
        <yu-xform-item label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
       </yu-xform-group>
      <yu-xform-group :column="2">
        <yu-xform-item label="是否循环" placeholder="是否循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="授信期限（月）" placeholder="授信期限（月）" name="lmtTerm" ctype="yu-num" precision="0" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2" v-if="false">
        <!-- <yu-xform-item label="最高授信投资剩余期限（月）" placeholder="最高授信投资剩余期限（月）" name="highLmtInvestSurplusTerm" ctype="yu-num" precision="0" :disabled="!saveBtnShow"></yu-xform-item> -->
        <yu-xform-item label="自营金额（万元）" placeholder="自营金额（万元）" name="sobsAmt" ctype="yu-num" number-formatter="0,000" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="资管金额（万元）" placeholder="资管金额（万元）" name="assetManaAmt" ctype="yu-num" number-formatter="0,000" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
      <!-- <yu-xform-group :column="2">
        <yu-xform-item label="大额主责任人" placeholder="大额主责任人" name="largeLmtMainManager" ctype="select" data-code="STD_ZB_LARGE_MAIN_MANAGER_TYPE" @change="changeManager" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item v-if="show_basic" label="底层资产标准值" placeholder="底层资产标准值" name="basicAssetNormal" ctype="select" data-code="STD_ZB_BASIC_ASSET_NORMAL_TYPE" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group> -->
    </yu-panel>
    <yu-panel title="登记信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
    <div class="yu-grpButton" style="padding-bottom: 40px">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button v-show="saveBtnShow" type="primary" @click="doSubmit">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-xform>
</template>
<script>
yufp.lookup.reg(
  'STD_SX_LMT_TYPE,STD_ZB_PRD_BIZ_TYPE,STD_ZX_CUR_TYPE,STD_ZB_DEBT_INNER_LEVEL,STD_ZB_TRANS_MARKET,STD_ZB_YES_NO,' +
    'STD_ZB_CUR_TYP,STD_ZB_DEBT_EVAL_RESULT,STD_ZB_LARGE_MAIN_MANAGER_TYPE,STD_ZB_BASIC_ASSET_NORMAL_TYPE,STD_ZB_NORM_INVEST_TYPE,STD_APPR_MODE'
);
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {getBizType, commonMethods} from '../../util/BizInvestCommonUtil.js';
import {numDM, projectInformation} from "@/utils/unitchange";
export default {
  mixins: [commonMethods, projectInformation],
  components: { yufpNwfInit },
  props: {
    children: Object
  },
  data () {
    return {
      guarDescExt: String,
      formdata: {
        basicAssetNormal: ''
      },
      rules: {
        basicAssetNormal: [
          { required: true, message: '请选择底层资产标准值', trigger: 'blur' }
        ],
        lmtBizType: [
          { required: true, message: '请输入产品类型', trigger: 'blur' }
        ],
        proNo: [{ required: true, message: '请输入项目编号', trigger: 'blur' }],
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        intendActualIssuedTime: [
          { required: true, message: '请选择拟/实际发行时间', trigger: 'blur' }
        ],
        proInvestTerm: [
          {
            required: true,
            message: '请输入项目投资期限（年）',
            trigger: 'blur'
          }
        ],
        issuedCurType: [
          { required: true, message: '请选择发行币种', trigger: 'blur' }
        ],
        transMarket: [
          { required: true, message: '请选择交易市场', trigger: 'blur' }
        ],
        tranStr: [
          { required: true, message: '请输入交易结构', trigger: 'blur' }
        ],
        investType: [
          { required: true, message: '请选择投资类型', trigger: 'blur' }
        ],
        isRevolv: [
          { required: true, message: '请选择是否循环', trigger: 'blur' }
        ],
        curType: [{ required: true, message: '请选择币种', trigger: 'blur' }],
        rate: [{ required: true, message: '请输入利率', trigger: 'blur' }],
        highLmtInvestSurplusTerm: [
          { required: true, message: '请输入授信期限', trigger: 'blur' }
        ],
        lmtAmt: [
          { required: true, message: '请输入拟投资金额', trigger: 'blur' }
        ],
        debtEvalDate: [
          { required: true, message: '请选择债项评级日期', trigger: 'blur' }
        ],
        debtEvalResult: [
          { required: true, message: '请选择债项评级结果', trigger: 'blur' }
        ],
        debtEvalOrgName: [
          { required: true, message: '请输入评级机构', trigger: 'blur' }
        ],
        intendActualIssuedScale: [
          { required: true, message: '请输入拟/实际发行规模', trigger: 'blur' }
        ]
      },
      appType: '',
      show_basic: true,
    };
  },
  created () {
    this.children.op == 'EDIT'
      ? this.saveBtnShow = true
      : this.saveBtnShow = false;
    this.getDetails(this.children.serno);
  },
  methods: {
    computedData (type, num1, num2) {
      var _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/lmtsiginvestapp/calculate',
            data: {
              type: type,
              num1: num1,
              num2: num2
            }
          })
          .then((data) => {
            if (data.code == '0') {
              resolve(data.data);
            } else {
              this.$message({ message: '请求失败', type: 'error' });
            }
          });
      });
    },
    // 获取数据
    getDetails (serno) {
      var _this = this;
      function requestData (url) {
        return new Promise((resolve, reject) => {
          _this
            .$request({
              method: 'POST',
              url: backend.cmisBiz + url,
              data: {
                serno: serno
              }
            })
            .then((data) => {
              if (data.code == '0') {
                resolve(data.data);
              } else {
                this.$message({ message: '请求失败', type: 'error' });
              }
            });
        });
      }
      requestData('/api/lmtsiginvestapp/selectBySerno').then((res) => {
        requestData('/api/lmtsiginvestsubapp/selectBySerno').then((res1) => {
          if (res && res1) {
            let obj = Object.assign(res, res1);
            this.appType = obj.appType;
            // 返回给父级数据
            if (obj.guarDescExt) {
              _this.$emit('changed', obj.guarDescExt);
            }
            obj = numDM(obj, "D");
            
            yufp.clone(obj, _this.formdata);
            let curType = {
              curType: 'CNY'
            };
            yufp.clone(curType, _this.formdata);
          }
        });
      });
    },
    
  }
};
</script>
