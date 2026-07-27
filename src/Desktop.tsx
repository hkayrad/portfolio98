import { useState } from "react";
import Window from "./components/Window";
import { useWindowManager } from "./hooks/useWindowManager";
import { WINDOWS, type WINDOW_TYPE } from "./lib/enums";
import PageLoader from "./PageLoader";
import defaultCursor from "/cursors/default.cur";
import pointerCursor from "/cursors/pointer.cur";

export default function Desktop() {
  const { openWindows, closeWindow, maximizeWindow, restoreWindow, moveWindow, resizeWindow, focusWindow, openWindow } =
    useWindowManager();

  const [isLoading, setIsLoading] = useState(true);

  function openWindowFromTopLeft(windowType: WINDOW_TYPE, index: number) {
    const width = 400;
    const height = 300;
    const offset = index * 28;
    const x = 150 + offset;
    const y = 150 + offset;

    openWindow(windowType, {
      width,
      height,
      maximized: false,
      x,
      y,
    });
  }

  return <>
    {isLoading ? (
      <PageLoader setIsLoading={setIsLoading} />
    ) : (
      <div className="min-h-screen min-w-screen overflow-hidden"
        style={{
          cursor: `url(${defaultCursor}), auto`,
        }}>
        {Object.entries(openWindows).map(([windowType, windowProps]) => {
          if (!windowProps) {
            return null;
          }

          return <Window key={windowType} windowType={windowType} windowProps={windowProps} closeWindow={closeWindow} maximizeWindow={maximizeWindow} restoreWindow={restoreWindow} moveWindow={moveWindow} resizeWindow={resizeWindow} focusWindow={focusWindow} style={{ zIndex: windowProps.zIndex }} />;
        })}

        {Object.values(WINDOWS).map((windowType, index) => {
          return (
            <button
              key={windowType}
              className="absolute w-fit h-fit flex flex-col items-center justify-center gap-1 p-2 border-none"
              style={{ left: 12, top: 12 + index * 72, height: 60, background: "none", boxShadow: "none", cursor: `url(${pointerCursor}), auto` }}
              onDoubleClick={() => {
                openWindowFromTopLeft(windowType as WINDOW_TYPE, index);
              }}
            >
              <img src={`/desktopIcons/${windowType.toLowerCase()}.ico`} className="h-8 w-8" />
              <p>{windowType.charAt(0) + windowType.slice(1).toLowerCase()}</p>
            </button>
          );
        })}

        <img src="/images/bg.webp" className="absolute -z-10 h-full w-full object-cover object-right" />
      </div>
    )}
  </>
}
