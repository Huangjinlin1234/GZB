
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
          <yu-xform ref="refAccaForm" label-width="120px" v-model="formdata" :disabled="formDisabled" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="PKID" :hidden="true" name="pkId" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="合作方编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="合作方名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="申请流水号" name="appSerno" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="金融机构代码" :hidden="true" name="instuCde" ctype="input"></yu-xform-item>
              <yu-xform-item label="批复编号" name="apprSerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="合作方类型" name="copType" ctype="select" data-code="STD_PARTNER_TYPE"></yu-xform-item>
              <yu-xform-item label="授信总额" name="lmtAmt" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="授信总额已用" name="totalUsedAmt" ctype="input"></yu-xform-item>
              <yu-xform-item label="授信总额可用" name="createat" ctype="custom">
                <template>
                  <span>{{ parseFloat(parseFloat(formdata.lmtAmt - formdata.totalUsedAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="币种" :hidden="true" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="期限" :hidden="true" name="term" ctype=""></yu-xform-item>
              <yu-xform-item label="起始日期" :hidden="true" name="startDate" ctype="input"></yu-xform-item>
              <yu-xform-item label="到期日期" :hidden="true" name="endDate" ctype="input"></yu-xform-item>
              <yu-xform-item label="状态" :hidden="true" name="apprStatus" ctype="select" data-code="STD_ZB_APPR_ST"></yu-xform-item>
              <yu-xform-item label="操作类型" :hidden="true" name="oprType" ctype="select" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>
              <yu-xform-item label="审批状态" :hidden="true" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              <yu-xform-item label="责任人" :hidden="true" name="managerIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="责任机构" :hidden="true" name="managerBrIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记时间" name="inputDate" ctype="input"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="saveBtnShow" type="primary" @click="submitFn">提交</yu-button>
              <yu-button type="primary" @click="tabcancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="额度明细" name="ApprCoopSubChgApp">
        <yu-panel title="合作方授信分项调整申请" panel-type="simple">
          <yu-button-drop>
            <yu-button v-show="saveBtnShow" @click="modifyFn" type="primary">修改</yu-button>
            <yu-button @click="infoFn" type="primary">详情</yu-button>
            <yu-button v-show="saveBtnShow" @click="addLcrcaFn" type="primary">新增占用合同信息</yu-button>
          </yu-button-drop>
          <yu-xtable ref="ApprCoopSubChgAppTable" row-number :data-url="urls.ApprCoopSubChgAppUrl" :base-params="indirectParam" :default-load="false" request-type="POST">
            <yu-xtable-column label="分项/项目编号" prop="apprSubSerno"></yu-xtable-column>
            <yu-xtable-column label="分项/项目类型" prop="custom">
              <template>
                <span>{{ typeObject[formdata.copType] }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="apprSerno"></yu-xtable-column>
            <yu-xtable-column label="额度品种/项目名称" prop="limitSubName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="是否可循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="期限" prop="term"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="avlAmt"></yu-xtable-column>
            <yu-xtable-column label="可用额度" prop="createAt">
              <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.avlAmt - scope.row.outstndAmt).toFixed(2)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="已用额度" prop="outstndAmt"></yu-xtable-column>
            <yu-xtable-column label="用信总余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="1200px">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata2" :disabled="dialogformDisabled">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" :hidden="true" name="subAppSerno" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="批复台账编号" name="apprSerno" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="分项编号" name="apprSubSerno" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="品种编号/项目编号" name="limitSubNo" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="分项名称/项目名称" name="limitSubName" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="授信金额" name="avlAmt" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="可用额度" name="" ctype="custom" disabled>
                <template>
                  <span>{{ parseFloat(parseFloat(formdata2.avlAmt - formdata2.outstndAmt).toFixed(2)) }}</span>
                </template>
              </yu-xform-item>
              <yu-xform-item label="已用额度" name="outstndAmt" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="用信总余额" name="loanBalance" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="是否可循环" name="isRevolv" rules="required" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
              <yu-xform-item label="单户限额" name="sigAmt" rules="required" ctype="yu-num" disabled></yu-xform-item>
              <yu-xform-item label="单笔业务限额" name="sigBussAmt" rules="required" ctype="yu-num" disabled></yu-xform-item>
              <yu-xform-item label="币种" :hidden="true" name="curType" ctype="input"></yu-xform-item>
              <yu-xform-item label="期限" name="term" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="起始日期" name="startDate" rules="required" ctype="datepicker" disabled></yu-xform-item>
              <yu-xform-item label="到期日期" name="endDate" rules="required" ctype="datepicker" disabled></yu-xform-item>
              <yu-xform-item label="额度状态" name="status" rules="required" ctype="select" data-code="STD_ZB_APPR_ST" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="dialogsaveBtnShow"  type="primary" @click="dialogsaveFn">保存</yu-button>
              <yu-button   type="primary" @click="dialogcancelFn">取消</yu-button>
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
yufp.lookup.reg('STD_ZB_LMT_TYPE,STD_ZB_YES_NO,STD_ZB_BIZ_ATTR,STD_ZB_CONT_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_APPR_ST,STD_PARTNER_TYPE,STD_PERIPHERAL_SYS,STD_PRD_TYPE_PROP');

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
        ApprCoopSubChgAppUrl:
          backend.cmisLmt + '/api/apprcoopsubchgapp/selectByModel'
      },
      dataParam: {},
      dialogVisible: false,
      viewTypeMain: 'DETAIL',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      indirectParam: {},
      formdata: {},
      formdata2: {},
      typeObject: {}
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
    _this.typeObject = yufp.lookup.find('STD_PARTNER_TYPE', false);
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
        url: backend.cmisLmt + '/api/apprcoopchgapp/queryApprCoopChgAppInfoBySerno',
        data: { condition: JSON.stringify({ oprType: '01', appSerno: _this.appSerno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
        }
      });
      _this.indirectParam = { condition: JSON.stringify({ subAppSerno: _this.appSerno, oprType: '01' }) };
    },

    /**
     * 取消
     */
    tabcancelFn: function () {
      var _this = this;
      if (_this.$route.meta.params) {
        let routeKey = _this.$route.meta.params.routeKey;
        yufp.router.removeTab('/zrcbank/lmt/apprCoopChgApp/apprCoopChgAppDetail/' + routeKey);
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
      var strurl = backend.cmisLmt + '/api/apprcoopsubchgapp/update';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.ApprCoopSubChgAppTable.remoteData();
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
      if (_this.$refs.ApprCoopSubChgAppTable.selections.length !== 1) {
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
        var obj = _this.$refs.ApprCoopSubChgAppTable.selections[0];
        yufp.clone(obj, _this.formdata2);
        _this.formdata2.sigAmt = _this.formdata2.sigAmt == null ? 0 : _this.formdata2.sigAmt;
        _this.formdata2.sigBussAmt = _this.formdata2.sigBussAmt == null ? 0 : _this.formdata2.sigBussAmt;
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.ApprCoopSubChgAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'DETAIL';
      _this.dialogTitle = "详情查看";
      _this.dialogVisible = true;
      _this.dialogformDisabled = true;
      _this.dialogsaveBtnShow = false;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata2);
        _this.formdata2.sigAmt = _this.formdata2.sigAmt == null ? 0 : _this.formdata2.sigAmt;
        _this.formdata2.sigBussAmt = _this.formdata2.sigBussAmt == null ? 0 : _this.formdata2.sigBussAmt;
      });
    },

    /**
     * LmtContRelChgApp新增
     */
    addLcrcaFn: function () {
      var _this = this;
      if (_this.$refs.ApprCoopSubChgAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.ApprCoopSubChgAppTable.selections[0];
      _this.$refs.LmtContRelChgApp.addLcrcaFn(obj.apprSubSerno);
    },

    /**
     * ContAccRelChgApp新增
     */
    addCarcaFn: function (dealBizNo) {
      var _this = this;
      _this.$refs.ContAccRelChgApp.addCarcaFn(dealBizNo);
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
      startdto.bizType = 'ED003';// 合作方额度调整申请
      startdto.bizId = _this.formdata.appSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        money: _this.formdata.lmtAmt,
        startOrgId: _this.formdata.inputBrId,
        bizPkId: _this.formdata.pkId
      };
      startdto.bizParam4 = _this.appSerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }
  }
};
</script>
