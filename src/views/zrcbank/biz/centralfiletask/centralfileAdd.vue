<template>
  <!--创建临时库位
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-panel ref="simplePanel" title="业务信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="160px" v-model="taskFormdata" :form-type="formType" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="任务来源" name="isManualAdd" ctype="select" :rules="{required: true, message: '必输项不允许为空'}" :options="[{key:'1',value:'人工新增'},{key:'0',value:'系统推送'}]"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="责任人" name="inputIdName" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="责任机构" name="inputBrIdName" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="任务编号" name="taskNo" ctype="input" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="档案信息" panel-type="simple">
      <yu-xform ref="refForm2" label-width="160px" v-model="centralFileFormdata" :form-type="formType">
        <yu-xform-group>
          <yu-xform-item label="是否与现有库位合并" name="isMerge" disabled  ctype="select" data-code="STD_ZB_YES_NO" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="档案编号" name="fileNo" ctype="input" disabled :rules="{required: true, message: '必输项不允许为空'}" :colspan="fileNoSpan"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" :colspan="12 - fileNoSpan" v-show="showGetButton">
              <yu-button @click="selectFileNo" type="primary" size="small">获取</yu-button>
            </yu-xform-item>
          <yu-xform-item label="资料类型" name="bizType" ctype="select" disabled data-code="STD_BIZ_SUB_TYPE" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="临时库位号" name="tempLocationNo" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}" ></yu-xform-item>
          <yu-xform-item label="接收人" name="receiverId" hidden disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收人" name="receiverIdName" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrg" hidden disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收时间" name="receiverTime" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <!-- 隐藏域 -->
          <yu-xform-item label="任务编号" name="taskNo" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="登记信息" panel-type="simple" >
      <yu-xform ref="refForm" label-width="160px" v-model="taskFormdata2" :form-type="formType" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="操作人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作机构" name="updBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作时间" name="updDate" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button v-if="formType != 'details'" type="primary" @click="saveCommitFn">提交</yu-button>
      <yu-button @click="cancelFn">取消</yu-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function() {
    return {
      taskFormdata: {},
      taskFormdata2: {},
      centralFileFormdata: {},
      viewType: "",
      formType: "edit",
      showGetButton: false,
      fileNoSpan: 12,
      isMergeDisabled: false
    };
  },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  watch: {
    'centralFileFormdata.isMerge': function (val) {
      if(val){
        if('0' == val){ // 不合并
          this.setNoBtnVisiable(false);
        }else if('1' == val){ // 合并
          // 控制临时库位号后的按钮显示
          this.setNoBtnVisiable(true);
        }
      } 
    }
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org']),
  },
  created() {
    let viewType = (this.$route.meta.params && this.$route.meta.params.viewType) || (this.pageParams && this.pageParams.viewType);
    if(viewType == 'VIEW' || this.bizPageData){
      this.formType = 'details';
    }
  },
  mounted() {
    this.initFormData();
    
  },
  methods: {
    initFormData() {
      var _this = this;
      _this.taskFormdata.isManualAdd = '1';
      _this.centralFileFormdata.isMerge = '1';
      if(!_this.centralFileFormdata.receiverTime){
        _this.centralFileFormdata.receiverTime = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      }
      _this.taskFormdata2.updIdName = _this.userName;
      _this.taskFormdata2.updBrIdName = _this.org.name; 
      _this.taskFormdata2.updDate = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
    },
    // 提交
    saveCommitFn() {
      let _this = this;
      let validate = false;
      _this.$refs.refForm2.validate(function(valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {
        fileNo: this.centralFileFormdata.fileNo,
        optUsr: this.centralFileFormdata.receiverId,
        optOrg: this.centralFileFormdata.receiverOrg,
        fileOptType: '06', // 新增合并暂存
        optReason: '新增合并暂存'
      };
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisBiz}/api/centralfileoptrecord/`,
        data: model,
        callback: function(code, message, response) {
          if(response.code == '0' && response.data == 1){
            _this.$message("创建成功！");
            _this.cancelFn();
          }else{
            _this.$message({message : '创建失败！', type : 'error'});
          }
        }
      });
    },
    
    cancelFn () {
      this.$dialog.close(this.dialogId);
    },
    setNoBtnVisiable(visiable){
      let _this = this;
      if(visiable){
        _this.showGetButton = true;
        _this.fileNoSpan = 10;
      }else{
        _this.showGetButton = false;
        _this.fileNoSpan = 12;
      }
    },
    selectFileNo(){
      let model = {
        // serno: this.taskFormdata.serno,
        accStatus: '01,02'
      };
      this.$dialog.open('档案台账', 'zrcbank/biz/centralfiletask/centralfileInfoPopList', 800, 600, model, (rowData) => {
        console.log(rowData);
        this.centralFileFormdata.tempLocationNo = rowData.tempLocationNo;
        this.centralFileFormdata.fileNo = rowData.fileNo;
        yufp.extend(this.taskFormdata, rowData);
        yufp.extend(this.centralFileFormdata, rowData);
      });
    },
  }
};
</script>
<style>
.yu-base-panel-content {
  padding-bottom: 0px !important;
}
</style>
