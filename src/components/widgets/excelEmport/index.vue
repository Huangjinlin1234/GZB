<template>
  <span v-if="showDown" class="yufp-excel-export">
    <yu-button :disabled="disabled" @click="btnExportFn"><slot>{{ btnName }}</slot></yu-button>
    <yu-button :type="type" :size="size" @click="btnDownloadFn"><slot name="btn-down">下载</slot></yu-button>
    <yu-xdialog :visible.sync="dialogVisible" :show-close="showClose" :title="title" :width="width" :height="height">
      <yu-progress :status="progressStatus" :percentage="percentage" :stroke-width="10" style="margin: 10px"></yu-progress>
    </yu-xdialog>
  </span>
  <span v-else class="yufp-excel-export">
    <yu-button :disabled="disabled" @click="btnExportFn"><slot>{{ btnName }}</slot></yu-button>
    <yu-xdialog :visible.sync="dialogVisible" :show-close="showClose" :title="title" :width="width" :height="height">
      <yu-progress :status="progressStatus" :percentage="percentage" :stroke-width="10" style="margin: 10px"></yu-progress>
    </yu-xdialog>
  </span>
</template>
<script>
import yufp from "@/utils/yufp";
import { getToken } from "@/utils/oauth";
import { download } from "@/utils/util";

export default {
  name: "FdpExcelExport",
  props: {
    btnName:{
      type: String,
      default: "导入"
    }, // 按钮文字
    disabled:{
      type: Boolean,
      default: true
    }, // 点击按钮是否可编辑
    type: {
      type: String,
      default: ""
    },
    size: String,
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "导出中..."
    },
    width: {
      type: String,
      default: "400px"
    },
    height: {
      type: String,
      default: "80px"
    },
    // 导出成功后是否自动下载
    autoDown: {
      type: Boolean,
      default: true
    },
    // 是否显示下载按钮，在非自动下载时，默认显示
    showDown: {
      type: Boolean,
      default: false
    },
    // 请求头加注信息
    headers: {
      type: Object,
      default: null
    },
    // 文件上传请求头是否需要浏览器指纹
    needTerminalFP: {
      type: Boolean,
      default: true
    },
    // 文件上传请求头是否需要Hmac
    needHmac: {
      type: Boolean,
      default: true
    },
    // 文件上传请求头是否需要toke
    needToken: {
      type: Boolean,
      default: false
    },
    // 获取taskId接口
    startUrl: String,
    startBaseParam: Object,
    startRequestType: {
      type: String,
      default: "GET"
    },
    // 导出进度查询路径
    progressUrl: {
      type: String,
      default: backend.example + "/api/excel/queryInfo"
    },
    progressBaseParam: Object,
    progressRequestType: {
      type: String,
      default: "GET"
    },
    // 文件下载路径
    downloadUrl: {
      type: String,
      default: backend.custService + "/api/excel/download"
    },
    downloadBaseParam: Object,
    downloadRequestType: {
      type: String,
      default: "GET"
    }
  },
  data: function() {
    var hds = {};
    if (this._checkEmptyObject(this.headers)) {
      yufp.extend(true, hds, this.headers);
    }
    // 初始化请求头
    this.needToken ? (hds[yufp.service.tokenId] = getToken()) : "";
    return {
      hds: hds,
      // 导出进度弹窗显示
      dialogVisible: false,
      // 进度条默认进度
      percentage: 1,
      // 导出进度查询定时器
      progressTimer: false,
      // 导出任务ID
      taskId: false,
      // 导出查询进度事件间隔
      delay: 2000,
      // 导出成功后文件id
      fileId: "",
      // 进度条状态
      progressStatus: ""
    };
  },
  created: function() {
    // 改变默认值
    this.autoDown = !this.showDown;
  },
  methods: {
    /**
     * 重置进度状态
     */
    resetDefaultData: function() {
      this.dialogVisible = false;
      this.percentage = 1;
      if (this.progressTimer) {
        window.clearTimeout(this.progressTimer);
        this.progressTimer = null;
      }
    },
    /**
     * 校验是否空对象
     */
    _checkEmptyObject: function(obj) {
      if (!obj) {
        return true;
      }
      for (var k in obj) {
        if (k) {
          return false;
        }
      }
      return true;
    },
    /**
     * 执行导出，获取队列ID
     */
    btnExportFn: function() {
      var _this = this;
      _this.title = "导出中";
      _this.progressStatus = "";
      yufp.service.request({
        url: _this.startUrl,
        method: _this.startRequestType,
        data: _this.startBaseParam,
        callback: function(code, message, res) {
          if (code != 0) {
            _this.$message.error(message);
            return;
          }
          console.log("res: ", res);
          var taskId = res ? res.data : false;
          if (taskId) {
            _this.taskId = taskId;
            _this.dialogVisible = true;
            _this.progressTimer = setTimeout(_this.showProgressFn, _this.delay);
          } else {
            _this.$message.error("导出失败！");
          }
        }
      });
    },
    /**
     * 轮询查询进度
     * @param {String} taskId 任务ID
     */
    showProgressFn: function() {
      var _this = this;
      _this.dialogVisible = true;
      var pbpData = yufp.clone({}, _this.progressBaseParam);
      pbpData.taskId = _this.taskId;
      yufp.service.request({
        url: _this.progressUrl,
        method: _this.progressRequestType,
        data: pbpData,
        callback: function(code, message, res) {
          if (code != 0) {
            return;
          }
          var data = res && res.data ? res.data : {};
          if (data.percent == undefined || data.percent == "-1") {
            _this.resetDefaultData();
            _this.$message.error("操作失败！");
            return;
          }
          _this.percentage = data.percent;
          if (_this.percentage < 100) {
            _this.dialogVisible = true;
            _this.progressTimer = setTimeout(_this.showProgressFn, _this.delay);
          } else {
            _this.fileId = data.fastDFSUuid;
            _this.successFn(data.taskType);
          }
        }
      });
    },
    /**
     * 导出成功下载文件
     */
    successFn: function(taskType) {
      var _this = this;
      // 触发导出成功事件
      _this.$emit("success-fn", _this.taskId);
      _this.title = "导出完成";
      _this.progressStatus = "success";
      if (_this.autoDown) {
        setTimeout(function() {
          _this.resetDefaultData();
          if (taskType == "import") {
          } else {
            download(_this.downloadUrl + "?taskId=" + _this.taskId);
          }
        }, _this.delay);
      } else {
        setTimeout(function() {
          _this.$message({
            message: "导出成功,请点击下载按钮下载文件!",
            type: "info"
          });
          _this.resetDefaultData();
        }, _this.delay);
      }
    },
    /**
     * 下载按钮点击事件，下载文件
     */
    btnDownloadFn: function() {
      var _this = this;
      if (_this.fileId && _this.downloadUrl) {
        download(_this.downloadUrl + "?taskId=" + _this.fileId);
      } else {
        _this.$message({ message: "下载失败!", type: "error" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.yufp-excel-export {
  float: left;
}
</style>

