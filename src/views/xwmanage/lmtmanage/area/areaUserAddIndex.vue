<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo"></yu-xform-item>
          <yu-xform-item label="区域名称" ctype="input" placeholder="区域名称" name="areaName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" condition-key="condition" :base-params="baseParams" selection-type="radio" :pageable="true" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="区域编号" prop="areaNo"></yu-xtable-column>
        <yu-xtable-column label="区域名称" prop="areaName"></yu-xtable-column>
      </yu-xtable>
      <div class="button-group" style="text-align:center">
        <yu-button type="primary" @click="doInsert"> 选取返回</yu-button>
        <yu-button type="primary" @click="cancel"> 取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
let condition = '';

let jsoPar = {};
let parm = '';
var userNo = '';

export default {
  props: {
    pageParams: Object,
    dialogId: String,
    userNo: Object.userNo
  },
  data () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/areamanager/selectexceptother',
      baseParams: {}
    };
  },
  created: function () {
    this.baseParams.condition = {'userNo': this.pageParams.loginCode};
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      parm = this.pageParams;
    },


    /* 选取返回按钮  */
    doInsert () {
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 插入数据
      // 客户号
      jsoPar['userNo'] = parm.loginCode;
      this.$request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/areauser/insert',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          this.$dialog.close(this.dialogId);
          this.$xutils.showMsgBox('提示', '操作成功');
        } else {
          this.$xutils.showMsgBox('提示', '操作失败');
        }
      });
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
