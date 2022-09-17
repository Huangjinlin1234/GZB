<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" @select-fn="commonSelectFn" :selectionType="radio" icon="search" @click="goCustomer" disabled :rules="rules[0]"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" disabled></yu-xform-item>
          <!-- <yu-xform-item label="业务类型" ctype="select" placeholder="业务类型" name="appType" data-code="STD_ZB_ORG_ADMIT_TYPE" disabled></yu-xform-item> -->
          <yu-xform-item label="机构类型" ctype="yu-xdic-tree" placeholder="机构类型" name="intbankOrgType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" disabled></yu-xform-item>
          <!-- <yu-xform-item label="成立日期" ctype="datepicker" name="buildDate" value-format="yyyy-MM-dd" placeholder="成立日期" disabled></yu-xform-item>
          <yu-xform-item label="实际控制人" ctype="input" placeholder="实际控制人" name="realOperCusName" disabled></yu-xform-item>
          <yu-xform-item label="金融业务许可证" ctype="input" placeholder="金融业务许可证" name="busiLic" disabled></yu-xform-item>
          <yu-xform-item label="是否上市" ctype="select" name="isStock" disabled data-code="STD_ZB_YES_NO" placeholder="是否上市"></yu-xform-item>
          <yu-xform-item label="投资经理" ctype="input" name="inputIdName" disabled placeholder="投资经理"></yu-xform-item>
          <yu-xform-item label="申请时间" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="申请时间"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" name="inputBrIdName" disabled placeholder="经办机构"></yu-xform-item> -->
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button v-norepeat.loading type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
    </yu-form-buttons>

    <!-- <yuxintbank v-if="cus_dialog"></yuxintbank> -->
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_ORG_ADMIT_TYPE,STD_ZB_INTB_TYPE,INTBANK_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
// import yuxintbank from "src/components/widgets/xwidgets/YuXintbank/index";
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  // components:{
  //   yuxintbank
  // },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {
        appType: '01'
      },
      formType: 'edit',
      formRules: {
        buildDate: [
          {
            validator: validator.isDate,
            message: '不是正确的日期',
            trigger: 'blur'
          }
        ]
      },
      imageUrls: {},
      File: {},
      cus_dialog: false,
      rules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      newSerno: '',
      newPkId: ''
    };
  },
  created () {
    this.newPkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
    this.newSerno = this.$xutils.getSEQWithParamFromServer('BIZ_SERNO');
  },
  mounted () {
    // 新增清空数据
    this.$nextTick(() => {
      this.$refs.refForm.resetFields();
    });

    this.sessionData = {};
    this.sessionData.inputIdName = this.$xutils.getDefaultformulaData(
      '$LoginUserName'
    );
    this.sessionData.inputDate = this.$xutils.getDefaultformulaData(
      '$CURRDATE'
    );
    this.sessionData.inputBrIdName = this.$xutils.getDefaultformulaData(
      '$LoginOrgName'
    );
  },
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
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
    goCustomer () {
      var _this = this;
      if (_this.viewType == 'DETAIL') {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery',
        -1,
        -1,
        dialogData,
        (params) => {
          if (params.cusId == undefined) {
            return;
          }
          if (params.cusState == '1') {
            _this.$message({
              duration: 4000,
              message: '【暂存】状态客户，无法新增！',
              type: 'warning'
            });
            return;
          }
          yufp.service.request({
            method: 'POST',
            url:
              backend.cmisBiz +
              '/api/intbankorgadmitapp/checkSameOrgCusIdIsExist',
            data: { condition: JSON.stringify({ cusId: params.cusId }) },
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data == 0) {
                  yufp.clone(params, _this.formdata);

                  customer(); // 信息补充的
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '客户已存在，不允许新增！',
                    type: 'warning'
                  });
                }
                yufp.clone(_this.sessionData, _this.formdata);
              }
            }
          });
          // 信息补充的
          function customer () {
            _this
              .$request({
                method: 'POST',
                url: backend.cmisBiz + '/api/lmtapprelcusinfo/selectCusInfo',
                data: {
                  cusCatalog: '3',
                  cusId: params.cusId
                }
              })
              .then((data) => {
                if (data.code == '0') {
                  yufp.clone(data.data, _this.formdata);
                } else {
                  _this.$message({ message: '请求失败', type: 'error' });
                }
              });
          }
        }
      );
    },
    customClick (type) {
      // 下一步
      if (type === 'doNext') {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        let postData = {};
        yufp.clone(this.formdata, postData);
        postData.appType = '01';
        postData.approveStatus = '000';
        postData.oprType = '01';
        postData.newPkId = this.newPkId;
        postData.newSerno = this.newSerno;
        postData.serno = this.newSerno;

        if (_this.formdata.cusId != '') {
          // 下一步的时候先判断是否有无在途任务
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + _this.formdata.cusId,
            callback: function (code, message, response) {
              if (response.code == '0') {
                if (response.data.length == 0) {
                  _this.$request({
                    method: 'POST',
                    url: _this.$backend.cmisBiz + '/api/intbankorgadmitapp/',
                    data: postData
                  })
                    .then((data) => {
                      if (data.code == '0') {
                        _this.$dialog.close(_this.dialogId);
                        _this.$message({ message: '创建成功' });
                        let model = {};
                        var routeKey = 'templetfactory' + _this.formdata.cusId + 'EDIT';
                        model = data.data;
                        model.routeKey = routeKey;
                        model.op = 'update';
                        _this.$router.addTab({
                          name:
                                'bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/admitDetails',
                          key: routeKey,
                          title: '修改准入申报详情',
                          data: model
                        });
                      }
                    })
                    .catch(() => {
                      _this.$message({ message: '创建失败', type: 'error' });
                    });
                } else {
                  _this.$message({ message: '有在途任务，不可修改', type: 'error' });
                }
              } else {
                _this.$message({ message: response.message, type: 'error' });
                return;
              }
            }
          });
        } else {
          this.$message({ message: '请先选择客户名称', type: 'error' });
        }
        // 返回
      } else if (type === 'doCancel') {
        this.$dialog.close(this.dialogId);
      }
    }
  }
};
</script>
