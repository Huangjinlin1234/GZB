/**
 * @Created by  jijian on 2021/6/19
 * @updated by
 * @description 档案归档新增向导
 */
<template>
  <div>
    <yu-panel title="档案归档新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="240px" v-model="formdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="档案流水号" name="docSerno" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="任务标识" name="taskFlag" ctype="select" data-code="STD_TASK_FLAG" value="02" disabled ></yu-xform-item>
          <yu-xform-item label="档案分类" name="docClass" ctype="select" value="03" data-code="STD_DOC_CLASS" disabled ></yu-xform-item>
          <yu-xform-item label="归档模式" name="archiveMode" ctype="select" data-code="STD_ARCHIVE_MODE" ></yu-xform-item>
          <yu-xform-item label="档案类型" name="docType" ctype="select" :options="dicOptions.docTypeOptions" @change="docTypeChange" rules="required" ></yu-xform-item>
          <yu-xform-item label="关联业务编号" name="bizSerno" ctype="YufpZrcSelector" :rules="required" :params="sernoParams" @select-fn="selectSerno" :hidden="show"></yu-xform-item>
          <yu-xform-item label="关联业务编号" name="bizSerno" ctype="input" rules="required" :hidden="!show" ></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input" :hidden="show" disabled ></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="YuXcusBase" :hidden="show" rules="required" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','certType':'certType','certCode':'certCode','managerId':'managerId','managerIdName':'managerIdName','managerBrId':'managerBrId','managerBrIdName':'managerBrIdName'}" ></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"  :hidden="!show"   ></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" :disabled="!show || flag" :rules="rule"></yu-xform-item>
          <yu-xform-item label="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP"  :disabled="!flag" :hidden="show"></yu-xform-item>
          <yu-xform-item label="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" :rules="rule" :hidden="!show" :disabled="!show || flag" ></yu-xform-item>
          <yu-xform-item label="证件号码" name="certCode" ctype="input" :rules="rule" :disabled="!show || flag" ></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt" ctype="input"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="贷款期限(月)" name="loanTerm" ctype="num"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="贷款余额" name="loanAmt" ctype="input"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="账户状态" name="accStatus" ctype="input"   :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="委托扣款账号" name="entrustedDeductNo" ctype="input"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="放款日期" name="encashDate" ctype="datepicker"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="到期日期" name="endDate" ctype="datepicker"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="联系电话" name="telephone" ctype="input"  :hidden="!show" rules="required"></yu-xform-item>
          <yu-xform-item label="电话" name="phone" ctype="input"  :hidden="!show" ></yu-xform-item>
          <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="入库操作人" name="optUsrName" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="入库操作机构" name="optOrgName" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="入库操作人" name="optUsr" ctype="input" hidden disabled ></yu-xform-item>
          <yu-xform-item label="入库操作机构" name="optOrg" ctype="input" hidden disabled ></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button type="primary" @click="doNext">下一步</yu-button>
          <yu-button type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_TASK_FLAG,STD_DOC_CLASS,STD_ARCHIVE_MODE,STD_DOC_TYPE,STD_ZB_CERT_TYP');
export default {
  // mixins: [mixin],
  data: function () {
    return {
      formdata: {},
      flag: false,
      show: false,
      required: 'required',
      rule: '',
      dicOptions: {docTypeOptions: [{key: '07', value: '特殊担保协议'}, {key: '18', value: '公积金'}] },
      sernoParams: {
        title: '关联业务流水号',
        queryFields: [
          { placeholder: '担保合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }
        ],
        tableColumns: [
          { label: '业务流水号', prop: 'bizSerno', width: 140 },
          { label: '担保合同编号', prop: 'contNo', width: 140 },
          { label: '客户号', prop: 'cusId'},
          { label: '客户名称', prop: 'cusName'},
          { label: '证件类型', prop: 'certType', dataCode: 'STD_ZB_CERT_TYP'},
          { label: '证件号码', prop: 'certCode'},
          { label: '责任人', prop: 'managerIdName'},
          { label: '责任机构', prop: 'managerBrIdName'}
        ],
        dataUrl: this.$backend.cmisBiz + '/api/docarchiveinfo/queryserno',
        baseParams: {condition: {}}
      }
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      _this.formdata.docSerno = _this.$xutils.getSEQWithParamFromServer('DOC_SERNO');
      _this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.formdata.optUsr = this.loginCode;
      _this.formdata.optUsrName = this.userName;
      _this.formdata.optOrg = this.orgCode;
      _this.formdata.optOrgName = this.orgName;
    },
    docTypeChange () {
      var _this = this;
      let docType = _this.formdata.docType;
      if (docType == '18') {
        _this.required = '';
        _this.formdata.bizSerno = '';
        _this.formdata.cusId = '';
        _this.formdata.cusName = '';
        _this.formdata.certType = '';
        _this.formdata.certCode = '';
        _this.formdata.bizSerno = '';
        _this.formdata.contNo = '';
        _this.show = true;
        _this.rule = 'required';
      } else if (docType == '07') {
        _this.show = false;
        _this.required = 'required';
        _this.formdata.bizSerno = '';
        _this.formdata.cusId = '';
        _this.formdata.cusName = '';
        _this.formdata.certType = '';
        _this.formdata.certCode = '';
        _this.formdata.bizSerno = '';
        _this.formdata.contNo = '';
        _this.rule = '';
      }
    },
    /* 选择关联业务流水号 */
    selectSerno: function (arr) {
      if (arr.length === 1) {
        this.formdata.bizSerno = arr[0].bizSerno;
        this.formdata.contNo = arr[0].contNo;
        let cusId = this.formdata.cusId;
        if (cusId == '') {
          this.formdata.cusId = arr[0].cusId;
          this.formdata.cusName = arr[0].cusName;
          this.formdata.certType = arr[0].certType;
          this.formdata.certCode = arr[0].certCode;
          this.formdata.managerId = arr[0].managerId;
          this.formdata.managerIdName = arr[0].managerIdName;
          this.formdata.managerBrId = arr[0].managerBrId;
          this.formdata.managerBrIdName = arr[0].managerBrIdName;
        }
      }
    },
    /* 将表格的数据，赋值给表单字段 */
    commonSelectFn: function (row, mapping) {
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
      // 业务流水号重置
      this.formdata.bizSerno = '';
      this.sernoParams.baseParams = {condition: {cusId: row['cusId'], docType: this.formdata.docType}};
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /* 下一步 */
    doNext () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.formdata.createDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.formdata.docStauts = '01';// 档案状态
      _this.formdata.iqpSerno = _this.formdata.bizSerno;
      var serno = _this.formdata.bizSerno; ;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/docarchiveinfo/create',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (code === '0') {
            _this.$router.addTab({
              name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyEdit',
              key: 1 + new Date().getTime(), // 必传
              title: '档案归档详情',
              data: {
                viewType: 'EDIT',
                jsonData: _this.formdata,
                serno: serno
              }
            });
          } else {
            _this.$message({ message: '系统异常', type: 'error' });
          }
        }
      });
    }
  }
};
</script>
