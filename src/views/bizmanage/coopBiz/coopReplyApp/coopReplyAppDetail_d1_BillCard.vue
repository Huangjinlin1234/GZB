<template>
 <div id="d1_BillCard">
    <div id="d1_BillCardContent">
    <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :form-change="triggerEditChangeEvent">
        <yu-xform-group>
          <yu-xform-item label="合作方名称" disabled ctype="input" name="partnerName"></yu-xform-item>
          <yu-xform-item label="合作方编号" disabled ctype="input" name="partnerNo"></yu-xform-item>
          <yu-xform-item label="经办机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
          <yu-xform-item label="经办客户经理" disabled ctype="input" name="managerIdName"></yu-xform-item>
          <yu-xform-item label="操作类型" disabled ctype="select" name="oprType"  data-code="STD_COOP_PLAN_OPR_TYPE"></yu-xform-item>
          <yu-xform-item label="批复编号" disabled ctype="input" name="replyNo"></yu-xform-item>
          <yu-xform-item label="合作方类型" disabled ctype="select" name="partnerType" data-code="STD_PARTNER_TYPE"></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="radio" :options="options" name="apprResult" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="1.合作方授信额度信息" :hideFilter="false" :collapseHide="false">
      <yu-panel title="1.1合作基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm2" label-width="120px" v-model="formdata2" :form-type="operate" :form-change="triggerEditChangeEvent">
          <yu-xform-group>
            <yu-xform-item label="总合作额度(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="totlCoopLmtAmt" rules="required" placeholder="总合作额度(元)" @blur="calculateCoopLmtAmt" :disabled="estateFlag"></yu-xform-item>
            <yu-xform-item label="合作期限(月)" ctype="num" name="coopTerm" rules="required" maxlength="5" placeholder="合作期限(月)" @change="coopTermChange"  :precision="0" :min="1" ></yu-xform-item>
            <yu-xform-item label="单户合作限额(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="singleCoopQuota" :rules="[{required:singleCoopQuotaIsShow,message:'字段不能为空',trigger:'blur'}]" placeholder="单户合作限额(元)"  v-show="singleCoopQuotaIsShow"></yu-xform-item>
            <yu-xform-item label="单笔业务合作限额(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="sigBusiCoopQuota"  :rules="[{required:sigBusiCoopQuotaIsShow,message:'字段不能为空',trigger:'blur'}]" placeholder="单笔业务合作限额(元)"  v-show="sigBusiCoopQuotaIsShow"></yu-xform-item>
            <yu-xform-item label="合作起始日" ctype="input" name="coopStartDate" rules="required"  placeholder="合作起始日" disabled></yu-xform-item>
            <yu-xform-item label="合作到期日" ctype="input" name="coopEndDate" rules="required" placeholder="合作到期日" disabled></yu-xform-item>
            <yu-xform-item label="代偿宽限期(天)" ctype="num" name="subpayGraper" rules="required" maxlength="5" placeholder="代偿宽限期(天)"  :precision="0" :min="1" ></yu-xform-item>
            <yu-xform-item label="代偿比例(%)" ctype="yu-num" :multiple="100" placeholder="代偿比例(%)" name="subpayPerc" maxlength="5"  rules="required" ></yu-xform-item>
            <yu-xform-item label="是否白名单控制" ctype="select" name="isWhiteListCtrl"  :rules="[{required:isWhiteListCtrlIsShow,message:'字段不能为空',trigger:'blur'}]" data-code="STD_ZB_YES_NO" v-show="isWhiteListCtrlIsShow"></yu-xform-item>
            <yu-xform-item label="保证金比例(%)" ctype="yu-num" :multiple="100" placeholder="保证金比例(%)" name="bailPerc" maxlength="5"  :rules="[{required:bailPercIsShow,message:'字段不能为空',trigger:'blur'}]" v-show="bailPercIsShow"></yu-xform-item>  
            <yu-xform-item label="对外担保放大倍数" ctype="num"  placeholder="对外担保放大倍数" name="outguarMultiple" maxlength="5"  :rules="[{required:outguarMultipleIsShow,message:'字段不能为空',trigger:'blur'}]" v-show="outguarMultipleIsShow"></yu-xform-item>
            <yu-xform-item label="保证金账户最低金额(元)"  ctype="yu-num" number-formatter="0,000.00" placeholder="保证金账户最低金额(元)" name="bailAccLowAmt" maxlength="14" :rules="[{bailAccLowAmtIsShow,message:'字段不能为空',trigger:'blur'}]" v-show="bailAccLowAmtIsShow"></yu-xform-item>
          </yu-xform-group>
       </yu-xform>
      </yu-panel>
      <yu-panel title="1.2一般担保额度" :hideFilter="false" :collapseHide="false" v-show="commonGrtShow">
       <yu-xform ref="refForm3" label-width="120px" v-model="formdata3">
          <yu-xform-group>
            <yu-xform-item label="一般担保额度(元)"  ctype="yu-num" name="commonGrtLmtAmt" number-formatter="0,000.00" maxlength="14"></yu-xform-item>
            <yu-xform-item label="保证金比例(%)"  ctype="yu-num" name="bailPerc" :multiple="100"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="1.3特殊限额控制信息" v-show="subShow" :collapseHide="false">
        <yu-xtable ref="refSubTable" :data="subTableData"  border :pageable="false">
            <yu-xtable-column prop="prdTypeProp" label="产品名称" data-code="STD_PRD_TYPE_PROP_COOP"></yu-xtable-column>
            <yu-xtable-column prop="singlePrdCoopLmt" label="单个产品合作额度(元)" ctype="input"></yu-xtable-column>
            <yu-xtable-column prop="bailPerc" label="保证金比例(%)" ctype="yu-num"></yu-xtable-column>
          </yu-xtable>
     </yu-panel>

     <yu-panel title="1.2项目信息" v-show="proShow" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refProTable" :data="proTableData"  border :pageable="false">
            <yu-xtable-column prop="proNo" label="项目编号"></yu-xtable-column>
            <yu-xtable-column prop="proType" label="项目类型" data-code="STD_COOP_PRO_TYPE"></yu-xtable-column>
            <yu-xtable-column prop="proName" label="项目名称" ctype="input"></yu-xtable-column>
            <yu-xtable-column prop="proLmt" label="项目额度" ctype="input" @change="proLmtChange"></yu-xtable-column>
          </yu-xtable>
     </yu-panel>

    </yu-panel>
    <yu-panel title="2.用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
        <yu-toolBar>
          <yu-button type="primary" @click="addConFn" v-if="buttonShow">新增</yu-button>
          <yu-button  type="primary" v-norepeat.disabled @click="deleteConFn" v-if="buttonShow">删除</yu-button>
        </yu-toolBar>
        <yu-xtable ref="refCondTable" row-number border :data="condTableData"  :pageable="false">
          <yu-xtable-column label="具体内容" prop="condContent"  ctype="textarea" :disabled="viewFiledDisabled" autosize></yu-xtable-column>
        </yu-xtable>
    </yu-panel>
    <yu-panel title="3.贷后管理要求" :hideFilter="false" :collapseHide="false">
        <yu-toolBar>
          <yu-button  type="primary" @click="addPspFn" v-if="buttonShow">新增</yu-button>
          <yu-button  type="primary" v-norepeat.disabled @click="deletePspFn" v-if="buttonShow">删除</yu-button>
        </yu-toolBar>
        <yu-xtable ref="refPspTable" row-number border :data="pspTableData" :pageable="false">
          <yu-xtable-column label="具体内容" prop="manageContent"  ctype="textarea" :disabled="viewFiledDisabled" autosize></yu-xtable-column>
        </yu-xtable>
    </yu-panel>
    </div>
     <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="bizPageShow">
          <yu-button type="primary" @click="saveFn">保存</yu-button>
     </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_PRD_TYPE_PROP_COOP,STD_COOP_PRO_TYPE,STD_ZB_YES_NO');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object,
    pageData: Object,
    operate: String
  },
  data () {
    return {
      formdata: {},
      formdata2: {},
      formdata3: {},
      subTableData: [],
      condTableData: [],
      pspTableData: [],
      proTableData: [],
      // 一般担保展示
      commonGrtShow: false,
      // 项目信息展示
      proShow: false,
      // 特殊限额控制信息展示
      subShow: false,
      // 单户合作限额(元)是否展示
      singleCoopQuotaIsShow: false,
      // 单笔业务合作限额(元)是否展示
      sigBusiCoopQuotaIsShow: false,
      // 对外担保放大倍数是否展示
      outguarMultipleIsShow: false,
      // 是否白名单控制是否展示
      isWhiteListCtrlIsShow: false,
      // 保证金比例(%)是否展示
      bailPercIsShow: true,
      //
      buttonShow: true,
      bizPageShow: false,
      viewFiledDisabled: true,
      formType: 'view',
      options: [
        {key: '997', value: '同意'},
        {key: '998', value: '否决'}
      ],
      bailAccLowAmtIsShow: true,
      estateFlag: false
    };
  },
  mounted () {
    window.callCoopPlanAppFlowValidate = this.callCoopPlanAppFlowValidate;
  },
  methods: {
    // 供待审会秘书在我的代办提交流程校验审批批复信息是否已填写
    callCoopPlanAppFlowValidate () {
      let returnData = false;
      var _this = this;      
      _this.$refs.refForm.validate(function (valid) {
        if (valid) {
          returnData = true;          
        } else {
          returnData = false;
        }
      });
      if (returnData) {        
        var serno = _this.formdata.serno;
        // 请求接口判断是否已保存
        this.$xutils.request({
          url: this.$backend.cmisBiz + '/api/coopreplyapp/' + serno,
          type: 'GET',
          async: false,
          success: (response, status, xhr) => {
            if (response.code == 0) {
              let appData = response.data;
              let apprResult = appData.apprResult;
              if (apprResult == null || apprResult == '' || typeof apprResult == 'undefined') {
                returnData = false;
              }              
            } else {
              this.$xutils.showMsgBox('提示', response.erortx);
            }
          }
        });
      }
      return returnData;
    },
    calculateCoopLmtAmt () {
      
    },
    proLmtChange (val) {
      let partnerType = this.formdata.partnerType;
      if (partnerType == '1') {
        let totlCoopLmtAmt = 0;
        let coopReplyAppProList = [];
        coopReplyAppProList = this.proTableData;
        if (coopReplyAppProList != null && coopReplyAppProList.length > 0) {
          for (let i = 0; i < coopReplyAppProList.length; i++) {
            totlCoopLmtAmt = parseFloat(totlCoopLmtAmt) + parseFloat(coopReplyAppProList[i].proLmt);
          }
        }
        this.formdata2.totlCoopLmtAmt = totlCoopLmtAmt;
      }      
    },
    coopTermChange (val) {
      var coopStartDate = this.formdata2.coopStartDate;//合作起始日；
      var strDate = new Date(coopStartDate) ;
      strDate.setMonth(strDate.getMonth() + parseInt(val));
      strDate.setDate(strDate.getDate() - 1);
      this.formdata2.coopEndDate = this.$xutils.dateFormat('yyyy-MM-dd', strDate);
    },
    // 新增用信条件与其他限制性条件
    addConFn () {
      var row = {
        condContent: ''
      };
      var flag = false;
      // 校验表格数据
      this.$refs.refCondTable.validate(function (fields) {
        console.log('fields', fields);
        if (!fields) {
          flag = true;
        }
      });
      // 校验通过添加数据
      if (flag) {
        row.serial = this.$refs.refCondTable.total + 1;
        this.condTableData.push(row);
        this.$refs.refCondTable.setCurrentRow(row);
      }
    },

    // 删除用信条件与其他限制性条件
    deleteConFn () {
      // 校验表格数据
      let jsoPar = this.$refs.refCondTable.selections[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let currentRowIndex = this.$refs.refCondTable.selections[0].__vkey;
      this.condTableData.splice(currentRowIndex, 1);
    },

    // 新增贷后管理要求
    addPspFn () {
      var row = {
        condContent: ''
      };
      var flag = false;
      // 校验表格数据
      this.$refs.refPspTable.validate(function (fields) {
        console.log('', fields);
        if (!fields) {
          flag = true;
        }
      });
      // 校验通过添加数据
      if (flag) {
        this.pspTableData.push(row);
        this.$refs.refPspTable.setCurrentRow(row);
      }
    },

    // 删除贷后管理要求
    deletePspFn () {
      // 校验表格数据
      let jsoPar = this.$refs.refPspTable.selections[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let currentRowIndex = this.$refs.refPspTable.selections[0].__vkey;
      this.pspTableData.splice(currentRowIndex, 1);
    },
    // 流程处保存信息
    saveFn () {
      let _this = this;
      this.$refs.refForm.validate(function (valid) {
        if (!valid) {
          return false;
        }
      });
      let param = {};
      let coopReplyApp = {};
      let coopReplyAppProList = [];
      let coopReplyAppSubList = [];
      let coopReplyAppCondList = [];
      let coopReplyAppPspList = [];
      this.$xutils.clone(this.formdata2, coopReplyApp);
      coopReplyApp['apprResult'] = this.formdata.apprResult;
      if (this.commonGrtShow) {
        coopReplyApp['commonGrtLmtAmt'] = this.formdata3.commonGrtLmtAmt;
        coopReplyApp['bailPerc'] = this.formdata3.bailPerc;
      }
      coopReplyAppProList = this.proTableData;
      coopReplyAppSubList = this.subTableData;
      coopReplyAppCondList = this.condTableData;
      coopReplyAppPspList = this.pspTableData;
      param.coopReplyApp = coopReplyApp;
      param.coopReplyAppProList = coopReplyAppProList;
      if (coopReplyAppSubList != null && coopReplyAppSubList.length > 0) {        
        for (let i = 0; i < coopReplyAppSubList.length; i++) {
          coopReplyAppSubList[i].bailPerc = (coopReplyAppSubList[i].bailPerc / 100).toFixed(4);
        }
      }
      param.coopReplyAppSubList = coopReplyAppSubList;
      param.coopReplyAppCondList = coopReplyAppCondList;
      param.coopReplyAppPspList = coopReplyAppPspList;      
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyapp/insertAll',
        data: JSON.stringify(param),
        type: 'POST',
        async: false,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$xutils.showMsgBox('提示', '保存成功');            
            // 刷新特殊限额控制列表
            if (coopReplyAppSubList != null && coopReplyAppSubList.length > 0) {
              for (let i = 0; i < coopReplyAppSubList.length; i++) {
                coopReplyAppSubList[i].bailPerc = (coopReplyAppSubList[i].bailPerc * 100).toFixed(2);
              }
            } 
            this.subTableData = coopReplyAppSubList;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    }       
  }
};
</script>
