import Calendar from "./lib/Calendar.jsx";

const App = () => {
    return (
        <div style={{
            maxWidth: "42rem", /* max-w-2xl */
            margin: "0 auto", /* mx-auto */
            padding: "2.5rem 1rem", /* py-10 */
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", /* h-screen */
            fontFamily: "IRANSansXFaNum"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 0", /* py-2 */
                width: "100%",
                fontSize: "1.25rem", /* text-xl */
                marginBottom: "1rem"
            }}>
                <a
                    href="https://github.com/mehr1300/jalali-event-calendar"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#4b5563", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => e.target.style.color = "#6b7280"}
                    onMouseOut={(e) => e.target.style.color = "#4b5563"}
                >
                    Show in Github
                </a>
            </div>

            <Calendar />

            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 0", /* py-2 */
                width: "100%",
                fontSize: "0.875rem", /* text-sm */
                marginTop: "1rem"
            }}>
                <a
                    href="https://nilfamtech.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => e.target.style.color = "#9ca3af"}
                    onMouseOut={(e) => e.target.style.color = "#6b7280"}
                >
                    nilfamtech.com
                </a>
            </div>
        </div>
    );
};

export default App;
