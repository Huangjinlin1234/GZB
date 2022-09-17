/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="" panel-type="simple">
      <yu-xform :rules="rules" ref="pspCheckInfoForm" v-model="infoData" label-width="120px">
      <yu-panel title="检查信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="支付方式" :disabled="viewFlag||approveFlag||assistFlag" ctype="select" v-if="info || whtie || old" data-code="STD_RAY_MODE" name="defrayMode" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="受托对象" :disabled="viewFlag||approveFlag||assistFlag" ctype="input" v-if="info || whtie || old" name="entrustedCusName"></yu-xform-item>
          <yu-xform-item label="工作单位是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || whtie" name="isChangeUnit" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="现工作单位" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || whtie" name="nowUnit"></yu-xform-item>
          <yu-xform-item label="家庭住址是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || old" name="isChangeAddr" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="现家庭住址" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || old" name="nowAddr"></yu-xform-item>
          <yu-xform-item label="婚姻状况是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || old" name="isChangeMar" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || old" name="marRemark"></yu-xform-item>
          <yu-xform-item label="联系方式是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || old" name="isChangePhone" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="现联系方式" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || old" name="nowRemark"></yu-xform-item>
          <yu-xform-item label="收入及负债是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || whtie || old" name="isChangeEarning" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="现收入负债情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || whtie || old" name="earningRemark"></yu-xform-item>
          <yu-xform-item label="担保情况是否变化" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" v-if="info || old" name="isChangeGuar" data-code="STD_ZB_YES_NO" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="现担保情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || old" name="guarRemark"></yu-xform-item>
          <yu-xform-item label="贷款半年逾期次数" :disabled="viewFlag||approveFlag||assistFlag" ctype="input" v-if="info || whtie || old" name="overdueTimes" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="逾期原因" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || whtie || old" name="overdueResn"></yu-xform-item>
          <yu-xform-item label="贷后方式" :disabled="viewFlag||approveFlag||assistFlag" ctype="select" v-if="info || whtie || old" name="checkMode" data-code="STD_PSP_CHECK_MODE"  rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" v-if="info || whtie || old" name="checkModeRemark"></yu-xform-item>
          <yu-xform-item label="超期未办理抵押原因" :disabled="viewFlag||approveFlag||assistFlag" label-width="180px" v-if="info || house" name="overdueReason" ctype="select" data-code="STD_PSP_PLDIMN_OVERDUE" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="其他原因" :disabled="viewFlag||approveFlag||assistFlag"  name="otherOverdueReason" v-if="info || house" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="拟采取措施" :disabled="viewFlag||approveFlag||assistFlag" name="checkMeasure"  ctype="select" data-code="STD_PSP_INDIV_OVERDUE_MEASURE" rules="required" @change="validateFn"></yu-xform-item>
          <yu-xform-item label="其他措施" :disabled="viewFlag||approveFlag||assistFlag" name="checkMeasureRemark"  ctype="textarea"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_PSP_INDIV_OVERDUE_MEASURE,STD_PSP_CHECK_MODE,STD_ZB_YES_NO,STD_RAY_MODE');
