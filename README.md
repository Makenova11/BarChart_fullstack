# Fullstack (React + .NET 5 + PostgreSQL)
ORM - Entity Framework, Dependency injection выполнено с помощью встроенного контейнера внедрения зависимостей,
подход - CodeFirst, многослойная архитектура (context, service, controller).

Одностраничное веб-приложение. В таблицу вводят данные пользователей, которые сохраняются в БД по кнопке Save.
По  кнопке Calculate производится расчёт Rolling Retention 7 day* и строится гистограмма "длительности жизни пользователей"**.
Также выводятся данные профилирования ключевых операций.

*Rolling Retention X day = (количество пользователей, вернувшихся в систему в X-ый день или позже) /
(количество пользователей, установивших приложение X дней назад или раньше) * 100%.

**(длительность жизни - это количество времени в днях от регистрации до последней активности).


