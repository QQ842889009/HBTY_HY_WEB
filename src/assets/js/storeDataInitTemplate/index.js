const inDoorDataInitTemplate = {
  Sid: 0,
  Station: "还未定义", //站
  Branch: "还未定义", //分支
  Housing: "还未定义", //小区
  Tower: "还未定义", //楼
  Unit: "还未定义", //单元
  Num: "还未定义", //号

  Community: "还未定义",
  Sn: "还未定义", //用户编号
  Phone: "还未定义", //电话
  HouseholderName: "还未定义", //用户姓名
  WayHeating: "还未定义", //方式  地暖还是片暖
  Sort: 0,
  TE: "", //室内温度
  SdateTE: "还未上传" //室内温度上传时间
}

const doorDataInitTemplate = {
  Sid: 0,
  Station: "",
  Branch: "",
  Housing: "",
  Tower: "",
  Unit: "",
  Num: "",

  versions: 0, //
  ValveCode: 0, //户阀号
  ConcentratorCode: 0 //集中器号
}
const aiUnitDataInitTemplate = {
  Sid: 0,
  Signa: 0, //信号强度
  ConcentratorCode: 0, //集中器号
  Station: "", //换热站
  Branch: "", //分支
  Housing: "", //小区
  Unit: "" //单元
}
const stationDataInitTemplate = {
  Sid: 0,
  Station: 0,
  Space: 0,
  SdateTime: "2030-09-11",
  TimesTamp: 0,

  FT11: 0,
  FT21: 0,
  FT31: 0,
  FT12: 0,
  Q1: 0,
  Q2: 0,

  TE11: 0,
  TE12: 0,
  TE21: 0,
  TE22: 0,

  PT11: 0,
  PT12: 0,
  PT21: 0,
  PT22: 0,
  PT11_FV: 0,
  PT22_BF: 0,

  FV1FB: 0,
  XVFB: 0,
  DVFB: 0,
  BP11FB: 0,
  BP21FB: 0,

  TE221: 0,
  PT221: 0,
  TE222: 0,
  PT222: 0,
  TE223: 0,
  PT223: 0,
  TE224: 0,
  PT224: 0,
  TE225: 0,
  PT225: 0,
  TE226: 0,
  PT226: 0,
  TE227: 0,
  PT227: 0,
  TE228: 0,
  PT228: 0,
  TE229: 0,
  PT229: 0,

  DLAV: 0,
  DLBV: 0,
  DLCV: 0,

  ZFT31: 0,
  ZQ1: 0,
  ZQ2: 0,
  DL: 0,
  FT22: 0,

  TE21SP: 0,
  TE22SP: 0,
  TE2XSP: 0,
  FV1SP: 0,

  XVSP: 0,
  DVSP: 0,
  BP11SP: 0,
  BP21SP: 0,
  FV1SP_H: 0,
  FV1SP_L: 0,
  PT22XY_H: 0,
  PT22XY_L: 0,
  FV_TEX: 0,
  PT21_HH: 0,
  PT21_H: 0,
  PT22_L: 0,
  PT22_LL: 0,
  BP11C: 0,
  BP21C: 0,
  XYVC: 0,
  MA_FV1: 0,
  MA_XYV: 0,
  BP11A_LOCK: 0,
  BP21A_LOCK: 0,
  PT21HH_Lock: 0,
  PT22LL_Lock: 0,
  FVandTE_BP1_Lock: 0,
  AllStop: 0,
  BP11S: 0,
  BP11RM: 0,
  BP21S: 0,
  BP21RM: 0,
  BP11A: 0,
  BP21A: 0,
  BP11Ca: 0,
  BP21Ca: 0,
  XYVCa: 0,
  FV1a: 0,
  PT21_HHa: 0,
  PT21_Ha: 0,
  PT22_La: 0,
  PT22_LLa: 0,
  ALLAa: 0
}
const realtimeTemplate = {
  SdateTime: "2030-09-11",
  TE11: 0,
  TE12: 0,
  TE21: 0,
  TE22: 0,
  PT11: 0,
  PT12: 0,
  PT21: 0,
  PT22: 0
}
const stationTemplate = {
  Station: 0,
  Sid: 0,
  Space: 0
}
const echartdataType = {
  Sid: "000",
  一供压力: 0,
  一供流量: 0,
  一供温度: 0,
  一回压力: 0,
  一回温度: 0,
  一网温差: 0,
  一网压差: 0,
  二供压力: 0,
  二供流量: 0,
  二供温度: 0,
  二回压力: 0,
  二回温度: 0,
  二网温差: 0,
  二网压差: 0,
  日期时间: 0,
  时间戳: 0,
  液位: 0,
  站点: 0,
  补水流量: 0,
  面积: 0,
  一网热量: 0,
  二网热量: 0
}
const alarmsettings = {
  sid: 0,
  station: "占位",
  bp21a_lock: 0,
  bp22a_lock: 0,
  bp2_lock: 0,
  mp1a_lock: 0,
  mp2a_lock: 0,
  lt_lock: 0,
  pt21_lock: 0,
  pt22_lock: 0,
  BP21A: 0,
  BP21FB: 0,
  BP22FB: 0,
  BP22A: 0,
  BP22FB: 0,
  FV1FB: 0,
  FV2FB: 0,
  XYV: 0,
  LT: 2,
  LTL: 0.6,
  LTLL: 0.5,
  LTH: 2.5,
  LTHH: 2.6,
  PT21: 0.35,
  PT21H: 0.4,
  PT21HH: 0.45,
  PT22: 0.28,
  PT22L: 0.2,
  PT22LL: 0.18,
  PT22HH: 0.3,
  id: null,
  sid16: null,
  PT22SP_HH: null
}
const stationDataInitTemplateReal = {
  station: "占位",
  sid: 0,
  space: 0,
  way: 0,
  Timestamp: 1536997080,
  date: "2030-09-11",
  time: "00:00:00",
  ft11_u: 0,
  ft21_u: 0,
  q1_u: 0,
  te00: 0
}
const alaH = {
  sid: "占位",
  status: 0
}
//换热站报警的初始化
// const stationAlarm = {
//   alarmConfirm: false,
//   Station: "",
//   Branch: "",
//   Housing: "",
//   Tower: "",
//   Unit: "",
//   Num: "",

//   versions: 0, //
//   ValveCode: 0, //户阀号
//   ConcentratorCode: 0 //集中器号
// }
export {
  inDoorDataInitTemplate,
  doorDataInitTemplate,
  aiUnitDataInitTemplate,
  stationDataInitTemplate,
  realtimeTemplate,
  stationTemplate,
  echartdataType,
  alarmsettings,
  stationDataInitTemplateReal,
  alaH
}
