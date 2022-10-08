<!--
  @Created by zhuly8@yusys.com.cn 2021-01-30
  @updated by
  @description 登录页面
 -->
<template>
  <div class="yu-login" :class="lightModel ? 'yu-login-light' : ''">
    <div class="yu-bank-logo"></div>
    <div>
      <div class="yu-new-start-bg"></div>
      <div class="yu-login-box-new" @keyup.13="loginFn">
        <div class="yu-login-logo" v-if="logoinfo">
          <img src="../../../assets/common/images/logo1.png" />
        </div>
        <div class="welcome_word">
          WELCOME TO THE SYSTEM
        </div>
        <ul class="yu-login-form">
          <li>
            <input id="username" v-model="username" type="text" :placeholder="$t('login.zh')" />
            <i class="yu-icon-user"></i>
          </li>
          <li>
            <input id="password" v-model="password" type="password" :placeholder="$t('login.mm')" />
            <i class="yu-icon-lock"></i>
          </li>
          <li>
            <input id="code" type="text" :placeholder="$t('login.yzm')" ref="imageCode" v-model="imageCode" />
            <i class="yu-icon-details"></i>
            <img class="yu-login-code" :title="$t('login.tpkbqdjhyz')" @click="freshImageCodeFn" :src="imageCodePicture" />
          </li>
          <!--<li class="checkbox_li">
            <yu-checkbox id="remember" type="checkbox"></yu-checkbox>
            <label for="remember">{{ $t('login.jzyh') }}</label>
            <span>{{ $t('login.wjmm') }}</span>
          </li>-->
          <li class="submit-btn">
            <yu-button id="submitBtn" style="background: #183075; margin-top: 16px;" type="primary" v-norepeat.loading="btnLoginLoading" @click="loginFn">{{ $t('login.dl') }}</yu-button>
          </li>
          <li class="msg" v-show="message">
            <span class="yu-icon-warning1"></span>
            <span class="yu-login-msg" id="msg">{{ message }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="yu-login-footer" v-html="$t('login.yxkj')"></div>
    <!-- 首次登录 修改密码 -->
    <yufp-password-modify :dialog-visible.sync="dialogVisible" :login-code-first="loginCode" :old-passWord="password" :first-login-res="firstLoginRes" :first-login="true">
    </yufp-password-modify>
  </div>
</template>
<script>
/* eslint camelcase:0 */
/* eslint vars-on-top:0 */
/* eslint no-inner-declarations:0 */
import {
  loginFn,
  getPubkey
} from '@/api/common/oauth';
// import {sm2Encrypt} '@/utils/sm2'
import { genUUID } from '@/utils/xutils.js';
// import { JSEncrypt } from 'jsencrypt';
import JSEncrypt from 'jsencrypt';
import { getRSAPublicKey, getSystemName } from '@/utils/util';
const isIdentifingCode = process.env.VUE_APP_IDENTIFING_CODE === 'true';

export default {
  name: 'YuLogin',
  props: {
    // 登录页logo
    logoinfo: {
      type: Object,
      default () {
        return {
          url: require('@/assets/common/images/zrcbank.png'),
          assisttext: getSystemName()
        };
      }
    },
    // 公司名称
    corpName: {
      type: String,
      default: '宇信银行'
    }
  },
  data: function () {
    return {
      lightModel: false, // 浅色模式开关
      username: '',
      password: '',
      localToken: null,
      message: null,
      borderColor: null,
      imageCode: '', // 验证码
      imageUUID: genUUID(16, 16) + Date.parse(new Date()),
      imageCodePicture: this.freshImageCodeFn(),
      btnLoginLoading: { // 控制登录按钮loading
        show: false
      },
      resetPwdFormData: {
        oldPassWord: null,
        newPassWord: null,
        confirmPassWord: null
      },
      dialogVisible: false,
      firstLoginRes: {}, // 首次登录返回对象
      clientId: ''
    };
  },
  computed: {
    loginCode: function () {
      return this.username;
    }
  },
  created () {
    this.clientId = genUUID(16, 16);
  },
  mounted: function () {
    this.freshImageCodeFn();
  },
  destroyed: function () {
  },
  methods: {

    freshImageCodeFn: function () {
      // var clientId = genUUID(16, 16);
      this.imageCodePicture = backend.uaaService + '/api/codeImage?clientId=' + this.clientId + '&t=' + (new Date()).getTime();
      this.imageCode = '';
      return this.imageCodePicture;
    },
    loginFn: function () {
      this.message = '';
      var nameEl = document.getElementById('username');
      var pwdEl = document.getElementById('password');
      var codeEl = document.getElementById('code');
      if (this.username === '') {
        this.message = this.$t('login.qsryhm');
        nameEl.focus();
        return;
      }
      if (this.password === '') {
        this.message = this.$t('login.qsrmm');
        pwdEl.focus();
        return;
      }
      if (isIdentifingCode && this.imageCode === '') {
        this.message = this.$t('login.qsryzm');
        codeEl.focus();
        return;
      }
      var _this = this;
      this.btnLoginLoading.show = true;
      this.borderColor = 'lightgreen';
      getPubkey().then(response => {
        if (response.code === '0') {
          var data = {
            usercode: _this.username,
            password: _this.encryptPassword(_this.password),
            imageCode: _this.imageCode,
            clientId: _this.clientId,
            grant_type: 'password'
          };
          // data = {'usercode': 'admin', 'password': 'NIasITc4CRiFyH+0S+JHGIU8GKzJOGJQjOwt4YpcY7xpMLhBQYtf5qNbdRJRb/mFML3nzvNzGtJuxqQQrEL8twkCIc+taBubDIB40fBR0SO76oGD0ZWKmk8MeZ6/tRSJ2VAc/lM8m3o2QGFtgSCOfyQD/jjwNLCt/J0C3ocZB1g=', 'imageCode': '71x7', 'clientId': '3118D683EC6E064E', 'grant_type': 'password'};
          this.handleLogin(data);
        }
      });
    },
    handleLogin (data) {
      loginFn(data).then(response => {
        this.btnLoginLoading.show = false;
        if (response && response.rows && response.code === '0') { // 1、登录成功
          this.message = null;
          this.$store.commit('oauth/SET_TOKEN', {
            access_token: response.rows,
            expires_in: 99999
          });
          this.$store.dispatch('oauth/getAccessInfo').then((resData) => {
            this.redirectToFrame();
          });
        } else {
          this.freshImageCodeFn();
        }
        if (response && response.code === '10000002') { // 2、首次登录
          var _this = this;
          _this.$confirm(_this.$t('login.scdlmmxg'), _this.$t('component.msg_title'), {
            confirmButtonText: _this.$t('component.btn_confirm'),
            cancelButtonText: _this.$t('component.btn_cancel'),
            type: 'warning'
          }).then(function () {
            _this.freshImageCodeFn();
            // 保存 token信息用于修改密码后登出
            _this.$store.commit('oauth/SET_TOKEN', {
              access_token: response.access_token,
              expires_in: response.expires_in
            });
            const { access_token, expires_in } = response;
            _this.localToken = { access_token, expires_in }; // 暂存，此时还不能访问需要认证的资源
            _this.firstLoginRes = response;
            _this.dialogVisible = true;
            // _this.message = response.message ? response.message : _this.$t('login.scdlmmxg');
          });
        }
      }).catch((e) => {
        const response = e.response.data;
        this.btnLoginLoading.show = false;
        this.message = response.message || this.$t('login.dlsbqlxxtgly');
        this.freshImageCodeFn();
      });
    },
    redirectToFrame: function () {
      this.$router.push({ path: '/dashboard' });
    },
    // 登录密码加密
    encodePassword: function (pwd) {
      var encryptPwd = this.encryptPassword(pwd);
      // #TODO 不进行encodeURIComponent编码
      // var encodePwd = encodeURIComponent(encryptPwd);
      // return encodePwd;
      return encryptPwd;
    },
    // 匹配密码加密
    encryptPassword: function (pwd) {
      var encryptor = new JSEncrypt();
      encryptor.setPublicKey(getRSAPublicKey());
      return encryptor.encrypt(pwd);
    }
  }
};
</script>

<style lang="scss">
@import "~~assets/common/login.css";
</style>
