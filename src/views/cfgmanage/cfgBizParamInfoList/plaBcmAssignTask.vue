<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="行名行号配置" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="160px" v-model="baseFormdata" style="text-align: center;" :disabled="viewType == 'DETAIL'">
        <yu-xform-group>
          <yu-xform-item label="行号" ctype="input" placeholder="行号" name="bankNo" rules="required"></yu-xform-item>
          <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"></yu-xform-item>
          <yu-xform-item label="行政地区" ctype="yu-xtree-dic" name="areaName" placeholder="行政地区" @select-fn="commonSelectFn1"
           :mapping="{cnName: 'areaName', enName: 'areaCode' }" width="480" height="480" :parms="{ optType: 'stdGbAreaAll' }" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode" hidden></yu-xform-item>
          <yu-xform-item label="联系电话" ctype="input" placeholder="联系电话" name="phone"></yu-xform-item>
          <yu-xform-item label="邮政编码" ctype="input" placeholder="邮政编码" name="postcode"></yu-xform-item>
          <yu-xform-item label="地址" ctype="input" placeholder="地址" name="addr"></yu-xform-item>
       <yu-xform-item label="上级行" ctype="yu-xbank-name" name="superBankNo" placeholder="上级行" style="height:36px"
         @select-fn="commonSelectFn2" :mapping="{ bankNo: 'superBankNo', bankName: 'superBankName' }" width="680" height="480"></yu-xform-item>
          <yu-xform-item label="生效日期" ctype="datepicker" name="inureDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="生效日期"></yu-xform-item>
          <yu-xform-item label="注销日期" ctype="datepicker" name="logoutDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="注销日期"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="bankStatus" data-code="STD_ZB_STATUS" placeholder="状态"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId"  hidden ></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId"  hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName"  disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" :hidden="viewType == 'DETAIL'" >保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

     <!-------------------------------- 行政pop ---------------------------------------------->
     <yu-xdialog :visible.sync="visiable" :width="width" title="树型字典">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="通用代码" ctype="input" placeholder="通用代码" name="enName"></yu-xform-item>
            <yu-xform-item label="通用代码描述" ctype="input" placeholder="通用代码描述" name="cnName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true" :base-params="baseParams" :default-sort="{ prop: 'orderid' }">
          <yu-xtable-column label="通用代码" prop="enName"></yu-xtable-column>
          <yu-xtable-column label="通用代码描述" prop="cnName"></yu-xtable-column>
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="上级通用代码" prop="abvenName"></yu-xtable-column>
          <yu-xtable-column label="通用代码层级路径" prop="locate"></yu-xtable-column>
          <yu-xtable-column label="代码类别" prop="optType"></yu-xtable-column>
          <yu-xtable-column label="代码类别描述" prop="memo"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="comSts"></yu-xtable-column>
          <yu-xtable-column label="层级标识hh" prop="levels"></yu-xtable-column>
          <yu-xtable-column label="排序字段" prop="orderid"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>


  </div>
</template>
<script>
// 获取仓库数据
// import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
export default {
  data: function () {
    return {
      baseFormdata: {},
      dataUrl: backend.cmisCfg + '/api/cfgbankinfo/selectbymodel',
      // dataUrl: backend.cmisCus + '/api/cusbase/',
      dialogTableVisible: false,
      dialogformdata: [],
      viewType: ''

      // visiable: false,
      // searchFormdata: {},
      // dataUrl1: backend.appOcaService + '/api/adminsmtreedic/'
    };
  },

  mounted () {
    this.afterInit();
  },

  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var bankNo = _this.$route.meta.params.bankNo;
      this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType !== 'ADD') {
        // 非新增时回显
        yufp.service.request({
          method: 'POST',
          url: backend.cmisCfg + '/api/cfgbankinfo/bankNo',
          data: bankNo,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.baseFormdata);
              _this.execBillCardDefaultValueFormula();
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        // 新增时初始化赋值
        // _this.execBillCardDefaultValueFormula();
      }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /* 保存 */
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (volid) {
          if (_this.viewType === 'ADD') {
            // 新增时。。。。保存
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/cfgbankinfo/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.doBack();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          } else {
            // 修改时。。。。保存
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/cfgbankinfo/update/',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.doBack();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        };
      });
    },

    /*
     将表格的数据，赋值给表单字段
    */
    commonSelectFn1: function (row, mapping) {
      for (let item in mapping) {
        this.baseFormdata[mapping[item]] = row[item];
      }
    },
    commonSelectFn2: function (row, mapping) {
      for (let item in mapping) {
        this.baseFormdata[mapping[item]] = row[item];
      }
    },
    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.clone(this.$refs.dialogtable.selections[0], this.baseFormdata);
      this.dialogTableVisible = false;
    },
    execBillCardDefaultValueFormula: function () {
      this.baseFormdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.baseFormdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserId');
      this.baseFormdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.baseFormdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.baseFormdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.baseFormdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.baseFormdata.updId = this.$xutils.getDefaultformulaData('$LoginUserId');
      this.baseFormdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.baseFormdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.baseFormdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.baseFormdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};

</script>
