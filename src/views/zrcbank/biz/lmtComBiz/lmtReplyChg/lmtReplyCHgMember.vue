
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
        <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="批复编号" disabled ctype="input" name="replySerno"></yu-xform-item>
              <yu-xform-item label="批复生效日期" disabled ctype="input" name="replyInureDate"></yu-xform-item>
              <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_APPR_MODE"></yu-xform-item>
              <yu-xform-item label="审批机构" disabled ctype="select" name="finalApprBrId"></yu-xform-item>
              <yu-xform-item label="审批结论" disabled ctype="select" name="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              <yu-xform-item label="批复状态" disabled ctype="select" name="replyStatus" data-code="STD_XD_REPLY_STATUS"></yu-xform-item>
              <yu-xform-item label="责任人" disabled ctype="input" name="managerIdName"></yu-xform-item>
              <yu-xform-item label="责任机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
            </yu-xform-group>
            <yu-panel title="授信额度情况" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="用信审核方式" disabled ctype="select" name="loanApprMode" data-code="STD_ZB_USE_LIMIT_AUDIT_MODE"></yu-xform-item>
                <yu-xform-item label="币种" disabled ctype="select" name="curType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
                <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm" :disabled="newDefined"></yu-xform-item>
                <yu-xform-item label="宽限期（月）" ctype="input" name="lmtGraperTerm" :disabled="newDefined"></yu-xform-item>
                <yu-xform-item label="敞口额度合计（元）" disabled ctype="input" name="openTotalLmtAmt"></yu-xform-item>
                <yu-xform-item label="低风险额度合计（元）" disabled ctype="input" name="lowRiskTotalLmtAmt"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" v-show="formdata.consignorCusId">
              <yu-xform-group>
                <yu-xform-item label="委托人客户编号" disabled ctype="input" name="consignorCusId"></yu-xform-item>
                <yu-xform-item label="委托人客户名称" disabled ctype="input" name="consignorCusName"></yu-xform-item>
                <yu-xform-item label="委托人证件类型" disabled ctype="select" name="consignorCertType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
                <yu-xform-item label="委托人证件号码" disabled ctype="input" name="consignorCertNo"></yu-xform-item>
                <yu-xform-item label="委托人类型" disabled ctype="select" name="consignorType" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-panel>
        <yu-panel title="授信批复分项明细" :hideFilter="false" :collapseHide="false">
          <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                     :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
            <yu-xtable-column prop="lmtChgDrawNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="lmtChgDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
            <yu-xtable-column prop="todo" label="操作" width="120">
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" v-if="scope.row.isRevolvLimit !='1'&&scope.row.isRevolvLimit !='0'&&type!='VIEW'" @click="editSub(scope.row)">修改</a>
                <a class="underline" style="text-decoration:none" v-if="scope.row.isRevolvLimit !='1'&&scope.row.isRevolvLimit !='0'" @click="viewSub(scope.row)">查看</a>
              </template>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
          <yu-form-buttons align="left">
            <yu-button @click="condAdd" type="primary" round>新增</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refDrawTable" row-number condition-key="condition" border request-type="POST" :data-url="dataUrl" :base-params="baseParams" width="1000" :pageable="false">
            <yu-xtable-column label="具体内容" prop="condDesc" width="1000" align="center" ctype="input"></yu-xtable-column>
            <yu-xtable-column label="操作" prop="opr" align="center">
              <template slot-scope="drawScope">
                <yu-button size="small" type="primary" @click="condSave(drawScope.row)">保存</yu-button>
                <yu-button size="small" type="danger" @click.stop="condDelete(drawScope.row)">删除</yu-button>
              </template>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="贷后管理要求" :hideFilter="false" :collapseHide="false">
          <yu-xform v-model="pspManadata">
            <yu-xform-item label="贷后管理要求" ctype="textarea" name="pspManaNeed" :disabled="newDefined"></yu-xform-item>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="updateReplyChg" :disabled="newDefined">保存</yu-button>
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-form-buttons>

    <yu-dialog title="" :visible.sync="dialogTableVisible" :min-height="800" center="true">
      <div>
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdataSub" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-xform-group :column="2">
            <yu-xform-item label="分项流水号" ctype="input" name="subSerno" placeholder="分项流水号" hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" disabled="true"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" disabled="true"></yu-xform-item>
            <yu-xform-item label="授信金额" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" placeholder="授信金额" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarMode" :disabled="disabled" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-if="type!='VIEW'" type="primary" @click="onSave">保存</yu-button>
          <yu-button type="primary" @click="onBackFn">返回</yu-button>
        </yu-form-buttons>
      </div>
        <div>
          <yu-toolbar>
            <yu-button  @click="addSubPrdFn" v-show="showFn">新增</yu-button>
            <yu-button  @click="modifySubPrdFn" v-show="showFn">修改</yu-button>
            <yu-button @click="viewSubPrd">查看</yu-button>
            <yu-button  @click="deleteSubPrd" v-show="showFn">删除</yu-button>
          </yu-toolbar>
        <yu-xtable :data="lmtAppSubPrdList" ref="refPrdTable" row-number condition-key="condition" :pageable="true" requestType="POST">
          <yu-xtable-column label="授信分项品种流水号" prop="subPrdSerno"></yu-xtable-column>
          <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
          <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="授信额度（元）" prop="lmtAmt"></yu-xtable-column>
          <yu-xtable-column label="额度期限（月）" prop="lmtTerm"></yu-xtable-column>
        </yu-xtable>
      </div>
    </yu-dialog>
    <yu-dialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" :min-height="800" center="true">
      <div>
        <yu-xform ref="prdRefForm" label-width="120px" :form-type="formType" v-model="formdataPrd" :form-change="triggerEditChangeEvent">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
            <yu-xform-item label="授信金额" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" :disabled="prdDisabled"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" :disabled="prdDisabled"></yu-xform-item>
            <yu-xform-item label="额度期限" ctype="input" name="lmtTerm" :disabled="prdDisabled"></yu-xform-item>
            <yu-xform-item label="授信品种名称" ctype="input" name="lmtBizTypeName" :disabled="prdDisabled"></yu-xform-item>
            <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" :disabled="prdDisabled"  data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" :disabled="prdDisabled"  data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled="true"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" disabled="true"></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" disabled="true"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updDate" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-if="type!='VIEW'" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="backFn">返回</yu-button>
        </yu-form-buttons>
      </div>
    </yu-dialog>
     <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { mapGetters } from 'vuex';
