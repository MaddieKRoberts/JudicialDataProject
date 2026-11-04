from bs4 import BeautifulSoup as bs
#Scrapes downloaded files
l = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
NameList = []
for i in range(26):
    List = 0
    for m in range(0, 34):
        try: 
            FilePath = f'/home/maddie/NamePages/page{l[i]}{m}.html'
            with open (FilePath, 'r') as TestNames:
                content = TestNames.read()


            soup = bs(content, 'html.parser')
            names = soup.find_all(class_ = 'cursor-pointer disabled:text-louie disabled:hover:text-louie disabled:hover:no-underline disabled:active:text-louie font-medium text-lapis-400 hover:text-lapis-500 hover:underline active:text-lapis-400 basis-[19%] text-sm')
            counter = 0
            
            for p in names:
                name = names[counter].text
                print(names[counter].text)
                counter += 1
                with open ('/home/maddie/workplease.txt', 'a') as file:
                    file.write(name + ', ')

        except FileNotFoundError:
            pass

        
    List += 1

print(NameList)



