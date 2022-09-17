<template>
<div>
<yu-panel title="财务报表信息" :hideFilter="false" :collapseHide="false">
<!--<template slot="filter" >
</template>-->
  <yu-xform related-table-name="fncRefTable" form-type="search" v-if="!isFlowPage" label-width="120px" v-model="searchFormdata">
    <yu-xform-group :column="4">
      <yu-xform-item label="报表周期类型" placeholder="报表周期类型" ctype="select" name="statPrdStyle" data-code="STD_ZB_FNC_STAT" :datacode-filter="datacodeFilterFn"></yu-xform-item>
      <yu-xform-item label="报表期间" placeholder="报表期间" ctype="input" name="statPrd" fuzzy-query="both"></yu-xform-item>
      <yu-xform-item label="报表口径" placeholder="报表口径" ctype="select" name="statStyle" data-code="STD_ZB_FNC_STYLE" :hidden="personalEn"></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
<template slot="right">
  <yu-button-drop show-length="9">
    <yu-button type="primary" v-show="!onlyView && ((bizType == 'B05' || bizType == 'B07' || bizType == 'A03' || bizType == 'A07' || bizType == 'A10' || bizType == 'A12' || showIs) && !isFlowPage)" @click="addFn">新增</yu-button>
    <yu-button type="primary" v-show="!onlyView && (bizType == 'B05'  || bizType == 'B06' || bizType == 'A10' || bizType == 'A11' || bizType == 'A12' || showIs || isFlowPage) && authority" @click="modifyFn">填报</yu-button>
    <yu-button type="primary" v-show="!onlyView && ((bizType == 'B05' || bizType == 'B07' || bizType == 'A03' || bizType == 'A07' || bizType == 'A10' || bizType == 'A12' || showIs) && !isFlowPage)" @click="deleteFn">删除</yu-button>
    <yu-button type="primary" @click="infoFn" v-show="isShowCheck || onlyView">查看</yu-button>
    <yu-button type="primary" @click="exportFn" v-if="onlyView">导出财报</yu-button>
    <yu-button type="primary" @click="importFn" v-if="isShowBtn">导入财报</yu-button>
    <yufp-excel-import type="primary" :import-url="excelImportUrl" ref="import" v-show="false" :biz-data-params="bizDataParams" title="导入财报" @import-success="doAutoQuery" :async="false"></yufp-excel-import>
    <!--<yu-button @click="unlockFn">解锁</yu-button> -->
  </yu-button-drop>
