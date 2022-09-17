
<template>

  <div>
    <yu-panel title="详细信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" v-model="baseFormdata" label-width="120px" :rules="formRules">
          <yu-xform-group :column="2">
            <yu-xform-item label="律师编号" rules="required" name="lawyerNo" disabled></yu-xform-item>
            <yu-xform-item label="律师姓名" rules="required"  name="lawyerName" ></yu-xform-item>
            <yu-xform-item label="联系电话" name="lawyerTelNo" rules="required"></yu-xform-item>
            <yu-xform-item label="律所名称" :disabled="viewType == 'DETAIL'" ctype="input" placeholder="律所名称" name="lawOfficeName" rules="required" icon="search"  @click.native="openDialog" ></yu-xform-item>
            <yu-xform-item label="律师状态" rules="required"  name="lawyerStatus" data-code="STD_LAWYER_STATUS" ctype="select"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
      <div style="text-align:center">
        <yu-button type="primary" @click="doSave">保存</yu-button>
        <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
    <yu-dialog title="律所信息" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="2">
              <yu-xform-item placeholder="律所名称" label="律所名称" ctype="input" name="partnerName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" request-type="POST" :base-params="baseParams" style="width: 100%" condition-key="condition">
              <yu-xtable-column prop="partnerName" label="律所名称"></yu-xtable-column>
              <yu-xtable-column prop="certType" label="证件类型" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
              <yu-xtable-column prop="certCode" label="证件号码" ></yu-xtable-column>
              <yu-xtable-column prop="partnerStatus" label="律所状态" data-code="STD_PARTNER_STATUS"></yu-xtable-column>
            </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn" > 选取</yu-button>
       </div>
    </yu-dialog>
  </div>
</template>
<script>
// 引入律所pop框组件
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
// 注册字典项
yufp.lookup.reg('STD_LAWYER_STATUS,STD_PARTNER_STATUS,STD_ZB_CERT_TYP');
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      dialogformdata: [],
      dialogTableVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
      baseFormdata: {},
      formRules: { lawyerTelNo: [{ validator: validator.mobile, message: '不是正确的手机号'}]},
      viewType: 'DETAIL'
      // baseParams:{condition:{}}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 弹出框显示： */
    openDialog () {
      this.dialogTableVisible = true;
    },
    /*  选取处理： */
    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.baseFormdata.lawOfficeName = this.$refs.dialogtable.selections[0].partnerName;
      this.dialogTableVisible = false;
    },

    /*
    页面初始化
    */
    afterInit () {
      var _this = this;
      var lawyerNo = _this.$route.meta.params.lawyerNo;
      _this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType !== 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawyerinfo/showByLawyerNo',
          data: lawyerNo,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.baseFormdata);
          }
        });
      } else {
        _this.baseFormdata['lawyerNo'] = lawyerNo;
      }
    },

    /**
     * 保存
     */
    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      if (_this.viewType === 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawyerinfo/insert',
          data: this.baseFormdata,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
              });
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawyerinfo/updateByLawyerNo',
          data: this.baseFormdata,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
                yufp.router.removeTab(_this.$route.path);
              });
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      }
    },
    /**
     * 返回
     */
    doBack: function () {
      yufp.router.removeTab(this.$route.path);
    }
    /*
     将表格的数据，赋值给表单字段
    */
    // commonSelectFn: function (row, mapping) {
    //   for (let item in mapping) {
    //     this.baseFormdata[mapping[item]] = row[item];
    //   }
    // },
  }
};
</script>
