<template>
  <div class="yu-dashboard-box" style="min-height: 250px;">
    <div class="yu-zrc-title">
      <h1>常用功能</h1>
      <a href="javascript:void(0);" @click="openPage">设置</a>
    </div>
    <div class="yu-commfunc-box" style="padding:0 24px 16px 24px;">
      <span v-for="(item, i) in myData" :class="{ funcitem: true, yellow: coloryellow.indexOf(i) > -1, default: colordefault.indexOf(i) > -1, purple: colorpurple.indexOf(i) > -1, green: colorgreen.indexOf(i) > -1 }" :key="i" @click="openMenu(item)" :title="item.title">
        <i :class="item.icon"></i>
        <span>{{ item.title.length > 7 ? item.title.substr(0, 7) + "..." : item.title }}</span>
      </span>
    </div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog title="" class="yu-commfunc-setingbox" :visible.sync="dialogVisible" width="70%" :close-on-press-escape="true" :show-close="false">
      <span slot="title" class="setingbox-title">
        <h1>常用功能</h1><span>(最多设置16个)</span>
        <div>
          <yu-button type="primary" v-norepeat.disabled @click="saveUserQuickmenu">完成</yu-button>
          <yu-button @click="dialogVisible = false">取 消</yu-button>
        </div>
      </span>

      <yu-panel ref="panel" title="我的常用功能" panel-type="simple">
        <div class="yu-commfunc-box del-box" style="padding:0px 0px 20px">
          <span v-for="(item, i) in tempData" :class="{ delfuncitem: true, 'el-icon-minus': true, yellow: coloryellow.indexOf(i) > -1, default: colordefault.indexOf(i) > -1, purple: colorpurple.indexOf(i) > -1, green: colorgreen.indexOf(i) > -1 }" :key="i" @click="minsMenu(item)">
            <i :class="item.icon"></i>
            <span>{{ item.title.length > 7 ? item.title.substr(0, 7) + "..." : item.title }}</span>
          </span>
        </div>
        <template slot="right">
          <yu-toolBar> </yu-toolBar>
        </template>
      </yu-panel>
      <yu-panel ref="panel" title="更多常用功能" panel-type="simple" show-search-input placeholder="关键字" @search="fuzzyQuery">
        <div class="yu-moresetting-box">
          <div v-for="(value, index) in data" :key="index">
            <div>
              <div class="yu-moresetting-title">{{ index + 1 }}.{{ value.title }}</div>
              <span v-for="(item, j) in value.children" :key="j" :class="{ 'yu-moresetting-funcitem': true,'exists':item.exists,'notexists':!item.exists}" @click="addMenu(item)">
                <i :class="item.icon"></i>
                {{ item.title }}
              </span>
            </div>
          </div>
        </div>
      </yu-panel>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_WB_RISK_MESSAGE_TYPE,STD_WB_NOTICE_TYPE,STD_WB_PRB_MESSAGE_TYPE,STD_WB_PRB_STATUS');
import { mapGetters } from 'vuex';
export default {
  components: { mapGetters },
  data () {
    return {
      activeIndex: 1,
      dialogVisible: false,
      data: [],
      resData: [], // 后台返回的数据
      myData: [],
      defaultMent: false,
      tempData: [], // 页面展示的 临时数据
      coloryellow: [0, 4, 7, 10, 13],
      colordefault: [1, 6, 11, 15],
      colorpurple: [2, 5, 9, 12],
      colorgreen: [3, 8, 14]
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles', 'menus'])
  },
  mounted () {
    // 初始化我的常用菜单
    this.initData(this.dealAllitem);
  },
  methods: {
    initData (dealAllitem) {
      console.info('-----------initData', JSON.stringify(dealAllitem))
      let _this = this;
      _this
        .$request({
          url: backend.cmisCfg + '/api/wbcommfunc/' + this.loginCode,
          method: 'post'
        })
        .then(({ code, message, data }) => {
          if (data) {
            _this.resData = JSON.parse(data.mappContent);
          } else {
            this.defaultMent = true;
            _this.resData = [];
          }
          dealAllitem();
        });
    },
    dealAllitem () {
      // 页面创建
      let _this = this;
      let menus = _this.menus.filter(item => !item.hidden && item.meta);
      for (let i = 0; i < menus.length; i++) {
        let model = {
          title: menus[i].meta.title,
          children: _this.getAllItems(menus[i].children)
        };
        _this.data.push(model);
      }
    },
    // 打开常用功能对应的页面
    openMenu (item) {
      this.$router.push(item.routeUrl);
    },
    /** 保存用户快捷菜单 */
    saveUserQuickmenu () {
      let model = {};
      model.serno = this.loginCode;
      model.mappContent = JSON.stringify(this.tempData);
      this.$request({
        url: backend.cmisCfg + '/api/wbcommfunc/create',
        method: 'post',
        data: JSON.stringify(model)
      }).then(({ code, message, data }) => {
        if (data) {
          this.myData = Object.assign([], this.tempData);// JSON.parse(data.mappContent);
          this.dialogVisible = false;
        }
      });
    },
    /** 添加菜单到我的 */
    addMenu (item) {
      for (let i = 0; i < this.tempData.length; i++) {
        if (this.tempData[i].id == item.id) {
          item.exists = false;
          this.tempData.splice(i, 1);
          return;
        }
      }
      if (this.tempData.length == 16) {
        this.$message({ message: '添加的菜单不能超过16个！', type: 'info' });
        return;
      }
      item.exists = true;
      this.tempData.push(item);

    },
    minsMenu (item) {
      for (let i = 0; i < this.tempData.length; i++) {
        if (this.tempData[i].id == item.id) {
          item.exists = false;
          this.tempData.splice(i, 1);
        }
      }
    },
    // 获取所有的元素
    getAllItems (arr, key) {
      let items = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children.length == 0) {
          let item = {
            id: arr[i].meta.id,
            icon: arr[i].meta.icon,
            routeUrl: arr[i].meta.routeUrl,
            title: arr[i].meta.title
          };
          item.exists = this.isExists(item);
          if (key) {
            if (item.title.indexOf(key) > -1) {
              items.push(item);
            }
          } else {
            items.push(item);
          }
        } else {
          let subItems = this.getAllItems(arr[i].children, key);
          for (let j = 0; j < subItems.length; j++) {
            items.push(subItems[j]);
          }
        }
      }
      return items;
    },
    /**
    * 这里使用 push myData方法 主要是为了保证每个菜单的对象都是一个
    */
    isExists (item) {
      // 是否设置过菜单没有设置过默认前16个菜单放在首页
      if (this.defaultMent) {
        if (this.myData.length < 16) {
          this.myData.push(item);
          this.tempData.push(item);
          return true;
        }
      } else {
        for (let i = 0; i < this.resData.length; i++) {
          if (this.resData[i].id == item.id) {
            this.myData.push(item);
            this.tempData.push(item);
            return true;
          }
        }
      }
      return false;
    },
    // 打开更多页面
    openPage () {
      this.dialogVisible = true;
    },
    // 菜单搜索功能
    fuzzyQuery (e) {
      let _this = this;
      let data = [];
      let menus = _this.menus.filter(item => !item.hidden && item.meta);
      for (let i = 0; i < menus.length; i++) {
        let model = {
          title: menus[i].meta.title,
          children: _this.getAllItems(menus[i].children, e.value)
        };
        if (model.children.length > 0) {
          data.push(model);
        }
      }
      _this.data = data;
    }
  }
};
</script>
