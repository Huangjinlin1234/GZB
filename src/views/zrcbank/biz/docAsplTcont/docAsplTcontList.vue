<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="购销合同申请" name="toDoTip">
        <div>
            <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
                <yu-xform related-table-name="refTableToDo" ref="refForm" form-type="search" v-model="searchFormdata">
                    <yu-xform-group :column="3">
                        <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label-width="160px" label="购销合同编号" ctype="input" placeholder="购销合同编号" name="tcontNo" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label-width="160px" label="协议编号" ctype="input" placeholder="协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                    </yu-xform-group>
                </yu-xform>
                
                <yu-form-buttons align="left">
                    <yu-button ref="btn_doAdd" v-if="checkCtrl('add')" @click="doAdd" type="primary">新增</yu-button>
                    <yu-button ref="btn_doUpdate" v-if="checkCtrl('update')" @click="doUpdate" type="primary">修改</yu-button>
                    <yu-button ref="btn_doDelete" v-if="checkCtrl('delete')" @click="doDelete" type="primary">删除</yu-button>
                    <yu-button ref="btn_doView" v-if="checkCtrl('view')" @click="doView" type="primary">查看</yu-button>
                </yu-form-buttons>

                <yu-xdialog :visible.sync="dialogVisibleSelected" width="650px">
                  <yu-xform ref="refFormCus" label-width="140px" v-model="formdata" :disabled="formDisabled">
                    <yu-xform-group column="1">
                      <yu-xform-item label="客户编号" ctype="yu-xctr-cont-aspl" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','contNo':'contNo'}" idField="cusId"
                        width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取" ></yu-xform-item>
                      <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
                      <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" disabled></yu-xform-item>
                      <yu-xform-item label="购销合同编号" ctype="input" placeholder="购销合同编号" name="tcontNo" :rules="{ required: true, message: '字段不能为空' }" ></yu-xform-item>
                    </yu-xform-group>
                    <div class="yu-grpButton">
                      <yu-button type="primary" @click="nextFn">下一步</yu-button>
                      <yu-button @click="cancelFn">取消</yu-button>
                    </div>
                  </yu-xform>
                </yu-xdialog>
                 <!--资产池协议申请向导-->
                
                <yu-xtable ref="refTableToDo" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  :pageable="true" :data-url="dataUrl" :base-params="{condition: {'approveStatusList':'000,992,111'}}" :default-load="true" request-type="POST">
                  <yu-xtable-column label="主键pkId" prop="pkId" hide-column></yu-xtable-column>
                  <yu-xtable-column label="购销合同流水号" prop="tcontImgId" ></yu-xtable-column>
                  <yu-xtable-column label="资产池协议编号" prop="contNo" ></yu-xtable-column>
                  <yu-xtable-column label="购销合同编号" prop="tcontNo" ></yu-xtable-column>
                  <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
                  <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
                  <yu-xtable-column label="合同金额" prop="contAmt" ></yu-xtable-column>
                  <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
                  <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
                  <yu-xtable-column label="结算方式" prop="settlementMethod" data-code="STD_ZB_SETTLE_METH"></yu-xtable-column>
                  <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
    </yu-tab-pane>
    <yu-tab-pane label="购销合同申请历史"  name="hisTip">
        <div>
            <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
                 <yu-xform related-table-name="refTableHis" ref="refForm" form-type="search" v-model="searchFormdata2">
                    <yu-xform-group :column="3">
                        <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label-width="160px" label="购销合同编号" ctype="input" placeholder="购销合同编号" name="tcontNo" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label-width="160px" label="协议编号" ctype="input" placeholder="协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                    </yu-xform-group>
                </yu-xform>
                <yu-form-buttons align="left">
                    <yu-button ref="btn_doView" v-if="checkCtrl('hisview')" @click="hisView" type="primary">查看</yu-button>
                </yu-form-buttons>
                <yu-xtable ref="refTableHis" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  :pageable="true" :data-url="dataUrl" :base-params="{condition: {'approveStatusList':'996,997,998'}}" :default-load="true" request-type="POST">
                  <yu-xtable-column label="主键pkId" prop="pkId" hide-column></yu-xtable-column>
                  <yu-xtable-column label="购销合同编号" prop="tcontNo" ></yu-xtable-column>
                  <yu-xtable-column label="资产池协议编号" prop="contNo" ></yu-xtable-column>
                  <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
                  <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
                  <yu-xtable-column label="合同金额" prop="contAmt" ></yu-xtable-column>
                  <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
                  <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
                  <yu-xtable-column label="结算方式" prop="settlementMethod" data-code="STD_ZB_SETTLE_METH"></yu-xtable-column>
                  <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
                  <yu-xtable-column label="影像流水号" prop="tcontImgId" hide-column></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
