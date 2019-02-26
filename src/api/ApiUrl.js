// 发布后的相对根目录
const ROOT = process.env.NODE_ENV === 'development' ? `/api` : '';
const urls = {
    LOGIN_ENCRYPT: '/main/user/loginEncrypt', // 密码登录
    GEN_PUBLICKEY: '/main/user/generatePublicKey', // 获取加密接口
    GET_SMS_CODE: '/main/auth/getSMSCode', // 获取短信登录的验证码
    LOGIN_BY_SMS_CODE: '/main/user/loginByCode', // 短信登录接口
    PIC_CODE: '/main/auth/picCode', // 获取图片验证码
    GET_ACTIVE_BY_CHANNEL: '/main/actives/listByManyChannelId', // 获得首页楼层配置数据
    RELOAGIN: '/main/user/relogin', // 刷新登录
    URL_ORDERCOUNT: '/member/order/overview', // 获取订单数
    CHECK_PIC_CODE: '/main/auth/checkPicCode', // 验证图片验证码输入是否正确
    CHECK_PHONE: '/main/auth/phone', // 检查电话号码是否已经注册
    REGISTER_ENCRYPT: '/main/user/registerEncrypt', // 注册用户
    CHECK_SMS_CODE: '/main/auth/checkSMSCode', // 验证短信验证码，验证成功过后即集成成功
    SEND_REGISTER_SMS_CODE: '/main/auth/sendSMSCode', // 获取注册时用的短信验证码
    GET_CART_LIST: '/shoppingcart/cart/info', // 购物车列表
    POST_GOODS_NUM: '/shoppingcart/cart/modify', // 购物车条目修改
    DELETE_CART_GOODS: '/shoppingcart/cart/clean', // 删除购物车商品
    ADD_CART_GOODS: '/shoppingcart/cart/shopping', // 添加购物车
    GET_CART_NUM: '/shoppingcart/cart/overview', // 获取购物车总数
    GET_USER_INFO: '/member/user/info', // 用户信息
    CLASSIFICTION_LEFTLIST: '/main/goods/getCategory', // 分类左侧列表
    GET_GOODS_PARTS: '/main/goods/parts', // 获取精品详情
    GET_CARSBYCATID: '/main/goods/getCarsByCatId', // 获取整车详情
    BUY_DIYCARS: '/main/goods/buyDiyCars', // 获取定制车详情
    GET_VIP_DETAIL: '/main/goods/getCategory', // 获取会员商城详情
    RECOMMEND: '/main/user/recommend', // 商品推荐
    UPDATA_PASSWORD: '/member/user/passwordEncrypt', // 修改密码
    GET_GOODS_DETAIL: '/main/goods/detail', // 获取商品详情
    PATH_POINTS_LIST: '/member/points/detail', // 获取积分列表
    PATH_POINTS_EXPIRE: '/member/points/expire', // 获取过期积分
    GET_ADS_GROUP: '/main/actives/getAdvertisingByGroup', // 获取广告组信息
    GET_CROWDFUNDING_INFO: '/main/goods/activeInfo', // 众筹活动信息
    COUPON_TO_PATH: '/main/coupon/type', // 优惠券类型列表
    COUPON_LIST_PATH: '/main/coupon/list', // 我的优惠券列表
    PATH_GET_MY_FOOTPRINT_DATA: '/member/user/track', // 我的足迹地址
    FORGETENCRYPT: '/member/user/forgetEncrypt', // 忘记密码
    GET_CAR_SYSTEMS: '/scrm-app-web/dealer/carList', // 获取车型车系
    GET_CMS_AREA: '/scrm-app-web/dealer/dms/location', // 获取试乘试驾的地区
    POST_FEED_DATA: '/jeecms/httpApi/addContent.jspx', // 提交用户的意见
    PTAH_TEST_DRIVE: 'member/dealer/testDrive', // 提交 预约 试驾
    GET_DEALER_LIST: '/scrm-app-web/dealer/dms/list', // 获取 经销商 列表
    GET_PAID_ORDER_DETAIL: '/member/order/detail', // 获取已支付的订单详情
    GET_UNPAID_ORDER_DETAIL: '/member/order/notpay', // 获取未支付的订单详情
    GET_CANCELED_ORDER_DETAIL: '/member/order/canceled', // 取消订单详情
    GET_CAEC_AREA: '/main/region/getAllAreaData', // 获取电商省市数据
    GET_CAEC_DEALER_LIST: 'main/dealer/list', // 电商 经销商 接口
    GET_ORDER_TRACE: '/member/order/trace', // 获取追踪订单接口
    GET_CAR_CODE: '/main/order/code', // 整车获取核销码
    GET_COMMENTS_DETAILS: 'member/assess/goodsAll', // 订单评论获取订单详情
    ORDER_LIST: 'member/order/list', // 获得订单列表
    POST_CANCELED_ORDER: '/member/order/cancel', // 取消订单
    GET_FINANCE_CANCEL_ORDER: '/agapp/agentOrder/cancelOrder', // 金融取消订单
    POST_ORDER_COMMENTS: '/member/assess/publishAll', // 提交订单评价
    POST_BASE64_UPLOAD: '/member/attachment/base64/upload', // 附件上传(base64,APP端使用)
    GET_MARKET_CAR_ORDER_DETAIL: '/agapp/agentOrder/getOrderInfo', // 获取营销爆点，订单详情
    POST_UPLOAD_RECEIPT_URL: '/member/order/uploadreceipt', // 上传发票等信息（具体的信息类型，由后端指定），
    POST_ADDRESS_LIST: '/member/receiving/list', // 获取收货地址
    GET_CONFIRM_ORDER: '/main/order/unconfirm', // 确认订单拉取订单信息
    GET_POINT_TYPE: '/member/points/balance', // 获取积分类型
    CONFIRM_ORDER_URL: '/main/order/confirm', // 提交订单，生成订单
    GET_ORDER_STATUS: '/member/order/payStatus', // 查询订单状态
    GET_SNSTOCK: '/main/goods/snGetStock', // 苏宁商品库存
    GET_SNINSTALL: '/main/operate/snGetOperateShipTime', // 苏宁商品安装信息
    GET_SNDELIVERY: '/main/goods/snSupportDelivery', // 由谁安装
    GET_EDITE_COMMENT_LIST: '/member/assess/isEdit', // 获取待修改评价的订单列表
    POST_COMPLETE_ORDER: '/member/order/complete', // 订单确认收货
    GOODS_RETURN: '/member/goods/return', // 商品退换货
    POST_COMMENTS_EDIT: '/member/assess/edit', // 修改评价提交地址
    POST_NEW_ADDR: '/member/receiving/new', // 新增收货地址
    POST_MODIFYED_ADDR: '/member/receiving/edit', // 修改收货地址
    GET_TOWN_DATA: '/main/region/getTownAreaData', // 获取镇数据
    GET_DIYCAR_LIST: '/main/goods/buyDiyCars', // 定制爱车列表
    POST_GOODS_SEARCH: '/main/goods/goodsSearch', // 搜索结果列表
    GET_MAIN_ACTIVE_BY_CHANNEL: '/main/actives/listByManyChannelId', // 获得首页楼层配置数据
    GET_ACTIVE_LIST_BY_CHANNEL: '/main/actives/list', // 获得首页楼层配置数据
    GET_EXPRESS_LIST: '/member/logistics/getLogisticsInfo', // 快递公司集合查询
    POST_GOODS_RETURN: '/member/goods/return', // 商品退换货
    GET_BUY_CAR_FILTER_LIST: '/main/goods/buyCarCon', // 我要买车分类数据
    GET_STOCK: '/main/goods/stock', // 自营商品库存
    GET_RANDOMSTATE: '/main/oauth/getRandomState', // 第三方登录的获取随机码接口
    OAUTH_URL: '/cac/api/v1/oauth2login', // 第三方登录获得code的地址
    GET_ASSESS: '/main/assess/list', // 获取商品评论
    WECHAT_CALLBACK: '/cac/api/v1/oauth2callback/wechat', // 将微信的code回调拿给cac换取cac的code
    GET_ACCESSTOKEN_BY_CODE: '/main/oauth/getAccessTokenByCode', // 通常cac的code获取cac的token
    // POST_GOODS_RETURN: '/member/goods/return' //商品退换货
    REFRESH_TOKEN: '/main/oauth/refreshAccessToken', // token刷新接口
    POST_GOODS_CONGIG: 'main/goods/configuration', // 获取商品配置参数
    POST_SEND_MESSAGE_CODE: '/main/auth/pointsSmsCode', // 积分商品短信接口
    GET_GOODS_DETAILOPIMGS: '/main/goods/detailOptImgs', // 积分商品短信接口
    POST_DELETE_ADDRESS: '/member/receiving/delete', // 删除收货地址接口
    POST_SET_DEFAULT_ADDRESS: '/member/receiving/default', // 设置默认收货地址接口
    GET_GOODS_SALE_LIMIT: '/main/goods/limit', // 商品限购接口
    POST_ADDR_MANAGE: '/member/receiving/list', // 收货地址管理接口
    GET_PAY_STATUS: '/member/order/payStatus', // 支付状态
    GET_PAY_RESULT: '/member/order/paid', // 订单支付结果
    POST_VIP_CATGOODS: '/main/goods/getCatGoods', // 订单支付结果
    POST_VIP_CATS: '/main/goods/getCategory', // 获取积分商品分类，包含二级和三级分类
    GET_LUCK_IMG: '/main/actives/listByManyChannelId', // 获取广告位中的抽奖入口图片
    OTHER_BIND_PHONENUMBER: '/cac/api/v2/oauth2login/bind/nopass', // 第三方登录，第一次绑定电话号码
    OTHER_UNBIND: '/cac/api/v1/oauth2/third/unbind', // 第三方解绑
    GET_JS_SDK_CONFIG: '/pay/payment/getJsSdk', // 获取JSSDK的配置信息
    PATH_GET_MY_LUCKYNUMBER_DATA: '/main/crowdFundingRecord/getLuckyNumber', // 我的参与记录（众筹）
    GET_BIND_INFO: '/cac/api/v1/oauth2/user_info', // 获取绑定信息
    PAY_POINTS_AGAIN: '/member/order/repayPoints', // 积分订单重新支付
    GET_ALL_CROWDFOUND_RECORD: 'main/crowdFundingRecord/list', // 获取众筹参与记录
    PATH_UPLOAD_OLD_CAR_DRIVE_LISENCE: 'agapp/agentOrder/submitReplacementBefore', // 上传旧车行驶证
    OAUTH_REBIND: '/cac/api/v1/oauth2Relogin', // 第三方登录的重新绑定
    GET_SELF_POINT_GOODS_SERVICE: '/main/goods/caecjpGetServInfo', // 获取积分自营商品售后服务
    GET_IP_ADRESS: '/caecpay/api/ip',
    GET_ORGANIZATION_LIST: '/organization/getOrganizationList', //组织管理-获取组织列表（树状）
    GET_ORGANIZATION_INFO: '/organization/getOrganizationInfo', //组织管理-获取组织详情
    POST_ADD_ORGANIZATION: '/organization/addOrganization', //组织管理-新增组织
    POST_UPDATE_ORGANIZATION: '/organization/updateOrganization', //组织管理-修改组织
    POST_UPDATE_ORGANIZATION_USER: '/organization/updateOrganizationUser', //组织管理-批量修改组织下人员
    POST_UPDATE_ORGANIZATION_ROLE: '/organization/updateOrganizationRole', //组织管理-批量修改组织下角色
    GET_USER_LIST: '/user/getUserList', //用户管理-获取用户列表
    GET_RESOURCE_USER_INFO: '/user/getUserInfo', //用户管理-获取用户详情
    POST_ADD_USER: '/user/addUser', //用户管理-新增用户
    POST_UPDATE_USER_ROLE: '/user/updateUserRole', //用户管理-批量修改用户角色关系
    POST_UPDATE_USER_ORGANIZATION: '/user/updateUserOrganization', //用户管理-批量修改用户组织关系
    GET_ROLE_LIST: '/role/getRoleList', //角色管理-获取角色列表
    GET_ROLE_INFO: '/role/getRoleInfo', //角色管理-获取角色详情
    POST_UPDATE_ROLE_INFO: '/role/updateRoleInfo', //角色管理-修改角色信息
    POST_ADD_ROLE: '/role/addRole', //角色管理-新增角色
    POST_UPDATE_ROLE_RESOURCE: '/role/updateRoleResource', //角色管理-修改角色资源关系
    POST_UPDATE_ROLE_USER: '/role/updateRoleUser', //角色管理-修改角色用户关系
    POST_UPDATE_ROLE_ORGANIZATION: '/role/updateRoleOrganization', //角色管理-修改角色组织关系
    GET_RESOURCE_LIST: '/resource/getResourceList', //资源管理_获取资源列表
    POST_ADD_RESOURCE: '/resource/addResource', //资源管理_新增资源
    POST_UPDATE_RESOURCE: '/resource/updateResource', //资源管理_修改资源
    GET_DICT: '/dict/getDict', //字典表查询
};

for (const key in urls) {
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
        let v = urls[key];
        if (v.indexOf('/') > 0) v = `/${v}`;
        urls[key] = `${ROOT}${v}`;
    }
}

export default urls;
