<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
        <yu-panel title="授信品种信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled :colspan="12"  @change="getCusId(formdata.cusId)" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项适用产品流水号" ctype="input" name="subPrdSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信分项流水号" ctype="input" name="subSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信品种编号" ctype="yu-xlmtsub-tree" rules="required" name="lmtBizType"  :disabled="type!='ADD'&&type!='REFINE'" width="480" height="480" :parms="params" @select-fn="commonSelectFn" :show-text="false" :mapping="{'id':'lmtBizType','label':'lmtBizTypeName','lmtSubType':'lmtSubType'}"></yu-xform-item>
            <yu-xform-item label="授信品种名称" ctype="input" name="lmtBizTypeName" rules="required"  @change="getLmtPrdNo(formdata.lmtBizType)" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="产品类型属性" v-if="filter!=''" ctype="select" name="lmtBizTypeProp" :colspan="12" :data-code="cpDataCode" :exclude-key="filter" :disabled="type!='ADD'&&type!='REFINE'" @change="getPartner"></yu-xform-item>
            <yu-xform-item label="企业信用评分" v-if="filter1=='P010'" ctype="yu-num" name="qyxyScore" rules="required" @change="changePartnerReq" :colspan="12" :exclude-key="filter1" ></yu-xform-item>
            <yu-xform-item label="合作方编号" v-if="(type=='ADD'||type=='REFINE') && filter1!=''" ctype="yu-xcustom-ref" name="partnerNo" :rules="{ required: isPartnerRequired, message: '字段不能为空' }" :colspan="12" @select-fn="commonSelectFn" :mapping="{'partnerNo':'partnerNo','partnerName':'partnerName'}"  width="1000" height="600" pagePath="zrcbank/biz/lmtComBiz/lmtApp/lmtAppChg/coopPartnerPopPage" title="合作方选取" :exclude-key="filter1" :disabled="type!='ADD'&&type!='REFINE'" ></yu-xform-item>
            <yu-xform-item label="合作方编号" v-if="type!='ADD'&&type!='REFINE' && filter1!=''" ctype="input" name="partnerNo" :rules="{ required: isPartnerRequired, message: '字段不能为空' }" :colspan="12" :exclude-key="filter1" :disabled="type!='ADD'&&type!='REFINE'" ></yu-xform-item>
            <yu-xform-item label="合作方名称" v-if="filter1!=''" ctype="input" name="partnerName" :rules="{ required: isPartnerRequired, message: '字段不能为空' }" :colspan="12" :exclude-key="filter1" :disabled="type!='ADD'&&type!='REFINE'"></yu-xform-item>
            <yu-xform-item label="对接记录ID" v-if="(type=='ADD'||type=='REFINE') && filterZxd!=''" ctype="yu-xcustom-ref" name="applyRecordId" :rules="{ required: isPartnerRequired, message: '字段不能为空' }" :colspan="12" @select-fn="commonSelectFn" :mapping="{'applyRecordId':'applyRecordId'}"  width="1000" height="600" pagePath="zrcbank/biz/lmtComBiz/lmtApp/lmtAppChg/zxdPreLmtApplyPop" title="征信贷预授信评分卡选取" :exclude-key="filterZxd" :disabled="type!='ADD'&&type!='REFINE'" :params="zxdParams"></yu-xform-item>
            <yu-xform-item label="对接记录ID" v-if="type!='ADD'&&type!='REFINE' && filterZxd!=''" ctype="input" name="applyRecordId" :rules="{ required: isPartnerRequired, message: '字段不能为空' }" :colspan="12" :exclude-key="filterZxd" :disabled="type!='ADD'&&type!='REFINE'" ></yu-xform-item>
            <yu-xform-item label="分项类型" ctype="input" name="lmtSubType" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" rules="required" disabled data-code="STD_ZB_YES_NO" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" name="curType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信额度(元)" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="额度期限(月)" ctype="input" name="lmtTerm" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信起始日" ctype="input" name="startDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信到期日" ctype="input" name="endDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" sign="%" name="bailPreRate" :rules="{ required: isZCCReq, message: '保证金比例字段不能为空' }" :hidden="isShowByPrd" :colspan="12" :multiple="100"></yu-xform-item>
            <yu-xform-item label="宽限期" ctype="input" name="lmtGraperTerm" v-if="isPre=='0'" :colspan="12"></yu-xform-item>
            <yu-xform-item label="原额度分项编号" ctype="input" name="origiLmtAccSubPrdNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项金额" ctype="yu-num" number-formatter="0,000.00" name="origiLmtAccSubPrdAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项期限" ctype="input" name="origiLmtAccSubPrdTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="变更标志" ctype="input" name="chgFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="调剂标志" ctype="input" name="adjustFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否本次细化" ctype="input" name="isCurtRefine" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否存量授信标志" ctype="input" name="isSfcaLmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="年利率" ctype="yu-num" sign="%" name="rateYear" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" :hidden="isShowByPrd1" :datacode-filter="datacodeFilterFn" v-if="isPre=='0'"   @change="repayModeChg(formdata.repayMode)" :colspan="12"></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" name="eiMode" v-if="isPre=='0'" :hidden="isShowByPrd1" data-code="STD_EI_MODE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否借新还旧" ctype="select" v-model="isRefinance" v-if="isPre=='0'&&!lmtPrd&&lmtType!='01'" data-code="STD_ZB_YES_NO" @change="getIsRefinance(formdata.isRefinance)" name="isRefinance" :hidden="isLmtType01"></yu-xform-item>
            <yu-xform-item label="是否无还本续贷" ctype="select" v-model="isRwrop" v-if="isPre=='0'&&!lmtPrd&&lmtType!='01'" data-code="STD_ZB_YES_NO" @change="getIsRwrop(formdata.isRwrop)" name="isRwrop" :hidden="isLmtType01"></yu-xform-item>
            <yu-xform-item label="手续费率" ctype="yu-num" sign="%" name="chrgRate" v-if="isPre=='0'&&lmtPrd" :colspan="12"></yu-xform-item>
            <yu-xform-item label="手续费收取方式" ctype="select" v-if="isPre=='0'&&lmtPrd" name="chrgCollectMode" data-code="STD_CHRG_COLLECT_MODE" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" rules="required" data-code="STD_ZB_YES_NO" v-if="isPre=='1'" :colspan="12"></yu-xform-item>
            <yu-xform-item label="还款计划描述" ctype="input" type="textarea" v-if="repayModel" name="repayPlanDesc" :colspan="22"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" v-if="isPre=='0'&&lmtPrd">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人名称" ctype="yu-xcustom-ref" name="consignorCusName" :colspan="12"  @select-fn="commonSelectFn" :mapping="{'cusId':'consignorCusId','cusName':'consignorCusName','certType':'consignorCertType','certCode':'consignorCertCode','cusType':'consignorType'}" width="720" height="480" idField="cusId" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="委托人选取" @change="getLmtType(formdata.cusId)"  ></yu-xform-item>
            <yu-xform-item label="委托人类型" ctype="select" name="consignorType" data-code="STD_ZB_CUS_TYP" :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="input" name="consignorCertType" data-code="STD_ZB_CERT_TYP" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" name="consignorCertCode" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人客户号" ctype="input" name="consignorCusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" v-if="type=='ADD'||type=='REFINE'"  @click="onSave">确定新增</yu-button>
        <yu-button type="primary" v-if="type=='EDIT'||type=='CHG'" @click="onUpdate">保存</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
      <yu-panel title="还款计划表" :hideFilter="false" v-if="repayModel==true&&isPre=='0'" :collapseHide="false">
        <template slot="right">
          <yu-toolbar>
            <yu-button type="primary" ref="btn_onAdd" v-if="type!='VIEW'" @click="addPlan">新增</yu-button>
            <yu-button type="primary" ref="btn_onDelete" v-if="type!='VIEW'" @click="deletePlan">删除</yu-button>
          </yu-toolbar>
        </template>
        <yu-xtable ref="refTable" :data="lmtRepayPlanList" row-number  condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="false">
          <yu-xtable-column label="期数" prop="terms"></yu-xtable-column>
          <yu-xtable-column label="还款时间" prop="repayDate"></yu-xtable-column>
          <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="还款计划新增" :visible.sync="dialogVisibleSelected" width="800px">
        <yu-xform ref="refPlanForm" label-width="120px" v-model="formDataPlan">
          <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="期数" ctype="yu-num" name="terms" placeholder="期数" rules="required" :precision="0" :min="1" ></yu-xform-item>
          <yu-xform-item label="还款时间" ctype="datepicker" name="repayDate" value-format="yyyy-MM-dd" rules="required" placeholder="还款时间"></yu-xform-item>
          <yu-xform-item label="还款金额" ctype="yu-num" number-formatter="0,000.00" name="repayAmt" rules="required" placeholder="还款金额"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
        </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFn">新增</yu-button>
            <yu-button type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <yu-panel title="低风险担保额度" :hideFilter="false" v-if="lowGuarModel" :collapseHide="false">
        <template slot="right">
          <yu-toolbar>
            <yu-button type="primary" ref="btn_onAdd" v-if="type!='VIEW'" @click="addLowGuar">新增</yu-button>
            <yu-button type="primary" ref="btn_onDelete" v-if="type!='VIEW'" @click="deleteLowGuar">删除</yu-button>
          </yu-toolbar>
        </template>
        <yu-xtable ref="refTableLowGuar" :data="lowGuarList" row-number  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="false">
          <yu-xtable-column label="低风险担保细分" prop="lowGuarModeDetail" data-code="STD_ZB_DB_DETAIL"></yu-xtable-column>
          <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="低风险担保额度新增" :visible.sync="dialogVisibleSelectedLowGuar" width="800px">
        <yu-xform ref="lowGuarForm" label-width="120px" v-model="formDataLowGuar">
          <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="subPrdSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="低风险担保细分" ctype="select" name="lowGuarModeDetail" placeholder="低风险担保细分" rules="required" data-code="STD_ZB_DB_DETAIL" ></yu-xform-item>
          <yu-xform-item label="授信额度" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" placeholder="授信额度"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
        </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFnLowGuar">新增</yu-button>
            <yu-button type="primary" @click="cancelFnLowGuar">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
       <yu-panel title="诚易融关联合同" panel-type="simple" v-if="isCyr">
          <yu-toolbar>
            <yu-button type="primary" ref="btn_onAdd" v-if="type!='VIEW'" @click="addCyr">新增</yu-button>
            <yu-button type="primary" ref="btn_onDelete" v-if="type!='VIEW'" @click="deleteCyr">删除</yu-button>
          </yu-toolbar>
        <yu-xtable ref="cyrTable" condition-key="condition" row-number :data-url="cyrUrl" request-type="POST" :base-params="cyrParams">
        <yu-xtable-column label="主键" prop="pkId"  hide-column></yu-xtable-column>
        <yu-xtable-column label="申请流水号" prop="subPrdSerno"  hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" ></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId"  hide-column></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="产品类型属性" prop="prdTypeProp"  data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" ></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType"  data-code="STD_BUSI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate" ></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate" ></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId"  hide-column></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId"  hide-column></yu-xtable-column>
      </yu-xtable>
       </yu-panel>
      <yu-panel title="偿还借据" :hideFilter="false" v-if="accLoanModel==true&&isPre=='0'" :collapseHide="false">
        <template slot="right">
          <yu-toolbar>
            <yu-button type="primary" ref="btn_onAdd" v-if="type!='VIEW'" @click="addLoan">新增</yu-button>
            <yu-button type="primary" ref="btn_onDelete" v-if="type!='VIEW'" @click="deleteLoan">删除</yu-button>
          </yu-toolbar>
        </template>
        <yu-xtable ref="refLoanTable" :data="lmtAccLoanList" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="false">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="借据余额" prop="loanBalance"></yu-xtable-column>
          <yu-xtable-column label="借据起始日" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="借据到期日" prop="loanEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="借据列表" :visible.sync="showAccLoanDialog">
          <yu-xform related-table-name="refAccLoanTable" form-type="search" v-model="searchFormdata4" label-width="50px">
            <yu-xform-group :column="3">
              <yu-xform-item label="借据编号" ctype="input" name="billNo"></yu-xform-item>
              <yu-xform-item label="合同编号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refAccLoanTable" row-number :data-url="dataUrl" condition-key="condition" :default-load="true" selection-type="radio" :base-params="baseParams" requestType="POST" size="full">
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="借据金额" prop="loanAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="借据余额" prop="loanBalance" width="100"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
            <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
            <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
          </yu-xtable>
          <yu-form-buttons align="center">
            <yu-button type="primary" @click="makeSure">确认</yu-button>
            <yu-button type="primary" @click="back">返回</yu-button>
          </yu-form-buttons>
        </yu-xdialog>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="01" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_DB_DETAIL,STD_ZB_CERT_TYP');
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  components: { cfgAssistantTip },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      dialogVisibleSelected: false,
      formDataPlan: {},
      triggerEditChangeEvent: {},
      formType: {},
      isPre: '',
      type: this.getFactory().contextData.op,
      lmtPrd: false,
      repayModel: false,
      lmtRepayPlanList: [],
      lmtTerm: '',
      lmtAmt: '',
      accLoanModel: false,
      showAccLoanDialog: false,
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodel',
      baseParams: {condition: {}, sort: 'createTime desc'},
      isRefinance: '',
      isRwrop: '',
      guarMode: {},
      filter: '',
      prdNo: '',
      isPool: '',
      params: '',
      zxdParams: '',
      isBailPreRate: true,
      propUrl: this.$backend.cmisBiz + '/api/lmtappsubprd/getselectpropbyprdno',
      baseParams1: {},
      optionsData: [{key: '1', value: '2'}],
      cpDataCode: 'STD_PRD_TYPE_PROP',
      isShowByPrd: false,
      isShowByPrd1: false,
      isLmtType01: false,
      lmtType: '',
      filter1: '',
      filterZxd: '',
      serno: '',
      isCyr: false,
      cyrParams: {},
      cyrUrl: '',
      prdCode: '',
      isShow: false, // 小助手是否展示
      prdTypeProp: '', // 小助手产品属性
      isPartnerRequired: true, // 合作方编号，名称必输属性
      isZCCReq: false, // 保证金比例必输
      lowGuarModel: false,
      dialogVisibleSelectedLowGuar: false,
      lowGuarList: []
    };
  },
  mounted () {
    var parentData = this.getFactory().contextData;
    this.initForm(parentData);
    this.getLmtAppData(parentData.subSerno);
    if (parentData.op == 'ADD') {
      if ((this.formdata.guarMode == '00') || parentData.isPreLmt == '1') {
        // this.isBailPreRate = false;
        this.isShowByPrd = true;
      } else {
        // this.isBailPreRate = true;
        this.isShowByPrd = false;
      }
    } else {
      if ((this.formdata.guarMode == '00') || (this.formdata.guarMode == '60' && this.formdata.lmtBizType != '10030101') || parentData.isPreLmt == '1') {
        // this.isBailPreRate = false;
        this.isShowByPrd = true;
      } else {
        // this.isBailPreRate = true;
        this.isShowByPrd = false;
      }
    }
  },
  // mounted后 监控数据变化
  // updated () {
  //   debugger;
  //   this.formdata.repayMode;
  // },
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    /**
     * 还款方式 字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'A001' || op.key == 'A002' || op.key == 'A003' || op.key == 'A009' || op.key == 'A040') {
          return true;
        }
        return false;
      });
    },
    /**
     * 新增授信适用产品
     */
    onSave: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var guarModel = _this.formdata.guarMode;
      var lmtBizType = _this.formdata.lmtBizType;
      var bailPreRate = _this.formdata.bailPreRate;
      // if (guarModel == '60' && !lmtBizType.startsWith('12') && !lmtBizType.startsWith('1003')) {
      //   _this.$xutils.showMsgBox('提示', '当前分项不允许添加该类型产品');
      //   return;
      // }
      if (!lmtBizType.startsWith('12') && bailPreRate == 1) {
        _this.$xutils.showMsgBox('提示', '非低分险业务保证金比例不能100%录入');
        return;
      }
      var isRevolvLimit = _this.formdata.isRevolvLimit;
      var lmtTerm = _this.formdata.lmtTerm - 0;
      var lmtTerm1 = 12;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      if ((lmtBizTypeProp == 'P020' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P021' ||
          lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P007') && (isRevolvLimit == '1' || lmtTerm > lmtTerm1)) {
        _this.$xutils.showMsgBox('提示', '当前授信产品仅支持非循环授信且额度期限不得超过1年');
        return;
      }
      // 知享贷金额不超200万元，单笔业务期限不低于6个月，不超过1年
      if (lmtBizTypeProp == 'P043') {
        var lmtAmt = _this.formdata.lmtAmt - 0;
        var maxAmt = 2000000;
        var minTerm = 6;
        if (lmtAmt > maxAmt || lmtTerm < minTerm || lmtTerm > lmtTerm1) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信额度不得超过200万元，业务期限不得低于6个月或超过1年！');
          return;
        }
      }
      // 拍卖贷授信期限不超过8年
      if (lmtBizTypeProp == 'P044') {
        var mTerm = 96;
        if (lmtTerm > 96) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信期限不得超过8年！');
          return;
        }
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/addlmtappsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              if (_this.formdata.lmtBizType.startsWith('14')) {
                var idList = 'zydkxx';
                var pageList = '专业贷款信息';
                _this.insertMustCheck(_this.serno, _this.lmtType, idList, pageList);
              }
              _this.$message('新增成功');
              _this.type = 'EDIT';
              var subPrdSerno = rtnData.subPrdSerno;
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/lmtappsubprd/selectbysubprdserno',
                data: subPrdSerno,
                callback: function (code, message, response) {
                  yufp.clone(response.data, _this.formdata);
                }
              });
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    insertMustCheck: function (serno, lmtType, idList, pageList) {
      var _this = this;
      let obj = {};
      obj.serno = serno;
      obj.bizType = lmtType;
      obj.idList = idList;
      obj.pageList = pageList;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/bizmustcheckdetails/insertMustCheck',
        data: obj,
        callback: function (code, message, response) {
          if (response.data == '0') {
            _this.$xutils.showMsgBox('系统异常');
          }
        }});
    },
    onUpdate: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      var lmtBizType = _this.formdata.lmtBizType;
      var guarModel = _this.formdata.guarMode;
      var bailPreRate = _this.formdata.bailPreRate;
      if (!lmtBizType.startsWith('12') && bailPreRate == 1) {
        _this.$xutils.showMsgBox('提示', '非低分险业务保证金比例不能100%录入');
        return;
      }
      if (_this.formdata.chgFlag != '1') {
        if (_this.type == 'REFINE' || _this.type == 'CHG') {
          var origiLmtAccSubPrdTerm1 = _this.formdata.origiLmtAccSubPrdTerm - 0;
          var lmtTerm1 = _this.formdata.lmtTerm - 0;
          if (origiLmtAccSubPrdTerm1 < lmtTerm1) {
            _this.formdata.lmtTerm = _this.lmtTerm;
            _this.$xutils.showMsgBox('提示', '当前授信期限不允许延长');
            return;
          }
          var lmtAmt0 = _this.lmtAmt - 0;
          var lmtAmt1 = _this.formdata.lmtAmt - 0;
          if (lmtAmt0 < lmtAmt1) {
            _this.formdata.lmtAmt = _this.lmtAmt;
            _this.$xutils.showMsgBox('提示', '当前授信额度不允许增加');
            return;
          }
        }
      }
      var lmtTerm = _this.formdata.lmtTerm - 0;
      var isRevolvLimit = _this.formdata.isRevolvLimit;
      var lmtTerm1 = 12;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      if ((lmtBizTypeProp == 'P020' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P021' ||
          lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P007') && (isRevolvLimit == '1' || lmtTerm > lmtTerm1)) {
        _this.$xutils.showMsgBox('提示', '当前授信产品仅支持非循环授信且额度期限不得超过1年');
        return;
      }
      if (lmtBizTypeProp == 'P043') {
        var lmtAmt = _this.formdata.lmtAmt - 0;
        var maxAmt = 2000000;
        var minTerm = 6;
        if (lmtAmt > maxAmt || lmtTerm < minTerm || lmtTerm > lmtTerm1) {
          _this.$xutils.showMsgBox('提示', '当前授信产品授信额度不得超过200万元，业务期限不得低于6个月或超过1年！');
          return;
        }
      }

      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/updatelmtappsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('修改成功');
              this.onBack();
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    deleteLowGuar: function () {
      var _this = this;
      var selections = _this.$refs.refTableLowGuar.selections;
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.serno;
      }
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsubprdlowguarrel/deleteLowGuar',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('操作成功');
                  _this.initLowGuar();
                }
              }
            });
          }
        }
      });
    },
    deletePlan: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formDataPlan.serno;
      }
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/repaycapplan/deletelmtrepaycapplan',
              data: selections[0],
              callback: function (code, message, response) {
                // TODO  判断返回内容
                _this.$message('操作成功');
                _this.innitRepayPlanTable(subPrdSerno);
              }
            });
          }
        }
      });
    },
    deleteLoan: function () {
      var _this = this;
      var selections = _this.$refs.refLoanTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtchgsubaccloanrel/deletebybillno',
              data: selections[0].billNo,
              callback: function (code, message, response) {
                // TODO  判断返回内容
                _this.$message('操作成功');
                _this.innitAccLoanTable(subPrdSerno);
              }
            });
          }
        }
      });
    },

    /**
     * 新增还本计划按钮
     */
    addPlan: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.dialogVisibleSelected = true;
      this.$nextTick(function () {
        _this.formDataPlan.serno = subPrdSerno;
      });
    },
    addLowGuar: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.dialogVisibleSelectedLowGuar = true;
      this.$nextTick(function () {
        _this.formDataLowGuar.subPrdSerno = subPrdSerno;
      });
    },
    addCyr: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      var data = {};
      data.cusId = _this.formdata.cusId;
      data.subPrdSerno = subPrdSerno;
      _this.$dialog.open('合同选取', 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppChg/ctrContInfoAppAdd.vue', 1400, 800, data, () => {
        _this.$refs.cyrTable.remoteData();
      });
    },
    deleteCyr: function () {
      var _this = this;
      var selections = _this.$refs.cyrTable.selections;
      var pkId = selections[0].pkId;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsubprdctrloancontrel/logicDelete',
              data: pkId,
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('操作成功');
                  _this.$refs.cyrTable.remoteData();
                }
              }
            });
          }
        }
      });
    },
    initLowGuar: function () {
      var _this = this;
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.subPrdSerno;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsubprdlowguarrel/selectBySubPrdSerno',
        data: subPrdSerno,
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            _this.lowGuarList = response.data;
          }
        }});
    },
    /**
     * 新增还本借据
     */
    addLoan: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      _this.baseParams = {condition: {cusId: _this.formdata.cusId}, sort: 'createTime desc'};
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.showAccLoanDialog = true;
    },
    /**
     * 取消新增还本借据
     */
    back: function () {
      var _this = this;
      _this.showAccLoanDialog = false;
    },
    /**
    * 取消新增还本计划
    */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },
    cancelFnLowGuar: function () {
      var _this = this;
      _this.dialogVisibleSelectedLowGuar = false;
    },
    /**
     * 新增还本计划
     */
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refPlanForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formDataPlan.serno;
      }
      if (_this.formDataPlan.terms <= 0) {
        this.$message('最小期数为1,请重新填写!');
        return;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/saverepayplan',
        data: _this.formDataPlan,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('新增成功');
              _this.dialogVisibleSelected = false;
              _this.innitRepayPlanTable(subPrdSerno);
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.erortx);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    nextFnLowGuar: function () {
      var _this = this;
      var validate = false;
      _this.$refs.lowGuarForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
      if (typeof subPrdSerno === 'undefined') {
        subPrdSerno = _this.formdata.subPrdSerno;
        _this.formDataLowGuar.subPrdSerno = subPrdSerno;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtsubprdlowguarrel/insertLowGuar',
        data: _this.formDataLowGuar,
        success: (response, status, xhr) => {
          if (response.data > 0) {
            this.$message('新增成功');
            _this.dialogVisibleSelectedLowGuar = false;
            _this.initLowGuar();
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    initForm: function (data) {
      var _this = this;
      var op = data.op;
      var isPreLmt = data.isPreLmt;
      _this.guarMode = data.guarMode;
      if (op == 'ADD') {
        yufp.clone(data, _this.formdata);
        if (isPreLmt == '1') {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '1';
        } else {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '0';
        }
      } else if (op == 'REFINE') {
        yufp.clone(data, _this.formdata);
        _this.formdata.isPreLmt = '0';
        _this.isPre = '0';
      } else if (op == 'EDIT' || op == 'VIEW' || op == 'CHG') {
        var subPrdSerno = data.subPrdSerno;
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtappsubprd/selectbysubprdserno',
          data: subPrdSerno,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.formdata);
            _this.isPre = _this.formdata.isPreLmt;
            _this.lmtTerm = _this.formdata.lmtTerm;
            _this.lmtAmt = _this.formdata.lmtAmt;
            _this.isRefinance = _this.formdata.isRefinance;
            _this.isRwrop = _this.formdata.isRwrop;
            _this.innitRepayPlanTable(subPrdSerno);
            _this.innitAccLoanTable(subPrdSerno);
            _this.prdTypeProp = _this.formdata.lmtBizTypeProp;
          }
        });
      }
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.getFactory().back();
    },
    getLmtPrdNo: function (data) {
      var _this = this;
      _this.filter = '';
      _this.cpDataCode = '';
      _this.$nextTick(function () {
        if (data == '14020301') {
          _this.lmtPrd = true;
        } else {
          _this.lmtPrd = false;
        }
        if (data == '14010503') {
          _this.filter1 = data;
        } else {
          _this.filter1 = '';
        }
        if ((_this.formdata.guarMode == '00') || (_this.formdata.guarMode == '60' && _this.formdata.lmtBizType != '10030101') || _this.isPre == '1') {
          // _this.isBailPreRate = false;
          _this.isShowByPrd = true;
        } else {
          // _this.isBailPreRate = true;
          _this.isShowByPrd = false;
          if (_this.isPre == '0' && (data.startsWith('100201') || data.startsWith('1003') || data.startsWith('1301') || data.startsWith('1302') || data.startsWith('110101') || data.startsWith('11010301') || data.startsWith('11010203') || data.startsWith('110106') || data.startsWith('110201') || data.startsWith('11020201') || data.startsWith('11020302'))) {
            _this.isZCCReq = true;
          } else {
            _this.isZCCReq = false;
          }
        }
        if (this.getFactory().contextData.op == 'ADD') {
          if (_this.formdata.lmtBizType == '12010103') {
            _this.lowGuarModel = true;
          }
        } else {
          if (_this.formdata.lmtBizType == '12010103') {
            _this.lowGuarModel = true;
            _this.initLowGuar();
          }
        }
        // 资产池额度1003(startwith)  一般低风险额度12010103 保证金比例及还款结息方式都保留
        // 只留保证金比例的如下：经营周转类额度 1、票据业务-银行承兑汇票开立100201(startwith)  2、商票保贴额度100202(startwith)
        // 贸易融资类额度1、国际贸易融资业务-国际信用证开立110101(startwith)  2、国际贸易融资业务-国内信用证开立110201(startwith)
        // 担保承诺类额度中贷款承诺1303(startwith) 两个都不保留，其余各种保函都只留保证金比例1301 1302(startwith)
        if (data.startsWith('1003') || data == '12010103') {
          if (data.startsWith('1003')) {
            _this.isZCCReq = true;
          }
          _this.isShowByPrd = false;
          _this.isShowByPrd1 = false;
        } else if (data.startsWith('100201') || data.startsWith('100202') || data.startsWith('110101') || data.startsWith('110201') || data.startsWith('1301') || data.startsWith('1302')) {
          _this.isShowByPrd = false;
          _this.isShowByPrd1 = true;
        } else if (data.startsWith('1303')) {
          _this.isShowByPrd = true;
          _this.isShowByPrd1 = true;
        }
        var lmtSubType = _this.formdata.lmtSubType;
        var lmtBizType = _this.formdata.lmtBizType;
        if (lmtSubType == '01' && _this.isPre == '0' && lmtBizType && lmtBizType != '') {
          _this.formdata.lmtBizType = '';
          _this.formdata.lmtBizTypeName = '';
          _this.$message('非预授信请选择具体产品');// 弹出提示
          return;
        }

        _this.$xutils.request({
        // 同步请求
          async: false,
          url: this.$backend.cmisBiz + '/api/lmtappsubprd/getselectpropbyprdno',
          data: {prdNo: data},
          success: (response, status, xhr) => {
            if (response.code == '0') {
              // _this.prdNo = response.data.exit;
              _this.filter = response.data.rtnData;
              _this.$nextTick(() => {
                _this.cpDataCode = 'STD_PRD_TYPE_PROP';
              });
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      });
    },

    getCusId: function (data) {
      var _this = this;
      if (data.startsWith('8')) {
        _this.params = {
          limitStrNo: '01',
          notLimitSubNoList: '15,16'
        };
      } else {
        _this.params = {
          limitStrNo: '02',
          notLimitSubNoList: '200202,21,22,23'
        };
      }
    },
    prdNoNull: function () {
      var _this = this;
      _this.prdNo = '';
    },
    getIsRefinance: function (data) {
      var _this = this;
      if (data == '1') {
        _this.isRwrop = '0';
        _this.accLoanModel = true;
      } else {
        if (_this.isRwrop == '0') {
          _this.accLoanModel = false;
        }
      }
    },
    getIsRwrop: function (data) {
      var _this = this;
      if (data == '1') {
        _this.isRefinance = '0';
        _this.accLoanModel = true;
      } else {
        if (_this.isRefinance == '0') {
          _this.accLoanModel = false;
        }
      }
    },
    repayModeChg: function (data) {
      var _this = this;
      if (data == 'A040') {
        _this.repayModel = true;
      } else {
        _this.repayModel = false;
      }
    },

    /**
     * 初始化还本借据表
     */
    innitAccLoanTable: function (subPrdSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtchgsubaccloanrel/querybysubprdserno',
        data: subPrdSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtAccLoanList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 初始化还本计划表
     */
    innitRepayPlanTable: function (subPrdSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/selectbyserno',
        data: subPrdSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtRepayPlanList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 选取新增还本借据
     */
    makeSure: function () {
      var _this = this;
      var selections = _this.$refs.refAccLoanTable.selections;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtchgsubaccloanrel/savelmtchgsubaccloanrel',
        data: {
          'subPrdSerno': subPrdSerno,
          'billNo': selections[0].billNo
        },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$message('操作成功');
              _this.innitAccLoanTable(subPrdSerno);
              _this.showAccLoanDialog = false;
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    getLmtAppData (subSerno) {
      let _this = this;
      _this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/lmtapp/getlmtappbysubserno',
        data: {subSerno: subSerno},
        success: (response, status, xhr) => {
          if (response.data != null) {
            _this.lmtType = response.data.lmtType;
            _this.serno = response.data.serno;
            if (response.data.lmtType == '01') {
              _this.isLmtType01 = true;
            }
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    getPartner (value) {
      var _this = this;
      var lmtBizTypeProp = _this.formdata.lmtBizTypeProp;
      _this.prdTypeProp = _this.formdata.lmtBizTypeProp;
      // 若产品为集群贷P019，置业贷--暂不控，是产品不是属性，科技贷P003，农发通P005，信保贷P010，担保融P015，青岛即墨政银保P017，徐信保P020，南通信保通P021，无锡园区保P022，宿迁园区保P023，邳州园区保P024，项目经理人贷款P035
      if (lmtBizTypeProp == 'P019' || lmtBizTypeProp == 'P003' || lmtBizTypeProp == 'P005' || lmtBizTypeProp == 'P010' || lmtBizTypeProp == 'P015' || lmtBizTypeProp == 'P017' || lmtBizTypeProp == 'P020' ||
         lmtBizTypeProp == 'P021' || lmtBizTypeProp == 'P022' || lmtBizTypeProp == 'P023' || lmtBizTypeProp == 'P024' || lmtBizTypeProp == 'P035') {
        _this.filter1 = lmtBizTypeProp;
      } else {
        _this.filter1 = '';
      }
      // 若为征信贷显示对接记录ID
      if (lmtBizTypeProp == 'P009') {
        _this.filterZxd = lmtBizTypeProp;
        _this.zxdParams = {
          corpName: _this.formdata.cusName
        };
      } else {
        _this.filterZxd = '';
      }
      // 当为科技贷的时候,合作方编号，名称为非必输 科技贷:P003
      if (lmtBizTypeProp == 'P003') {
        _this.isPartnerRequired = false;
      } else {
        _this.isPartnerRequired = true;
      }

      // 诚易融引入关联合同
      if (lmtBizTypeProp == 'P016') {
        _this.isCyr = true;
        _this.cyrUrl = backend.cmisBiz + '/api/lmtsubprdctrloancontrel/selectBySubPrdSerno';
        _this.cyrParams = {subPrdSerno: _this.formdata.subPrdSerno};
      } else {
        _this.isCyr = false;
      }
      // 征信贷自动引入授信额度
      if (lmtBizTypeProp == 'P009') {
        var corpId = _this.formdata.cusId;
        // _this.$xutils.request({
        //   url: this.$backend.cmisBiz + '/api/zxdprelmtapply/selectByPrimaryKey',
        //   method: 'post',
        //   data: {
        //     condition: JSON.stringify({corpId: corpId, ifAdmitSys: 'Y' })
        //   },
        //   callback: function (code, message, response) {
        //     _this.formdata.lmtAmt = response.data.maxLmtAmt;
        //     console.log(response.data.maxLmtAmt);
        //   }
        // });
        var url = backend.cmisBiz + '/api/zxdprelmtapply/selectbyprimarykey/' + corpId;
        yufp.service.request({
          method: 'POST',
          url: url,
          callback: function (code, message, response) {
            _this.formdata.lmtAmt = response.data.maxLmtAmt;
          }
        });
      }
    },
    // 企业信用评分>=650时，合作方编号，合作方名称非必输，否则必输
    changePartnerReq () {
      var _this = this;
      // 获取企业用信评分
      var qyxyScore = _this.formdata.qyxyScore;
      if (qyxyScore >= '650') {
        _this.isPartnerRequired = false;
      } else {
        _this.isPartnerRequired = true;
      }
    },
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    }
  }
};
</script>
