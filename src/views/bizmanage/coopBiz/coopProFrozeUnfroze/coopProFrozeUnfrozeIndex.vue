<template>
  <div>
    <yu-panel title="合作方额度冻结解冻" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTableCoop">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="申请类型" ctype="select" data-code="STD_COOP_PRO_APP_TYPE" placeholder="申请类型" name="appType"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="yu-xuser" placeholder="登记人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="yu-xorg" placeholder="登记机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_add" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
        <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" ref="btn_dodelete" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" ref="btn_lookup" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
        <yu-button type="primary" ref="btn_docommit" @click="submitBeforeFn" hidden>提交</yu-button>
      </template>
      <yu-xtable ref="refTableCoop" row-number request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="appType" data-code="STD_COOP_PRO_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" width="100" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="总合作额度(元)" prop="lmtAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="额度起始日" prop="coopStartDate"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="coopEndDate"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :visible.sync="dialogVisible" width="600px" title="合作方额度冻结/解冻">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="1">
          <yu-xform-item label="申请类型" name="appType" ctype="select"  placeholder="申请类型" :rules="{ required: true, message: '字段不能为空' }" data-code="STD_COOP_PRO_APP_TYPE"></yu-xform-item>
          <yu-xform-item label="合作方编号"  ctype="YufpZrcSelector" name="partnerNo"  placeholder="合作方编号" :params="contParms" :rules="{ required: true, message: '字段不能为空' }" @select-fn="commonSelectFn1"></yu-xform-item>
          <yu-xform-item label="合作方名称"  disabled="true" ctype="input" name="partnerName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="doNextStep">下一步</yu-button>
        <yu-button type="primary" @click="dialogVisible=!dialogVisible">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="successWf"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_PARTNER_TYPE,STD_ZB_APPR_ST');
