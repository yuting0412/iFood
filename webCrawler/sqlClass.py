from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, Boolean, select
from sqlalchemy import inspect, NVARCHAR 

engine = create_engine("mssql+pyodbc://@localhost/demo?driver=SQL+Server+Native+Client+11.0;TRUSTED_CONNECTION = TRUE;charset=utf8;convert_unicode=TRUE")
#engine = create_engine("mssql+pyodbc://sa:food@10.21.20.197:1433/iEat?driver=SQL+Server+Native+Client+11.0;TRUSTED_CONNECTION = TRUE;charset=utf8;convert_unicode=TRUE")
metadata = MetaData()

class Counties:
  def __init__(self):
    self.cla = Table('Class', metadata, # 對應資料庫中table的欄位等資料
      Column('CID', Integer, primary_key=True, mssql_identity_start=0,mssql_identity_increment=1),
      Column('CName', NVARCHAR(255)),
      Column('IDPath', NVARCHAR(None)),
      Column('NamePath', NVARCHAR(None)),
      Column('nObject', NVARCHAR(255)),
      Column('nLevel', NVARCHAR(255)),
    )
    metadata.create_all(engine)# 在資料庫建立table

  def insert(self, con):
    con = eval(con) # 字串轉 dict
    with engine.begin() as conn: # 連線資料庫
      conn.execute(self.cla.insert(None), #插入資料 欄位要一樣
          con
      )

  def returnCID(self, city):
    with engine.begin() as conn:
      result = conn.execute(select([self.cla]))
      for re in result:
        if re.CName == city:
          return re.CID
      return "can not find"

  def returnIDpath(self):
    path = []
    with engine.begin() as conn:
      result = conn.execute(select([self.cla]))
      for re in result:
          path.append(re.IDPath)
      return path

class Inheritance:
  def __init__(self):
    self.inher = Table('Inheritance', metadata,
      Column('PCID', NVARCHAR(125)),
      Column('CCID', NVARCHAR(125)),
    )
    metadata.create_all(engine)# 在資料庫建立table

  def insert(self, con):
    con = eval(con) # 字串轉 dict
    with engine.begin() as conn: # 連線資料庫
      conn.execute(self.inher.insert(None), #插入資料 欄位要一樣
          con
      )