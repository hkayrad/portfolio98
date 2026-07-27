import { useEffect, useState } from "react";
import waitCursor from "/cursors/wait.cur";

export default function PageLoader({ setIsLoading }: { setIsLoading: (isLoading: boolean) => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 3.8461; // Increment by 3.8461 to reach 100 in 26 steps (approx. 2 seconds)
            });
        }, 75); // 75ms interval for smoother progress

        return () => clearInterval(interval);
    }, [setIsLoading]);

    useEffect(() => {
        if (progress === 100) {
            setIsLoading(false);
        }
    }, [progress, setIsLoading]);

    return (
        <div className="bg-[#008484] min-w-screen min-h-screen grid place-items-center"
        style={{
            cursor: `url(${waitCursor}), auto`,
        }}>
            <div className="window w-124.25 h-lg">
                <div className="title-bar">
                    <div className="title-bar-text">Portfolio 98 Setup</div>
                </div>
                <div className="window-body flex flex-col gap-4">
                    <div className="flex items-start gap-2">
                        <img src="/images/drums.gif"/>
                        <p className="h-fit mt-auto">Installing Portfolio 98...</p>
                    </div>
                    <div className="progress-indicator segmented">
                        <div className="progress-indicator-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}