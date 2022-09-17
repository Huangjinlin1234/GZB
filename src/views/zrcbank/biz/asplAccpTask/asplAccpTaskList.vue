
<template>
  <div class="tab-search">
    <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待补录发票" name="toDoTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm1" related-table-name="refTableToDo" form-type="search" v-model="searchFormdata" label-width="120px" >
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" label-width="140px" fuzzy-query="both"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>

          <yu-form-buttons align="left">
            <yu-button ref="btn_doAdd" v-if="checkCtrl('add')" @click="doAdd" type="primary">新增</yu-button>
            <yu-button ref="btn_doUpdate" v-if="checkCtrl('update')" @click="doUpdate" type="primary">修改</yu-button>
            <yu-button ref="btn_doDelete" v-if="checkCtrl('delete')" @click="doDelete" type="primary">删除</yu-button>
            <yu-button @click="doViewToDo" v-if="checkCtrl('view')" type="primary">查看</yu-button>
          </yu-form-buttons>
           <!--发票补录新增向导-->
          <yu-xdialog :visible.sync="dialogVisibleSelected" width="950px">
            <yu-xform ref="refFormCus" label-width="140px" v-model="formdata" :disabled="formDisabled">
              <yu-xform-group column="1">
                <yu-xform-item label="客户编号" ctype="yu-pvp-accp-app-pop" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','contNo':'contNo','pvpSerno':'pvpSerno'}" idField="cusId"
                  width="600" height="500" title="客户选取"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="补录流水" ctype="input" placeholder="补录流水" name="pvpSerno" disabled></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="nextFn">下一步</yu-button>
                <yu-button @click="cancelFn">取消</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>

          <yu-xtable ref="refTableToDo" row-number selection-type="radio" condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="{condition: {'applyExistsStatus':'000,111,992'}}" :default-load="true">
            <yu-xtable-column label="任务编号"  label-width="140px" prop="taskId"></yu-xtable-column>
             <yu-xtable-column label="出账流水号" prop="pvpSerno"></yu-xtable-column>
            <!--<yu-xtable-column label="核心合同号" prop="coreContNo"></yu-xtable-column>-->
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <!--<yu-xtable-column label="资产池协议中文合同号" prop="contCnNo"></yu-xtable-column>-->
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="票据总金额" prop="batchDrftAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="汇票数（张）" prop="batchQnt"></yu-xtable-column>
            <yu-xtable-column label="生成日期" prop="taskCreateDate"></yu-xtable-column>
            <yu-xtable-column label="要求完成日期" prop="needFinishDate"></yu-xtable-column>
            <!--<yu-xtable-column label="是否已完成发票补扫" prop="isAddBill"  data-code="STD_ZB_YES_NO"></yu-xtable-column>-->
            <yu-xtable-column prop="isAddBill" data-code="STD_ZB_YES_NO" label="是否上传影像"  >
              <template slot-scope="scope">
                <yu-tag :type="scope.row.isAddBill === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.isAddBill=='0' ? '未上传' :'已上传' }}</yu-tag>
              </template>
            </yu-xtable-column>
            <!--<yu-xtable-column label="收集日期" prop="collectDate"></yu-xtable-column>-->
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="历史补录发票" name="hisTip">
      <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
           <yu-xform ref="refForm" related-table-name="refTableHis" form-type="search" v-model="searchFormdata" label-width="120px" >
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" label-width="140px" fuzzy-query="both"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <yu-button @click="doViewHis" v-if="checkCtrl('hisview')" type="primary">查看</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTableHis" row-number selection-type="radio" condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="{condition: {'applyExistsStatus':'996,997,998'}}">
            <yu-xtable-column label="任务编号" prop="taskId"></yu-xtable-column>
            <yu-xtable-column label="出账流水号" prop="pvpSerno"></yu-xtable-column> 
            <yu-xtable-column label="影像流水" prop="billImgId"></yu-xtable-column> 
            <!--<yu-xtable-column label="核心合同号" prop="coreContNo"></yu-xtable-column>-->
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <!--<yu-xtable-column label="资产池协议中文合同号" prop="contCnNo"></yu-xtable-column>-->
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="批次票面金额" prop="batchDrftAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="申请汇票数量" prop="batchQnt"></yu-xtable-column>
            <yu-xtable-column label="生成日期" prop="taskCreateDate"></yu-xtable-column>
            <yu-xtable-column label="要求完成日期" prop="needFinishDate"></yu-xtable-column>
            <yu-xtable-column label="收集日期" prop="collectDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS,STD_ZB_YES_NO');
