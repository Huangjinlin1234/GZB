<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="抵押物云评估信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="楼盘名称" ctype="input" placeholder="楼盘名称" name="buildingName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="楼栋" ctype="input" placeholder="楼栋" name="building"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="POST">
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="楼盘名称" prop="buildingName"></yu-xtable-column>
          <yu-xtable-column label="楼栋" prop="building"></yu-xtable-column>
          <yu-xtable-column label="楼层" prop="floor"></yu-xtable-column>
          <yu-xtable-column label="房间号" prop="roomNo"></yu-xtable-column>
          <yu-xtable-column label="估价" prop="assEvaAmt"></yu-xtable-column>
          <yu-xtable-column label="总价" prop="totalAmt"></yu-xtable-column>
          <yu-xtable-column label="面积" prop="squ"></yu-xtable-column>
          <yu-xtable-column label="地址" prop="address"></yu-xtable-column>
          <yu-xtable-column label="查询人员" prop="qryUser"></yu-xtable-column>
          <yu-xtable-column label="查询日期" prop="qryDate"></yu-xtable-column>
          <yu-xtable-column label="查询人员工号" prop="qryId"></yu-xtable-column>
          <yu-xtable-column label="电话" prop="phone"></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
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
  name: 'YuXguareClost',
  componentName: 'YuXguareClost',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/lmtguarecloestinfo/selectbymodel',
      // 表格中传出id数据的key
      queryCode: 'pkId',
      // 表格中显示到input框中的字段key
      textCode: 'buildingName',
      codeToText: false
    };
  }
};
</script>
