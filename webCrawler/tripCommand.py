import sql
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.ChromeOptions()
options.add_argument('lang=UTF-8') # 更換header
browser = webdriver.Chrome()

def user(): # 放 user 資料

    try: #抓所有 user 資料
        user = browser.find_elements_by_xpath('//div[@class="info_text pointer_cursor"]/div[1]') #user name
        userName = []
        for u in user:
            print(u.text, end = " ")
            ActionChains(browser).double_click(u).perform()
            time.sleep(5)
            star = browser.find_elements_by_xpath('//*[@id="BODY_BLOCK_JQUERY_REFLOW"]/span/div[3]/div/div/div/div[3]/div/ul//div/span[3]')
            for s in star:
                print(s.text ,end=" ")
            print()
        
    except Exception as e:
        print(e)
        



def command(sqlInfo):# 一頁的評論 & 星星
    # title .noQuotes
    time.sleep(10)
    try: # 關廣告
        browser.find_element_by_css_selector('._2cMt8_9M').click()
    except:
        print(end = "")
    time.sleep(10)
    try : # 按更多
        clickMore = browser.find_element_by_xpath('//*[@id="review_774690683"]/div/div[2]/div[2]/div/p/span[2]')
        clickMore.click()
        time.sleep(3)
    except:
        print()
        
    try : # 抓title & content
        title = browser.find_elements_by_css_selector('.noQuotes')
        comment = browser.find_elements_by_css_selector('.partial_entry') # 內容
        managerec = browser.find_elements_by_css_selector('.mgrRspnInline') # 店家回復
        commentList = [] #整理完的所有 comment
        flag = 0
        for c in comment:
            for m in managerec:
                if (c.text == m.text.split('\n')[3]):
                    flag = 1
                    break
            if flag == 0:
                commentList.append(c.text)
            flag = 0
    except:
        print()
        
    try: # 抓評分(星星)
        score = browser.find_elements_by_xpath("//div[@class='ui_column is-9']/span[contains(@class, 'ui_bubble_rating')]")
        allScore = [] #全部評分的星星數
        for s in score:
            allScore.append(s.get_attribute('class')[24])
    except:
        print()


def main():
    # town = input() # 輸入城市
    # table = sql.tripadvisor_Res(town)
    # resInfo = table.returnResInfo() # 從檔案抓餐廳資料
    # for i in range(len(resInfo)):
    #     browser.get(resInfo[i][1]) # 餐廳
    #     sqlInfo = "{'RID':" + str(resInfo[i][0]) +"," # 紀錄餐廳RID
    #     command(sqlInfo)
    browser.get("https://www.tripadvisor.com.tw/Restaurant_Review-g13806800-d6726254-Reviews-Montreal_Style_Restaurant-Puli_Nantou.html")
    command(123)
    user()


if __name__ == '__main__':
    main()