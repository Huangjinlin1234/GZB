<template>
  <!--临时档案派发
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-panel  title="业务信息" panel-type="simple">
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
    <yu-panel  title="档案信息" panel-type="simple" v-if="centralFilePanleShow">
      <yu-xform ref="refForm2" label-width="160px" v-model="centralFileFormdata" :form-type="formType">
        <yu-xform-group>
          <yu-xform-item label="档案编号" name="fileNo" ctype="input" disabled :rules="{required: true, message: '必输项不允许为空'}" :colspan="fileNoSpan"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" :colspan="12 - fileNoSpan" v-show="showGetButton">
              <yu-button @click="selectFileNo" type="primary" size="small">获取</yu-button>
            </yu-xform-item>
          <yu-xform-item label="全局流水号" name="traceId" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型" data-code="STD_OPT_TYPE" disabled name="optType" ctype="select" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="资料类型" name="bizType" ctype="select" disabled data-code="STD_BIZ_SUB_TYPE" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="临时库位号" name="tempLocationNo" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}" ></yu-xform-item>

          <yu-xform-item label="接收人" name="receiverIdName" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收人" name="receiverId" hidden disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrg" hidden disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="接收时间" name="receiverTime" disabled ctype="input" :rules="{required: true, message: '必输项不允许为空'}"></yu-xform-item>
          <!-- 隐藏域 -->
          <yu-xform-item label="任务编号" name="taskNo" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel  title="登记信息" panel-type="simple" >
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
      showGetButton: true,
      fileNoSpan: 12,
      centralFilePanleShow: true
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

      }
    },
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
    var _this = this;
    var taskNo = (_this.$route.meta.params && _this.$route.meta.params.taskNo) || (_this.pageParams && _this.pageParams.taskNo) || (_this.bizPageData && _this.bizPageData.instanceInfo.bizId);
    if(taskNo){
      this.initFormData(taskNo);
    }

  },
  methods: {
    initFormData(taskNo) {
      var _this = this;
      // 初始化任务表单数据
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisBiz}/api/centralfiletask/${taskNo}`,
        async: false,
        callback: function(code, message, response) {
          if(response.code == '0' && response.data){
            yufp.extend(_this.taskFormdata, response.data);
            yufp.extend(_this.taskFormdata2, response.data);
            _this.taskFormdata.isManualAdd = '0';
            // 判断是否为纯指令
            if(_this.taskFormdata.optType == '01'){ // 纯指令
              _this.centralFilePanleShow = false;
            }else{ // 非纯指令
              _this.centralFileFormdata.optType = _this.taskFormdata.optType;
              // 初始化档案信息表单数据
              _this.copyExsitFieldValue(_this.taskFormdata, _this.centralFileFormdata);
              if(!_this.centralFileFormdata.receiverTime){
                _this.centralFileFormdata.receiverTime = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
              }
              // _this.$nextTick(function(){
              //   _this.checkBizSerno(_this.taskFormdata.serno);
              // });
            }
          }else{
            _this.$message({type:'error', message:'任务信息初始化失败！'});
          }
        }
      });

    },
    // 提交
    saveCommitFn() {
      let _this = this;
      if(_this.centralFilePanleShow){
        let validate = false;
        _this.$refs.refForm2.validate(function(valid) {
          validate = valid;
        });
        if (!validate) {
          return;
        }
      }

      var model = {
        centralFileTask: yufp.clone(_this.taskFormdata, {}),
        centralFileInfo: yufp.clone(_this.centralFileFormdata, {})
      };
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisBiz}/api/centralfiletask/savecommit`,
        data: model,
        callback: function(code, message, response) {
          if(response.code == '0'){
            _this.$message(response.data);
            _this.cancelFn();
          }else{
            _this.$message({message : '提交失败！', type : 'error'});
          }
        }
      });
    },

    copyExsitFieldValue(source, target){
      for(let i in source){// 仅赋值表单存在的字段
        if(target.hasOwnProperty(i)){
          target[i] = source[i];
        }
      }
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
        serno: this.taskFormdata.serno,
        traceId: this.taskFormdata.traceId,
        accStatus: '01'
      };
      this.$dialog.open('档案台账', 'zrcbank/biz/centralfiletask/centralfileInfoPopList', 800, 600, model, (rowData) => {
        this.centralFileFormdata.tempLocationNo = rowData.tempLocationNo;
        this.centralFileFormdata.fileNo = rowData.fileNo;
      });
    },
    // 获取随机档案编号
    getFileNo(){
      const pk = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
      this.centralFileFormdata.fileNo = pk;
    },
    // 获取临时库位号
    getTempLocationNo(){
      var _this = this;
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisBiz}/api/centralfileinfo/getTempLocationNo`,
        callback: function(code, message, response) {
          if(response.code == '0' && response.data){
            _this.centralFileFormdata.tempLocationNo = response.data;
          }
        }
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
