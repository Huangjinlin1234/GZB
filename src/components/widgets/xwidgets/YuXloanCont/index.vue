<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <yu-panel title="业务合同" :hideFilter="false" :collapseHide="false">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="合同编号" prop="contNo"  width="220px" ></yu-xtable-column> <!-- show-overflow-tooltip="true" 属性可以隐藏过长 -->
          <yu-xtable-column label="中文合同编号" prop="cnContNo" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100.00px"  ></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="合同余额" prop="contBalance"></yu-xtable-column>
          <yu-xtable-column label="合同起始日期" prop="contStartDate" ></yu-xtable-column>
          <yu-xtable-column label="合同到期日期" prop="contEndDate" ></yu-xtable-column>
          <yu-xtable-column label="签订日期" prop="signDate" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" ></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
          <yu-xtable-column label="管户经理" prop="inputId" width="100" hidden-column></yu-xtable-column>
          <yu-xtable-column label="管户机构" prop="inputBrId" hidden-column></yu-xtable-column>
          <yu-xtable-column label="管户经理" prop="managerId" width="100" hidden-column></yu-xtable-column>
          <yu-xtable-column label="管户机构" prop="managerBrId" hidden-column></yu-xtable-column>
          <yu-xtable-column label="贷款形式" prop="loanModel" hidden-column></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import * as xutils from '@/utils/xutils';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXloanCont',
  componentName: 'YuXloanCont',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/ctrloancont/',
      // 表格中传出id数据的key
      queryCode: 'contNo',
      // 表格中显示到input框中的字段key
      textCode: 'contNo',
      baseParams: {condition: {}, sort: 'createTime desc'}
    };
  },
  watch: {
    parms: function (val) {
      if (!this.baseParams.condition) {
        this.baseParams.condition = {};
      }
      xutils.clone(val, this.baseParams.condition);
    },
    visiable () {
      this.$nextTick(function () {
        this.refreshData();
      });
    }
  },
  methods: {
    refreshData () {
      this.$refs.refTable.remoteData();
    },
    afterInit () {
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      const orgCode = this.$xutils.getLoginUserInfo().orgCode;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      // if(this.validateRoleFn()){
      //   this.baseParams.condition.managerId = loginCode;
      //   this.baseParams.condition.managerId = loginCode;
      // }else{
      //   this.baseParams.condition.managerBrId = orgCode;
      //   this.baseParams.condition.managerBrId = orgCode;
      // }
    },
    validateRoleFn () {
      let flag = true;
      const _this = this;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      for (let i = 0; i < dutys.length; i++) {
        var dutysArr = 'FZH10,FZH11,FZH12,FZH13,FZH14,FZH15';
        if (dutysArr.indexOf(dutys[i].code) >= 0) { // 分支机构负责人可对辖内所有客户及业务进行移交
          flag = false;
        }
      }
      return true;
    }
  },
  mounted () {
    this.afterInit();
  }
};
</script>
