 <!--
    单一核查
  -->
<template>
  <div style="padding-top:20px;">
    <div >
      <yu-xform ref="refForm"  v-model="baseFormdata1">
        <yu-xform-item label="授信审批流水号" name="approveSerno" ctype="input" colspan="12" hidden></yu-xform-item>
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
        <yu-panel title="核查意见及建议" panel-type="simple">
          <yu-panel title="" panel-type="simple" >
            <yu-xform-item label="是否重组贷款" name="isRestruLoan" ctype="radio" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="敞口额度合计" name="openTotalLmtAmt" ctype="input" disabled colspan="12"></yu-xform-item>
            <yu-xform-item label="低风险额度合计" name="lowRiskTotalLmtAmt" ctype="input" disabled colspan="12"></yu-xform-item>
          </yu-panel>
          <yu-panel title="" panel-type="simple">
            <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo" border
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
              <yu-xtable-column prop="lmtDrawNo" label="授信分项流水号" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtBizTypeProp" label="产品类型属性" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
              <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
              <yu-xtable-column prop="curType" label="币种" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
              <yu-xtable-column prop="rateYear" label="年利率">
                <template slot-scope="scope">
                  {{ isNaN(scope.row.rateYear)? '':Number(scope.row.rateYear*100).toFixed(2) + '%' }}
                </template>
              </yu-xtable-column>
              <yu-xtable-column prop="bailPreRate" label="最低保证金比例"></yu-xtable-column>
              <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column prop="lmtTerm" label="授信期限（月）"></yu-xtable-column>
              <yu-xtable-column prop="todo" label="操作" width="100">
                <template slot-scope="scope">
                  <a class="underline" @click="editSub(scope.row)" v-if="!showSaveBtn">修改</a>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="" panel-type="simple" :column="2">
            <yu-xform-item label="授信限额情况" name="lmtQuotaSitu" ctype="textarea" colspan="20"></yu-xform-item>
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
              <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
              <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
              <yu-xtable-column prop="condDesc" label="具体内容" align="center"  ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="风控建议" :hideFilter="false" :collapseHide="false">
            <div class="yu-toolBar">
              <yu-button-group>
                <yu-button type="primary" @click="addRef2" :disabled="isManAftLoan||showSaveBtn">新增</yu-button>
                <yu-button type="primary" @click="deleteRef2" :disabled="isManAftLoan||showSaveBtn">删除</yu-button>
                <yu-button type="primary" @click="saveRef2" :disabled="isManAftLoan||showSaveBtn">保存</yu-button>
                <yu-button type="primary" @click="register" :disabled="isManAftLoan||showSaveBtn">压降计划登记</yu-button>
              </yu-button-group>
            </div>
            <yu-xtable ref="refTable2" row-number :data-url="dataUrl2" condition-key="condition" :base-params="baseParams2" selection-type="radio" request-type="POST" :pageable="false">
                <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
                <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
                <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
                <yu-xtable-column prop="condDesc" label="具体内容" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
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
      <yu-form-buttons align="center">
        <yu-button v-if="!showSaveBtn" type="primary" @click="tempSave">暂存</yu-button>
        <yu-button v-if="!showSaveBtn" type="primary" @click="submit">保存</yu-button>
        <yu-button type="primary" v-if="!showSaveBtn" @click="onPrint">打印</yu-button>
      </yu-form-buttons>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import YuTinymce from '@/components/widgets/YuTinymce';
