<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 福费廷合同 查看基本信息页面
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
          <yu-xform-item label="贷款性质" name="loanCha" :rules="rule[0]" ctype="select" data-code="STD_ZB_LOAN_PROP"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" :rules="rule[0]" ctype="input" @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
          <yu-xform-item label="是否电子用印" name="isESeal" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否续签合同" name="isRenew" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="原合同编号" name="origiContNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--期限金额-->
      <yu-panel title="期限金额" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" name="curType" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="appRate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="折算人民币金额" ctype="num" placeholder="折算人民币金额" name="cvtCnyAmt" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用信金额" name="highAvlAmt" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="contStartDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="contEndDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="合同期限" name="contTerm" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--使用额度信息-->
      <yu-panel title="使用额度信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <!--其它信息-->
      <yu-panel title="其它信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款投向码值" name="loanTer" ctype="input" :colspan="24" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="用途分析" name="purpAnaly" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="交叉核验详细分析" name="crossChkDetailAnaly" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款来源" name="repaySour" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="调查人结论" name="inveResult" ctype="input" :rules="rule[0]"></yu-xform-item>
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
      <!--登记信息-->
      <yu-panel title="登记信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_ZB_CONT_STATUS,STD_ZB_YES_NO,STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP');
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
  mounted: function () {
    var _this = this;
    let obj = _this.getFactory().contextData;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/showdetial',
      data: { contNo: obj.contNo },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        _this.formdata.curType = 'CNY';
        // 根据产品控制页签显隐处理
        // _this.getFactory().triggerAction(response.data);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
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
    // 返回
    cancel: function () {
      this.getFactory().back();
    },

    // 根据币种得到对应的汇率
    getCurTypeRate: function (value) {
      debugger;
      this.formdata.contAmt = '';
      this.formdata.cvtCnyAmt = '';
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.appRate = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            return;
          }
        });
      }
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
