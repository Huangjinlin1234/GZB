
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="adjustmentApplyTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" fuzzy-query="both" clearable></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input" fuzzy-query="both" clearable></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="adjustment-apply-btns" style="margin-bottom:10px;">
        <yu-button type="primary"  v-if="checkCtrl('add')"  @click="addFn">新增</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yufp-excel-export :export-url="exportTemplateUrl"  v-if="checkCtrl('download')" title="模板下载"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl"  v-if="checkCtrl('import')" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
        <yu-button type="primary" @click="submitFn"  v-if="checkCtrl('submit')">提交</yu-button>
        <yu-button type="primary" @click="revokeApplyFn"  v-if="checkCtrl('revert')">撤销申请</yu-button>
        <yu-button type="primary" @click="deleteFn"  v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn"  v-if="checkCtrl('view')">查看</yu-button>
        <!--<yu-button type="primary"  v-if="checkCtrl('add')" @click="addFn">新增</yu-button>-->
      </div>
      <yu-xtable ref="adjustmentApplyTable" condition-key="condition" selection-type="checkbox" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="卡号 " prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="原始信用额度" prop="origCreditCardLmt"></yu-xtable-column>
        <yu-xtable-column label="新信用额度" prop="newCreditCardLmt"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="提额渠道" prop="adjustmentChnl" data-code="STD_CARD_ADJUSTMENT_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import {lookup} from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS,STD_CARD_ADJUSTMENT_CHNL');
