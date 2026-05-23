import { useEffect, useMemo, useState } from "react";
import { generateYearCalendar } from "../extensions/generateMonth";
import { toJalali } from "../extensions/utils";


const now = new Date();
const todayJalali = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());

// ... (کدهای آیکون‌ها بدون تغییر)
function ArrowLeftIcon({ className = "", size = 20 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ArrowRightIcon({ className = "", size = 20 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M19 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 6L5 12L11 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

export default function Calendar() {
    // ... (استیت‌ها و توابع منطقی دقیقاً مانند قبل بدون تغییر)
    const [year, setYear] = useState(todayJalali.jy);
    const [month, setMonth] = useState(todayJalali.jm - 1);
    const [day, setDay] = useState(0);

    const calendar = useMemo(() => generateYearCalendar(year), [year]);
    const monthData = calendar?.[month];

    const checkIsToday = (value) => {
        if (!value?.fullDate?.jalali) return false;
        const [jy, jm, jd] = value.fullDate.jalali.split("-").map(Number);
        return jy === todayJalali.jy && jm === todayJalali.jm && jd === todayJalali.jd;
    };

    useEffect(() => {
        if (!monthData?.days?.length) return;
        const todayIndex = monthData.days.findIndex(item => checkIsToday(item));
        if (todayIndex !== -1) {
            setDay(todayIndex);
            return;
        }
        const firstCurrentMonthIndex = monthData.days.findIndex(item => !item.disabled);
        setDay(firstCurrentMonthIndex !== -1 ? firstCurrentMonthIndex : 0);
    }, [year, month, monthData]);

    const selectedDayData = monthData?.days?.[day];
    const isCurrentlyToday = checkIsToday(selectedDayData);

    const handleGoToToday = () => {
        if (year === todayJalali.jy && month === todayJalali.jm - 1) {
            const todayIndex = monthData.days.findIndex(item => checkIsToday(item));
            if (todayIndex !== -1) setDay(todayIndex);
        } else {
            setYear(todayJalali.jy);
            setMonth(todayJalali.jm - 1);
        }
    };

    const goPrevMonth = () => {
        if (month > 0) { setMonth(prev => prev - 1); return; }
        setYear(prev => prev - 1); setMonth(11);
    };

    const goNextMonth = () => {
        if (month < 11) { setMonth(prev => prev + 1); return; }
        setYear(prev => prev + 1); setMonth(0);
    };

    const goPrevYear = () => setYear(prev => prev - 1);
    const goNextYear = () => setYear(prev => prev + 1);

    const handleDayClick = (value, index) => {
        if (!value.disabled) {
            setDay(index);
            return;
        }
        if (!value.fullDate?.jalali) return;
        const [jy, jm] = value.fullDate.jalali.split("-").map(Number);
        if (!Number.isNaN(jy) && !Number.isNaN(jm)) {
            setYear(jy);
            setMonth(jm - 1);
        }
    };

    // توابع دریافت کلاس‌های CSS
    const getDayCardClasses = (value, index) => {
        const isToday = checkIsToday(value);
        const isSelected = day === index;
        const isDisabled = value.disabled;
        const isHoliday = value.events?.isHoliday;
        const isFriday = value.weekDayIndex === 6;

        let classes = "pc-day ";
        classes += isDisabled ? "pc-day-disabled " : "pc-day-interactive ";

        if (isSelected) classes += "pc-day-selected ";
        else if (isDisabled) classes += "pc-day-inactive ";
        else if (isHoliday || isFriday) classes += "pc-day-holiday ";
        else classes += "pc-day-normal ";

        if (isToday) classes += "pc-day-today ";

        return classes.trim();
    };

    const getSubTextClasses = (value, index) => {
        const isToday = checkIsToday(value);
        const isSelected = day === index;

        if (isToday || isSelected) return "pc-text-light";
        if (value.disabled) return "pc-text-muted";
        return "pc-text-dark";
    };

    return (
        <div className="pc-container">
            {/* Header */}
            <div className="pc-header-controls">
                <button type="button" onClick={goPrevYear} className="pc-btn">
                    <ArrowLeftIcon size={18} />
                    <span>سال قبل</span>
                </button>
                <div className="pc-year-badge">سال {year}</div>
                <button type="button" onClick={goNextYear} className="pc-btn">
                    <span>سال بعد</span>
                    <ArrowRightIcon size={18} />
                </button>
            </div>

            {/* Title */}
            <div className="pc-month-title">
                <span className="jalali">
                    <span className="jalali-highlight kalameh">
                        {monthData?.header?.jalali?.split(" ")?.[0]}
                    </span>{" "}
                    {monthData?.header?.jalali?.split(" ")?.[1]}
                </span>
                <span className="gregorian">{monthData?.header?.gregorian}</span>
                <span className="hijri">{monthData?.header?.hijri}</span>
            </div>

            {/* month nav */}
            <div className="pc-month-nav">
                <button onClick={goPrevMonth} className="pc-nav-btn" type="button">
                    <ArrowLeftIcon size={20} />
                    <span>ماه قبلی</span>
                </button>
                <div style={{ minHeight: "31px" }}>
                    {!isCurrentlyToday && (
                        <button onClick={handleGoToToday} className="pc-today-btn">
                            برو به امروز
                        </button>
                    )}
                </div>
                <button onClick={goNextMonth} className="pc-nav-btn" type="button">
                    <span>ماه بعدی</span>
                    <ArrowRightIcon size={20} />
                </button>
            </div>

            {/* weekday names */}
            <div className="pc-weekdays">
                {weekDays.map((item, index) => (
                    <span key={item} className={index === 6 ? "pc-weekday-friday" : ""}>
                        {item}
                    </span>
                ))}
            </div>

            {/* days */}
            <div className="pc-days-grid">
                {monthData?.days?.map((value, index) => {
                    const hasEvents = value.events?.list?.length > 0;
                    const subTextClass = getSubTextClasses(value, index);

                    return (
                        <div onClick={() => handleDayClick(value, index)} key={index} className={getDayCardClasses(value, index)}>
                            {hasEvents && <span className="pc-event-dot" />}

                            <span className="pc-day-num kalameh">
                                {value.day.jalali}
                            </span>

                            <div className={`pc-day-sub ${subTextClass}`}>
                                <span style={{ fontFamily: "sans-serif" }}>{value.day.gregorian}</span>
                                <span>{value.day.hijri}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* selected day summary */}
            <div className="pc-summary">
                <div className="pc-summary-inner">
                    <span>
                        <span style={{ color: "#ca8a04", fontWeight: "bold" }}>
                            {selectedDayData?.day?.jalali}
                        </span>{" "}
                        {monthData?.header?.jalali?.split(" ")?.[0]}
                    </span>
                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                        <span style={{ color: "#4b5563", fontWeight: "bold" }}>{selectedDayData?.fullDate?.jalali}</span>
                        <span> / </span>
                        <span style={{ color: "#4b5563", fontWeight: "bold" }}>{selectedDayData?.fullDate?.hijri}</span>
                        <span> / </span>
                        <span style={{ color: "#4b5563", fontWeight: "bold" }}>{selectedDayData?.fullDate?.gregorian}</span>
                    </div>
                </div>
            </div>

            {/* events */}
            <div className="pc-events-wrapper">
                <div className="pc-events-list">
                    {selectedDayData?.events?.list?.length > 0 ? (
                        selectedDayData.events.list.map((item, index) =>
                            item?.isHoliday ? (
                                <div className="pc-event-holiday" key={index}>
                                    <span className="pc-event-holiday-bold">
                                        {selectedDayData?.day?.jalali} {monthData?.header?.jalali?.split(" ")?.[0]}{" "}
                                    </span>
                                    <span>{item.event}</span>
                                </div>
                            ) : (
                                <div key={index}>
                                    <span className="pc-event-normal-bold">
                                        {selectedDayData?.day?.jalali} {monthData?.header?.jalali?.split(" ")?.[0]}{" "}
                                    </span>
                                    <span>{item.event}</span>
                                </div>
                            )
                        )
                    ) : (
                        <div className="pc-event-empty">در این روز رویدادی وجود ندارد.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
