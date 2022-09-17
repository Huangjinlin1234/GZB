<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承出账基本信息
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="主键" :hidden="true" name="pkId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务流水号" name="pvpSerno" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" :disabled="true" :rules="rule[0]" ctype="input" :colspan="10"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCont">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :disabled="true" :rules="rule[0]" ctype="input" :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" :disabled="true" :rules="rule[0]" ctype="select" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" :disabled="true" :rules="rule[0]" ctype="input" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" :disabled="true" :rules="rule[0]" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <!--<yu-button type="primary" @click="viewLoanFn" style="margin-left: 150px;">查看放款审核要件</yu-button>-->
          <yu-xform-item label="合同影像是否审核" name="isContImageAudit" :disabled="true" ctype="select" data-code="STD_ZB_YES_NO" colspan="24"></yu-xform-item>
          <yu-xform-item label="出账模式" name="pvpMode" :rules="rule[0]" ctype="select" data-code="STD_PVP_MODE" :value="1"></yu-xform-item>
          <yu-xform-item label="是否电子票据" name="isEDrft" :disabled="true" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="影像流水号" prop="wyImageSerno" width="120" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false">
        <div>
          <div id="heartMsg"><yu-col :offset="3">温馨提示：该申请金额为总金额!</yu-col></div>
        </div>
        <yu-xform-group>
          <yu-xform-item label="合同金额" name="contAmt" ctype="yu-num" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
          <yu-xform-item label="申请金额" name="appAmt" ctype="input" :rules="rule[0]" :disabled="true" @change="appAmtChange"></yu-xform-item>
          <yu-xform-item label="币种" name="contCurType" ctype="select" :disabled="true" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="合同最高可放款金额" name="contHighDisb" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" :disabled="true"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" :disabled="true"></yu-xform-item>
          <yu-xform-item label="申请汇票数" name="applyPorder" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="票据签订日期" name="draftSignDate" ctype="datepicker" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="保证金比例" name="bailPerc" ctype="yu-num" sign="%" :multiple="100" width="120" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="保证金金额" ctype="num" number-formatter="0,000.00" name="bailAmt" width="120" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="手续费率（‰）" ctype="yu-num" sign="‰" :multiple="1000" name="chrgRate" width="120" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="手续费金额" ctype="yu-num" number-formatter="0,000.00" name="chrgAmt" width="120" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="手续费类型" name="chrgType" width="120" :rules="rule[0]" ctype="select" :disabled="true"  data-code="STD_CHRG_TYPE"></yu-xform-item>
          <yu-xform-item label="退票计息方式" name="returnDraftInterestType" width="120" ctype="select" :rules="rule[0]" data-code="STD_RETURN_DRAFT_INTEREST_TYPE"></yu-xform-item>
          <yu-xform-item label="逾期垫款年利率" ctype="yu-num" sign="%" name="overdueRate" width="120" :rules="rule[0]" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--<yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="承兑行类型" name="aorgType" ctype="select" :disabled="true" data-code="STD_AORG_TYPE"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
              <yu-xform-item label="承兑行行号" ctype="input" placeholder="承兑行行号" name="aorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpOrg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行名称" ctype="input" placeholder="承兑行名称" name="aorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户行账号" ctype="input" placeholder="出票人开户行账号" name="daorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpDaorg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户户名" ctype="input" placeholder="出票人开户户名" name="daorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
      </yu-panel>-->
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="select" :disabled="true" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input" :disabled="true"> </yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="账务机构" ctype="yu-xw-pvp-org-zw" rules="required" placeholder="账务机构"  @select-fn="commonSelectFn" :mapping="{'finaBrNo':'finaBrId','finaBrName':'finaBrIdName'}" name="finaBrId"></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="签发机构" ctype="yu-xw-pvp-org-qf" rules="required" placeholder="签发机构"  @select-fn="commonSelectFn" :mapping="{'signBrNo':'issuedOrgNo','signBrName':'issuedOrgName'}" name="issuedOrgNo"></yu-xform-item>
          <yu-xform-item label="签发机构名称" name="issuedOrgName" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="兑付机构" ctype="yu-xw-pvp-org-cd" rules="required" placeholder="兑付机构"  @select-fn="commonSelectFn" :mapping="{'payBrNo':'payOrgNo','payBrName':'payOrgName'}" name="payOrgNo"></yu-xform-item>
          <yu-xform-item label="兑付机构名称" name="payOrgName" rules="required" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputId" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerId" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrId" width="120" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" width="120" :disabled="true" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center" v-if="isShowButton">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="commit">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="05"></cfgAssistantTip>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formFormaterFn } from '@/utils/mixin.js';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE,STD_PVP_MODE,STD_RETURN_DRAFT_INTEREST_TYPE,STD_ZB_YES_NO,STD_CHRG_TYPE,STD_AORG_TYPE');
