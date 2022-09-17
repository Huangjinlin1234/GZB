<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="承兑机构查询" >
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refTable" >
          <yu-xform-group :column="3">
            <yu-xform-item label="承兑机构" ctype="input" placeholder="承兑机构号" name="payBrNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="承兑机构名称" ctype="input" placeholder="承兑机构名称" name="payBrName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" condition-key="condition" :pageable="true"  :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="承兑机构号" prop="payBrNo"></yu-xtable-column>
          <yu-xtable-column label="承兑机构名称" prop="payBrName"></yu-xtable-column>
          <yu-xtable-column label="管理机构号" prop="managerBrNo"></yu-xtable-column>
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
  name: 'YuXwPvpOrgCd',
  componentName: 'YuXwPvpOrgCd',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgaccporgrel/selectbymodel',
      baseParams: {condition: {}},
      codeToText: false,
      // 表格中传出id数据的key
      queryCode: 'payBrNo',
      // 表格中显示到input框中的字段key
      textCode: 'payBrNo'
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
