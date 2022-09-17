
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled" class="yu-form-gap">
      <yu-panel title="分支机构额度管控信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="机构号" name="organno" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="机构名称" name="organname" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="申请额度" name="applyAmount" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="核准额度" name="approveAmount" rules="required" ctype="yu-num"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="已使用额度" name="useAmt" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="可使用额度" name="" ctype="custom">
            <template>
              <span>{{ parseFloat(formdata.approveAmount - formdata.useAmt).toFixed(2) }}</span>
            </template>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="生效日期" name="appYm"  ctype="datepicker" value-format="yyyy-MM-dd" placeholder="生效日期" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <div class="yu-grpButton">
      <yu-button icon="yx-undo2" type="primary" @click="tabcancelFn">取消</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { dateFormat } from '@/utils';
import { mapState } from 'vuex';
export default {
  components: { YufpDemoSelector },
  props: {
    bizPageData: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      formDisabled: true,
      formDisabledAdd: true,
      saveBtnShow: false,
      dataParam: {},
      viewType: 'DETAIL',
      formdata: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    } else if (this.bizPageData) {
      this.dataParam.serno = this.bizPageData.instanceInfo.bizId;
    }
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
    var timeDt = new Date();
    _this.updDate = dateFormat(timeDt, '{y}-{m}-{d}');
    _this.updateTime = dateFormat(timeDt, '{y}-{m}-{d} {h}:{i}:{s}');
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.viewType = this.data.viewType;
      _this.serno = this.data.serno;
      _this.formDisabled = true;
      if (_this.viewType == 'ADD') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
        _this.formDisabledAdd = false;
      }
      if (_this.viewType == 'DETAIL') {
        yufp.clone(_this.data, _this.formdata);
      }
      if (_this.viewType == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/lmtdiscorg/selectbymodel',
          data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
          callback: function (code, message, response) {
            yufp.clone(response.data[0], _this.formdata);
          }
        });
      }
    },

    /**
     * 取消
     */
    tabcancelFn: function () {
      var _this = this;
      if (_this.$route.meta.params) {
        yufp.router.removeTab(_this.$route.path);
      } else {
        _this.$store.dispatch('tagsView/delView', this.$route); // 标签页 关闭
        _this.$router.go(-1);
      };
    }
  }
};
</script>
