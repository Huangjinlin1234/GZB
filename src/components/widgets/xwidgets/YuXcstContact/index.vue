<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width"  title="客户联系信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="身份证地址" ctype="input" placeholder="身份证地址" name="certAddr"></yu-xform-item>
            <yu-xform-item label="身份证地址街道" ctype="input" placeholder="身份证地址街道" name="certStreet"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="身份证地址" prop="certAddr"></yu-xtable-column>
          <yu-xtable-column label="身份证地址街道" prop="certStreet"></yu-xtable-column>
          <yu-xtable-column label="居住地地址" prop="indivRsdAddr"></yu-xtable-column>
          <yu-xtable-column label="居住地址街道" prop="streetRsd"></yu-xtable-column>
          <yu-xtable-column label="居住地邮政编码" prop="indivZipCode"></yu-xtable-column>
          <yu-xtable-column label="居住状况 std_zb_rsd_" prop="indivRsdSt"></yu-xtable-column>
          <yu-xtable-column label="住宅电话" prop="mobile"></yu-xtable-column>
          <yu-xtable-column label="居住区域编号" prop="regionalism"></yu-xtable-column>
          <yu-xtable-column label="居住区域名称" prop="regionName"></yu-xtable-column>
          <yu-xtable-column label="手机号码1" prop="mobileA"></yu-xtable-column>
          <yu-xtable-column label="号码是否验证1 std_zb_y" prop="isCheckA"></yu-xtable-column>
          <yu-xtable-column label="号码是否本人1 std_zb_y" prop="isOneselfA"></yu-xtable-column>
          <yu-xtable-column label="手机号码2" prop="mobileB"></yu-xtable-column>
          <yu-xtable-column label="号码是否验证2 std_zb_y" prop="isCheckB"></yu-xtable-column>
          <yu-xtable-column label="号码是否本人2 std_zb_y" prop="isOneselfB"></yu-xtable-column>
          <yu-xtable-column label="传真" prop="faxCode"></yu-xtable-column>
          <yu-xtable-column label="email地址" prop="email"></yu-xtable-column>
          <yu-xtable-column label="手机号码1来源" prop="mobile1Sour"></yu-xtable-column>
          <yu-xtable-column label="手机号码2来源" prop="mobile2Sour"></yu-xtable-column>
          <yu-xtable-column label="微信号" prop="wechatNo"></yu-xtable-column>
          <yu-xtable-column label="手机号码" prop="mobileNo"></yu-xtable-column>
          <yu-xtable-column label="操作类型  std_zb_opr" prop="oprType"></yu-xtable-column>
          <yu-xtable-column label="qq号" prop="qq"></yu-xtable-column>
          <yu-xtable-column label="户籍地址" prop="regionAddr"></yu-xtable-column>
          <yu-xtable-column label="户籍地址街道" prop="regionStreet"></yu-xtable-column>
          <yu-xtable-column label="送达地址" prop="sendAddr"></yu-xtable-column>
          <yu-xtable-column label="送达地址街道" prop="deliveryStreet"></yu-xtable-column>
          <yu-xtable-column label="邮政编码" prop="postcode"></yu-xtable-column>
          <yu-xtable-column label="是否农户" prop="isAgri"></yu-xtable-column>
          <yu-xtable-column label="居住时间-年" prop="resiTime"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="更新人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="更新机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="更新日期" prop="updDate"></yu-xtable-column>
          <yu-xtable-column label="创建日期" prop="createTime"></yu-xtable-column>
          <yu-xtable-column label="更新日期" prop="updateTime"></yu-xtable-column>
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
  name: 'YuXcstContact',
  componentName: 'YuXcstContact',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
