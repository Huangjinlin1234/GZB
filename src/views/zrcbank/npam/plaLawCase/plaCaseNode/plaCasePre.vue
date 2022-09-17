<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :disabled="viewType == 'DETAIL'" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="案号"  name="caseSerno"  rules="required" hidden></yu-xform-item>
          <yu-xform-item label="执行案号"  name="exeCaseNo"  rules="required" ></yu-xform-item>
          <yu-xform-item label="执行立案日期"  name="exeFilingDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="执行现状"  name="exeStatus" ctype="select" data-code="STD_EXE_STATUS" rules="required"></yu-xform-item>
          <yu-xform-item label="是否第三人执行异议"  name="isTdpExecDissent" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="执行总标的（元）"  name="exeTotalAmt" ctype="num" rules="required" ></yu-xform-item>
          <yu-xform-item label="执行法院"  name="acceptCourt"  rules="required"></yu-xform-item>
          <yu-xform-item label="执行法官"  name="judge" ></yu-xform-item>
          <yu-xform-item label="代理方式"  name="agcyMode" ctype="select" rules="required" data-code="STD_AGT_MODE" @change="lawyerSelectFn"></yu-xform-item>
          <yu-xform-item label="代理律师姓名" rules="required" name="lawyerName" icon="search" @click.native="openDialog(0)" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
          <yu-xform-item label="律师联系方式" rules="required" name="lawyerTelNo" ctype="input" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
          <yu-xform-item label="所属律师事务所名称" rules="required" name="lawOfficeName" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
          <yu-xform-item label="内部代理人姓名" rules="required" name="agcyName" icon="search" @click.native="openDialog(1)" :hidden="isView == '03' || isView == ''"></yu-xform-item>
          <yu-xform-item label="内部代理人联系方式" rules="required" name="agcyTelNo" ctype="input"   :hidden="isView == '03' || isView == ''"></yu-xform-item>
          <yu-xform-item label="是否和解"  name="isRecnc" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="和解日期"  name="recncDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="和解内容" colspan="22" name="recncCont" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="登记日期" colspan="22" name="inputDate"  hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-panel title="执行终结情况" :collapseHide="false" v-if="formdata.exeStatus=='02' || formdata.exeStatus=='03'">
        <yu-xform ref="refForm1" label-width="150px" v-model="formdata2">
          <yu-xform-group>
            <yu-xform-item label="案件文书落款日期"  name="dcmntsInscribeDate" ctype="datepicker" rules="required"></yu-xform-item>
            <yu-xform-item label="原因"  name="resn" ctype="select" data-code="STD_FINIS_RESN"></yu-xform-item>
            <yu-xform-item label="恢复执行案号"  name="unstpExeCaseNo" ></yu-xform-item>
            <yu-xform-item label="恢复执行日期"  name="unstpExeDate" ctype="datepicker"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="被执行人列表" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary" @click="addFn" :hidden="viewType == 'DETAIL'">新增</yu-button>
          <yu-button type="primary" @click="importFn(1)" :hidden="viewType == 'DETAIL'">引用</yu-button>
          <yu-button type="primary" @click="deleteFn(1)" :hidden="viewType == 'DETAIL'">删除</yu-button>
          <yu-button type="primary" @click="saveFn(1)" :hidden="viewType == 'DETAIL'">保存</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable1" :data-url="url.personUrl" :base-params="baseParam.personParams" request-type="POST">
          <yu-xtable-column label="客户编号" prop="cusId"  ctype="input"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"  ctype="input"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"  ctype="input"></yu-xtable-column>
          <yu-xtable-column label="被执行人是否因本案件列入失信人员名单" prop="isPsteEnrolDisct" ctype="select" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="被执行人是否因本案件列入限制高消费名单" prop="isPsteEnrolRhclt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="保全资产处置情况" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary" @click="importFn(2)" :hidden="viewType == 'DETAIL'">引入</yu-button>
          <yu-button type="primary" @click="deleteFn(2)" :hidden="viewType == 'DETAIL'">删除</yu-button>
          <yu-button type="primary" @click="saveFn(2)" :hidden="viewType == 'DETAIL'">保存</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable2" :data-url="url.assertUrl" row-number :base-params="baseParam.assertParams" request-type="POST">
          <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASSET_TYPE" ctype="select"></yu-xtable-column>
          <yu-xtable-column label="权属人" prop="autho"></yu-xtable-column>
          <yu-xtable-column label="处置财产定价方式" prop="assetPriceMode" ctype="select" data-code="STD_ASSET_PRICE_MODE"></yu-xtable-column>
          <yu-xtable-column label="评估标的物价" prop="assEvaAmt" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="处置方式" prop="dispType" ctype="select" data-code="STD_DISP_TYPE"></yu-xtable-column>
          <yu-xtable-column label="是否成交" prop="isDeal" ctype="select" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="成交日期 " prop="dealDate" ctype="datepicker"></yu-xtable-column>
          <yu-xtable-column label="成交价格" prop="dealAmt" ctype="input" ></yu-xtable-column>
          <yu-xtable-column label="我行受偿金额" prop="bankAocn" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="执行款到我行日期" prop="execmnBackDate" ctype="datepicker"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="refForm3" label-width="120px" v-model="formdata3">
          <yu-xform-group>
            <yu-xform-item label="备注" colspan="24" name="memo" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="doSave" :hidden="viewType == 'DETAIL'">保存</yu-button>
          <yu-button type="primary" @click="doBack">返回</yu-button>
        </yu-form-buttons>
      </yu-panel>
    </div>
    <yu-xdialog title="被执行人列表引入" :visible.sync="authDialogVisible" class="control-dialog" width="1200px" >
      <yu-xtable :data-url="url.inportPersonUrl" selection-type="radio" ref="refTableOther1" :base-params="baseParam.accusedListParam" request-type="POST">
        <yu-xtable-column label="客户名称" prop="cusName" rules="required"></yu-xtable-column>
        <yu-xtable-column label="被告身份" prop="accusedRole" data-code="STD_ACCUSED_ROLE" rules="required"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="住所" prop="livingAddr"></yu-xtable-column>
        <yu-xtable-column label="是否起诉" prop="isLawsuit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否撤回" prop="isWithdraw" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="撤回时间" prop="withdrawDate"></yu-xtable-column>
        <yu-xtable-column label="撤回原因" prop="withdrawResn" data-code="STD_WITHDRAW_RESN"></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="dialog-footer">
        <yu-button type="primary" @click="savePersonFn(1)" >保存</yu-button>
        <yu-button @click="cancelfn">取消</yu-button>
      </div>
    </yu-xdialog>
    <yu-xdialog title="保全资产处置情况" :visible.sync="assertDialogVisible" class="control-dialog" width="1200px" >
      <yu-xtable :data-url="url.inportAssertUrl" selection-type="radio" ref="refTableOther2" :base-params="baseParam.assertListParam" request-type="POST">
        <yu-xtable-column align="center" label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="押品类型" prop="guarType"></yu-xtable-column>
        <yu-xtable-column align="center" label="权属人" prop="autho"></yu-xtable-column>
        <yu-xtable-column align="center" label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全起始日期" prop="presStartDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全到期日期" prop="presEndDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label="我行保全情况" prop="bankPresCase" ctype="select" data-code="STD_BANK_PRES_CASE"></yu-xtable-column>
        <yu-xtable-column align="center" label="其他保全情况" prop="otherPresCase" ></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="dialog-footer">
        <yu-button type="primary" @click="savePersonFn(2)" v-if="viewType == 'EDIT'">保存</yu-button>
        <yu-button @click="cancelfn">取消</yu-button>
      </div>
    </yu-xdialog>

      <!-- 律所信息弹框 -->
    <yu-dialog title="律师信息" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="2">
              <yu-xform-item placeholder="律所名称" label="律所名称" ctype="input" name="lawOfficeName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="律师姓名" label="律师姓名" ctype="input" name="lawyerName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" request-type="POST" style="width: 100%" condition-key="condition">
              <yu-xtable-column prop="lawOfficeName" label="律所名称"></yu-xtable-column>
              <yu-xtable-column prop="lawyerName" label="律师姓名" ></yu-xtable-column>
              <yu-xtable-column prop="lawyerNo" label="律师编号" ></yu-xtable-column>
              <yu-xtable-column prop="lawyerTelNo" label="联系电话" ></yu-xtable-column>
            </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn('dialogtable')" >选取</yu-button>
       </div>
    </yu-dialog>

     <!-- 内部员工信息弹框 -->
     <yu-xdialog :visible.sync="visiable" :width="width" title="员工信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="cusTableRefName">
          <yu-xform-group :column="4">
            <yu-xform-item label="员工编号" ctype="input" placeholder="员工编号" name="loginCode"></yu-xform-item>
            <yu-xform-item label="员工名称" ctype="input" placeholder="员工名称" name="userName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="cusTableRefName" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="员工所在机构名称" prop="orgName" width="160px"></yu-xtable-column>
          <yu-xtable-column label="员工编号" prop="loginCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="员工名称" prop="userName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="联系电话" prop="userMobilephone" width="160px" ></yu-xtable-column>
        </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn('cusTableRefName')" >选取</yu-button>
       </div>
    </yu-xdialog>

  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_EXE_STATUS,STD_ZB_YES_NO,STD_AGT_MODE,STD_FINIS_RESN,STD_ACCUSED_ROLE,STD_ZB_CERT_TYP,STD_WITHDRAW_RESN,STD_ASSET_PRICE_MODE,STD_DISP_TYPE,STD_ASSET_TYPE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      count: false,
      credata: {},
      isView: '',
      visiable: false,
      flag: '',
      dialogTableVisible: false,
      dialogformdata: {},
      dataUrl: backend.cmisNpam + '/api/plalawyerinfo/queryAll',
      dataUrl1: backend.appOcaService + '/api/adminsmuser/pageForDh',
      formdata: {},
      formdata2: {},
      authDialogVisible: false,
      assertDialogVisible: false,
      viewType: 'EDIT',
      url: {
        personUrl: backend.cmisNpam + '/api/plalawpersoninfo/queryByCaseSerno',
        assertUrl: backend.cmisNpam + '/api/plalawassetdisp/queryPlaLawAssetDisp',
        inportPersonUrl: backend.cmisNpam + '/api/plalawaccusedlist/queryPlaLawAccusedList',
        inportAssertUrl: backend.cmisNpam + '/api/plalawpresassetinfo/queryPlaLawPresAssetInfo'
      },
      baseParam: {
        personParams: {condition: JSON.stringify({caseSerno: this.$route.meta.params.caseSerno }) },
        assertParams: {},
        accusedListParam: '',
        assertListParam: ''
      }
    };
  },
  created () {
    // this.$emit("liuquan")
    var _this = this;
    if (_this.cusCorp) {
      _this.formdata.caseSerno = _this.cusCorp.caseSerno;
      _this.viewType = _this.cusCorp.viewType;
    }
    var caseSerno = _this.formdata.caseSerno;
    // _this.baseParam.personParams = { condition: JSON.stringify({ caseSerno: caseSerno }) };
    _this.baseParam.assertParams = { condition: JSON.stringify({ caseSerno: caseSerno }) };
    _this.baseParam.accusedListParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno}) };
    _this.baseParam.assertListParam = { condition: JSON.stringify({ caseSerno: caseSerno}) };

    yufp.service.request({
      method: 'POST',
      url: `${backend.cmisNpam}/api/plalawperformcaseinfo/queryPlaLawPerformCaseInfo`,
      data: { condition: JSON.stringify({ caseSerno: caseSerno }) },
      callback: function (code, message, response) {
        if (response.code == '0') {
          _this.credata = response.data[0]; // 初始化数据
          yufp.clone(response.data[0], _this.formdata);
          _this.$nextTick(() => {
            yufp.clone(response.data[0], _this.formdata2);
            _this.formdata3.memo = response.data[0].memo;
          });
        } else {
          _this.$message.error(response.message);
        }
      }
    });
  },
  watch: {
    'count': function (newValue) {
      this.formdata.lawyerName = this.credata.lawyerName;
      this.formdata.lawyerTelNo = this.credata.lawyerTelNo;
      this.formdata.lawOfficeName = this.credata.lawOfficeName;
      this.formdata.agcyName = this.credata.agcyName;
      this.formdata.agcyTelNo = this.credata.agcyTelNo;
    }
  },

  methods: {

    // 代理律师的控制方法
    lawyerSelectFn (value) {
      this.isView = value;
      this.formdata.lawyerName = '';
      this.formdata.lawyerTelNo = '';
      this.formdata.lawOfficeName = '';
      this.formdata.agcyName = '';
      this.formdata.agcyTelNo = '';
      this.count = true;
    },
    /* 弹出框显示： */
    openDialog (info) {
      if (info == 0) {
        this.flag = false;
        this.dialogTableVisible = true;
      } else {
        this.flag = true;
        this.visiable = true;
      }
    },

    /*  选取处理： */
    selectReturn (dialog) {
      var _this = this;
      // this.dialogTableVisible = false;
      if (this.$refs[`${dialog}`].selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      };
      if (this.flag == false) {
        this.formdata.lawyerName = this.$refs.dialogtable.selections[0].lawyerName;
        this.formdata.lawyerTelNo = this.$refs.dialogtable.selections[0].lawyerTelNo;
        this.formdata.lawOfficeName = this.$refs.dialogtable.selections[0].lawOfficeName;
        this.dialogTableVisible = false;
      } else {
        this.formdata.agcyName = this.$refs.cusTableRefName.selections[0].userName;
        this.formdata.agcyTelNo = this.$refs.cusTableRefName.selections[0].userMobilephone;
        this.visiable = false;
      };
    },

    addFn () {
      var _this = this;
      let inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      let caseSerno = _this.formdata.caseSerno;
      let row = { caseSerno: caseSerno, cusId: '', cusName: '', certCode: '', claimType: '', isPsteEnrolDisct: '', isPsteEnrolRhclt: '', inputDate: inputDate };
      this.$refs.refTable1.tabledata.push(row);
      this.$refs.refTable1.setCurrentRow(row);
    },
    /** 被执行人保存 */
    saveFn (index) {
      var _this = this;
      var selectionsAry = _this.$refs['refTable' + index].getEditRows();
      var url;
      if (index == '1') {
        url = backend.cmisNpam + '/api/plalawpersoninfo/batchUpdate';
      } else {
        url = backend.cmisNpam + '/api/plalawassetdisp/batchUpdate';
      }
      var model = selectionsAry;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.$refs.['refTable' + index].remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    deleteFn (index) {
      var _this = this;
      var selectionsAry = _this.$refs['refTable' + index].selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var url;
      if (index == '1') {
        url = backend.cmisNpam + '/api/plalawpersoninfo/delete/' + selectionsAry[0].plpiSerno;
      } else {
        url = backend.cmisNpam + '/api/plalawassetdisp/delete/' + selectionsAry[0].pladSerno;
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs['refTable' + index].remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    importFn (index) {
      if (index == '1') {
        this.authDialogVisible = true;
      } else {
        this.assertDialogVisible = true;
      }
    },
    savePersonFn (index) {
      var _this = this;
      var selectionsAry = _this.$refs['refTableOther' + index].selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var url;
      if (index == '1') {
        url = backend.cmisNpam + '/api/plalawpersoninfo/insert';
      } else {
        url = backend.cmisNpam + '/api/plalawassetdisp/insertByPlaLawAssetDispService';
      }
      var model = selectionsAry[0];
      // model.caseSerno = _this.formdata.caseSerno;
      model.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.assertDialogVisible = false;
            _this.$refs['refTable' + index].remoteData();
            _this.$message(response.message);
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    cancelfn () {
      this.authDialogVisible = false;
      this.assertDialogVisible = false;
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      let jsoRt = null;
      var validate1 = false;
      var validate2 = false;
      _this.$refs.refForm.validate(volid => {
        validate1 = volid;
      });
      if (_this.formdata.exeStatus == '02' || _this.formdata.exeStatus == '03') {
        _this.$refs.refForm1.validate(volid => {
          validate2 = volid;
        });
      } else {
        validate2 = true;
      }

      if (!validate1 || !validate2) {
        return this.$xutils.showMsgBox('提示', '校验未通过,请认真填写必填项');
      }
      var model = _this.formdata;
      if (_this.formdata.inputDate || _this.formdata.inputDate == '') {
        _this.formdata['inputDate'] = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
        model.inputDate = _this.formdata.inputDate;
      }
      model.caseSerno = _this.cusCorp.caseSerno;
      model.dcmntsInscribeDate = _this.formdata2.dcmntsInscribeDate;
      model.resn = _this.formdata2.resn;
      model.unstpExeCaseNo = _this.formdata2.unstpExeCaseNo;
      model.unstpExeDate = _this.formdata2.unstpExeDate;
      model.memo = _this.formdata3.memo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawperformcaseinfo/update',
        async: false,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            jsoRt = response;
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });

      return jsoRt;
    }
  }
};
</script>
