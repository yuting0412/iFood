import re
import time
import sql
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.ChromeOptions()
options.add_argument('lang=UTF-8') # 更換header
browser = webdriver.Chrome()
browser_rest = webdriver.Chrome(chrome_options=options)

def findRestaurantInfo(url,sqlResInfo, table): #抓餐廳詳細資訊
    browser_rest.get(url)
    time.sleep(5)
    try: # 關廣告
        browser_rest.find_element_by_css_selector('._2cMt8_9M').click()
    except:
        print(end = "")

    try: # 抓菜單連結
        menu = browser_rest.find_element_by_link_text("菜單")
        sqlResInfo = sqlResInfo + "'menu':'" + menu.get_attribute("href") + "',"
    except:
        sqlResInfo = sqlResInfo + "'menu':" + 'None' + ','

    try: # 抓地址
        addr = browser_rest.find_element_by_css_selector('._2saB_OSe')
        sqlResInfo = sqlResInfo + "'addr':'" + addr.text + "',"
    except:
        sqlResInfo = sqlResInfo + "'addr':" + 'None' + ','
    
    try: # 抓營業時間
        browser_rest.find_element_by_css_selector('._1h0LGVD2').click() #顯示所有營業時間
        times = browser_rest.find_elements_by_css_selector('._2UEvprRr')
        sqlResInfo = sqlResInfo + "'time':'"
        for t in times:
            sqlResInfo = sqlResInfo + t.text.replace("\n","")
        sqlResInfo += "',"
    except:
        sqlResInfo = sqlResInfo + "'time':" + 'None' + ','

    col = ['價位', '菜系', '特別飲食限制', '餐點', '特色']
    sqlCol = ["'price'", "'cuisine'", "'limit'", "'meal'", "'features'"]

    try: # 抓其他資訊
        browser_rest.find_element_by_css_selector('.y5QNMrR5').click()
        infoTitle = browser_rest.find_elements_by_css_selector('._14zKtJkz') #全部資料名(同欄位)
        info = browser_rest.find_elements_by_css_selector('._1XLfiSsv') #全部資料內容
        c = 0 #欄位位置
        i = 0 # 第幾筆資料
        while (c < 5):#欄位只有5個
            sqlResInfo = sqlResInfo + sqlCol[c] + ":" #印欄位名
            if (i >= len(info) or infoTitle[i].text != col[c]): 
                #若對照不到則此欄位無資料
                sqlResInfo = sqlResInfo + "None ,"
                c+=1 #下一欄位
                continue
            sqlResInfo = sqlResInfo + "'" + info[i].text +"'," #印此比資料的內容
            c+=1
            i+=1
    except:
        for i in range(5):
            sqlResInfo = sqlResInfo + sqlCol[i] + ": None ,"
    
    try :
        sqlResInfo = sqlResInfo + "'score'" + ":'" + browser_rest.find_element_by_css_selector('.r2Cf69qf').text + "'," # 抓平均分數
        sqlResInfo = sqlResInfo + "'comment'" + ":'" + browser_rest.find_element_by_css_selector('._10Iv7dOs').text + "'}" # 評論數
    except:
        sqlResInfo = sqlResInfo + "'score'" + ": None ,"
        sqlResInfo = sqlResInfo + "'comment'" + ": None }"
    try:
        print(sqlResInfo)
        table.insertRes(sqlResInfo)
    except Exception as e:
        print(e)

def pageRestaurant(table): # 抓這頁所有餐廳資訊
    browser.implicitly_wait(30)
    find_restaurant = browser.find_elements_by_css_selector('._15_ydu6b')
    time.sleep(10)
    for restaurant in find_restaurant:
        sqlResInfo = ""
        resturl = restaurant.get_attribute("href") # 店家網址 
        sqlResInfo = sqlResInfo + "{'resName':"+ '"'+ restaurant.text[restaurant.text.index(' ')+1:] + '"' + ",'url':'" + resturl + "',"
        findRestaurantInfo(resturl, sqlResInfo, table)

def nextPageUrl(): # 抓下一頁的網址
    try:
        nextpage = browser.find_elements_by_xpath('//*[@id="EATERY_LIST_CONTENTS"]/div[2]/div/a')
        for i in range(len(nextpage)):
            if (nextpage[i].text == "下一步"):
                return(nextpage[i].get_attribute('href'))
        return('1')
    except:
        return('1')

def search(town, table):
    try: # 找地點
        time.sleep(20)
        browser.find_element_by_css_selector('._2cMt8_9M').click() #關廣告
        time.sleep(5)
        searchBar = browser.find_elements_by_css_selector('._3qLQ-U8m') # 搜尋地點
        searchBar[1].send_keys(town)
        time.sleep(15)
        browser.find_element_by_xpath('//*[@id="component_6"]/div/div/form/div/a[1]').click() # 第一個選項
    except:
        print("can not find " + town)
    time.sleep(5)

    try: # 所有餐廳的資料
        pageRestaurant(table)
        url = nextPageUrl()
        while ( url != "1"):
            browser.get(url)
            pageRestaurant(table)
            url = nextPageUrl()
    except Exception as e:
        print(e)
        print("can not find page")
    

def main():
    print ("請輸入地名: ", end = "")
    town = input()
    table = sql.tripadvisor_Res(town)
    browser.get("https://www.tripadvisor.com.tw/Restaurants")
    search(town, table)

if __name__ == '__main__':
    main()