// import func from 'vue-editor-bridge';
yufp.lookup.reg('STD_ZB_APPR_ST,STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_ZB_LMT_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_USE_LIMIT_AUDIT_MODE,STD_ZB_GUAR_WAY,STD_XD_REPLY_STATUS');
export default {
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      newDefined: false,
      formdata: {},
      pspManadata: {},
      chgdata: {},
      replyChg: {},
      replySubList: [],
      serno: '',
      dataUrl: this.$backend.cmisBiz + '/api/lmtreplychgcond/queryByCondition',
      baseParams: {condition: JSON.stringify({serno: this.$route.params.serno || this.bizPageData.instanceInfo}) },
      pagedata: false,
      nodeHistory: [],
      activeNames: [],
      commentinfo: '',
      getComments: backend.workflowService + '/api/core/getAllCommentsByBizId/',
      lmtType: '',
      formdataSub: {},
      formdataPrd: {},
      dialogTableVisible: false,
      disabled: false,
      showFn: false,
      lmtAppSubPrdList: [],
      dialogVisible: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      viewType: 'DETAIL',
      prdDisabled: false
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    // 待办流程进入
    if (_this.bizPageData) {
      data = _this.bizPageData.instanceInfo;
      _this.serno = data.bizId;
      _this.newDefined = true;
    } else {
      data = _this.$route.params;
      _this.serno = data.serno;
      let op = _this.$route.params.viewType;
      if (op == 'view') {
        _this.newDefined = true;
      }
    }
    _this.getAllReplyData(_this.serno);
    _this.AfterInit();
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  methods: {
    AfterInit () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.getComments,
        data: {
          bizId: _this.serno
        },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              _this.commentinfo = '';
              var nodeHistory = response.data;
              // commentSign翻译
              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                // _this.activeNames[i] = (i + 1).toString();
                nodeHistory[i].commentSign = yufp.lookup.convertKey('OP_TYPE', nodeHistory[i].commentSign);
                // 时间格式化
                // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
              }
              _this.nodeHistory = nodeHistory;
            } else {
              _this.commentinfo = '暂无审批历史数据';
              _this.pagedata = true;
            }
          }
        }
      });
    },

    getAllReplyData: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: serno,
        url: backend.cmisBiz + '/api/lmtreplychg/getAllReplyChgInfo',
        callback: function (code, message, response) {
          debugger;
          _this.$refs.refForm.setFormData(response.data.lmtReplyChg);
          yufp.extend(_this.formdata, response.data.lmtReplyChg);
          yufp.extend(_this.pspManadata, response.data.lmtReplyChg);
          yufp.extend(_this.chgdata, response.data.lmtReplyChg);
          _this.replySubList = response.data.lmtReplyChgSubDtos;
        }
      });
    },

    // 新增 用信条件表格数据行
    condAdd () {
      this.$refs.refDrawTable.clearValidateMessage();
      this.pushRefTable1Row();
    },

    // 添加数据 添加一条空白数据
    pushRefTable1Row: function () {
      let isRefTable1ValidateOk = false;
      this.$refs.refDrawTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTable1ValidateOk = true;
        }
      });
      if (isRefTable1ValidateOk) {
        let row = {serno: this.serno, condType: '001'};
        // this.currentDrawTableRow.push(row);
        this.$refs.refDrawTable.tabledata.push(row);
        this.$refs.refDrawTable.setCurrentRow(row);
      }
    },

    // 用信条件删除
    condDelete: function (index, row) {
      var _this = this;
      if (!index.pkId) {
        _this.replyLoanConds.splice(index, 1);
        _this.$message('请选择一条记录');
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtreplychgcond/delete/' + index.pkId,
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.$message('删除成功');
              _this.$refs.refDrawTable.remoteData(_this.serno);
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },

    // 用信条件保存
    condSave: function (index, row) {
      var _this = this;
      index['serno'] = _this.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplychgcond/',
        data: index,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            _this.$refs.refDrawTable.remoteData(_this.serno);
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },

    // 更新变更表
    updateReplyChg () {
      var _this = this;
      _this.replyChg['pkId'] = _this.formdata.pkId;
      _this.replyChg['lmtTerm'] = _this.formdata.lmtTerm;
      _this.replyChg['lmtGraperTerm'] = _this.formdata.lmtGraperTerm;
      _this.replyChg['replyChgContentMemo'] = _this.chgdata.replyChgContentMemo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplychg/modifyReplyChg',
        data: _this.replyChg,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('暂存成功');
            _this.$refs.refDrawTable.remoteData(_this.serno);
          } else {
            _this.$message('暂存失败');
          }
        }
      });
    },

    docommit () {
      var _this = this;
      _this.replyChg['pkId'] = _this.formdata.pkId;
      _this.replyChg['lmtTerm'] = _this.formdata.lmtTerm;
      _this.replyChg['lmtGraperTerm'] = _this.formdata.lmtGraperTerm;
      _this.replyChg['replyChgContentMemo'] = _this.chgdata.replyChgContentMemo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplychg/modifyReplyChg',
        data: _this.replyChg,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            _this.$refs.refDrawTable.remoteData(_this.serno);
          } else {
            _this.$message('保存失败');
          }
        }
      });
      // 提交
      var model = {};
      yufp.clone(_this.formdata, model);
      var startdto = {};
      startdto.systemId = 'cmis';
      // startdto.orgId = model.managerBrId;
      // startdto.userId = model.managerId;
      const loginUser = _this.$xutils.getLoginUserInfo();
      var instuCde = loginUser.instu.code;
      var orgCode = loginUser.orgCode;
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'SX022';
      if (orgCode.startsWith('80')) {
        startdto.bizType = 'SGC15';
      }
      if (orgCode.startsWith('81')) {
        startdto.bizType = 'DHC15';
      }
      startdto.bizId = model.serno;
      startdto.bizUserName = this.userName;
      startdto.bizUserId = model.managerId;
      startdto.param = {
        startOrgId: model.managerBrId
      };
      startdto.bizParam4 = model.replySerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 返回
    goBack () {
      this.$router.back();
      yufp.router.removeTab(this.$route.path);
    },

    /**
      *修改分项信息
      */
    editSub: function (data) {
      var _this = this;
      _this.innitSubPrdTable(data.subSerno);
      _this.dialogTableVisible = true;
      _this.disabled = false;
      _this.showFn = true;
      _this.$nextTick(function () {
        yufp.clone(data, _this.formdataSub);
      });
    },

    /**
      *查看分项信息
      */
    viewSub: function (data) {
      var _this = this;
      _this.innitSubPrdTable(data.subSerno);
      _this.dialogTableVisible = true;
      _this.disabled = true;
      _this.showFn = false;
      _this.$nextTick(function () {
        yufp.clone(data, _this.formdataSub);
      });
    },

    /**
     * 初始化授信适用产品列表
     */
    innitSubPrdTable: function (subSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplychgsubprd/selectbysubserno',
        data: subSerno,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message('操作成功');
            _this.lmtAppSubPrdList = response.data;
          } else {
            _this.$message('操作失败');
            return;
          }
        }
      });
    },

    // 返回按钮
    onBackFn: function () {
      var _this = this;
      _this.dialogTableVisible = false;
    },

    // 保存按钮
    onSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataSub, model);
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplychgsub/updatelmtreplychgsub',
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.erorcd == '0000') {
              _this.$message({ message: '保存成功', type: 'success' });
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

    // 控制保存按钮，表单的类型
    switchStatus: function (viewType) {
      var _this = this;
      _this.viewType = viewType;
    },

    // 新增
    addSubPrdFn: function () {
      var _this = this;
      _this.switchStatus('ADD');
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        const loginUser = this.$xutils.getLoginUserInfo();
        _this.$refs.prdRefForm.resetFields();
        _this.formdataPrd.cusId = this.formdataSub.cusId;
        _this.formdataPrd.cusName = this.formdataSub.cusName;
        _this.formdataPrd.subSerno = this.formdataSub.subSerno;
        _this.formdataPrd.inputId = loginUser.loginCode;
        _this.formdataPrd.inputBrId = loginUser.orgCode;
        _this.formdataPrd.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
        _this.formdataPrd.updId = loginUser.loginCode;
        _this.formdataPrd.updBrId = loginUser.orgCode;
        _this.formdataPrd.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      });
    },

    // 修改
    modifySubPrdFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refPrdTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      _this.switchStatus('EDIT');
      _this.dialogVisible = true;
      _this.prdDisabled = false;
      _this.$nextTick(function () {
        _this.$refs.prdRefForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdataPrd);
      });
    },

    // 查看
    viewSubPrd: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refPrdTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      _this.switchStatus('DETAIL');
      _this.dialogVisible = true;
      _this.prdDisabled = true;
      _this.$nextTick(function () {
        _this.$refs.prdRefForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdataPrd);
      });
    },

    // 删除
    deleteSubPrd: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refPrdTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 获得选中的表格数据
      yufp.clone(selectionsAry[0], model);
      // 如果未选中表格数据，则弹出提示
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            model.oprType = '02';
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisBiz + '/api/lmtreplychgsubprd/update',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.innitSubPrdTable(model.subSerno);
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataPrd, model);
      var validate = false;
      _this.$refs.prdRefForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/lmtreplychgsubprd/insert';
      if (_this.viewType == 'EDIT') {
        url = backend.cmisBiz + '/api/lmtreplychgsubprd/update';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          // 刷新列表
          // _this.$refs.refPrdTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
          _this.innitSubPrdTable(model.subSerno);
        }
      });
    },

    // 返回
    backFn: function () {
      var _this = this;
      _this.dialogVisible = false;
      _this.$refs.refPrdTable.remoteData();
    }
  }
};

</script>
