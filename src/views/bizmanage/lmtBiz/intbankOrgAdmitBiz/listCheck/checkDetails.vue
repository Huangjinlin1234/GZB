<template>
    <div>
    <yu-panel title="准入批复信息"  panel-type="simple">
      <yu-xform ref="refForm"  v-model="formdata" label-width="120px">
          <yu-panel title="批复基本信息" panel-type="simple">
              <yu-xform-group :column="2">
                  <yu-xform-item label="批复台账编号" ctype="input" name="accNo" placeholder="批复台账编号" disabled></yu-xform-item>
                  <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno" disabled  colspan="9" ></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
                    <yu-button icon="search" type="primary" @click="openDetail" style="float:right">查看申报详情</yu-button>
                  </yu-xform-item>
                  <yu-xform-item label="批复生效日期" ctype="input" name="inputDate" placeholder="批复生成日期" disabled></yu-xform-item>
                  <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" disabled></yu-xform-item>
                  <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" disabled></yu-xform-item>
                  <yu-xform-item label="审批结论" ctype="select" name="apprResult" data-code="STD_ZB_APPR_STATUS"  placeholder="审批结论" disabled></yu-xform-item>
                  <yu-xform-item label="批复状态" ctype="select" name="accStatus" placeholder="批复状态" data-code="STD_REPLY_STATUS" disabled></yu-xform-item>
                  <yu-xform-item label="责任人" ctype="input" name="inputIdName"  placeholder="责任人" disabled></yu-xform-item>
              </yu-xform-group>
          </yu-panel>
<!--          <yu-panel title="同业机构准入信息" panel-type="simple">-->
<!--              <yu-xform-group :column="2">-->
<!--                <yu-xform-item label="准入到期日" ctype="input" placeholder="准入到期日" name="endDate" disabled></yu-xform-item>-->
<!--              </yu-xform-group>-->
<!--          </yu-panel>-->
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
        <yu-button type="primary" @click="closeDialog">返回</yu-button>
    </div>
  </div>
</template>

<script>
 yufp.lookup.reg("STD_ZB_APPR_STATUS,STD_REPLY_STATUS");
export default {
  name: 'IntBankOrgAdmitAccDetail',
  // props: {
  //   pageParams: {
  //     type: Object,
  //     default: function () {
  //       return {};
  //     },
  //   },
  //   dialogId: String,
  //   modelGroupNo: String,
  // },
  data: function () {
    return {
      formdata: {
        replySerno: ''
      },
      dataUrl: backend.cmisBiz + "/api/intbankorgadmitacc/intbankOrgAdmitAccWithReplayDetail"
    };
  },
  mounted(){
      this.initData();
  },
  methods:{
    openDetail: function () {
      var _this = this;
      var replySerno = this.formdata.serno;
      console.log("replySerno11===>", replySerno);
      var title = '申报详情';
      let model = {
        serno: replySerno
      };
      var routeKey = "TemplateFactory" + replySerno + "EDIT";
      model.routeKey = routeKey;
      model.op = "look";

      _this.$router.addTab({
        name: "bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/admitDetails",
        key: routeKey,
        title: title,
        data: model,
      });
      // this.$message({
      //     message: "暂未实现",
      //     type: "warning"
      //   });
    },
    initData: function () {
      var _this = this;
      var params = this.$route.meta.params;
      var replySerno = params[0].replySerno;
      yufp.service.request({
        method: "POST",
        url: this.dataUrl,
        data: {
          replySerno: replySerno
        },
        callback: function (code, message, response) {
          if (response.data) {
            var acc = response.data;
            yufp.clone(acc, _this.formdata);
          }
        }
      })
    },
    //关闭当前标签页，返回上个标签页
    closeDialog:function(){
      //调用全局挂载的方法
      this.$store.dispatch('tagsView/delView', this.$route);
      //返回上一步路由
      this.$router.go(-1);
    }
  }
};
</script>

<style>

</style>
