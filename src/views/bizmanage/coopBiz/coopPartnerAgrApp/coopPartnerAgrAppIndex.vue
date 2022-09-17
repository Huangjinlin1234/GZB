<template>
  <div>
    <yu-panel title="合作方协议申请列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px"  related-table-name="refTable1">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate" ></yu-xform-item>
          <yu-xform-item label="经办人" ctype="yu-xuser" placeholder="登记人" @select-fn="commonSelectFn" :mapping="{'loginCode':'inputId'}" name="inputId"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="yu-xorg" placeholder="登记机构"  @select-fn="commonSelectFn" :mapping="{'orgCode':'inputBrId'}" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型" name="coopAgrOprType"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_add" v-if="checkCtrl('add')" @click="add">新增</yu-button>
        <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="update">修改</yu-button>
        <yu-button type="primary" ref="btn_dodelete" v-if="checkCtrl('delete')" @click="dodelete">删除</yu-button>
        <yu-button type="primary" ref="btn_lookup" v-if="checkCtrl('view')" @click="lookup">查看</yu-button>
        <yu-button type="primary" ref="btn_docommit" @click="docommit" hidden>提交</yu-button>
      </template>
      <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="{sort: 'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="协议编号" prop="coopAgrNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="协议金额" prop="coopAgrAmt" :formatter="Currency" width="140"></yu-xtable-column>
        <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
        <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
        <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="coopAgrOprType" data-code="STD_COOP_PLAN_OPR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_COOP_PLAN_OPR_TYPE');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { request } from 'xy-utils';
