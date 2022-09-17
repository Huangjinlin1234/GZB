<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方案台账信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="160px" related-table-name="refTable">
          <yu-xform-group :column="2">
            <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo"></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" placeholder="合作方类型" name="partnerType" data-code="STD_PARTNER_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="合作方案编号" prop="coopPlanNo" width="150"></yu-xtable-column>
          <yu-xtable-column label="合作方编号" prop="partnerNo" width="150"></yu-xtable-column>
          <yu-xtable-column label="合作方名称" prop="partnerName" width="150"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE" width="150"></yu-xtable-column>
          <yu-xtable-column label="总合作额度(元)" prop="totlCoopLmtAmt" :formatter="Currency" width="150"></yu-xtable-column>
          <yu-xtable-column label="合作起始日" prop="coopStartDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="合作到期日" prop="coopEndDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="保证金比例(%)" prop="bailPerc" width="150" :formatter="toPercent"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
          <!-- <yu-xtable-column label="单户合作限额（元）" prop="singleCoopQuota"></yu-xtable-column>
          <yu-xtable-column label="单笔业务合作限额（元）" prop="sigBusiCoopQuota"></yu-xtable-column>
          <yu-xtable-column label="合作起始日" prop="coopStartDate"></yu-xtable-column>
          <yu-xtable-column label="合作到期日" prop="coopEndDate"></yu-xtable-column>
          <yu-xtable-column label="是否白名单控制" prop="isWhiteListCtrl"></yu-xtable-column>
          <yu-xtable-column label="代偿宽限期(天)" prop="subpayGraper"></yu-xtable-column>
          <yu-xtable-column label="代偿比例" prop="subpayPerc"></yu-xtable-column>
          <yu-xtable-column label="对外担保放大倍数" prop="outguarMultiple"></yu-xtable-column>
          <yu-xtable-column label="其他相关说明" prop="otherCorreMemo"></yu-xtable-column>
          <yu-xtable-column label="保证金比例" prop="bailPerc"></yu-xtable-column>
          <yu-xtable-column label="保证金账户最低金额(元)" prop="bailAccLowAmt"></yu-xtable-column>
          <yu-xtable-column label="单笔最低缴存金额(元)" prop="sigLowDepositAmt"></yu-xtable-column>
          <yu-xtable-column label="保证金透支上限(元)" prop="bailOverdraftMax"></yu-xtable-column>
          <yu-xtable-column label="保证金缴存方式" prop="bailDepositMode"></yu-xtable-column>
          <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
          <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSubSeq"></yu-xtable-column>
          <yu-xtable-column label="调查结论" prop="indgtResult"></yu-xtable-column>
          <yu-xtable-column label="调查意见" prop="indgtAdvice"></yu-xtable-column>
          <yu-xtable-column label="合作方案状态" prop="coopPlanStatus"></yu-xtable-column>
          <yu-xtable-column label="影像编号" prop="imageNo"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="统一社会信用代码" prop="unifyCreditCode"></yu-xtable-column>
          <yu-xtable-column label="企业性质" prop="corpCha"></yu-xtable-column>
          <yu-xtable-column label="成立日期" prop="buildDate"></yu-xtable-column>
          <yu-xtable-column label="注册资本" prop="regiCapAmt"></yu-xtable-column>
          <yu-xtable-column label="营业期限（月）" prop="bsinsTerm"></yu-xtable-column>
          <yu-xtable-column label="经营范围" prop="operRange"></yu-xtable-column>
          <yu-xtable-column label="企业规模" prop="corpScale"></yu-xtable-column>
          <yu-xtable-column label="行业分类" prop="tradeClass"></yu-xtable-column>
          <yu-xtable-column label="法人代表" prop="legal"></yu-xtable-column>
          <yu-xtable-column label="是否集团型客户" prop="isGrpCus"></yu-xtable-column>
          <yu-xtable-column label="办公地址" prop="officeAddr"></yu-xtable-column>
          <yu-xtable-column label="注册地址" prop="regiAddr"></yu-xtable-column>
          <yu-xtable-column label="是否我行关联方" prop="isBankCorre"></yu-xtable-column>
          <yu-xtable-column label="是否我行风险预警客户" prop="isBankRiskAltCus"></yu-xtable-column>
          <yu-xtable-column label="合作说明" prop="coopDesc"></yu-xtable-column>
          <yu-xtable-column label="调查报告类型" prop="indgtReportType"></yu-xtable-column> -->
          <!-- <yu-xtable-column label="主办人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column> -->
          <!-- <yu-xtable-column label="最近修改人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="最近修改机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="最近修改日期" prop="updDate"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column> -->
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
import mixin from '@/utils/mixin';
export default {
  name: 'YuXcoopAcct',
  componentName: 'YuXcoopAcct',
  mixins: [popList, mixin],
  props: {
    textCode: {
      type: String,
      default: 'coopPlanNo'
    },
    queryCode: {
      type: String,
      default: 'coopPlanNo'
    },
    param: Object
  },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/coopplanaccinfo/query4widget',
      baseParams: {},
      codeToText: false
    };
  },
  created () {
    if (this.param) {
      this.baseParams = this.param;
    }
    this.$lookup.reg('STD_PARTNER_TYPE,STD_ZB_YES_NO');
  },
  methods: {
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {        
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }      
      return cellValue;
    }
  }
};
</script>
