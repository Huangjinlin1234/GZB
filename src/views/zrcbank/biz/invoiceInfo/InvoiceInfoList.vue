<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="未补录发票" name="toDoTip">
        <div>
            <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
                <yu-xform related-table-name="refTableToDo" ref="refForm" form-type="search" v-model="searchFormdata">
                    <yu-xform-group :column="3">
                        <yu-xform-item label="发票录入流水号" label-width="150px" ctype="input" placeholder="发票录入流水号" name="serno" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label="购销合同编号" label-width="150px" placeholder="购销合同编号" name="tContNo" fuzzy-query="both"></yu-xform-item>
                    </yu-xform-group>
                </yu-xform>
                
                <yu-form-buttons align="left">
                    <yu-button ref="btn_doAdd" @click="doAdd" type="primary">新增</yu-button>
                    <yu-button ref="btn_doUpdate" @click="doUpdate" type="primary">修改</yu-button>
                    <yu-button ref="btn_doDelete" @click="doDelete" type="primary">删除</yu-button>
                    <yu-button ref="btn_doView" @click="doView" type="primary">查看</yu-button>
                </yu-form-buttons>

                <!--发票补录新增向导-->
                <yu-xdialog :visible.sync="dialogVisibleSelected" width="950px">
                  <yu-xform ref="refFormCus" label-width="140px" v-model="formdata" :disabled="formDisabled">
                    <yu-xform-group column="1">
                      <yu-xform-item label="客户编号" ctype="yu-pvp-accp-app-pop" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','tContNo':'tContNo','pvpSerno':'pvpSerno'}" idField="cusId"
                        width="600" height="500" title="客户选取"></yu-xform-item>
                      <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
                      <yu-xform-item label="购销合同编号" ctype="input" placeholder="购销合同编号" name="tContNo" disabled></yu-xform-item>
                      <yu-xform-item label="补录流水" ctype="input" placeholder="补录流水" name="pvpSerno" disabled></yu-xform-item>
                    </yu-xform-group>
                    <div class="yu-grpButton">
                      <yu-button type="primary" @click="nextFn">下一步</yu-button>
                      <yu-button @click="cancelFn">取消</yu-button>
                    </div>
                  </yu-xform>
                </yu-xdialog>
                 <!--发票补录新增向导-->
                <yu-xtable ref="refTableToDo" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  :pageable="true" :data-url="dataUrl" :base-params="{condition: {'isAddpReco':'0'}}" :default-load="false" request-type="POST">
                  <yu-xtable-column label="发票录入流水号" prop="serno" ></yu-xtable-column>
                  <yu-xtable-column label="购销合同编号" prop="tContNo" ></yu-xtable-column>                 
                  <yu-xtable-column label="发票是否补录" prop="isAddpReco" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                  <yu-xtable-column label="登记人" prop="inputId" data-code="STD_ZB_SETTLE_METH"></yu-xtable-column>
                  <yu-xtable-column label="登记日期" prop="inputDate" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
    </yu-tab-pane>
    <yu-tab-pane label="已补录发票"  name="hisTip">
        <div>
            <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
                 <yu-xform related-table-name="refTableHis" ref="refForm" form-type="search" v-model="searchFormdata2">
                    <yu-xform-group :column="3">
                        <yu-xform-item label="发票录入流水号" label-width="150px" ctype="input" placeholder="发票录入流水号" name="serno" fuzzy-query="both"></yu-xform-item>
                        <yu-xform-item label="购销合同编号" label-width="150px" placeholder="购销合同编号" name="tContNo" fuzzy-query="both"></yu-xform-item>
                    </yu-xform-group>
                </yu-xform>
                <yu-form-buttons align="left">
                    <yu-button ref="btn_doView" @click="hisView" type="primary">查看</yu-button>
                </yu-form-buttons>
                <yu-xtable ref="refTableHis" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick"  :pageable="true" :data-url="dataUrl" :base-params="{condition: {'isAddpReco':'1'}}" :default-load="false" request-type="POST">
                 <yu-xtable-column label="发票录入流水号" prop="serno" hide-column></yu-xtable-column>
                  <yu-xtable-column label="购销合同编号" prop="tContNo" ></yu-xtable-column>
                  <yu-xtable-column label="发票是否补录" prop="isAddpReco" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                  <yu-xtable-column label="登记人" prop="inputId" data-code="STD_ZB_SETTLE_METH"></yu-xtable-column>
                  <yu-xtable-column label="登记日期" prop="inputDate" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
// 合同类型
yufp.lookup.reg('STD_ZB_YES_NO');
import mixin from '@/utils/mixin';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
export default {
  data () {
    return {
      dataUrl: backend.cmisBiz + '/api/invoiceinfo/query',
      activeName: 'toDoTip',
      searchFormdata: {},
      dialogVisibleSelected: false
    };
  },
  created () {
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
      let serno = rowData[0].serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/invoiceinfo/delete/' + serno,
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
      let serno = rowData[0].serno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].tContNo + 'EDIT',
        title: '购发票补录修改',
        data: {
          model_group_no: 'CMG000081',
          op: 'EDIT',
          editAble: false,
          topOutsystemCode: 'XXD_ZCC;',
          imageParams: {
            contid: rowData[0].tContNo,
            businessid: rowData[0].serno,
            docid: rowData[0].tContNo
          },
          bizId: rowData[0].serno
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
        key: rowData[0].tContNo + 'VIEW',
        title: '购发票补录查看',
        data: {
          model_group_no: 'CMG000081',
          op: 'VIEW',
          editAble: false,
          topOutsystemCode: 'XXD_ZCC;',
          imageParams: {
            contid: rowData[0].tContNo,
            businessid: rowData[0].serno,
            docid: rowData[0].tContNo
          },
          bizId:  rowData[0].serno,
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
        key: rowData[0].tContNo + 'VIEW',
        title: '购发票补录查看',
        data: {
          model_group_no: 'CMG000081',
          op: 'VIEW',
          editAble: false,
          topOutsystemCode: 'XXD_ZCC;',
          imageParams: {
            contid: rowData[0].tContNo,
            businessid: rowData[0].serno,
            docid: rowData[0].tContNo
          },
          bizId:  rowData[0].serno,
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
      let tContNo = _this.formdata.tContNo;
      let pvpSerno = _this.formdata.pvpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/invoiceinfo/insertReturn',
        data: {tContNo: tContNo, serno: pvpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleSelected = false;
            debugger;
            let tContNo = response.data.tContNo;
            let serno = response.data.serno;
            _this.$message({
                message: '发票补录新增成功',
                type: 'success'
            });
            // 跳转修改页面
            let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
            _this.$router.addTab({
              name: path,
              key: tContNo + op,
              title: '购发票补录新增',
              data: {
                model_group_no: 'CMG000081',
                op: op,
                topOutsystemCode: 'XXD_ZCC;',
                imageParams: {
                  contid: tContNo,
                  businessid: serno,
                  docid: tContNo
                },
                bizId: serno
              },
              function () {
                _this.$refs.refTableToDo.remoteData();
              }
            });
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
