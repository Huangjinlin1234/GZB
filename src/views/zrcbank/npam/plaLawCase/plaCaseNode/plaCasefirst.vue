<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm8" label-width="120px" v-model="formdata2" :disabled="viewType == 'DETAIL'">
        <yu-panel title="一审信息" :collapseHide="false" :hideFilter="false">
          <yu-xform-group>
            <yu-xform-item label="案件编号"  name="caseNo"   disabled></yu-xform-item>
            <yu-xform-item label="立案日期"  name="filingDate" ctype="datepicker" disabled></yu-xform-item>
            <yu-xform-item label="标的金额（元）"  name="totalAmt" ctype="num" disabled></yu-xform-item>
            <yu-xform-item label="支持我行诉讼请求类型"  name="isupportType" ctype="select" data-code="STD_ISUPPORT_TYPE"></yu-xform-item>
            <yu-xform-item label="是否采取保全措施"  name="isPresMeasures" ctype="select" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>

            <yu-xform-item label="代理方式"  name="agcyMode" ctype="select" rules="required" data-code="STD_AGT_MODE" @change="lawyerSelectFn"></yu-xform-item>
            <yu-xform-item label="代理律师姓名" rules="required" name="lawyerName" icon="search" @click.native="openDialog(0)" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
            <yu-xform-item label="律师联系方式" rules="required" name="lawyerTelNo" ctype="input" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
            <yu-xform-item label="所属律师事务所名称" rules="required" name="lawOfficeName" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
            <yu-xform-item label="内部代理人姓名" rules="required" name="agcyName" icon="search" @click.native="openDialog(1)" :hidden="isView == '03' || isView == ''"></yu-xform-item>
            <yu-xform-item label="内部代理人联系方式" rules="required" name="agcyTelNo" ctype="input"   :hidden="isView == '03' || isView == ''"></yu-xform-item>

            <yu-xform-item label="受理法院"  name="acceptCourt"  rules="required"></yu-xform-item>
            <yu-xform-item label="承办法官"  name="judge" ></yu-xform-item>
            <yu-xform-item label="受理日期"  name="acceptDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="被告是否缺席判决"  name="isAccusAbsebce" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="中止诉讼日期"  name="suspendLawDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="中止诉讼的原因"  name="suspendLawResn" ctype="select" data-code="STD_SUSPEND_LAW_RESN"></yu-xform-item>
            <yu-xform-item label="结案方式"  name="closeCaseType" ctype="select" data-code="STD_CLOSE_CASE_TYPE"></yu-xform-item>
            <yu-xform-item label="结案日期"  name="closeCaseDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="是否胜诉"  name="isWinLaw" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否转破产"  name="isConvBroke" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="对方是否上诉"  name="isOppositeAppella" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="我行是否上诉"  name="isBankAppella" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="法律文书编号"  name="legalDcmntsNo" ></yu-xform-item>
            <yu-xform-item label="法律文书名称"  name="legalDcmntsName" ></yu-xform-item>
            <yu-xform-item label="法律文书落款日期"  name="dcmntsInscribeDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="法律文书生效日期"  name="dcmntsInureDate" ctype="datepicker"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="saveFst" v-if="viewType == 'EDIT'">保存</yu-button>
        <yu-button type="primary" @click="doBack">返回</yu-button>
      </yu-form-buttons>
    </div>

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
yufp.lookup.reg('STD_ZB_YES_NO,STD_AGT_MODE,STD_CLOSE_CASE_TYPE,STD_ISUPPORT_TYPE,STD_SUSPEND_LAW_RESN');
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
      formdata2: {}

    };
  },
  created () {
    var _this = this;
    if (_this.cusCorp) {
      _this.formdata2.caseSerno = _this.cusCorp.caseSerno;
      _this.viewType = _this.cusCorp.viewType;
    }
    var caseSerno = _this.formdata2.caseSerno;
    let data = {};
    data.caseSerno = _this.formdata2.caseSerno;
    yufp.service.request({
      method: 'POST',
      url: `${backend.cmisNpam}/api/plalawcasefstbaseinfo/queryPlaLawCaseFstBaseInfo`,
      data: { condition: JSON.stringify({ caseSerno: caseSerno }) },
      callback: function (code, message, response) {
        if (response.code == '0') {
          _this.credata = response.data[0]; // 初始化数据
          yufp.clone(response.data[0], _this.formdata2);
          yufp.service.request({
            method: 'POST',
            url: `${backend.cmisNpam}/api/plalawcaseinfo/queryPlaLawCaseInfo`,
            data: data,
            callback: function (code, message, response) {
              if (response.code == 0) {
                console.log("wang", response.data)
                _this.formdata2.caseNo = response.data.caseNo;
                _this.formdata2.filingDate = response.data.filingDate;
                _this.formdata2.totalAmt = response.data.totalAmt;
              } else {
                _this.$message({ message: '操作失败：', type: 'error' });
              }
            }
          });
        } else {
          _this.$message.error(response.message);
        }
      }
    });
  },

  watch: {
    'count': function (newValue) {
      this.formdata2.lawyerName = this.credata.lawyerName;
      this.formdata2.lawyerTelNo = this.credata.lawyerTelNo;
      this.formdata2.lawOfficeName = this.credata.lawOfficeName;
      this.formdata2.agcyName = this.credata.agcyName;
      this.formdata2.agcyTelNo = this.credata.agcyTelNo;
    }
  },

  methods: {
    // 代理律师的控制方法
    lawyerSelectFn (value) {
      this.isView = value;
      this.formdata2.lawyerName = '';
      this.formdata2.lawyerTelNo = '';
      this.formdata2.lawOfficeName = '';
      this.formdata2.agcyName = '';
      this.formdata2.agcyTelNo = '';
      this.count = true;
    },
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
      if (this.$refs[`${dialog}`].selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      };
      if (this.flag == false) {
        this.formdata2.lawyerName = this.$refs.dialogtable.selections[0].lawyerName;
        this.formdata2.lawyerTelNo = this.$refs.dialogtable.selections[0].lawyerTelNo;
        this.formdata2.lawOfficeName = this.$refs.dialogtable.selections[0].lawOfficeName;
        this.dialogTableVisible = false;
      } else {
        this.formdata2.agcyName = this.$refs.cusTableRefName.selections[0].userName;
        this.formdata2.agcyTelNo = this.$refs.cusTableRefName.selections[0].userMobilephone;
        this.visiable = false;
      };
    },

    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    saveFst: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm8.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({message: '请先将表格填写完整', type: 'warning'});
        return;
      }
      _this.formdata2.caseSerno = _this.cusCorp.caseSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawcasefstbaseinfo/update',
        data: JSON.stringify(_this.formdata2),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message('保存成功');
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
