<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="合作方额度冻结解冻" name="cooProFrozeUnfrozeApply">
        <div>
          <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
            <yu-panel title="申请基本信息" panel-type="normal">
              <yu-xform-group :column="2">
                <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled placeholder="业务流水号"></yu-xform-item>
                <yu-xform-item label="业务类型" name="appType" ctype="select" data-code="STD_COOP_PRO_APP_TYPE" disabled placeholder="业务类型"></yu-xform-item>
                <yu-xform-item label="合作方编号" name="partnerNo" ctype="input" disabled placeholder="合作方编号"></yu-xform-item>
                <yu-xform-item label="合作方名称" name="partnerName" ctype="input"  disabled placeholder="合作方名称"></yu-xform-item>
                <yu-xform-item label="申请原因" name="appDesc" rules="required" :disabled="pageParams.opType == 'VIEW' || !opType" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
                <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
                <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
                <yu-xform-item label="登记日期" name="inputDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="合作方分项/项目额度" panel-type="normal">
              <yu-xtable ref="refTable" style="margin-top: 10px" row-number request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseparams" default-load="false">       
                <yu-xtable-column label="分项编号" prop="apprSubSerno"></yu-xtable-column>
                <yu-xtable-column label="分项类型" prop="copType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
                <yu-xtable-column label="批复编号" prop="apprSerno" width="180"></yu-xtable-column>
                <yu-xtable-column label="产品名称" prop="limitSubName"></yu-xtable-column>
                <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
                <yu-xtable-column label="额度到期日" prop="endDate"></yu-xtable-column>
                <yu-xtable-column label="授信总额" prop="avlAmt" :formatter="Currency"></yu-xtable-column>
                <yu-xtable-column label="授信总额已用" prop="outstndAmt" :formatter="Currency"></yu-xtable-column>
                <yu-xtable-column label="原额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
                <yu-xtable-column label="修改后额度状态" prop="afterLmtStatus" rules="required" :disabled="pageParams.opType == 'details'" ctype="select" data-code="STD_ZB_APPR_ST" exclude-key="90,99" :datacode-filter="datacodeFilterFn"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
          </yu-xform>
        </div>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'details' && opType">暂存</yu-button>
          <yu-button type="primary" @click="commit" v-if="pageParams.opType !== 'details' && opType">提交</yu-button>
          <yu-button type="primary" @click="cancelFn" v-if="!pageParams.flowPage">返回</yu-button>
        </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史" name="cooPlanApp">
        <coop-approval :params="agrParam"></coop-approval>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import { request } from 'xy-utils';
