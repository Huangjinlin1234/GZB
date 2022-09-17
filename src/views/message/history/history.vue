
<template>
  <div>
    <!-- 搜索栏 -->
    <el-form-q
      form="query"
      :field-data="queryFields"
      search-table="messageTable"
      :buttons="queryButtons"
    ></el-form-q>
    <!-- 工具栏 -->
    <div class="yu-toolBar">
      <el-button-group>
        <el-button icon="add" @click="sendAgain()">重发</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-table-x
      ref="messageTable"
      :max-height="height"
      :checkbox="check"
      :data-url="urls.dataUrl"
      :table-columns="tableColumns"
    >
    </el-table-x>
  </div>
</template>
<script>
yufp.lookup.reg("CHANNEL_TYPE,MESSAGE_STATE");
export default {
  name: "messageSendInfo",
  data: function () {
    var _this = this;
    return {
      height: yufp.custom.viewSize().height,
      urls: {
        dataUrl: backend.messageService + "/api/template/queryMessageResult/",
        sendAgainUrl: backend.messageService + "/api/template/sendAgain/",
      },
      tableColumns: [
        { label: "主键", prop: "pkNo", resizable: true, hidden: true },
        { label: "用户码", prop: "userNo", resizable: true },
        {
          label: "发送结果",
          prop: "state",
          resizable: true,
          type: "select",
          dataCode: "MESSAGE_STATE",
        },
        {
          label: "渠道类型",
          prop: "channelType",
          resizable: true,
          type: "select",
          dataCode: "CHANNEL_TYPE",
        },
        {
          label: "发送时间",
          prop: "sendTime",
          resizable: true
        },
      ],
      queryButtons: [
        {
          label: "搜索",
          op: "submit",
          type: "primary",
          icon: "search",
          show: true,
          click: function (model, valid) {
            if (valid) {
              var param = {
                condition: JSON.stringify(model),
              };
              _this.$refs.messageTable.remoteData(param);
            }
          },
        },
        {
          label: "重置",
          op: "reset",
          type: "primary",
          icon: "yx-loop2",
          show: this.resetButton,
        },
      ],
      queryFields: [
        { placeholder: "用户码", field: "userNo", type: "input" },
        {
          placeholder: "发送结果",
          field: "state",
          type: "select",
          options: [
            { key: "S", value: "成功" },
            { key: "F", value: "失败" },
          ],
        },
        /* { placeholder: '渠道类型', field: 'channelType',type:'select',dataCode: 'CHANNEL_TYPE'},*/
        { placeholder: "发送时间", field: "sendTime", type: "input" },
      ],
      check: true,
    };
  },
  methods: {
    sendAgain: function () {
      var _this = this;
      if (this.$refs.messageTable.selections.length > 0) {
        var pkNos = "";
        if (this.$refs.messageTable.selections.length >= 1) {
          for (var i = 0; i < this.$refs.messageTable.selections.length; i++) {
            pkNos = pkNos + this.$refs.messageTable.selections[i].pkNo + ",";
            if (this.$refs.messageTable.selections[i].state == "S") {
              _this.$message({
                message: "发送成功的消息不可重发",
                type: "warning",
              });
              return;
            }
          }
        }
        var comData = { pkNos: pkNos };
        this.$confirm("您确定要重新发送消息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }).then(function () {
          yufp.service.request({
            method: "POST",
            data: comData,
            url: _this.urls.sendAgainUrl,
            callback: function (code, message, response) {
              if (response.data == 0) {
                _this.$message({ message: "发送成功", type: "success" });
                _this.$refs.messageTable.remoteData();
              } else {
                _this.$message({ message: "发送失败", type: "error" });
              }
            },
          });
        });
      } else {
        _this.$message({ message: "请先选择数据", type: "warning" });
        return false;
      }
    },
  },
};
</script>
