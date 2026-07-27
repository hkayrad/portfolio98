import { useRef, useState } from "react";
import type { WINDOW_TYPE } from "../lib/enums";

type WindowState = {
    width: number;
    height: number;
    maximized: boolean;
    x: number;
    y: number;
    zIndex: number;
};

type WindowInitState = Omit<WindowState, "zIndex">;

export function useWindowManager() {
    const [openWindows, setOpenWindows] = useState<
        {
            [key in WINDOW_TYPE]?: WindowState;
        }
    >({});
    const closedWindows = useRef<Partial<Record<WINDOW_TYPE, WindowState>>>({});
    const nextZIndex = useRef(1);

    const [activeWindow, setActiveWindow] =
        useState<WINDOW_TYPE | null>(null);

    function focusWindow(windowType: WINDOW_TYPE) {
        setActiveWindow(windowType);

        setOpenWindows((prev) => {
            if (!prev[windowType]) {
                return prev;
            }

            return {
                ...prev,
                [windowType]: {
                    ...prev[windowType]!,
                    zIndex: nextZIndex.current++,
                },
            };
        });
    }

    function openWindow(windowType: WINDOW_TYPE, windowProps: WindowInitState) {
        setOpenWindows((prev) => {
            if (prev[windowType]) {
                return prev;
            }

            setActiveWindow(windowType);

            const restoredWindow = closedWindows.current[windowType];

            return {
                ...prev,
                [windowType]: {
                    ...(restoredWindow ?? windowProps),
                    zIndex: nextZIndex.current++,
                },
            };
        });
    }

    function closeWindow(windowType: WINDOW_TYPE) {
        setOpenWindows((prev) => {
            if (prev[windowType]) {
                closedWindows.current[windowType] = prev[windowType];
            }

            const newOpenWindows = { ...prev };
            delete newOpenWindows[windowType];

            if (activeWindow === windowType) {
                setActiveWindow(null);
            }

            return newOpenWindows;
        });
    }

    function maximizeWindow(windowType: WINDOW_TYPE) {
        setOpenWindows((prev) => {
            const newOpenWindows = { ...prev };
            if (newOpenWindows[windowType]) {
                newOpenWindows[windowType]!.maximized = true;
            }
            return newOpenWindows;
        });
    }

    function restoreWindow(windowType: WINDOW_TYPE) {
        setOpenWindows((prev) => {
            const newOpenWindows = { ...prev };
            if (newOpenWindows[windowType]) {
                newOpenWindows[windowType]!.maximized = false;
            }
            return newOpenWindows;
        });
    }

    function moveWindow(windowType: WINDOW_TYPE, x: number, y: number) {
        setOpenWindows((prev) => {
            const newOpenWindows = { ...prev };
            if (newOpenWindows[windowType]) {
                newOpenWindows[windowType] = {
                    ...newOpenWindows[windowType]!,
                    x,
                    y,
                };
            }
            return newOpenWindows;
        });
    }

    function resizeWindow(windowType: WINDOW_TYPE, x: number, y: number, width: number, height: number) {
        setOpenWindows((prev) => {
            const newOpenWindows = { ...prev };
            if (newOpenWindows[windowType]) {
                newOpenWindows[windowType] = {
                    ...newOpenWindows[windowType]!,
                    x,
                    y,
                    width,
                    height,
                };
            }
            return newOpenWindows;
        });
    }

    return {
        openWindows,
        setOpenWindows,
        openWindow,
        closeWindow,
        maximizeWindow,
        restoreWindow,
        moveWindow,
        resizeWindow,
        focusWindow,
        activeWindow,
        setActiveWindow,
    }
}