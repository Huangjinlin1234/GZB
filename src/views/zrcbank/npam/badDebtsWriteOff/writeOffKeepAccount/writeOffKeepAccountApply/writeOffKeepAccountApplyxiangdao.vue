<template>
  <div>
   <yu-xform ref="refForm" label-width="120px" v-model="formdata">
     <yu-xform-group :column="2">
       <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" icon="search" @click.native="showPop"></yu-xform-item>
       <yu-xform-item ctype="input" maxlength="200" name="cusName" placeholder="请输入客户名称" label="客户名称" rules="required" :disabled="true"></yu-xform-item>
     </yu-xform-group>
     <div class="yu-grpButton">
       <yu-button  type="primary" @click="nextApplyFn">下一步</yu-button>
       <yu-button  type="primary" @click="cancelFn">返回</yu-button>
     </div>
   </yu-xform>

    <!------------------------------------------------------pop弹框----------------------------------------------------> 
    <yu-xdialog :title="title" :visible.sync="dialogTableVisible" width="1000px">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" 
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>
export default {
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      viewType: '',
      applyBaseData: {},
      baseBussParams: {},
      formdata: {},
      dialogTableVisible:false,
      dataUrl: this.$backend.cmisBiz + '/api/accloan/queryBadCus',
      title:'客户信息',
      baseParams:{condition:{managerId: this.$xutils.getLoginUserInfo().userId}},
    };
  },
  created(){
    this.afterInit ()
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      console.log('managerId', this.$xutils.getLoginUserInfo())
      _this.viewType = _this.$route.meta.params.viewType;
    },
    /**
     *单户呆账核销引导-下一步
     */
    nextApplyFn () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      const serno = this.$xutils.getSEQWithParamFromServer('IQP_WRITEOFF_APP_SERNO');
      _this.formdata.pbdwasSerno = serno;
      _this.baseBussParams = {condition: JSON.stringify({ serno: serno}) };
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisNpam + '/api/plabaddebtwriteoffappsig/save',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            // _this.$message('操作成功');
            _this.applyBaseData.cusId = _this.formdata.cusId;
            _this.applyBaseData.cusName = _this.formdata.cusName;
            _this.applyBaseData.pbdwasSerno = serno;
            _this.applyBaseData.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
            _this.cancelFn();
            _this.$router.addTab({
              // 路由名称
              name: 'zrcbank/npam/badDebtsWriteOff/writeOffApply/singleWriteOffApply/singleWriteOffApplyAdd',
              // 自定义唯一页签key
              key: 1 + new Date().getTime(), // 必传
              // 页签名称
              title: '单户呆账核销申请新增',
              // 传递的业务数据，可选配置
              data: {
                applyBaseData: _this.applyBaseData,
                viewType: _this.viewType,
                baseBussParams: _this.baseBussParams
              }
            });
          }
        }
      });
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
      /* 弹出pop框 */
    showPop(){
      this.dialogTableVisible = true
    },
    /* 选取客户数据赋值给表单 */
    confimBtn(){
      this.formdata.cusId = this.$refs.refTable.selections[0].cusId
      this.formdata.cusName = this.$refs.refTable.selections[0].cusName
      this.dialogTableVisible = false
    },
    /* pop框影藏 */
    back(){
      this.dialogTableVisible = false
    },
  }
};
</script>
