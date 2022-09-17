<template>
  <div>
    <yu-panel title="影像补扫新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="240px" v-model="formdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="影像补扫类型" name="spplType" ctype="select" rules="required"   :options="dicOptions.docTypeOptions" @change="changeFn"></yu-xform-item>
          <yu-xform-item label="补扫业务品种" :hidden="!show" name="spplBizType" ctype="select" rules="required"   :options="dicOptions.docType" @change="changeFn1"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="YufpZrcSelector" :params="cusParms2" @select-fn="selectCus2" rules="required" ></yu-xform-item>
          <yu-xform-item label="原业务流水号" name="iqpSerno" ctype="YufpZrcSelector" :params="cusParms" @select-fn="selectCus" :disabled="iqpFlag" rules="required"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      formdata: {},
      flag1: false,
      flag: true,
      show: false,
      iqpFlag: true,
      dicOptions: {docTypeOptions: [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '06', value: '征信影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}],
        docType: [{key: '01', value: '一般贷款出账'}, {key: '02', value: '银承出账'}, {key: '03', value: '零售放款'}, {key: '04', value: '小微放款'}, {key: '05', value: '单户授信'}, {key: '06', value: '集团授信'}, {key: '07', value: '零售业务授信'}]},
      cusParms: {
        title: '原业务流水号',
        queryFields: [
          { placeholder: '原业务流水号', field: 'iqpSerno', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '客户号', field: 'searchCusId', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '借据编号', field: 'billNo', type: 'input', fuzzyQuery: 'both' }
        ],
        baseParams: {condition: JSON.stringify({ spplType: null, spplBizType: null })},
        dataUrl: backend.cmisBiz + '/api/docimagespplinfo/selectSernoByCusId',
        tableColumns: [{ label: '原业务流水号', prop: 'iqpSerno' }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '合同编号', prop: 'contNo' }, { label: '借据编号', prop: 'billNo' }, { label: '产品名称', prop: 'prdName' }]
      },
      cusParms2: {
        title: '客户编号',
        queryFields: [{ placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusByLogin',
        tableColumns: [{ label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }]
      }
    };
  },
  created () {
    const loginUser = this.$xutils.getLoginUserInfo();
    const dutysList = loginUser.dutys;
    if (dutysList != undefined && dutysList.length > 0) {
      for (let i = 0; i < dutysList.length; i++) {
        let item = dutysList[i];
        if (item.code === 'FZH01' || item.code === 'FZH02' || item.code === 'XWB01') { // 客户经理岗
          this.dicOptions.docTypeOptions = [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}];
        } else {
          this.dicOptions.docTypeOptions = [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '06', value: '征信影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}];
        }
      }
    };
  },
  watch: {
    'formdata.spplType': function () {
      if (this.formdata.spplBizType) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      if (this.formdata.spplType == '01') {
        this.show = true;
        this.flag = false;
        this.dicOptions.docType = [{key: '01', value: '一般贷款出账'}, {key: '02', value: '银承出账'}, {key: '03', value: '零售放款'}, {key: '04', value: '小微放款'}];
      } else if (this.formdata.spplType == '03') {
        this.show = true;
        this.flag = false;
        this.dicOptions.docType = [{key: '05', value: '单户授信'}, {key: '06', value: '集团授信'}, {key: '07', value: '零售业务授信'}];
      } else if (this.formdata.spplType == '02' || this.formdata.spplType == '04' || this.formdata.spplType == '05' || this.formdata.spplType == '06' || this.formdata.spplType == '07' || this.formdata.spplType == '08') {
        this.show = false;
        this.flag = false;
      } else {
        this.show = false;
        this.flag = true;
      }
    },
    'show': function () {
      if (!this.show) {
        this.flag1 = false;
      } else {
        this.flag1 = true;
      }
    }

  },
  methods: {
    /**
     * 原业务流水号方法
     */
    selectCus: function (arr) {
      // this.formdata.spplType = arr[0].spplType;
      if (arr.length > 0) {
        this.formdata.iqpSerno = arr[0].iqpSerno;
        this.formdata.cusId = arr[0].cusId;
        this.formdata.cusName = arr[0].cusName;
        this.formdata.contNo = arr[0].contNo;
        this.formdata.billNo = arr[0].billNo;
      }
    },
    /**
     * 客户编号方法
     */
    selectCus2: function (arr) {
      if (arr.length > 0) {
        this.formdata.cusId = arr[0].cusId;
        this.formdata.cusName = arr[0].cusName;
        this.formdata.iqpSerno = '';
        this.formdata.contNo = '';
        this.formdata.billNo = '';
        this.cusParms.baseParams = {condition: JSON.stringify({ spplType: this.formdata.spplType, spplBizType: this.formdata.spplBizType, cusId: this.formdata.cusId })};
      }
    },
    /** 选择【影像补扫类型】后续方法 */
    changeFn (value) {
      // 控制后一项表单的状态
      this.flag = !value;
      this.formdata.iqpSerno = '';
      this.formdata.cusId = '';
      this.formdata.cusName = '';
      this.formdata.spplBizType = '';
      if (value == '02') {
        this.formdata.spplBizType = '09';
      }
      if (value != '01' && value != '03') {
        this.cusParms.baseParams = {condition: JSON.stringify({ spplType: value, spplBizType: this.formdata.spplBizType, cusId: this.formdata.cusId })};
      }
      this.iqpFlag = this.flag || this.flag1;
    },
    changeFn1 (value) {
      // 控制后一项表单的状态
      this.flag1 = !value;
      this.formdata.iqpSerno = '';
      this.formdata.cusId = '';
      this.formdata.cusName = '';
      this.cusParms.baseParams = {condition: JSON.stringify({ spplType: this.formdata.spplType, spplBizType: value, cusId: this.formdata.cusId })};
      if (this.show) {
        this.iqpFlag = this.flag || this.flag1;
      } else {
        this.flag1 = false;
        this.iqpFlag = this.flag || this.flag1;
      }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },

    /** 下一步*/
    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      var model = {};
      // var bizSerno = '';
      let bizSerno = _this.formdata.iqpSerno;
      _this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      yufp.clone(_this.formdata, model);
      // console.log(model)
      model.bizSerno = bizSerno;
      model.taskFlag = '02';// 人工发起
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/saveDoImageSpplInfo',
        // data:JSON.stringify(model),
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.router.removeTab(_this.$route.path);
            model.disiSerno = response.data;
            var serno = model.bizSerno;
            _this.$router.addTab({
              name: 'zrcbank/biz/fileManage/imageSppl/imageSpplAdd',
              key: 'imageSpplAddGudie' + response.data, // 必传
              title: '影像补扫详情',
              data: {
                back: _this.doBack,
                viewType: 'ADD',
                test: true,
                jsonData: model,
                serno: serno
              }
            });
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        }
      });
    }
  }
};
</script>