import mixin from '@/utils/mixin';
export default {
  components: {yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixin],
  data () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/cooppartneragrapp/query',
      baseParams: {}
    };
  },
  mounted () {
  },
  methods: {
    /**
     * 将表格的数据，赋值给表单字段
     */
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    // 新增
    add () {
      this.$dialog.open(
        '合作方协议新增向导',
        'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppAddIndex',
        500,
        460
      );
    },
    // 修改
    update () {
      const rowData = this.$refs.refTable1.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      const apprStatus = rowData.apprStatus;// 审批状态
      const inputId = rowData.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为【待发起】、【退回】且经办人是自己的协议申请！');
        return;
      }
      let title = '';
      if (rowData.coopAgrOprType == '1') {
        title = '合作方协议新增-修改';
      } else if (rowData.coopAgrOprType == '2') {
        title = '合作方协议变更-修改';
      } else {
        title = '合作方协议续签-修改';
      }
      let jsonParam = yufp.clone(rowData, {});
      jsonParam.op = 'EDIT';
      jsonParam.isFromAgrMenu = true;
      this.$router.addTab({
        name: 'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        key: 'custom_edit_' + jsonParam.serno,
        title: title,
        data: jsonParam
      });
    },

    // 删除
    dodelete () {
      const rowData = this.$refs.refTable1.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      const apprStatus = rowData.apprStatus;// 审批状态
      const inputId = rowData.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能删除审批状态为【待发起】、【退回】且经办人是自己的协议申请！!');
        return;
      }
      this.$xutils.showConfirmBox('提示', '你真的想删除选中的记录行?\r\n请谨慎操作!', 350, 150, _isOK => {
        if (_isOK) {
          if (apprStatus == '000') { // 待发起--物理删除
            this.$xutils.request({
              url: this.$backend.cmisBiz + '/api/cooppartneragrapp/delete/' + rowData.serno,
              data: JSON.stringify(rowData),
              type: 'POST',
              async: true,
              success: (response, status, xhr) => {
                if (response.code == 0) {
                  this.$xutils.showMsgBox('提示', '删除成功', '300', '150', () => {
                  // 删除成功后刷新列表
                    this.$refs.refTable1.remoteData();
                  });
                }
              }
            });
          } else if (apprStatus == '992') { // 退回--修改审批状态为“自行退出”
            rowData.apprStatus = '996';
            this.$xutils.request({
              url: this.$backend.cmisBiz + '/api/cooppartneragrapp/update',
              data: JSON.stringify(rowData),
              type: 'POST',
              async: true,
              success: (response, status, xhr) => {
                if (response.code == 0) {
                  this.$xutils.showMsgBox('提示', '删除成功', '300', '150', () => {
                  // 删除成功后刷新列表
                    this.$refs.refTable1.remoteData();
                  });
                }
              }
            });
          }
        }
      });
    },
    // 查看
    lookup () {
      const rowData = this.$refs.refTable1.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      let title = '合作方协议查看';
      if (rowData.coopAgrOprType == '1') {
        title = '合作方协议查看';
      } else if (rowData.coopAgrOprType == '2') {
        title = '合作方协议变更详情';
      }
      let jsonParam = yufp.clone(rowData, {});
      jsonParam.op = 'details';
      jsonParam.isFromAgrMenu = true;
      this.$router.addTab({
        name: 'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        key: 'custom_view_' + jsonParam.serno,
        title: title,
        data: jsonParam
      });
    },
    // 提交
    docommit () {
      const rowData = this.$refs.refTable1.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      const apprStatus = rowData.apprStatus;// 审批状态
      const inputId = rowData.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能提交审批状态为【待发起】、【退回】且经办人是自己的申请!');
        return;
      }
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
        data: {condition: JSON.stringify({partnerNo: rowData.partnerNo, partnerStatus: '1'})},
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
      const partnerType = rowData.partnerType;
      if (partnerType == '2') {
        var bailAccNo = rowData.bailAccNo;// 保证金账号
        var bailAccNoSubSeq = rowData.bailAccNoSubSeq;// 保证金账号子序号
        // var bailAccNoAmt = rowData.bailAccNoAmt;//当前保证金金额(元)
        if (rowData.bailPerc > 0) {
          if (!(bailAccNo && bailAccNoSubSeq)) {
            this.$xutils.showMsgBox('提示', '<专业担保公司>必须录入保证金账号、保证金账号子序号信息！');
            return;
          }
        }
      }
      const _this = this;
      _this.checkSubmit().then(res => {
        if (res.code == 0) {
          _this.submitWf(rowData);
        }
      });
    },
    submitWf (rowData) {
      const loginUser = this.$xutils.getLoginUserInfo();
      let bizType = '';
      const orgType = loginUser.org.orgType;
      if (orgType == '') {
        this.$xutils.showMsgBox('提示', '机构类型未添加(总行/支行),请联系管理员');
        return false;
      }
      if (rowData.coopAgrOprType == '1' && orgType == 0) {
        // HZ007 总行部门
        bizType = 'HZ007';
      } else if (rowData.coopAgrOprType == '1' && orgType != 0) {
        // HZ005 分支机构
        bizType = 'HZ005';
      } else if ((rowData.coopAgrOprType == '2') && orgType == 0) {
        // HZ008 总行部门-变更
        bizType = 'HZ008';
      } else if (rowData.coopAgrOprType == '3' && orgType == 0) {
        // HZ019 总行部门-续签
        bizType = 'HZ019';
      } else if (rowData.coopAgrOprType == '2' && orgType != 0) {
        // HZ006 分支机构-变更
        bizType = 'HZ006';
      } else if (rowData.coopAgrOprType == '3' && orgType != 0) {
        // HZ018 分支机构-续签
        bizType = 'HZ018';
      }
      const partnerType = rowData.partnerType;
      const apprStatus = rowData.apprStatus;
      const coopAgrOprType = rowData.coopAgrOprType;
      // 项目类型
      var proType = '';
      if (partnerType == '1') {
        yufp.service.request({
          method: 'GET',
          async: false,
          data: {condition: JSON.stringify({serno: rowData.serno})},
          url: this.$backend.cmisBiz + '/api/coopreplyagrpro/',
          callback: function (code, message, response) {
            if (response.code == '0') {
              var coopPlanProArray = response.data;
              if (coopPlanProArray != null && coopPlanProArray.length > 0) {
                proType = coopPlanProArray[0].proType;
              }
            } else {
              this.$xutils.showMsgBox('提示', response.erortx);
              return false;
            }
          }
        });
      }
      const startdto = {
        'systemId': 'cmis',
        'orgId': loginUser.org.code,
        'bizId': rowData.serno,
        'bizType': bizType,
        'userId': loginUser.loginCode,
        'bizUserName': rowData.partnerName,
        'bizUserId': rowData.partnerNo,
        'param': {
          coopPlanNo: rowData.coopPlanNo,
          partnerType: partnerType,
          apprStatus: apprStatus,
          orgType: orgType,
          coopAgrOprType: coopAgrOprType,
          proType: proType
        }
      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },
    onBack () {
      this.$refs.refTable1.remoteData();
    },
    checkSubmit () {
      const rowData = this.$refs.refTable1.selections[0];
      return request({
        url: this.$backend.cmisBiz + '/api/cooppartneragrapp/checkSubmit',
        method: 'POST',
        data: JSON.stringify(rowData)
      });
    }
  }
};
</script>
