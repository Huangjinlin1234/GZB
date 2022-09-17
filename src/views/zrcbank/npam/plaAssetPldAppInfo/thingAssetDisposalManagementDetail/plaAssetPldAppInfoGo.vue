<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div>
    <yu-panel title="抵债资产处置向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="抵债资产编号" placeholder="抵债资产编号" name="pldimnNo" rules="required" ctype="YufpZrcSelector" :params="noParms" @select-fn="selectNo" ></yu-xform-item>
          <yu-xform-item label="抵债资产名称" placeholder="抵债资产名称" name="pldimnMemo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="抵债资产名称" placeholder="抵债资产名称" name="cusId" ctype="input"  hidden></yu-xform-item>
          <yu-xform-item label="抵债资产名称" placeholder="抵债资产名称" name="cusName" ctype="input"  hidden></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doGo">下一步</yu-button>
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
      noParms: {
        title: '选择抵债资产',
        queryFields: [{ placeholder: '抵债资产编号', field: 'pldimnNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '抵债资产名称', field: 'pldimnMemo', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: backend.cmisNpam + '/api/plabartplddebtappinfo/getbartplddebtacclist',
        baseParams: {condition: {recordStatus: '03'}},
        tableColumns: [{ label: '抵债资产编号', prop: 'pldimnNo' }, { label: '抵债资产名称', prop: 'pldimnMemo' }, { label: '客户编号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '接收价值', prop: 'rcvValue' }]
      }
    };
  },
  methods: {
    /**
     * 选择客户方法
     */
    selectNo: function (arr) {
      this.formdata.pldimnNo = arr[0].pldimnNo;
      this.formdata.pldimnMemo = arr[0].pldimnMemo;
      this.formdata.cusId = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
      this.formdata.pldimnAmt = arr[0].rcvValue;
    },
    /* 返回 */
    doBack () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // 下一步
    doGo () {
      var _this = this;
      var model = {};
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return _this.$xutils.showMsgBox('提示', '校验未通过，请填写必填项');
      };
      _this.formdata.pldimnName = _this.formdata.pldimnMemo;
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldappinfo/save',
        data: model,
        callback: function (code, message, response) {
          let papaiSerno = response.data;
          if (papaiSerno !== '') {
            _this.doBack();
            _this.$router.addTab({
              name: 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail',
              key: 'plaAssetPldAppInfo' + papaiSerno, // 必传
              title: '抵债资产处置新增',
              data: {
                modal: model,
                papaiSerno: papaiSerno,
                viewType: 'ADD'
              }
            });
          } else {
            _this.$message({ message: '系统异常', type: 'error' });
          }
        }
      });
    }
  }
};

</script>
