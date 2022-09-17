<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" >
        <yu-xform-group :column="1">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="radio" name="coopAgrOprType" data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型" @change="onChangeFn" ></yu-xform-item>
          <yu-xform-item label="合作协议编号" ctype="yu-xcoop-partner-agr" name="coopAgrNo" placeholder="合作协议编号" :hidden="coopAgrOprTypeAdd" rules="required"
            @select-fn="commonSelectFn" :mapping="{'coopAgrNo':'coopAgrNo','coopPlanNo':'coopPlanNo','partnerType':'partnerType', 'partnerName':'partnerName','coopType':'coopType','partnerNo':'partnerNo','coopPlanSerno':'coopPlanSerno'}" width="1424" height="600" ></yu-xform-item>
          <!-- 'serno':'coopPlanSerno', -->
          <yu-xform-item label="合作方案编号" ctype="yu-xcoop-plan-acc"  name="coopPlanNo" placeholder="合作方案编号" :disabled="!coopAgrOprTypeAdd" rules="required"
            @select-fn="commonSelectFn" :mapping="{'coopPlanNo':'coopPlanNo','coopType':'coopType','partnerType':'partnerType', 'partnerName':'partnerName','partnerNo':'partnerNo',
            'totlCoopLmtAmt':'coopAgrAmt','coopStartDate':'coopAgrStartDate','coopEndDate':'coopAgrEndDate'}" width="1424" height="600" ></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" name="partnerType" disabled rules="required" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" ></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled hidden></yu-xform-item>
          <yu-xform-item label="合作类型" ctype="select" name="coopType" data-code="STD_COOP_TYPE" placeholder="合作类型" disabled rules="required"></yu-xform-item>

          <!--隐藏域 -->
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" required hidden ></yu-xform-item>
          <!-- <yu-xform-item label="合作方案申请流水号" ctype="input" placeholder="合作方案申请流水号" name="coopPlanSerno" required hidden ></yu-xform-item>-->
          <yu-xform-item label="协议金额" ctype="input" placeholder="协议金额" name="coopAgrAmt" required hidden></yu-xform-item>
          <yu-xform-item label="协议起始日" ctype="datepicker" name="coopAgrStartDate" value-format="yyyy-MM-dd" placeholder="合作协议起始日" required hidden></yu-xform-item>
          <yu-xform-item label="协议到期日" ctype="datepicker" name="coopAgrEndDate" value-format="yyyy-MM-dd" placeholder="合作协议到期日" required hidden></yu-xform-item>

        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons style="text-align:center;">
      <yu-button type="primary" @click="next">下一步</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formdata: {},
      formType: 'edit',
      coopAgrOprTypeAdd: true,
      tempSaveUrl: this.$backend.cmisBiz + '/api/cooppartneragrapp/tempsave'
    };
  },
  mounted () {
    this.formdata.coopAgrOprType = '1';
  },
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    onChangeFn (newValue) {
      if (newValue == '1') { // 新增
        this.coopAgrOprTypeAdd = true;
      } else if (newValue == '2') { // 变更
        this.coopAgrOprTypeAdd = false;
      } if (newValue == '3') { //
        // 续期
        this.coopAgrOprTypeAdd = true;
      }
      for (let i in this.formdata) {
        if (i != 'coopAgrOprType') {
          this.formdata[i] = '';
        }
      }
    },
    next () {
      // 校验必输
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let openPar = {};
      yufp.clone(this.formdata, openPar);
      // 保存数据--新增申请记录
      let _this = this;
      this.$request({
        url: this.tempSaveUrl,
        method: 'post', // 默认get请求
        data: openPar
      }).then((response) => {
        if (response.code == '0' && response.data) {
          // 跳转修改页面
          _this.jumpToDetailPage(response.data);
        } else {
          _this.$message({ message: '暂存合作方协议申请基本信息失败', type: 'error' });
        }
      }).catch((res) => {
        // this.$message({ message: res.message, type: 'warning' });
      });
    },
    jumpToDetailPage (openPar) {
      const coopAgrOprType = openPar.coopAgrOprType;
      let title = '';
      if (coopAgrOprType == '1') {
        title = '合作方协议新增';
      } else if (coopAgrOprType == '2') {
        title = '合作方协议变更';
      } else if (coopAgrOprType == '3') {
        title = '合作方协议续签';
      }
      // openPar['model_group_no'] = 'CMG000419';
      let jsonParam = yufp.clone(openPar, {});
      jsonParam.op = 'ADD';
      jsonParam.isFromAgrMenu = true;
      this.$router.addTab({
        name: 'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        key: 'custom_add_' + jsonParam.serno,
        title: title,
        data: jsonParam
      });
      this.back();
    },
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
