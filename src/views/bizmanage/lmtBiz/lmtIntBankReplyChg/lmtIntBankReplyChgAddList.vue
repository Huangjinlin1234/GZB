
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-xform ref="refForm" label-width="160px" v-model="formdata">
      <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="批复编号" disabled ctype="input" name="replySerno"></yu-xform-item>
          <yu-xform-item label="批复生效日期" disabled ctype="input" name="startDate"></yu-xform-item>
          <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
          <yu-xform-item label="审批结论" disabled ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          <yu-xform-item label="批复状态" disabled ctype="select" name="replyStatus" data-code="STD_REPLY_STATUS"></yu-xform-item>
          <yu-xform-item label="责任人" disabled ctype="input" name="managerIdName"></yu-xform-item>
          <yu-xform-item label="责任机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
        </yu-xform-group>

      </yu-panel>
      <yu-panel title="授信额度情况" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="总额度合计（万元）" label-width="160px" disabled ctype="yu-num" number-formatter="0,000" name="lmtAmt"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" v-show="newDefined1" @click="updateFn">修改</yu-button>
          <yu-button type="primary" v-show="newDefined1" @click="selectFn">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" row-number selection-type="radio" :data-url="dataUrl" :pageable="false" :base-params="dataParam" request-type="POST">
          <yu-xtable-column prop="subSerno" label="授信分项流水号" width="200"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信分项额度名称" width="200"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信额度（万元）">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="curType" label="币种" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column prop="isRevolv" label="是否循环" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="期限（月）"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xform>
    <yu-panel title="变更情况说明" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm1" label-width="160px" v-model="chgdata" :rules="rules">
        <yu-xform-group :column="2">
          <yu-xform-item label="变更流水号" disabled ctype="input" name="serno"></yu-xform-item>
          <yu-xform-item label="登记日期" disabled ctype="input" name="inputDate"></yu-xform-item>
          <yu-xform-item label="变更事项说明" ctype="textarea" name="replyChgContentMemo" colspan="15" :autosize="{ minRows: 10}" :disabled="newDefined"></yu-xform-item>
          <yu-xform-item label="登记人" disabled ctype="input" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" disabled ctype="input" name="inputBrIdName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="doSave" v-show="newDefined1">保存</yu-button>
      <yu-button type="primary" @click="doSubmit" v-show="newDefined1">提交</yu-button>
      <yu-button type="primary" @click="goBack">返回</yu-button>
    </yu-form-buttons>

    <!-- 弹层 -->
    <yu-xdialog title="分项批复变更申请" :visible.sync="dialogVisible" width="1000px">
      <yu-xform ref="refFormDialog" label-width="160px" v-model="formdataDialog">
        <yu-xform-group :column="2">
          <yu-xform-item label="授信分项流水号" name="subSerno" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="授信分项额度名称" name="lmtBizTypeName" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="授信额度（万元)" name="lmtAmt" rules="number" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
          <yu-xform-item label="币种" name="curType" rules="required" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="是否循环" name="isRevolv" rules="required" data-code="STD_ZB_YES_NO" ctype="select" :disabled="formDisabled"></yu-xform-item>
          <yu-xform-item label="期限（月)" name="lmtTerm" rules="number" ctype="input" :disabled="formDisabled"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveBtn">保存</yu-button>
          <yu-button  type="primary" @click="canclFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {numFn} from '@/utils/unitchange';
