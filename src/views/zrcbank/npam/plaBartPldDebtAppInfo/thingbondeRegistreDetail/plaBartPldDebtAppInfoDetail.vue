<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 以物抵债登记详情
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="以物抵债登记详情" name="base">
        <yu-panel>
          <yu-xform ref="baseDataForm" label-width="120px" :disabled="viewType" v-model="baseData">
          <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" ctype="input" name="pdraiSerno" disabled></yu-xform-item>
              <yu-xform-item label="客户编号"  ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="贷款金额" name="loanAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="贷款余额" name="loanBalance" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="拖欠利息" name="totalTqlxAmt" ctype="input"  disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="抵债资产信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="是否我行抵押物" ctype="select" name="isBankPldimn" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
              <yu-xform-item label="抵质押物编号" ctype="input" name="pldimnNo" rules="required" ></yu-xform-item>
              <yu-xform-item label="抵债物类型" name="resistDebtType" ctype="select" data-code="STD_RESIST_DEBT_TYPE" ></yu-xform-item>
              <yu-xform-item label="最高可抵押金额" name="highPldAmt" ctype="input" ></yu-xform-item>
              <yu-xform-item label="抵债押物名称" name="pldimnMemo" ctype="input" ></yu-xform-item>
              <yu-xform-item label="抵质押人名称" name="pldimnPerson" ctype="input" ></yu-xform-item>
              <yu-xform-item label="权属证件号码" name="authoCertCode" ctype="input" ></yu-xform-item>
              <yu-xform-item label="抵押物状态" name="pldimnStatus" ctype="select" data-code="STD_PLDIMN_STATUS" ></yu-xform-item>
              <yu-xform-item label="抵债物取得方式" ctype="input" name="resistDebtGetMode" rules="required" ></yu-xform-item>
              <yu-xform-item label="债务人名称" ctype="input" name="debtorName" rules="required" ></yu-xform-item>
              <yu-xform-item label="债务金额" ctype="input" name="debtAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label="数量" name="qnt" ctype="input" rules="required" ></yu-xform-item>
              <yu-xform-item label="存放地址" name="depoAddr" ctype="input" rules="required" :colspan="24" ></yu-xform-item>
              <yu-xform-item label="评估价值" name="evalValue" ctype="input" rules="required" ></yu-xform-item>
              <yu-xform-item label="接收价值（法院裁定价值/协议价值）" name="rcvValue" ctype="input" rules="required" ></yu-xform-item>
              <yu-xform-item label="法律文书编号" name="legalInstruNo" ctype="input" ></yu-xform-item>
              <yu-xform-item label="法律文书名称" name="legalInstruName" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="法院/仲裁机构名称" name="court" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="是否出租" name="isRent" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
              <yu-xform-item label="租赁起始日" name="rentStartDate" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="租赁到期日" name="rentEndDate" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="法律文书生效日期" name="legalInstruInureDate" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="法律文书落款日期" name="legalInstruEndDate" ctype="input" placeholder=" " ></yu-xform-item>
              <yu-xform-item label="责任人" name="managerId" ctype="input" rules="required" ></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrId" ctype="input" rules="required" ></yu-xform-item>
              <yu-xform-item label="账务机构编号" name="managerBrIdName" ctype="input" rules="required" placeholder="账务机构编号" ></yu-xform-item>
              <yu-xform-item label="账务机构名称" name="finaBrId" ctype="input" rules="required" placeholder="账务机构名称" ></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          </yu-xform>
        </yu-panel>
        <yu-panel title="关联借据信息" :hideFilter="false" :collapseHide="false">
         <!-- <yu-button-drop v-if="viewType != 'DETAIL'">
            <yu-button type="primary" @click="addFn">引入</yu-button>
            <yu-button type="primary" @click="deleteFn">删除</yu-button>
            <yu-button type="primary" @click="infoFn">保存</yu-button>
          </yu-button-drop> -->
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl"
            :pageable="false" request-type="POST" selection-type="radio" :base-params="baseParams" >
            <yu-xtable-column align="center" label="合同编号 " prop="contNo" ></yu-xtable-column>
            <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt" ></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" ></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" ></yu-xtable-column>
            <yu-xtable-column align="center" label="抵债本金" prop="resistCap" ctype="input" :disabled="viewType"></yu-xtable-column>
            <yu-xtable-column align="center" label="抵债利息" prop="resistInt" ctype="input" :disabled="viewType"></yu-xtable-column>
            <yu-xtable-column align="center" label=" 抵债费用" prop="resistExpense" ctype="input" :disabled="viewType"></yu-xtable-column>
          </yu-xtable>
          <yu-form-buttons class="yubfp-button-group" style="text-align: center;" >
            <yu-button type="primary" @click="addFn" :hidden="viewType == 'DETAIL'">提交</yu-button>
            <yu-button type="primary" @click="infoFn" :hidden="viewType == 'DETAIL'">保存</yu-button>
            <yu-button type="primary" @click="deleteFn">返回</yu-button>
          </yu-form-buttons>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="second">
          <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="five">
        <coop-approval :params="childParams"></coop-approval>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_PLDIMN_STATUS,STD_RESIST_DEBT_TYPE');
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { imageSystem, coopApproval },
  data: function () {
    return {
      formData: {},
      baseData: {},
      baseParams: {condition: { pdraiSerno: this.$route.meta.params.pdraiSerno }},
      pdraiSerno: '',
      activeName: 'base',
      viewType: 'DETAIL',
      image: '1',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ04',
          'index': {
            'businessid': this.$route.meta.params.pdraiSerno,
            /** 客户名称 */
            custname: this.$route.meta.params.cusName,
            /** 客户号 */
            custid: this.$route.meta.params.cusId,
            /** 机构名称 */
            orgname: this.$route.meta.params.inputBrIdName
          }
        }
      ],
      detailUrl: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/',
      dataUrl: backend.cmisNpam + '/api/plabartplddebtbillrel/queryByPdraiSerno'
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.pdraiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  
  created () {
    this.afterInit();
  },
  methods: {
    /*
    页面初始化
     */
    afterInit () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      if (this.$route.meta.params.viewType == 'DETAIL') {
          this.image = '2';
      }
      _this.pdraiSerno = _this.$route.meta.params.pdraiSerno;
      // _this.$refs.refTable.remoteData();
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabartplddebtappinfo/getdetail',
        data: _this.pdraiSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$nextTick(() => {
              yufp.clone(response.data, _this.baseData);
            })
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 返回 */
    deleteFn () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