import coopApproval from '../coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_ZB_APPR_ST,STD_ZB_PARTNER_TYPE');
export default {
  components: {coopApproval},
  mixins: [mixin],
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      activeName: 'cooProFrozeUnfrozeApply',
      dataUrl: this.$backend.cmisLmt + '/api/coopprofrozeunfrozesub/',
      updateUrl: this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/update',
      addUrl: this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/',
      formdata: {},
      formType: 'edit',
      agrParam: {},
      formRules: {},
      imageUrls: {},
      pageParams: this.$route.meta.params,
      baseparams: {},
      partnerType: '',
      opType: true
    };
  },
  created () {
    let _this = this;
    let serno = "";   
    if (this.bizPageData && this.bizPageData.instanceInfo) {      
      this.opType = false;
      this.pageParams = this.bizPageData.instanceInfo;
      serno = this.bizPageData.instanceInfo.bizId;
      this.formType = "details";
      this.partnerType = this.bizPageData.instanceInfo.param.partnerType;
      this.pageParams.flowPage = true;
      this.pageParams.opType = "details";
    } else if (this.pageParams) {
      serno = this.pageParams.serno;
      this.formType = this.pageParams.opType;
      this.partnerType = this.pageParams.partnerType;
    }
    
    this.agrParam.serno = serno;
    _this.baseparams = {condition: {'serno': serno}};
    
    yufp.service.request({
      method: 'POST',
      url: `${backend.cmisLmt}/api/coopprofrozeunfrozeapp/${serno}`,
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '90' || op.key === '99') {
          return true;
        }
        return false;
      });
    },
    /**
       * 保存数据
       **/
    saveData () {
      const _this = this;
      let model = {};
      yufp.clone(this.formdata, model);
      const param = {
        coopProFrozeUnfrozeApp: model,
        coopProFrozeUnfrozeSub: _this.$refs.refTable.$refs.table.data
      };
      return request({
        url: `${backend.cmisLmt}/api/coopprofrozeunfrozeapp/updateCoopProApp`,
        method: 'POST',
        data: JSON.stringify(param)
      });
    },
    // 暂存
    tempSave () {
      const _this = this;
      _this.saveData().then(res => {
        if (res.code == '0') {
          _this.$xutils.showMsgBox('提示', '保存成功');
        }
      });
    },
    /**
    * 提交
    */
    commit () {
      // 保存
      let _this = this;
      let validate = false;
      let validateTable = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$xutils.showMsgBox('提示', '请填写申请原因');
        return false;
      }
      const list = this.$refs.refTable.$refs.table.data;
      if (list.length == 0) {
        _this.$xutils.showMsgBox('提示', '无合作方分项/项目额度数据');
        return false;
      }
      this.$refs.refTable.validate(function (valid) {
        validateTable = valid;
      }, true);
      validateTable = validateTable == null ? true : validateTable;
      if (!validateTable) {
        _this.$xutils.showMsgBox('提示', '请选择额度状态');
        return false;
      }
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
        data: {condition: JSON.stringify({partnerNo: _this.formdata.partnerNo, partnerStatus: '1'})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let list = response.data;
            if(list.length === 0){
              this.$xutils.showMsgBox('提示', '合作方已退出，无法进行该操作');
              return false;
            }else{
              this.submitFn();
            }
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
            return false;
          }
        }
      });
      _this.saveData().then(res => {
        if (res.code == '0') {
          this.submitFlow();
        } else {
          _this.$xutils.showMsgBox('提示', '数据保存失败');
        }
      });
    },
    submitFlow: function () {
      // 提交流程
      const userInfo = this.$xutils.getLoginUserInfo();
      // orgType 0 总行部门 其他是分支机构
      // appType 1冻结 2解冻
      const orgType = userInfo.org.orgType;
      let bizType = '';
      if (this.formdata.appType == '1' && orgType == 0) {
        // 冻结 HZ012 总行部门
        bizType = 'HZ012';
      } else if (this.formdata.appType == '1' && orgType != 0) {
        // 冻结 HZ009 分支机构
        bizType = 'HZ009';
      } else if (this.formdata.appType == '2' && orgType == 0) {
        // 2解冻 HZ013合作方额度解冻（总行部门）
        bizType = 'HZ013';
      } else if (this.formdata.appType == '2' && orgType != 0) {
        // 2解冻 HZ010合作方额度解冻（分支机构）
        bizType = 'HZ010';
      }
      // 获取项目类型
      var proType = '';
      if (this.partnerType == '1') {
        // 获取
        var selectArray = this.$refs.refTable.$refs.table.data;
        if (selectArray != null && selectArray.length > 0) {
          var json = selectArray[0];
          var proNo = json.apprSubSerno;
          yufp.service.request({
          method: 'GET',
          async: false,
          url: this.$backend.cmisBiz + '/api/coopproaccinfo/' + proNo,
          callback: function (code, message, response) {
            if (response.code == '0') {
              var data = response.data;
              if (data != null) {
                proType = data.proType; 
              }
            } else {
              this.$xutils.showMsgBox('提示', response.erortx);
              return false;
            }
          }
          });
        }
      }
      var startdto = {};
      startdto.systemId = 'dscms';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizType = bizType;
      startdto.bizId = this.formdata.serno;
      startdto.bizUserName = this.formdata.partnerName;
      startdto.bizUserId = this.formdata.partnerNo;
      startdto.param = {
        orgType: orgType,
        partnerType: this.partnerType,
        proType: proType
      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 关闭页面 */
    cancelFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
