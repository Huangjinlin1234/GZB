
<template>
  <!--
    @created by 屈文
    @description 资产池协议申请列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="资产池协议" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <yu-button @click="doAdd" v-if="checkCtrl('add')" type="primary">新增</yu-button>
            <yu-button @click="doUpdate" v-if="checkCtrl('update')" type="primary">修改</yu-button>
            <yu-button @click="doDelete" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
            <yu-button @click="doView" v-if="checkCtrl('view')" type="primary">查看</yu-button>

          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number selection-type="radio"  :pageable="true" :data-url="dataUrl" request-type="POST" condition-key="condition" :base-params="{condition: {'chgFlag':'0','oprType':'01'}}">
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <!--<yu-xtable-column label="资产池协议编号" prop="contType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>-->
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="contAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险金额" prop="lowRiskAmt"></yu-xtable-column>
            <yu-xtable-column label="一般风险金额" prop="commonRiskAmt"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
      <!--资产池协议申请向导-->
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleGuide" width="650px">
          <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
                width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="nextFn">下一步</yu-button>
              <yu-button @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  components: { YufpDemoSelector },
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/iqpappaspl/tosignlist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    doAdd: function () {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },
    /**
     * 参照公共的确认事件
     */
    commonCusSelectFn: function (data, mapping) {
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
      if (this.formdata.cusRankCls == "02") {
        this.$xutils.showMsgBox("提示", "临时客户不支持合同申请!", 350, 150);
        this.formdata.cusId = "";
        this.formdata.cusName = "";
        this.formdata.cusRankCls = "";
        return;
      }
    },

    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var op = 'ADD';
      var cusId = _this.formdata.cusId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/saveiqpappasplinfo',
        data: {cusId: cusId},
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: "新增成功", type: "success" })
              _this.dialogVisibleGuide = false;
              let jsoPar = response.data;
              _this.jumpFactory(jsoPar, op);
            }else{
              _this.$message({ message: response.data.rtnMsg, type: "error", duration: 3000})
              setTimeout(function(){
                _this.dialogVisibleGuide = false;
              }, 3000);
              return;
            }
          } else {
            _this.$message({ message: "新增失败", type: "error", duration: 3000 })
            setTimeout(function(){
              _this.dialogVisibleGuide = false;
            }, 3000);
            return;
          }
        }
      });
    },


    /**
     * 取消按钮
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },


    /**
     * 修改
     */
    doUpdate: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '仅允许修改【待发起】【打回】的数据', 350, 150);
        return;
      }
      var op = 'EDIT';
      _this.jumpFactory(jsoPar, op);
    },

    /**
     * 刪除
     */
    doDelete: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTable.selections[0];
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      if (jsoPar.approveStatus != '000') {
        _this.$xutils.showMsgBox('提示', '仅允许删除【待发起】的数据', 350, 150);
        return;
      }
      // 审批状态为000进行逻辑删除
      if (jsoPar.approveStatus == '000') {
        _this.logicDelete(jsoPar);
      }
    },

    // 逻辑删除
    logicDelete: function (jsoPar) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/logicdelete',
        data: JSON.stringify(jsoPar),
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message('删除成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message('删除失败');
            _this.$refs.refTable.remoteData();
            return;
          }
        }
      });
    },

    /**
     * 列表详情
     */
    doView: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var op = 'VIEW';
      _this.jumpFactory(jsoPar, op);
    },

    // 跳转模板工厂
    jumpFactory: function (jsoPar, op) {
      var _this = this;
      var modelGroupNo = 'CMG000539';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = op;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   _this.initList(),
      //   true,
      //   true
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno,
        title: '资产池协议申请',
        data: {
          model_group_no: 'CMG000539',
          op: op,
          topOutsystemCode: 'XXD_ZCC;XXD_ZCC01',
          bizId: jsoPar.serno,
          serno: jsoPar.serno,
          cusId: jsoPar.cusId,
          pkId: jsoPar.pkId,
          imageParams: {
            contid: jsoPar.contNo,
            businessid: jsoPar.contNo,
            docid: jsoPar.serno
          },
        },
        function () {
          _this.$refs.refTable.remoteData();
        }
      });
    },
    // 刷新列表
    initList: function () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>