// 合同类型
yufp.lookup.reg('STD_ZB_SETTLE_METH,STD_ZB_APPR_STATUS');
import mixin from '@/utils/mixin';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
export default {
  data () {
    return {
      dataUrl: backend.cmisBiz + '/api/docaspltcont/list',
      activeName: 'toDoTip',
      searchFormdata: {},
      dialogVisibleSelected: false,
      topOutsystemCode: 'XXD_ZCC;XXD_ZCC02'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 最高额授信协议申请列表
    AfterInit () {
     
    },
    handleClick: function (tab, event) {

    },
    // 新增
    doAdd () {
        let _this = this;
        _this.dialogVisibleSelected = true;
    },
    // 删除
    doDelete () {
      let _this = this;
      let rowData = _this.$refs.refTableToDo.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let approve = rowData[0].approveStatus;
      let pkId = rowData[0].pkId;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许删除',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docaspltcont/delete/' + pkId,
        data: {},
        callback: function (code, message, response) {
          let isInit = response.code;
          if (isInit == '0') {
            _this.$refs.refTableToDo.remoteData();
            _this.$message('删除成功!');
          } else {
            return;
          }
        }
      });
    },
    doUpdate: function () {
      let _this = this;
      let rowData = _this.$refs.refTableToDo.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let approve = rowData[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].tcontNo + 'EDIT',
        title: '购销合同修改',
        data: {
          model_group_no: 'CMG000028',
          op: 'EDIT',
          editAble: false,
          topOutsystemCode: _this.topOutsystemCode,
          imageParams: {
            contid: rowData[0].tcontNo,
            businessid: rowData[0].tcontImgId,
            docid: rowData[0].tcontImgId
          },
          bizId: rowData[0].tcontImgId
        },
        function () {
          _this.$refs.refTableToDo.remoteData();
        }
      });
    },
    // 查看(申请)
    doView: function () {
      let _this = this;
      let rowData = _this.$refs.refTableToDo.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].tcontNo + 'VIEW',
        title: '购销合同查看',
        data: {
          model_group_no: 'CMG000028',
          op: 'VIEW',
          editAble: false,
          topOutsystemCode: _this.topOutsystemCode,
          imageParams: {
            contid: rowData[0].tcontNo,
            businessid: rowData[0].tcontImgId,
            docid: rowData[0].tcontImgId
          },
          bizId: rowData[0].tcontImgId,
          imageType: '2'
        },
        function () {
           _this.$refs.refTableToDo.remoteData();
        }
      });
    },
    // 查看(历史)
    hisView: function () {
      let _this = this;
      let rowData = _this.$refs.refTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].tcontNo + 'VIEW',
        title: '历史购销合同查看',
        data: {
          model_group_no: 'CMG000028',
          op: 'VIEW',
          editAble: false,
          topOutsystemCode: _this.topOutsystemCode,
          imageParams: {
            contid: rowData[0].tcontNo,
            businessid: rowData[0].tcontImgId,
            docid: rowData[0].tcontImgId
          },
          bizId: rowData[0].tcontImgId,
          imageType: '2'
        },
        function () {
          _this.$refs.refTableToDo.remoteData();
        }
      });
    },
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
      let _this = this;
      let validate = false;
      _this.$refs.refFormCus.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let op = 'ADD';
      let cusId = _this.formdata.cusId;
      let cusName = _this.formdata.cusName;
      let tcontNo = _this.formdata.tcontNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docaspltcont/insert',
        data: {cusId: cusId, cusName: cusName, tcontNo: tcontNo},
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.rtnCode == '0000') {
               _this.dialogVisibleSelected = false;
              debugger;
              let tcontNo = response.data.tcontNo;
              let tcontImgId = response.data.tcontImgId;
              _this.$message({
                  message: '购销合同新增成功',
                  type: 'success'
              });
              // 跳转修改页面
              let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: tcontNo + op,
                title: '购销合同新增',
                data: {
                  model_group_no: 'CMG000028',
                  op: op,
                  topOutsystemCode: _this.topOutsystemCode,
                  imageParams: {
                    contid: tcontNo,
                    businessid: tcontImgId,
                    docid: tcontImgId
                  },
                  bizId: tcontImgId
                },
                function () {
                  _this.$refs.refTableToDo.remoteData();
                }
              });
            } else {
              _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '系统异常', 350, 150);
            return;
          }
        }
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },
  }
};
</script>
