import _lang from './_lang.lang';

export default {
  Auth: {
    Login: {
      title: '控制台',
      subTitle: '欢迎回来，请输入您的账户并登录',
      email: 'Email',
      password: _lang.password,
      login: _lang.login,
      rememberMe: '记住我',
      back: '返回',
      notPermissions: '无权限',
      backTips: '目前还没有返回 ; >',
    },
    //
    openId: 'Open Id',
    userId: 'User Id',
    unionId: 'Union Id',
    platform: '平台',
    nickname: '昵称',
    lastAuthAt: '最后授权于',
  },
  User: {
    userInfo: '用户信息',
    userRoles: '用户角色',
    userAvatar: '用户头像',
    deleteAuthAvatar: '删除头像 (头像来自服务商)',
  },
  Role: {
    roleInfo: '角色信息',
    rolePermissions: '角色权限',
  },
  Permission: {
    permissionInfo: '权限信息',
  },
  Category: {
    categoryInfo: '分类信息',
  },
  Article: {
    articleInfo: '文章信息',
    articleContent: '文章内容',
    extendedInfo: '扩展信息',
  },
  Ax: {
    axInfo: '广告信息',
    axImage: '广告图片',
  },
  Setting: {
    pleaseSelectTheTypeFirst: '请先选择类型',
    options: '可选项',
    optionsTips: '每行一个',
    confirmDelete: '确定删除设置',
  },
  Tag: {
    count: '展示次数',
    tagInfo: '标签信息',
  },
  Coupon: {
    couponInfo: '代金券信息',
    couponCodeStatusTitle: '代金券号',
    startTime: '开始时间',
    expireTime: '结束时间',
    amount: '金额',
    code: '券号',
    overAmount: '触发金额',
    availableDate: '生效时间',
    availableProductIds: '可用商品',
    unavailableProductIds: '不可用商品',
    redeem: '兑换',
    redeemConpon: '兑换代金券',
    redeemToUser: '兑换代金券给用户',
    redeemUser: '兑换用户',
    accessOrder: '关联订单',
  },
  Promo: {
    promoInfo: '优惠码信息',
    promoCodeStatusTitle: '优惠码号',
    startTime: '开始时间',
    expireTime: '结束时间',
    amount: '金额',
    overAmount: '触发金额',
    availableDate: '可用日期',
    availableProductIds: '可用商品',
    unavailableProductIds: '不可用商品',
    redeemedQuantity: '已兑数量',
  },
  Product: {
    productInfo: '商品信息',
    productContent: '商品内容',
    putOnSale: '上架',
    price: '价格',
    productName: '商品名',
    productFullname: '商品全名',
    costPrice: '成本价',
    marketPrice: '市场价',
    brand: '品牌',
    style: '款式',
    banner: '商品图',
    //
    productImage: '商品配图',
    bannerMb: '主图 MB',
    galleryMb: '图集 MB',
    bannerPc: '主图 PC',
    galleryPc: '图集 PC',
  },
  Address: {
    province: '省',
    city: '市',
    area: '区',
    areaLabel: '区域',
    address: '地址',
    consignee: '收件人',
    zip: '邮编',
    phone: '电话',
    status: '状态',
    //
    addressInfo: '地址信息',
  },
  Division: {
    name: '名称',
    provinceCode: '省代码',
    cityCode: '市代码',
    areaCode: '区代码',
    code: '代码',
    //
    divisionData: '地址数据',
    expandedAll: '全部展开',
    collapseAll: '全部折叠',
  },
  Zan: {
    views: '浏览量',
    zanInfo: '集赞信息',
    zanUserList: '集赞用户',
    targetZanQuantity: '目标点赞数',
    currentZanQuantity: '当前点赞数',
    currentTargetZanQuantity: '当前 / 目标',
    like: '赞',
    liked: '已赞',
    deletedLikeUser: '已删除点赞用户',
  },
  Test: {
    getApiError: '获取 Api 错误',
    getApiMessage: '获取 Api 消息',
  },
};
