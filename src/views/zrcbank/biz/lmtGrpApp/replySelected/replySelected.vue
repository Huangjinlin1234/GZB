 <!--
    @created by xiamc
    @description 台账列表普通查询，公用组件，供额度和细化使用
  -->
<template>
  <div>
    <yu-panel title="台账列表普通查询" is-collapse hidden="false">
      <template slot="right">
        <yu-toolbar>
        </yu-toolbar>
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item label="集团客户名称" placeholder="集团客户名称" label-width="120px" ctype="input" name="title"></yu-xform-item>
            <yu-xform-item label="集团客户编号" placeholder="集团客户编号" label-width="120px" ctype="input" name="createAt"></yu-xform-item>
            <yu-xform-item label="批复编号" placeholder="批复编号" label-width="120px" ctype="input" name="type" data-code="NATIONALITY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" row-number :data-url="`${$backend.cmisBiz}/api/lmtgrpreplyacc/queryall`" selection-type="radio" @row-click="onSelected"  request-type="POST">
        <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId" sortable></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpCusName" data-code="NATIONALITY"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="replyResult"></yu-xtable-column>
        <yu-xtable-column label="批复生效时间" prop="lmtReplyInureDate" data-code="PUBLISH_STATUS"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="inputId"> </yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="inputBrId"> </yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="inputDate"> </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
          <yu-xform-item label="名称" ctype="input" name="title" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="时间" ctype="datepicker" name="createAt"></yu-xform-item>
          <yu-xform-item label="作者" ctype="input" name="author"></yu-xform-item>
          <yu-xform-item label="审核人" ctype="input" name="auditor"></yu-xform-item>
          <yu-xform-item label="类型" ctype="select" name="type" data-code="NATIONALITY"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" data-code="PUBLISH_STATUS"></yu-xform-item>
          <yu-xform-item label="阅读数" ctype="input" name="pageviews" :rules="rule[1]"></yu-xform-item>
          <yu-xform-item label="自定义" ctype="yufp-demo-selector" name="yourField"></yu-xform-item>
          <yu-xform-item label="点评" ctype="textarea" name="remark" :rows="3" :colspan="24" placeholder="2000个字符以内"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { sessionStore } from 'xy-utils';

yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');

export default {
  components: { YufpDemoSelector },
  props: {
    parentText: {
      type: String
    }
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
      formdata: {},
      rule: [
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
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  mounted () {
    // debugger
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    onSelected: function (row, event, column, index) {
      // alert("选择并跳转");
      console.log('************************');
      // 1.关闭当前界面
      // this.$store.dispatch("tagsView/delVisitedView", {
      //   path: "/zrcbank/biz/lmtGrpApp/replySelected/replySelected/1"
      // });
      // //2.选择传送参数并跳转,换成dialog
      // this.$router.addTab({
      //   name: "zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail",
      //   title: "授信细化",
      //   key: "1",
      //   data: {
      //     userId: "121",
      //     keyId: 12324,
      //     formData: {
      //       name: 'ST0001',
      //       gender: '4'
      //     }
      //   }
      // });
      // yufp.router.removeTab(
      //   "/zrcbank/biz/lmtGrpApp/replySelected/replySelected/1"
      // );
      // sessionStore.set("name", {
      //   name: "ST0001",
      //   gender: "4"
      // });
      // 关闭当前界面或隐藏
      // debugger
      this.$emit('callbackFun', row);
    }
  }
};
</script>
