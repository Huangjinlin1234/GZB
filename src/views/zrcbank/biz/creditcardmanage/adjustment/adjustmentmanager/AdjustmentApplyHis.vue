
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息历史
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="adjustmentApplyHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" clearable></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input" clearable></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" @click="infoFn"  v-if="checkCtrl('view')">查看</yu-button>
        <yu-button type="primary" @click="deleteFn"  v-if="checkCtrl('delete')">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="adjustmentApplyHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
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
import {lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_APPR_STATUS,STD_CARD_ADJUSTMENT_CHNL');
export default {
  name: 'AdjustmentApplyHis',
  components: {},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/querybystatus',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/cut',
      baseParams: {
        condition: {applyExistsStatus: '111,990,991,993,997,998'}
      }
    };
  },
  methods: {
    auditSatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_ZB_APPR_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },

    /**
     * 删除 仅能删除批量跑批后生成的不需要进行调额的记录，与状态为【待发起】的调额申请记录
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.adjustmentApplyHisTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selections[0].approveStatus === '992') { // 000为待发起,992为打回
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
                    _this.$refs.adjustmentApplyHisTable.remoteData();
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
          message: '只能删退回或打回状态的申请',
          type: 'warning'
        });
        return;
      }
    },
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.adjustmentApplyHisTable.selections;
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
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
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
    }

  }
};
</script>
