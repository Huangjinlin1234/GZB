<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贸易融资合同 查看基本信息页面
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <!--基本信息-->
      <yu-panel title="基本信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" :rules="rule[0]" ctype="select" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务流水号" name="iqpSerno" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :rules="rule[0]" ctype="input" colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款形式" name="loanModal" :rules="rule[0]" ctype="select" data-code="STD_LOAN_MODAL"></yu-xform-item>
          <yu-xform-item label="贷款性质" name="loanCha" :rules="rule[0]" ctype="select" data-code="STD_ZB_LOAN_PROP"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" :rules="rule[0]" ctype="input" @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否在线抵押" name="isOlPld" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否电子用印" name="isESeal" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否续签合同" name="isRenew" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="原合同编号" name="origiContNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--期限金额-->
      <yu-panel title="期限金额" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="担保方式" name="guarWay" :rules="rule[0]" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="合同币种" name="curType" :rules="rule[0]" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="汇率" name="contRate" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="折算人民币金额" name="cusName" :rules="rule[0]" ctype="input" colspan="24"></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用信金额" name="highAvlAmt" :rules="rule[0]" ctype="select"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="contStartDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="contEndDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="合同期限" name="appTerm" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="是否无缝对接" name="isSeajnt" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--使用额度信息-->
      <yu-panel title="使用额度信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" :rules="rule[0]"  ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--地址确认信息-->
      <yu-panel title="地址确认信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="联系人" name="linkman" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="电话" name="phone" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="传真" name="fax" ctype="input"></yu-xform-item>
          <yu-xform-item label="邮箱" name="email" ctype="input"></yu-xform-item>
          <yu-xform-item label="QQ" name="qq" ctype="input"></yu-xform-item>
          <yu-xform-item label="微信" name="wechat" ctype="input"></yu-xform-item>
          <yu-xform-item label="送达地址" name="addr" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--债项信息-->
      <yu-panel title="债项信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="债项等级" name="inputId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="违约风险暴露EAD" name="inputBrId" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="违约损失率LGD" name="managerId" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--登记信息-->
      <yu-panel title="登记信息" padding-top :collapseHide="false">
        <yu-xform-group>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="合同状态" name="contStatus" ctype="select"  rules="required" data-code="STD_CONT_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <!--<yu-button @click="traSave">暂存</yu-button>
      <yu-button type="primary" @click="saveFormFn">保存</yu-button>
      <yu-button @click="submitFormFn">提交</yu-button>-->
      <yu-button @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_STATUS,STD_LOAN_MODAL,STD_ZB_LOAN_PROP,STD_PRD_TYPE_PROP');
export default {
  components: { cfgAssistantTip },
  data: function () {
    return {
      formdata: {},
      bizType: '01',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      prdCode: '',
      isShow: false
    };
  },
  // activated () {
  //   let obj = this.$route.params.obj;
  //   yufp.clone(obj, this.formdata);
  // },
  mounted: function () {
    var _this = this;
    var data = {};
    var contNo = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      contNo = data.param.contNo;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      contNo = data.contNo;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      contNo = data.contNo;
    }
    // let obj = _this.getFactory().contextData;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/showdetial',
      data: { contNo: contNo },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 返回
    cancelFn: function () {
      this.getFactory().back();
    },
    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
