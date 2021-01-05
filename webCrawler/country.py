import sqlClass

def putSearch(table, count):
    search = ['菜系、種類','價位','評分','特殊需求']
    st = "{'CName':'多元搜尋','IDPath':'0/" + str(count) + "','NamePath':'首頁/多元搜尋','nLevel':'1'}"
    table.insert(st)
    count += 1
    for s in search:
        st = "{'CName':'" + s + "','IDPath':'0/396/" + str(count) + "','NamePath':'首頁/多元搜尋/" + s + "','nLevel':'2'}"
        count += 1
        table.insert(st)
    cuisine = ['親子餐廳', '精緻高級', '中式料理', '美式料理', '景觀餐廳', '台菜', '多國料理', '宵夜', '燒烤', '下午茶', '小吃', '火鍋', '義式料理', '居酒屋', '日式料理', '越南料理', '法式料理', '甜點',\
             '咖啡廳', '韓式料理', '寵物友善', '泰式料理', '健康料理', '冰品飲料', '早午餐', '港式料理', '雲南', '歐式料理', '新加坡料理', '酒吧'] # 菜系/種類
    for c in cuisine:
        st = "{'CName':'" + c + "','IDPath':'0/396/397/" + str(count) + "','NamePath':'首頁/多元搜尋/菜系、種類/" + c + "','nLevel':'3'}"
        count += 1
        table.insert(st)
    price = ['100','100-200','200-300','300-400','400-500','500-600','600-700','700-800','800-900','900-1000','1000 - 1500','1500'] # 價位
    for p in price:
        st = "{'CName':'" + p + "','IDPath':'0/396/398/" + str(count) + "','NamePath':'首頁/多元搜尋/價位/" + p + "','nLevel':'3'}"
        count += 1
        table.insert(st)
    score = ['1','2','3','4','5'] # 評分
    for s in score:
        st = "{'CName':'" + s + "','IDPath':'0/396/399/" + str(count) + "','NamePath':'首頁/多元搜尋/評分/" + s + "','nLevel':'3'}"
        count += 1
        table.insert(st)
    special = ['信用卡','素食','無障礙','停車場','只收現金','需預訂','適合兒童'] # 特殊需求
    for s in special:
        st = "{'CName':'" + s + "','IDPath':'0/396/400/" + str(count) + "','NamePath':'首頁/多元搜尋/特殊需求/" + s + "','nLevel':'3'}"
        count += 1
        table.insert(st)

def putInher(classTable, inter):
    path = classTable.returnIDpath()
    for p in path:
        cut = p.split('/')
        if len(cut) > 1:
            st = "{'PCID':'" + cut[len(cut) - 2] + "','CCID':'" + cut[len(cut) - 1] + "'}"
            inter.insert(st)

