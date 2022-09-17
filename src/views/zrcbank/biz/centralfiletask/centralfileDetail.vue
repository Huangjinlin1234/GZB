<template>
  <!--临时档案暂存
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-panel ref="simplePanel" title="业务信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="160px" v-model="taskFormdata1" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" ></yu-xform-item>
          <yu-xform-item label="任务来源" name="isManualAdd" ctype="select"  :options="[{key:'1',value:'人工新增'},{key:'0',value:'系统推送'}]"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" ></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" ></yu-xform-item>
          <yu-xform-item label="责任人" name="inputIdName" ctype="input" ></yu-xform-item>
          <yu-xform-item label="责任机构" name="inputBrIdName" ctype="input" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="任务信息" panel-type="simple">
      <yu-xform ref="refForm2" label-width="160px" v-model="taskFormdata2" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="任务加急" placeholder="任务加急" name="taskUrgentFlag"></yu-xform-item>
          <yu-xform-item label="任务类型" placeholder="任务类型" name="taskType" ctype="select" data-code="STD_FILE_TASK_TYPE"></yu-xform-item>
          <yu-xform-item label="操作类型" data-code="STD_OPT_TYPE" disabled name="optType" ctype="select" ></yu-xform-item>
          <yu-xform-item label="资料类型" name="bizType" ctype="select" data-code="STD_BIZ_SUB_TYPE" ></yu-xform-item>
          <yu-xform-item label="接收人" name="receiverIdName" disabled ctype="input" ></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input" ></yu-xform-item>
          <yu-xform-item label="任务生成时间" name="taskStartTime" disabled ctype="datepicker" ></yu-xform-item>
          <yu-xform-item label="任务状态" name="taskStatus" disabled ctype="select" data-code="STD_FILE_TASK_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="登记信息" panel-type="simple" >
      <yu-xform ref="refForm" label-width="160px" v-model="taskFormdata3" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="操作人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作机构" name="updBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作时间" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="作废原因" :hidden="cancelResnHidden" name="cancelResn" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button @click="cancelFn">取消</yu-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function() {
    return {
      taskFormdata1: {},
      taskFormdata2: {},
      taskFormdata3: {},
    };
  },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org']),
    cancelResnHidden: function(){
      return this.taskFormdata2.taskStatus != '03';
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
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisBiz}/api/centralfiletask/${taskNo}`,
        async: false,
        callback: function(code, message, response) {
          if(response.code == '0' && response.data){
            if(response.data && response.data.receiverId === null) {
              response.data.receiverIdName = ''
              response.data.receiverOrgName = ''
            }
            if(response.data && response.data.taskUrgentFlag) {
              switch(response.data.taskUrgentFlag){
                case '1':
                  response.data.taskUrgentFlag = '管理岗加急'
                  break;
                case '2':
                  response.data.taskUrgentFlag = '客户经理加急'
                  break;
                case '3':
                  response.data.taskUrgentFlag = '系统加急'
                  break;
                case '9':
                  response.data.taskUrgentFlag = '不加急'
                  break;
                default:
                  break;
              }
            }
            yufp.extend(_this.taskFormdata1, response.data);
            yufp.extend(_this.taskFormdata2, response.data);
            yufp.extend(_this.taskFormdata3, response.data);
            _this.taskFormdata1.isManualAdd = '0';
          }
        }
      });
    },
    cancelFn () {
      this.$dialog.close(this.dialogId);
    },
  }
};
</script>
<style>
.yu-base-panel-content {
  padding-bottom: 0px !important;
}
</style>
