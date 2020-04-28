#### Запуск

1. `npm i`
2. `npm start`

Тестировал в Chrome 81, Firefox 75.

1. **Интерфейс страницы "Видеонаблюдение"**:

    Страница - [localhost:3102](http://localhost:3102).
    
    Код - [index.html](index.html), [index.js](index.js)
    
2. **Фильтры для видео**:

    Страница - [localhost:3102/filter.html](http://localhost:3102/filter.html)
    
    Код - [filter.html](filter.html), [filter.js](filter.js)
    
3. **Анализатор звука**:

    Страница - [localhost:3102/volume.html](http://localhost:3102/volume.html)
    
    Код - [volume.html](volume.html), [volume.js](volume.js). Отрисовка уровня шума реализована с помощью canvas.
    
    *Не удалось решить проблему: В текущей вкладке Chrome видео перестаёт воспроизводиться и пропадает звук. В Firefox версии 75 всё в порядке.*
