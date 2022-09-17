/**
 * @Created by  hujun on 2021/6/17下午2:58:08.
 * @updated by
 * @description 档案调阅申请详情
 */
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="档案调阅申请信息" name="first">
        <yu-panel title="档案调阅申请信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" disabled>
            <yu-xform-group :column="2">
            <yu-xform-item ctype="input" name="draiSerno" label="调阅流水号" rules="required" :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="datepicker" name="readRqstrDate" label="调阅申请日期" rules="required" :disabled="true" value-format="yyyy-MM-dd"></yu-xform-item>
            <yu-xform-item ctype="input"  name="readName"  label="实际调阅人" rules="required"></yu-xform-item>
            <yu-xform-item ctype="input" name="readOrgName"  label="实际调阅人机构" :disabled="true" rules="required"></yu-xform-item>
            <yu-xform-item ctype="input"  name="readId"  label="实际调阅人" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readOrg"  label="实际调阅人机构" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="select" name="readMode"  label="调阅形式"  data-code="STD_READ_MODE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="select" name="readType"  label="调阅类型"  data-code="STD_READ_TYPE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="select" name="readReason"  label="调阅原因"  data-code="STD_READ_REASON" rules="required"></yu-xform-item>
            <yu-xform-item ctype="datepicker" name="backDate"  label="归还日期" rules="required" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></yu-xform-item>
            <yu-xform-item ctype="textarea" name="reasonMome"  label="原因描述" row="4"  colspan="24" placeholder="2000个字符以内" :rules="rules.reasonMome"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrName"  label="调阅申请人"  :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrgName"  label="调阅申请机构" :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrId"  label="调阅申请人"  :disabled="true" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrg"  label="调阅申请机构" :disabled="true" :hidden="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="档案信息列表" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" request-type="POST" :base-params="baseBussParams">
            <yu-xtable-column label="档案编号" prop="docNo" width="180"></yu-xtable-column>
            <yu-xtable-column label="档案分类" prop="docClass" width="150" data-code="STD_DOC_CLASS"></yu-xtable-column>
            <yu-xtable-column label="档案类型" prop="docType" width="150" data-code="STD_DOC_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="200" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
            <yu-xtable-column label="关联业务编号" prop="bizSerno" width="150" ></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作人" prop="optUsrName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作机构" prop="optOrgName" width="150"></yu-xtable-column>
            <yu-xtable-column label="入库操作时间" prop="optDate" width="150"></yu-xtable-column>
            <yu-xtable-column label="档案入现金库时间" prop="storageCashDate" width="160"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="档案调阅审批表" name="second">
         <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="third">
        <coop-approval :params="childParams"></coop-approval>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('YESNO,STD_DOC_CLASS,STD_DOC_TYPE,STD_READ_REASON,STD_READ_MODE,STD_DOC_STAUTS,STD_READ_TYPE');
export default {
  mixins: [mixin],
  components: {FineReport, coopApproval},
  data: function () {
    return {
      activeName: 'first',
      viewType: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseBussParams: {condition: JSON.stringify({ draiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.jsonData.draiSerno}) },
      ifSave: false, // 是否已保存
      applyBussDataUrl: this.$backend.cmisBiz + '/api/docreaddetailinfo/query',
      dataDebtUrl: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId',
      formdata: null,
      collapseTitle: ['收起', '展开'],
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        } // 用户有效期禁用当前之前的日期
      },
      rules: {
        readPurposeDesc: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        reasonMome: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ]
      },
      fineReportParam: {}
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
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.jsonData.draiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  created () {
    var _this = this;
    let draiSerno = '';
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      draiSerno = _this.bizPageData.instanceInfo.bizId;
    } else {
      draiSerno = _this.$route.meta.params.jsonData.draiSerno;
    }
    _this.fineReportParam = {
      'top_outsystem_code': 'dagl-dadyspb.cpt',
      'index': '&draiSerno=' + draiSerno
    };
  },
  mounted () {
    this.afterInit();
  },
  props: {
    bizPageData: Object
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;

      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/docreadappinfo/detail',
          data: {'draiSerno': _this.bizPageData.instanceInfo.bizId},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.applyBaseData);
            }
          }
        });
      } else {
        _this.viewType = _this.$route.meta.params.viewType;
        yufp.clone(_this.$route.meta.params.jsonData, _this.applyBaseData);
      }
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /** 选择申请人后的处理方法 */
    selectedUserFn (model) {
      var _this = this;
      debugger;
      _this.applyBaseData.readId = model.loginCode;
      _this.applyBaseData.readName = model.userName;
      _this.applyBaseData.readOrgName = model.orgName;
      _this.applyBaseData.readOrg = model.orgId;
    }
  }
};
</script>
