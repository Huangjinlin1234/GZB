/**
 * @created by helin3 2019-04-09
 * @updated by
 * @description 系统公共（登录、页签、Header） en语言包
 */
import elementEnLocale from 'yuwp-ui/lib/locale/lang/en' // yuwp-ui lang

export default {
  ...elementEnLocale,
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  component: {
    'document_title': 'YUDP Unified Development Platform - Yusys Technologies',
    'tools_expand': 'Fold/Extend',
    'tools_mode': 'Switch Mode',
    'tools_theme': 'Set Theme',
    'tools_common': 'Common Functions',
    'tools_password': 'Change Password',
    'tools_languge': 'Select Language',
    'cst': 'cst',
    'bus': 'bus',
    'cpy': 'cpy',
    'gjz': 'Keywords',
    'themes': 'them',
    'skin': 'skin',
    'model': 'model',
    'layout': 'layout',
    'font': 'font',
    'language': 'Language',
    'thems_d': 'Default',
    'thems_o': 'Orange',
    'thems_s': 'Simplicity',
    'lang_z': 'Chinese',
    'lang_e': 'English',
    'pwd_modify': 'Change Password',
    'qdsfdc': 'Confirm export?',
    'export': 'export',
    'exporting': 'exporting',
    'dcwjgd': 'The exported file is too large, please enter query criteria！',
    'export_fail': 'Export failed',
    'export_success': 'Export succeeded',
    'confirm_down': 'Export succeeded. Are you sure you want to download?',
    'excel_import': 'import',
    'down_temp': 'Download temp',
    'fileLimit': 'The import file size cannot exceed ',
    'import_fail': 'Failed to import Excel',
    'import_success': 'import excel successfully',
    'exit_001': 'Confirm to log out of the system, continue or not?',
    'msg_title': 'Prompt',
    'btn_confirm': 'Confirm',
    'btn_cancel': 'Cancel',
    'btn_close': 'Close',
    'btn_clear': 'Clear',
    'btn_search': 'Search',
    'btn_reset': 'Reset',
    'btn_delete': 'Delete',
    'btn_close_all': 'Close All',
    'btn_close_current': 'Close Current',
    'btn_close_others': 'Close Others',
    'btn_refresh': 'Refresh Current',
    'lookup_001': ']Dictionary bind method parameter error',
    'lookup_002': ']Dictionary does not loaded!',
    'lookup_003': '[',
    'service_001': 'Request URL not set',
    'session_001': 'The session has expired and will redirect to the login page.',
    'util_001': 'Wrong number of method parameters',
    'util_002': 'Method currently only supports objects',
    'util_003': 'Request URL must be set!',
    'down_fail': 'File download failed!',
    'util_004': 'Log upload failed',
    'util_005': 'Login System',
    'util_006': 'Logout System',
    'util_007': 'Login',
    'util_008': 'Logout',
    'warn': 'warning',
    'valid_num_001': 'Wrong number type!',
    'valid_age_001': 'Illegal age',
    'valid_code_001': 'Incorrect zip code format',
    'valid_ip_001': 'Incorrect IP address format',
    'valid_phone_001': 'Incorrect format of landline or PHS',
    'valid_phone_002': 'Incorrect format of landline',
    'valid_text_007': 'Please enter number and letter',
    'valid_phone_003': 'Incorrect mobile phone number',
    'valid_card_001': 'Illegal ID number area',
    'valid_card_002': 'Wrong birth date of ID card number',
    'valid_card_003': 'There is an error in the verification of the last check digit of the ID card number. Please pay attention to the case of x',
    'valid_card_004': 'The number of digits of ID card number is wrong. It should be 15 or 18',
    'valid_zh_001': 'Chinese only',
    'valid_trim_001': 'There are spaces at the beginning and the end of the input item',
    'valid_email_001': 'Incorrect email format',
    'valid_num_002': 'Please enter decimal',
    'valid_num_003': 'Please enter a non-zero positive integer',
    'valid_msg_001': 'Input information contains special characters',
    'EIFormXU_001': 'Modify trace information',
    'mTrace_col_001': 'Modified field',
    'mTrace_col_002': 'Before modified',
    'mTrace_col_003': 'After modified',
    'mTrace_col_004': 'Modifier',
    'mTrace_col_005': 'Modification time',
    'EIFormXU_msg_001': 'Utrace uPkValue parameter is not configured',
    'history_msg_002': 'By user',
    'history_msg_003': 'from',
    'history_msg_004': 'Modified to',
    'EITableXU_msg_001': 'ElTableX dataUrl parameter is not configured',
    'EITinymceX_msg_001': 'Your browser doesn\'t support XMLHttp',
    'EITinymceX_msg_002': 'Delete successfully',
    'EITinymceX_msg_003': 'Subheading',
    'EITinymceX_msg_004': 'text',
    'EITinymceX_msg_005': 'Common label',
    'selector_msg_001': 'Please select one piece of data first',
    'selector_msg_002': 'Subtask selector',
    'selector_col_001': 'Task Name',
    'selector_col_002': 'Running mode',
    'selector_col_003': 'Cron',
    'selector_col_004': 'Person in charge',
    'cronEditor_temp_001': 'Wildcards allowed',
    'cronEditor_temp_002': 'Cycle from',
    'cronEditor_temp_003': 'start, every',
    'cronEditor_temp_004': 'Monthly',
    'cronEditor_temp_005': 'Last day of the month',
    'cronEditor_temp_006': '',
    'cronEditor_temp_007': 'Last week of the month',
    'cronEditor_temp_008': 'Execute once',
    'cronEditor_temp_009': 'day,The latest job',
    'cronEditor_temp_0010': '\'s,today',
    'cronEditor_temp_unspecified': 'unspecified',
    'cronEditor_temp_appoint': 'appoint',
    'cronEditor_year': 'year',
    'cronEditor_month': 'Month',
    'cronEditor_week': 'Week',
    'cronEditor_xiqi': 'Week',
    'cronEditor_day': 'Day',
    'cronEditor_hour': 'Hour',
    'cronEditor_minute': 'Minute',
    'cronEditor_second': 'Second',
    'cronEditor_temp_expression': 'Expression',
    'cronEditor_msg_001': 'Incorrect expression:',
    'cronEditor_msg_002': 'Request successful',
    'cronEditor_msg_003': 'This operation will reset all conditions. Do you want to continue?',
    'cronEditor_msg_004': 'Last five times',
    'DemoSelector_temp_001': 'Custom sample selector',
    'DemoSelector_col_001': 'Encoding',
    'DemoSelector_col_002': 'Name',
    'DemoSelector_col_003': 'Type',
    'DemoSelector_col_004': 'Author',
    'DemoSelector_col_005': 'Auditor',
    'DemoSelector_col_006': 'Reading number',
    'DemoSelector_col_007': 'Status',
    'DptTree_placeholder_001': 'Please select a department',
    'DutySelector_temp_001': 'Institutional Job Management',
    'DutySelector_temp_002': 'Job',
    'DutySelector_field_001': 'Please select a job',
    'DutySelector_field_002': 'Job Code',
    'DutySelector_field_003': 'Job Name',
    'DutySelector_field_004': 'Organization No',
    'DutySelector_field_005': 'status',
    'DutySelector_msg_001': 'You can only select one data',
    'ExcelExport_temp_001': 'Export',
    'ExcelExport_temp_002': 'Download',
    'ExcelExport_msg_001': 'Exporting',
    'ExcelExport_msg_002': 'Export failed',
    'ExcelExport_msg_003': 'Fail',
    'ExcelExport_msg_004': 'Export completed',
    'ExcelExport_msg_005': 'Export succeeded, please click download button to download the file!',
    'ExcelExport_msg_006': 'Download failed!',
    'ExcelImport_prop_001': 'Importing...',
    'ExcelImport_prop_002': 'Choose file',
    'ExcelImport_msg_001': 'File removed successfully',
    'ExcelImport_msg_002': 'File upload failed!',
    'ExcelImport_msg_003': 'The file can only be in Excel format!',
    'ExcelImport_msg_004': 'File size cannot exceed',
    'ExcelImport_msg_005': 'Import successfully',
    'ExcelImport_msg_006': 'Import fail',
    'ExcelImport_msg_007': 'The plug-in sparkmd5 is missing, please add a reference!',
    'browser_prompt': 'The browser does not support FileReader',
    'OrgTree_msg_001': 'Please select a organization',
    'RoleSele_temp_001': 'Institutional Role Management',
    'RoleSele_temp_002': 'Role',
    'RoleSele_msg_001': 'Please select a role',
    'RoleSele_col_001': 'Role Code',
    'RoleSele_col_002': 'Role Name',
    'RoleSele_col_003': 'Role Level',
    'RoleSele_col_004': 'Organization No',
    'RoleSele_col_005': 'Status',
    'tempSele_temp_001': 'Data Permission Template Selector',
    'tempSele_col_001': 'Template Name',
    'tempSele_col_002': 'SQL Placeholder Name',
    'tempSele_col_003': 'Data Permission SQL Condition',
    'tempSele_col_004': 'Latest Change User',
    'tempSele_col_005': 'Latest Change Time',
    'UploadTable_col_001': 'User',
    'UploadTable_col_002': 'Please select a user',
    'UploadTable_col_003': 'Job',
    'UploadTable_col_004': 'Login Code',
    'UploadTable_col_005': 'Name',
    'UploadTable_msg_001': 'Delete successfully!',
    'UploadTable_temp_001': 'Institutional User Management',
    'UploadTable_temp_002': 'Upload',
    'UploadTable_col_006': 'Organization No',
    'UploadTable_col_007': 'Organization Name',
    'WfInit_temp_001': 'Select a person',
    'WfInit_temp_002': 'Select and Return',
    'WfInit_col_001': 'Agent handling',
    'WfInit_col_002': 'Both handler and agent can handle',
    'WfInit_col_003': 'Handled by the original handler',
    'WfInit_col_004': 'Handler ID',
    'WfInit_col_005': 'Handler Name',
    'WfInit_msg_001': 'Failed to save process comments',
    'WfInit_msg_002': 'Failed to get instance information',
    'WfInit_msg_003': 'Initialize process failed',
    'WfInit_msg_004': 'No next node',
    'WfInit_msg_005': 'No next node handler',
    'WfInit_msg_006': 'Please select a piece of data',
    'WfInit_msg_007': 'Please select at least one piece of data!',
    'WfInit_msg_008': 'Please select the next node',
    'WfInit_msg_009': 'Please select the next handler',
    'WfInit_msg_010': 'The process is initiated successfully. The next node is:',
    'WfInit_msg_011': ', the next handler is:',
    'WfInit_msg_012': 'Process submission failed',
    'access': 'access',
    'path': 'path:',
    'access_menu': 'Access menu:',
    'button_name': 'Menu name:',
    'button': 'Button',
    'SysMsg_001': 'You do not have permission to access, please contact the system administrator!',
    'SysMsg_002': 'System error, please contact the system administrator!',
    'IDE_preview': 'IDE-Auto Preview',
    'll': 'Li Lin',
    'msg1': 'Initiated the leave process',
    'dateTime1': 'one hour ago',
    'state': 'Pending approval',
    'lyz': 'Li Yuze',
    'msg2': 'Replied to your article "the trend of close integration of financial market and big data in 2019"',
    'dateTime2': 'two hours ago',
    'ckf': 'Chen Kefeng',
    'msg3': 'Initiated loan process',
    'dateTime3': 'five hours ago',
    'lw': 'Liu Wu',
    'msg4': 'sent you a letter in the station',
    'dateTime4': 'eight hours ago',
    'wcy': 'Wang Chiyu',
    'msg5': 'Initiated loan process',
    'dateTime5': 'one day ago',
    'handle': 'Handle',
    'checkInfo': 'Check Info',
    'cleanAll': 'Clean All',
    'checkMore': 'Check More',
    'currentSystem': 'currentSystem',
    'rightArrow': 'rightArrow',
    'leftArrow': 'leftArrow',
    'unfold': 'unfold',
    'menuShow1': 'shrink',
    'menuShow2': 'open',
    'auto': 'auto',
    'yes': 'yes',
    'no': 'no',
    'personalData': 'PersonalData',
    'changePassword': 'ChangePassword',
    'logout': 'Logout',
    'qdsftcdl': 'Are you sure to logout',
    'qd': 'Confirm',
    'qx': 'Cancel',
    'ts': 'Tips',
    'all': 'all',
    'todo': 'todo ',
    'message': 'message',
    'ptglxt': 'Platform Management System',
    'yysc': 'Mall application',
    'zxyy': 'Info application',
    'normal': 'normal',
    'compact': 'compact',
    'skinBlue': 'blue',
    'skinOrange': 'orange',
    'skinPurple': 'purple',
    'mr': 'default',
    'cx': 'search',
    'fullscreen': 'fullscreen',
    'pickup': 'pickup',
    'logOut': 'logOut',
    'left': 'left',
    'topLeft': 'topLeft',
    'topTree': 'topTree',
    'right': 'right',
    'expand': 'Expand',
    'operate': 'Operate',
    'notice': 'Notice',
    'qsczqgs': 'Please upload the file in the correct format',
    'sctpccgd': 'The size of the uploaded image is too large',
    'myhqwj': 'No file was obtained',
    'isloading': 'Uploading...'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Theme',
    size: 'Global Size'
  },
  i18nSwitch: {
    success: 'Switch Language Success'
  }
}