export default {
  name: 'D1BillList',
  components: {yufpNwfInit},
  mixins: [mixinList],
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      infoData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      flagData: [],
      flag: [],
      info: false,
      house: false,
      whtie: false,
      old: false,
      dicOptions: {docTypeOptions: [{key: '01', value: '积极还款，不采取措施'}, {key: '02', value: '视还款情况，持续追踪关注'}, {key: '03', value: '抵质押物价值不足或保证人能力不足，补充担保'}, {key: '04', value: '还款存在阶段性困难，主观配合'}, {key: '05', value: '存在长期还款困难，拟启动诉讼流程'}, {key: '06', value: '其他措施'},
        {key: '07', value: '跟踪楼盘交房情况，督促客户办理权证完成抵押'}, {key: '08', value: '持续跟进权益纠纷进展'}],
      TypeOption: [{key: '01', value: '电话'}, {key: '02', value: '现场'}, {key: '03', value: '其他'}]},
      rules: {
        entrustedCusName: { required: false, message: '字段不能为空', trigger: 'blur' },
        nowUnit: { required: false, message: '字段不能为空', trigger: 'blur' },
        nowAddr: { required: false, message: '字段不能为空', trigger: 'blur' },
        marRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        nowRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        earningRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        guarRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        overdueResn: { required: false, message: '字段不能为空', trigger: 'blur' },
        checkModeRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        checkMeasureRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        otherOverdueReason: { required: false, message: '字段不能为空', trigger: 'blur' },
        otherMeasureRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  created () {
    const _this = this;
    _this.getData();
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  methods: {
    // 页面字段展示判断
    getData () {
      const _this = this;
      let data = _this.$route.params;
      const taskNo = data.pspTask == undefined ? data.taskNo : data.pspTask.taskNo;

      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisPsp + '/api/pspdebitinfo/queryList',
        data: JSON.stringify({taskNo: taskNo}),
        callback: function (code, message, response) {
          if (response.code == '0') {
            // yufp.clone(response.data, _this.flagData);
            _this.flagData = response.data;
            // console.log('hehheh', response.data);
            if (_this.flagData) {
              _this.flagData.forEach((item, index) => {
                _this.flag.push(item.prdId);
              });
            }

            var arr1 = ['022001', '022002', '022020', '022021', '022031', '022024', '022040', '022051', '022052', '022053', '022054', '022055', '022056']; // 房屋按揭类逾期
            var arr2 = ['022095', '022028', '022005']; // 白领贷、综合消费贷款、阳光速贷等（中短期）贷后检查
            var arr3 = ['022023', '022038', '022035', '022006']; // 迁居贷、养老贷、光伏贷、装修贷款等（中长期
            // console.log('_this.flag', _this.flag);
            // if (_this.flag.length) {
            //   _this.info = true;
            //   // console.log('_this.info', _this.info);
            //   return;
            // }
            var base = false;
            _this.flag.forEach((item, index) => {
              if (item) {
                base = true;
              }
            });
            if (!base) {
              _this.info = true;
              return;
            }
            arr1.forEach((item, index) => {
              if (_this.flag.includes(item)) {
                _this.house = true;
                _this.old = true;
                // console.log('arr1', _this.house, _this.old);
              }
            });

            arr2.forEach((item, index) => {
              if (_this.flag.includes(item)) {
                _this.whtie = true;
                // console.log('arr2', _this.whtie);
              }
            });

            arr3.forEach((item, index) => {
              if (_this.flag.includes(item)) {
                _this.old = true;
                // console.log('arr3', _this.old);
              }
            });
          }
        }
      });
      // console.log('_this.flagData', _this.flagData);

      // console.log('res', _this.flag);
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      // if (_this.bizPageData) {
      //   _this.viewFlag = true;
      // } else {
      _this.viewFlag = data.opType === 'view';
      // }
      // 任务编号
      const taskNo = data.pspTask == undefined ? data.taskNo : data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户检查信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcheckinfo/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.infoData);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    validateFn: function () {
      let defrayMode = this.infoData.defrayMode;
      let isChangeUnit = this.infoData.isChangeUnit;
      let isChangeAddr = this.infoData.isChangeAddr;
      let isChangeMar = this.infoData.isChangeMar;
      let isChangePhone = this.infoData.isChangePhone;
      let isChangeEarning = this.infoData.isChangeEarning;
      let isChangeGuar = this.infoData.isChangeGuar;
      let overdueTimes = this.infoData.overdueTimes;
      let checkMode = this.infoData.checkMode;
      let checkMeasure = this.infoData.checkMeasure;
      let overdueReason = this.infoData.overdueReason;
      let overdueMeasure = this.infoData.overdueMeasure;
      if (defrayMode === '1') {
        this.rules.entrustedCusName.required = true;
      } else {
        this.rules.entrustedCusName.required = false;
      }
      if (isChangeUnit === '1') {
        this.rules.nowUnit.required = true;
      } else {
        this.rules.nowUnit.required = false;
      }
      if (isChangeAddr === '1') {
        this.rules.nowAddr.required = true;
      } else {
        this.rules.nowAddr.required = false;
      }
      if (isChangeMar === '1') {
        this.rules.marRemark.required = true;
      } else {
        this.rules.marRemark.required = false;
      }
      if (isChangePhone === '1') {
        this.rules.nowRemark.required = true;
      } else {
        this.rules.nowRemark.required = false;
      }
      if (isChangeEarning === '1') {
        this.rules.earningRemark.required = true;
      } else {
        this.rules.earningRemark.required = false;
      }
      if (isChangeGuar === '1') {
        this.rules.guarRemark.required = true;
      } else {
        this.rules.guarRemark.required = false;
      }
      if (overdueTimes > 0) {
        this.rules.overdueResn.required = true;
      } else {
        this.rules.overdueResn.required = false;
      }
      if (checkMode === '03') {
        this.rules.checkModeRemark.required = true;
      } else {
        this.rules.checkModeRemark.required = false;
      }
      if (checkMeasure === '6') {
        this.rules.checkMeasureRemark.required = true;
      } else {
        this.rules.checkMeasureRemark.required = false;
      }
      if (overdueReason === '5') {
        this.rules.otherOverdueReason.required = true;
      } else {
        this.rules.otherOverdueReason.required = false;
      }
      if (overdueMeasure === '06') {
        this.rules.otherMeasureRemark.required = true;
      } else {
        this.rules.otherMeasureRemark.required = false;
      }
    }
  }
};
</script>
