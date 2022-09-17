<template>
  <div>
    <el-input
      v-model="selectedVal"
      readonly
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :name="name"
      :icon="icon"
      :on-icon-click="onIconClickFn"
      @click.native="clickFn"
    >
    </el-input>
    <el-dialog-x
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
    >
      <el-row>
        <el-col>
          <el-input type="textarea" :rows="10" v-model="nodeScript"> </el-input>
        </el-col>
      </el-row>
      <div style="margin-top: 20px" slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">确 定</el-button>
        <el-button @click="afterClose">取消</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
/**
 * yufp-nodescript-editor
 * 脚本编辑弹窗
 *
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by zhouqh on 2020/2/11.
 */
/* eslint vue/require-prop-types:0 */
import backend from "@/config/constant/app.data.service";
export default {
  name: "YufpNodescriptEditor",
  props: {
    // 下述字段为el-input组件中部分属性，配置文档参见element-ui
    name: {
      type: String,
    },
    value: {
      required: true,
    },
    rawValue: String,
    size: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "edit",
    },
    params: Object,
  },
  data: function () {
    return {
      url: {
        getuserinfo: backend.workflowService + "/api/org/info",
      },
      selectedVal: "",
      dialogVisible: false,
      dialogTitle: "在线脚本编辑",
      nodeScript: "",
    };
  },
  watch: {
    value: function (val) {
      // 将key转换为对应的value值
      if (!val) {
        this.selectedVal = "";
        return;
      }
      this.selectedVal = this.selectedVal ? this.selectedVal : val;
    },
    rawValue: function (val) {
      this.selectedVal = val;
    },
  },
  mounted: function () {
    this.selectedVal = this.rawValue ? this.rawValue : this.value;
  },
  methods: {
    clickFn: function () {
      this.$emit("click-fn", this);
    },
    onIconClickFn: function (val) {
      if (this.disabled) {
        return;
      }
      this.dialogVisible = true;
    },
    //翻译初始的ID
    dialogOpen: function () {
      var _this = this;
      if (_this.selectedVal) {
        _this.nodeScript = _this.selectedVal;
      } else {
        _this.nodeScript = "";
      }
    },
    afterClose: function () {
      this.nodeScript = "";
      this.dialogVisible = false;
    },
    dialogClose: function () {
      this.selectedVal = this.nodeScript;
      this.$emit("input", this.nodeScript);
      this.$emit("select-fn", "script", this.nodeScript);
      this.nodeScript = "";
      this.dialogVisible = false;
    },
    // 对外提供选择器显示值
    getRawValue: function () {
      return this.selectedVal;
    },
    convertKey: function (val) {
      // 将key转换为对应的value值
      return val;
    },
  },
};
</script>