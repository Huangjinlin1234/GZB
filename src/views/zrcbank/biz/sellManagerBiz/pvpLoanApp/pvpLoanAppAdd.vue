<template>
  <div>

    <yu-xform ref="form" label-width="120px" v-model="form">
  <yu-xform-group>
      <yu-xform-item placeholder="合同编号" label="合同编号" ctype="input" name="contNo" icon="search" :on-icon-click="openDialog"></yu-xform-item>
      <yu-xform-item placeholder="客户编号" label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
      <yu-xform-item placeholder="客户名称" label="客户名称" ctype="input" name="cusName"  disabled></yu-xform-item>
      <yu-xform-item placeholder="合同类型" label="合同类型" ctype="select" name="contType" data-code="STD_CONT_TYPE" disabled></yu-xform-item>
      <yu-xform-item placeholder="合同金额" label="合同金额" ctype="input" name="contAmt" disabled></yu-xform-item>
      <yu-xform-item placeholder="合同期限" label="合同期限" ctype="input" name="appTerm" disabled></yu-xform-item>
      <yu-xform-item placeholder="合同起始日" label="合同起始日" ctype="datepicker" name="contStartDate" disabled></yu-xform-item>
      <yu-xform-item placeholder="合同到期日" label="合同到期日" ctype="datepicker" name="contEndDate" disabled></yu-xform-item>
      <yu-xform-item placeholder="是否涉农" label="是否涉农" ctype="input" name="agriType" disabled v-if="show"></yu-xform-item>

  </yu-xform-group>


                      </yu-xform>

    <!--  弹窗部分 选取合同使用-->
    <!-- Table -->
 <div class="button-group" style="text-align:center">
         <yu-button type="primary" @click="onSubmit">下一步</yu-button>
              <yu-button type="primary"  @click="backtrack">返回</yu-button>
  </div>


    <yu-dialog title="合同选取" :visible.sync="dialogTableVisible" :min-height="500"  center="true">

      <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="客户名称" label="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="产品编号" label="产品编号" ctype="input" name="prdId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="合同编号" label="合同编号" ctype="input" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="合同状态" label="合同状态" data-code="STD_CONT_STATUS" ctype="select"  name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>

      <yu-xtable index selection-type="radio" :default-sort="{prop:'contNo',order:'descending'}" ref="dialogtable" :data-url="dataUrl" :base-params="baseParams"  request-type="POST" style="width: 100%" condition-key="condition">
        <yu-xtable-column prop="contNo" label="合同编号"  show-overflow-tooltip="true" width="200px" sortable ></yu-xtable-column>
        <yu-xtable-column prop="contStatus" label="合同状态" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column prop="cusId" label="客户编号" ></yu-xtable-column>
        <yu-xtable-column prop="cusName" label="客户名称"></yu-xtable-column>
        <yu-xtable-column prop="prdName" label="产品名称" show-overflow-tooltip="true"></yu-xtable-column>
        <yu-xtable-column prop="contType" label="合同类型" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="contAmt" label="申请金额"></yu-xtable-column>
        <yu-xtable-column prop="curType" label="币种" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column prop="guarWay" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="inputId" label="登记人"></yu-xtable-column>
        <yu-xtable-column prop="inputId" label="责任人"></yu-xtable-column>
        <yu-xtable-column prop="managerBrId" label="责任机构"></yu-xtable-column>
        <yu-xtable-column prop="inputDate" label="登记日期" show-overflow-tooltip="true"></yu-xtable-column>

      </yu-xtable>
       <div class="button-group" style="text-align:center">
      <yu-button type="primary" :loading="buttonType" @click="selectReturn">选取</yu-button>
       </div>

    </yu-dialog>

  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_GUAR_CONT_STATE,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_CONT_STATUS');
export default {
  // name: "standardForm",
  data: function () {
    return {
      pages: 0,
      dataUrl: backend.cmisBiz + '/api/ctrloancont/',
      form: [],
      dialogTableVisible: false,
      dialogData: [],
      dialogformdata: [],
      /* belgLine 02 零售线条  */
      baseParams: {condition: {existsContMode: '00,01', belgLine: '02', oprType: '01', managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'), applyExistsStatus: '100,200'}},
      buttonType: false,
      tododata: {}
    };
  },
  mounted () {
    var _this = this;
    _this.pages = 1;
  },
  methods: {

    onSubmit () {
      var _this = this;
      if (this.form == null || this.form.contNo == null) {
        this.$message({ message: '请选择合同信息', type: 'warning' });
        return;
      }
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/addpvploanappls',
        data: this.form
      }).then(({code, message, data}) => {
        if (code == '0') {
          // 请求成功 进行判断
          if (data != null) {
            // 新增成功 进行路由跳转

            this.$router.addTab({
              // 路由名称
              name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage', // 菜单路径
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: 'custom_add_' + data.pvpSerno, // 必传
              // 页签名称
              title: '放款申请信息',
              // 传递的业务数据，可选配置
              data: {
                pageType: 0, // 新增,
                pvpSerno: data.pvpSerno,
                pageName: 'add_' + data.pvpSerno,
                pages: _this.pages,
                // 2021年7月6日21:57:58  WH 给征信赋值
                oprType: '03',
                period: '03',
                iqpSerno: data.iqpSerno,
                PageType: 'UPDATE'


              }
            });
          }
        } else {
          this.$message({ message: message, type: 'warning' });
        }
      });
    },

    openDialog () {
      this.dialogTableVisible = true;
    },
    selectReturn () {
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // this.form = this.$refs.dialogtable.selections[0];

      yufp.clone(this.$refs.dialogtable.selections[0], this.tododata);
      this.buttonType = true;
      this.selectCusData();
    },
    /* 选取返回的时候去查询客户信息  用于补充是否涉农 等其他信息*/
    selectCusData () {
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindiv/queryCusIndivInfo',
        data: {cusId: this.tododata.cusId}
      }).then(({data}) => {
        if (data != null) {
          // 新增成功 进行路由跳转
          yufp.clone(this.tododata, this.form);
          if (data.agriFlg == '1') {
            this.form.agriType = '1';
          } else {
            this.form.agriType = '0';
          }
          this.buttonType = false;
          this.dialogTableVisible = false;
        } else {
          this.buttonType = false;
          this.$message({message: '未查询到合同相关客户信息'});
        }
      });
    },
    // 返回
    backtrack () {
      var _this = this;
      // console.log(_this.$route.path);
      // console.log(_this);
      yufp.router.removeTab(_this.$route.path);
      // yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage/custom_' + _this.$route.meta.params.pageName);
    }
  }
};
</script>