yufp.lookup.reg(
  'STD_ZB_APPR_STATUS,STD_REPLY_STATUS,STD_ZB_CUR_TYP,STD_ZB_YES_NO'
);
export default {
  name: 'LmtIntBankReplyChgAddList',
  components: { YufpDemoSelector, yufpNwfInit },
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      newDefined: false,
      newDefined1: true,
      formdata: {},
      formdataDialog: {},
      chgdata: {},
      replyChg: {},
      serno: '',
      dataUrl: '',
      dataParam: '',
      accNo: '',
      dialogVisible: false,
      formDisabled: false,
      saveBtnShow: true,
      op: '',
      rules: {
        replyChgContentMemo: [
          { required: true, message: '请输入变更事项说明', trigger: 'blur' }
        ]
      },
      numFn
    };
  },
  created () {
    var _this = this;
    if (this.pageParams) {
      this.serno = this.pageParams.serno;
      this.op = this.pageParams.op;
      this.cusId = this.pageParams.cusId;
    } else if (this.$route.meta.params) {
      _this.serno = _this.$route.meta.params.serno;
      _this.replySerno = _this.$route.meta.params.replySerno;
      _this.op = this.$route.meta.params.viewType;
    }
    if (this.op == 'DETAIL') {
      this.newDefined = true;
      this.newDefined1 = false;
    }
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      var accNo = '';
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtintbankreplychg/selectBySerno',
        data: JSON.stringify({ serno: _this.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            accNo = response.data.accNo;
            // 反显字段
            yufp.clone(response.data, _this.formdata);
            yufp.clone(response.data, _this.chgdata);
            _this.formdata.lmtAmt = parseFloat(
              parseFloat((response.data.lmtAmt * 1) / 10000).toFixed(0)
            );
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
      // 表格反显
      _this.dataUrl =
        _this.$backend.cmisBiz + '/api/lmtintbankreplychgsub/selectBySerno';
      _this.dataParam = { condition: JSON.stringify({ serno: _this.serno }) };
    },

    // 显示弹窗
    updateFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
        _this.formdataDialog.lmtAmt = parseFloat(
          parseFloat(selectionAry[0].lmtAmt / 10000).toFixed(6)
        );
      });
      _this.formDisabled = false;
      _this.saveBtnShow = true;
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    selectFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
        _this.formdataDialog.lmtAmt = parseFloat(
          parseFloat(selectionAry[0].lmtAmt / 10000).toFixed(6)
        );
      });
      _this.formDisabled = true;
      _this.saveBtnShow = false;
    },
    // 保存  分项批复变更申请
    saveBtn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }

      var str = String(_this.formdataDialog.lmtAmt).split('.');
      console.log('=======', str);
      if (str[1] != undefined) {
        if (str[1].length > 6) {
          _this.$message({
            message: '请重新输入授信金额(最多保留6位小数)',
            type: 'error'
          });
          return;
        }
      }

      _this.formdataDialog.lmtAmt = parseFloat(
        parseFloat(_this.formdataDialog.lmtAmt * 10000).toFixed()
      );
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/lmtintbankreplychgsub/updateReplyChgSub',
        data: _this.formdataDialog,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('操作成功');
            _this.dialogVisible = false;
            _this.init();
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    doSave: function () {
      return new Promise((resolve, reject) => {
        var _this = this;
        var validate = false;
        _this.$refs.refForm1.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdata.lmtAmt = parseFloat(
          parseFloat(_this.formdata.lmtAmt * 10000).toFixed(2)
        );
        _this
          .$request({
            method: 'POST',
            url: _this.$backend.cmisBiz + '/api/lmtintbankreplychg/updateReplyChg',
            data: {
              condition: JSON.stringify({
                lmtAmt: _this.formdata.lmtAmt,
                replyChgContentMemo: _this.chgdata.replyChgContentMemo,
                serno: _this.chgdata.serno
              })
            }
          })
          .then((data) => {
            if (data.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              resolve();
            } else {
              _this.$message({ message: '保存失败', type: 'error' });
            }
          });
      });
    },
    // 提交操作
    doSubmit () {
      this.doSave().then(res => {
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
        startdto.bizType = 'TY007'; // 修改为同业授信申请流程code
        startdto.bizId = obj.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = obj.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = obj.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.bizPkId = obj.pkId;
        startdto.param = {
          userId: this.$store.state.oauth.loginCode,
          BizPkId: obj.pkId,
          dutyOrgType: loginUser.org.orgType, // 客户经理所属机构类型  分行、支行、小微、非客户经理
          dutys: dutysArry.join(',')
        };
        startdto.param.tableName = 'lmtIntBankReplyChg';
        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    forceUpdate () {
      this.goBack();
    },
    // 返回
    goBack: function () {
      yufp.globalEventBus.$emit('refreshLmtIntbankChgTable');
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
