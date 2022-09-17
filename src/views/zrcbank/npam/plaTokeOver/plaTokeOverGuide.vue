<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="单户转让新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
         <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" icon="search" @click.native="showPop" clearable></yu-xform-item> 
          <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

    <!------------------------------------------------------pop弹框----------------------------------------------------> 
    <yu-xdialog :title="title" :visible.sync="dialogTableVisible" width="1200px">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="公司客户" name="company"></yu-tab-pane>
        <yu-tab-pane label="个人客户" name="person"></yu-tab-pane>
      </yu-tabs>
      <yu-panel :title="title" panel-type="simple">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
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
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
export default {
  data: function () {
    return {
      formdata: {},
      dialogTableVisible:false,
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      activeName:'company',
      title:'公司客户',
      baseParams:{condition:{cusCatalog:'2', roleList: this.$xutils.getLoginUserInfo().roles}},
    };
  },
  methods: {
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 下一步
    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return _this.$xutils.showMsgBox('提示', '校验未通过，请填写必填项');
      };

      var model = {};
      // 转让类型01批量
      model.transferType = '01';
      // 登记状态 01 未登记
      model.regiStatus = '01';
      this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      model.takeoverAgrNo = this.$xutils.getDefaultformulaData('SEQ:ZCBQ_XYBH');
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverappinfo/insert',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.router.removeTab(_this.$route.path);
            _this.$router.addTab({
              name: 'zrcbank/npam/plaTokeOver/plaTokeOverDetil',
              key: 'plaTokeOverApp' + new Date().getTime(), // 必传
              title: '单户转让新增',
              data: {
                ptaiSerno: response.data.ptaiSerno,
                viewType: 'ADD'
              }
            });
          }
        }
      });
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
    /* tab栏切换处理 */
    handleClick(tab, event){
      console.log('tab', tab.name)
      var userInfo = this.$xutils.getLoginUserInfo();
      var roleList = userInfo.roles
      console.log('roleList', roleList)
      if(tab.name == 'company') {
        this.title = '公司客户'
        this.baseParams = {condition:{cusCatalog:'2', roleList: roleList}}
      }
      if(tab.name == 'person') {
        this.title = '个人客户'
        this.baseParams = {condition:{cusCatalog:'1', roleList: roleList}}
      }
    }
  }
};
</script>
