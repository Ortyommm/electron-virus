# LocalPass - программа для хранения паролей.

Как следует из названия, основное преимущество данной программы заключается в хранении паролей локально, так как выгрузка своих паролей на не всегда известный сервер часто вызывает недоверие. Пароли хранятся в зашифрованном виде, поэтому хранение их даже на своем ПК безопасно. 

При каждом входе в программу вас будет встречать окно, которое требует пароль *от самой программы LocalPass*. По этому одному паролю шифруются и дешифруются все занесенные в программу пароли. Пароль от программы можно поменять в любое время.

![image-20211003125314937](https://i.ibb.co/ZYsNT3g/image-20211003123049108.png)

Пароли в программе представлены в виде списка. Можно проводить поиск среди паролей. Пароли можно удалять и редактировать.

![image-20211003125314937](https://i.ibb.co/KD3ZcR4/image-20211003125314937.png)

При нажатии открывается модальное окно:

![image-20211003125504356](https://i.ibb.co/Fn2DwLd/image-20211003125504356.png)

Создание пароля происходит через следующую форму:

![image-20211003123731555](https://i.ibb.co/SNXWpNv/image-20211003123731555.png)

Пример заполнения данной формы:

![image-20211003123926851](https://i.ibb.co/G7BWVrF/image-20211003123926851.png)

Если вы хотите сделать резервную копию всех паролей, то вам следует:

1. Перейти в раздел "Опции".
2. Нажать на "Создать резервную копию". На рабочем столе появится архив.

После для добавления паролей из этого архива в программу, в которой этих паролей нет(например, вы переустановили Windows), сделайте следующее:

1. Перейдите в папку %APPDATA%/LocalPass.
2. Распакуйте папку passwords из архива (резервной копии) в эту папку.

Вы также можете переносить отдельные файлы из папки passwords архива в папку passwords программы.



LocalPass имеет две темы - светлую и темную:

![image-20211003124325910](https://i.ibb.co/GcWqs7q/image-20211003124341556.png)

![image-20211003124341556](https://i.ibb.co/fdV8h5H/image-20211003124325910.png)
