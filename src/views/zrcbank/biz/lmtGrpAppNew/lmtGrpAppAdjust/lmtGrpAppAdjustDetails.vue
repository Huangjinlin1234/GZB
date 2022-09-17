<template>
  <!--
    @created by 屈文
    @description 集团客户授信明细
  -->
  <div>
      <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number :data="lmtMemberList" request-type="POST" selection-type="checkbox" :pageable="false">
          <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
          <yu-xtable-column label="单一流水号" prop="singleSerno" hide-column></yu-xtable-column>
          <yu-xtable-column label="成员客户编号" prop="cusId" width="220"></yu-xtable-column>
          <yu-xtable-column label="成员客户名称" prop="cusName" width="220"></yu-xtable-column>
          <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" width="220"></yu-xtable-column>
          <yu-xtable-column label="调剂前敞口额度合计（元）" prop="origiOpenLmtAmt" width="220"></yu-xtable-column>
          <yu-xtable-column label="调剂后敞口额度合计（元）" prop="openLmtAmt" width="220"></yu-xtable-column>
          <yu-xtable-column label="调剂前低风险额度合计（元）" prop="origiLowRiskLmtAmt" width="220"></yu-xtable-column>
          <yu-xtable-column label="调剂后低风险额度合计（元）" prop="lowRiskLmtAmt" width="220"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName" width="220"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName" width="220"></yu-xtable-column>
          <yu-xtable-column label="客户经理提交状态" prop="managerIdSubmitStatus" width="220" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="本次是否调剂" prop="isCurtAdjust" width="220" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" width="220" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="underline" @click="viewFn(scope.row)">查看</a>
              <a class="underline" @click="cancelFn(scope.row)" :hidden="isShowBtn">退回</a>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="lmtAdjustForm" label-width="100px" v-model="lmtAdjustFormData">
          <yu-xform-group :column="1">
            <yu-xform-item label="成员额度调剂说明" ctype="textarea" name="memLmtAdjustDesc" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="授信分项明细" :hideFilter="false" :collapseHide="false">
        <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border :tree-props="{children: 'childrenLmtGrpAppSubDtoList', hasChildren: 'hasChildren'}" :pageable="false">
          <yu-xtable-column prop="cusName" label="所属成员名称" sortable width="220"></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="200">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewSubOrPrd(scope.row)">{{ scope.row.subPrdSerno }}</a>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="origiLmtAccSubPrdNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="origiLmtAccSubPrdAmt" label="调剂前授信额度（元）"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="调剂后授信额度（元）"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="授信期限（月）" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_ZB_GUAR_WAY,STD_ZB_APPR_STATUS');
// import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      lmtMemberList: [],
      lmtAppSubList: [],
      lmtAdjustFormData: {},
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      dialogVisibleAdjust: false,
      isShowBtn: false,
      grpSerno: ''
    };
  },

  mounted () {
    var _this = this;
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      grpSerno = data.bizId;
      _this.grpSerno = grpSerno;
      _this.isShowBtn = true;
    } else if (_this.getFactory().contextData.grpSerno) {
      data = _this.getFactory().contextData;
      grpSerno = data.grpSerno;
      _this.grpSerno = grpSerno;
      if (data.op == 'VIEW') {
        _this.isShowBtn = true;
      }
    } else {
      data = _this.$route.meta.params;
      grpSerno = data.grpSerno;
      _this.grpSerno = grpSerno;
      if (data.op == 'VIEW') {
        _this.isShowBtn = true;
      }
    }
    // 初始化授信分项明细列表
    _this.initSubAndPrdList(grpSerno);
    // 初始化授信成员信息列表
    _this.initMemberList(grpSerno);
    // 初始化 成员额度调剂说明
    _this.initMemLmtAdjustDesc(grpSerno);
  },

  methods: {
    /**
     *通过分项或产品流水号查看对应详情
     */
    viewSubOrPrd: function (data) {
      var _this = this;
      if (data.isRevolvLimit != '1' && data.isRevolvLimit != '0') {
        _this.viewSub(data);
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['subPrdSerno'] = data.subPrdSerno;
        json['model_group_no'] = 'CMG000700';
        this.$dialog.open(
          '单一客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1600,
          800,
          json,
          null,
          true,
          true
        );
      }
    },
    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000696';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno;
      data['disAble'] = true;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        null,
        true,
        true
      );
    },
    // 授信分项明细列表
    initSubAndPrdList: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsubprd/querylmtgrpappsubsumbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data;
        }
      });
    },
    // 客户成员列表信息
    initMemberList: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberList = response.data;
        }
      });
    },
    // 成员额度调剂说明
    initMemLmtAdjustDesc: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbygrpserno',
        data: {grpSerno: grpSerno},
        callback: function (code, message, response) {
          _this.lmtAdjustFormData.memLmtAdjustDesc = response.data.memLmtAdjustDesc;
        }
      });
    },

    /**
      *查看分项信息
      */
    viewFn: function (data) {
      data['model_group_no'] = 'CMG000702';
      data['op'] = 'VIEW';
      data['serno'] = data.singleSerno;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        800,
        data,
        null,
        true,
        true
      );
    },

    // 退回
    cancelFn: function (data) {
      var _this = this;
      if (data.managerIdSubmitStatus == null || data.managerIdSubmitStatus == '') {
        _this.$message('客户经理提交状态未识别!');
        return;
      }
      if (data.isPrtcptCurtDeclare != '0' && data.managerIdSubmitStatus != '997') {
        _this.$message('当前数据状态不可以进行退回操作!');
        return;
      }

      // var pkID = data.pkId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/returnbacklmtgrpappsingle',
        data: data.pkId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('退回成功');
            _this.initMemberList(_this.grpSerno);
          } else {
            _this.$message('退回失败');
            return;
          }
        }
      });
    }
  }
};
</script>
