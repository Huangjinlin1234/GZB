<template>
  <div>
    <!-- 搜索栏 -->
    <el-form-q
      form="query"
      :field-data="queryFields"
      search-table="demoTable"
      :buttons="queryButtons"
    ></el-form-q>
    <!-- 工具栏 -->
    <div class="yu-toolBar">
      <el-button-group>
        <el-button icon="add" @click="userSubscribe()">消息订阅</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-table-x
      ref="templateSubscribeTable"
      :max-height="height"
      :data-url="urls.dataUrl"
      :table-columns="tableColumns"
    >
    </el-table-x>

    <el-dialog :visible.sync="dialogVisible">
      <el-tag type="success">渠道类型：</el-tag>
      <el-radio
        v-for="item in channelTypes"
        v-model="channelType"
        :label="item"
        :key="item"
        >{{ channelTypeMap[item] }}</el-radio
      >　

      <br />
      <br />
      <el-tabs v-model="activeFlag" @tab-click="handleClick">
        <el-tab-pane label="用户订阅" name="first">
          <el-table-x
            ref="userTable"
            :max-height="mainGridFirst.height"
            :default-load="false"
            :pageable="false"
            :checkbox="mainGridFirst.checkbox"
            :data-url="mainGridFirst.dataUrl"
            :table-columns="mainGridFirst.tableColumns"
          ></el-table-x>
          <div align="center">
            <el-button type="primary" @click="saveUserSubscribe()"
              >保存(用户)</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="岗位订阅" name="second">
          <el-table-x
            ref="dutyTable"
            :max-height="mainGridPost.height"
            :default-load="false"
            :pageable="false"
            :checkbox="mainGridPost.checkbox"
            :data-url="mainGridPost.dataUrl"
            :table-columns="mainGridPost.tableColumns"
          ></el-table-x>
          <div align="center">
            <el-button type="primary" @click="saveDutySubscribe()"
              >保存(岗位)</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色订阅" name="third">
          <el-table-x
            ref="roleTable"
            :max-height="mainGridRole.height"
            :default-load="false"
            :pageable="false"
            :checkbox="mainGridRole.checkbox"
            :data-url="mainGridRole.dataUrl"
            :table-columns="mainGridRole.tableColumns"
          ></el-table-x>
          <div align="center">
            <el-button type="primary" @click="saveRoleSubscribe()"
              >保存(角色)</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="机构订阅" name="fourth">
          <el-tree-x
            ref="orgUsertree"
            :show-checkbox="true"
            :height="mainGridPost.height"
            style="margin-top: 10px"
            :data-url="orgUrl"
            data-id="orgId"
            data-label="orgName"
            :data-params="param"
            data-pid="upOrgId"
            :data-root="orgRootId"
            :check-strictly="true"
          ></el-tree-x>
          <div align="center">
            <el-button type="primary" @click="saveOrgSubscribe()"
              >保存(机构)</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="关系订阅" name="fifth">
          <br /><br />
          <el-form ref="form" :model="mainGridFifth" label-width="180px">
            <el-form-item label="相对发送人员的关系">
              <el-select v-model="mainGridFifth.Relationship" clearable>
                <el-option label="同级机构人员" value="sameevel"></el-option>
                <el-option label="上级机构人员" value="uplevel"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div align="center">
            <el-button type="primary" @click="saveRelationshipSubscribe()"
              >保存(关系)</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "templateSubscribe",
  data: function () {
    var _this = this;
    return {
      height: yufp.custom.viewSize().height,
      messageType: "",
      channelType: "",
      subscribeType: "",
      subscribeTypeMap: {
        O: "机构",
        U: "用户",
        G: "岗位",
        R: "角色",
      },
      channelTypes: [],
      channelTypeMap: {
        system: "系统消息",
        mobile: "短信",
        email: "邮件",
      },
      dialogVisible: false,
      urls: {
        dataUrl:
          backend.messageService + "/api/template/getChannelSubscribeList/",
        saveSubscribeUrl:
          backend.messageService + "/api/template/saveSubscribe/",
        getSubscribeUrl: backend.messageService + "/api/template/getSubscribe/",
        userUrl: backend.appOcaService + "/api/selectAllUser/",
      },
      tableColumns: [
        { label: "消息类型", prop: "messageType", resizable: true },
        { label: "描述", prop: "messageDesc", resizable: true },
        { label: "渠道类型", prop: "channelType", resizable: true },
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
              _this.$refs.templateSubscribeTable.remoteData(param);
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
        { placeholder: "消息类型", field: "messageType", type: "input" },
        { placeholder: "描述", field: "messageDesc", type: "input" },
      ],
      activeFlag: "",
      mainGridFirst: {
        height: 270,
        checkbox: true,
        dataUrl: backend.appOcaService + "/api/selectAllUser/",
        tableColumns: [
          { label: "用户码", prop: "userNo", resizable: true, width: 290 },
          { label: "用户名", prop: "userName", resizable: true, width: 280 },
        ],
      },
      mainGridRole: {
        height: 270,
        checkbox: true,
        dataUrl: backend.appOcaService + "/api/selectAllRole/",
        tableColumns: [
          { label: "角色ID", prop: "roleId", resizable: true, width: 210 },
          { label: "角色码", prop: "roleCode", resizable: true, width: 80 },
          { label: "角色名称", prop: "roleName", resizable: true, width: 200 },
          { label: "所属机构", prop: "orgId", resizable: true, width: 80 },
        ],
      },
      mainGridPost: {
        height: 270,
        checkbox: true,
        dataUrl: backend.appOcaService + "/api/selectAllDuty/",
        tableColumns: [
          { label: "岗位ID", prop: "dutyId", resizable: true, width: 210 },
          { label: "岗位码", prop: "dutyCde", resizable: true, width: 80 },
          { label: "岗位名称", prop: "dutyName", resizable: true, width: 200 },
          {
            label: "所属机构",
            prop: "belongOrgId",
            resizable: true,
            width: 80,
          },
        ],
      },
      mainGridFifth: {
        Relationship: "",
      },
      orgUrl: backend.messageService + "/api/template/selectAllOrg/",
      orgRootId: yufp.session.org.code, // 根据节点ID,
      param: {},
    };
  },
  methods: {
    userSubscribe: function () {
      var _this = this;
      var row = this.$refs.templateSubscribeTable.selections;
      if (row.length != 1) {
        _this.$message({ message: "请选择一条数据", type: "warning" });
        return;
      }
      if (this.$refs.templateSubscribeTable.selections[0].channelType == "") {
        _this.$message({ message: "未配置模板，无法订阅", type: "warning" });
        return;
      }
      this.messageType = this.$refs.templateSubscribeTable.selections[0].messageType;
      this.channelTypes = this.$refs.templateSubscribeTable.selections[0].channelType.split(
        ","
      );
      this.activeFlag = "first";
      this.dialogVisible = true;
      this.$nextTick(function () {
        _this.$refs.userTable.remoteData();
        _this.$refs.dutyTable.remoteData();
        _this.$refs.roleTable.remoteData();
        _this.$refs.orgUsertree.remoteData();
      });
    },
    handleClick: function (tab, event) {
      var _this = this;
      if (tab.name === "first") {
        var comitData = {
          messageType: this.messageType,
          channelType: this.channelType,
          subscribeType: "U",
        };
        yufp.service.request({
          method: "POST",
          url: this.urls.getSubscribeUrl,
          data: comitData,
          callback: function (code, message, response) {
            var infos = response.data.split(",");
            _this.$refs.userTable.clearSelection();
            for (var i = 0; i < infos.length; i++) {
              _this.$refs.userTable.data.filter(function (item) {
                if (item.userNo === infos[i]) {
                  _this.$refs.userTable.toggleRowSelection(item, true);
                }
              });
            }
          },
        });
      } else if (tab.name === "second") {
        var comitData = {
          messageType: this.messageType,
          channelType: this.channelType,
          subscribeType: "G",
        };
        yufp.service.request({
          method: "POST",
          url: this.urls.getSubscribeUrl,
          data: comitData,
          callback: function (code, message, response) {
            var infos = response.data.split(",");
            _this.$refs.dutyTable.clearSelection();
            for (var i = 0; i < infos.length; i++) {
              _this.$refs.dutyTable.data.filter(function (item) {
                if (item.dutyId === infos[i]) {
                  _this.$refs.dutyTable.toggleRowSelection(item, true);
                }
              });
            }
          },
        });
      } else if (tab.name === "third") {
        var comitData = {
          messageType: this.messageType,
          channelType: this.channelType,
          subscribeType: "R",
        };
        yufp.service.request({
          method: "POST",
          url: this.urls.getSubscribeUrl,
          data: comitData,
          callback: function (code, message, response) {
            var infos = response.data.split(",");
            _this.$refs.roleTable.clearSelection();
            for (var i = 0; i < infos.length; i++) {
              _this.$refs.roleTable.data.filter(function (item) {
                if (item.roleId === infos[i]) {
                  _this.$refs.roleTable.toggleRowSelection(item, true);
                }
              });
            }
          },
        });
      } else if (tab.name === "fourth") {
        var comitData = {
          messageType: this.messageType,
          channelType: this.channelType,
          subscribeType: "O",
        };
        yufp.service.request({
          method: "POST",
          url: this.urls.getSubscribeUrl,
          data: comitData,
          callback: function (code, message, response) {
            var infos = response.data.split(",");
            var keys = [];
            for (var i = 0; i < infos.length; i++) {
              keys.push(infos[i]);
            }
            _this.$refs.orgUsertree.setCheckedKeys(keys);
          },
        });
      } else if (tab.name === "fifth") {
        var comitData = {
          messageType: this.messageType,
          channelType: this.channelType,
          subscribeType: "X",
        };
        yufp.service.request({
          method: "POST",
          url: this.urls.getSubscribeUrl,
          data: comitData,
          callback: function (code, message, response) {
            var infos = response.data.split(",");
            var keys = [];
            for (var i = 0; i < infos.length; i++) {
              keys.push(infos[i]);
            }
            _this.mainGridFifth.Relationship = keys[0];
          },
        });
      }
    },
    saveSubscribe: function (subscribeType, subscribeValue) {
      var _this = this;
      if (_this.channelType == "") {
        _this.$message({ message: "选择渠道类型", type: "error" });
        return;
      }
      var comitData = {
        messageType: this.messageType,
        channelType: this.channelType,
        subscribeType: subscribeType,
        subscribeValue: subscribeValue,
      };
      var saveUrl = _this.urls.saveSubscribeUrl;
      yufp.service.request({
        url: saveUrl,
        data: comitData,
        method: "POST",
        callback: function (code, message, response) {
          if (response.data == 0) {
            // _this.dialogVisible = false;
            _this.$message({ message: "成功", type: "success" });
          } else {
            _this.$message({ message: "失败", type: "error" });
          }
        },
      });
    },
    saveUserSubscribe: function () {
      var users = "";
      if (this.$refs.userTable.selections.length >= 1) {
        for (var i = 0; i < this.$refs.userTable.selections.length; i++) {
          users = users + this.$refs.userTable.selections[i].userNo + ",";
        }
      }
      this.saveSubscribe("U", users);
    },
    saveOrgSubscribe: function () {
      var checks = this.$refs.orgUsertree.getCheckedKeys();
      var orgs = "";
      for (var i = 0; i < checks.length; i++) {
        orgs = orgs + checks[i] + ",";
      }
      this.saveSubscribe("O", orgs);
    },
    saveRoleSubscribe: function () {
      var roles = "";
      if (this.$refs.roleTable.selections.length >= 1) {
        for (var i = 0; i < this.$refs.roleTable.selections.length; i++) {
          roles = roles + this.$refs.roleTable.selections[i].roleId + ",";
        }
      }
      this.saveSubscribe("R", roles);
    },
    saveDutySubscribe: function () {
      var dutys = "";
      if (this.$refs.dutyTable.selections.length >= 1) {
        for (var i = 0; i < this.$refs.dutyTable.selections.length; i++) {
          dutys = dutys + this.$refs.dutyTable.selections[i].dutyId + ",";
        }
      }
      this.saveSubscribe("G", dutys);
    },
    saveRelationshipSubscribe: function () {
      var relationship = this.mainGridFifth.Relationship;
      this.saveSubscribe("X", relationship);
    },
  },
};
</script>
