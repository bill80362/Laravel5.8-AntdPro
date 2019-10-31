# Laravel5.8-AntdPro
(SPA for Laravel and Ant Design Pro)  

React 
要yarn add 先安裝，這是源碼，只是執行不需要使用。  

Laravel 5.8 
composer install 安裝vendor後，應該就可以跑了，因為已經先將
react build 好放在目錄裡  

要跑起laravel，簡易方式是執行php artisan serve
我都是用apache環境運行，設定如下:

        <VirtualHost *:80>
                DocumentRoot  /home/bill/laravel/public
                ServerName laravel.bill.nctu.me
                CustomLog logs/access_log combined
                DirectoryIndex  index.php index.html index.htm index.shtml
                <Directory "/home/bill/laravel">
                    Options FollowSymLinks
                    AllowOverride All
                    Require all granted
                </Directory>
        </VirtualHost>


Laravel5.8 + Ant Desing Pro  
使用SPA方式製作，前後端分離，後台系統  
入口: http://laravel.bill.nctu.me/react  
帳號 : admin@admin.com / admin  
Git : https://github.com/bill80362/Laravel5.8-AntdPro/  
