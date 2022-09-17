<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="机构查询" >
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="放款机构号" ctype="input" placeholder="放款机构号" name="loanBrNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="放款机构名称" ctype="input" placeholder="放款机构号" name="loanBrNoName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="账务机构号" ctype="input" placeholder="账务机构号" name="finaBrNo" fuzzy-query="both"></yu-xform-item>

          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" condition-key="condition" selection-type="radio" :pageable="true"  :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="放款机构号" prop="loanBrNo"></yu-xtable-column>
        <yu-xtable-column label="放款机构名称" prop="loanBrNoName"></yu-xtable-column>
        <yu-xtable-column label="管理机构号" prop="managerBrNo"></yu-xtable-column>
           <yu-xtable-column label="账务机构号" prop="finaBrNo"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="orgSts" data-code="DATA_STS" v-if="show"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly"  :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXwPvpOrgFk',
  componentName: 'YuXwPvpOrgFk',
  mixins: [popList],
  data: function () {
    return {
      // 原来的
      // dataUrl: backend.appOcaService + '/api/adminsmorg/querypage',
      // 小宙的
      // dataUrl: backend.cmisBiz + '/api/iqpentrustloanapp/selectsorgfina',
      // 自己的
      dataUrl: backend.cmisCfg + '/api/cfgsorgloanmany/selectForXw',
      baseParams: {},
      // 表格中传出id数据的key
      queryCode: 'loanBrNo',
      // 表格中显示到input框中的字段key
      textCode: 'loanBrNo',
      // requestType: 'get',
      // requestType: 'post',
      // responseType: 'array'
      codeToText: false
    };
  },
  created () {
    let userInfo = this.$xutils.getLoginUserInfo();
    this.baseParams = {
      condition: {
        managerBrNo: userInfo.orgCode
      }
    };
  }
};
</script>
