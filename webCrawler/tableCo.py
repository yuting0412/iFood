import sqlClass
def coAttribute(resInfo, classInfo, coTable):
    # allcuis = []
    for res in resInfo: # 所有餐廳
        if res[6] != None and res[6] != 'None':
            attribute = res[6].split()
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
                # print(st)
                coTable.insert(st)
                break

def cutCuisine(res):
    cuisine = []
    if (res[2] != None and res[2] != 'None'):
        res[2] = res[2].replace(',','')
        cuisine += res[2].split()
    if (res[3] != None and res[3] != 'None'):
        res[3] = res[3].replace(',','')
        cuisine += res[3].split()
    return cuisine

def coCuisine(resInfo, classInfo, coTable):
    # allcuis = []
    for res in resInfo: # 所有餐廳
        cuisine = cutCuisine(res) # 菜系/種類
        for c in cuisine: # 餐廳的菜系種類
            # if c not in allcuis:
            #     allcuis.append(c)
            for i in range(368, len(classInfo)): # 所有菜系種類
                if c == classInfo[i][1]: # 相互對照
                    st = "{'CID':'" + str(classInfo[i][0]) + "','OID':'" + str(res[0]) + "'}"
                    coTable.insert(st)
                    break
    # print(allcuis)

def coTown(resInfo, classInfo, coTable):
    for res in resInfo: # 所有餐廳
        for i in range(368): # 餐廳的鄉鎮市區
            if res[1] == classInfo[i][1]: # 鄉鎮市相同
                st = "{'CID':'" + str(classInfo[i][0]) + "','OID':'" + str(res[0]) + "'}"
                coTable.insert(st)
                break

def main():
    resTable = sqlClass.object()
    resInfo = resTable.getInfo() # 餐廳資料 [re.CID, re.town, re.meal, re.cuisine, re.price, re.limit, re.attribute, re.score]
    coTable = sqlClass.CO()
    cla = sqlClass.Counties()
    classInfo = cla.returnCoNeed() # class 資料 [cid, cname]
    coTown(resInfo, classInfo, coTable) # co 餐廳 vs 鄉鎮市區
    coCuisine(resInfo, classInfo, coTable) # co 餐廳 vs 菜系種類
    # coScore(resInfo, classInfo, coTable) # co 餐廳 vs 評分
    coAttribute(resInfo, classInfo, coTable) # co 餐廳 vs 特殊需求

main()