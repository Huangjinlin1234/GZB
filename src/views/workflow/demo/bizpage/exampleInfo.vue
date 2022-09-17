
<template>
  <!-- 必须全局拥有唯一的id -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>客户申请信息</span>
      </div>
      <el-collapse v-model="collapseValue" accordion>
        <el-collapse-item title="流程信息" name="1">
          <el-form ref="form" :model="instanceInfo" label-width="120px">
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="业务流水号">
                  <el-input v-model="instanceInfo.bizId" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流程实例号">
                  <el-input v-model="instanceInfo.instanceId" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="当前节点" v-if="instanceInfo.nodeName != null">
                  <el-input v-model="instanceInfo.nodeName" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="当前节点处理人" v-if="instanceInfo.currentUserId != null">
                  <el-input v-model="instanceInfo.currentUserId" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="业务类型">
                  <el-input v-model="instanceInfo.bizType" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流程名称">
                  <el-input v-model="instanceInfo.flowName" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="业务信息" name="2">
          <el-form ref="bizform" label-width="120px">
            <el-form-item v-for="it in flowParam" :label="it.key" :key="it.key">
              <el-input v-model="it.value"></el-input>
            </el-form-item>
            <el-form-item label="审批结论" prop="commentSign">
              <el-select v-model="commentInfo.commentSign">
                <el-option v-for="item1 in optypeOptions" :key="item1.value" :label="item1.label" :value="item1.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item align="center">
              <el-button type="primary" @click="saveFn">保存</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <yufp-nwf-submit ref="flow" :pagedata="pageData" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
/* eslint vue/html-indent: 0 */
/* eslint no-tabs: 0 */
import { mapGetters } from "vuex";
export default {
  name: "",
  props: {
    bizPageData: {
      // 评论信息
      type: Array,
      default: function() {
        return null;
      }
    }
  },
  data: function() {
    return {
      pageData: {},
      instanceInfo: {},
      flowParam: [],
      item: [],
      collapseValue: "2",
      currentOrgId: "",
      currentOrgName: "",
      currentUserId: "",
      commentInfo: {
        instanceId: "",
        nodeId: "",
        userId: "",
        commentId: "",
        commentSign: "",
        userComment: "",
        ext: "无",
        optType: "",
        optReasTyp: ""
      },
      optypeOptions: []
    };
  },
  computed: {
    ...mapGetters(["userCode", "org"])
  },
  watch: {
    bizPageData: {
      handler: function (val, oldval) {
        if (val && val.instanceInfo) {
          var comment = val.instanceInfo.comment;
          var opType = comment.opType;
          var userComment = comment.userComment;
          console.log(opType, userComment);
        }
        // this.updateComment(val);
      },
      deep: true
    }
  },
  created() {
    this.currentOrgId = this.org.id;
    this.currentOrgName = this.org.name;
    this.currentUserId = this.userCode;
    // 审批页面传输参数对象处理
    const data =
      this.bizPageData == null ? this.$route.params : this.bizPageData;
    this.instanceInfo = data.instanceInfo; // 流程数据对象
    this.optypeOptions = data.optypeOptions; // 审批权限对象
    // 业务参数对象
    if (data.flowParam) {
      for(var key in data.flowParam){
        var param = {
          key: key,
          value: data.flowParam[key]
        }
        this.flowParam.push(param);
      }
    }
    // 将审批页面传输的参数对象传递给公共组件
    this.pageData = data;
  },
  methods: {
    saveFn: function() {
      //把业务参数传回主详情页面用于提交,仅适用于业务页面嵌入审批页面的形式
      var paramWF = {"key": "value"};
      this.$emit("updateBizParam", paramWF);
    },
    submit: function() {
      if (
        null == this.commentInfo.commentSign ||
        "" === this.commentInfo.commentSign
      ) {
        this.$message({ message: "请选择审批结论", type: "warning" });
        return false;
      }
      var paramWF = {};
      for (var i = 0; i < this.flowParam.length; i++) {
        // 流程中业务参数更新
        paramWF[this.flowParam[i].key] = this.flowParam[i].value;
      }
      // 提交意见信息
      var commentInfo = {
        commentId: "", // 意见主键，置空即可
        commentSign: this.commentInfo.commentSign, // 审批结论，和表单中对应的选择下拉框的值绑定
        userComment: "审批意见", // 审批意见
        ext: "无", // 扩展意见
      };
      commentInfo.instanceId = this.instanceInfo.instanceId;
      commentInfo.nodeId = this.instanceInfo.nodeId;
      commentInfo.userId = this.currentUserId;
      var param = {
        opType: this.commentInfo.commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: commentInfo //提交意见参数
      };
      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    // 流程审批执行后的回调方法
    afterSubmit: function(data) {
      this.$router.replace({
        name: this.instanceInfo.returnBackFuncId
      });
    }
  }
};
</script>
