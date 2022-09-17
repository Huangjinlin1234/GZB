<template>
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" >
      <yu-panel title="授信保证人担保额度测算表" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" name="serno" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="担保人客户编号" name="guarCusId" ctype="input" ></yu-xform-item>
          <yu-xform-item label="企业规模" name="corpScale" ctype="input" ></yu-xform-item>
          <yu-xform-item label="可担保额度" name="evalGuarLmtAmt" ctype="input" ></yu-xform-item>
          <yu-xform-item label="净资产值" name="pureAssetValue" ctype="input" ></yu-xform-item>
          <yu-xform-item label="放大倍数" name="enalrgeTimes" ctype="input" ></yu-xform-item>
          <yu-xform-item label="或有负债" name="cntgDebt" ctype="input" ></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId"  ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" name="updDate" ctype="datepicker" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" name="createTime" ctype="datepicker" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn">确定</yu-button>
      <yu-button type="primary" @click="printFn">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_OPER_TYPE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
      formdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    var _this = this;
    let data = _this.$route.meta.params;
    // let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrrlimiteval/showdetial',
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    // 保存
    saveFn: function () {
      var _this = this;
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/lmtgrrlimiteval/updatelmtgrrlimiteval';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // 打印
    // printFn: function () {
    //   debugger;
    //   var _this = this;
    //   const params = _this.$route.meta.params;
    //   if (params.serno == null || params.serno == '') {
    //     _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
    //     return;
    //   }
    //   let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
    //   let keydemo = 'frptdemo';
    //   params.src = _this.$backend.frptRptService + '授信保证人担保额度测算表.cpt&op=view&SERNO=' + params.serno;
    //   _this.$router.addTab({
    //     // 路由名称
    //     name: name,
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: keydemo, // 必传
    //     // 页签名称
    //     title: '帆软打印',
    //     // 传递的业务数据，可选配置
    //     data: params
    //   });
    // },

    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>