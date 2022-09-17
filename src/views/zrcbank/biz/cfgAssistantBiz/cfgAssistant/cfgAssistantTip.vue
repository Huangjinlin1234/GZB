<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-xdialog :title="注意事项提醒" width="700px" :visible.sync="isVisible">
      <yu-xtable ref="refTable" style="margin-top:10px" row-number  :data-url="dataUrl" :base-params="param" request-type="POST">
        <yu-xtable-column label="业务阶段" prop="bizType" width="200" ctype="select" data-code="STD_BIZ_PHASE"></yu-xtable-column>
        <yu-xtable-column label="注意事项" prop="noticeDesc" ctype="input"></yu-xtable-column>
      </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_BIZ_PHASE');

export default {
  props: {
    isVisible: Boolean,
    prdCode: String, //产品编号
    bizType: String, //业务类型
    prdTypeProp: String, //产品属性
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/cfgassistantinfo/getNoticeByPrdIdAndBizType/',
      formdata: {},
      param: {
        condition: JSON.stringify({
          prdCode: this.prdCode,
          bizType: this.bizType,
          prdTypeProp: this.prdTypeProp
        })
      },
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    setTimeout(() => {
      this.initInfo();
    }, 2000)
  },
  watch: {
    prdTypeProp: function (newValue, oldValue) {
      this.param = {
        condition: JSON.stringify({
          prdCode: this.prdCode,
          bizType: this.bizType,
          prdTypeProp: newValue
        })
      }
    },
    prdCode: function (newValue, oldValue) {
      this.param = {
        condition: JSON.stringify({
          prdCode: newValue,
          bizType: this.bizType,
          prdTypeProp: this.prdTypeProp
        })
      }
    }
  },
  methods: {
    initInfo () {
      var _this = this;
      let model = {};
      model.prdCode = this.prdCode;
      model.bizType = this.bizType;
      model.prdTypeProp = this.prdTypeProp;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cfgassistantinfo/getNoticeByPrdIdAndBizType/',
        data: JSON.stringify({ condition: JSON.stringify(model) }),
        callback: function (code, message, response) {
          if(response.data.length > 0) {
            _this.param = {
              condition: JSON.stringify({
                prdCode: _this.prdCode,
                bizType: _this.bizType,
                prdTypeProp: _this.prdTypeProp
              })
            }
            _this.$refs.refTable.remoteData();
          }
        }
      });
    },
    
  }
};
</script>