import mixin from '@/utils/mixin';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'toDoTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/asplaccptask/asplaccptasklist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ],
      dialogVisibleSelected: false
    };
  },
  methods: {
    
    onBack () {
      this.initList();
    },

    //待补录查看
    doViewToDo () {
      var _this = this;
      if (_this.$refs.refTableToDo.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTableToDo.selections[0];
      var op = 'VIEW';
      _this.addTab(jsoPar, op);
    },
    //历史查看
    doViewHis () {
      var _this = this;
      if (_this.$refs.refTableHis.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTableHis.selections[0];
      var op = 'VIEW';
      _this.addTab(jsoPar, op);
    },

    // 打开Tab页
    addTab: function (jsoPar, op) {
      var _this = this;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.taskId + op,
        title: '购销背景收集',
        data: {
          model_group_no: 'CMG000081',
          op: op,
          editAble: false,
          topOutsystemCode: 'XXD_ZCC;',
          imageParams: {
            contid: jsoPar.coreContNo,
            businessid: jsoPar.billImgId,
            docid: jsoPar.taskId,
            authority: 'import;insert;download;scan;delImg;approve'
          },
          coreContNo: jsoPar.coreContNo,
          pvpSerno: jsoPar.pvpSerno,
          taskId: jsoPar.taskId
        },
        function () {
          _this.$refs.refTableToDo.remoteData();
        }
      });
    },
    
    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTableToDo.remoteData();
    },
    // 新增
    doAdd () {
        let _this = this;
        _this.dialogVisibleSelected = true;
    },
    //下一步
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
      let contNo = _this.formdata.contNo;
      let pvpSerno = _this.formdata.pvpSerno;
      let cusId = _this.formdata.cusId;
      let cusName = _this.formdata.cusName;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/asplaccptask/addasplaccptask',
        data: {contNo: contNo, pvpSerno: pvpSerno, cusId: cusId, cusName: cusName},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleSelected = false;
            let jsoPar = response.data;
            debugger;
            _this.$message({
                message: '发票补录新增成功',
                type: 'success'
            });
            // 跳转修改页面
            let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
            _this.$router.addTab({
              name: path,
              key: contNo + op,
              title: '发票补录新增',
              data: {
                model_group_no: 'CMG000081',
                op: op,
                editAble: false,
                topOutsystemCode: 'XXD_ZCC;',
                imageParams: {
                  contid: jsoPar.coreContNo,
                  businessid: jsoPar.billImgId,
                  docid: jsoPar.pvpSerno,
                  authority: 'import;insert;download;scan;delImg;approve'
                },
                coreContNo: jsoPar.coreContNo,
                pvpSerno: jsoPar.pvpSerno,
                taskId: jsoPar.taskId
              },
              function () {
                _this.$refs.refTableToDo.remoteData();
              }
            });
          } else {
            _this.$message({
              message: response.message,
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    // 取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
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
      if (rowData[0].approveStatus == '111'){
          _this.$message({
          message: '审核中的数据不可以删除',
          type: 'warning'
        });
        return;
      }
      let taskId = rowData[0].taskId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/asplaccptask/deletebytaskid/' + taskId,
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
      if (rowData[0].approveStatus == '111'){
        _this.$message({
          message: '审核中的数据不可以修改',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTableToDo.selections[0];
      var op = 'EDIT';
      _this.addTab(jsoPar, op); 
    }
  }
};
</script>