def putContry(table):
    st = "{'CName':'首頁','IDPath':'0','NamePath':'首頁'}"
    table.insert(st)
    count = 1
    part = ['北部','中部','南部','東部','離島'] # 區域
    for i in range(len(part)):
        st = "{'CName':'" + part[i] + "','IDPath':'0/" + str(count) + "','NamePath':'首頁/" + part[i]+"','nLevel':'1'}"
        table.insert(st)
        count += 1
    north = ['基隆市','新北市','台北市','桃園市','新竹市','新竹縣','宜蘭縣'] # 縣市
    for i in range(len(north)):
        st = "{'CName':'" + north[i] + "','IDPath':'0/1/" + str(count) + "','NamePath':'首頁/北部/" + north[i]+"','nLevel':'2'}"
        table.insert(st)
        count += 1
    mid = ['苗栗縣','臺中市','彰化縣','南投縣','雲林縣']
    for i in range(len(mid)):
        st = "{'CName':'" + mid[i] + "','IDPath':'0/2/" + str(count) + "','NamePath':'首頁/中部/" + mid[i]+"','nLevel':'2'}"
        table.insert(st)
        count += 1
    south = ['嘉義縣','嘉義市','臺南市','高雄市','屏東縣']
    for i in range(len(south)):
        st = "{'CName':'" + south[i] + "','IDPath':'0/3/" + str(count) + "','NamePath':'首頁/南部/" + south[i]+"','nLevel':'2'}"
        table.insert(st)
        count += 1
    east = ['花蓮縣','臺東縣']
    for i in range(len(east)):
        st = "{'CName':'" + east[i] + "','IDPath':'0/4/" + str(count) + "','NamePath':'首頁/東部/" + east[i]+"','nLevel':'2'}"
        table.insert(st)
        count += 1
    outlying = ['澎湖縣','金門縣','連江縣']
    for i in range(len(outlying)):
        st = "{'CName':'" + outlying[i] + "','IDPath':'0/5/" + str(count) + "','NamePath':'首頁/離島/" + outlying[i]+"','nLevel':'2'}"
        table.insert(st)
        count += 1
    northCity = [] # 北部縣市區域
    keelung = ['中正區','仁愛區','信義區','中山區','安樂區','七堵區','暖暖區']
    northCity.append(keelung)
    NewTaipei = ['石門區','三芝區','淡水區','八里區','萬里區','金山區','蘆洲區','三重區','泰山區','新莊區','板橋區','樹林區','鶯歌區','三峽區','林口區','中和區','永和區','五股區','汐止區','土城區','貢寮區','雙溪區','瑞芳區','坪林區','深坑區','平溪區','石碇區','烏來區','新店區']
    northCity.append(NewTaipei)
    Taipei = ['中山區','中正區','信義區','士林區','大同區','大安區','內湖區','文山區','北投區','松山區','南港區','萬華區']
    northCity.append(Taipei)
    Taoyuan = ['桃園區','八德區','楊梅區','龍潭區','復興區','大溪區','平鎮區','中壢區','觀音區','大園區','蘆竹區','龜山區','新屋區']
    northCity.append(Taoyuan)
    Hsinchu = ['東區','北區','香山區']
    northCity.append(Hsinchu)
    HsinchuCounty = ['新豐鄉','竹北市','竹東鎮','寶山鄉','峨眉鄉','北埔鄉','五峰鄉','橫山鄉','芎林鄉','湖口鄉','新埔鄉','關西鎮','尖石鄉']
    northCity.append(HsinchuCounty)
    Yilan = ['宜蘭市','員山鄉','礁溪鄉','大同鄉','南澳鄉','蘇澳鎮','冬山鄉','三星鄉','羅東鎮','五結鄉','頭城鎮','壯圍鄉']
    northCity.append(Yilan)
    for j in range(len(north)):
        city = north[j]
        cid = table.returnCID(city)
        for i in range(len(northCity[j])):
            st = "{'CName':'" + northCity[j][i] + "','IDPath':'0/1/" + str(cid) + "/" + str(count) + "','NamePath':'首頁/北部/" + city + '/' + northCity[j][i]+"','nLevel':'3'}"
            table.insert(st)
            count += 1
    midCity = [] # 中部縣市區域
    Miaoli = ['竹南鎮','後龍鎮','苗栗市','西湖鄉','通霄鎮','苑裡鎮','三義鄉','銅鑼鄉','公館鄉','頭屋鄉','造橋鄉','頭份鎮','三灣鄉','獅潭鄉','大湖鄉','卓蘭鎮','泰安鄉','南庄鄉']
    midCity.append(Miaoli)
    Taichung = ['中區','東區','南區','西區','北區','北屯區','西屯區','南屯區','龍井區','沙鹿區','清水區','梧棲區','外埔區','大肚區','大甲區','大安區','烏日區','太平區','新社區','大里區','霧峰區','石岡區','豐原區','潭子區','大雅區','后里區','神岡區','和平區','東勢區']
    midCity.append(Taichung)
    Changhua = ['彰化市','秀水鄉','竹塘鄉','鹿港鎮','福興鄉','芳苑鄉','大城鄉','線西鄉','和美鎮','伸港鄉','二林鄉','埔鹽鄉','溪湖鎮','溪州鄉','北斗鎮','田尾鄉','埤頭鄉','二水鄉','大村鄉','永靖鄉','田中鎮','社頭鄉','芬園鄉','花壇鄉','員林市','埔心鄉']
    midCity.append(Changhua)
    Nantou = ['南投市','草屯鎮','名間鄉','竹山鎮','鹿谷鄉','集集鎮','中寮鄉','國姓鄉','埔里鎮','魚池鄉','水里鄉','信義鄉','仁愛鄉']
    midCity.append(Nantou)
    Yunlin = ['北港鎮','虎尾鎮','水林鄉','口湖鄉','四湖鄉','元長鄉','麥寮鄉','東勢鄉','崙背鄉','台西鄉','土庫鎮','大埤鄉','莿桐鄉','褒忠鄉','二崙鄉','西螺鎮','斗南鎮','斗六市','林內鄉','古坑鄉']
    midCity.append(Yunlin)
    for j in range(len(mid)):
        city = mid[j]
        cid = table.returnCID(city)
        for i in range(len(midCity[j])):
            st = "{'CName':'" + midCity[j][i] + "','IDPath':'0/2/" + str(cid) + "/" + str(count) + "','NamePath':'首頁/中部/" + city + '/' + midCity[j][i]+"','nLevel':'3'}"
            table.insert(st)
            count += 1
    southCity = [] # 南部縣市區域
    Chiayi = ['東石鄉','朴子市','民雄鄉','鹿草鄉','布袋鎮','水上鄉','六腳鄉','新港鄉','太保市','溪口鄉','大林鎮','竹崎鄉','番路鄉','大埔鄉','阿里山鄉','梅山鄉','義竹鄉','中埔鄉']
    southCity.append(Chiayi)
    ChiayiCounty = ['東區','西區']
    southCity.append(ChiayiCounty)
    Tainan = ['中西區','東區','南區','北區','安平區','新營區','永康區','安南區','仁德區','歸仁區','安定區','新化區','善化區','下營區','新市區','佳里區','西港區','麻豆區','關廟區','鹽水區','白河區','柳營區','後壁區','東山區','六甲區','官田區','大內區','學甲區','七股區','將軍區','北門區','山上區','玉井區','楠西區','南化區','左鎮區','龍崎區']
    southCity.append(Tainan)
    Kaohsiung = ['鹽埕區','旗津區','左營區','楠梓區','前鎮區','三民區','新興區','前金區','苓雅區','鼓山區','小港區','內門區','茄萣區','路竹區','湖內區','阿蓮區','田寮區','橋頭區','岡山區','梓官區','彌陀區','燕巢區','大社區','仁武區','鳥松區','鳳山區','林園區','大寮區','大樹區','旗山區','永安區','美濃區','杉林區','甲仙區','桃源區','那瑪夏區','六龜區','茂林區']
    southCity.append(Kaohsiung)
    Pingtung = ['屏東市','牡丹鄉','枋山鄉','獅子鄉','車城鄉','恒春鎮','林邊鄉','佳冬鄉','新園鄉','崁頂鄉','南州鄉','枋寮鄉','滿州鄉','麟洛鄉','竹田鄉','內埔鄉','九如鄉','長治鄉','鹽埔鄉','萬巒鄉','潮州鄉','萬丹鄉','新埤鄉','泰武鄉','來義鄉','春日鄉','霧台鄉','里港鄉','瑪家鄉','三地門鄉','東港鎮','琉球鄉','高樹鄉']
    southCity.append(Pingtung)
    for j in range(len(south)):
        city = south[j]
        cid = table.returnCID(city)
        for i in range(len(southCity[j])):
            st = "{'CName':'" + southCity[j][i] + "','IDPath':'0/3/" + str(cid) + "/" + str(count) + "','NamePath':'首頁/南部/" + city + '/' + southCity[j][i]+"','nLevel':'3'}"
            table.insert(st)
            count += 1
    eastCity = []
    Hualien = ['花蓮市','秀林鄉','萬榮鄉','卓溪鄉','富里鄉','玉里鎮','瑞穗鄉','豐濱鄉','光復鄉','鳳林鄉','壽豐鄉','吉安鄉','新城鄉']
    eastCity.append(Hualien)
    Taitung = ['台東市','海瑞鄉','延平鄉','卑南鄉','金峰鄉','達仁鄉','大武鄉','太麻里鄉','鹿野鄉','關山鎮','池上鄉','東河鄉','成功鎮','長濱鄉','綠島鄉','蘭嶼鄉']
    eastCity.append(Taitung)
    for j in range(len(east)):
        city = east[j]
        cid = table.returnCID(city)
        for i in range(len(eastCity[j])):
            st = "{'CName':'" + eastCity[j][i] + "','IDPath':'0/4/" + str(cid) + "/" + str(count) + "','NamePath':'首頁/東部/" + city + '/' + eastCity[j][i]+"','nLevel':'3'}"
            table.insert(st)
            count += 1
    outlyingCity = [] # 離島縣市區域
    Penghu = ['馬公市','白沙鄉','湖西鄉','西嶼鄉','望安鄉','七美鄉']
    outlyingCity.append(Penghu)
    Kinmen = ['烈嶼鄉','金城鎮','金寧鄉','金湖鎮','金沙鎮','烏坵鄉']
    outlyingCity.append(Kinmen)
    Mazu = ['南竿鄉','北竿鄉','莒光鄉','東引鄉']
    outlyingCity.append(Mazu)
    for j in range(len(outlying)):
        city = outlying[j]
        cid = table.returnCID(city)
        for i in range(len(outlyingCity[j])):
            st = "{'CName':'" + outlyingCity[j][i] + "','IDPath':'0/5/" + str(cid) + "/" + str(count) + "','NamePath':'首頁/離島/" + city + '/' + outlyingCity[j][i]+"','nLevel':'3'}"
            table.insert(st)
            count += 1
    return count

def main():
    classTable = sqlClass.Counties()
    count = putContry(classTable)
    interTable = sqlClass.Inheritance()
    putSearch(classTable, count)
    putInher(classTable, interTable)
main()