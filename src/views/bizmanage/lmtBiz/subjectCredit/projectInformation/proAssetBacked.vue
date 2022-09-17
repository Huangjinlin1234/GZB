<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled" :rules="rules">
      <yu-panel title="基本信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="申请部门" placeholder="申请部门" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="项目编号" placeholder="项目编号" name="proNo" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input" maxLength="200" :rules="rule[0]" ></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="业务类型" placeholder="业务类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="交易市场" placeholder="交易市场" name="transMarket" ctype="select" data-code="STD_ZB_TRANS_MARKET" exclude-key="05" :datacode-filter="datacodeFilterFn" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="项目总金额（万元）" placeholder="项目总金额（万元）" name="prdTotalAmt" ctype="yu-num" number-formatter="0,000" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="项目投资期限（年）" placeholder="项目投资期限（年）" name="proInvestTerm" ctype="input" maxLength="20" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="托管机构" placeholder="托管机构" name="capKeepOrg" maxLength="40" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否有担保/增信" name="isExistGuarCreditect" ctype="select" data-code="STD_ZB_YES_NO" @change="onExistGuarCreditectChange" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="是否实现破产隔离（委托人/原始权益人）" name="isSponsorBkrtyIsoln" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="授信产品类型" placeholder="授信产品类型" name="lmtPrd" ctype="select" data-code="STD_ZB_PRO_LMT_TYPE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="发起人是否为管理人" name="isSponsorMana" ctype="select" data-code="STD_ZB_YES_NO" @change="changeManager" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="受托人/管理人客户编号"  placeholder="受托人/管理人客户编号" name="entrustedCusId" ctype="input" @click="goCustomer" @click.stop icon="search" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="管理人客户名称" placeholder="管理人客户名称" name="entrustedCusName" ctype="input" maxLength="80" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="资产编号" placeholder="资产编号" name="assetNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="是否实现破产隔离（受托人/管理人）" name="isManaBkrtyIsoln" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="债项评级" placeholder="债项评级" name="debtEvalResult" ctype="select" data-code="STD_ZB_DEBT_EVAL_RESULT" @change="changeDebtEvalResult"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="债项评级机构" placeholder="债项评级机构" name="debtEvalOrgName" ctype="select" data-code="STD_DEBT_EVAL_ORG" ></yu-xform-item>
          <yu-xform-item label="债项评级日期" placeholder="债项评级日期" name="debtEvalDate" ctype="datepicker" maxLength="20"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="产品各级别投资情况" panel-type="simple">
        <yu-button-drop>
          <yu-button v-show="saveBtnShow" type="primary" @click="addFn">新增</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" @click="modifyFn">修改</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" @click="deleteFn">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
          <yu-xtable-column label="投资级别" prop="investLevel" width="160"></yu-xtable-column>
          <yu-xtable-column label="债项评级" prop="debtGrade" width="140" data-code="STD_ZB_DEBT_EVAL_RESULT"></yu-xtable-column>
          <yu-xtable-column label="本级别募集规模（万元）" prop="curtLevelRaiseScale" width="180">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.curtLevelRaiseScale) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="金额占比" prop="custom" width="120">
            <template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.curtLevelRaiseScale / 100 / formdata.prdTotalAmt).toFixed(2)) + '%' }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="本级别本行拟投资规模（万元）" prop="curtLevelInvestScale" width="220">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.curtLevelInvestScale) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="本行拟投资金额占本级别金额比例" prop="custom" width="240">
            <template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.curtLevelInvestScale * 100 / scope.row.curtLevelRaiseScale).toFixed(2)) + '%' }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="本级别预计年化收益率" prop="curtLevelForeArr" width="180">
            <template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.curtLevelForeArr * 100).toFixed(2)) + '%' }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="还本付息方式" prop="gdpMode" width="120"></yu-xtable-column>
          <yu-xtable-column label="预期到期日" prop="preEndDate" width="120"></yu-xtable-column>
        </yu-xtable>
        <yu-xform-group :column="1">
          <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="项目介绍/交易结构" placeholder="项目介绍/交易结构" name="tranStr" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="授信方案" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="授信金额（万元）" placeholder="授信金额（万元）" name="lmtAmt"  ctype="yu-num" number-formatter="0,000"  @blur="getLargeLmtInfo" :rules="rule[0]" ></yu-xform-item>
          <yu-xform-item label="审批权限" placeholder="审批权限" name="apprMode" ctype="select" data-code="STD_APPR_MODE" disabled></yu-xform-item>
          <yu-xform-item label="利率%" placeholder="利率" name="rate" ctype="yu-num" sign="%" @blur="getLargeLmtInfo" :multiple="100" ></yu-xform-item>
          <yu-xform-item label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="币种" placeholder="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="是否循环" placeholder="是否循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="授信期限（月）" placeholder="授信期限（月）" name="lmtTerm" ctype="yu-num" precision="0" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="大额主责任人" placeholder="大额主责任人" name="largeLmtMainManager" ctype="select" data-code="STD_ZB_LARGE_MAIN_MANAGER_TYPE" @change="changeBigResponsePerson"></yu-xform-item>
          <yu-xform-item v-if="show_basic" label="底层资产标准值" placeholder="底层资产标准值" name="basicAssetNormal" ctype="select" data-code="STD_ZB_BASIC_ASSET_NORMAL_TYPE" :rules="rule[0]"></yu-xform-item>
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
    <!-- 新增弹层 -->
    <yu-xdialog :title="'产品各级别投资情况' + viewTitle[viewType]" :visible.sync="dialogVisible" width="800px" height="400px">
      <yu-xform label-width="120px" ref="refAddForm" :disabled="formDisabled" :form-type="formType" v-model="formdataAdd">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="投资级别" ctype="input" placeholder="投资级别" name="investLevel" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="债项评级" ctype="select" placeholder="债项评级" name="debtGrade" data-code="STD_ZB_DEBT_EVAL_RESULT" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="本级别募集规模（万元）" number-formatter="0,000" ctype="yu-num" name="curtLevelRaiseScale" :rules="rule[0]" @blur="changecurtLevelRaiseScale"></yu-xform-item>
          <yu-xform-item label="金额占比" ctype="input" v-model="moneyPercent" placeholder="金额占比" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="本级别本行拟投资规模（万元）" number-formatter="0,000" ctype="yu-num" name="curtLevelInvestScale" @blur="changecurtLevelInvestScale" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="本行拟投资金额占本级别金额比例" ctype="input" placeholder="本行拟投资金额占本级别金额比例" v-model="investScalePercent" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="本级别预计年化收益率" ctype="yu-num" sign="%" :multiple="100" placeholder="本级别预计年化收益率" name="curtLevelForeArr" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="还本付息方式" ctype="input" placeholder="还本付息方式" name="gdpMode" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="预期到期日" ctype="datepicker" placeholder="预期到期日" name="preEndDate" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
          <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-show="dialogBtnShow" type="primary" @click="doSave">保存</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg(
  'STD_ZB_DEBT_EVAL_RESULT,STD_SX_LMT_TYPE,STD_ZB_TRANS_MARKET,STD_ZB_YES_NO,STD_ZB_NORM_INVEST_TYPE,' +
  'STD_ZB_LARGE_MAIN_MANAGER_TYPE,STD_ZB_BASIC_ASSET_NORMAL_TYPE,STD_ZB_PRO_LMT_TYPE,STD_ZB_PRD_BIZ_TYPE'
);
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import {getBizType, commonMethods} from '../../util/BizInvestCommonUtil.js';
import {getFile, upImage, DeleteImage, numFn, numDM, projectInformation} from "@/utils/unitchange";
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mixins: [commonMethods, projectInformation],
  components: { YuSingleUpload, yufpNwfInit },
  props: {
    children: Object
  },
  data () {
    return {
      dataUrl:
        backend.cmisBiz + '/api/lmtsiginvestprodleveldetails/selectByModel',
      Param: {
        condition: JSON.stringify({
          serno: this.children.serno,
          oprType: '01'
        })
      },
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        },
      ],
      rules:{
        debtEvalDate: [
          { required: true, message: '请选择债项评级日期', trigger: 'blur' }
        ],
        debtEvalResult: [
          { required: true, message: '请选择债项评级结果', trigger: 'blur' }
        ],
        debtEvalOrgName: [
          { required: true, message: '请输入评级机构', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      formdataAdd: {},
      viewType: 'DETAIL',
      moneyPercent: '',
      investScalePercent: '',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      editDisabled: true,
      formDisabled: true,
      dialogBtnShow: true,
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl: backend.cmisBiz + '/api/lmtsiginvestapp/updatePicAbsoultPath',
      show_basic: true,
      show_manager: true,
      isSponsorMana: true,
      numFn,
    };
  },
  created () {
    if(this.children.op == 'EDIT'){
      //全部
      this.saveBtnShow = true;
      this.formDisabled = false
    }else{
      this.saveBtnShow = false;
      this.formDisabled = true;
    }
  },
  mounted: function () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
    // 初始化参数
    var _this = this;
    _this.init();
    this.getDetails(this.children.serno, this.children.cusId);
  },
  methods: {
    goCustomer() {
      var _this = this;
      let appType = _this.formdata.appType;
      let cusCatalog = _this.formdata.cusCatalog;
      let show;
      if(appType == '01' && cusCatalog == '3'){
        // 同业客户新增
        show = 1
      }else if(appType == '01' && cusCatalog == '2'){
        // 法人客户新增
        show = 2
      }else if(appType == '03' && cusCatalog == '3'){
        // 同业客户批复
        show = 4
      }else if(appType == '03' && cusCatalog == '2'){
        // 法人客户批复
        show = 3
      }
      var dialogData = {
        show: show,
      };
      _this.$dialog.open(
        "",
        "bizmanage/lmtBiz/subjectCredit/selectCustomerType",
        // "zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery",
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log("return ===>", retVal);
          _this.formdata.entrustedCusId = retVal.cusId;
          _this.formdata.entrustedCusName = retVal.cusName;

        }
      );
    },
    //评级机构和债项评级日期：若债项评级选择无，则此字段置空非必输
    changeDebtEvalResult (val) {
      if(this.saveBtnShow){
        if (val == '017' || val == '') {
          // 置灰 清空 不可修改
          this.rules.debtEvalOrgName[0].required = false;
          this.rules.debtEvalDate[0].required = false;
          this.formdata.debtEvalOrgName = '';
          this.formdata.debtEvalDate = '';
          // this.debtShow = true;
        } else {
          this.rules.debtEvalOrgName[0].required = true;
          this.rules.debtEvalDate[0].required = true;
          // !this.saveBtnShow ? this.debtShow = true : this.debtShow = false;
        }
      }
    },

    //【发起人是否为管理人】：选择”是“时，将字段 受托人/管理人客户编号、管理人客户名称、是否实现破产隔离(受托人/管理人)  字段非必输，隐藏
    changeManager: function(val){
      if (val == 1){
        this.isSponsorMana = false;
      }else{
        this.isSponsorMana = true;
      }
    },

    //大额主要责任人 切换
    changeBigResponsePerson (val) {
      if (val == 1) {
        this.show_basic = true;
      } else {
        this.show_basic = false;
        this.formdata.basicAssetNormal = '';
      }
    },
    /**
      初始化参数
     */
    init: function () {},

    changecurtLevelRaiseScale () {
      if (this.formdataAdd.curtLevelRaiseScale) {
        debugger
        this.moneyPercent =
          parseFloat(
            parseFloat(
              (this.formdataAdd.curtLevelRaiseScale * 100) /
                this.formdata.prdTotalAmt
            ).toFixed(2)
          ) + '%';
        this.investScalePercent =
          parseFloat(
            parseFloat(
              (this.formdataAdd.curtLevelInvestScale * 100) /
                this.formdataAdd.curtLevelRaiseScale
            ).toFixed(2)
          ) + '%';
      }
    },
    changecurtLevelInvestScale () {
      if (this.formdataAdd.curtLevelInvestScale) {
        this.moneyPercent =
          parseFloat(
            parseFloat(
              (this.formdataAdd.curtLevelRaiseScale * 100) /
                this.formdata.prdTotalAmt
            ).toFixed(2)
          ) + '%';
        this.investScalePercent =
          parseFloat(
            parseFloat(
              (this.formdataAdd.curtLevelInvestScale * 100) /
                this.formdataAdd.curtLevelRaiseScale
            ).toFixed(2)
          ) + '%';
      }
    },
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

          // 获取图片信息
          getFile(obj.tranStrPicturePath, 'yu-icon-img').then((res) => {
            _this.fileListInfo = res;
          });

          // 返回给父级数据
          if (obj.guarDescExt) {
            _this.$emit('changed', obj.guarDescExt);
          }

          // 资产证券化产品投资（标准） 展示 4006
          if (obj.lmtBizType == '4006') {
            _this.show_manager = true;
          } else {
            _this.show_manager = false;
          }
          obj = numDM(obj, "D");
          yufp.clone(obj, _this.formdata);
        });
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.dialogBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (
          op.key === '01' ||
          op.key === '02' ||
          op.key === '03' ||
          op.key === '04' ||
          op.key === '06'
        ) {
          return true;
        }
        return false;
      });
    },

    /**
     * 保存
     */
    doSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataAdd, model);
      var validate = false;
      _this.$refs.refAddForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model = numDM(model, "M");
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var strurl = backend.cmisBiz + '/api/lmtsiginvestprodleveldetails/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisBiz + '/api/lmtsiginvestprodleveldetails/';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.editDisabled = false;
      _this.$nextTick(function () {
        _this.$refs.refAddForm.resetFields();
        _this.formdataAdd.oprType = '01';
        _this.formdataAdd.cusId = _this.formdata.cusId;
        _this.formdataAdd.cusName = _this.formdata.cusName;
        _this.formdataAdd.serno = _this.children.serno;
        _this.formdataAdd.inputId = this.$xutils.getDefaultformulaData(
          '$LoginLoginCode'
        );
        _this.formdataAdd.inputDate = this.$xutils.getDefaultformulaData(
          '$CURRDATE'
        );
        _this.formdataAdd.inputBrId = this.$xutils.getDefaultformulaData(
          '$LoginOrgCode'
        );
        _this.formdataAdd.inputIdName = this.$xutils.getDefaultformulaData(
          '$LoginUserName'
        );
        _this.formdataAdd.inputBrIdName = this.$xutils.getDefaultformulaData(
          '$LoginOrgName'
        );
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.editDisabled = true;
      _this.$nextTick(function () {
        _this.$refs.refAddForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        obj = numDM(obj, "D");
        yufp.clone(obj, _this.formdataAdd);
        _this.changecurtLevelRaiseScale();
      });
    },

    // 取消
    doCancel () {
      this.dialogVisible = false;
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/lmtsiginvestprodleveldetails/logicalDelete',
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
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
