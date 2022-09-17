<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="零售优惠利率申请信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
              <yu-xform-item label="申请流水号" name="serno"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
            <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
            <yu-xtable-column label="优惠利率" prop="appRate"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuYhlv',
  componentName: 'YuYhlv',
  mixins: [popList],
  data: function () {
    return {
      props: {
        parms: Object
      },

      baseParams: {condition: {
        managerId: this.$xutils.getLoginUserInfo().loginCode,
        prdId: this.parms.prdId,
        cusId: this.parms.cusId,
        approveStatusS: '997'

      }
      },
      dataUrl: backend.cmisBiz + '/api/retailprimerateapp/selectbymodel',
      // 表格中传出id数据的key
      queryCode: 'serno',
      // 表格中显示到input框中的字段key
      textCode: 'serno',
      codeToText: false
    };
  }
};
</script>