/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */

// >>>> mutations:
export const SHOW_POPUP = 'SHOW_POPUP'

// 保存所有插件
export const SET_ALL_PLUGINS = 'SET_ALL_PLUGINS'

// 挂载loader
export const SET_LOADER = 'SET_LOADER'

// 卸载loader
export const DEL_LOADER = 'DEL_LOADER'

// 挂载socket
export const SET_SOCKET = 'SET_SOCKET'

// 展开或收起左边菜单
export const TOGGLE_MENU = 'TOGGLE_MENU'

// 折叠侧边栏菜单
export const FOLD_SIDE_MENU = 'FOLD_SIDE_MENU'

// 窗口全屏
export const TOGGLE_FULL_SCREEN = 'TOGGLE_FULL_SCREEN'

// 设置simulator属性
export const SET_SIMULATOR = 'SET_SIMULATOR'

// 激活组件
export const ACTIVE_COMPONENT = 'ACTIVE_COMPONENT'

// 添加组件
export const ADD_COMPONENT = 'ADD_COMPONENT'

// 保存活动模板数据至本地store，非数据库
export const SAVE_LOCAL_TEMPLATE = 'SAVE_LOCAL_TEMPLATE'

// 本地活动数据，新增一页
export const ADD_LOCAL_PAGE = 'ADD_LOCAL_PAGE'
// 本地活动数据，删除一页
export const DEL_LOCAL_PAGE = 'DEL_LOCAL_PAGE'

// 更新活动的整体属性
export const UPDATE_ACTIVITY_PROPERTY = 'UPDATE_ACTIVITY_PROPERTY'

// 初始化活动模板数据
export const INIT_LOCAL_TEMPLATE = 'INIT_LOCAL_TEMPLATE'

// 上一页
export const PREV_PAGE = 'PREV_PAGE'

// 下一页
export const NEXT_PAGE = 'NEXT_PAGE'

// 跳转到指定页
export const SET_CURRENT_PAGE_INDEX = 'SET_CURRENT_PAGE_INDEX'

// 显示全屏弹框
export const SHOW_FULL_SCREEN_POPUP = 'SHOW_FULL_SCREEN_POPUP'

// 关闭全屏弹框
export const HIDE_FULL_SCREEN_POPUP = 'HIDE_FULL_SCREEN_POPUP'

// 活动数据改变了
export const ACTIVITY_INFO_CHANGED = 'ACTIVITY_INFO_CHANGED'

// 活动数据未变化
export const ACTIVITY_INFO_UNCHANGED = 'ACTIVITY_INFO_UNCHANGED'

// 修改app header空白区域
export const SET_APP_HEAER = 'SET_APP_HEADER'

// 显示simulator的网格辅助线
export const SHOW_SIMULATOR_GRID = 'SHOW_SIMULATOR_GRID'

// 隐藏simulator的网格辅助线
export const HIDE_SIMULATOR_GRID = 'HIDE_SIMULATOR_GRID'

export const UPDATE_ACTIVE_POSITION = 'UPDATE_ACTIVE_POSITION'

export const SET_COMMENTS = 'SET_COMMENTS'

export const CACHE_ALL_ARTICLE_TAGS = 'CACHE_ALL_ARTICLE_TAGS'

export const SET_BODY_STYLES = 'SET_BODY_STYLES'

export const INIT_TOOLS = 'INIT_TOOLS'

export const SET_ACTIVE_TOOLS = 'SET_ACTIVE_TOOLS'

export const SET_INACTIVE_TOOLS = 'SET_INACTIVE_TOOLS'

export const SET_MAX_TOOL_COUNT = 'SET_MAX_TOOL_COUNT'

export const SET_ACTIVE_THEME_INDEX = 'SET_ACTIVE_THEME_INDEX'

// 设置空白页面 地址
export const SET_BLANK_HOME_PAGE = 'SET_BLANK_HOME_PAGE'

