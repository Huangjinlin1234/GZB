<template>

  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick" type="other">
      <yu-tab-pane label="申请信息" name="1">
        <yu-xform ref="refForm" v-model="formdata" related-table-name="refTable1" label-width="120px">
          <yu-panel title="申请基本信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="审批表编号" ctype="input" placeholder="审批表编号" name="serno" disabled></yu-xform-item>
              <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerIdName" disabled></yu-xform-item>
              <yu-xform-item label="分支机构" ctype="input" placeholder="分支机构" name="managerBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="申请日期" ctype="datepicker" placeholder="申请日期" name="inputDate" disabled :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="到期日期" ctype="datepicker" placeholder="到期日期" name="endDate" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="企业信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"  disabled :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" @click="goCustomer" @click.stop icon="search" readonly :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="授信流水号" ctype="input" name="lmtSerno" placeholder="授信流水号"  @click="goSingleCustomer" @click.stop icon="search" disabled :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="客户类型" ctype="select" placeholder="客户类型" name="cusType" data-code="STD_ZB_CUS_TYP" disabled ></yu-xform-item>
              <yu-xform-item label="行业" ctype="yu-xdic-tree" placeholder="行业" name="trade" @select-fn="commonSelectFn" parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" disabled :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="融资额度" ctype="input" placeholder="融资额度" name="finLimit" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="担保方式" placeholder="担保方式" name="guarType" ctype="radio" value-type="string" data-code="STD_MESOTH_TYPE" :rules="rule[0]" :colspan="24" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="申请事项" panel-type="normal">
            <yu-xform-group :column="1">
              <yu-xform-item label="申请事项" placeholder="申请事项" name="appContent" ctype="textarea" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="申请理由" placeholder="申请理由" name="appResn" ctype="textarea" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="客户经理意见" placeholder="客户经理意见" name="managerAdvice" ctype="textarea" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
              <yu-xform-item label="是否经公司部" placeholder="是否经公司部" ctype="select" name="isCprtApprove" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow" :rules="rule[0]"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
        <yu-xdialog title="授信影像资料" :visible.sync="show_dialog_img" width="90%" height="100%">
          <imageSystem v-if="show_img" authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
        </yu-xdialog>
      </yu-tab-pane>
      <yu-tab-pane label="影像材料" name="2">
        <imageSystem v-if="show_img" authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="其他申请事项审批表" name="3">
          <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
        </yu-tab-pane>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button type="primary" @click="cancelFn" v-show="cancelBtnShow">返回</yu-button>
      </div>
    </yu-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { clone, lookup, dateFormat } from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import mixinForm from '@/utils/mixins/mixin-form';
