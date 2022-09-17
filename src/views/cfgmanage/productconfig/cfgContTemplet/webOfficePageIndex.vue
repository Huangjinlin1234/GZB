<template>
  <div class="office-box">
   <!-- <table width="100%" bgcolor="#cccccc" cellpadding="1" cellspacing="1">
       <tr>
        <td valign="top" width="150" bgcolor="white" align="center">
          <table id="tablebut">
            <tr>
              <td valign="top">
                <input type="hidden" name="oper" value="doedit" id="oper">
                <b>保存操作</b>
                <input type="button" class="button" value="同步保存" style="width:80px" @click="WebHttpSave()"><br>
                <input type="submit" class="button" value="异步保存" @click="WebSave()"><br>
                <input type="button" class="button" value="重调文档" @click="WebDocReload()"><br>
                <b>复制</b>
                <input type="button" class="button" value="充许复制" @click="NoCopyIt(0)"><br>
                <input type="button" class="button" value="不充许复制" @click="NoCopyIt(1)"><br>
                <b>打开保存</b>
                <input type="button" class="button" value="打开方式一" @click="WebOpen1()"><br>
                <input type="button" class="button" value="打开方式二" @click="WebOpen2()"><br>
                <input type="button" class="button" value="打开方式三" @click="WebOpen3()"><br>
                <input type="button" class="button" value="新建文件EXCEL" @click="CreateXLS()"><br>
                <input type="button" class="button" value="新建文件WORD" @click="CreateDoc()"><br>
                <input type="button" class="button" value="新建文件PPT" @click="CreatePpt()"><br>
                <input type="button" class="button" value="保存到C:\a.doc" @click="WebSaveC()"><br>
                <input type="button" class="button" value="打开本地文件" @click="WebOpenLocal()"><br>
                <input type="button" class="button" value="存为本地文件" @click="WebSaveLocal()"><br>
                <input type="button" class="button" value="指定页保存" @click="WebSavePage()"><br>
                <input type="button" class="button" value="删除文件" @click="WebDelFile()"><br>
                <b>文档转换</b>
                <input type="button" class="button" value="保存本地PDF" @click="WebSaveLocalPdf()"><br>
                <input type="button" class="button" value="保存本地HTML" @click="WebSaveLocalHTML()"><br>
                <b>打印控制</b>
                <input type="button" class="button" value="打印预览" @click="WebDocPrintPreView()"><br>
                <input type="button" class="button" value="设置后打印一" @click="WebDocPrint()"><br>
                <input type="button" class="button" value="设置后打印二" @click="WebDocPrint2()"><br>
                <input type="button" class="button" value="直接打印" @click="WebPrintDirc()"><br>
                <b>窗口设置</b>
                <input type="button" class="button" value="关闭标题栏" @click="WebTitlebar(false)"><br>
                <input type="button" class="button" value="打开标题栏" @click="WebTitlebar(true)"><br>
                <input type="button" class="button" value="关闭菜单栏" @click="WebMenubar(false)"><br>
                <input type="button" class="button" value="打开菜单栏" @click="WebMenubar(true)"><br>
                <input type="button" class="button" value="关闭工具栏" @click="WebToolbar(false)"><br>
                <input type="button" class="button" value="打开工具栏" @click="WebToolbar(true)"><br>
                <b>文档视图</b>
                <input type="button" class="button" value="普通视图" @click="WebShowView(1)"><br>
                <input type="button" class="button" value="大纲视图" @click="WebShowView(2)"><br>
                <input type="button" class="button" value="页面视图" @click="WebShowView(3)"><br>
                <input type="button" class="button" value="打印预览" @click="WebShowView(4)"><br>
                <input type="button" class="button" value="主控视图" @click="WebShowView(5)"><br>
                <input type="button" class="button" value="WEB视图" @click="WebShowView(6)"><br>
                <input type="button" class="button" value="阅读视图" @click="WebShowView(7)"><br>
                <b>文档属性</b>
                <input type="button" class="button" value="Application示例" @click="WebGetUser()"><br>
                <input type="button" class="button" value="ActiveDocument示例" @click="WebActive()"><br>
                <input type="button" class="button" value="取得缓冲路径" @click="WebTempPath()"><br>
              </td>
              <td valign="top">
                <b>全屏显示</b>
                <input type="button" class="button" value="桌面全屏" @click="WebScreen()"><br>
                <b>鉴名盖章</b>
                <input type="button" class="button" value="手写签名" @click="WebDocSignature()"><br>
                <input type="button" class="button" value="添加财务章" @click="WebSignature(1)"><br>
                <input type="button" class="button" value="添加合同章" @click="WebSignature(2)"><br>
                <input type="button" class="button" value="添加行政章" @click="WebSignature(3)"><br>
                <b>书签/替换</b>
                <input type="button" class="button" value="替换文本" @click="WebReplace()"><br>
                <input type="button" class="button" value="添加书签" @click="WebAddMark()"><br>
                <input type="button" class="button" value="书签红色" @click="WebMarkRed()"><br>
                <input type="button" class="button" value="删除书签" @click="WebDelMark()"><br>
                <input type="button" class="button" value="获得书签" @click="WebGetMark()"><br>
                <input type="button" class="button" value="智能填充" @click="WebSmartAdd()" /><br />
                <input type="button" class="button" value="智能读取" @click="WebSmartRead()" /><br />
                <input type="button" class="button" value="设置套红SetFieldValue" @click="WebSetValue()"><br>
                <input type="button" class="button" value="插入图片" @click="WebAddPic()"><br>
                <input type="button" class="button" value="插入浮动图片" @click="WebAddFloatPic()"><br>
                <input type="button" class="button" value="EXCEL加入图片SetFieldValue" @click="WebXlsPic()"><br>
                <input type="button" class="button" name="insertword" value="插入WORD文档" @click="WebInsertDoc()"><br>
                <b>文档保护</b>
                <input type="button" class="button" value="文档完全保护" @click="WebProtect()"><br>
                <input type="button" class="button" value="文档解除保护" @click="WebUnProtect()"><br>
                <input type="button" class="button" value="保护后接受修订" @click="WebProtect1()"><br>
                <input type="button" class="button" value="保护后充许批注" @click="WebProtect2()"><br>
                <b>页面控制</b>
                <input type="button" class="button" value="文档页数" @click="WebDocumentPageCount()"><br>
                <input type="button" class="button" value="插入页眉" @click="add1()"><br>
                <input type="button" class="button" value="插入页码" @click="add2()"><br>
                <input type="button" class="button" value="插入字符" @click="add3()"><br>
                <input type="button" class="button" value="插入表格" @click="add4()"><br>
                <b>Word对话框</b>
                <input type="button" class="button" value="项目符号与编号ToolsBulletsNumbers" @click="add5()"><br>
                <input type="button" class="button" value="排序文字TableSort" @click="add6()"><br>
                <input type="button" class="button" value="字数统计ToolsWordCount" @click="add7()"><br>
                <input type="button" class="button" value="取消选择ShrinkSelection" @click="add8()"><br>
                <input type="button" class="button" value="选择全部EditSelectAll" @click="add9()"><br>
                <input type="button" class="button" value="插入页码InsertPageField" @click="add10()"><br>
                <input type="button" class="button" value="插入日期InsertDateField" @click="add11()"><br>
                <input type="button" class="button" value="插入时间InsertTimeField" @click="add12()"><br>
                <input type="button" class="button" value="页面设置FilePageSetup" @click="add13()"><br>
                <input type="button" class="button" value="制表位FormatTabs" @click="add14()"><br>
                <input type="button" class="button" value="样式FormatStyle" @click="add15()"><br>
                <input type="button" class="button" value="字体格式对话框FormatDefineStyleFont" @click="add16()"><br>
                <input type="button" class="button" value="制表位FormatDefineStyleTabs" @click="add17()"><br>
                <input type="button" class="button" value="样式FormatDefineStyleFrame" @click="add18()"><br>
                <input type="button" class="button" value="段落格式对话框FormatParagraph" @click="add19()"><br>
                <input type="button" class="button" value="节的样式FormatSectionLayout" @click="add20()"><br>
                <input type="button" class="button" value="分栏FormatColumns" @click="add21()"><br>
              </td>
              <td valign="top">
              </td>
            </tr>
          </table>
        </td>
        <td valign="top" bgcolor="white">
          <div id="WebOCX">
            <object classid="clsid:FF09E4FA-BFAA-486E-ACB4-86EB0AE875D5" codebase="http://www.officectrl.com/weboffice/WebOffice.ocx#Version=2018,1,6,2" id="WebOffice" width="100%" height="900">
              <param name="BorderStyle" value="1">
              <param name="Menubar" value="0">
              <param name="Titlebar" value="1">
              <param name="Toolbars" value="1">
            </object>
          </div>
        </td>
      </tr>
    </table>-->
    <div id="buttonDiv">
    <yu-button ref="btn_open" @click="openDoc" type="primary" >重新打开</yu-button>
    <yu-button ref="btn_save" @click="save" type="primary" >保存</yu-button>

    </div>
    <div id="WebOCX">
            <object classid="clsid:FF09E4FA-BFAA-486E-ACB4-86EB0AE875D5" codebase="http://www.officectrl.com/weboffice/WebOffice.ocx#Version=2018,1,6,2" id="WebOffice" width="100%" height="900">
              <param name="BorderStyle" value="1">
              <param name="Menubar" value="0">
              <param name="Titlebar" value="1">
              <param name="Toolbars" value="1">
            </object>
          </div>
  </div>
