<template>
  <div class="navbar yu-frame-top-bar">
    <div v-if="true" class="yu-frame-top-bar-left">
      <!--<hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb v-if="baseFrameOptions.breadCrumb" id="breadcrumb-container" class="breadcrumb-container" />-->
    </div>
    <div v-else class="yu-logo">{{ appName }}</div>
    <!--<div class="yu-app-box-top" v-if="moreSystem && appOptions.length > 1">
      <label class="yu-app-box-top-label">{{ $t("component.currentSystem") }}</label>
      <div class="yu-app-box-top-button-wrap">
        <div class="yu-app-box-top-button">
          {{ appName }}
          <i class="yu-icon-arr-down1"></i>
          <div ref="appList" class="yu-frame-dropdown-menu">
            <span v-for="(item, index) in appOptions" :key="index" @click="changeApp(item, index)">
              <i :class="[item.checked ? 'yu-icon-checked2' : 'yu-icon-choice-un']"></i>
              {{ item.applicationName }}
            </span>
          </div>
        </div>
      </div>
    </div>-->
    <!--<logo v-else-if="showLogo && isTop" :is-collapse="false" />-->
    <div class="yu-frame-top-bar-right">
      <div class="yu-frame-top-user" style="padding-right: 0px;">
        <div class="pic">
          <img src="../../../assets/zrcbank/images/头部-营业时间.png" title="营业日期" />
        </div>
        <div class="openday" :title="openday" style="float: left;color: #fff;">
          <span>营业日期&nbsp;&nbsp;{{ openday }}</span>
        </div>
      </div>

      <div class="yu-frame-top-user">
        <i class="yu-icon-arr-down1"></i>
        <div class="pic">
          <img :src="userInfo.pic" :title="userInfo.name + '，' + selectedRoles.name" />
        </div>
        <div class="name-role" :title="userInfo.name + '，' + selectedRoles.name">
          <b>{{ userInfo.name + "  " + userInfo.loginCode }}</b>
          <span>{{ selectedRoles.name }}</span>
        </div>
        <div class="yu-frame-dropdown-menu" style="margin-top: 20px;">
          <span>机构：{{ userInfo.orgName }}</span>
          <span :title="dutys">岗位：{{ dutys.length > 12 ? dutys.substr(0, 12) + "..." : dutys }}</span>
          <template v-if="userInfo.roles.length > 1">
            <span v-for="(item, index) in userInfo.roles" :key="index" @click="switchRole(item)" :class="selectedRoles.id === item.id ? 'yu-icon-checked2' : 'yu-icon-choice-un'">{{ item.name }}</span>
            <hr />
          </template>
          <!-- <span>{{ $t("component.personalData") }}</span>-->
          <span @click="modifyPwdFn">{{ $t("component.changePassword") }}</span>
          <span @click="logoutFn">{{ $t("component.logout") }}</span>
        </div>
      </div>

      <span class="sys-tools" v-for="(item, index) in sysToolsFiltered" :key="index" :title="item.event && item.event.click ? item.text : ''" :class="[item.icon, item.className, { 'serach-show': showSearchInput && item.id === 'search', click: item.event && item.event.click }]" @click="toolClick(item, $event)" @mouseenter="toolMouseEnter(item, $event)" @mouseout="toolMouseOut(item, $event)">
        <yu-badge v-if="item.badgeDot" is-dot></yu-badge>
        <div v-if="item.id === 'sign' && selectedRoles.code !== 'R0010' && selectedRoles.code !== 'R0020' && selectedRoles.code !== 'R0030'" class="yu-frame-dropdown-menu" title>
          <span @click="signFn('01')">签到</span>
          <span @click="signFn('02')">签退</span>
          <span @click="openSignHisFn">查看签到历史</span>
        </div>
        <div v-if="item.id === 'leave' && selectedRoles.code !== 'R0010' && selectedRoles.code !== 'R0020' && selectedRoles.code !== 'R0030'" class="yu-frame-dropdown-menu" title>
          <span @click="empAttendInfoAddFn('qj')">请假</span>
          <span @click="empAttendInfoAddFn('xj')">销假</span>
          <span @click="openAttendInfoHisFn">请假销假历史</span>
        </div>
        <!--search sta-->
        <div v-if="item.id === 'search'" class="yu-frame-search" title>
          <div class="yu-frame-search-type">
            <span>
              {{ searchType.name }}
              <i class="yu-icon-arr-down1"></i>
            </span>
            <ul>
              <li v-for="(it, idx) in searchTypeList" :key="idx" @click="searchTypeSwitch(it.id, $event)" :class="[it.checked ? 'yu-icon-checked2' : 'yu-icon-choice-un']" :title="it.name">{{ it.name }}</li>
            </ul>
          </div>
          <yu-input :placeholder="searchPlaceholder" v-model="searchValue" @input="searchDataFilter"></yu-input>
          <i class="yu-frame-search-button" :class="item.icon" @click="searchBarClick"></i>
        </div>
        <!--search end-->
        <!--message sta-->
        <div v-if="item.id === 'message'" class="yu-frame-dropdown-menu yu-frame-message" title>
          <yu-tabs value="message" @tab-click="msgTabClick">
            <yu-tab-pane :label="messageTitle3" name="message">
              <ul class="yu-frame-message-list">
                <li v-for="(it, idx) in userMessages" :key="idx">
                  <i :class="[it.messageType === 5 ? 'yu-icon-finish todo' : 'yu-icon-message3 msg']"></i>
                  <p>
                    <span :title="it.noticeTitle">
                      <!-- <b>{{ it.noticeTitle }}</b> -->
                      {{ it.pubTime }}
                    </span>
                      <a href="javascript:void(0);" @click="readMsg(it)">
                       查看
                      </a>
                    <span>
                      <i>{{ it.noticeContent }}</i>
                    </span>
                  </p>
                </li>
              </ul>
              <div class="yu-frame-message-buttons">
                <yu-button type="text" @click="clearAll">{{ messageBtn3 }}</yu-button>
                <yu-button type="text" @click="openPage">{{ messageBtn4 }}</yu-button>
              </div>
            </yu-tab-pane>

            <!--<yu-tab-pane :label="messageTitle1" name="all">
              <ul class="yu-frame-message-list">
                <li v-for="(it, idx) in userMessages" :key="idx">
                  <i :class="[it.messageType === 0 ? 'yu-icon-finish todo' : 'yu-icon-message3 msg']"></i>
                  <p>
                    <span :title="it.from + it.msg">
                      <b>{{ it.from }}</b>
                      {{ it.msg }}
                    </span>
                    <span>
                      <i>{{ it.dateTime }}</i>
                      <i v-if="it.state">{{ it.state }}</i>
                      <a href="javascript:void(0);">
                        <template v-if="it.type === 0">{{ messageBtn1 }}</template>
                        <template v-else>已读</template>
                      </a>
                    </span>
                  </p>
                </li>
              </ul>
              <div class="yu-frame-message-buttons">
                <yu-button type="text">{{ messageBtn3 }}</yu-button>
                <yu-button type="text" @click="openPage">{{ messageBtn4 }}</yu-button>
              </div>
            </yu-tab-pane>

             <yu-tab-pane :label="messageTitle2" name="to">
              <ul class="yu-frame-message-list">
                <li v-for="(it, idx) in userMessagesNoReadFiltered" :key="idx">
                  <i :class="[it.type === 0 ? 'yu-icon-finish todo' : 'yu-icon-message3 msg']"></i>
                  <p>
                    <span :title="it.from + item.msg">
                      <b>{{ it.from }}</b>
                      {{ it.msg }}
                    </span>
                    <span>
                      <i>{{ it.dateTime }}</i>
                      <i v-if="it.state">{{ it.state }}</i>
                      <a href="javascript:void(0);">
                        <template v-if="it.type === 0">{{ messageBtn1 }}</template>
                        <template v-else>{{ messageBtn2 }}</template>
                      </a>
                    </span>
                  </p>
                </li>
              </ul>
              <div class="yu-frame-message-buttons">
                <yu-button type="text">{{ messageBtn3 }}</yu-button>
                <yu-button type="text" @click="openPage">{{ messageBtn4 }}</yu-button>
              </div>
            </yu-tab-pane>-->
            <!--<yu-tab-pane :label="noticeTit" name="notice">
              <ul class="yu-frame-message-list">
                <li v-for="(it, idx) in noticeList" :key="idx">
                  <i :class="[it.type === 0 ? 'yu-icon-finish todo' : 'yu-icon-message3 msg']"></i>
                  <p>
                    <span :title="it.creatorName + it.noticeTitle">
                      <b>{{ it.creatorName }}{{ $t("notice.fb") }}</b>
                      {{ it.noticeTitle }}
                    </span>
                    <span>
                      <i>{{ it.creatorTime }}</i>
                      <a class="custom-a" @click="noticeInfoFn(it)">
                        <template>
                          {{ messageBtn2 }}</template
                        >
                      </a>
                    </span>
                  </p>
                </li>
                <li v-if="!noticeList.length" class="no-notice-data">
                  <img src="@/assets/common/images/no-data.svg" />
                  <p>{{ $t("notice.zwwdgg") }}</p>
                </li>
              </ul>
              <div class="yu-frame-message-buttons">
                <yu-button type="text" @click="clearNoticeFn">{{ messageBtn3 }}</yu-button>
                <yu-button type="text" @click="moreNoticeFn">{{ messageBtn4 }}</yu-button>
              </div>
            </yu-tab-pane>-->
          </yu-tabs>
        </div>
        <!--message sta-->
        <!--themes sta-->
        <div v-if="item.id === 'themes'" class="yu-frame-dropdown-menu yu-frame-themes" title>
          <template v-for="(itm, i) in themeToolFiltered">
            <h1 :key="itm.id + '_' + i">
              {{ itm.text }}
              <span v-if="itm.extend === 'true'" class="yu-frame-themes-right">
                自动
                <yu-switch @change="changeModelFn" :width="48" v-model="autoSizeModel" on-text="是" off-text="否"></yu-switch>
              </span>
            </h1>
            <template v-if="itm.id === 'skin'">
              <div class="yu-frame-themes-list" :key="itm.id">
                <div v-for="(it, idx) in themesList" :key="idx" :class="it.id" :title="it.name" @click="switchThemes(it.id)">
                  <span :style="{ backgroundColor: it.color }"></span>
                  <i v-if="it.checked" class="yu-icon-checked2"></i>
                </div>
              </div>
            </template>
            <template v-if="itm.id === 'model'">
              <div class="yu-frame-model-list" :key="itm.id">
                <div v-for="(it, idx) in menuModelList" :key="idx" @click="switchMenuModel(it.id)" :class="it.id" :title="it.name">
                  <span :class="it.id"></span>
                  <p :class="it.id"></p>
                  <b></b>
                  <i v-if="it.checked" class="yu-icon-checked2"></i>
                </div>
              </div>
            </template>
            <template v-if="itm.id === 'font'">
              <div class="yu-frame-font-list" :key="itm.id">
                <span v-for="(it, idx) in fontSizeList" :key="idx" @click="switchFontSize(it.id)" :title="it.name" :class="[it.checked ? 'yu-icon-checked2' : 'yu-icon-choice-un']">{{ it.name }}</span>
              </div>
            </template>
            <template v-if="itm.id === 'sizeModel'">
              <div class="yu-frame-font-list" :key="itm.id">
                <span v-for="(it, idx) in sizeModelList" :key="idx" @click="switchFontSizeModel(it.id)" :title="it.name" :class="[it.id === currentSizeModeId ? 'yu-icon-checked2' : 'yu-icon-choice-un']">{{ it.name }}</span>
              </div>
            </template>
          </template>
        </div>
        <div class="yu-frame-dropdown-menu" title v-if="item.id === 'language' && languageList.length > 1">
          <span v-for="(it, idx) in languageList" :key="idx" @click="switchLanguage(it.id)" :class="[it.checked ? 'yu-icon-checked2' : 'yu-icon-choice-un']" :title="it.name">{{ it.name }}</span>
        </div>
      </span>
    </div>
    <yufp-password-modify :dialog-visible.sync="pwdDialogVisible" :first-login="false"> </yufp-password-modify>
    <yu-xdialog title="请假申请" :visible.sync="isShow" width="750px">
      <yu-xform ref="refForm" label-width="110px" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="员工号" name="userCode" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="员工姓名" name="userName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="起始日期" name="startDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="到期日期" name="endDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="请假原因" name="vacationResn" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="申请时间" :hidden="true" name="appTime" ctype="datepicker" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="是否销假" name="isCancelVacation" ctype="input"></yu-xform-item>
          <yu-xform-item label="销假时间" name="cancelVacationTime" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="审批状态" :hidden="true" name="apprStatus" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="最后修改人" name="updId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改机构" name="updBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改日期" name="updDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" ctype="select" data-code="STD_ZB_OPER_TYPE"></yu-xform-item>
          <yu-xform-item label="创建时间" name="createTime" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveEmpAttendInfoFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="isShow = !isShow">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>

