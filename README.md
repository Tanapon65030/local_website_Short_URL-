# การตั้งค่าเซิร์ฟเวอร์สำหรับเว็บไซต์ย่อ URL

เซิร์ฟเวอร์สำหรับเว็บไซต์ย่อ URL ที่โฮสต์อยู่ที่ [https://boomtanapon.netlify.app/](https://boomtanapon.netlify.app/). 
คู่มือนี้จะแนะนำขั้นตอนในการเริ่มต้นและทำให้เซิร์ฟเวอร์ของคุณทำงานได้

github [https://github.com/Tanapon65030/server_website_Short_URL-.git](https://github.com/Tanapon65030/server_website_Short_URL-.git). 


## สิ่งที่ต้องใช้

- Node.js
- Git (สำหรับการโคลน repository)
- MongoDB

## เริ่มต้นการใช้งาน

โคลน repository มายังเครื่องคอมพิวเตอร์ของคุณก่อน:

```bash
git clone https://github.com/Tanapon65030/server_website_Short_URL-.git
cd server_website_Short_URL-
```
จากนั้นติดตั้ง npm packages ที่จำเป็น:
```bash
npm install
```
เปลี่ยน url mongodb ที่ไฟล์ index.js บรรทัดที่ 14
```bash
const defaultProxy = " url ของคุณ ";
```
รัน server ด้วยคำสั่ง
```bash
cd src
node index.js
```
เมื่อเชื่อมต่อเสร็จจะขึ้นข้อความว่า

Server is running on port 5000
MongoDB connection successful

##เสร็จเรียบร้อย สนุกกับการใช้งาน
เซิร์ฟเวอร์ของคุณตอนนี้ถูกตั้งค่าและกำลังทำงาน สนุกกับการใช้งานเว็บไซต์ย่อ URL!
