<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="行名行号对照表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"></yu-xform-item>
            <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="行号" prop="bankNo"></yu-xtable-column>
          <yu-xtable-column label="行名" prop="bankName"></yu-xtable-column>
          <yu-xtable-column label="行政地区" prop="areaName" width="100"></yu-xtable-column>
          <yu-xtable-column label="地区代码" prop="areaCode"></yu-xtable-column>
          <yu-xtable-column label="联系电话" prop="phone"></yu-xtable-column>
          <yu-xtable-column label="邮政编码" prop="postcode"></yu-xtable-column>
          <yu-xtable-column label="地址" prop="addr"></yu-xtable-column>
          <yu-xtable-column label="上级行" prop="superBankName" width="100"></yu-xtable-column>
          <yu-xtable-column label="生效日期" prop="inureDate"></yu-xtable-column>
          <yu-xtable-column label="注销日期" prop="logoutDate"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="bankStatus" data-code="STD_ZB_PRD_ST"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="最后修改人" prop="updName" width="100"></yu-xtable-column>
          <yu-xtable-column label="最后修改机构" prop="updBrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
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
  name: 'YuXbank',
  componentName: 'YuXbank',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmiscfg + '/api/cfgbankinfo/',
      // 表格中传出id数据的key
      queryCode: 'bankNo',
      // 表格中显示到input框中的字段key
      textCode: 'bankName'
    };
  }
};
</script>
