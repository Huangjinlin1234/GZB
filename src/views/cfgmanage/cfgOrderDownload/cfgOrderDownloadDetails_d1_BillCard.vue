<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform
        ref="refForm"
        label-width="120px"
        :form-type="formType"
        v-model="formdata"
        :rules="formRules"
        :form-change="triggerEditChangeEvent"
      >
        <yu-xform-group :column="3">
          <yu-xform-item
            label="预约流水号"
            ctype="input"
            placeholder="预约流水号"
            name="pkId"
            disabled
          ></yu-xform-item>
          <yu-xform-item
            label="预约时间cron"
            ctype="input"
            placeholder="预约时间cron"
            name="cronTime"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="预约次数"
            ctype="yu-num"
            name="orderNum"
            placeholder="预约次数"
            :precision="0"
            :min="0"
          ></yu-xform-item>
          <yu-xform-item
            label="下载内容类型"
            ctype="select"
            name="exportSourType"
            disabled
            data-code="STD_ORDER_TYPE"
            placeholder="下载内容类型"
          ></yu-xform-item>
          <yu-xform-item
            label="下载内容"
            ctype="yu-xflex-query"
            name="downloadAction"
            placeholder="下载内容"
            @select-fn="commonSelectFn"
            :mapping="{ qryCode: 'downloadAction' }"
            width="800"
            height="600"
          ></yu-xform-item>
          <yu-xform-item
            label="灵活查询过滤条件"
            ctype="textarea"
            name="queryCons"
            placeholder="灵活查询过滤条件"
            :colspan="16"
          ></yu-xform-item>
          <yu-xform-item
            label="数据源"
            ctype="select"
            name="dataSource"
            rules="required"
            data-code="STD_ORDER_SOURCE"
            placeholder="数据源"
          ></yu-xform-item>
          <yu-xform-item
            label="文件名"
            ctype="input"
            placeholder="文件名"
            name="fileName"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="登记人"
            ctype="input"
            placeholder="登记人"
            name="inputId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记机构"
            ctype="input"
            placeholder="登记机构"
            name="inputBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记日期"
            ctype="input"
            placeholder="登记日期"
            name="inputDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改人"
            ctype="input"
            placeholder="最后修改人"
            name="updId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改机构"
            ctype="input"
            placeholder="最后修改机构"
            name="updBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改日期"
            ctype="input"
            placeholder="最后修改日期"
            name="updDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="状态"
            ctype="select"
            name="status"
            hidden
            data-code="STD_ORDER_STATUS"
            placeholder="状态"
          ></yu-xform-item>
          <yu-xform-item
            label="关联水印配置id 待定"
            ctype="input"
            placeholder="关联水印配置id 待定"
            name="watermarkId"
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="禁止修改字段"
            ctype="select"
            name="rowCfgId"
            placeholder="禁止修改字段"
          ></yu-xform-item>
          <yu-xform-item
            label="水印内容"
            ctype="checkbox"
            name="waterContent"
            data-code="STD_ORDER_WATER"
            placeholder="水印内容"
            value-type="string"
            separator=","
          ></yu-xform-item>
          <yu-xform-item
            label="水印字体大小"
            ctype="input"
            placeholder="水印字体大小"
            name="waterFontSize"
          ></yu-xform-item>
          <yu-xform-item
            label="水印文字"
            ctype="textarea"
            name="waterWords"
            placeholder="水印文字"
            :colspan="16"
          ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button
        type="primary"
        v-if="opType == 'add'"
        @click="customClick('addFn')"
        >保存</yu-button
      >
      <yu-button
        type="primary"
        v-if="opType == 'edit'"
        @click="customClick('saveFn')"
        >保存</yu-button
      >
      <yu-button type="primary" @click="customClick('cancelFn')"
        >返回</yu-button
      >
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgorderdownload/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgorderdownload/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      opType: this.$parent.pageParams.opType
    };
  },
  methods: {}
};
</script>


