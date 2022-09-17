<template>
  <div class="blank_template">
    <yu-row>
      <yu-col :sm="4" :xs="24">
        <yu-xtree :local-data="dataIcon" data-id="id" data-label="label" data-pid="pid" data-root="0" default-expand-all="true" @node-click="nodeClick"></yu-xtree>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <div v-show="nodeId == '1'">
           <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform  label-width="140px" v-model="formdata1"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="银承核心编号" name="coreBillNo"></yu-xform-item>

                  <yu-xform-item label="合同编号" name="contNo"  :colspan="11"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
                      <yu-button type="primary" @click="contNoDetail">查看</yu-button>
                  </yu-xform-item>

                  <yu-xform-item label="客户编号" name="cusId" :colspan="11" disabled ></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
                      <yu-button type="primary" @click="cusIdDetail">查看</yu-button>
                  </yu-xform-item>

                  <yu-xform-item label="客户名称" name="cusName" :colspan="24"></yu-xform-item>
                  <yu-xform-item label="产品编号" name="prdId" disabled></yu-xform-item>
                  <yu-xform-item label="产品名称" name="prdName"></yu-xform-item>
                  <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性"></yu-xform-item>
                  <yu-xform-item label="担保方式" name="guarMode" data-code="STD_ZB_GUAR_WAY" ctype="select" disabled></yu-xform-item>
                  <yu-xform-item label="是否电子票据" name="isEDrft" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata2"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="币种" name="curType" data-code="STD_ZB_CUR_TYP" ctype="select"></yu-xform-item>
                  <yu-xform-item label="票面总金额" name="drftTotalAmt"></yu-xform-item>
                  <yu-xform-item label="开票张数" name="isseCnt"></yu-xform-item>
                  <yu-xform-item label="出票日期" name="isseDate"></yu-xform-item>
                  <yu-xform-item label="保证金比例(%)" name="bailPerc"></yu-xform-item>
                  <yu-xform-item label="保证金金额" name="bailAmt"></yu-xform-item>
                  <yu-xform-item label="手续费率(‰)" name="chrgRate"></yu-xform-item>
                  <yu-xform-item label="敞口余额" name="spacAmt"></yu-xform-item>
                  <yu-xform-item label="手续费类型" name="chrgType" data-code="STD_CHRG_TYPE" ctype="select"  ></yu-xform-item>
                  <yu-xform-item label="手续费金额" name="chrgAmt" ></yu-xform-item>
                  <yu-xform-item label="逾期执款年利率" name="overdueRate" ></yu-xform-item>
                  <yu-xform-item label="退票记息方式" name="returnDraftInterestType" data-code="STD_RETURN_DRAFT_INTEREST_TYPE" ctype="select"  ></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
          <!-- <yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata3"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="承兑行类型" name="aorgType" data-code="STD_AORG_TYPE" ctype="select"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom"></yu-xform-item>
                  <yu-xform-item label="承兑行行号" name="aorgNo" ></yu-xform-item>
                  <yu-xform-item label="承兑行名称" name="aorgName" :colspan="24"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>  -->
           <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata4"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="是否使用授信额度" name="isUtilLmt" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>

                  <yu-xform-item label="" ctype="custom" name="custom"></yu-xform-item>
                  <yu-xform-item label="授信额度编号" name="lmtAccNo" colspan="10"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                     <yu-button type="primary" @click="lmtAccNoDetail">查看授信影像</yu-button>
                  </yu-xform-item>
                  <yu-xform-item label="批复编号" name="replyNo" colspan="11"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
                     <yu-button type="primary" @click="replyNoDetail">查看</yu-button>
                  </yu-xform-item>

                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata5"  disabled>
                <yu-xform-group>
                  <yu-xform-item label="账务机构编号" name="finaBrId" ctype="select"></yu-xform-item>
                  <yu-xform-item label="账务机构名称" name="finaBrIdName"></yu-xform-item>
                  <yu-xform-item label="签发机构编号" name="issuedOrgNo"></yu-xform-item>
                  <yu-xform-item label="签发机构名称" name="issuedOrgName"></yu-xform-item>
                  <yu-xform-item label="兑付机构编号" name="payOrgNo"></yu-xform-item>
                  <yu-xform-item label="兑付机构名称" name="payOrgName"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata6"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="登记人" name="inputIdName"></yu-xform-item>
                  <yu-xform-item label="登记机构" name="inputBrIdName"></yu-xform-item>
                  <yu-xform-item label="责任人" name="managerIdName"></yu-xform-item>
                  <yu-xform-item label="责任机构" name="managerBrIdName"></yu-xform-item>
                  <yu-xform-item label="登记日期" name="inputDate"></yu-xform-item>
                  <yu-xform-item label="台账状态" name="accStatus"  data-code="STD_ACC_ACCP_STATUS" ctype="select"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <div style="text-align:center">
               <yu-button  type="primary" @click="doBack">返回</yu-button>
           </div>
        </div>
        <div v-show="nodeId == '2'">
          <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
             <template slot="filter">
                 <yu-xform  ref="refForm" v-model="searchFormdata" label-width="120px"  :custom-search-fn="customSearch">
                   <yu-xform-group :column="2">
                     <yu-xform-item label="借据编号" placeholder="精确查询"   name="billNo" ></yu-xform-item>
                     <yu-xform-item label="票据号码" placeholder="精确查询"   name="porderNo" ></yu-xform-item>
                     <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_ACCP_STATUS"></yu-xform-item>
                     <yu-xform-item label="到期日期从" ctype="custom" name="custom">
                        <yu-col :sm="11" :xs="24">
                            <yu-date-picker type="date" placeholder="起始日期" v-model="enddate1" style="width: 100%;"></yu-date-picker>
                        </yu-col>
                        <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                        <yu-col :sm="11" :xs="24">
                            <yu-date-picker type="date" placeholder="结束日期" v-model="enddate2" style="width: 100%;"></yu-date-picker>
                        </yu-col>
                     </yu-xform-item>
                   </yu-xform-group>
                 </yu-xform>
             </template>
             <div class="yu-grpButton">
                <yu-button  type="primary" @click="customSearch">查询</yu-button>
                <yu-button  type="primary" @click="reset">重置</yu-button>
             </div>
          </yu-panel>
          <yu-panel title="票据明细台账" :hideFilter="false" :collapseHide="false">
            <div>
               <yu-button type="primary" @click="doView()" style="float:left">查看</yu-button>
               <yu-button type="primary" @click="doView('edit')" style="float:left">修改</yu-button>
               <yu-button type="primary" @click="doEnd" style="float:left">代签银票结清</yu-button>
               <yu-button type="primary" @click="doView1" style="float:left" hidden>打印代签银票</yu-button>
               <yu-button type="primary" @click="doView2" style="float:left" hidden>打印银票台账明细</yu-button>
               <yufp-excel-export type="primary" style="float:left" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
            </div>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" align="center" requestType="POST"  :base-params="baseParams" selection-type="radio">
              <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="银承核心编号" prop="coreBillNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="借据编号" prop="billNo" ></yu-xtable-column>
              <yu-xtable-column align="center" label="票据号码" prop="porderNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="票面金额" prop="draftAmt"></yu-xtable-column>
              <yu-xtable-column align="center" label="出票日期" prop="isseDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="到期日期" prop="endDate" ></yu-xtable-column>
              <yu-xtable-column align="center" label="保证金金额" prop="bailAmt"></yu-xtable-column>
              <yu-xtable-column align="center" label="台账状态" prop="accStatus"  data-code="STD_ACC_ACCP_STATUS"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </div>
        <div v-show="nodeId == '3'" >
         <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refTable2" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl2" align="center" request-type="POST"  :base-params="baseParams2" selection-type="radio">
              <yu-xtable-column label="保证金账号"  prop="bailAccNo" align="center"></yu-xtable-column>
              <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub" align="center"></yu-xtable-column>
              <yu-xtable-column label="开户行号" prop="acctsvcrNo" align="center"></yu-xtable-column>
              <yu-xtable-column label="保证金金额" prop="bailAmt" align="center"></yu-xtable-column>
              <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" align="center" data-code="STD_BAIL_INTEREST_MODE"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
        </div>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_CHRG_TYPE,STD_RETURN_DRAFT_INTEREST_TYPE,STD_AORG_TYPE,STD_ACC_ACCP_STATUS,STD_BAIL_INTEREST_MODE,STD_PRD_TYPE_PROP');

