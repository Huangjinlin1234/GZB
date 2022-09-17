<template>
  <div id="d1_B_B_BillCard">
    <div id="d1_B_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" hidden></yu-xform-item>
        </yu-xform-group>
        <div :hidden="isPanelHidden">
          <yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行类型" ctype="select" name="aorgType" placeholder="承兑行类型"  data-code="STD_AORG_TYPE" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行行号" ctype="input" placeholder="承兑行行号" name="aorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpOrg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行名称" ctype="input" placeholder="承兑行名称" name="aorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户行账号" ctype="input" placeholder="出票人开户行账号" name="daorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpDaorg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户户名" ctype="input" placeholder="出票人开户户名" name="daorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </div>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled>
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed" placeholder="其他约定"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="input" placeholder="债项等级" name="debtLevel" disabled></yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="" name="ead" disabled placeholder="违约风险暴露EAD"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="" name="lgd" disabled placeholder="违约损失率LGD"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>

// 注册字典项
yufp.lookup.reg('STD_AORG_TYPE');

import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default {
  name: 'D1BBBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpaccpapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpaccpapp/',
      formdata: {},
      formType: 'edit',
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      isPanelHidden: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true
    };
  },
  methods: {
    getAccpOrg () {
      let jsoPar = this.formdata;
      // var _this = this;
      // let managerBrId = jsoPar.managerBrId;
      // if (managerBrId == null || managerBrId == '') {
      //   _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      let aorgNo = jsoPar.aorgNo;
      // if (aorgNo == null || aorgNo == '') {
      //   _this.$xutils.showMsgBox('提示', '承兑行行号不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      var data = { aorgNo: aorgNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.aorgNo = params.bankNo;
        this.$refs.refForm.formdata.aorgName = params.bankName;
      });
    },

    // getAccpDaorg () {
    //   let jsoPar = this.formdata;
    //   var _this = this;
    //   // let managerBrId = jsoPar.managerBrId;
    //   // if (managerBrId == null || managerBrId == '') {
    //   //   _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
    //   //   return;
    //   // }

    //   let daorgNo = jsoPar.daorgNo;
    //   if (daorgNo == null || daorgNo == '') {
    //     _this.$xutils.showMsgBox('提示', '开户行行号不能为空!\r\n请重新操作!', 350, 150);
    //     return;
    //   }

    //   var data = { aorgNo: daorgNo };
    //   this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
    //     // console.log(params);
    //     this.$refs.refForm.formdata.daorgNo = params.bankNo;
    //     this.$refs.refForm.formdata.daorgName = params.bankName;
    //   });
    // },

    // 选取开票人账户
    getAccpDaorg: function () {
      var _this = this;
      let jsoPar = this.formdata;
      if (!jsoPar.daorgNo) {
        _this.$message({
          message: '请先输入结算帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { acctNo: jsoPar.daorgNo };
      this.$dialog.open('', 'zrcbank/biz/common/commonEndAccount', 1000, 800, data, params => {
        this.$refs.refForm.formdata.daorgNo = params.kehuzhao;
        this.$refs.refForm.formdata.daorgName = params.zhhuzwmc;
      });
    }


  }
};
</script>
