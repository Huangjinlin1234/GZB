<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled" related-table-name="refTable" :rules="formRules">
      <yu-panel title="基本信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="申请部门" placeholder="申请部门" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="项目编号" placeholder="项目编号" name="proNo" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="业务类型" placeholder="业务类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="交易市场" placeholder="交易市场" name="transMarket" ctype="select" data-code="STD_ZB_TRANS_MARKET" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="项目总金额（万元）" placeholder="项目总金额（万元）" name="prdTotalAmt" ctype="yu-num" number-formatter="0,000" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="项目投资期限（年）" placeholder="项目投资期限（年）" name="proInvestTerm" ctype="input" maxlength="20"></yu-xform-item>
          <yu-xform-item label="托管机构" placeholder="托管机构" name="capKeepOrg" maxLength="40" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否有担保/增信" placeholder="是否有担保/增信" name="isExistGuarCreditect" ctype="select" data-code="STD_ZB_YES_NO" @change="onExistGuarCreditectChange" :rules="rule[0]" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="发起人是否实现破产隔离" name="isSponsorBkrtyIsoln" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="资管计划产品类型" name="assetManaPrdType" ctype="input" maxlength="200" :disabled="!saveBtnShow"></yu-xform-item>
          <yu-xform-item label="发起人是否为管理人" name="isSponsorMana" ctype="select" data-code="STD_ZB_YES_NO" @change="changeSponsorMana" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="发起人客户编号" name="startIntbankCusId" ctype="input" maxLength="20" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="发起人客户名称" name="startIntbankCusName" ctype="input" maxLength="80" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="资产编号" placeholder="资产编号" name="assetNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item :hidden="!isSponsorMana" label="管理人是否实现破产隔离" name="isManaBkrtyIsoln" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>

        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item ctype="custom" class="upload_img" colspan="15" :autosize="{ minRows: 10}">
            <yu-single-upload class="uploadbtn" dir-name="notice" colspan="15" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="交易结构" placeholder="交易结构" name="tranStr" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="授信方案" panel-type="simple">
        <yu-xform-group :column="2">
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="授信金额（万元）" placeholder="授信金额（万元）" name="lmtAmt" ctype="yu-num" number-formatter="0,000" :rules="rule[0]" @blur="getLargeLmtInfo"></yu-xform-item>
          <yu-xform-item label="审批权限" placeholder="审批权限" name="apprMode" ctype="select" data-code="STD_APPR_MODE" disabled></yu-xform-item>
          <yu-xform-item label="利率" placeholder="利率" name="rate" ctype="yu-num" sign="%" :multiple="100" maxLength="16" @blur="getLargeLmtInfo" ></yu-xform-item>
          <yu-xform-item label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="币种" placeholder="币种" name="curType" ctype="select" filterable data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="是否循环" placeholder="是否循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="授信期限（月）" placeholder="授信期限（月）" name="lmtTerm" ctype="yu-num" precision="0" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="大额主责任人" placeholder="大额主责任人" name="largeLmtMainManager" ctype="select" :rules="rule[0]"  data-code="STD_ZB_LARGE_MAIN_MANAGER_TYPE" @change="changeManager"></yu-xform-item>
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
  </div>
</template>
<script>
import {getBizType, commonMethods} from '../../util/BizInvestCommonUtil';

yufp.lookup.reg(
  'STD_ZB_DEBT_EVAL_RESULT,STD_SX_LMT_TYPE,STD_ZB_TRANS_MARKET,STD_ZB_YES_NO,' +
  'STD_ZB_NORM_INVEST_TYPE,STD_ZB_LARGE_MAIN_MANAGER_TYPE,STD_ZB_BASIC_ASSET_NORMAL_TYPE,' +
  'STD_ZB_ASSET_PLAN_APP_BUSI_TYPE,STD_ZB_OPR_TYPE,STD_ZB_ASSET_MANA_PRD_TYP,STD_ZB_PRD_BIZ_TYPE'
);
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import {getFile, upImage, DeleteImage, numDM} from '@/utils/unitchange';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mixins: [commonMethods],
  components: { YuSingleUpload },
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
        }
      ],
      dialogVisible: false,
      formdataAdd: {},
      dataParam: {},
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: false,
      editDisabled: true,
      formDisabled: true,
      dialogBtnShow: true,
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl: backend.cmisBiz + '/api/lmtsiginvestapp/updatePicAbsoultPath',
      show_basic: true,
      isSponsorMana: true
    };
  },
  created () {
    let op;
    if (this.children) {
      this.dataParam = this.children;
      op = this.children.op;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
      op = this.pageParams.op;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
      op = this.$route.meta.params.op;
    }
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
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
    // 【发起人是否为管理人】：选择”是“时，将字段 受托人/管理人客户编号、管理人客户名称、是否实现破产隔离(受托人/管理人)  字段非必输，隐藏
    changeSponsorMana (val) {
      if (val == 1) {
        this.isSponsorMana = false;
      } else {
        this.isSponsorMana = true;
      }
    },
    changeManager (val) {
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
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
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
          obj = numDM(obj, 'D');
          // 返回给父级数据
          if (obj.guarDescExt) {
            _this.$emit('changed', obj.guarDescExt);
          }
          yufp.clone(obj, _this.formdata);
        });
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

    saveFn: function () {
      return new Promise((resolve, reject) => {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }

        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        model = numDM(model, 'M');
        model.intendActualIssuedScale = model.prdTotalAmt;
        model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        model.rate = model.rate + '';
        var updateurl =
          backend.cmisBiz + '/api/lmtsiginvestapp/updateProjectBasicInfo';
        yufp.service.request({
          method: 'POST',
          url: updateurl,
          data: model,
          callback: function (code, message, response) {
            if (code == '0') {
              // _this.$refs.refTable.remoteData();
              _this.$message('修改成功');
              resolve();
            } else {
              _this.$message({message: '修改失败', type: 'error'});
            }
          }
        });
      });
    },
    doSubmit () {
      this.saveFn().then(res => {
        var obj = this.formdata;
        const loginUser = this.$xutils.getLoginUserInfo();
        let dutysArry = []; //  loginUser.dutys
        for (let i = 0; i < loginUser.dutys.length; i++) {
          dutysArry.push(loginUser.dutys[i].code);
        }
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = this.$store.state.oauth.org.code;
        startdto.userId = this.$store.state.oauth.loginCode;
        startdto.bizId = obj.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = obj.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = obj.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.bizPkId = obj.pkId;
        startdto.param = obj;
        startdto.param.tableName = 'lmtsiginvestapp';
        startdto.param.dutyOrgType = loginUser.org.orgType;
        startdto.param.dutys = dutysArry.join(',');

        // 发起人所属机构类型
        let orgType = this.$store.state.oauth.org.orgType;
        startdto.bizType = getBizType(obj.appType, obj.lmtBizType, orgType);

        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    // 流程回调
    forceUpdate () {
      this.cancelFn();
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);
    },
    uploadedFn1 (fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, 'tranStrPicturePath', this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.tranStrPicturePath = res.path;
      });
    },
    deleteFileFn1 (file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, 'tranStrPicturePath', this.updateurl);
      this.formdata.tranStrPicturePath = '';
    }
  }
};
</script>
