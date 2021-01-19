import sqlClass
def coAttribute(res, classInfo, coTable, nowtype):
    attribute = res[nowtype].split()
    for a in attribute: # 餐廳的菜系種類
        for i in range(368, len(classInfo)):
            if a == classInfo[i][1]: # 相互對照
                st = "{'CID':'" + str(classInfo[i][0]) + "','OID':'" + str(res[0]) + "'}"
                coTable.insert(st)
                break

def coScore(resInfo, classInfo, coTable):
    for res in resInfo: # 所有餐廳
        for i in range(368, len(classInfo)): # 所有評分
            if res[7] != 'None' and res[7] != None and str(int(float(res[7]))) == classInfo[i][1]: # 確定不是空的
                st = "{'CID':'" + str(classInfo[i][0]) + "','OID':'" + str(res[0]) + "'}"
                coTable.insert(st)
                break

def coTown(resInfo, classInfo, coTable):
    for res in resInfo: # 所有餐廳
        for i in range(368): # 餐廳的鄉鎮市區
            if res[1] == classInfo[i][1]: # 鄉鎮市相同
                st = "{'CID':'" + str(classInfo[i][0]) + "','OID':'" + str(res[0]) + "'}"
                coTable.insert(st)
                break

def main():
    resTable = sqlClass.object()
    resInfo = resTable.getInfo() # 餐廳資料 
    # [re.OID, re.town, re.tag, re.meal, re.cuisine, re.style, re.price, re.attribute]
    # id 鄉鎮市區 餐點 菜系 種類 價位 評分
    # 0  1         2    3  4    5   6
    coTable = sqlClass.CO()
    cla = sqlClass.Counties()
    classInfo = cla.returnCoNeed() # class 資料 [cid, cname]
    coTown(resInfo, classInfo, coTable) # co 餐廳 vs 鄉鎮市區
    # coScore(resInfo, classInfo, coTable) # co 餐廳 vs 評分
    nowtype = 2
    while nowtype < 7:
        for res in resInfo: # 所有餐廳
            if res[nowtype] != None and res[nowtype] != 'None':
                coAttribute(res, classInfo, coTable, nowtype)
        nowtype += 1

main()