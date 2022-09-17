<script>
import { clone } from "@/utils";
import { genTreeData, checkVisiable } from "./util";
export default {
  name: "TemplateFactory",
  props: {
    pageParams: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dialogId: String,
    modelGroupNo: String,
    bizPageData:{
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      // 停止递归查找主页面的标识
      flag: true,
      // 整个组装页面嵌套的信息
      route: [],
      // 右侧tab显示的页签
      tabArr: [],
      // 主页面对象
      main: {},
      // 请求返回的原始页面信息
      originRoute: [],
      // 当前显示的页面组件
      curCompoments: {},
      // 当前显示的页面功能路径
      curPath: {},
      // 模版工厂，子页面共享的数据
      contextData: {},
      // 当前点击的树节点
      curTreeNode: {},
      translateMap: {
        mId: "id", // 菜单ID
        mText: "name", // 菜单名称
        mPid: "pid", // 上级菜单ID
        mIcon: "menuIcon", // 菜单图标
        routeId: "funcId", // 菜单功能ID
        routeUrl: "funcUrl", // 菜单功能URL
        mType: "menuType" // 菜单类型
      },
      showBtn: {
        tempSave: true,
        save: true,
        commit: true,
        back: true
      }
    };
  },
  watch: {
    curPath(val) {
      var curCompoments = (() => require("@/views/" + val).default)();
      if (val && !curCompoments) {
        throw new Error(`${val} 该页面存在错误代码，导致加载失败`);
      } else {
        this.curCompoments = curCompoments;
      }
    }
  },
  created() {
    if (JSON.stringify(this.pageParams) !== "{}") {
      clone(this.pageParams, this.contextData); // $dialog.open 进入
    } else if (JSON.stringify(this.bizPageData) !== "{}") {
      clone(this.bizPageData, this.pageParams); // 工作流待办进入 component
      clone(this.pageParams, this.contextData);
    } else if (JSON.stringify(this.$route.params) !== "{}") {
      clone(this.$route.params, this.contextData); // $router.push及其他进入
    }
    this.preview();
  },
  mounted() {
    // this.$nextTick(function() {
    //   var renderRoute = this.parseTree(clone(this.route, []));
    //   this.getMainFunc(renderRoute)
    //   this.curPath = this.main.routeUrl;
    // })
  },
  destroyed() {
    this.contextData = {};
    this.curCompoments = {};
  },
  methods: {
    // 提供给子页面调用主页面的方法，main是默认显示的主页面
    doMainAction(methodName) {
      var mainMenuId = this.main.mId;
      try {
        this.$refs[mainMenuId][methodName]();
      } catch {
        console.error(`主页面中未定义 ${methodName} 该方法`);
      }
    },
    // 提供给子页面调用子页面的方法，传入子页面的菜单ID，及需要调用的方法名
    // doSubAction(menuId, methodName) {
    //   this.$refs[menuId][methodName]();
    // },
    // 获取主页面，用于初始化页面和切换右侧tab时默认显示
    getMainFunc(routers) {
      for (var i = 0, l = routers.length; i < l; i++) {
        var route = routers[i];
        if (route.isMainFunc === "Y") {
          this.main = route;
          this.flag = false;
        } else {
          if (this.flag) {
            this.getMainFunc(route.children);
          }
        }
      }
    },
    openLoading() {
      var dom = this.dialogId ? this.$parent.$refs.dialog : this.$parent.$el;
      var options = {
        target: dom, // Loading 需要覆盖的 DOM 节点
        body: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
        fullscreen: false,
        text: "拼命加载中" // 显示在加载图标下方的加载文案
      };
      var loadingInstance = this.$loading(options);
      return loadingInstance;
    },
    preview() {
      var _this = this;
      var loading = this.openLoading();
      this.$request({
        method: "get",
        url: this.$backend.cmisCfg + `/api/cfgmodelgroup/config/${_this.modelGroupNo || _this.pageParams.model_group_no || _this.$route.params.model_group_no || _this.$route.query.model_group_no || _this.bizPageData.flowParam.model_group_no}`
        // url: this.$backend.cmisCfg + `/api/cfgmodelgroup/config/CMG000020`
      })
        .then(({ code, data }) => {
          if (code == "0") {
            _this.originRoute = data;
            _this.route = genTreeData(clone(data, []));
            if (this.route[0].showMode === "01") {
              var renderRoute = this.parseTree(clone(this.route, []));
              this.getMainFunc(renderRoute);
              // 无funcUrl，说明主页面是模板组，默认打开tab
              if (!this.main.funcUrl) {
                this.handleNodeClick(this.main);
              }
              this.curPath = this.main.routeUrl;
            } else {
              this.getMainFunc(_this.route);
            }
            this.curTreeNode = this.main;
            loading.close();
          }
        })
        .catch(() => {
          loading.close();
        });
    },
    // 点击左侧树节点，获取右侧显示的tab项
    getChildren(routers, id) {
      for (var i = 0, l = routers.length; i < l; i++) {
        var route = routers[i];
        if (route.mId === id) {
          this.tabArr = route.children;
        } else {
          this.getChildren(route.children, id);
        }
      }
    },
    // 树节点点击事件，如果showMode === '02'，加载tab。如果是单节点，直接跳转页面。
    handleNodeClick(data, node) {
      if (data.showMode === "02") {
        this.getChildren(this.route, data.mId);
        this.getMainFunc(this.tabArr);
        this.curPath = this.main.routeUrl;
        this.curTreeNode = this.main;
      } else if (data.showMode === "01") {
        this.getMainFunc(data.children);
        this.curPath = this.main.routeUrl;
        this.curTreeNode = this.main;
        if (!this.main.funcUrl) {
          this.handleNodeClick(this.main);
        }
      } else {
        this.tabArr = [];
        this.curPath = data.routeUrl;
        this.curTreeNode = data;
      }
    },
    // tab点击事件
    handleTabClick(data) {
      if (data.$attrs.routeUrl) {
        var component = () => require("@/views/" + data.$attrs.routeUrl).default;
        this.$refs[data.$attrs.pkId + "Tab"].$slots.default = [this.$createElement(component())];
      }
    },
    // 判断节点是否是树节点
    ifTreeNode(item) {
      return !item.showMode || item.showMode === "01";
    },
    // 解析树节点，删除子节点为02的节点
    parseTree(data) {
      for (var i = 0, l = data.length; i < l; i++) {
        var item = data[i];
        if (!this.ifTreeNode(item)) {
          delete item.children;
        }
        if (item.children) {
          this.parseTree(item.children);
        }
      }
      return data;
    },
    // 根据子页面的数据隐藏和显示
    triggerAction(condition) {
      var _this = this;
      clone(condition, this.contextData);
      var templateArr = clone(this.originRoute, []);
      templateArr = templateArr.filter(function(item) {
        return checkVisiable(item, _this.contextData);
      });
      this.route = genTreeData(templateArr);
    },
    loopFindPage: function(vueObj, method){
      if(vueObj && vueObj[method]){
        vueObj[method]();
        return;
      } else if(vueObj.$children && vueObj.$children.length > 0){
          this.loopFindPage(vueObj.$children[0], method)
      }
    },
    /**
     * 暂存【仅暂存当前打开的页面】
     */
    tempSave() {
      this.loopFindPage(this.$refs[this.curTreeNode.mId], 'tempSave');
    },
    /**
     * 保存【仅保存当前打开的页面】
     */
    save() {
      this.loopFindPage(this.$refs[this.curTreeNode.mId], 'save');
    },
    /**
     * 仅提交当前打开的页面
     */
    commit() {
      this.loopFindPage(this.$refs[this.curTreeNode.mId], 'commit');
    },
    back() {
      this.$dialog.close(this.dialogId);
    },
    setButtonVisiable(btnName, visiable) {
      this.showBtn[btnName] = visiable;
    },
    renderBtn(h) {
      if (this.curTreeNode.jobFlow && this.curTreeNode.jobFlow === "N") {
        this.showBtn.commit = false;
      }
      return this.contextData && (this.contextData.op === "ADD" || this.contextData.op === "EDIT") ? (
        <div style="overflow: hidden;">
          <yu-button-group style="float: right;">
            {this.showBtn["tempSave"] ? <yu-button onClick={this.tempSave}>暂存</yu-button> : ""}
            {this.showBtn["save"] ? <yu-button onClick={this.save}>保存</yu-button> : ""}
            {this.showBtn["commit"] ? <yu-button onClick={this.commit}>提交</yu-button> : ""}
            {this.showBtn["back"] ? <yu-button onClick={this.back}>返回</yu-button> : ""}
          </yu-button-group>
        </div>
      ) : (
        ""
      );
    },
    renderTree(h, template) {
      return (
        <el-row>
          <el-col span={4}>
            <el-tree node-key="mId" data={template} default-expanded-keys={[this.curTreeNode.mId]} props={{ children: "children", label: "label" }} on-node-click={this.handleNodeClick} />
          </el-col>
          <el-col span={20}>
            {this.renderBtn(h)}
            {this.tabArr.length > 0 ? this.renderTab(h, this.tabArr) : h(this.curCompoments, { ref: this.curTreeNode.mId })}
          </el-col>
        </el-row>
      );
    },
    renderTab(h, template) {
      return (
        <div>
          <yu-tabs on-tab-click={this.handleTabClick}>
            {this._l(template, item => {
              return item.visiable === undefined || item.visiable ? (
                <yu-tab-pane {...{ attrs: item, ref: item.pkId + "Tab" }} label={item.label} name={item.mid}>
                  {// eslint-disable-next-line no-nested-ternary
                  item.children && item.children.length > 0 ? this.renderTab(h, item.children) : item.isMainFunc === "Y" ? h((() => require("@/views/" + item.routeUrl).default)(), { ref: item.mId }) : ""}
                </yu-tab-pane>
              ) : (
                ""
              );
            })}
          </yu-tabs>
        </div>
      );
    }
  },
  render(h) {
    if (this.route.length > 0) {
      var renderRoute = [];
      if (this.route[0].showMode === "01") {
        renderRoute = this.parseTree(clone(this.route, []));
        return this.renderTree(h, renderRoute[0].children, this.tabArr);
      } else {
        return this.renderTab(h, this.route[0].children, this.tabArr);
      }
    }
    return "";
  }
};
</script>
