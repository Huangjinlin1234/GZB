/**
 * @created by helin3 2021-04-13
 * @updated by
 * @description 自定义dialog插件
 * 示例：
 * this.$dialog.open('新增', 'project/module3/dialog_BillCard', -1, -1, {type: 'ADD'}, callbackFn)
 * this.$dialog.close(id,data)
 * this.$dialog.closeAll()
 */

import store from '@/store';
import router from '@/router';
import i18n from '@/locale'; // Internationalization

// 加载的页面里面要添加如下两个属性，用于接收参数及弹窗ID
// props: {
//   pageParams: Object,
//   dialogId: String
// },

// 弹出框vm对象实例存活表
const vmAlive = {};
// 弹出框vm对象实例种子自增值
let vmSeed = -1;
/**
 * 获取自增弹出框唯一标识
 */
const getSeedId = () => {
  vmSeed++;
  return 'DIALOG_' + vmSeed;
};
/**
 * 默认弹出框属性配置
 */
const emptyFn = () => { };

/**
 * 打开弹出框页面
 * @param {String} title 弹出框标题
 * @param {String} dotVuePath 弹出框页面路径
 * @param {Integer|String} width 宽度
 * @param {Integer|String} height 高度
 * @param {Object} pageParams 页面参数（注仅用于传递简单参数，避免传递页面句柄对象，否则容易造成内存泄漏）
 * @param {Function} callback(data) 回调方法，接收回调数据
 * @param {Function} beforeColseCallback() 关闭按钮回调函数
 * @returns dialogId 弹出框ID
 */
const open = (title = '', dotVuePath, width, height, pageParams = {}, callback = emptyFn, beforeColseCallback = emptyFn) => {
  width = width == -1 ? document.body.clientWidth - 240 : width;
  height = height == -1 ? document.body.clientHeight - 108 : height;
  width = typeof width === 'string' && width.indexOf('%') != -1 ? width : width + 'px';
  height = typeof height === 'string' && height.indexOf('%') != -1 ? height : height + 'px';
  const dialogId = getSeedId();
  const bodyComponent = () => require('@/views/' + dotVuePath).default;
  const vm = new window.Vue({
    router,
    store,
    i18n,
    data () {
      return {
        visible: true
      };
    },
    methods: {
      beforeClose () {
        try {
          beforeColseCallback instanceof Function && beforeColseCallback();
        } catch (e) {
          window.console.error(e);
        }
        this.$destroy();
      },
      updateVisible (val) {
        this.visible = val;
      },
      closeDialog (data) {
        try {
          callback && callback(data, this);
        } catch (e) {
          window.console.error(e);
        }
        this.visible = false;
      }
    },
    render (h) {
      // 外层使用yu-xdialog组件
      return h('yu-xdialog', {
        ref: 'dialog-inner',
        props: {
          visible: this.visible,
          beforeClose: this.beforeClose,
          title: title,
          width: width,
          height: height
        },
        on: {
          'update:visible': this.updateVisible
        }
      }, [
        // 内层使用传入页面（.vue页面对象）
        h(bodyComponent(), {
          props: {
            dialogId: dialogId,
            pageParams: pageParams
          }
        })
      ]);
    }
  }).$mount();

  vmAlive[dialogId] = vm;
  return dialogId;
};

/**
 * 关闭弹出框
 * @param {*} id
 * @param {*} data
 */
const close = (id, data = {}) => {
  let vm = vmAlive[id];
  if (vm) {
    delete vmAlive[id];
  }
  vm.closeDialog(data);
  vm = null;
};

/**
 * 关闭所有弹出框，避免内存泄漏
 * TODO 如果弹出框弹出后，还操作关闭菜单页面，要调用此处几个方法来释放内存
 */
const closeAll = () => {
  for (let key in vmAlive) {
    close(key);
  }
};

export default {
  install (Vue) {
    // 绑定至Vue原型链上，方便页面直接使用
    Vue.prototype.$dialog = {
      open,
      close,
      closeAll
    };
  }
};
