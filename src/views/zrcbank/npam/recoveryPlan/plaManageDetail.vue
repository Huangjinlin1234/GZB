<template>

  <div>
    <yu-panel title="清收计划制定" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="140px" v-model="baseFormdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="清收计划编号" name="recoverySerno" disabled></yu-xform-item>
           <!-- <yu-xform-item label="清收年份" name="recoveryYear" disabled ctype="custom">
             <yu-date-picker  v-model="value5"  align="center"  type="year" ></yu-date-picker>
          </yu-xform-item>-->
          <yu-xform-item label="清收年份" name="recoveryYear" ctype="datepicker" align="center" type="year" rules="required" :disabled="viewType == 'DETAIL'" >
          </yu-xform-item>
          <yu-xform-item label="预计清收总额(元)" name="recoveryTotalAmt" rules="required" disabled ctype="num"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" rules="required"  disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" rules="required"  hidden></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName"  disabled></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId"  hidden></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" :hidden="viewType == 'DETAIL'">保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

    <yu-panel title="清收计划详情" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yufp-excel-import type="primary" style="float:right" :import-url="excelImportUrl" :biz-data-params="bizDataParams" title="Excel导入" :async="false" max-file-size="10" @import-success="doAutoQuery" v-if="viewType != 'DETAIL'"></yufp-excel-import>
        <yu-button type="primary" @click="deleteFn" v-if="viewType != 'DETAIL'">删除</yu-button>
        <yu-button type="primary" @click="payBackFn">还款情况</yu-button>
        <yufp-excel-export type="primary" style="float:right" :export-url="exportTemplateUrl" title="模板下载" v-if="viewType != 'DETAIL'"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" align="center" requestType="POST" @loaded="loadFn" :base-params="baseParams">
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额(元)" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额(元)" prop="loanBalance" :formatter="Currency" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="资产类型" prop="assetType" data-code="STD_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="处置方式" prop="dispMode" data-code="STD_DISP_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="预计清收金额(元)" prop="recoveryAmt" :formatter="Currency"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';

// 获取仓库数据
yufp.lookup.reg('STD_ASSET_TYPE,STD_DISP_TYPE,');
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      baseParams: {condition: JSON.stringify({ recoverySerno: this.$route.meta.params.recoverySerno})},
      baseFormdata: {},
      dataUrl: backend.cmisNpam + '/api/plaplandetail/selectByrecoverySerno',
      exportTemplateUrl: backend.cmisNpam + '/api/plaplandetail/exportplanDetail',
      excelImportUrl: backend.cmisNpam + '/api/plaplandetail/importplanDetail',
      bizDataParams: {recoverySerno: this.$route.meta.params.recoverySerno},
      viewType: ''
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
    var _this = this;
    _this.afterInit();
  },
  methods: {

    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var recoverySerno = _this.$route.meta.params.recoverySerno;
      _this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType !== 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plaplan/' + recoverySerno,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.baseFormdata);
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        _this.baseFormdata['recoverySerno'] = recoverySerno;
        _this.baseFormdata['inputId'] = _this.userId;
        _this.baseFormdata['inputIdName'] = _this.userName;
        _this.baseFormdata['inputBrId'] = _this.orgCode;
        _this.baseFormdata['inputBrIdName'] = _this.orgName;
        _this.baseFormdata['inputDate'] = _this.formatTime();
      }
    },
    /* 获取表格所有数据,统计回显预计清收总额 */
    loadFn (data, total, response) {
      var sumRecoveryAmt = 0;
      for (var i = 0; i < data.length; i++) {
        sumRecoveryAmt = sumRecoveryAmt + data[i].recoveryAmt;
      }
      this.baseFormdata.recoveryTotalAmt = sumRecoveryAmt;
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        };
        if (_this.viewType === 'ADD') {
          // 新增时。。。。保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.cmisNpam + '/api/plaplan/insert',
            data: _this.baseFormdata,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
                // 清收管理页面传递过来的页面数据刷新函数
                  _this.$route.meta.params.updateFn();
                  yufp.router.removeTab(_this.$route.path);
                });
              } else {
                _this.$message.error(response.message);
              }
            }
          });
        } else {
        // 修改时。。。。保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.cmisNpam + '/api/plaplan/update',
            data: this.baseFormdata,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
                });
              } else {
                _this.$message.error(response.message);
              }
            }
          });
        }
      });
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var ppdSerno = selectionsAry[0].ppdSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plaplandetail/delete/' + ppdSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      _this.$refs.refTable.remoteData();
                    }
                  });
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'error'
                  });
                }
              }
            });
          }
        }
      });
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    },
    /* 还款详情 */
    payBackFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var billNo = selectionsAry[0].billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/recoveryPlan/planForXd',
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        title: '还款详情',
        data: {
          viewType: 'EDIT',
          billNo: billNo
        }
      });
    }

  }
};
</script>
