<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
        <yu-panel title="授信品种信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled :colspan="12"  @change="getCusId(formdata.cusId)" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项额度品种编号" ctype="input" name="accSubPrdNo" disabled ></yu-xform-item>
            <yu-xform-item label="分项额度号" ctype="input" name="accSubNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="批复分项流水号" ctype="input" name="replySubSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信批复分项品种流水号" ctype="input" name="replySubPrdSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信分项流水号" ctype="input" name="subSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项品种流水号" ctype="input" name="subPrdSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信品种编号" ctype="yu-xlmtsub-tree" rules="required" name="lmtBizType"  :disabled="type!='ADD'&&type!='REFINE'" width="480" height="480" :parms="params" @select-fn="commonSelectFn" :show-text="false" :mapping="{'id':'lmtBizType','label':'lmtBizTypeName','lmtSubType':'lmtSubType'}"></yu-xform-item>
            <yu-xform-item label="授信品种名称" ctype="input" name="lmtBizTypeName" rules="required"  @change="getLmtPrdNo(formdata.lmtBizType)" disabled ></yu-xform-item>
            <yu-xform-item label="产品类型属性" v-if="filter!=''" ctype="select" name="lmtBizTypeProp" :colspan="12" :data-code="cpDataCode" :exclude-key="filter" :disabled="type!='ADD'&&type!='REFINE'" @change="getPartner"></yu-xform-item>
            <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" rules="required" disabled data-code="STD_ZB_YES_NO" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" name="curType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信额度(元)" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="额度期限(月)" ctype="input" name="lmtTerm" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" sign="%" name="bailPreRate" :rules="{ required: isZCCReq, message: '保证金比例字段不能为空' }" :hidden="isShowByPrd" :colspan="12" :multiple="100"></yu-xform-item>
            <yu-xform-item label="宽限期" ctype="input" name="lmtGraperTerm" v-if="isPre=='0'" :colspan="12"></yu-xform-item>
            <yu-xform-item label="年利率" ctype="yu-num" sign="%" name="rateYear" disabled ></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" :datacode-filter="datacodeFilterFn" v-if="isPre=='0'"   @change="repayModeChg(formdata.repayMode)" :colspan="12"></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" name="eiMode" v-if="isPre=='0'" data-code="STD_EI_MODE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否借新还旧" ctype="select" v-model="isRefinance" v-if="isPre=='0'&&!lmtPrd&&lmtType!='01'" data-code="STD_ZB_YES_NO" @change="getIsRefinance(formdata.isRefinance)" name="isRefinance" :hidden="isLmtType01"></yu-xform-item>
            <yu-xform-item label="是否无还本续贷" ctype="select" v-model="isRwrop" v-if="isPre=='0'&&!lmtPrd&&lmtType!='01'" data-code="STD_ZB_YES_NO" @change="getIsRwrop(formdata.isRwrop)" name="isRwrop" :hidden="isLmtType01"></yu-xform-item>
            <yu-xform-item label="手续费率" ctype="yu-num" sign="%" name="chrgRate" v-if="isPre=='0'&&lmtPrd" :colspan="12"></yu-xform-item>
            <yu-xform-item label="手续费收取方式" ctype="select" v-if="isPre=='0'&&lmtPrd" name="chrgCollectMode" data-code="STD_CHRG_COLLECT_MODE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" rules="required" data-code="STD_ZB_YES_NO" disabled  :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信起始日" ctype="input" name="startDate" disabled></yu-xform-item>
            <yu-xform-item label="授信到期日" ctype="input" name="endDate" disabled></yu-xform-item>
            <yu-xform-item label="还款计划描述" ctype="input" type="textarea" v-if="repayModel" name="repayPlanDesc" :colspan="22" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" v-if="isPre=='0'&&lmtPrd">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人名称" ctype="yu-xcustom-ref" name="consignorCusName" :colspan="12"  @select-fn="commonSelectFn" :mapping="{'cusId':'consignorCusId','cusName':'consignorCusName','certType':'consignorCertType','certCode':'consignorCertCode','cusType':'consignorType'}" width="720" height="480" idField="cusId" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="委托人选取" @change="getLmtType(formdata.cusId)"  ></yu-xform-item>
            <yu-xform-item label="委托人类型" ctype="select" name="consignorType" data-code="STD_ZB_CUS_TYP" :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="input" name="consignorCertType" data-code="STD_ZB_CERT_TYP" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" name="consignorCertCode" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人客户号" ctype="input" name="consignorCusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="01" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_DB_DETAIL,STD_ZB_CERT_TYP');
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  components: { cfgAssistantTip },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      dialogVisibleSelected: false,
      formDataPlan: {},
      triggerEditChangeEvent: {},
      formType: {},
      isPre: '',
      type: this.pageParams.op,
      lmtPrd: false,
      repayModel: false,
      lmtRepayPlanList: [],
      lmtTerm: '',
      lmtAmt: '',
      accLoanModel: false,
      showAccLoanDialog: false,
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodel',
      baseParams: {condition: {}, sort: 'createTime desc'},
      isRefinance: '',
      isRwrop: '',
      guarMode: {},
      filter: '',
      prdNo: '',
      isPool: '',
      params: '',
      isBailPreRate: true,
      propUrl: this.$backend.cmisBiz + '/api/lmtappsubprd/getselectpropbyprdno',
      baseParams1: {},
      optionsData: [{key: '1', value: '2'}],
      cpDataCode: 'STD_PRD_TYPE_PROP',
      isShowByPrd: false,
      isShowByPrd1: false,
      isLmtType01: false,
      lmtType: '',
      filter1: '',
      serno: '',
      isCyr: false,
      cyrParams: {},
      cyrUrl: '',
      prdCode: '',
      isShow: false, // 小助手是否展示
      prdTypeProp: '', // 小助手产品属性
      isPartnerRequired: true, // 合作方编号，名称必输属性
      isZCCReq: false, // 保证金比例必输
      lowGuarModel: false,
      dialogVisibleSelectedLowGuar: false,
      lowGuarList: []
    };
  },
  mounted () {
    var parentData = this.pageParams;
    this.initForm(parentData);
    this.getLmtAppData(parentData.accSubPrdNo);
    if (parentData.op == 'ADD') {
      if ((this.formdata.guarMode == '00') || parentData.isPreLmt == '1') {
        // this.isBailPreRate = false;
        this.isShowByPrd = true;
      } else {
        // this.isBailPreRate = true;
        this.isShowByPrd = false;
      }
    } else {
      if ((this.formdata.guarMode == '00') || (this.formdata.guarMode == '60' && this.formdata.lmtBizType != '10030101') || parentData.isPreLmt == '1') {
        // this.isBailPreRate = false;
        this.isShowByPrd = true;
      } else {
        // this.isBailPreRate = true;
        this.isShowByPrd = false;
      }
    }
  },
  // mounted后 监控数据变化
  // updated () {
  //   debugger;
  //   this.formdata.repayMode;
  // },
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
    /**
     * 还款方式 字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'A001' || op.key == 'A002' || op.key == 'A003' || op.key == 'A009' || op.key == 'A040') {
          return true;
        }
        return false;
      });
    },
    /**
     * 新增授信适用产品
     */
    onSave: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var guarModel = _this.formdata.guarMode;
      var lmtBizType = _this.formdata.lmtBizType;
      var bailPreRate = _this.formdata.bailPreRate;
      if (guarModel == '60' && !lmtBizType.startsWith('12') && !lmtBizType.startsWith('1003')) {
        _this.$xutils.showMsgBox('提示', '当前分项不允许添加该类型产品');
        return;
      }
      if (!lmtBizType.startsWith('12') && bailPreRate == 1) {
        _this.$xutils.showMsgBox('提示', '非低分险业务保证金比例不能100%录入');
        return;
      }
      var isRevolvLimit = _this.formdata.isRevolvLimit;
      var lmtTerm = _this.formdata.lmtTerm - 0;
      var lmtTerm1 = 12;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      if ((lmtBizTypeProp == 'P020' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P021' ||
          lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P007') && (isRevolvLimit == '1' || lmtTerm > lmtTerm1)) {
        _this.$xutils.showMsgBox('提示', '当前授信产品仅支持非循环授信且额度期限不得超过1年');
        return;
      }
      // 知享贷金额不超200万元，单笔业务期限不低于6个月，不超过1年
      if (lmtBizTypeProp == 'P043') {
        var lmtAmt = _this.formdata.lmtAmt - 0;
        var maxAmt = 2000000;
        var minTerm = 6;
        if (lmtAmt > maxAmt || lmtTerm < minTerm || lmtTerm > lmtTerm1) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信额度不得超过200万元，业务期限不得低于6个月或超过1年！');
          return;
        }
      }
      // 拍卖贷授信期限不超过8年
      if (lmtBizTypeProp == 'P044') {
        var mTerm = 96;
        if (lmtTerm > 96) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信期限不得超过8年！');
          return;
        }
      }
      debugger;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/addlmtappsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              if (_this.formdata.lmtBizType.startsWith('14')) {
                var idList = 'zydkxx';
                var pageList = '专业贷款信息';
                _this.insertMustCheck(_this.serno, _this.lmtType, idList, pageList);
              }
              _this.$message('新增成功');
              _this.type = 'EDIT';
              var subPrdSerno = rtnData.subPrdSerno;
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/lmtappsubprd/selectbysubprdserno',
                data: subPrdSerno,
                callback: function (code, message, response) {
                  yufp.clone(response.data, _this.formdata);
                }
              });
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    insertMustCheck: function (serno, lmtType, idList, pageList) {
      var _this = this;
      let obj = {};
      obj.serno = serno;
      obj.bizType = lmtType;
      obj.idList = idList;
      obj.pageList = pageList;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/bizmustcheckdetails/insertMustCheck',
        data: obj,
        callback: function (code, message, response) {
          if (response.data == '0') {
            _this.$xutils.showMsgBox('系统异常');
          }
        }});
    },
    onUpdate: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      var lmtBizType = _this.formdata.lmtBizType;
      var guarModel = _this.formdata.guarMode;
      var bailPreRate = _this.formdata.bailPreRate;
      if (!lmtBizType.startsWith('12') && bailPreRate == 1) {
        _this.$xutils.showMsgBox('提示', '非低分险业务保证金比例不能100%录入');
        return;
      }
      if (_this.formdata.chgFlag != '1') {
        if (_this.type == 'REFINE' || _this.type == 'CHG') {
          var origiLmtAccSubPrdTerm1 = _this.formdata.origiLmtAccSubPrdTerm - 0;
          var lmtTerm1 = _this.formdata.lmtTerm - 0;
          if (origiLmtAccSubPrdTerm1 < lmtTerm1) {
            _this.formdata.lmtTerm = _this.lmtTerm;
            _this.$xutils.showMsgBox('提示', '当前授信期限不允许延长');
            return;
          }
          var lmtAmt0 = _this.lmtAmt - 0;
          var lmtAmt1 = _this.formdata.lmtAmt - 0;
          if (lmtAmt0 < lmtAmt1) {
            _this.formdata.lmtAmt = _this.lmtAmt;
            _this.$xutils.showMsgBox('提示', '当前授信额度不允许增加');
            return;
          }
        }
      }
      var lmtTerm = _this.formdata.lmtTerm - 0;
      var isRevolvLimit = _this.formdata.isRevolvLimit;
      var lmtTerm1 = 12;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      if ((lmtBizTypeProp == 'P020' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P021' ||
          lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P007') && (isRevolvLimit == '1' || lmtTerm > lmtTerm1)) {
        _this.$xutils.showMsgBox('提示', '当前授信产品仅支持非循环授信且额度期限不得超过1年');
        return;
      }
      if (lmtBizTypeProp == 'P043') {
        var lmtAmt = _this.formdata.lmtAmt - 0;
        var maxAmt = 2000000;
        var minTerm = 6;
        if (lmtAmt > maxAmt || lmtTerm < minTerm || lmtTerm > lmtTerm1) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信额度不得超过200万元，业务期限不得低于6个月或超过1年！');
          return;
        }
      }

      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/updatelmtappsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('修改成功');
              this.onBack();
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    deleteLowGuar: function () {
      var _this = this;
      var selections = _this.$refs.refTableLowGuar.selections;
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.serno;
      }
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsubprdlowguarrel/deleteLowGuar',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('操作成功');
                  _this.initLowGuar();
                }
              }
            });
          }
        }
      });
    },
    deletePlan: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formDataPlan.serno;
      }
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/repaycapplan/deletelmtrepaycapplan',
              data: selections[0],
              callback: function (code, message, response) {
                // TODO  判断返回内容
                _this.$message('操作成功');
                _this.innitRepayPlanTable(subPrdSerno);
              }
            });
          }
        }
      });
    },
    deleteLoan: function () {
      var _this = this;
      var selections = _this.$refs.refLoanTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtchgsubaccloanrel/deletebybillno',
              data: selections[0].billNo,
              callback: function (code, message, response) {
                // TODO  判断返回内容
                _this.$message('操作成功');
                _this.innitAccLoanTable(subPrdSerno);
              }
            });
          }
        }
      });
    },

    /**
     * 新增还本计划按钮
     */
    addPlan: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.dialogVisibleSelected = true;
      this.$nextTick(function () {
        _this.formDataPlan.serno = subPrdSerno;
      });
    },
    addLowGuar: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.dialogVisibleSelectedLowGuar = true;
      this.$nextTick(function () {
        _this.formDataLowGuar.subPrdSerno = subPrdSerno;
      });
    },
    addCyr: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      var data = {};
      data.cusId = _this.formdata.cusId;
      data.subPrdSerno = subPrdSerno;
      _this.$dialog.open('合同选取', 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppChg/ctrContInfoAppAdd.vue', 1400, 800, data, () => {
        _this.$refs.cyrTable.remoteData();
      });
    },
    deleteCyr: function () {
      var _this = this;
      var selections = _this.$refs.cyrTable.selections;
      var pkId = selections[0].pkId;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsubprdctrloancontrel/logicDelete',
              data: pkId,
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('操作成功');
                  _this.$refs.cyrTable.remoteData();
                }
              }
            });
          }
        }
      });
    },
    initLowGuar: function () {
      var _this = this;
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.subPrdSerno;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsubprdlowguarrel/selectBySubPrdSerno',
        data: subPrdSerno,
        callback: function (code, message, response) {
          debugger;
          if (response.data != null && response.data.length > 0) {
            _this.lowGuarList = response.data;
          }
        }});
    },
    /**
     * 新增还本借据
     */
    addLoan: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      _this.baseParams = {condition: {cusId: _this.formdata.cusId}, sort: 'createTime desc'};
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.showAccLoanDialog = true;
    },
    /**
     * 取消新增还本借据
     */
    back: function () {
      var _this = this;
      _this.showAccLoanDialog = false;
    },
    /**
    * 取消新增还本计划
    */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },
    cancelFnLowGuar: function () {
      var _this = this;
      _this.dialogVisibleSelectedLowGuar = false;
    },
    /**
     * 新增还本计划
     */
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refPlanForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formDataPlan.serno;
      }
      if (_this.formDataPlan.terms <= 0) {
        this.$message('最小期数为1,请重新填写!');
        return;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/saverepayplan',
        data: _this.formDataPlan,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('新增成功');
              _this.dialogVisibleSelected = false;
              _this.innitRepayPlanTable(subPrdSerno);
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.erortx);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    nextFnLowGuar: function () {
      debugger;
      var _this = this;
      var validate = false;
      _this.$refs.lowGuarForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.subPrdSerno;
        _this.formDataLowGuar.subPrdSerno = subPrdSerno;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtsubprdlowguarrel/insertLowGuar',
        data: _this.formDataLowGuar,
        success: (response, status, xhr) => {
          if (response.data > 0) {
            this.$message('新增成功');
            _this.dialogVisibleSelectedLowGuar = false;
            _this.initLowGuar();
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    initForm: function (data) {
      var _this = this;
      var op = data.op;
      debugger;
      var isPreLmt = data.isPreLmt;
      _this.guarMode = data.guarMode;
      if (op == 'ADD') {
        yufp.clone(data, _this.formdata);
        if (isPreLmt == '1') {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '1';
        } else {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '0';
        }
      } else if (op == 'REFINE') {
        yufp.clone(data, _this.formdata);
        _this.formdata.isPreLmt = '0';
        _this.isPre = '0';
      } else if (op == 'EDIT' || op == 'VIEW' || op == 'CHG') {
        var accSubPrdNo = data.accSubPrdNo;
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
          data: {accSubPrdNo: accSubPrdNo, oprType: '01'},
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.formdata);
            _this.isPre = response.data.isPreLmt;
            _this.lmtTerm = response.data.lmtTerm;
            _this.lmtAmt = response.data.lmtAmt;
            _this.isRefinance = response.data.isRefinance;
            _this.isRwrop = response.data.isRwrop;
            _this.prdTypeProp = response.data.lmtBizTypeProp;
          }
        });
      }
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$dialog.close(this.dialogId);
    },
    getLmtPrdNo: function (data) {
      var _this = this;
      _this.filter = '';
      _this.cpDataCode = '';
      _this.$nextTick(function () {
        if (data == '14020301') {
          _this.lmtPrd = true;
        } else {
          _this.lmtPrd = false;
        }
        if (data == '14010503') {
          _this.filter1 = data;
        } else {
          _this.filter1 = '';
        }
        if ((_this.formdata.guarMode == '00') || (_this.formdata.guarMode == '60' && _this.formdata.lmtBizType != '10030101') || _this.isPre == '1') {
          // _this.isBailPreRate = false;
          _this.isShowByPrd = true;
        } else {
          // _this.isBailPreRate = true;
          _this.isShowByPrd = false;
          if (_this.isPre == '0' && (data.startsWith('100201') || data.startsWith('1003') || data.startsWith('1301') || data.startsWith('1302') || data.startsWith('110101') || data.startsWith('11010301') || data.startsWith('11010203') || data.startsWith('110106') || data.startsWith('110201') || data.startsWith('11020201') || data.startsWith('11020302'))) {
            _this.isZCCReq = true;
          } else {
            _this.isZCCReq = false;
          }
        }
        if (_this.pageParams.op == 'ADD') {
          if (_this.formdata.lmtBizType == '12010103') {
            _this.lowGuarModel = true;
          }
        } else {
          if (_this.formdata.lmtBizType == '12010103') {
            _this.lowGuarModel = true;
            _this.initLowGuar();
          }
        }
        // 资产池额度1003(startwith)  一般低风险额度12010103 保证金比例及还款结息方式都保留
        // 只留保证金比例的如下：经营周转类额度 1、票据业务-银行承兑汇票开立100201(startwith)  2、商票保贴额度100202(startwith)
        // 贸易融资类额度1、国际贸易融资业务-国际信用证开立110101(startwith)  2、国际贸易融资业务-国内信用证开立110201(startwith)
        // 担保承诺类额度中贷款承诺1303(startwith) 两个都不保留，其余各种保函都只留保证金比例1301 1302(startwith)
        if (data.startsWith('1003') || data == '12010103') {
          if (data.startsWith('1003')) {
            _this.isZCCReq = true;
          }
          _this.isShowByPrd = false;
          _this.isShowByPrd1 = false;
        } else if (data.startsWith('100201') || data.startsWith('100202') || data.startsWith('110101') || data.startsWith('110201') || data.startsWith('1301') || data.startsWith('1302')) {
          _this.isShowByPrd = false;
          _this.isShowByPrd1 = true;
        } else if (data.startsWith('1303')) {
          _this.isShowByPrd = true;
          _this.isShowByPrd1 = true;
        }
        var lmtSubType = _this.formdata.lmtSubType;
        var lmtBizType = _this.formdata.lmtBizType;
        if (lmtSubType == '01' && _this.isPre == '0' && lmtBizType && lmtBizType != '') {
          _this.formdata.lmtBizType = '';
          _this.formdata.lmtBizTypeName = '';
          _this.$message('非预授信请选择具体产品');// 弹出提示
          return;
        }

        _this.$xutils.request({
        // 同步请求
          async: false,
          url: this.$backend.cmisBiz + '/api/lmtappsubprd/getselectpropbyprdno',
          data: {prdNo: data},
          success: (response, status, xhr) => {
            if (response.code == '0') {
              // _this.prdNo = response.data.exit;
              _this.filter = response.data.rtnData;
              _this.$nextTick(() => {
                _this.cpDataCode = 'STD_PRD_TYPE_PROP';
              });
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      });
    },

    getCusId: function (data) {
      var _this = this;
      if (data.startsWith('8')) {
        _this.params = {
          limitStrNo: '01',
          notLimitSubNoList: '15,16'
        };
      } else {
        _this.params = {
          limitStrNo: '02',
          notLimitSubNoList: '200202,21,22,23'
        };
      }
    },
    prdNoNull: function () {
      var _this = this;
      _this.prdNo = '';
    },
    getIsRefinance: function (data) {
      var _this = this;
      if (data == '1') {
        _this.isRwrop = '0';
        _this.accLoanModel = true;
      } else {
        if (_this.isRwrop == '0') {
          _this.accLoanModel = false;
        }
      }
    },
    getIsRwrop: function (data) {
      var _this = this;
      if (data == '1') {
        _this.isRefinance = '0';
        _this.accLoanModel = true;
      } else {
        if (_this.isRefinance == '0') {
          _this.accLoanModel = false;
        }
      }
    },
    repayModeChg: function (data) {
      var _this = this;
      if (data == 'A040') {
        _this.repayModel = true;
      } else {
        _this.repayModel = false;
      }
    },

    /**
     * 初始化还本借据表
     */
    innitAccLoanTable: function (subPrdSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtchgsubaccloanrel/querybysubprdserno',
        data: subPrdSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtAccLoanList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 初始化还本计划表
     */
    innitRepayPlanTable: function (subPrdSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/selectbyserno',
        data: subPrdSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtRepayPlanList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 选取新增还本借据
     */
    makeSure: function () {
      var _this = this;
      var selections = _this.$refs.refAccLoanTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtchgsubaccloanrel/savelmtchgsubaccloanrel',
        data: {
          'subPrdSerno': subPrdSerno,
          'billNo': selections[0].billNo
        },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$message('操作成功');
              _this.innitAccLoanTable(subPrdSerno);
              _this.showAccLoanDialog = false;
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    getLmtAppData (subSerno) {
      let _this = this;
      _this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/lmtapp/getlmtappbysubserno',
        data: {subSerno: subSerno},
        success: (response, status, xhr) => {
          if (response.data != null) {
            _this.lmtType = response.data.lmtType;
            _this.serno = response.data.serno;
            if (response.data.lmtType == '01') {
              _this.isLmtType01 = true;
            }
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    getPartner (value) {
      var _this = this;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      _this.prdTypeProp = _this.formdata.lmtBizTypeProp;
      // 若产品为集群贷P019，置业贷--暂不控，是产品不是属性，科技贷P003，农发通P005，信保贷P010，担保融P015，青岛即墨政银保P017，徐信保P020，南通信保通P021，无锡园区保P022，宿迁园区保P023，邳州园区保P024
      // if (lmtBizTypeProp == 'P035' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P005' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P024' || lmtBizTypeProp == 'P042' ||
      //   lmtBizTypeProp == 'P019' || lmtBizTypeProp == 'P015' || lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P020' || lmtBizTypeProp == 'P021' || lmtBizTypeProp == 'P043') {
      if (lmtBizTypeProp == 'P019' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P005' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P015' || lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P020' ||
         lmtBizTypeProp == 'P021' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P024') {
        _this.filter1 = lmtBizTypeProp;
      } else {
        _this.filter1 = '';
      }
      // 诚易融引入关联合同
      if (lmtBizTypeProp == 'P016') {
        _this.isCyr = true;
        _this.cyrUrl = backend.cmisBiz + '/api/lmtsubprdctrloancontrel/selectBySubPrdSerno';
        _this.cyrParams = {subPrdSerno: _this.formdata.subPrdSerno};
      } else {
        _this.isCyr = false;
      }
      // 征信贷自动引入授信额度
      if (lmtBizTypeProp == 'P009') {
        var corpId = _this.formdata.cusId;
        // _this.$xutils.request({
        //   url: this.$backend.cmisBiz + '/api/zxdprelmtapply/selectByPrimaryKey',
        //   method: 'post',
        //   data: {
        //     condition: JSON.stringify({corpId: corpId, ifAdmitSys: 'Y' })
        //   },
        //   callback: function (code, message, response) {
        //     _this.formdata.lmtAmt = response.data.maxLmtAmt;
        //     console.log(response.data.maxLmtAmt);
        //   }
        // });
        var url = backend.cmisBiz + '/api/zxdprelmtapply/selectbyprimarykey/' + corpId;
        yufp.service.request({
          method: 'POST',
          url: url,
          callback: function (code, message, response) {
            _this.formdata.lmtAmt = response.data.maxLmtAmt;
          }
        });
      }
    },
    // 企业信用评分>=650时，合作方编号，合作方名称非必输，否则必输
    changePartnerReq () {
      var _this = this;
      // 获取企业用信评分
      var qyxyScore = _this.formdata.qyxyScore;
      if (qyxyScore >= '650') {
        _this.isPartnerRequired = false;
      } else {
        _this.isPartnerRequired = true;
      }
    },
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    }
  }
};
</script>
