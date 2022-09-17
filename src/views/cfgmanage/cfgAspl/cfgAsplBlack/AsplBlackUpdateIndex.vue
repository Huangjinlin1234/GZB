<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :disabled="isFormDisabled"
        :utrace="utrace"
        u-pk-value="asplwhtls_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="pkId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" name="pkId" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label-width="120px" label="业务流水号" name="serno" ctype="input"  :column="12" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="客户编号" name="cusId" ctype="input" placeholder="客户编号" :column="12" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="客户名称" name="cusName" ctype="input"  :column="12" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="业务类型" ctype="select" name="bizType"  data-code="STD_ZB_ASPL_BALCKS_TYPE" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="生效状态" name="inureStatus" ctype="select" data-code="STD_ZB_YES_NO" :column="12" required></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label-width="120px" label="拦截原因" name="resn" ctype="textarea" :column="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item  label-width="120px" label="登记人编号" ctype="input" placeholder="登记人编号" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记机构编号" ctype="input" placeholder="登记机构编号" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doUpdate" :hidden="isShowSaveBtn">保存</yu-button>
      <yu-button type="primary" @click="cancel" :hidden="isFlowBtn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_ASPL_BALCKS_TYPE');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'asplwhtlslisttable',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isFormDisabled: false,
      isShowSaveBtn: false,
      isFlowBtn: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let par = {};
      let serno = '';
      par = this.pageParams;
      serno = par.serno;
      // 查看
      if (par.op) {
        if (par.op == 'VIEW') {
          this.isFormDisabled = true;
          this.isShowSaveBtn = true;
        }
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/asplblacks/selectBySerno/' + serno,
        data: {}
      })
      .then(response => {
        // 重置表单数据
        this.$refs.refForm.resetFields();
        // 给表单数据赋值
        this.$utils.clone(response.data, this.formdata);
        this.$utils.clone(response.data, this.formdatautrace);
      })
      .catch(() => {
        this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
      });
    },
    // 修改
    doUpdate () {
      let jsoPar = this.formdata;

      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      jsoPar.updId = userInfo.loginCode;
      jsoPar.updBrId = userInfo.orgCode;
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplblacks/updateByserno',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          if (this.utrace === false) {
            this.utrace = true;
          }
          // 自动刷新列表数据
          this.UTraceSet();
          this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
            this.cancel();
          });
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    UTraceSet () {
      this.$refs.refForm.saveUTrace(this.formdatautrace);
      this.$utils.clone(this.formdata, this.formdatautrace);
    },
    // 返回
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
