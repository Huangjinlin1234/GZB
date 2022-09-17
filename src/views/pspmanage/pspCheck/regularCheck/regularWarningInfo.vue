/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="预警信号分析" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="searchData" :pageable="true" :data-url="dataUrl" :default-load="true" >
        <yu-xtable-column label="预警单编号" prop="altSinNo" width="180px" align="center"></yu-xtable-column>
        <yu-xtable-column label="预警日期" prop="altDate" width="100px"></yu-xtable-column>
        <yu-xtable-column label="信息来源" prop="infoSource" width="100px"></yu-xtable-column>
        <yu-xtable-column label="预警大类" prop="altTypeMax" width="100px"></yu-xtable-column>
        <yu-xtable-column label="预警种类" prop="altType" width="100px"></yu-xtable-column>
        <yu-xtable-column label="预警子项" prop="altSubType" width="100px"></yu-xtable-column>
        <yu-xtable-column label="预警输出描述" prop="altDesc" align="center"></yu-xtable-column>
        <yu-xtable-column label="指标等级" prop="altLvl" width="100px"></yu-xtable-column>
      </yu-xtable>
      <yu-panel title="" panel-type="simple">
      <yu-xform ref="pspWarningInfoAnalyForm" v-model="warnData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="预警分析" :disabled="viewFlag||approveFlag||assistFlag" rules="required" ctype="textarea" name="altAnaly"></yu-xform-item>
            <yu-xform-item label="是否有其他负面信息" :disabled="viewFlag||approveFlag||assistFlag" rules="required" name="isNegativeInfo" ctype="radio" data-code="STD_ZB_YES_NO" colspan="8" @change="isanalyFn"></yu-xform-item>
            <yu-xform-item label="分析说明" :disabled="viewFlag||approveFlag||assistFlag" name="analy" ctype="textarea" colspan="12" :rules="analyRule"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspwarninginfolist/queryByAltDate',
      warnData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      isSmall: false, // 是否小微
      searchData: {
        condition: {
          taskNo: this.$route.params.pspTask.taskNo
        }
      },
      analyRule: {}
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
    // 从借据信息中获取 是否受托支付、交易对手名称
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      // const params = _this.$route.params;
      // clone(params.pspTask, _this.taskData);
      // _this.viewFlag = params.status === "detail";
      // let pageName = params.pageName + "Flag";
      // _this[pageName] = true;
      // 任务编号
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspwarninginfoanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data) {
              yufp.clone(data, _this.warnData);
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
      let isNegativeInfo = this.warnData.isNegativeInfo;
      if (isNegativeInfo === '1') {
        this.rules.analy.required = true;
      } else {
        this.rules.analy.required = false;
      }
    },
    isanalyFn (value) {
      if (value == '1') {
        this.analyRule = {required: true, message: '必填', trigger: 'blur'};
      } else {
        this.analyRule = {};
      }
    }
  }
};
</script>
