<template>
    <div>
      <yu-panel title="授信资料质量考核" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number :data-url="dataUrl" sum-text="总计"
         show-summary :base-params="baseParams" default-load="true" condition-key="condition"
         selection-type="radio" request-type="POST" :pageable="false" :summary-method="getSummaries">
          <yu-xtable-column label="退回事项扣分项" prop="backItemName" width="1000" align="center"></yu-xtable-column>
          <yu-xtable-column label="扣分分值" prop="backItemPoint" ctype="yu-num" width="120" align="center" @blur="returnFn"></yu-xtable-column>
          <yu-xtable-column label="扣分人" prop="updIdName" align="center" ></yu-xtable-column>
          <yu-xtable-column label="扣分时间" prop="inputDate" align="center" ></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId" align="center" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId" align="center" hide-column></yu-xtable-column>
          <yu-xtable-column label="最后更新人" prop="updId" align="center" hide-column></yu-xtable-column>
          <yu-xtable-column label="最后更新机构" prop="updBrId" align="center" hide-column></yu-xtable-column>
          <yu-xtable-column label="最后更新时间" prop="updDate" align="center" hide-column></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-form-buttons align="center">
        <yu-button  type="primary" @click="save">保存</yu-button>
      </yu-form-buttons>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
export default {
  props: {
    bizPageData: {
      // 评论信息
      type: Array,
      default: function () {
        return null;
      }
    }
  },
  data: function () {
    return {
      dataUrl: '',
      baseParams: {},
      currentOrgId: '',
      currentUserId: '',
      currentOrgIdName: '',
      currentUserIdName: ''
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org', 'userName'])
  },
  created () {
    debugger;
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.currentOrgIdName = this.org.name;
    this.currentUserIdName = this.userName;
    let params = this.$route.params;
    this.dataUrl = backend.cmisBiz + '/api/lmtapprbackitem/selectbymodel';
    this.baseParams = {
      condition: {
        serno: params.serno
      }
    };
  },
  mounted: function () {

  },
  methods: {
    save () {
      let _this = this;
      let backItemData = this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprbackitem/savebackitempointdata',
        data: backItemData,
        callback: function (code, message, response) {
          debugger;
          if (response.code == '0') {
            if (response.data) {
              _this.$message('保存成功');
              _this.$refs.refTable.remoteData();
            } else {
              _this.$xutils.showMsgBox('提示', response.rtnMsg);
            }
          } else {
            _this.$message('保存失败!');
          }
        }
      });
    },

    returnFn () {
      var _this = this;
      var selectData = this.$refs.refTable.selections[0];
      // selectData.inputBrId = _this.currentOrgId;
      // selectData.updBrId = _this.currentOrgId;
      // selectData.inputId = _this.currentUserId;
      // selectData.updId = _this.currentUserId;
      // selectData.inputIdName = _this.currentUserIdName;
      // selectData.inputData = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // selectData.updDate = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
    },

    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        var values = data.map(function (item) { return Number(item[column.property]) });
        if (!values.every(function (value) { return isNaN(value) })) {
          if (index === 3) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] ;
          }
        }
      });

      return sums;
    }
  }
};
</script>