</template>
  <div>温馨提示：{{ lastFncReportTip }}</div>
  <yu-xtable ref="fncRefTable" row-number :data-url="dataUrlQuery" selection-type="checkbox" :base-params="baseParams" condition-key="condition">
    <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
    <yu-xtable-column label="周期类型" prop="statPrdStyle" data-code="STD_ZB_FNC_STAT"></yu-xtable-column>
    <yu-xtable-column label="报表期间" prop="statPrd" ></yu-xtable-column>
    <yu-xtable-column label="报表口径" prop="statStyle" data-code="STD_ZB_FNC_STYLE"></yu-xtable-column>
    <yu-xtable-column label="是否新准则报表" prop="statIsNrpt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
    <yu-xtable-column label="是否经过审计" prop="statIsAudit"  data-code="STD_ZB_YES_NO"></yu-xtable-column>
    <yu-xtable-column label="是否允许修改" prop="indUpdate" data-code="STD_ZB_YES_NO"></yu-xtable-column>
    <yu-xtable-column label="财务调整原因" prop="adjestDesc"></yu-xtable-column>
    <yu-xtable-column label="状态" prop="stateFlgDesc">
      <template slot-scope="scope">
         <span>{{ getState(scope.row) }}</span>
      </template>
    </yu-xtable-column>
    <yu-xtable-column label="报表录入类型" prop="reportType" data-code="STD_ZB_REPORT_TYPE"></yu-xtable-column>
  </yu-xtable>
  <yu-xform ref="refFormReason" label-width="140px" v-model="formdataReason" style="margin-top: 5px;" v-if="isShowReason || isKeyborder">
    <yu-xform-group>
      <yu-xform-item label="财务调整原因" v-model="adjestDesc" ctype="textarea" name="adjestDesc" row="3" colspan="24" :rules="reasonRule" :readonly="isKeyborder"></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
  <div class="yu-grpButton" style="margin-top: 10px;">
    <yu-button v-show="commitBtnShow && authority" type="primary" @click="ocrProcessFn">OCR处理</yu-button>
    <yu-button v-show="commitBtnShow" type="primary" @click="commitFn">提交</yu-button>
    <yu-button v-show="commitBtnShow" type="primary" @click="flowBackFn">退回</yu-button>
    <yu-button v-show="commitBtnShow" type="primary" @click="backFn">返回</yu-button>
    <yu-button v-show="(bizType === 'A10' || bizType === 'A11' || bizType === 'B05' || bizType === 'B06')" type="primary" @click="noFlowFn">提交</yu-button>
  </div>
  <yu-row>
    <yufp-nwf-submit ref="flow" :pagedata="bizInfo" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </yu-row>

  </yu-panel>
  <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
     width="650px" height="380px" -->
  <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
    <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group>
        <yu-xform-item label="客户代码" ctype="input" name="cusId" :disabled="true" ></yu-xform-item>
        <yu-xform-item label="报表周期类型" placeholder="请选择报表周期类型" ctype="select" name="statPrdStyle"
          data-code="STD_ZB_FNC_STAT" rules="required" @change="typeChange" :clearable="false" :disabled="personalEn" :datacode-filter="datacodeFilterFn"></yu-xform-item>
        <yu-xform-item label="报表年份" placeholder="请选择年份" ctype="select" name="year" rules="required" :options="year"
          :hidden="hiddenYear"></yu-xform-item>
        <yu-xform-item label="报表期间" placeholder="请选择报表期间" ctype="select" name="between" rules="required"
          :options="option"></yu-xform-item>
          <yu-xform-item label="报表类型" placeholder="请选择报表类型" ctype="select" name="fncConfTyp" :options="finOptions" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="报表口径" placeholder="请选择报表口径" ctype="select" name="statStyle" rules="required"
          data-code="STD_ZB_FNC_STYLE" :hidden="personalEn"></yu-xform-item>
        <yu-xform-item label="是否新准则报表" placeholder="请选择是否新准则报表" ctype="select" name="statIsNrpt"
          data-code="STD_ZB_YES_NO" :hidden="personalEn"></yu-xform-item>
        <yu-xform-item label="是否经过审计" placeholder="请选择是否经过审计" ctype="select" name="statIsAudit" @change="statIsAuditFn"
          data-code="STD_ZB_YES_NO" :hidden="personalEn" rules="required"></yu-xform-item>
        <yu-xform-item label="是否经过调整" placeholder="请选择是否经过调整" ctype="select" name="statIsAdjt"  @change="statIsAdjtFn"
          data-code="STD_ZB_YES_NO" :hidden="personalEn" rules="required"></yu-xform-item>
          <yu-xform-item label="审计单位" placeholder="请输入审计单位" ctype="input" name="statAdtEntr"  rules="required" :hidden="statIsAuditHidden" colspan="24"></yu-xform-item>
          <yu-xform-item label="审计结论" placeholder="请输入审计结论" ctype="textarea" name="statAdtConc" row="3" colspan="24" rules="required" :hidden="statIsAuditHidden"></yu-xform-item>
          <yu-xform-item label="财务报表调整原因" placeholder="请输入财务报表调整原因" ctype="textarea" name="statAdjRsn" row="3" colspan="24" rules="required" :hidden="statIsAdjtHidden"></yu-xform-item>
          <yu-xform-item label="报表录入类型" placeholder="请选择报表录入类型" ctype="select" rules="required" name="reportType" data-code="STD_ZB_REPORT_TYPE"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </yu-xdialog>
  <el-dialog-x title="退回原因" :visible.sync="roolbackDialogVisible">
    <yu-xcheckbox v-model="roolReason" data-code="STD_ROOLBACK_REASON" :datacode-filter="datacodeFilterRoolBackFn" style="margin-bottom: 20px;"></yu-xcheckbox>
    <el-label style="font-size: 16px; color: #333; font-weight: bold;">意见</el-label>
    <el-input type="textarea" v-model="comment" rules="required"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="roolbackDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmFn">确 定</el-button>
    </div>
  </el-dialog-x>
  <yufpNwfInit ref="yufpNwfInit" @success-click="forceUpdate"></yufpNwfInit>
