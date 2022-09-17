<template>
  <div>
    <yu-panel title="核查报告"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
              <yu-xform-item label="PK_ID" ctype="input"  name="pkId" hidden></yu-xform-item>
              <yu-xform-item label="GRP_APPROVE_SERNO" ctype="input"  name="grpApproveSerno" hidden></yu-xform-item>
              <yu-xform-item label="GRP_CUS_ID" ctype="input"  name="grpCusId" hidden></yu-xform-item>
              <yu-xform-item label="GRP_CUS_NAME" ctype="input"  name="grpCusName" hidden></yu-xform-item>
              <yu-xform-item label="GRP_SERNO" ctype="input"  name="grpSerno" hidden></yu-xform-item>
              <yu-xform-item label="请选择核查报告撰写模式" name="indgtReportMode" ctype="select" data-code="STD_INDGT_REPORT_MODE" colspan="12" @change="chooseFn"></yu-xform-item>
              <yu-xform-group :column="1" v-if="mode">
                <yu-col :span="24">
                  <yu-xform-item label="综合评价" ctype="custom" name="inteEvlu" :rows="6" :colspan="24">
                    <yu-tinymce ref="tinymce" v-model="baseFormdata1.inteEvlu" :id="tinymceId" :min-length="tinymceMin" :max-length="tinymceMax" @count-valid="countValid"></yu-tinymce>
                  </yu-xform-item>
                </yu-col>
              </yu-xform-group>
              <yu-xform-group :column="1" v-else>
                <yu-xform-item label="选择上传文件" name="indgtReportPath" ctype="input" colspan="12" ></yu-xform-item>
                <yu-button-drop colspan="12">
                  <yu-xform-item ctype="custom" class="upload_img" style="margin-left:10px;">
                    <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1"
                      :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn">
                    </yu-single-upload>
                  </yu-xform-item>
                </yu-button-drop>
              </yu-xform-group>
              <yu-panel title="核查意见及建议" :hideFilter="false" :collapseHide="false">
                <yu-xform-item label="是否重组贷款" ctype="radio" name="isRestruLoan" data-code="STD_ZB_YES_NO" ></yu-xform-item>
                <yu-xform-group :column="2">
                      <yu-xform-item label="集团申请流水号" ctype="input" name="grpSerno" hidden="true"></yu-xform-item>
                      <yu-xform-item label="敞口额度合计" ctype="yu-num" number-formatter="0,000.00"  name="openTotalLmtAmt" disabled></yu-xform-item>
                      <yu-xform-item label="低风险额度合计" ctype="yu-num" number-formatter="0,000.00"  name="lowRiskTotalLmtAmt" disabled></yu-xform-item>
                </yu-xform-group>
                <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
                  <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
                    <yu-xtable-column label="展开" prop=""></yu-xtable-column>
                    <yu-xtable-column label="授信分项编号" prop="subPrdSerno"></yu-xtable-column>
                    <yu-xtable-column label="singleSerno" prop="singleSerno" hide-column></yu-xtable-column>
                    <yu-xtable-column label="成员客户编号" prop="cusId" ></yu-xtable-column>
                    <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
                    <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
                    <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
                    <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
                    <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
                    <yu-xtable-column label="年利率" prop="rateYear">
                      <template slot-scope="scope">
                        {{ isNaN(scope.row.rateYear)? '':Number(scope.row.rateYear*100).toFixed(2) + '%' }}
                      </template>
                    </yu-xtable-column>
                    <yu-xtable-column label="最低保证金比例" prop="bailPreRate"></yu-xtable-column>
                    <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                    <yu-xtable-column label="操作" width="120">
                      <template slot-scope="scope">
                        <a class="underline" v-if="scope.row.cusId != null" @click="jumpLmtAppr(scope.row)">修改</a>
                        <a class="underline" v-if="scope.row.cusId != null" @click="register(scope.row)">压降计划登记</a>
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
                <yu-panel title="" :hideFilter="false" :collapseHide="false">
                    <yu-xform-item label="授信限额情况" ctype="textarea"  name="lmtQuotaSitu" ></yu-xform-item>
                </yu-panel>
                <yu-panel title="用信条件" :hideFilter="false" :collapseHide="false">
                  <div class="yu-toolBar">
                    <yu-button-group>
                      <yu-button type="primary" @click="addRef1" v-if="!showSaveBtn">新增</yu-button>
                      <yu-button type="primary" @click="saveRef1" v-if="!showSaveBtn">保存</yu-button>
                      <yu-button type="primary" @click="deleteRef1" v-if="!showSaveBtn">删除</yu-button>
                    </yu-button-group>
                  </div>
                  <yu-xtable ref="refTable1" row-number :data-url="dataUrl1" condition-key="condition" :base-params="baseParams1" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="approveSerno" label="审批流水号" align="center" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="cusId" label="成员客户编号" align="center" ctype="input" icon="search" :triger-click="false" :on-icon-click="inputLoanCond"></yu-xtable-column>
                    <yu-xtable-column prop="cusName" label="成员客户名称" align="center" ></yu-xtable-column>
                    <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="condDesc" label="具体内容" align="center"  ctype="input"></yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
                <yu-panel title="风控建议" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="" ctype="textarea"  name="pspManaNeed" ></yu-xform-item>
                </yu-panel>
                <yu-panel title="还款计划" :hideFilter="false" :collapseHide="false">
                  <div class="yu-toolBar">
                    <yu-button-group>
                      <yu-button type="primary" @click="addRef3" v-if="!showSaveBtn">新增</yu-button>
                      <yu-button type="primary" @click="updateRef3" v-if="!showSaveBtn">保存</yu-button>
                      <yu-button type="primary" @click="deleteRef3" v-if="!showSaveBtn">删除</yu-button>
                    </yu-button-group>
                  </div>
                  <yu-xtable ref="refTable3"  row-number :data-url="dataUrl3" condition-key="condition" :base-params="baseParams3" selection-type="radio" request-type="POST" :pageable="false">
                      <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
                      <yu-xtable-column prop="serno" label="serno" hide-column></yu-xtable-column>
                      <yu-xtable-column prop="subPrdSerno" label="授信分项品种编号" align="center" ctype="input" icon="search" :triger-click="false" :on-icon-click="inputRepayPlan"></yu-xtable-column>
                      <yu-xtable-column prop="lmtBizTypeName" label="授信品种" align="center"></yu-xtable-column>
                      <yu-xtable-column prop="terms" label="还款期数" ctype="yu-num" align="center"></yu-xtable-column>
                      <yu-xtable-column prop="repayDate" label="还款时间" ctype="datepicker" align="center"></yu-xtable-column>
                      <yu-xtable-column prop="repayAmt" ctype="yu-num" label="还款金额" align="center"></yu-xtable-column>
                  </yu-xtable>
                  <div class="yu-toolBar">
                    <yu-button-group>
                      <yu-button type="primary" @click="addRef4" v-if="!showSaveBtn">新增</yu-button>
                      <yu-button type="primary" @click="updateRef4" v-if="!showSaveBtn">保存</yu-button>
                      <yu-button type="primary" @click="deleteRef4" v-if="!showSaveBtn">删除</yu-button>
                    </yu-button-group>
                  </div>
                  <yu-xtable ref="refTable4" row-number :data-url="dataUrl4" condition-key="condition" :base-params="baseParams4" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="apprSubPrdSerno" label="apprSubPrdSerno" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="approveSubSerno" label="授信分项编号" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="subPrdSerno" label="授信分项品种编号" align="center" ctype="input" icon="search" :triger-click="false" :on-icon-click="inputRepayDesc"></yu-xtable-column>
                    <yu-xtable-column label="授信金额" prop="lmtAmt" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="额度期限" prop="lmtTerm" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="授信品种类型" prop="lmtBizType" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="授信品种类型名称" prop="lmtBizTypeName" align="center" width="160"></yu-xtable-column>
                    <yu-xtable-column label="还款计划描述" prop="repayPlanDesc" ctype="input" align="center" width="780"></yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" v-if="type!='VIEW'" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="onPrint">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YuTinymce from '@/components/widgets/YuTinymce';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import {getFile, upImage, DeleteImage} from '@/utils/unitchange';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP');
