# TekserAI

TekserAI – это платформа, основанная на искусственном интеллекте, которая помогает учителям и родителям эффективно проверять домашние задания. Платформа автоматизирует процесс проверки, снижает временные затраты и минимизирует вероятность ошибок. поддерживает многоязычность (казахский, русский, английский).

## Основные функции

- **OCR (Распознавание текста):** Распознавание текста из изображений, загруженных учениками или учителями.
- **LLM (Большие языковые модели):** Использование современных языковых моделей для анализа и проверки текстов.
- **Интеграция с Kundelik.kz:** Автоматическая синхронизация оценок и заданий.
- **Поддержка многоязычности:** Работа на казахском, русском и английском языках.
- **Интуитивно понятный интерфейс:** Удобный и простой дизайн для пользователей разного уровня подготовки.

## Как запустить проект локально

### Требования
- Node.js (LTS версия рекомендуется)
- NPM или Yarn
- Git

### Установка
1. Клонируйте репозиторий:
   ```bash
   git clone <ссылка на репозиторий>
   cd tekserai
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
   или, если вы используете Yarn:
   ```bash
   yarn install
   ```
3. Настройте файл `.env`:
   Создайте файл `.env` на основе `.env.example` и заполните необходимые переменные окружения.

### Запуск в режиме разработки
```bash
npm start
```
Или:
```bash
yarn start
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000).

### Сборка для продакшена
```bash
npm run build
```
Или:
```bash
yarn build
```

Собранный проект будет находиться в папке `build`.

## Видео-обзор
Посмотрите видео-обзор проекта, чтобы узнать больше о функционале и возможностях TekserAI:
[Ссылка на видео](<https://us02web.zoom.us/rec/share/OJCfDsVjCf3U9XPAAR9fLAsy0vHoQeIW9pk2qDqdgHtLSwrwzn4EncLZFkv3LPMr.Q19psSohOf1hQeH0>)

## Посетите сайт

[Ссылка на сайт](<https://tekser-ai.vercel.app/>)

## Технологии
- **Frontend:** React, TailwindCSS
- **Backend:** Использование API для взаимодействия с LLM и OCR.
- **Интеграция:** Kundelik.kz
- **Языки:** JavaScript, TypeScript
- **Инструменты:** Axios, Redux, React Hook Form, i18next, Framer Motion

---

**Спасибо за использование TekserAI!**