</div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixin from '@/utils/mixin';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import { download } from '@/utils/util';
yufp.lookup.reg('STD_ZB_FNC_STYLE,STD_ZB_FNC_STAT,STD_ZB_YES_NO,STD_ZB_REPORT_TYPE,STD_ROOLBACK_REASON');
export default {
  mixins: [mixin],
  components: {yufpNwfInit, YufpExcelImport},
  props: {
    params: Object,
    isIndev: { // 是否个人客户
      type: Boolean,
      default: false
    },
    isFlowPage: { // 是否工作流待办进入
      type: Boolean,
      default: false
    },
    onlyView: { // 仅查看
      type: Boolean,
      default: false
    },
    bizInfo: Object
  },
  data: function () {
    return {
      baseparams: {},
      searchFormdata: {},
      finOptions: [],
      dataUrlQuery: backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/list',
      dataUrlDel: backend.cmisCus + '/api/nrcs-cms/fncstatbase/s/fncstatbase/delete',
      dataUrlSave: backend.cmisCus + '/api/nrcs-cms/fncstatbase/s/fncstatbase/add',
      dataUrlUnclock: backend.cmisCus + '/api/nrcs-cms/fncstatbase/s/fncstatbaseunlock/update',
      dataUrlExport: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/export',
      excelImportUrl: backend.cmisCus + '/api/nrcs-cms/fncstatdtl/q/fncstatdtl/import',
      batchInsertUrl: backend.cmisCus + '/api/cusmanataskfnc/insertafterdelete',
      bizDataParams: {},
      formdata: {},
      rule: [
        { required: true, message: '必填项', trigger: 'blur' },
        { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      commitBtnShow: false,
      // 年份 报表期间
      option: [],
      // 年份 下拉框
      year: [],
      // 是否显示年份
      hiddenYear: false,
      // 表格查询的基本条件
      baseParams: { condition: {}, sort: 'statPrd desc'},
      // 是否经过审计
      statIsAuditHidden: true,
      // 是否经过调整
      statIsAdjtHidden: true,
      // 个体工商户
      personalEn: false,
      showIs: false,
      cusId: '',
      cusName: '',
      fncConfTyp: '',
      bizType: '',
      lastFncReport: null,
      bizId: '', // 业务流程流水号
      adjestDesc: '', // 修改原因
      isKeyborder: false, // 能否修改报表调整原因
      reasonRule: [{ required: true, message: '原因不能为空' }],
      isShowBtn: false, // 是否展示模板下载、导入财报按钮
      authority: true, // 能否对财报进行填报及OCR处理
      isShowReason: false, // 是否展示财报修改原因
      roolbackDialogVisible: false,
      roolReason: '', //退回原因
      comment: '', //退回意见
    };
  },
  computed: {
    dutyList: function () {
      let duty = yufp.session.dutys;
      let dutys = [];
      for (let i = 0; i < duty.length; i++) {
        let element = duty[i];
        dutys.push(element.code);
      }
      return dutys;
    },
    lastFncReportTip: function () {
      if (this.lastFncReport) {
        return '客户最新一期完成的财报为' + this.lastFncReport.statPrd.substring(0, 4) + '年' + this.lastFncReport.statPrd.substring(4, 6) + '月';
      } else {
        return '客户尚无完成的财报！';
      }
    }
  },
  methods: {
    // 字典项过滤
    datacodeFilterRoolBackFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === 'KHR001' || op.key === 'KHR002' || op.key === 'KHR003' || op.key === 'KHR004' || op.key === 'KHR005' || op.key === 'KHR006') {
          return true;
        }
        return false;
      });
    },
    // 获取流程业务类型
    getFlowBizType: function () {
      if (this.bizType == 'B07') {
        return 'KH006';
      } else if (this.bizType == 'B08') {
        let hasYear = false;
        if (this.$refs.fncRefTable.selections && this.$refs.fncRefTable.selections.length > 0) {
          for (let i = 0; i < this.$refs.fncRefTable.selections.length; i++) {
            let rowData = this.$refs.fncRefTable.selections[i];
            if (rowData.statPrdStyle == '4' || rowData.statPrd.substring(4, 6) === '06' || rowData.statPrd.substring(4, 6) === '12') {
              hasYear = true;
              break;
            }
          }
        }
        if (hasYear) { // 是否含年报 修订的财报报表期间的月份为06或12时，提交使用的审批流程为：客户财报修改流程（季报年报）
          return 'KH023';
        } else {
          return 'KH007';
        }
      } else if (this.bizType == 'A07') {
        return 'KH003';
      } else if (this.bizType == 'A08') {
        let hasYear = false;
        if (this.$refs.fncRefTable.selections && this.$refs.fncRefTable.selections.length > 0) {
          for (let i = 0; i < this.$refs.fncRefTable.selections.length; i++) {
            let rowData = this.$refs.fncRefTable.selections[i];
            if (rowData.statPrdStyle == '4' || rowData.statPrd.substring(4, 6) === '03' || rowData.statPrd.substring(4, 6) === '06' || rowData.statPrd.substring(4, 6) === '09' || rowData.statPrd.substring(4, 6) === '12') {
              hasYear = true;
              break;
            }
          }
        }
        if (hasYear) { // 是否含年报 修订的财报报表期间的月份为03或06或09或12时，提交使用的审批流程为：客户财报修改流程（季报年报）
          return 'KH023';
        } else {
          return 'KH004';
        }
      } else {
        return '';
      }
    },
    // 获取最近一期完成的财报
    getLastReportInfo: function (cusId) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/last',
        data: {cusId: cusId},
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.lastFncReport = response.data;
          } else if (!response.data) {
            // 无财报信息
          } else {
            _this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },
    /**
         * 获取财报类型option
         */
    getFinOptions: function () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: backend.cmisCus + '/api/nrcs-cms/fncconftemplate/q/fncconftemplate/all/list',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.finOptions = [];
            response.data.forEach(function (item) {
              _this.finOptions.push({
                key: item.fncId,
                value: item.fncName
              });
            });
          } else {
            this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },
    /**
         * 取消
         */
    cancelFn: function () {
      let _this = this;
      _this.dialogVisible = false;
    },
    /**
         * 保存
         */
    saveFn: function () {
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
      // 解决year，between可能是undefined的问题
      if (!model.year) {
        model.year = '';
      }
      if (!model.between) {
        model.between = '';
      }
      // 年的时候拼接12月
      if (model.statPrdStyle === '4') {
        model.statPrd = model.between + '12';
      } else {
        model.statPrd = model.year + model.between;
      }

      // 是否经过审计 为否时，清除审计信息
      if (model.statIsAudit === '0') {
        model.statAdtEntr = '';
        model.statAdtConc = '';
      }
      // 是否经过调整 为否时，清除调整信息
      if (model.statIsAdjt === '0') {
        model.statAdjRsn = '';
      }
      // 个体工商户写死这个参数
      if (this.personalEn) {
        model.statStyle = '1';
      }
      let tipMsg = _this.viewType === 'ADD' ? '新增成功!' : '修改成功!';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.dataUrlSave,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.fncRefTable.remoteData();
            _this.dialogVisible = false;
            _this.$message(tipMsg);
            if (_this.bizType == 'B05' || _this.bizType == 'B06' || _this.bizType == 'A10' || _this.bizType == 'A11' || _this.showIs || _this.isFlowPage) {
              if (!_this.commitBtnShow) {
                _this.$confirm('点击[确定]进入编辑页面，点击[取消]进入列表页面?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true,
                  callback: function (action) {
                    if (action === 'confirm') {
                      let model = yufp.clone(response.data, {});
                      model.pageType = '2';
                      _this.$router.addTab({
                        name: _this.getReports(),
                        key: 'custom_' + model.cusId + '_' + model.statStyle + '_' + model.statPrdStyle + '_' + model.statPrd + '_query',
                        title: '财务报表（修改）',
                        data: model
                      });
                    } else {
                      _this.$refs.fncRefTable.remoteData();
                    }
                  }
                });
              }
            }
          } else {
            _this.$message(response.message);
          }
        }
      });
    },
    /**
    * 提交--集中作业类
     */
    commitFn: function () {
      let selections = this.$refs.fncRefTable.selections;
      // if (selections.length == 0) {
      //   this.$message({type: 'warning', message: '请选择要修改的记录!'});
      //   return;
      // }
      for (var i = 0; i < selections.length; i++) {
        if (selections[i].stateFlg.substring(8, 9) === '2' && (this.bizType == 'A07' || this.bizType == 'B07')) { // 财报新增已完成的不允许提交
          if (this.params && this.params.nodeName === '集中作业财务信息录入岗') {
            // 集中作业财务信息录入岗 完成财报后提交流程
          } else {
            this.$message({type: 'warning', message: '已完成的记录不允许提交!'});
            return;
          }
        }
      }
      if (this.dutyList.indexOf('FZH01') > -1 && !this.params && (this.bizType == 'A08' || this.bizType == 'B08')) { // 集中作业财报修改
        let validate = false;
        this.$refs.refFormReason.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          return;
        }
        for (var i = 0; i < selections.length; i++) {
          selections[i].serno = this.$route.meta ? this.$route.meta.params.serno : this.bizId;
          selections[i].adjestDesc = this.adjestDesc;
        }

        var model = {};
        var _this = this;
        yufp.service.request({
          method: 'POST',
          url: _this.batchInsertUrl,
          data: selections,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.doWfInit();
            }
          }
        });
      } else {
        this.doWfInit();
      }
    },
    doWfInit () {
      let flowBizType = this.getFlowBizType();
      if (!flowBizType) {
        this.$message({type: 'error', message: '无法获取流程业务类型，发起失败!'});
        return;
      };
      const loginUser = this.$xutils.getLoginUserInfo();
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = loginUser.org.code;
      wfInitData.bizId = this.$route.meta.params ? this.$route.meta.params.serno : this.bizId;
      wfInitData.bizType = flowBizType;
      wfInitData.userId = loginUser.loginCode;
      wfInitData.bizUserName = this.cusName;
      wfInitData.bizUserId = this.cusId;
      wfInitData.param = {
        bizType: this.bizType
      };
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },
    // 流程回调
    forceUpdate () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
    switchStatus: function (viewType, editable) {
      let _this = this;
      _this.viewType = viewType;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },
    /**
         * 新增按钮
         */
    addFn: function () {
      let _this = this;
      _this.getFinaReportType();
      if (!_this.fncConfTyp) {
        _this.$message({type: 'error', message: '该客户数据未配置财报类型，无法新增报表!'});
        return;
      }
      _this.switchStatus('ADD', true);
      this.changeRptTypeByFlag('ADD');
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        // 区分个体工商户问题
        if (this.personalEn) {
          yufp.clone({'statPrdStyle': '1', 'cusId': this.cusId}, this.formdata);
        } else {
          yufp.clone({'cusId': this.cusId, 'fncConfTyp': this.fncConfTyp}, this.formdata);
        }
      });
    },
    // 获取需要路由到的报表页面
    getReports: function () {
      // 张家港只有普通报表
      return 'cusmanage/fincReport/fincReportDetails/fincReportDetails';
      // return this.personalEn ? 'cusmanage/fincReport/fincReportDetails/fincReportDetails' : 'cusmanage/fincReport/fincReportBusinDetails/fincReportBusinDetails';
    },
    /**
         * 修改
         */
    modifyFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.fncRefTable.selections;
      if (selectionsAry.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selectionsAry[0].indUpdate === '2' && this.dutyList.indexOf('0010') === -1) {
        this.$message({type: 'error', message: '财务报表已经锁定！不能修改!'});
        return;
      }
      this.changeRptTypeByFlag('QUERY', selectionsAry[0].briefFlag);
      let data = yufp.clone(selectionsAry[0], {});
      data.pageType = '2';
      // 集中作业类
      if (this.bizType && (this.bizType == 'A07' || this.bizType == 'A08' || this.bizType == 'B07' || this.bizType == 'B08')) {
        data.nodeId = _this.bizInfo && _this.bizInfo.instanceInfo.nodeId ? _this.bizInfo.instanceInfo.nodeId : _this.params.nodeId;
        data.instanceId = _this.bizInfo && _this.bizInfo.instanceInfo.instanceId ? _this.bizInfo.instanceInfo.instanceId : _this.params.instanceId;
        yufp.router.removeTab(this.$route.path);
      }
      const loginUser = this.$xutils.getLoginUserInfo();
      data.userId = loginUser.loginCode;
      // TODO 转向不同的页面，有针对单张资产负债或损益的
      this.$router.addTab({
        name: _this.getReports(),
        key: 'custom_' + data.cusId + '_' + data.statStyle + '_' + data.statPrdStyle + '_' + data.statPrd + '_edit',
        title: '财务报表（修改）',
        data: data
      });
    },
    /**
         * 详情
         */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.fncRefTable.selections;
      if (selectionsAry.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.changeRptTypeByFlag('MODIFY', selectionsAry[0].briefFlag);
      let model = {'typeSource': _this.showIs};
      yufp.clone(selectionsAry[0], model);

      model.pageType = '1';
      this.$router.addTab({
        name: _this.getReports(),
        key: 'custom_' + model.cusId + '_' + model.statStyle + '_' + model.statPrdStyle + '_' + model.statPrd + '_view',
        title: '财务报表（查看）',
        data: model
      });
    },
    /**
         * 删除
         */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.fncRefTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请选择一条记录进行操作', type: 'warning' });
        return;
      }
      if (selections[0].indUpdate === '2' && this.dutyList.indexOf('0010') === -1) {
        this.$message({type: 'error', message: '财务报表已经锁定！不能删除!'});
        return;
      }
      if (selections[0].stateFlg.substring(8, 9) === '2') {
        this.$message({type: 'error', message: '该状态的财务报表不能删除!'});
        return;
      }
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.dataUrlDel,
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.fncRefTable.remoteData();
                  _this.$message('操作成功');
                }
              }
            });
          }
        }
      });
    },
    /**
         * 报表周期类型change事件
         * @param val 当前数据
         */
    typeChange: function (val) {
      this.option = [];
      let tmp = '';
      this.formdata.between = '';
      switch (val) {
      case '1':
        // 循环生产12个月，并在1-9 之前添加0，月报只需要1-11月
        this.hiddenYear = false;
        for (let i = 1; i <= 11; i++) {
          if (i < 10) {
            tmp = '0' + i;
          } else {
            tmp = i.toString();
          }
          this.option.push({key: tmp, value: i + ' 月'});
        }
        break;
      case '2':
        // 循环产出3个季度，每个季度的key值为3的倍数
        this.hiddenYear = false;
        for (let j = 1; j <= 4; j++) {
          if ((j * 3) < 10) {
            tmp = '0' + (j * 3);
          } else {
            tmp = j;
          }
          this.option.push({key: tmp, value: '第 ' + j + ' 季度'});
        }
        break;
      case '3':
        // 产生半年数据
        this.hiddenYear = false;
        this.option.push({key: '06', value: ' 上半年'});
        this.option.push({key: '12', value: ' 下半年'});
        break;
      case '4':
        // 产生一年数据
        yufp.clone(this.year, this.option);
        this.hiddenYear = true;
        break;
      default:
        this.option = [];
        break;
      }
    },
    /**
         * 产生前后10年的年数据
         */
    initYear: function () {
      this.year = [];
      var thisYear = new Date().getFullYear();
      for (let i = 0; i < 20; i++) {
        let key = (thisYear - 9 + i) + '';
        this.year.push({key: key, value: key + ' 年'});
      }
    },
    // 导出excel
    exportFn: function () {
      var _this = this;
      var selections = _this.$refs.fncRefTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var param = '?cusId=' + selections[0].cusId;
      param += '&statPrdStyle=' + selections[0].statPrdStyle;
      param += '&statPrd=' + selections[0].statPrd;
      param += '&statStyle=' + selections[0].statStyle;
      param += '&orgId=' + yufp.session.org.code;
      download(this.dataUrlExport + param);
    },
    // 导入excel
    importFn: function () {
      var _this = this;
      var selections = _this.$refs.fncRefTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.clone(selections[0], _this.bizDataParams);
      this.$refs['import'].$refs['upload'].$refs['upload-inner'].handleClick();
    },
    doAutoQuery: function () {
      var _this = this;
      _this.$refs.fncRefTable.remoteData();
    },
    unlockFn: function () {
      var _this = this;
      var selections = _this.$refs.fncRefTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var model = {};
      model.cusId = selections[0].cusId;
      model['statPrdStyle'] = selections[0].statPrdStyle;
      model['statPrd'] = selections[0].statPrd;
      model['statStyle'] = selections[0].statStyle;
      yufp.service.request({
        method: 'POST',
        url: _this.dataUrlUnclock,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.fncRefTable.remoteData();
            _this.$message('解锁成功！');
          }
        }
      });
    },
    // 是否经过审计
    statIsAuditFn: function (val) {
      if (val === '1') {
        this.statIsAuditHidden = false;
      } else {
        this.statIsAuditHidden = true;
      }
    },
    // 是否经过调整
    statIsAdjtFn: function (val) {
      if (val === '1') {
        this.statIsAdjtHidden = false;
      } else {
        this.statIsAdjtHidden = true;
      }
    },
    // 表格数据状态
    getState: function (item) {
      if (item.stateFlg && item.stateFlg.length >= 9) {
        let flag = item.stateFlg.substring(8, 9);
        return flag === '2' ? '完成' : '草稿';
      }
      return '';
    },
    /**
         * 根据每条数据的类型（普通报表还是简表）
         */
    changeRptTypeByFlag: function (status, flag) {
      // if (status === 'ADD') {
      //   if (this.params.reportType === 'simpleRpt') {
      //     this.personalEn = true;
      //   } else {
      //     this.personalEn = false;
      //   }
      // } else if (status === 'MODIFY' || status === 'QUERY') {
      //   if (flag === '1') {
      //     this.personalEn = true;
      //   } else {
      //     this.personalEn = false;
      //   }
      // }
    },
    /**
     * 获取财务类型
     */
    getFinaReportType () {
      /**
       * B05 个人客户财务报表新增
       * B06 个人客户财务报表修改
       * B07 个人客户财务报表新增（集中作业）
       * B08 个人客户财务报表修改（集中作业）
       * 财务报表类型默认为【PB0002】
     */
      let _this = this;
      _this.bizType = this.$route.meta.params.bizType || this.getFactory().contextData.bizType || this.params.bizType;
      if (_this.isIndev || _this.bizType == 'B05' || _this.bizType == 'B06' ||
    _this.bizType == 'B07' || _this.bizType == 'B08') {
        _this.fncConfTyp = 'PB0002';// 通用个人类
      } else {
        // 对公客户-查询客户信息获取配置的财报类型
        yufp.service.request({
          method: 'POST',
          async: false,
          url: `${backend.cmisCus}/api/cuscorp/${_this.cusId}`,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.fncConfTyp = response.data.finaReportType;
            }
          }
        });
      }
    },
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        let keys = ['1', '4'];
        if (keys.indexOf(op.key) != -1) {
          return true;
        }
        return false;
      });
    },
    // 退回
    flowBackFn () {
      if (this.bizInfo && this.bizInfo.instanceInfo) { // 业务流程场景
        const dutys = this.$xutils.getLoginUserInfo().dutys;
        let isAuthorizer = false;
        try{
          dutys.forEach((item) => {
            if(item.code.indexOf('ZYB') > -1) {
              isAuthorizer = true;
              return
            }
          })
        } catch (e) {
          throw e
        }
        if(isAuthorizer) {
          this.roolbackDialogVisible = true;
        } else {
          // 提交意见信息
          var commentInfo = {
            commentId: '', // 意见主键，置空即可
            commentSign: 'O-1', // 审批结论，和表单中对应的选择下拉框的值绑定
            userComment: '打回', // 审批意见
            ext: '无' // 扩展意见
          };
          const loginUser = this.$xutils.getLoginUserInfo();
          commentInfo.instanceId = this.bizInfo.instanceInfo.instanceId;
          commentInfo.nodeId = this.bizInfo.instanceInfo.nodeId;
          commentInfo.userId = loginUser.loginCode;
          var param = {
            opType: commentInfo.commentSign, // 审批结论
            param: this.bizInfo.flowParam, // 业务参数
            comment: commentInfo // 提交意见参数
          };
          // 调用公共组件的提交方法
          this.$refs.flow.submitFn(param);
        }
      } else {
        this.backFn();
      }
    },
    // 返回上一页
    backFn () {
      yufp.router.removeTab(this.$route.path);
    },
    // 发送OCR
    sendOcr (row) {
      var _this = this;
      let url = backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/sendOcr';
      yufp.service.request({
        method: 'POST',
        async: false,
        url: url,
        data: row,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.toDetailPage(row);
          } else {
            _this.$message({ message: response.erortx, type: 'warning' });
          }
        }
      });
    },
    /**
      * 转到明细页面
    */
    toDetailPage: function (row) {
      var _this = this;
      // 跳转到下一个页面
      _this.changeRptTypeByFlag('QUERY', row.briefFlag);
      let data = yufp.clone(row, {});
      data.pageType = '2';
      data.nodeId = _this.bizInfo && _this.bizInfo.instanceInfo.nodeId ? _this.bizInfo.instanceInfo.nodeId : _this.params.nodeId;
      data.instanceId = _this.bizInfo && _this.bizInfo.instanceInfo.instanceId ? _this.bizInfo.instanceInfo.instanceId : _this.params.instanceId;
      const loginUser = _this.$xutils.getLoginUserInfo();
      data.userId = loginUser.loginCode;
      _this.$router.addTab({
        name: _this.getReports(),
        key: 'custom_' + data.cusId + '_' + data.statStyle + '_' + data.statPrdStyle + '_' + data.statPrd + '_edit',
        title: '财务报表（修改）',
        data: data
      });
    },
    // OCR识别
    ocrProcessFn: function () {
      var _this = this;
      var selections = _this.$refs.fncRefTable.selections;
      if (selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let selection = selections[0];
      // 检查是否已经做过OCR
      let url = backend.cmisCus + '/api/ocrtask/';
      let param = {};
      param.cusId = selection.cusId;
      param.statPrd = selection.statPrd;
      yufp.service.request({
        method: 'get',
        async: false,
        url: url,
        data: {condition: JSON.stringify(param)},
        callback: function (code, message, response) {
          if (response.code == '0') {
            let list = response.data;
            if (list.length <= 0) {
              // 发送OCR
              _this.sendOcr(selections[0]);
            } else {
              _this.$confirm('期限【' + selection.statPrd + '】已存在OCR识别记录,是否重新识别？', '确认', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
                callback: function (action) {
                  if (action === 'confirm') {
                    _this.sendOcr(selections[0]);
                  } else {
                    _this.toDetailPage(selections[0]);
                  }
                }
              });
            }
          } else {
            _this.$message({ message: '检查ocr出现异常', type: 'warning' });
          }
        }
      });
    },

    /**
    * 无集中作业财报新增修改提交 修改任务状态
    */
    noFlowFn () {
      var _this = this;
      let data = {};
      let isOK = true;
      data['serno'] = _this.$route.meta.params.serno;
      data['cusId'] = _this.cusId;
      data['taskStatus'] = '3'; // 1-待处理 2-处理中 3-已处理
      data['approveStatus'] = '997'; // 997-通过
      for (let i = 0; i < this.$refs.fncRefTable.tabledata.length; i++) {
        let rowData = this.$refs.fncRefTable.tabledata[i];
        if (rowData.stateFlg.substring(8, 9) === '1') {
          isOK = false;
        }
      }
      if (isOK) {
        _this.$xutils.request({
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cusmanatask/updateSelective',
          data: data,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.$xutils.request({
                type: 'POST',
                url: _this.$backend.cmisCus + '/api/cusbase/updateSelective',
                data: {
                  cusId: _this.cusId,
                  cusState: '2' // 1-暂存 2-生效
                },
                success: (response, status, xhr) => {
                  if (response.code == '0') {
                    // 自动刷新列表数据
                    _this.$xutils.showMsgBox('提示', '提交成功', 500, 300, () => {
                      _this.backFn();
                    });
                  } else {
                    _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                  }
                },

                error: (result, b) => {
                  _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
                }
              });
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          },

          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        _this.$message({ message: '请先完成财报填报！', type: 'warning' });
      }
    },
    // 选择退回原因后提交
    confirmFn () {
      if(this.roolReason.toString() && this.comment) {
        this.roolbackDialogVisible = false;
        // 提交意见信息
        var commentInfo = {
          commentId: '', // 意见主键，置空即可
          commentSign: 'O-1', // 审批结论，和表单中对应的选择下拉框的值绑定
          userComment: this.comment, // 审批意见
          ext: this.roolReason.toString() // 扩展意见
        };
        const loginUser = this.$xutils.getLoginUserInfo();
        commentInfo.instanceId = this.bizInfo.instanceInfo.instanceId;
        commentInfo.nodeId = this.bizInfo.instanceInfo.nodeId;
        commentInfo.userId = loginUser.loginCode;
        var param = {
          opType: commentInfo.commentSign, // 审批结论
          param: this.bizInfo.flowParam, // 业务参数
          comment: commentInfo // 提交意见参数
        };
        // 调用公共组件的提交方法
        this.$refs.flow.submitFn(param);
      } else {
        this.$message({ message: '请选择退回原因及填写意见', type: 'warning' });
        return;
      }
    }
  },
  created: function () {
    this.getFinOptions();
    this.bizType = this.params ? this.params.bizType : this.$route.meta.params.bizType;
    this.cusId = this.params ? this.params.cusId && this.params.cusId : this.$route.meta.params.cusId;
    this.cusName = this.params ? this.params.cusName : this.$route.meta.params.cusName;
    this.bizId = this.params ? this.params.bizId : '';
    debugger;
    // 判断是否处于流程中
    if ((!this.cusId || this.cusId === '') && (!this.cusName || this.cusName === '')) {
      this.cusId = this.getFactory().contextData.instanceInfo.bizUserId;
      this.cusName = this.getFactory().contextData.instanceInfo.bizUserName;
      this.onlyView = true;
    }
    this.baseParams.condition = { cusId: this.cusId};
    this.getLastReportInfo(this.cusId);
    if (this.params && (this.params.nodeName === '集中作业财务信息录入岗') && (this.bizType == 'A08' || this.bizType == 'B08')) {
      this.isKeyborder = true;
      this.reasonRule = [];
      this.baseParams.condition.serno = this.params.bizId;
      this.dataUrlQuery = backend.cmisCus + '/api/cusmanataskfnc/';
      setTimeout(() => {
        this.adjestDesc = this.$refs.fncRefTable.tabledata[0].adjestDesc;
      }, 2500);
    }
    if (this.params && this.params.nodeSign === 'IMAGE_SCAN') { // 影像扫描节点
      this.authority = false;
    }
    if (this.params && (this.params.nodeName === '信贷管理部公司业务评审岗' || this.params.nodeName === '信贷管理部副总经理')) { // 审核报表权限
      this.authority = false;
      this.isShowCheck = true;
      this.baseParams.condition.serno = this.params.bizId;
      this.dataUrlQuery = backend.cmisCus + '/api/cusmanataskfnc/';
      setTimeout(() => {
        this.$nextTick(() => {
          this.adjestDesc = this.$refs.fncRefTable.tabledata[0].adjestDesc;
          this.isKeyborder = true
          this.reasonRule = [];
        })
      }, 2000);
    }
    if (this.$route.meta.params && (this.$route.meta.params.model_group_no === 'CMG000153' || this.$route.meta.params.model_group_no === 'CMG000536' || this.$route.meta.params.model_group_no === 'CMG000702')) { // 集团客户授信财务报表信息 CMG000536-授信复议 CMG000702-授信申报
      // 授信场景只能查看
      this.onlyView = true;
    }
    if (this.$route.meta.params && this.$route.meta.params.grpCusId) {
      this.dataUrlQuery = backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/queryFncStatBaseGrpList';
      this.baseParams.condition = { grpNo: this.$route.meta.params.grpCusId};
    }
    if (this.bizType == 'A10' || this.bizType == 'B05') { // 个人/公司客户财务报表新增
      this.isShowBtn = true;
    }
  },
  mounted: function () {
    if (!this.bizType) {
      this.showIs = true;
    }
    // 集中作业类-隐藏保存按钮，展示提交按钮
    if (this.bizType && (this.bizType == 'A07' || this.bizType == 'A08' || this.bizType == 'B07' || this.bizType == 'B08')) {
      this.commitBtnShow = true;
      if (this.dutyList.indexOf('FZH01') > -1 && !this.params) {
        this.authority = false;
      }
    }
    this.initYear();
    // if (this.params.reportType === 'simpleRpt') {
    //   this.personalEn = true;
    // }
    // 客户经理 发起财报修改集中作业流程
    if (this.bizType == 'A08' || this.bizType == 'B08') {
      this.isShowReason = true; // 修改流程展示修改原因
    }
    this.$refs.fncRefTable.setHiddenColumns('adjestDesc');
  }
};
</script>
