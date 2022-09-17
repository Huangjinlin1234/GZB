<template>
  <div id="d1_15_BillCard">
    <div id="d1_15_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="true">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" data-code="STD_ZB_CONT_TYPE" name="contType" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" data-code="STD_LOAN_MODAL" placeholder="贷款形式" name="loanModal" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质" name="loanCha" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印" :colspan="12"></yu-xform-item>
            <yu-xform-item label="本行角色" ctype="select" data-code="STD_ZB_BANK_ROLE" placeholder="本行角色" name="bankRole" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" @change="isRChange"></yu-xform-item>
            <yu-xform-item label="银团总金额" ctype="yu-num" number-formatter="0,000.00" placeholder="银团总金额" name="bksyndicTotlAmt" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" :disabled="isDisabledFlg"></yu-xform-item>
            <yu-xform-item label="还款顺序" ctype="select" data-code="STD_ZB_REPAY_SEQ" placeholder="还款顺序" name="repaySeq" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true"></yu-xform-item>
            <yu-xform-item label="银团纸质合同编号" ctype="input" placeholder="银团纸质合同编号" name="bksyndicPaperContNo" :colspan="12"  :required="isReqByBankRole"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否续签" name="isRenew" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled :colspan="12" :hidden="!isShowOrigiContNo"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" placeholder="业务类型" name="bizType" :colspan="12" data-code="STD_ZB_BIZ_TYP" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" name="curType" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" placeholder="合同金额" name="contAmt" rules="required" :colspan="12" :disabled="isDisabledFlg" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="最高可用信金额" ctype="yu-num" number-formatter="0,000.00" placeholder="最高可用信金额" name="highAvlAmt" rules="required" :colspan="12" :disabled="isDisabledFlg" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="contStartDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="contEndDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="appTerm" rules="required" :colspan="12" disabled autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" data-code="STD_LOAN_TYPE" disabled placeholder="借款种类" name="loanType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="select" data-code="STD_LOAN_USE_TYPE" placeholder="借款用途" name="loanUse" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="并购内容" :hidden="isShowMergerPanel">
          <yu-xform-group :column="2">
            <yu-xform-item label="目标企业" ctype="textarea" placeholder="目标企业" name="targetCorp" rules="required" :colspan="16" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="并购协议" ctype="textarea" placeholder="并购协议" name="mergerAgr" rules="required" :colspan="16" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="并购交易价款" ctype="input" placeholder="并购交易价款" name="mergerTranAmt" rules="required" :colspan="12" hidden-rule="false"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="第三方信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否占用第三方额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否占用第三方额度" name="isOutstndTrdLmtAmt" rules="required" :colspan="12" @change="isShowTrdLmtAmt"></yu-xform-item>
            <yu-xform-item label="第三方合同协议编号" ctype="input" placeholder="第三方合同协议编号" name="tdpAgrNo" rules="required" :colspan="12" :hidden="!isShowTrdDataFlg"></yu-xform-item>
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName" rules="required" :hidden="!isShowTrdDataFlg" :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!isShowTrdDataFlg">

            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" placeholder="其他约定" name="otherAgreed" :colspan="16"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" required rules="mobile" :colspan="12"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" rules="email" ></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="textarea" placeholder="送达地址" name="addr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" data-code="DEBT_GRADE" placeholder="债项等级" name="debtLevel" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="审批状态" data-code="STD_ZB_APPR_STATUS" ctype="select" placeholder="审批状态 wf_status" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="最后修改日期" hidden></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <div style="text-align:center;">
      <yu-button type="primary" @click="returnFn">返回</yu-button>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isShowOrigiContNo: false,
      isDisabledFlg: false,
      isShowByPrdId: false, // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      isReqByBankRole: false, // 纸质合同编号
      isShowTrdDataFlg: false, // 第三方信息
      isShowMergerPanel: true // 并购贷款
    };
  },
  mounted () {
    this.AfterInit();
    console.log('formdata', this.formdata);
  },

  methods: {


    AfterInit () {
      // 是否续签
      var _this = this;
      var contNo = _this.$route.meta.params.contNo;
      yufp.service.request({
        method: 'post',
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: { contNo: contNo },
        callback: function (code, message, response) {
          if (response.code == '200') {
            yufp.clone(response.data, _this.formdata);

            let isRenew = _this.formdata.isRenew;
            if (isRenew == 'Y') {
              this.isShowOrigiContNo = true;
            // document.getElementById('ocHidden').style.display = 'block';
            } else if (isRenew == 'N') {
              this.isShowOrigiContNo = false;
            // document.getElementById('ocHidden').style.display = 'none';
            } else {
              this.isShowOrigiContNo = false;
            // document.getElementById('ocHidden').style.display = 'none';
            }
          }
        }
      });
    },
    // 本行角色 onchang方法
    isRChange (value) {
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      let bankRole = this.formdata.bankRole;
      if (bankRole == '0') {
        this.isReqByBankRole = true;
      }
    },
    // 是否占用第三方额度，选择为是时，第三方合作协议编号、合作方客户名称才显示且必输；
    // 此时，可选取需要占用的第三方授信合同协议。点击选取时，弹出第三方合同协议选取界面。
    isShowTrdLmtAmt (value) {
      if (value == '1') {
        this.isShowTrdDataFlg = true;
      } else {
        this.isShowTrdDataFlg = false;
      }
    },

    returnFn () {
      console.log('返回！');
      yufp.frame.removeTab(this.$route.path);
    },
    // 银团贷款
    // isShowByPrdIdFunc (value1, value2) {
    //   // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
    //   if (value1 != '14020101') {
    //     this.isShowByPrdId = false;
    //   } else {
    //     this.isShowByPrdId = true;
    //   }
    //   // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
    //   // 根据老信贷字典项文档中，并未找到 非牵头行 选项
    //   if (value2 == '0') {
    //     this.isReqByBankRole = true;
    //   } else {
    //     this.isReqByBankRole = false;
    //   }
    // },

    // // 并购内容，当产品为并购贷款时才显示且必输，否则整块隐藏且非必输。
    // isShowPanel (value) {
    //   debugger;
    //   var prdId = this.formdata.prdId;
    //   if (prdId == '14030101') {
    //     this.isShowMergerPanel = false;
    //   } else {
    //     this.isShowMergerPanel = true;
    //   }
    // },


    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      let appAmt = this.$refs.refForm.formdata.appAmt;
      let contHighAvlAmt = this.$refs.refForm.formdata.contHighAvlAmt;
      let otherAgreed = this.$refs.refForm.formdata.otherAgreed;
      if (appAmt > contHighAvlAmt && otherAgreed != null && otherAgreed != '') {
        this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      }
    },

    // 校验合同期限
    termChange (value) {
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        return;
      }
      // 计算月份
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
      let date2 = endDate.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      this.formdata.contTerm = date2 - date1 <= 0 ? 1 : date2 - date1;
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    }
  }
};
</script>
