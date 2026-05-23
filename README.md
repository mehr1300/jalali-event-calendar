# Jalali Event Calendar

A modern and beautiful Jalali (Persian) calendar component for React, built with Tailwind CSS.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mehr1300/jalali-event-calendar)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://mehr1300.github.io/jalali-event-calendar/)

**🔗 [Click here to view the Live Demo](https://mehr1300.github.io/jalali-event-calendar/)**

## Features
- Full Jalali (Persian) date support
- Modern design with Tailwind CSS
- Fully responsive and Dark Mode compatible
- Easy to use in React projects

## Installation

Using npm:
```bash
npm install jalali-event-calendar
```

## Usage

To use this package, first import the component and then its stylesheet into your project:

```jsx
import React from 'react';
// 1. Import the component
import { JalaliEventCalendar } from 'jalali-event-calendar';
// 2. Import the calendar styles
import 'jalali-event-calendar/style.css'; 

const App = () => {
  return (
    <div className="tw:flex tw:flex-col tw:p-20 tw:dark:bg-gray-900 tw:h-screen">
      <JalaliEventCalendar />
    </div>
  );
};

export default App;
```

## Screenshots
![Calendar View](https://raw.githubusercontent.com/mehr1300/jalali-event-calendar/refs/heads/master/screenshot.png)


---

# تقویم شمسی با تیلویند (Jalali Event Calendar)

یک کامپوننت تقویم شمسی (جلالی) مدرن و زیبا برای React که با استفاده از Tailwind CSS ساخته شده است.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mehr1300/jalali-event-calendar)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://mehr1300.github.io/jalali-event-calendar/)

**🔗 [برای مشاهده دموی زنده کلیک کنید](https://mehr1300.github.io/jalali-event-calendar/)**

## ویژگی‌ها
- پشتیبانی کامل از تاریخ شمسی
- طراحی مدرن با Tailwind CSS
- کاملاً ریسپانسیو و سازگار با Dark Mode
- استفاده آسان در پروژه‌های React

## نصب

با استفاده از npm:
```bash
npm install jalali-event-calendar
```

## نحوه استفاده

برای استفاده از این پکیج، ابتدا کامپوننت و سپس فایل استایل آن را در پروژه خود وارد کنید:

```jsx
import React from 'react';
// ۱. ایمپورت کردن کامپوننت
import { JalaliEventCalendar } from 'jalali-event-calendar';
// ۲. ایمپورت کردن استایل‌های تقویم
import 'jalali-event-calendar/style.css'; 

const App = () => {
  return (
    <div className="tw:flex tw:flex-col tw:p-20 tw:dark:bg-gray-900 tw:h-screen">
      <JalaliEventCalendar />
    </div>
  );
};

export default App;
```

## تصاویر (Screenshots)
![Calendar View](https://raw.githubusercontent.com/mehr1300/jalali-event-calendar/refs/heads/master/screenshot.png)
