
<template>
<yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="催收登记信息" name="first">
        <yu-panel title="催收登记详情" :hideFilter="false" :collapseHide="false">
            <yu-xform v-model="searchFormdata" label-width="140px" ref="refForm">
              <yu-xform-group :column="2">
                <yu-xform-item label="任务编号" name="taskNo" rules="required" hidden></yu-xform-item>
                <yu-xform-item label="登记编号" name="pbreiSerno" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="催收方式" name="bcmMode" rules="required" data-code="STD_BCM_MODE" ctype="select"  :disabled="viewType == 'DETAIL'"></yu-xform-item>
                <yu-xform-item label="催收日期" name="bcmDate" rules="required" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xform-item>
                <yu-xform-item label="催收对象类型" name="bcmObjType" ctype="select" data-code="STD_BCM_OBJ_TYPE" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>
                <yu-xform-item label="催收对象名称" name="cusName" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>
                <yu-xform-item label="联系方式" name="tel" required rules="mobile" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xform-item>
                <yu-xform-item label="催收结果" name="bcmResult" ctype="select" data-code="STD_BCM_RESULT" rules="required" :disabled="viewType=='DETAIL'"></yu-xform-item>
                <yu-xform-item label="催收情况说明" name="bcmCaseDesc" ctype="textarea" colspan="24" :disabled="viewType=='DETAIL'"></yu-xform-item>
                <yu-xform-item label="是否回执" name="isRcp" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :disabled="viewType=='DETAIL'" @change="isRcpY"></yu-xform-item>
                <yu-xform-item label="回执日期" name="rcpDate" :required="flag"  ctype="datepicker" :disabled="viewType=='DETAIL'"></yu-xform-item>
                <yu-xform-item label="回执内容" name="rcpContent" ctype="textarea" colspan="16" :required="flag"  :disabled="viewType=='DETAIL'"></yu-xform-item>
                <yu-xform-item label="登记人" name="inputId" hidden></yu-xform-item>
                <yu-xform-item label="登记人" name="inputIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记机构" name="inputBrId" hidden></yu-xform-item>
                <yu-xform-item label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记日期" name="inputDate" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <div style="text-align:center">
                <yu-button type="primary" @click="doSave" :hidden="viewType=='DETAIL'">保存</yu-button>
                <yu-button type="primary" @click="closeFn">关闭</yu-button>
            </div>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="second">
         <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
</yu-tabs>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_BCM_MODE,STD_BCM_OBJ_TYPE,STD_BCM_RESULT,STD_ZB_YES_NO');
export default {
  components: {imageSystem},
  data: function () {
    return {
      searchFormdata: {
        isRcp: ''
      },
      image: '1',
      activeName: 'first',
      flag: false,
      pbreiSerno: '',
      viewType: '',
      taskNo: '',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ07',
          'index': {
            'businessid': this.$route.meta.params.pbreiSerno
          }
        }
      ]
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    if (this.$route.meta.params.viewType == 'DETAIL') {
      this.image = '2';
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    isRcpY () {
      if (this.searchFormdata.isRcp == '01') {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      this.taskNo = _this.$route.meta.params.taskNo;
      this.pbreiSerno = _this.$route.meta.params.pbreiSerno;
      this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType !== 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabcmreceiptinfo/showByPbreiSerno',
          data: {pbreiSerno: this.pbreiSerno },
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.searchFormdata);
          }
        });
      } else {
        _this.searchFormdata['taskNo'] = _this.taskNo;
        _this.searchFormdata['pbreiSerno'] = _this.pbreiSerno;
        _this.searchFormdata['inputId'] = _this.userId;
        _this.searchFormdata['inputIdName'] = _this.userName;
        _this.searchFormdata['inputBrId'] = _this.orgCode;
        _this.searchFormdata['inputBrIdName'] = _this.orgName;
        _this.searchFormdata['inputDate'] = _this.formatTime();
      }
    },
    /* 保存按钮 */
    doSave () {
      var _this = this;
      var validate = false;
      // 校验规则：
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };

      if (_this.viewType == 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabcmreceiptinfo/save',
          data: _this.searchFormdata,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message('操作成功');
            } else {
              _this.$message('操作失败');
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabcmreceiptinfo/updateByPbreiSerno',
          data: _this.searchFormdata,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message('保存成功');
            } else {
              _this.$message('操作失败');
            }
          }
        });
      }
    },

    /* 关闭 */
    closeFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }

  }
};
</script>