export default {
  name: 'AdjustmentApplyList',
  components: {YufpExcelExport, YufpExcelImport},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/querymodel',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/cut',
      exportTemplateUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/exporttemplate',
      excelImportUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/excelimport',
      checkCardNoUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findcardbycardno',
      queryCusUrl: this.$backend.cmisCus + '/api/cusbase/queryCusInfo',
      searchFormdata: {
        cusName: '',
        cardNo: ''
      },
      baseParams: {
        condition: {applyExistsStatus: '000,992'}
      },
      formDisabled: false,
      saveBtnShow: true
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshAdjustmentApplyTable', this.refreshAdjustmentApplyTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshAdjustmentApplyTable');
  },
  methods: {
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.adjustmentApplyTable.remoteData();
    },
    /**
     * 提交流程(系统跑批批量提交流程)
     */
    submitProcessFun: function (selData) {
      let _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      let dtoArr = [];
      this.$request({
        method: 'POST',
        url: _this.queryCusUrl,
        data: selData[0].certCode
      }).then(({cusId}) => {
        for (let i = 0; i < selData.length; i++) {
          let startdto = {
            systemId: 'cmis',
            orgId: loginUser.orgCode,
            userId: loginUser.loginCode,
            bizType: 'XK004',
            bizId: selData[i].serno,
            bizUserName: selData[0].cusName,
            bizUserId: cusId,
            param: {certCode: selData[i].certCode, newCreditCardLmt: selData[i].newCreditCardLmt}
          };
          dtoArr.push(startdto);
        }
        _this.$request({
          url: this.$backend.workflowService + '/api/core/startQuicklyBatch',
          method: 'POST',
          data: {startDtos: dtoArr}
        }).then(({code, message, data}) => {
          if (code == '0') {
            _this.$message({message: '操作成功', type: 'success'});
            setTimeout(() => {
              _this.$refs.adjustmentApplyTable.remoteData();
            }, 500);
          } else {
            _this.$message({message: message || '操作失败', type: 'error'});
          }
        });
      });
    },
    /**
     * 表格刷新
     */
    refreshAdjustmentApplyTable: function () {
      let _this = this;
      _this.$refs.adjustmentApplyTable.remoteData();
    },
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.saveBtnShow = editable;
      this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/adjustment/adjustmentadd/AdjustmentApplyAddIndex';
      var serno = this.$xutils.getDefaultformulaData('SEQ:LMT_COOP_APP_SERNO');
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增额度调整申请',
        data: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          serno: serno,
          data: {}
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.adjustmentApplyTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selData[0].approveStatus === '000' || selData[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/adjustment/adjustmentadd/AdjustmentApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改额度调整申请',
        data: {
          name: _this.$route.name,
          actionType: 'EDIT', // 操作类型
          data: selData[0]
        }
      });
    },
    /**
     * 提交
     */
    submitFn: function () {
      let _this = this;
      let selData = _this.$refs.adjustmentApplyTable.selections;
      if (selData.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      let flag = selData.every((item) => {
        return item.adjustmentChnl === '01';
      });
      if (!flag) { // 判断是否为待发起
        _this.$message({
          message: '请选择提额渠道为系统跑批的数据',
          type: 'warning'
        });
        return;
      }
      _this.$request({
        url: _this.checkCardNoUrl,
        method: 'POST',
        data: {cardNo: selData[0].cardNo}
      }).then(({code, message, data}) => {
        if (code == '0') { // 卡号存在
          _this.submitProcessFun(selData);
        } else { // 卡号不存在
          _this.$message({
            message: '卡号不存在',
            type: 'warning'
          });
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.adjustmentApplyTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/adjustment/adjustmentadd/AdjustmentApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看额度调整申请',
        data: {
          name: _this.$route.name,
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0]
        }
      });
    },

    /**
     * 表格点击查看详情
     */
    showFuncDetail (row) {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/adjustment/adjustmentadd/AdjustmentApplyAddIndex';
      let actionType = 'DETAIL';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看额度调整申请',
        data: {
          name: _this.$route.name,
          actionType: actionType, // 操作类型
          data: row
        }
      });
    },

    /**
     * 删除 仅能删除批量跑批后生成的不需要进行调额的记录，与状态为【待发起】的调额申请记录
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.adjustmentApplyTable.selections;

      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // if (selections[0].adjustmentChnl !== '01') { // 01表示系统跑批
      //   _this.$message({
      //     message: '请选择提额渠道为系统跑批的申请',
      //     type: 'warning'
      //   });
      //   return;
      // }

      if (selections[0].approveStatus === '000' || selections[0].approveStatus === '992') { // 000为待发起,992为打回
        let arr = [];
        for (let i = 0; i < selections.length; i++) {
          arr.push(selections[i].serno);
        }
        _this.$confirm('此操作删除申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              yufp.service.request({
                method: 'POST',
                data: {serno: arr.join(',')},
                url: _this.batchDeleteUrl,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$message({ message: '数据删除成功！', type: 'info'});
                    _this.$refs.adjustmentApplyTable.remoteData();
                  } else {
                    _this.$message({ message: '数据删除失败！', type: 'error'});
                  }
                }
              });
            }
          }
        });
      } else {
        _this.$message({
          message: '只能删除系统跑批且为待发起或打回状态的申请',
          type: 'warning'
        });
        return;
      }
    },
    /**
     * 撤销申请 仅能删除与状态为【待发起】的调额申请记录，渠道进件，不支持撤销
     */
    revokeApplyFn: function () {
      let _this = this;
      let selections = _this.$refs.adjustmentApplyTable.selections;

      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let chnlFlag = selections[0].adjustmentChnl === '00' || selections[0].adjustmentChnl === '01';
      if (!chnlFlag) { // 00:pc端，01：系统跑批；除了pc端以及系统跑批 其余都是渠道进件
        _this.$message({
          message: '请选择提额渠道不为信贷PC端或系统跑批的申请',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selections[0].approveStatus === '000' || selections[0].approveStatus === '992';
      if (!statusFlag) { // 000为待发起,992为打回
        _this.$message({
          message: '请选择审核状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].serno);
      }
      _this.$confirm('此操作将删除调额申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: {serno: arr.join(',')},
              url: _this.batchDeleteUrl,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.adjustmentApplyTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
  .adjustment-apply-btns .excel-export,.adjustment-apply-btns .excel-import{
    float: none;
    display: inline-block;
  }
</style>