import mixin from '@/utils/mixin';
import mixinForm from '@/utils/mixins/mixin-form';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { yufpNwfInit},
  mixins: [mixin, mixinForm],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/batchdelete/',
      formdata: {},
      contParms: {
        title: '选择合作方额度',
        queryFields: [{ placeholder: '合作方编号', field: 'cusId', type: 'input', fuzzyQuery: 'false' }, { placeholder: '合作方名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.cmisLmt}/api/apprcoopinfo/queryListByInstuCdeForDj`,
        tableColumns: [{ label: '合作方编号', prop: 'cusId' }, { label: '批复台账编号', prop: 'apprSerno' }, { label: '合作方名称', prop: 'cusName' }, { label: '合作方类型', prop: 'copType', dataCode: 'STD_PARTNER_TYPE'}, { label: '额度起始日', prop: 'startDate' }, { label: '额度到期日', prop: 'endDate' }, { label: '总合作额度', prop: 'totalAmt' }, { label: '已用额度', prop: 'totalUseAmt' }, { label: '可用额度', prop: 'totalValAmt' }],
        baseParams: {condition: {'managerId': this.$xutils.getLoginUserInfo().loginCode}}
      }
    };
  },
  methods: {
    /**
     * 将表格的数据，赋值给表单字段
     */

    commonSelectFn1 (arr) {
      this.formdata.partnerNo = arr[0].cusId;
      this.formdata.partnerName = arr[0].cusName;
      this.formdata.coopPlanNo = arr[0].apprSerno;
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /**
     * 下一步
     */
    doNextStep () {
      let _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let row = {};
      const data = {
        'partnerNo': _this.formdata.partnerNo,
        'appType': _this.formdata.appType,
        'coopPlanNo': _this.formdata.coopPlanNo
      };
      this.$xutils.request({
        url: this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/create',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            row = yufp.clone(response.data);
            row['opType'] = 'EDIT';
            row.callback = function () {
              _this.$refs.refTableCoop.remoteData();
            };
            var title = '合作方额度冻结';
            if (_this.formdata.appType == '2') {
              title = '合作方额度解冻';
            }
            this.opendTab(row, title, row.serno);
            _this.dialogVisible = false;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },
    opendTab (params, title, key) {
      const _this = this;
      _this.$router.addTab({
        name: 'bizmanage/coopBiz/coopProFrozeUnfroze/coopProFrozeUnfrozeApplyIndex',
        key: 'page' + key,
        title: title,
        data: params,
        afterTabClose: () => {
          _this.$refs.refTableCoop.remoteData();
        }
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTableCoop.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let row = _this.$refs.refTableCoop.selections[0];
      const approveStatus = row.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != row.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以修改!');
        return;
      } else {
        let model = {};
        yufp.clone(_this.$refs.refTableCoop.selections[0], model);
        model['opType'] = 'EDIT';
        this.opendTab(model, '合作方额度冻结/解冻修改', 'EDIT' + model.serno);
      }
    },
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableCoop.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let model = {};
      yufp.clone(_this.$refs.refTableCoop.selections[0], model);
      model['opType'] = 'details';
      this.opendTab(model, '合作方额度冻结/解冻查看', 'VIEW' + model.serno);
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTableCoop.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let row = _this.$refs.refTableCoop.selections[0];

      const approveStatus = row.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != row.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以删除!');
        return;
      }
      // var len = selections.length,
      //   arr = [];
      // for (let i = 0; i < len; i++) {
      //   arr.push(selections[i].serno);
      // }
      let url = _this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/batchdelete/' + row.serno;
      if (row.apprStatus === '992') {
        url = _this.$backend.cmisLmt + '/api/coopprofrozeunfrozeapp/update';
        row.apprStatus = '996';
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
              url: url,
              data: JSON.stringify(_this.$xutils.toUpperCase(row, true)),
              callback: function (code, message, response) {
                _this.$refs.refTableCoop.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    submitBeforeFn () {
      var _this = this;
      var selections = _this.$refs.refTableCoop.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return false;
      }
      let row = selections[0];
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
        data: {condition: JSON.stringify({partnerNo: row.partnerNo, partnerStatus: '1'})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let list = response.data;
            if (list.length === 0) {
              this.$xutils.showMsgBox('提示', '合作方已退出，无法进行该操作');
              return false;
            } else {
              this.submitFn();
            }
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
            return false;
          }
        }
      });
      return true;
    },
    /**
     * 提交流程操作
     */
    submitFn: function () {
      var _this = this;
      var selections = _this.$refs.refTableCoop.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      const rowData = selections[0];
      const approveStatus = rowData.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != rowData.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以提交!');
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      // orgType 0 总行部门 其他是分支机构
      // appType 1冻结 2解冻
      const orgType = loginUser.org.orgType;
      let bizType = '';
      if (rowData.appType == '1' && orgType == 0) {
        // 冻结 HZ012 总行部门
        bizType = 'HZ012';
      } else if (rowData.appType == '1' && orgType != 0) {
        // 冻结 HZ009 分支机构
        bizType = 'HZ009';
      } else if (rowData.appType == '2' && orgType == 0) {
        // 2解冻 HZ010 总行部门
        bizType = 'HZ013';
      } else if (rowData.appType == '2' && orgType != 0) {
        // 2解冻 HZ013 分支机构
        bizType = 'HZ010';
      }
      const partnerType = rowData.partnerType;
      // 获取项目类型
      var proType = '';
      if (partnerType == '1') {
        yufp.service.request({
          method: 'POST',
          async: false,
          data: {condition: JSON.stringify({serno: rowData.serno})},
          url: this.$backend.cmisLmt + '/api/coopprofrozeunfrozesub/',
          callback: function (code, message, response) {
            if (response.code == '0') {
              var coopProFrozeUnfrozeSubArray = response.data;
              if (coopProFrozeUnfrozeSubArray != null && coopProFrozeUnfrozeSubArray.length > 0) {
                // 项目列表中都属于一种项目类型
                var json = coopProFrozeUnfrozeSubArray[0];
                var proNo = json.apprSubSerno;
                yufp.service.request({
                  method: 'GET',
                  async: false,
                  url: _this.$backend.cmisBiz + '/api/coopproaccinfo/' + proNo,
                  callback: function (code, message, response) {
                    if (response.code == '0') {
                      var data = response.data;
                      if (data != null) {
                        proType = data.proType;
                      }
                    } else {
                      _this.$xutils.showMsgBox('提示', response.erortx);
                      return false;
                    }
                  }
                });
              }
            } else {
              this.$xutils.showMsgBox('提示', response.erortx);
              return false;
            }
          }
        });
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'dscms';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = rowData.serno;
      startdto.bizUserName = loginUser.userName;
      startdto.bizUserId = loginUser.loginCode;
      startdto.param = {
        orgType: orgType,
        partnerType: partnerType,
        proType: proType
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    successWf () {
      this.$refs.refTableCoop.remoteData();
    }
  }
};
</script>
