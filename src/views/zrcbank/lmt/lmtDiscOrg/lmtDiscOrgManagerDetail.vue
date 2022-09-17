
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
          <yu-xform-item label="机构号" name="organno" ctype="input" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item name="organname" ctype="YuXorg" @select-fn="commonSelectFn" :requestNewUrl="requestUrl" :parms="parms" :mapping="{'orgId':'organno','orgIdName':'organname', 'isParams':isParams}" label="机构名称" :disabled="formDisabledAdd" ></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="申请额度" name="applyAmount" rules="required" ctype="yu-num"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="生效日期" name="appYm"  ctype="datepicker" value-format="yyyy-MM-dd" placeholder="生效日期" rules="required"></yu-xform-item>
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
        <yu-button v-norepeat.loading v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-norepeat.loading v-show="saveBtnShow"  type="primary" @click="saveFn('SUBMIT')">提交</yu-button>
        <yu-button type="primary" @click="tabcancelFn">取消</yu-button>
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
      formdata: {},
      isParams: '0'
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
    this.requestUrl = backend.appOcaService + '/api/adminsmorg/getChildrenOrgList';
    this.parms = this.org.id;
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
        yufp.clone(_this.data, _this.formdata);
        _this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        _this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        _this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
        _this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
        _this.isParams = '1';
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
     * saveFn保存
     */
    saveFn: function (actionType) {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      const appYm = this.$xutils.dateFormat('yyyy-MM-dd', new Date(_this.formdata.appYm));// 生效日期
      if (appYm < openday) {
        this.$xutils.showMsgBox('提示', '生效日期不能小于当前时间!');
        return;
      }
      // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/lmtdiscorg/update';
      if (_this.viewType == 'ADD') {
        strurl = backend.cmisLmt + '/api/lmtdiscorg/';
      }
      if (actionType == 'SUBMIT') {
        model.status = '02';
      }
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message('操作成功');
            _this.tabcancelFn();
          }
        }
      });
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
    },
    /** 参照公共的确认事件 */
    commonSelectFn: function (data, mapping) {
      debugger;
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'orgIdName') {
            this.formdata[mapping[item]] = data.orgName;
          } else if (item === 'orgId') {
            this.formdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'orgIdName') {
            this.formdata[item] = data.orgName;
          } else if (item === 'orgId') {
            this.formdata[item] = data.orgCode;
          }
        }
      }
    }
  }
};
</script>