export default {
  components: {YuTinymce, YufpDemoSelector, YuSingleUpload},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      tinymceId: 'Tinymce_' + Date.now(),
      tinyWordNumber: '', // 正在输入的富文本字数
      tinymceMax: 100000, // 富文本限制的最大字符串
      tinymceMin: 10, // 富文本限制的最小字符串
      dataUrl1: backend.cmisBiz + '/api/lmtappr/queryLoanCondByGrpSerno',
      baseParams1: {grpSerno: this.$route.params.serno, condType: '01'},
      type: '',
      mode: '1',
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      lmtAppSubList: [],
      baseFormdata1: {},
      dataUrl3: backend.cmisBiz + '/api/lmtappr/queryRepayPlanByGrpSerno',
      baseParams3: {grpSerno: this.$route.params.serno},
      dataUrl4: backend.cmisBiz + '/api/lmtappr/queryLmtApprSubDataByGrpSerno',
      baseParams4: {grpSerno: this.$route.params.serno, repayPlanDesc: ''},
      pkId: ''
    };
  },
  created () {
    let grpSerno = this.$route.params.serno;
    this.initForm(grpSerno);
    this.initSubAndPrdList(grpSerno);
  },
  methods: {

    countValid (val) {
      if (val) {
        this.tinyWordNumber = val;
        // this.$refs.lmtBaseForm.validateField('context');
      }
    },

    /**
     * 加载表单数据
     */
    initForm: function (grpSerno) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpappr/querylmtgrpapprbygrpserno',
        data: {grpSerno: grpSerno},
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.pkId = response.data.pkId;
            getFile(response.data.indgtReportPath, 'yu-icon-img').then((res) => {
              _this.fileListInfo = res;
            });
          });
        }
      });
    },

    // 授信分项明细列表
    initSubAndPrdList: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpappr/querylmtgrpappsubandprdbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          debugger;
          _this.lmtAppSubList = response.data;
        }
      });
    },

    // 报告类型
    chooseFn (val) {
      var _this = this;
      if (val == '1') {
        _this.mode = true;
      } else {
        _this.mode = false;
      }
    },

    // 用信条件
    addRef1: function () {
      var _this = this;
      _this.$refs.refTable1.clearValidateMessage();
      _this.pushRefTable1Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable1Row: function () {
      var _this = this;
      let pkId = _this.$xutils.getUUID();
      let row = {pkId: pkId, approveSerno: '', cusId: '', cusName: '', condType: '01', condDesc: '', createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable1.tabledata.push(row);
      _this.$refs.refTable1.setCurrentRow(row);
    },

    // 用心条件 选取
    inputLoanCond: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtLoanCondCusData', 1000, 800, data, params => {
        _this.$refs.refTable1.selections[0].approveSerno = params.approveSerno;
        _this.$refs.refTable1.selections[0].cusId = params.cusId;
        _this.$refs.refTable1.selections[0].cusName = params.cusName;
      });
    },

    // 用信条件 保存
    saveRef1 () {
      var _this = this;
      var tableData = _this.$refs.refTable1.tabledata;
      if (tableData.length > 0) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprloancond/batchsavelmtapprloancond',
          data: tableData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$refs.refTable1.remoteData();
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        return;
      }
    },

    // 用信条件 删除
    deleteRef1 () {
      let selections = this.$refs.refTable1.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprloancond/deleteByPkId',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable1.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 还款计划 选取分项明细
    inputRepayPlan: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpApprSubPrdRepayPlan', 1000, 800, data, params => {
        _this.$refs.refTable3.selections[0].serno = params.apprSubPrdSerno;
        _this.$refs.refTable3.selections[0].subPrdSerno = params.subPrdSerno;
        _this.$refs.refTable3.selections[0].lmtBizTypeName = params.lmtBizTypeName;
      });
    },

    // 还款计划 新增
    addRef3: function () {
      var _this = this;
      _this.$refs.refTable3.clearValidateMessage();
      _this.pushRefTable3Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable3Row: function () {
      var _this = this;
      // let pkId = _this.$xutils.getUUID();
      let loginInfo = _this.$xutils.getLoginUserInfo();
      let row = {pkId: '',
        serno: '',
        terms: '',
        repayDate: '',
        repayAmt: '',
        oprType: '01',
        inputId: loginInfo.loginCode,
        inputBrId: loginInfo.org.id,
        inputDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        updId: loginInfo.loginCode,
        updBrId: loginInfo.org.id,
        updDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        createTime: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable3.tabledata.push(row);
      _this.$refs.refTable3.setCurrentRow(row);
    },

    // 还款计划维护
    updateRef3 () {
      let _this = this;
      let tableData = _this.$refs.refTable3.selections;
      if (tableData.length == 1) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/repaycapplan/batchsaverepaycapplandetail',
          data: tableData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$refs.refTable3.remoteData();
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
    },

    // 还款计划 删除
    deleteRef3 () {
      let selections = this.$refs.refTable3.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/repaycapplan/deleteByPkId',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable3.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 还款计划描述 新增
    addRef4: function () {
      var _this = this;
      _this.$refs.refTable4.clearValidateMessage();
      _this.pushRefTable4Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable4Row: function () {
      var _this = this;
      // let pkId = _this.$xutils.getUUID();
      let loginInfo = _this.$xutils.getLoginUserInfo();
      let row = {pkId: '',
        apprSubPrdSerno: '',
        lmtAmt: '',
        lmtTerm: '',
        lmtBizType: '',
        lmtBizTypeName: '',
        updId: loginInfo.loginCode,
        updBrId: loginInfo.org.id,
        updDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        createTime: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable4.tabledata.push(row);
      _this.$refs.refTable4.setCurrentRow(row);
    },

    // 还款计划描述 选取分项明细
    inputRepayDesc: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpApprSubPrdRepayPlan', 1000, 800, data, params => {
        _this.$refs.refTable4.selections[0].pkId = params.pkId;
        _this.$refs.refTable4.selections[0].subPrdSerno = params.subPrdSerno;
        _this.$refs.refTable4.selections[0].apprSubPrdSerno = params.apprSubPrdSerno;
        _this.$refs.refTable4.selections[0].approveSubSerno = params.approveSubSerno;
        _this.$refs.refTable4.selections[0].lmtAmt = params.lmtAmt;
        _this.$refs.refTable4.selections[0].lmtTerm = params.lmtTerm;
        _this.$refs.refTable4.selections[0].lmtBizType = params.lmtBizType;
        _this.$refs.refTable4.selections[0].lmtBizTypeName = params.lmtBizTypeName;
      });
    },

    // 还款计划描述 维护
    updateRef4 () {
      let _this = this;
      let tableData = _this.$refs.refTable4.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprsubprd/batchupdate',
        data: tableData,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.$refs.refTable4.remoteData();
          } else {
            _this.$message({showClose: true, message: '保存失败', type: 'error'});
          }
        }
      });
    },

    // 还款计划描述 删除  将还款计划描述置为空
    deleteRef4 () {
      let selections = this.$refs.refTable4.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      data.repayPlanDesc = '';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprsubprd/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.$refs.refTable4.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpappr/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },

    // 打印
    onPrint: function () {
      var _this = this;
      // var params = _this.baseFormdata;// 模板工厂中的参数传递
      var params = {};
      params.grpSerno = _this.baseFormdata1.grpSerno;
      if (params.grpSerno == null || params.grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemohcbgjt';
      params.src = _this.$backend.frptRptService + 'DGSX-SCBG-JT.cpt&op=view&grpSerno=' + params.grpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '核查报告（集团）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 跳转单一核查页面
    jumpLmtAppr (data) {
      let _this = this;
      data.serno = data.singleSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/inspectReportChild.vue',
        // 自定义唯一页签key
        key: data.cusName + new Date().getTime(), // 必传
        // 页签名称
        title: '成员核查报告',
        // 传递的业务数据，可选配置
        data: data
      });
    },

    // 压降计划登记
    register (rowData) {
      var _this = this;
      var params = {};
      let viewFlg = 'update';
      // 已办 办结进入
      if (_this.$route.params && (_this.$route.params.type == 'DONE' || _this.$route.params.type == 'HIS')) {
        viewFlg = 'details';
      }
      if (_this.showSaveBtn) {
        viewFlg = 'details';
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        data: {
          cusId: rowData.cusId,
          enterListFlag: '02',
          status: '2'
        },
        url: backend.cmisCus + '/api/cuslstdedkkh/queryNewDekhDataByCusId',
        callback: function (code, message, response) {
          if (response.data && response.data.cusId != null) {
            params = response.data;
            params['op'] = viewFlg;
            params['opType'] = 'approve';
            params['managerBrId'] = params.belgOrg;
            params['managerBrIdName'] = params.belgOrgName;
            _this.$dialog.open(
              '大额贷款客户名单',
              'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
              -1,
              -1,
              params
            );
          } else {
            if (viewFlg == 'details') {
              _this.$message('未查到当前客户压降计划,请核实!');
              return;
            }
            if (rowData.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cuscorp/selectcropbycusid',
                data: rowData.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            } else if (!rowData.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
                data: rowData.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            }
          }
        }
      });
    },

    // 上传文件处理
    uploadedFn1 (fileItem) {
      var updateurl = backend.cmisBiz + '/api/lmtgrpappr/updateFilePath';
      upImage(this.fileList, fileItem, this.pkId, 'indgtReportPath', updateurl).then(res => {
        this.fileList = res.fileList;
        this.baseFormdata1.indgtReportPath = res.path;
      });
    },
    deleteFileFn1 (file) {
      var updateurl = backend.cmisBiz + '/api/lmtgrpappr/updateFilePath';
      this.fileList = DeleteImage(this.fileList, file, this.pkId, 'indgtReportPath', updateurl);
      this.baseFormdata1.indgtReportPath = '';
    }

  }
};
</script>
