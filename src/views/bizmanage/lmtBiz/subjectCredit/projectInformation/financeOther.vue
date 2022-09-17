<template>
  <yu-xform ref="refForm" label-width="240px" v-model="formdata" related-table-name="refTable" :rules="rules">
    <yu-panel title="基本信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
        <yu-xform-item label="项目编号" placeholder="项目编号" name="proNo" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="申请部门" placeholder="申请部门" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="业务类型" placeholder="业务类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" disabled></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="1">
        <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input" maxlength="200" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2">
        <yu-xform-item label="是否有担保/增信" placeholder="是否有担保/增信" name="isExistGuarCreditect" ctype="select" data-code="STD_ZB_YES_NO" @change="onExistGuarCreditectChange" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="交易市场" placeholder="交易市场" name="transMarket" ctype="select" data-code="STD_ZB_TRANS_MARKET" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="项目投资期限（年）" placeholder="项目投资期限（年）" name="proInvestTerm" ctype="input" maxlength="20" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="债项评级" placeholder="债项评级" name="debtEvalResult" ctype="select" @change="changeDebtEvalResult" data-code="STD_ZB_DEBT_EVAL_RESULT" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="资产编号" placeholder="资产编号" name="assetNo" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="评级机构" placeholder="评级机构" name="debtEvalOrgName" ctype="select" data-code="STD_DEBT_EVAL_ORG" maxlength="80" :disabled="debtShow"></yu-xform-item>
        <yu-xform-item label="拟发行规模（万元）" number-formatter="0,000" ctype="yu-num" name="intendActualIssuedScale" placeholder="拟发行规模（万元）" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="债项评级日期" placeholder="债项评级日期" name="debtEvalDate" ctype="datepicker" :disabled="debtShow"></yu-xform-item>
        <yu-xform-item label="发行币种" v-if="false" placeholder="发行币种" name="issuedCurType" ctype="select" maxlength="5" data-code="STD_ZB_CUR_TYP" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="1">
        <yu-xform-item label="募集资金用途" placeholder="募集资金用途" name="raiseAmtPurp" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item ctype="custom" class="upload_img" colspan="15">
          <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
        </yu-xform-item>
        <yu-xform-item label="项目介绍/交易结构" placeholder="项目介绍/交易结构" name="tranStr" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
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
        <yu-xform-item :label="lmtAmtLabel" placeholder="填写金额" name="lmtAmt" ctype="yu-num" number-formatter="0,000"  @blur="getLargeLmtInfo" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="审批权限" placeholder="审批权限" name="apprMode" ctype="select" data-code="STD_APPR_MODE" disabled></yu-xform-item>
        <yu-xform-item v-show="!underWriting" label="利率（%）" placeholder="利率（%）" name="rate" ctype="yu-num" sign="%" @blur="getLargeLmtInfo" :multiple="100" maxlength="16" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item v-show="!underWriting" label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO"  disabled></yu-xform-item>
        <yu-xform-item label="币种" placeholder="币种" name="curType" ctype="select" filterable data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
        <yu-xform-item v-show="!underWriting" label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
        <yu-xform-item label="是否循环" placeholder="是否循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow"></yu-xform-item>
        <yu-xform-item label="授信期限（月）" placeholder="授信期限（月）" name="lmtTerm" ctype="yu-num" precision="0" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <yu-panel title="登记信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button v-show="saveBtnShow" type="primary" @click="doSubmit">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-xform>
</template>
<script>
yufp.lookup.reg(
  'STD_SX_LMT_TYPE,STD_ZB_PRD_BIZ_TYPE,STD_ZX_CUR_TYPE,STD_ZB_DEBT_INNER_LEVEL,STD_ZB_TRANS_MARKET,STD_ZB_YES_NO,' +
    'STD_ZB_CUR_TYP,STD_ZB_DEBT_EVAL_RESULT,STD_ZB_LARGE_MAIN_MANAGER_TYPE,STD_ZB_BASIC_ASSET_NORMAL_TYPE,STD_ZB_NORM_INVEST_TYPE,STD_DEBT_EVAL_ORG'
);
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import TradeRecordHisVue from '../../../../zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/TradeRecordHis.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {getBizType, commonMethods} from '../../util/BizInvestCommonUtil.js';
import {numDM, getFile, upImage, DeleteImage, projectInformation} from "@/utils/unitchange";
export default {
  mixins: [commonMethods, projectInformation],
  components: { YuSingleUpload, yufpNwfInit },
  props: {
    children: Object
  },
  data () {
    return {
      guarDescExt: String,
      formdata: {},
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
        lmtTerm: [
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
        isExistGuarCreditect: [
          { required: true, message: '请选择担保增信情况', trigger: 'blur' }
        ],
        intendActualIssuedScale: [
          { required: false, message: '请输入拟/实际发行规模', trigger: 'blur' }
        ]
      },
      appType: '',
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl: backend.cmisBiz + '/api/lmtsiginvestapp/updatePicAbsoultPath',
      show_basic: true,
      debtShow: true,
      underWriting: false,
      lmtAmtLabel:""
    };
  },
  created () {
    if(this.children.op == 'EDIT'){
      //全部
      this.saveBtnShow = true;

      // 评级机构、债项评级日期
      this.debtShow = false;
    }else{
      this.saveBtnShow = false;
      this.debtShow = true;
    }
    this.getDetails(this.children.serno);
  },
  mounted () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
  },
  // watch: {
  // },
  methods: {
    // 债项评级
    changeDebtEvalResult (val) {
      if(this.saveBtnShow){
        if (val == '017' || val == '') {
          // 置灰 清空 不可修改
          this.rules.debtEvalOrgName[0].required = false;
          this.rules.debtEvalDate[0].required = false;
          this.formdata.debtEvalOrgName = '';
          this.formdata.debtEvalDate = '';
          this.debtShow = true;
        } else {
          this.rules.debtEvalOrgName[0].required = true;
          this.rules.debtEvalDate[0].required = true;
          !this.saveBtnShow ? this.debtShow = true : this.debtShow = false;
        }
      }
    },
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
          let obj = Object.assign(res, res1);
          // 业务类型是承销 展示的信息
          if(obj.lmtBizType == '16010101' || obj.lmtBizType == '16020101'){
            _this.underWriting = true;
            _this.rules.rate[0].required = false;
            _this.lmtAmtLabel = '承销金额（万元）';
          }else{
            _this.lmtAmtLabel = '授信金额（万元）';
          }

          // 获取图片信息
          getFile(obj.tranStrPicturePath, 'yu-icon-img').then((res) => {
            _this.fileListInfo = res;
          });

          _this.appType = obj.appType;
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
        });
      });
    },
    uploadedFn1 (fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "tranStrPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.tranStrPicturePath = res.path;
      });
    },
    deleteFileFn1 (file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "tranStrPicturePath", this.updateurl)
      this.formdata.tranStrPicturePath = "";
    },
  }
};
</script>
