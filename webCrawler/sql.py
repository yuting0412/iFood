from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, Boolean, select
from sqlalchemy import inspect, NVARCHAR 

engine = create_engine("mssql+pyodbc://@localhost/test?driver=SQL+Server+Native+Client+11.0;TRUSTED_CONNECTION = TRUE;charset=utf8;convert_unicode=TRUE")
metadata = MetaData()

class tripadvisor_Res:
  def __init__(self,town): # 類似constructor
    self.trip = Table('trip'+town, metadata, # 對應資料庫中table的欄位等資料
        Column('RID', Integer, primary_key=True, mssql_identity_start=1,mssql_identity_increment=1),
        Column('resName', NVARCHAR(None)),# 餐廳名稱
        Column('url', NVARCHAR(255)), # 網址
        Column('time', NVARCHAR(255)), # 營業時間
        Column('addr',  NVARCHAR(255)), # 地址
        Column('menu',  NVARCHAR(255)), # 菜單
        Column('price',  NVARCHAR(255)), # 價位
        Column('cuisine',  NVARCHAR(255)), # 菜系
        Column('limit',  NVARCHAR(255)), # 特別飲食限制
        Column('meal',  NVARCHAR(255)), # 餐點
        Column('features',  NVARCHAR(255)), # 特色
        Column('score',  NVARCHAR(255)), # 平均分數
        Column('comment',  NVARCHAR(255)), # 評論數量
    )
    metadata.create_all(engine)# 在資料庫建立table

  def insertRes(self, newRes):
      newRes = eval(newRes) # 字串轉 dict
      with engine.begin() as conn: # 連線資料庫
          conn.execute(self.trip.insert(None), #插入資料 欄位要一樣
              newRes
          )

  def returnResName(self):
    allResName = []
    with engine.begin() as conn:
      result = conn.execute(select([self.trip]))
      for re in result:
        allResName.append(re.resName)
    return allResName

  def returnResInfo(self):
    resInfo = []
    with engine.begin() as conn:
      result = conn.execute(select([self.trip]))
      for re in result:
        resInfo.append([re.RID,re.url])
    return resInfo

class tripadvisor_Command:
  def __init__(self, town):
    self.trip = Table('trip_Command'+town, metadata,
      Column('RID',Integer),# 餐廳id
      Column('UID',Integer),# 評論者id
      Column('Score',Integer), # 評分
      Column('Title',NVARCHAR(None)), # 標題
      Column('Command',NVARCHAR(None)), # 內容
      Column('Recommend',NVARCHAR(255)), # 按讚人數
      Column('VisitTime', NVARCHAR(255)), # 造訪時間
    )
  def insertCom(self, newCom):
    newCom = eval(newCom) # 字串轉 dict
    with engine.begin() as conn: # 連線資料庫
        conn.execute(self.trip.insert(None), #插入資料 欄位要一樣
            newCom
        )

class User:
  def __init__(self):
    self.trip = Table('trip_User', metadata,
      Column('UID',Integer,primary_key=True, mssql_identity_start=1,mssql_identity_increment=1),# 使用者id
      Column('Name',NVARCHAR(255)), # 使用者名稱
      Column('Website', NVARCHAR(255)), # 哪個網站
      Column('S5',NVARCHAR(255)), # 5星
      Column('S4',NVARCHAR(255)), # 4星
      Column('S3',NVARCHAR(255)), # 3星
      Column('S2', NVARCHAR(255)), # 2星
      Column('S1', NVARCHAR(255)), # 1星
    )

  def insertUser(self, newUser):
    newUser = eval(newUser) # 字串轉 dict
    with engine.begin() as conn: # 連線資料庫
        conn.execute(self.trip.insert(None), #插入資料 欄位要一樣
            newUser
        )

class google:
  def __init__(self,town): # 類似constructor
    self.goog = Table('goog'+town, metadata, # 對應資料庫中table的欄位等資料
      Column('resName', String),# 餐廳名稱
      Column('url', String), # 網站
      Column('addr', String), # 地址
      Column('tel', String), # 電話
      Column('menu', String), # 菜單
      Column('stayTime', String), # 規劃行程(停留時間)
      Column('BusinessHour', String), # 營業時間
      Column('attribute', String), # 其他(?)
      Column('busyTime', String), #熱門時段
      Column('check', Boolean, default=False), # 抓過
      Column('closed', Boolean, default=False) # 歇業
    )
    metadata.create_all(engine)

  def insertRes(self, newRes):
    newRes = eval(newRes) # 字串轉 dict
    if '餐' in newRes['tag'] or '咖啡' in newRes['tag'] or '餐廳' in newRes['resName'] or '飯店' in newRes['tag'] or '甜點' in newRes['tag']:
      with engine.begin() as conn: # 連線資料庫
        conn.execute(self.goog.insert(None), #插入資料 欄位要一樣
          newRes
        )
      return
    elif newRes['stayTime'] == 'None' and newRes['attribute'] == None :
      return
    with engine.begin() as conn: # 連線資料庫
      conn.execute(self.goog.insert(None), #插入資料 欄位要一樣
        newRes
      )
      
  def returnResInfo(self):
    allResName = []
    with engine.begin() as conn:
      result = conn.execute(select([self.goog]))
      for re in result:
        print(re.resName)
        allResName.append(re.resName)
    return allResName


class eztable:
  def __init__(self,town): # 類似constructor
    self.ezt = Table('eztable'+ town, metadata, # 對應資料庫中table的欄位等資料
      Column('resName', String),# 餐廳名稱
      Column('url', String), # 網站
      Column('menu', String), # 菜單
      Column('addr', String), # 地址
      Column('BusinessHour', String), # 營業時間
      Column('traffic', String), # 交通方式
      Column('discount', String), # 優惠
      Column('type', String), # 聚餐類型
      Column('cuisine', String), # 料理種類(菜系?)
      Column('recommend', String), # 推薦菜色
      Column('price', String), # 消費價位
      Column('notice', String), # 用餐須知
      Column('attribute', String) # 服務
    )
    metadata.create_all(engine)

  def insertRes(self, newRes):
    newRes = eval(newRes) # 字串轉 dict
    with engine.begin() as conn: # 連線資料庫
      conn.execute(self.ezt.insert(None), #插入資料 欄位要一樣
        newRes
      )

