# การตั้งค่า Local สำหรับเว็บไซต์ย่อ URL

เซิร์ฟเวอร์สำหรับเว็บไซต์ย่อ URL ที่โฮสต์อยู่ที่ [https://boomtanapon.netlify.app/](https://boomtanapon.netlify.app/). 
คู่มือนี้จะแนะนำขั้นตอนในการเริ่มต้นและทำให้เซิร์ฟเวอร์ของคุณทำงานได้

github [https://github.com/Tanapon65030/local_website_Short_URL-.git](https://github.com/Tanapon65030/local_website_Short_URL-.git). 


## สิ่งที่ต้องใช้

- Node.js
- Git (สำหรับการโคลน repository)

## เริ่มต้นการใช้งาน

โคลน repository มายังเครื่องคอมพิวเตอร์ของคุณก่อน:

```bash
git clone https://github.com/Tanapon65030/local_website_Short_URL-.git
cd local_website_Short_URL
```
จากนั้นติดตั้ง npm packages ที่จำเป็น:
```bash
npm install
```
เปลี่ยน url server ที่ไฟล์ UrlForm.js บรรทัดที่ 10
ตำแหน่ง /src/components/UrlForm.js
```bash
const defaultProxy = " url ของคุณ ";
```

เปลี่ยน url server ที่ไฟล์ UrlHistory.js บรรทัดที่ 10
ตำแหน่ง /src/components/UrlHistory.js
```bash
const defaultProxy = " url ของคุณ ";
```

รัน local ด้วยคำสั่ง
```bash
npm start
```

##เสร็จเรียบร้อย สนุกกับการใช้งาน
เซิร์ฟเวอร์ของคุณตอนนี้ถูกตั้งค่าและกำลังทำงาน สนุกกับการใช้งานเว็บไซต์ย่อ URL!
