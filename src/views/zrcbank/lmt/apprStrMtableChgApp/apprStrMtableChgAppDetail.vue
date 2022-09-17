import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="额度信息" name="base">
        <yu-panel title="额度信息" panel-type="simple">
          <yu-xform ref="refAsmcaForm" label-width="120px" v-model="formdata" :disabled="formDisabled" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="批复编号" name="apprSerno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信总额" name="totalAvlAmt" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信总额已用" name="totalUsedAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信总额可用" name="" ctype="custom" disabled>
                <template>
                  <span>{{ parseFloat(parseFloat(formdata.totalAvlAmt - formdata.totalUsedAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="授信敞口" name="totalSpacAmt" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信敞口已用" name="totalSpacUsedAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信敞口可用" name="" ctype="custom" disabled>
                <template>
                  <span>{{ parseFloat(parseFloat(formdata.totalSpacAmt - formdata.totalSpacUsedAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="saveBtnShow"   type="primary" @click="submitFn">提交</yu-button>
              <yu-button   type="primary" @click="tabcancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="额度明细" name="ApprCoopSubChgApp">
        <yu-panel title="批复额度分项基础信息调整申请" panel-type="simple">
          <yu-button-drop>
            <yu-button v-show="saveBtnShow" @click="modifyFn" type="primary">修改</yu-button>
            <yu-button @click="infoFn" type="primary">详情</yu-button>
            <yu-button v-show="saveBtnShow" @click="addLcrcaFn" type="primary">新增占用合同信息</yu-button>
          </yu-button-drop>
          <yu-xtable ref="ApprLmtSubChgAppTable" row-number row-key="pkId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="loadList" lazy :data-url="urls.ApprLmtSubChgAppUrl" :base-params="indirectParam" :default-load="false" requestType="POST">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="apprSerno"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="apprSubSerno"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="limitSubName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="apprDate"></yu-xtable-column>
            <yu-xtable-column label="宽限期" prop="lmtGraper"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
            <yu-xtable-column label="是否预授信" prop="isPreCrd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="outstndAmt"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="avlAmt"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="spacAmt"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="spacOutstndAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="spacAvlAmt"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="1200px">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata2" :disabled="dialogformDisabled">
            <yu-xform-group>
              <yu-xform-item label="批复台账编号" name="subAppSerno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="批复分项编号" name="apprSubSerno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信品种名称" name="limitSubName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信批复总额" name="avlAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信总额累加" name="lmtAmtAdd" ctype="input"></yu-xform-item>
              <yu-xform-item label="授信总额已用" name="outstndAmt" ctype="input"></yu-xform-item>
              <yu-xform-item label="授信总额可用" name="" ctype="custom" disabled>
                <template>
                  <span>{{ parseFloat(parseFloat(formdata2.avlAmt + formdata2.lmtAmtAdd - formdata2.outstndAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="批复保证金比例" name="bailPreRate" ctype="yu-num" unit="%" disabled></yu-xform-item>
              <yu-xform-item label="授信敞口" name="spacAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信敞口已用" name="spacOutstndAmt" ctype="input"></yu-xform-item>
              <yu-xform-item label="授信敞口可用" name="" ctype="custom" disabled>
                <template>
                  <span>{{ parseFloat(parseFloat(formdata2.spacAmt - formdata2.spacOutstndAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="已出账金额" name="pvpOutstndAmt" ctype="input"></yu-xform-item>
              <yu-xform-item label="可出账金额" name="avlOutstndAmt" ctype="input"></yu-xform-item>
              <yu-xform-item label="用信余额" name="loanBalance" ctype="input"></yu-xform-item>
              <yu-xform-item label="用信敞口余额" name="loanSpacBalance" ctype="input"></yu-xform-item>
              <yu-xform-item label="额度起始日" name="startDate" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="额度到期日" name="lmtDate" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="是否可循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
              <yu-xform-item label="额度状态" name="status" ctype="select" data-code="STD_ZB_APPR_ST" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="dialogsaveBtnShow"  type="primary" @click="dialogsaveFn">保存</yu-button>
              <yu-button type="primary" @click="dialogcancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-tab-pane>
      <yu-tab-pane label="占用合同信息" name="LmtContRelChgApp">
        <lmtContRelChgApp ref="LmtContRelChgApp" @addCarcaFn="addCarcaFn" :pageParams="pageDataParam"></lmtContRelChgApp>
      </yu-tab-pane>
      <yu-tab-pane label="合同下台账信息" name="ContAccRelChgApp">
        <contAccRelChgApp ref="ContAccRelChgApp" :pageParams="pageDataParam"></contAccRelChgApp>
      </yu-tab-pane>
      <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
    </yu-tabs>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { dateFormat } from '@/utils';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import lmtContRelChgApp from '@/views/zrcbank/lmt/lmtContRelAndContAccRel/lmtContRelChgApp';
import contAccRelChgApp from '@/views/zrcbank/lmt/lmtContRelAndContAccRel/contAccRelChgApp';
yufp.lookup.reg('STD_ZB_LMT_TYPE,STD_ZB_YES_NO,STD_ZB_BIZ_ATTR,STD_CONT_TYP,STD_ZB_BIZ_STATUS,STD_ZB_APPR_ST,STD_PARTNER_TYPE,STD_ZB_ASSURE_MEANS,STD_PRD_TYPE_PROP');

export default {
  components: { YufpDemoSelector, yufpNwfInit, lmtContRelChgApp, contAccRelChgApp },
  props: {
    bizPageData: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      tabName: 'base',
      formDisabled: true,
      saveBtnShow: false,
      dialogsaveBtnShow: false,
      urls: {
        // 额度明细Url
        ApprLmtSubChgAppUrl:
          backend.cmisLmt + '/api/apprlmtsubchgapp/querySubChgAppBySerno'
      },
      dataParam: {},
      dialogVisible: false,
      viewTypeMain: 'DETAIL',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      indirectParam: {},
      formdata: {},
      formdata2: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    } else if (this.bizPageData) {
      this.dataParam.appSerno = this.bizPageData.instanceInfo.bizId;
    }
    this.pageDataParam = this.dataParam;
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
    var timeDt = new Date();
    _this.updDate = dateFormat(timeDt, '{y}-{m}-{d}');
    _this.updateTime = dateFormat(timeDt, '{y}-{m}-{d} {h}:{i}:{s}');
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.viewTypeMain = this.data.viewTypeMain;
      _this.pkId = this.data.pkId;
      _this.apprSerno = this.data.apprSerno;
      _this.appSerno = this.data.appSerno;
      _this.formDisabled = true;
      if (_this.viewTypeMain == 'EDIT' || _this.viewTypeMain == 'ADD') {
        _this.saveBtnShow = true;
        _this.dialogsaveBtnShow = true;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisLmt + '/api/apprstrmtablechgapp/queryStrChgAppBySerno',
        data: { condition: JSON.stringify({ oprType: '01', appSerno: _this.appSerno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
        }
      });
      _this.indirectParam = { condition: JSON.stringify({ subAppSerno: _this.appSerno, oprType: '01' }) };
    },

    /**
     * 流程提交节点选择框
     */
    submitFn: function () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      startdto.userId = _this.formdata.inputId;
      startdto.bizType = 'ED001';// 单一客户额度调整申请
      startdto.bizId = _this.formdata.appSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        money: _this.formdata.totalAvlAmt,
        cusType: _this.formdata.cusType,
        startOrgId: _this.formdata.inputBrId,
        bizPkId: _this.formdata.pkId
      };
      startdto.bizParam4 = _this.appSerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    loadList (tree, treeNode, resolve) {
      var _this = this;
      var apprSubSerno = tree.apprSubSerno;
      if (apprSubSerno) {
        // 向后台发送请求
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprlmtsubchgapp/querySubDetailsChgAppBySerno',
          data: { condition: JSON.stringify({ subAppSerno: _this.appSerno, parentId: apprSubSerno, oprType: '01' }) },
          callback: function (code, message, response) {
            if (code == 0) {
              var arr = response.data || [];
              resolve(arr);
            }
          }
        });
      }
    },

    /**
     * 取消
     */
    tabcancelFn: function () {
      var _this = this;
      if (_this.$route.meta.params) {
        let routeKey = _this.$route.meta.params.routeKey;
        yufp.router.removeTab('/zrcbank/lmt/apprStrMtableChgApp/apprStrMtableChgAppDetail/' + routeKey);
      } else {
        _this.$store.dispatch('tagsView/delView', this.$route); // 标签页 关闭
        _this.$router.go(-1);
      };
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogsaveBtnShow = editable;
      _this.dialogVisible = true;
      _this.dialogformDisabled = !editable;
    },

    /**
     * dialogsaveFn保存
     */
    dialogsaveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata2, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = _this.loginCode;
      model.updBrId = _this.org.code;
      model.updDate = _this.updDate;
      model.updateTime = _this.updateTime;
      // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/apprlmtsubchgapp/update';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.ApprLmtSubChgAppTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
          _this.dialogVisibleadd = false;
          _this.init();
        }
      });
    },

    /**
     * dialogcancel取消
     */
    dialogcancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.ApprLmtSubChgAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogTitle = "详情修改";
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.ApprLmtSubChgAppTable.selections[0].pkId;
        var strurl = backend.cmisLmt + '/api/apprlmtsubchgapp/' + obj;
        yufp.service.request({
          method: 'GET',
          url: strurl,
          data: obj,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.formdata2);
          }
        });
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.ApprLmtSubChgAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'DETAIL';
      _this.dialogTitle = '详情查看';
      _this.dialogVisible = true;
      _this.dialogformDisabled = true;
      _this.dialogsaveBtnShow = false;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.ApprLmtSubChgAppTable.selections[0].pkId;
        var strurl = backend.cmisLmt + '/api/apprlmtsubchgapp/' + obj;
        yufp.service.request({
          method: 'GET',
          url: strurl,
          data: obj,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.formdata2);
          }
        });
      });
    },
    /**
     * LmtContRelChgApp新增
     */
    addLcrcaFn: function () {
      var _this = this;
      if (_this.$refs.ApprLmtSubChgAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.ApprLmtSubChgAppTable.selections[0];
      var sernoflag = '';
      if (!(obj.limitSubNo == undefined || obj.limitSubNo == null)) {
        sernoflag = obj.limitSubNo.substring(0, 2);
      }

      if (sernoflag == '15') {
        // ComStar业务数据
        _this.$refs.LmtContRelChgApp.addLcrcaFnComStar(obj.apprSubSerno);
      } else {
        _this.$refs.LmtContRelChgApp.addLcrcaFn(obj.apprSubSerno);
      }
    },

    /**
     * ContAccRelChgApp新增
     */
    addCarcaFn: function (dealBizNo) {
      var _this = this;
      _this.$refs.ContAccRelChgApp.addCarcaFn(dealBizNo);
    }
  }
};
</script>