import {getFile, upImage, DeleteImage} from '@/utils/unitchange';
yufp.lookup.reg(
  'STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_INDGT_REPORT_MODE,STD_ZB_PRD_BIZ_TYPE,STD_ZB_GUAR_WAY,STD_PRD_TYPE_PROP'
);
export default {
  components: { YufpDemoSelector, YuSingleUpload, YuTinymce },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tinymceId: 'Tinymce_' + Date.now(),
      tinyWordNumber: '', // 正在输入的富文本字数
      tinymceMax: 100000, // 富文本限制的最大字符串
      tinymceMin: 10, // 富文本限制的最小字符串
      data: [],
      mode: '1',
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      replySubList: [],
      isManAftLoan: false,
      showSaveBtn: false,
      baseFormdata1: {},
      dataUrl1: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams1: {serno: this.$route.params.serno, condType: '01'},
      dataUrl2: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams2: {serno: this.$route.params.serno, condType: '02'},
      dataUrl3: backend.cmisBiz + '/api/repaycapplan/selectbylmtserno',
      baseParams3: {condition: {serno: this.$route.params.serno}},
      dataUrl4: backend.cmisBiz + '/api/lmtappr/queryLmtApprSubDataBySerno',
      baseParams4: {serno: this.$route.params.serno, repayPlanDesc: ''},
      pkId: ''
    };
  },
  mounted () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
    var _this = this;
    _this.init();// 分项列表
    _this.initForm();// 表单数据
    _this.initFromApp();// 表单控制
  },
  methods: {

    countValid (val) {
      if (val) {
        this.tinyWordNumber = val;
        // this.$refs.lmtBaseForm.validateField('context');
      }
    },

    init: function () {
      var _this = this;
      var serno = _this.$route.params.serno;
      yufp.service.request({
        method: 'POST',
        data: serno,
        url: backend.cmisBiz + '/api/lmtappr/getapproveinfobyserno',
        callback: function (code, message, response) {
          debugger;
          _this.replySubList = response.data.lmtApproveSubDtoList;
        }
      });
    },

    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.$route.params.serno;
      // _this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/queryInfoBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
            _this.pkId = response.data.pkId;
            getFile(response.data.indgtReportPath, 'yu-icon-img').then((res) => {
              // debugger;
              _this.fileListInfo = res;
            });
          });
        }
      });
    },

    /**
     * 加载表单控制
     */
    initFromApp: function () {
      let _this = this;
      var serno = _this.$route.params.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: serno},
        callback: function (code, message, response) {
          // 单一授信进入
          if (response.data && '997,998,996'.indexOf(response.data.approveStatus) != -1) {
            _this.showSaveBtn = true;
          }
          // 成员客户进入
          if (response.data && response.data.isGrp == '1') {
            _this.showSaveBtn = false;
          }
        }
      });
    },
    /**
      *修改分项信息
      */
    editSub: function (data) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtApprSubInfo',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_reply' + data.lmtDrawNo, // 必传
        // 页签名称
        title: '授信额度信息修改',
        // 传递的业务数据，可选配置
        data: data
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
      let row = {pkId: pkId, approveSerno: _this.$route.params.serno, condType: '01', condDesc: '', createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable1.tabledata.push(row);
      _this.$refs.refTable1.setCurrentRow(row);
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

    // 是否按要求贷后管理
    isManAftLoanFnc (value) {
      if (value == '0') {
        this.isManAftLoan = true;
      } else {
        this.isManAftLoan = false;
      }
    },

    // 贷后管理条件 保存
    saveRef2 () {
      var _this = this;
      var tableData = _this.$refs.refTable2.tabledata;
      if (tableData.length > 0) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprloancond/batchsavelmtapprloancond',
          data: tableData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        return;
      }
    },

    // 贷后管理条件 新增
    addRef2: function () {
      var _this = this;
      _this.$refs.refTable2.clearValidateMessage();
      _this.pushRefTable2Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable2Row: function () {
      var _this = this;
      let pkId = _this.$xutils.getUUID();
      let row = {pkId: pkId, approveSerno: _this.$route.params.serno, condType: '02', condDesc: '', createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable2.tabledata.push(row);
      _this.$refs.refTable2.setCurrentRow(row);
    },

    // 贷后管理条件 删除
    deleteRef2 () {
      let selections = this.$refs.refTable2.selections;
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
            _this.$refs.refTable2.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 压降计划登记
    register () {
      var _this = this;
      var params = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        data: {
          cusId: _this.baseFormdata1.cusId,
          enterListFlag: '02',
          status: '2'
        },
        url: backend.cmisCus + '/api/cuslstdedkkh/queryNewDekhDataByCusId',
        callback: function (code, message, response) {
          debugger;
          if (response.data && response.data.cusId != null) {
            params = response.data;
            params['op'] = 'update';
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
            if (_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cuscorp/selectcropbycusid',
                data: _this.baseFormdata1.cusId,
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
            } else if (!_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
                data: _this.baseFormdata1.cusId,
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

    // 还款计划 选取分项明细
    inputRepayPlan: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/common/lmtApprSubPrdRepayPlan', 1000, 800, data, params => {
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

    // 还款计划 选取分项明细
    inputRepayDesc: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/common/lmtApprSubPrdRepayPlan', 1000, 800, data, params => {
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
    tempSave: function () {
      var _this = this;
      var comitData = {};
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtappr/save',
              data: comitData,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('暂存成功');
                }
              }
            });
          }
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      var validate = false;
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
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtappr/save',
              data: comitData,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('保存成功');
                }
              }
            });
          }
        }
      });
    },

    // 打印
    onPrint: function () {
      var _this = this;
      var params = {};
      params.serno = _this.$route.params.serno;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoscbgdy';
      params.src = _this.$backend.frptRptService + 'DGSX-HCBG-DY.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '核查报告(单一)',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 上传文件处理
    uploadedFn1 (fileItem) {
      var updateurl = backend.cmisBiz + '/api/lmtappr/updateFilePath';
      upImage(this.fileList, fileItem, this.pkId, 'indgtReportPath', updateurl).then(res => {
        this.fileList = res.fileList;
        this.baseFormdata1.indgtReportPath = res.path;
      });
    },
    deleteFileFn1 (file) {
      var updateurl = backend.cmisBiz + '/api/lmtappr/updateFilePath';
      this.fileList = DeleteImage(this.fileList, file, this.pkId, 'indgtReportPath', updateurl);
      this.baseFormdata1.indgtReportPath = '';
    }
  }

};
</script>