</template>
<script>
import * as WebCtrl from '@/assets/weboffice/WebOffice.js';
export default {
  data () {
    return {
      testvalue: '',
      WebOffice: '',
      filesuffix: '',
      bookmarkcfgList: []
    };
  },
  mounted () {
    WebCtrl.LoadCtrl(document.querySelector('#WebOCX'));
    if (document.getElementById('WebOffice')) {
      this.WebOffice = document.getElementById('WebOffice');
    }
    var first = this.$route.params.contTplPath.lastIndexOf('.');// 取到文件名开始到最后一个点的长度
    // 获取到文件路径的总长度
    var namelength = this.$route.params.contTplPath.length;// 取到文件名长度
    // 截取文件扩展名 格式
    this.filesuffix = this.$route.params.contTplPath.substring(first + 1, namelength);
    // 拼接字符串找到该文件的具体地址和路径
    this.WebOffice.LoadOriginalFile(window.location.protocol + '//' + window.location.host + this.$route.params.contTplPath, this.filesuffix);
    if (this.$route.params.officeOperType == 'print') {
      this.autoFill();
      var contPrintNum = this.$route.params.contPrintNum;
      this.$route.params['contPrintNum'] = parseInt(contPrintNum) + 1;
      this.$route.params['optType'] = 'onPrint';
      // 发送ajax请求修改合同表内 该合同打印次数字段CONT_PRINT_NUM
      yufp.service.request({
        async: false, // 同步请求
        url: backend.cmisBiz + '/api/ctrloancont/updateSelectiveByKey',
        data: JSON.stringify(this.$route.params),
        callback: function (code, message, response) {
          // console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
          if (response.data > 0) {
            this.$message('提示', '打印成功');
          }
        }
      });
    }
  },
  methods: {

    autoFill: function () {
      var _this = this;
      // 自动填充
      // 请求后台获取到模板中书签的名字和业务的参数的对应
      yufp.service.request({
        async: false, // 同步请求
        url: backend.cmisCfg + '/api/cfgcontmodebookmark/getlistbyconttplcode/' + this.$route.params.contTplCode,
        method: 'GET',
        callback: function (code, message, response) {
          if (response.code == '0') {
            var isComp = '1';
            if (response.data) {
              _this.bookmarkcfgList = response.data;
              _this.bookmarkcfgList.forEach(function (item) {
                if (item.dataCol && item.bookmarkName) {
                  console.log(item.bookmarkName);
                  console.log(this.$route.params[item.dataCol]);
                  this.WebOffice.SetFieldValue(item.bookmarkName, this.$route.params[item.dataCol], '');
                } else {
                  isComp = '2';
                }
              });
            }
            if (isComp == '2') {
              _this.$message('存在书签配置不完整');
            }
          }
        }
      });
    },


    openDoc: function () {
      this.WebOffice.LoadOriginalFile(window.location.protocol + '//' + window.location.host + this.$route.params.contTplPath, this.filesuffix);
    },


    save: function () {
      // this.WebOffice.Save();
      this.WebOffice.HttpInit();
      var postUrl = yufp.util.addTokenInfo(yufp.service.getUrl({ url: backend.cmisCfg + '/api/cfgconttpllabel/save' }));
      this.WebOffice.HttpAddPostString('pkId', this.$route.params.pkId);
      this.WebOffice.HttpAddPostCurrFile('docFile', '');

      console.log(postUrl);
      var returnValue = this.WebOffice.HttpPost(postUrl);
      if (returnValue == 'true') {
        this.$message('保存成功！');
      }
    },

    closeDoc: function () {
      this.WebOffice.CloseDoc(0);
    },

    addBookmark: function () {
      this.WebOffice.SetFieldValue('mark_name', '书签1', '::ADDMARK::');
    },

    getMarkValue: function () {
      var str = this.WebOffice.GetFieldValue('mark_name', '');
      // alert(str);
    },

    addJpg: function () {
      // this.WebOffice.SetFieldValue("jpg_mark","图片","::ADDMARK::");
      // this.WebOffice.SetFieldValue('jpg_mark', 'http://localhost:5500/yusp-bfp-web/yuxp/framework/themes/common/images/user_default_pic.png', '::JPG::');
    },


    NoCopyIt: function (e) {
      WebCtrl.isNotCopy(e);
    },
    WebSignature: function (e) {
      let strpic;
      if (e === 1) { strpic = '001.gif' }
      if (e === 2) { strpic = '002.gif' }
      if (e === 3) { strpic = '003.gif' }
      WebCtrl.WebSignature('http://www.officectrl.com/weboffice/images/' + strpic);
    },
    WebSave: function () {
      this.WebOffice.Save('http://www.officectrl.com/officecs/uploadedit.aspx?oper=edit&flsid=4167975720113410419&flag=1'); // uploadedit.aspx是表单一个文件上传的后二进制接收器
    },
    WebHttpSave: function () {
      this.WebOffice.HttpInit();
      this.WebOffice.HttpAddPostString('filename', '4167975720113410419.doc');
      this.WebOffice.HttpAddPostCurrFile('docfile', '');
      const strResults = this.WebOffice.HttpPost('http://www.officectrl.com/officecs/postsave.aspx'); // postsave.aspx是表单一个文件上传的后二进制接收器
      if (strResults === 'ok') {
        this.$msgbox.this.$msgbox.alert('保存成功！');
      }
    },
    WebDocReload: function () {
      window.location.reload();
    },
    WebOpen1: function () {
      this.WebOffice.WebLoadFile(
        'http://www.officectrl.com/weboffice/temp/%E6%95%B0%E6%8D%AE%E6%99%BA%E8%83%BD%E8%AF%86%E5%88%AB%E4%B8%BA%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AD%98%E5%82%A8%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE%E7%AE%97%E6%B3%95%2Edocx',
        'Word.Document'
      );
    },
    WebOpen2: function () {
      this.WebOffice.Close();
      this.WebOffice.WebOpen('http://www.officectrl.com/weboffice/temp/file1.doc', 'doc');
    },
    WebOpen3: function () {
      this.WebOffice.WebLoadFile('http://www.officectrl.com/weboffice/temp/file1.doc', null);
    },
    CreateXLS: function () {
      this.WebOffice.WebLoadFile('', 'xls');
    },
    CreateDoc: function () {
      this.WebOffice.WebLoadFile('', 'doc');
    },
    CreatePpt: function () {
      this.WebOffice.WebLoadFile('', 'ppt');
    },
    WebSaveC: function () {
      this.WebOffice.ActiveDocument.SaveAs('c:\\a.doc');
      this.$msgbox.alert('已保存到c盘a.doc');
    },
    WebOpenLocal: function () {
      this.WebOffice.showdialog(1);
    },
    WebSaveLocal: function () {
      this.WebOffice.showdialog(3);
    },
    WebSavePage: function () {
      this.WebOffice.SetPageAs('c:\\b.doc', 1, 0);
      this.$msgbox.alert('已将文档第1页的内容另存为c盘根目录下的b.doc文件');
    },
    WebDelFile: function () {
      this.WebOffice.DeleteLocalFile('c:\\a.doc');
      this.$msgbox.alert('已将c盘根目a.doc删除');
    },
    WebSaveLocalPdf: function () {
      const pdfile = 'c:\\a.pdf';
      this.WebOffice.ActiveDocument.ExportAsFixedFormat(pdfile, 17);
      this.$msgbox.alert('已在C盘根目录下生成' + pdfile + '，请到你本地电脑的C盘目录查看！');
    },
    WebSaveLocalHTML: function () {
      const htmlfullpath = 'c:\\a.html';
      this.WebOffice.ActiveDocument.saveas(htmlfullpath, 8);
      this.$msgbox.alert('已在C盘根目录下生成' + htmlfullpath + '，请到你本地电脑的C盘目录查看！');
    },
    WebGetUser: function () {
      const app = this.WebOffice.GetApplication;
      this.$msgbox.alert('用Application对象取得当前WORD文档用户名是：' + app.username);
    },
    WebActive: function () {
      this.WebOffice.WebDialogs(129);
    },
    WebTempPath: function () {
      const a = this.WebOffice.TempFilePath;
      this.$msgbox.alert(a);
    },
    WebDocPrintPreView: function () {
      this.WebOffice.ActiveDocument.Application.PrintPreview = 1;
    },
    WebDocPrint: function () {
      this.WebOffice.printout(true);
    },
    WebDocPrint2: function () {
      this.WebOffice.ActiveDocument.Application.Dialogs(88).Show();
    },
    WebPrintDirc: function () {
      this.WebOffice.ActiveDocument.PrintOut();
    },
    WebTitlebar: function (e) {
      this.WebOffice.Titlebar = e;
    },
    WebMenubar: function (e) {
      this.WebOffice.MenuBars = e;
    },
    WebToolbar: function (e) {
      this.WebOffice.Toolbars = e;
    },
    WebShowView: function (e) {
      this.WebOffice.ShowView(e);
    },
    WebDocSignature: function () {
      try {
        const hr = this.WebOffice.WebSign();
        if (hr) {
          const doc = this.WebOffice.ActiveDocument;
          this.WebOffice.SetFieldValue('mark_1', '', '::ADDMARK::');
          const strFile = this.WebOffice.WebSignTempFile;
          this.WebOffice.SetFieldValue('mark_1', strFile, '::FLOATJPG::');
          // this.WebOffice.WebSignTempFileDel();
        } else {
          this.$msgbox.alert('Word文档下可用本功能!');
        }
      } catch (e) {
        this.$msgbox.alert(e);
      }
    },
    WebScreen: function (e) {
      this.WebOffice.WebFullScreen();
    },
    WebReplace: function () {
      this.$msgbox.alert('本次替换示例将WORD文档里面a字母替换成b字母!');
      this.WebOffice.ReplaceText('a', 'b', 0);
    },
    WebAddMark: function (e) {
      this.WebOffice.SetFieldValue('mark_1', 'test', '::ADDMARK::');
    },
    WebMarkRed: function (e) {
      this.WebOffice.SetFieldValue('mark_1', '255', '::SETCOLOR::');
    },
    WebDelMark: function (e) {
      this.WebOffice.SetFieldValue('mark_1', '', '::DELMARK::');
    },
    WebGetMark: function (e) {
      this.WebOffice.SetFieldValue('mark_1', '', '::GETMARK::');
    },
    WebSmartAdd: function (e) {
      this.$msgbox.alert('本功能接下来演示从服务器远程加载一个模板文档mark.doc到光标当前位置，此模板内部有两个隐藏的域：姓名和手机号。');
      this.WebOffice.InSertFile('http://www.officectrl.com/weboffice/temp/mark.doc', 0);
      this.WebOffice.SetFieldValue('姓名', '', '::GETMARK::');
      this.$msgbox.alert('模板已加载成功，接下来对域：姓名和手机号，分别以：小王 和13612989282值进行自动填充！');
      this.WebOffice.SetFieldValue('姓名', '小王', '::ADDMARK::');
      this.WebOffice.SetFieldValue('手机号', '', '::GETMARK::');
      this.WebOffice.SetFieldValue('手机号', '13612989282', '::ADDMARK::');
    },
    WebSmartRead: function (e) {
      this.$msgbox.alert('本功能演示智能填充完成后，读取文档里的隐藏的域值：姓名和手机号实际的值！');
      const name = this.WebOffice.GetFieldValue('姓名', '');
      const hao = this.WebOffice.GetFieldValue('手机号', '');
      this.$msgbox.this.$msgbox.alert('姓名：' + name + '  手机号：' + hao);
    },
    WebSetValue: function (e) {
      this.WebOffice.SetFieldValue('mark_1', '', '::ADDMARK::');
      this.WebOffice.SetFieldValue('mark_1', 'http://www.officectrl.com/weboffice/temp/file1.doc', '::FILE::');
    },
    WebAddPic: function (e) {
      const strRoot = 'http://www.officectrl.com/weboffice';
      this.WebOffice.SetFieldValue('mark_1', '', '::ADDMARK::');
      this.WebOffice.SetFieldValue('mark_1', strRoot + '/images/weboffice.jpg', '::JPG::');
    },
    WebAddFloatPic: function (e) {
      const strRoot = 'http://www.officectrl.com/weboffice';
      this.WebOffice.SetFieldValue('mark_1', '', '::ADDMARK::');
      this.WebOffice.SetFieldValue('mark_1', strRoot + '/images/weboffice.jpg', '::FLOATJPG::');
    },
    WebXlsPic: function (e) {
      this.WebOffice.SetFieldValue('mark_1', 'test', '::ADDMARK::');
      this.WebOffice.SetFieldValue('mark_1', 'http://www.officectrl.com/weboffice/images/weboffice.jpg', '::JPG::');
    },
    WebInsertDoc: function (e) {
      this.WebOffice.InSertFile('http://www.officectrl.com/weboffice/temp/file1.doc', 0);
    },
    WebProtect: function (e) {
      this.WebOffice.ProtectDoc(1, 2, '123');
    },
    WebUnProtect: function (e) {
      this.WebOffice.ProtectDoc(0, 0, '123');
    },
    WebProtect1: function (e) {
      this.WebOffice.ProtectDoc(1, 0, '123');
    },
    WebProtect2: function (e) {
      this.WebOffice.ProtectDoc(1, 1, '123');
    },
    WebDocumentPageCount: function (e) {
      const intPageTotal = this.WebOffice.ActiveDocument.Application.ActiveDocument.BuiltInDocumentProperties(14);
      this.$msgbox.alert('文档页总数：' + intPageTotal);
    },
    add1: function (e) {
      this.WebOffice.ActiveDocument.ActiveWindow.ActivePane.View.SeekView = 9;
    },
    add2: function (e) {
      this.WebOffice.WebDialogs(294);
    },
    add3: function (e) {
      this.WebOffice.WebDialogs(162);
    },
    add4: function (e) {
      this.WebOffice.WebDialogs(129);
    },
    add5: function (e) {
      this.WebOffice.WebDialogs(196);
    },
    add6: function (e) {
      this.WebOffice.WebDialogs(199);
    },
    add7: function (e) {
      this.WebOffice.WebDialogs(228);
    },
    add8: function (e) {
      this.WebOffice.WebDialogs(236);
    },
    add9: function (e) {
      this.WebOffice.WebDialogs(237);
    },
    add10: function (e) {
      this.WebOffice.WebDialogs(239);
    },
    add11: function (e) {
      this.WebOffice.WebDialogs(240);
    },
    add12: function (e) {
      this.WebOffice.WebDialogs(241);
    },
    add13: function (e) {
      this.WebOffice.WebDialogs(178);
    },
    add14: function (e) {
      this.WebOffice.WebDialogs(179);
    },
    add15: function (e) {
      this.WebOffice.WebDialogs(180);
    },
    add16: function (e) {
      this.WebOffice.WebDialogs(181);
    },
    add17: function (e) {
      this.WebOffice.WebDialogs(183);
    },
    add18: function (e) {
      this.WebOffice.WebDialogs(184);
    },
    add19: function (e) {
      this.WebOffice.WebDialogs(175);
    },
    add20: function (e) {
      this.WebOffice.WebDialogs(176);
    },
    add21: function (e) {
      this.WebOffice.WebDialogs(177);
    }
  }
};
</script>
<style scoped>
.office-box {
  font-size:12px;
}
.office-box b {
  display: block;
  margin: 8px 0;
  text-align: center;
  color: green;
}
.button {
  width:80px;
  height:20px;
  line-height: 20px;
  padding: 2px 0;
   font-size: 12px;
  color: #000080;
  background-color: #C6D7EF;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
}
</style>