export default {
  components: { cfgAssistantTip },
  data: function () {
    return {
      isDisabled: false,
      formdata: {},
      bizType: '01',
      finaParms: {
        title: '选择财务机构',
        queryFields: [
          {
            placeholder: '财务机构编号',
            field: 'finaBrId',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '财务机构名称',
            field: 'finaBrIdName',
            type: 'input',
            fuzzyQuery: 'both'
          }
        ],
        dataUrl: `${backend.cmisBiz}/api/pvpaccpapp/`,
        tableColumns: [{ label: '财务机构编号', prop: 'finaBrId' }, { label: '财务机构名称', prop: 'finaBrIdName' }]
      },
      issuParms: {
        title: '选择签发机构',
        queryFields: [
          {
            placeholder: '签发机构编号',
            field: 'issuedOrgNo',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '签发机构名称',
            field: 'issuedOrgName',
            type: 'input',
            fuzzyQuery: 'both'
          }
        ],
        dataUrl: `${backend.cmisBiz}/api/pvpaccpapp/`,
        tableColumns: [{ label: '签发机构编号', prop: 'issuedOrgNo' }, { label: '签发机构名称', prop: 'issuedOrgName' }]
      },
      payParms: {
        title: '选择兑付机构',
        queryFields: [
          {
            placeholder: '兑付机构编号',
            field: 'payOrgNo',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '兑付机构名称',
            field: 'payOrgName',
            type: 'input',
            fuzzyQuery: 'both'
          }
        ],
        dataUrl: `${backend.cmisBiz}/api/pvpaccpapp/`,
        tableColumns: [{ label: '兑付机构编号', prop: 'payOrgNo' }, { label: '兑付机构名称', prop: 'payOrgName' }]
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
      prdCode: '',
      isShowButton: true,
      isShow: false, // 小助手是否展示
      topOutsystemCode: 'CDHPDY;CDHPZY;CDHPBZDB;CDHPDCCZ;',
      topOutsystemCodeCopy: 'CDHPCZJB'
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted () {
    var _this = this;
    let data = {};
    var pvpSerno = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      pvpSerno = data.bizId;
      _this.op = 'VIEW';
      let contNo = data.param.contNo;
      // 提示临时库位号
      let nodeId = _this.getFactory().contextData.instanceInfo.nodeId;
      if (nodeId == '245_9' || nodeId == '245_11') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/centralfileinfo/selectByModel',
          data: { condition: JSON.stringify({traceId: contNo})},
          callback: function (code, message, response) {
            if (response.data != null && response.data.length > 0) {
              let str = '';
              response.data.forEach(function (item) {
                if (str == '') {
                  str = item.tempLocationNo;
                } else {
                  str = str + ',' + item.tempLocationNo;
                }
              });
              if (str != '') {
                _this.$xutils.showMsgBox('提示', '合同影像资料已经存在临时库位中,临时库位号为:' + str, 350, 150);
              }
            }
          }});
      }
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      pvpSerno = data.pvpSerno;
      _this.op = data.op;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      pvpSerno = data.pvpSerno;
      _this.op = data.op;
    }
    // 进入初始化
    if (_this.op == 'VIEW' || _this.op == 'view') {
      this.isDisabled = true;
      this.isShowButton = false;
    }
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpaccpapp/showdetial',
      data: { pvpSerno: pvpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        _this.formdata.overdueRate = 18;
        _this.prdCode = response.data.prdId;
        _this.isPvpAccpWhiteMenu(_this.formdata.cusId);
      }
    });
  },

  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 判断客户是不是银票签发白名单
    isPvpAccpWhiteMenu (cusId) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cuslstypqfwhiteapp/query',
        data: { condition: JSON.stringify({cusId: cusId, approveStatus: '997'})},
        callback: function (code, message, response) {
          let responseList = response.data;
          if (responseList.length > 0) {
            _this.$message({showClose: true, message: '该客户属于银票签发白名单客户!', type: 'success'});
          }
        }
      });
    },

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
     * 选择财务机构
     */
    selectCont: function (arr) {
      this.formdata.finaBrIdName = arr[0].finaBrIdName;
      this.formdata.finaBrId = arr[0].finaBrId;
    },

    // 自动计算保证金金额
    appAmtChange () {
      var _this = this;
      var appAmt = _this.formdata.appAmt;
      _this.formdata.bailAmt = parseFloat(parseFloat(appAmt) * parseFloat(_this.formdata.bailPerc));
      _this.formdata.chrgAmt = parseFloat(parseFloat(appAmt) * parseFloat(_this.formdata.chrgRate));
    },

    // 保存
    save: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/pvpaccpapp/commonupdatepvpaccpapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/pvpaccpapp/commonupdatepvpaccpapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // 提交
    commit () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/pvpaccpapp/commonupdatepvpaccpapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.submitFn();
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    submitFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      let loginUser = _this.$xutils.getLoginUserInfo();
      var instuCde = loginUser.instu.code;
      var orgCode = loginUser.orgCode;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX012';
      if (orgCode.startsWith('80')) {
        startdto.bizType = 'SGD03';
      }
      if (orgCode.startsWith('81')) {
        startdto.bizType = 'DHD03';
      }
      startdto.bizId = model.pvpSerno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {
        contAmt: model.contAmt,
        approveStatus: model.approveStatus,
        contNo: model.contNo,
        cusId: model.cusId,
        op: 'VIEW',
        replyNo: model.replyNo,
        topOutsystemCode: _this.topOutsystemCode,
        topOutsystemCodeCopy: _this.topOutsystemCodeCopy,
        imageParams: {
          contid: model.contNo,
          businessid: model.pvpSerno,
          docid: model.pvpSerno
        },
        imageCopyParams: {
          contid: model.contNo,
          businessid:  model.wyImageSerno,
          docid: model.pvpSerno
        },
      };
      startdto.bizParam4 = model.pvpSerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    getAccpOrg () {
      let jsoPar = this.formdata;
      // var _this = this;
      // let managerBrId = jsoPar.managerBrId;
      // if (managerBrId == null || managerBrId == '') {
      //   _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      let aorgNo = jsoPar.aorgNo;
      // if (aorgNo == null || aorgNo == '') {
      //   _this.$xutils.showMsgBox('提示', '承兑行行号不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      var data = { aorgNo: aorgNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.aorgNo = params.bankNo;
        this.$refs.refForm.formdata.aorgName = params.bankName;
      });
    },
    // 选取开票人账户
    getAccpDaorg: function () {
      var _this = this;
      let jsoPar = this.formdata;
      if (!jsoPar.daorgNo) {
        _this.$message({
          message: '请先输入结算帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { acctNo: jsoPar.daorgNo };
      this.$dialog.open('', 'zrcbank/biz/common/commonEndAccount', 1000, 800, data, params => {
        this.$refs.refForm.formdata.daorgNo = params.kehuzhao;
        this.$refs.refForm.formdata.daorgName = params.zhhuzwmc;
      });
    },
    // 查看合同详情
    viewCont () {
      var _this = this;
      var jsoPar = {};
      var contNo = _this.formdata.contNo;
      jsoPar['contNo'] = contNo;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpaccpapp/showDetialByContNo',
        data: { contNo: contNo },
        callback: function (code, message, response) {
          if (response.data != null) {
            jsoPar['serno'] = response.data.iqpSerno;
            jsoPar['model_group_no'] = 'CMG000435';
          }
        }
      });
      _this.jumpContFactory(jsoPar);
    },

    jumpContFactory (jsoPar) {
      jsoPar['op'] = 'VIEW';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '合同详情',
        data: jsoPar
      });
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
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
    },
    // 取消
    cancelFn: function () {
      this.back();
    },

    back () {
      yufp.router.removeTab(this.$route.path);
    },

    afterCommitCallBack () {
      this.back();
    }
  }
};
</script>