<script>

import navbarMixin from './navbar.mixin';


export default {
  mixins: [navbarMixin],
  data () {
    return {
      pwdDialogVisible: false,
      isShow: false,
      formdata: {},
      dutys: '',
      dataCode: {
        '1': '业务审批退回',
        '2': '业务终审通过',
        '3': '业务终审否决',
        '4': '档案延期归还',
        '5': '工作日历待办'
      },
      openday: '2022-09-16',
      // openday: yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2),
      updateUrl: backend.cmisCfg + '/api/wbmsgnotice/update',
      timer: null,
      msgTimer: null
    };
  },

  computed: {},
  created () {
    // let socket = new SockJS('http://localhost:6002/message');
    // let stomClient
    let _this = this;
    // let baseApi = process.env.VUE_APP_BASE_API.replace('http://', 'ws://');
    // var ws = new window.WebSocket(baseApi + backend.cmisCfg + '/message/' + yufp.session.userCode);
    // ws.onopen = function (evt) {
    //   console.log('onopen ' + evt);
    // };
    // ws.onmessage = function (evt) {
    //   _this.showMessage(evt.data);
    // };
    // ws.onclose = function (evt) {
    //   console.log('onclose ' + new Date());
    //   ws = new window.WebSocket(baseApi + backend.cmisCfg + '/message/' + yufp.session.userCode);
    // };
    // window.onbeforeunload = function () {
    //   ws.close();
    //   clearInterval(this.timer);
    //   clearInterval(this.msgTimer);
    // };

    // let datestr = yufp.util.dateFormat(yufp.util.dateFormat(new Date()), '{y}-{m}-{d}');
    let model = {
      inputId: this.loginCode
    };
    _this.timer = setInterval(() => {
      _this.$request({
        url: backend.cmisCfg + '/api/wbworkcal/timer/notice',
        data: JSON.stringify({condition: JSON.stringify(model)}),
        method: 'post'
      }).then(({ code, message, data }) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            var h = _this.$createElement;
            _this.$notify({
              title: '日历提醒',
              message: h('i', { style: 'color: #2647A7;font-style:normal' }, data[i].content)
            });
          }
        }
      });
    }, 50000);

    // if (_this.msgTimer) {
    //   _this.msgTimer = setInterval(() => {
    //     _this.$request({
    //       method: 'GET',
    //       url: backend.appOcaService + '/api/adminsmnotice/view/list',
    //       data: {
    //         page: 1,
    //         size: 20,
    //         readSts: '0'
    //       }
    //     }).then(({code, message, data}) => {
    //       if (code === '0') {
    //         for (let i = 0; i < data.length; i++) {
    //           setTimeout(() => {
    //             _this.showMsgNotice(data[i]);
    //           }, 200);
    //         }
    //       }
    //     });
    //   }, 60 * 60 * 1000);
    // } else {
    //   _this.$request({
    //     method: 'GET',
    //     url: backend.appOcaService + '/api/adminsmnotice/view/list',
    //     data: {
    //       page: 1,
    //       size: 20,
    //       readSts: '0'
    //     }
    //   }).then(({code, message, data}) => {
    //     if (code === '0') {
    //       for (let i = 0; i < data.length; i++) {
    //         setTimeout(() => {
    //           _this.showMsgNotice(data[i]);
    //         }, 200);
    //       }
    //     }
    //   });
    // }
  },

  // beforeMount () {
  //   let arr = [];
  //   for (let i = 0; i < yufp.session.dutys.length; i++) {
  //     arr.push(yufp.session.dutys[i].name);
  //   }
  //   this.dutys = arr.join(',');
  // },

  methods: {
    showMessage (message) {
      var h = this.$createElement;
      let str = message.split(',');
      this.$notify({
        title: str[0],
        message: h('i', { style: 'color: #2647A7;font-style:normal' }, str[1])
      });
    },
    showMsgNotice (message) {
      var h = this.$createElement;
      this.$notify({
        // title: message.noticeTitle,  //经确认不需要提示title
        message: h('i', { style: 'color: #2647A7;font-style:normal' }, message.noticeContent)
      });
    },
    clearAll () {
      let _this = this;
      // this.$confirm('清空全部未读消息, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   callback: function (action) {
      //     if (action === 'confirm') {
      _this.$request({
        method: 'POST',
        url: backend.cmisCfg + '/api/wbmsgnotice/clearAll/' + _this.loginCode
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.userMessages = [];
        }
      });
      //     }
      //   }
      // });
    },
    getlookup (index, type) {
      return navbarMixin.lookup.find(type, false)[index];
    },
    openPage () {
      let route = 'common/dashboard/bizpage/wbMsgNotice';
      let title = '消息提示';
      this.$router.addTab({
        name: route,
        title: title,
        key: '1',
        data: {}
      });
    },
    /**
     * 修改密码
     */
    modifyPwdFn () {
      this.pwdDialogVisible = true; // 打开修改密码弹出框
    },
    logoutFn () {
      const _this = this;
      _this
        .$confirm(_this.$t('component.qdsftcdl'), _this.$t('component.ts'), {
          confirmButtonText: _this.$t('component.qd'),
          cancelButtonText: _this.$t('component.qx'),
          type: 'warning'
        })
        .then(function () {
          _this.logout();
        });
    },
    /**
     * 阅读消息
     */
    readMsg (msg) {
      var _this = this;
      _this.$alert(msg.noticeContent, '详细内容', { confirmButtonText: '确定' });
      // let model = {};
      // yufp.clone(msg, model);
      // model.messageStatus = '2';
      // yufp.service.request({
      //   method: 'POST',
      //   url: _this.updateUrl,
      //   data: model,
      //   callback: function (code, message, response) {
      //     console.info('this.userMessages111================', _this.userMessages)
      //     if (response.code != '0') {
      //       _this.$message({ message: '更新失败！', type: 'error'});
      //     } else {
      //       var index = _this.indexOf(msg.serno)
      //       if(index > -1) {
      //         _this.userMessages.splice(index, 1)
      //       }
      //     }
      //   }
      // });
      var ids = [];
      ids[0] = msg.noticeId;
      yufp.service.request({
        method: 'GET',
        url: backend.appOcaService + '/api/notice/adminsmnoticeread/save',
        data: {noticeIds: ids.join(',')},
        callback: function (code, message, response) {
          console.info('this.userMessages111================', _this.userMessages);
          if (response.code != '0') {
            _this.$message({ message: '更新失败！', type: 'error'});
          } else {
            var index = _this.indexOf(msg.serno);
            if (index > -1) {
              _this.userMessages.splice(index, 1);
            }
          }
        }
      });
    },
    /**
    * 获取元素在数组中的索引
    */
    indexOf (val) {
      for (var i = 0; i < this.userMessages.length; i++) {
        if (this.userMessages[i].serno === val) { return i }
        return -1;
      }
    }
  }
};
</script>
<style>
.yu-frame-message-list .no-notice-data {
  text-align: center;
  font-size: 14px;
  position: absolute;
  top: 36%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