import {toSingleCustomer} from '@/utils/unitchange';
yufp.lookup.reg('STD_GRT_APPROVE_RESN');
export default {
  mixins: [mixinForm, toSingleCustomer],
  components: { YufpDemoSelector, imageSystem, yufpNwfInit },
  props: {
    pageParams: {
      type: Object,
      default: function () {
        return {};
      }
    },
    bizPageData: Object,
    dialogId: String,
    modelGroupNo: String
  },
  data: function () {
    return {
      formdata: {},
      updateUrl: this.$backend.cmisBiz + '/api/otheritemapp/updateotheritemapp',
      addUrl: this.$backend.cmisBiz + '/api/otheritemapp/addotheritemapp',
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
      activeName: '1',
      formDisabled: true,
      saveBtnShow: false,
      submitBtnShow: false,
      cancelBtnShow: true,
      show_img: false,
      show_dialog_img: false
    };
  },
  created () {
    console.log('=====================');
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    var _this = this;
    // 判断是否流程
    var biz = _this.bizPageData;
    var params;
    if (biz == 'undefined' || biz == null || biz == '') {
      var name = this.$route.meta.params.name;
      this.viewType = this.$route.meta.params.op;
      let formdata = params = this.$route.meta.params.data;
      if (this.viewType == 'DETAIL') {
        clone(formdata, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType == 'EDIT') {
        clone(formdata, this.formdata);
        this.formDisabled = false;
        this.saveBtnShow = true;
        this.submitBtnShow = true;
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.updateTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
      }

      // 判断是否存在行业
      if (_this.formdata.trade == null || _this.formdata.trade == '') {
        if (_this.formdata.cusId) {
          _this.$request({
            method: 'GET',
            url: `${backend.cmisCus}/api/cusbase/${_this.formdata.cusId}`,
            data: _this.formdata.cusId
          }).then((data) => {
            let cusCataLog = data.data.cusCatalog;
            // 企业
            if (cusCataLog == '2') {
              _this.$request({
                method: 'POST',
                url: `${backend.cmisCus}/api/cuscorp/${_this.formdata.cusId}`,
                data: _this.formdata.cusId
              }).then((data) => {
                _this.formdata.cusType = data.data.cusType;
                _this.formdata.trade = data.data.tradeClass;
              });
            } else {
              // 个人
              let cusIndivUnit = {};
              cusIndivUnit.cusId = _this.formdata.cusId;
              _this.$request({
                method: 'POST',
                url: `${backend.cmisCus}/api/cusindivunit/queryByCusId/`,
                data: cusIndivUnit
              }).then((data) => {
                // _this.formdata.cusType = data.data.cusType;
                // 取单位所属行业
                _this.formdata.trade = data.data.indivComTrade;
              });
            }
          });
        }
      }

      if (this.viewType == 'ADD') {
        this.formDisabled = false;
        this.saveBtnShow = true;
        this.submitBtnShow = true;
        const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
        _this.formdata.serno = serno;
        _this.formdata.approveStatus = '000';
        _this.formdata.managerId = _this.userCode;
        _this.formdata.managerIdName = _this.userName;
        _this.formdata.managerBrId = _this.org.code;
        _this.formdata.managerBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputIdName = _this.userName;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.inputDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.createTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.updateTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
      }
    } else {
      // 流程页面跳转
      let reqData = {
        condition: JSON.stringify({
          serno: this.bizPageData.instanceInfo.bizId
        })
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/otheritemapp/selectbymodel',
        data: reqData,
        callback (code, message, response) {
          if (response.code == '0') {
            params = response.data[0];
            console.log('response=================>>>>>>>>>>>>', response);
            clone(response.data[0], _this.formdata);
          } else {
            _this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        }
      });
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.cancelBtnShow = false;
    }

    this.printUrl = _this.$backend.frptRptService + 'qtsx-qtsqsxsp.cpt&serno=' + _this.formdata.serno;

    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'BABYXZL',
        index: {
          businessid: params.serno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          custtype: params.curType,
          custconductname: params.updIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.inputIdName
          // custname: params.updBrIdName,
        }
      }
    ];
    this.show_img = false;
    this.$nextTick(() => {
      this.show_img = true;
    });
  },
  methods: {
    // 客户选取
    goCustomer () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
          _this.formdata.lmtSerno = '';
          _this.formdata.cusType = '';
          _this.formdata.trade = '';
          _this.$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/lmtreplyacc/querylmtreplyaccdatabyparams',
            data: _this.formdata.cusId
          }).then((data) => {
            if (data.data == null) {
              _this.formdata.cusId = '';
              _this.formdata.cusName = '';
              _this.$message({ message: '该用户没有生效的授信批复台账！', type: 'error' });
              return;
            }
            _this.formdata.lmtSerno = data.data.serno;
          });
          if (retVal.cusCatalog == '2') { // 如果是企业客户获取客户的 客户类型 cusType ,行业 trade
            _this.$request({
              method: 'POST',
              url: `${backend.cmisCus}/api/cuscorp/${_this.formdata.cusId}`,
              data: _this.formdata.cusId
            }).then((data) => {
              _this.formdata.cusType = data.data.cusType;
              _this.formdata.trade = data.data.tradeClass;
              _this.formdata.corpQlty = data.data.corpQlty;
            });
          } else {
            // 个人
            let cusIndivUnit = {};
            _this.formdata.cusType = retVal.cusType;
            cusIndivUnit.cusId = _this.formdata.cusId;
            _this.$request({
              method: 'POST',
              url: `${backend.cmisCus}/api/cusindivunit/queryByCusId/`,
              data: cusIndivUnit
            }).then((data) => {
              // _this.formdata.cusType = data.data.indivComTyp;
              _this.formdata.trade = data.data.indivComTrade;
            });
          }
        }
      );
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      const bizType = 'QT012';
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        approveStatus: _this.formdata.approveStatus,
        orgLevel: '6',
        lmtAmt: '0',
        openTotalLmtAmt: '0',
        isTZBAppr: '0',
        isMJBAppr: '0',
        isXQYAppr: '0',
        isGSBAppr: '0',
        isCommitOtherDeptXDGLB: '0',
        apprMode: '01',
        isGLAppr: '0',
        approveResult: '0',
        isSubAutoAppr: '0',
        sxkdRiskResult: '0',
        isGrp: '0',
        isAppAmt30: '1',
        isRelationSuperPower: '0',
        isInteRiskLvl: '0',
        isLimitFlag: '0',
        isOfferRateMax: '0',
        ruleRiskLvl: 'D',
        lowRiskNoRelAmt:'0'
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },
    cancelFn () {
      if (this.pageParams.serno) {
        this.$dialog.close(this.dialogId); // 弹窗 关闭
      } else {
        this.$store.dispatch('tagsView/delView', this.$route); // 标签页 关闭
        this.$router.go(-1);
      }
    },
    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          if (actionType === 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode
            };
            this.submitProcessFun(params);
          }
          if (this.viewType == 'ADD') {
            this.viewType = 'EDIT';
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error' });
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          if (actionType === 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据更新成功！', type: 'success' });
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error' });
        }
      });
    }
  }
};
</script>