import mixin from '@/utils/mixin';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  components: { YufpExcelExport, YufpExcelImport },
  mixins: [mixin],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      enddate1: '',
      enddate2: '',
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formdata4: {},
      formdata5: {},
      formdata6: {},
      formdata7: {},
      baseParams: {condition: {contNo: this.$route.meta.params.contNo, coreBillNo: this.$route.meta.params.coreBillNo}},
      dataUrl: backend.cmisBiz + '/api/accaccpdrftsub/selectByContNo',
      dataUrl2: backend.cmisBiz + '/api/bailaccinfo/queryBySerno',
      baseParams2: {condition: {serno: this.$route.meta.params.serno}},
      excelExportUrl: backend.cmisBiz + '/api/accaccpdrftsub/exportAccAccpDrftSub',
      dataIcon: [
        { id: '0', label: '银承台账详情', pid: '-1', children: [{ id: '1', label: '银承台账信息', pid: '0' }, { id: '2', label: '票据明细', pid: '0' }, { id: '3', label: '保证金信息', pid: '0' }] }
      ],
      nodeId: '1'
    };
  },
  created () {
    this.afterInt();
  },
  methods: {

    /* 自定义查询 */
    customSearch: function () {
      var _this = this;
      var param = _this.searchFormdata;
      var conditionData = {};
      yufp.clone(param, conditionData);
      conditionData['enddate1'] = _this.enddate1;
      conditionData['enddate2'] = _this.enddate2;
      conditionData['contNo'] = _this.$route.meta.params.contNo;
      _this.baseParams['condition'] = conditionData;
      _this.$refs.refTable.remoteData(_this.baseParams);
    },
    /* 重置 */
    reset () {
      var _this = this;
      _this.$refs.refForm.resetFields();
      _this.enddate1 = '';
      _this.enddate2 = '';
      _this.customSearch();
    },

    /*
      页面初始化
    */
    afterInt () {
      let _this = this;
      var coreBillNo = _this.$route.meta.params.coreBillNo;
      var contNo = _this.$route.meta.params.contNo;
      var data = {};
      data.coreBillNo = coreBillNo;
      data.contNo = contNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/accaccp/queryByCoreBillNo',
        data: JSON.stringify(data),
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata1);
            yufp.clone(response.data, _this.formdata2);
            yufp.clone(response.data, _this.formdata3);
            yufp.clone(response.data, _this.formdata4);
            yufp.clone(response.data, _this.formdata5);
            yufp.clone(response.data, _this.formdata6);
            _this.formdata2.bailPerc = _this.formdata2.bailPerc * 100 
            _this.formdata2.chrgRate = _this.formdata2.chrgRate * 1000
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 合同编号详情 */
    contNoDetail () {
      this.$xutils.showMsgBox('提示', '合同编号详情');
    },
    /* 客户编号详情 */
    cusIdDetail () {
      this.$xutils.showMsgBox('提示', '客户编号详情');
    },
    /* 查看授信影像 */
    lmtAccNoDetail () {
      this.$xutils.showMsgBox('提示', '查看授信影像');
    },
    /* 批复编号 */
    replyNoDetail () {
      this.$xutils.showMsgBox('提示', '批复编号详情');
    },
    /**
     * 目录选择
     */
    nodeClick: function (data) {
      var _this = this;
      _this.nodeId = data.id;
    },

    /* 查看详情 ----或修改 */
    doView (op) {
      var viewType = op == 'edit' ? 'edit' : 'view';
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (op == 'edit') {
        if (selectionsAry[0].isOtherBankSign != '1') {
          return _this.$message.warning('非他行代签不允许修改汇票号码 ');
        }
        if (selectionsAry[0].accStatus == '3') {
          return _this.$message.warning('该笔票据已结清,不再允许修改');
        }
      }
      // 传递的主键
      var coreBillNo = selectionsAry[0].coreBillNo;
      var billNo = selectionsAry[0].billNo;
      _this.$router.addTab({
        name: 'cusmanage/indivCus/indivBankQuery/indivBankQueryDetailManager',
        key: 'indivBankQueryDetailManager' + new Date().getTime(), // 必传
        title: '银承票据详情',
        data: {
          coreBillNo: coreBillNo,
          billNo: billNo,
          viewType: viewType
        }
      });
    },
    /* 结清 */
    doEnd () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selectionsAry[0].isOtherBankSign != '1') {
        return _this.$message.warning('仅他行代签的票据，可变更该笔票据的台账状态为结清');
      }
      if (selectionsAry[0].accStatus == '3') {
        return _this.$message.warning('该笔票据已结清');
      }
      _this.$confirm('是否结清?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/accaccpdrftsub/updateByAccStatus',
              data: selectionsAry[0],
              callback: function (code, message, response) {
                if (response.data == 0) {
                  _this.$message.success('操作成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    doView1 () {
      this.$message.error('待开发');
    },
    doView2 () {
      this.$message.error('待开发');
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