// 缓存用户自定义的主题图片
export const CACHE_CUSTOM_THEME_IMAGE = 'CACHE_CUSTOM_THEME_IMAGE'

// 缓存用户的配置
export const CACHE_USER_SETTINGS = 'CACHE_USER_SETTINGS'

// 清除本地缓存的用户配置
export const CHANGE_USER_SETTINGS = 'CHANGE_USER_SETTINGS'

// 播放音乐
export const PLAY_AUDIO = 'PLAY_AUDIO'

// 暂停播放音乐
export const PAUSE_AUDIO = 'PAUSE_AUDIO'

// 重置音乐设置
export const RESET_AUDIO = 'RESET_AUDIO'

// 设置音频音量
export const SET_AUDIO_VOLUME = 'SET_AUDIO_VOLUME'

// 设置音频播放模式
export const SET_AUDIO_MODE = 'SET_AUDIO_MODE'

// 修改播放列表
export const SET_AUDIO_LIST = 'SET_AUDIO_LIST'

// 缓存当前音乐时长
export const SET_AUDIO_DURATION = 'SET_AUDIO_DURATION'

// 设置audio DOM对象
export const SET_AUDIO_ELE = 'SET_AUDIO_ELE'

// 缓存网易云音乐登录信息
export const CACHE_NEM_LOGIN_INFO = 'CACHE_NEM_LOGIN_INFO'

// 缓存最近收听的歌单
export const CACHE_RECENTLY_PLAY_LIST = 'CACHE_RECENTLY_PLAY_LIST'

// 是否显示audio模块（audioSearch/audioBox）
export const SET_AUDIO_SHOWN = 'SET_AUDIO_SHOWN'

// 缓存登录信息
export const CACHE_LOGIN_INFO = 'CACHE_LOGIN_INFO'

// 获取缓存的登录信息
export const GET_LOGIN_INFO = 'GET_LOGIN_INFO'

// 清除登录信息
export const REMOVE_LOGIN_INFO = 'REMOVE_LOGIN_INFO'

// 更新登录信息
export const CHANGE_LOGIN_INFO = 'CHANGE_LOGIN_INFO'

// 更新头像
export const UPDATE_AVATAR = 'UPDATE_AVATAR'

// 缓存背景图片主色值
export const CACHE_MAIN_COLOR = 'CACHE_MAIN_COLOR'

// 缓存登录状态
export const CACHE_LOGIN_STATUS = 'CACHE_LOGIN_STATUS'

// 缓存socket connection
export const CACHE_SOCKET_CONNECTION = 'CACHE_SOCKET_CONNECTION'

// 缓存 ajax 请求历史
export const CACHE_AJAX_HISTORY = 'CACHE_AJAX_HISTORY'

// 获取 ajax 请求历史
export const GET_AJAX_HISTORY = 'GET_AJAX_HISTORY'

// >>>> actions:

// 登录1
export const LOGIN = 'LOGIN'

// 注册1
export const REGISTER = 'REGISTER'

// 修改密码1
export const MODIFY_PASSWORD = 'MODIFY_PASSWORD'

// 更新用户信息1
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

// 获取用户信息1
export const GET_USER_INFO = 'GET_USER_INFO'

// 发送消息1
export const SEND_MESSAGE = 'SEND_MESSAGE'

// 保存消息1
export const SAVE_MESSAGE = 'SAVE_MESSAGE'

// 更新用户的登录信息
export const UPDATE_LOGIN_INFO = 'UPDATE_LOGIN_INFO'

// 断开socket.io连接
export const DISCONNECT_SOCKETIO = 'DISCONNECT_SOCKETIO'

// 查询消息的总条数
export const COUNT_MESSAGE = 'COUNT_MESSAGE'

// AJAX请求，=> Promise1
export const AJAX = 'AJAX'

// AJAX请求, 不需要登录状态的请求
export const AJAX2 = 'AJAX2'

// 获取主题图片
export const GET_THEME_IMAGES = 'GET_THEME_IMAGES'
