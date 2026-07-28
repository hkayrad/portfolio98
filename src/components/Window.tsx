
import { useEffect, useRef } from "react";

import nwseCursor from "/cursors/nwse.cur";
import neswCursor from "/cursors/nesw.cur";
import nsCursor from "/cursors/ns.cur";
import ewCursor from "/cursors/ew.cur";
import { WINDOWS } from "../lib/enums";
import Contact from "./windowContent/Contact";
import Github from "./windowContent/Github";

import pointerCursor from "/cursors/pointer.cur";

type ResizeEdge = "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-right" | "bottom-left";

type InteractionState =
	| {
		type: "drag";
		startX: number;
		startY: number;
		offsetX: number;
		offsetY: number;
	}
	| {
		type: "resize";
		edge: ResizeEdge;
		startX: number;
		startY: number;
		startLeft: number;
		startTop: number;
		startWidth: number;
		startHeight: number;
	}
	| null;

const MIN_WIDTH = 240;
const MIN_HEIGHT = 180;

const contentMap = {
	[WINDOWS.ABOUT]: <div>About content</div>,
	[WINDOWS.PROJECTS]: <div>Projects content</div>,
	[WINDOWS.CONTACT]: <Contact />,
	[WINDOWS.GITHUB]: <Github />,
}

export default function Window(
	{ windowType, windowProps, closeWindow, maximizeWindow, restoreWindow, moveWindow, resizeWindow, focusWindow, style, ...props }:
		React.HTMLAttributes<HTMLDivElement> & {
			windowType: string,
			windowProps: any,
			closeWindow: (windowType: string) => void,
			maximizeWindow: (windowType: string) => void,
			restoreWindow: (windowType: string) => void,
			moveWindow: (windowType: string, x: number, y: number) => void,
			resizeWindow: (windowType: string, x: number, y: number, width: number, height: number) => void,
			focusWindow: (windowType: string) => void,
		}) {
	const interaction = useRef<InteractionState>(null);
	const isResizable = windowType === WINDOWS.GITHUB ? false : (windowProps.resizable ?? true);

	const resizeCornerStyle = {
		position: "absolute" as const,
		width: 10,
		height: 10,
		zIndex: 11,
	};

	useEffect(() => {
		function handleMouseMove(event: MouseEvent) {
			if (!interaction.current || windowProps.maximized) {
				return;
			}

			const currentWidth = windowProps.width ?? 400;
			const currentHeight = windowProps.height ?? 300;

			if (interaction.current.type === "drag") {
				const rawX = event.clientX - interaction.current.offsetX;
				const rawY = event.clientY - interaction.current.offsetY;

				const maxLeft = Math.max(0, window.innerWidth - currentWidth);
				const maxTop = Math.max(0, window.innerHeight - currentHeight);

				const clampedX = Math.max(0, Math.min(maxLeft, rawX));
				const clampedY = Math.max(0, Math.min(maxTop, rawY));

				moveWindow(windowType, clampedX, clampedY);
				return;
			}

			if (!isResizable) {
				return;
			}

			const deltaX = event.clientX - interaction.current.startX;
			const deltaY = event.clientY - interaction.current.startY;
			let nextLeft = interaction.current.startLeft;
			let nextTop = interaction.current.startTop;
			let nextWidth = interaction.current.startWidth;
			let nextHeight = interaction.current.startHeight;

			if (interaction.current.edge === "right" || interaction.current.edge === "top-right" || interaction.current.edge === "bottom-right") {
				nextWidth = Math.max(MIN_WIDTH, interaction.current.startWidth + deltaX);
			}

			if (interaction.current.edge === "bottom" || interaction.current.edge === "bottom-left" || interaction.current.edge === "bottom-right") {
				nextHeight = Math.max(MIN_HEIGHT, interaction.current.startHeight + deltaY);
			}

			if (interaction.current.edge === "left" || interaction.current.edge === "top-left" || interaction.current.edge === "bottom-left") {
				const appliedDeltaX = Math.min(deltaX, interaction.current.startWidth - MIN_WIDTH);
				nextLeft = interaction.current.startLeft + appliedDeltaX;
				nextWidth = interaction.current.startWidth - appliedDeltaX;
			}

			if (interaction.current.edge === "top" || interaction.current.edge === "top-left" || interaction.current.edge === "top-right") {
				const appliedDeltaY = Math.min(deltaY, interaction.current.startHeight - MIN_HEIGHT);
				nextTop = interaction.current.startTop + appliedDeltaY;
				nextHeight = interaction.current.startHeight - appliedDeltaY;
			}

			nextLeft = Math.max(0, Math.min(window.innerWidth - MIN_WIDTH, nextLeft));
			nextTop = Math.max(0, Math.min(window.innerHeight - MIN_HEIGHT, nextTop));
			nextWidth = Math.min(nextWidth, Math.max(MIN_WIDTH, window.innerWidth - nextLeft));
			nextHeight = Math.min(nextHeight, Math.max(MIN_HEIGHT, window.innerHeight - nextTop));

			resizeWindow(windowType, nextLeft, nextTop, nextWidth, nextHeight);
		}

		function handleMouseUp() {
			interaction.current = null;
		}

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [moveWindow, resizeWindow, windowProps.maximized, windowProps.width, windowProps.height, windowType, isResizable]);

	function startDrag(event: React.MouseEvent<HTMLDivElement>) {
		if (windowProps.maximized) {
			return;
		}

		if (event.target instanceof HTMLElement && event.target.closest("button")) {
			return;
		}

		interaction.current = {
			type: "drag",
			startX: event.clientX,
			startY: event.clientY,
			offsetX: event.clientX - (windowProps.x ?? 100),
			offsetY: event.clientY - (windowProps.y ?? 100),
		};
		event.preventDefault();
	}

	function startResize(edge: ResizeEdge) {
		return (event: React.MouseEvent<HTMLDivElement>) => {
			if (windowProps.maximized || !isResizable) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();
			focusWindow(windowType);
			interaction.current = {
				type: "resize",
				edge,
				startX: event.clientX,
				startY: event.clientY,
				startLeft: windowProps.x ?? 100,
				startTop: windowProps.y ?? 100,
				startWidth: windowProps.width ?? 400,
				startHeight: windowProps.height ?? 300,
			};
		};
	}

	return <div
		onMouseDown={() => focusWindow(windowType)}
		style={{
			width: windowProps.maximized ? "100%" : windowProps.width ?? 400,
			height: windowProps.maximized ? "100%" : windowProps.height ?? 300,
			left: windowProps.maximized ? 0 : Math.max(0, Math.min(Math.max(0, window.innerWidth - (windowProps.width ?? 400)), windowProps.x ?? 100)),
			top: windowProps.maximized ? 0 : Math.max(0, Math.min(Math.max(0, window.innerHeight - (windowProps.height ?? 300)), windowProps.y ?? 100)),
			...style,
		}}
		{...props}
		className="window absolute select-none"
	>
		<div className="title-bar" onMouseDown={startDrag}>
			<div className="title-bar-text">{windowType.charAt(0) + windowType.slice(1).toLowerCase()}</div>
			<div className="title-bar-controls">
				<button aria-label="Minimize" style={{ cursor: `url(${pointerCursor}), auto` }} />
				<button
					aria-label={windowProps.maximized ? "Restore" : "Maximize"}
					disabled={!isResizable}
					onClick={() => {
						if (!isResizable) return;
						windowProps.maximized ? restoreWindow(windowType) : maximizeWindow(windowType);
					}}
					style={{ cursor: isResizable ? `url(${pointerCursor}), auto` : "default" }}
				/>
				<button aria-label="Close" onClick={() => closeWindow(windowType)} style={{ cursor: `url(${pointerCursor}), auto` }} />
			</div>
		</div>
		<div className="window-body">
			{contentMap[windowType] || <div>Unknown window type: {windowType}</div>}
		</div>
		{isResizable && (
			<>
				<div onMouseDown={startResize("top-left")} style={{ ...resizeCornerStyle, top: 0, left: 0, cursor: `url(${nwseCursor}), auto` }} />
				<div onMouseDown={startResize("top-right")} style={{ ...resizeCornerStyle, top: 0, right: 0, cursor: `url(${neswCursor}), auto` }} />
				<div onMouseDown={startResize("bottom-right")} style={{ ...resizeCornerStyle, right: 0, bottom: 0, cursor: `url(${nwseCursor}), auto` }} />
				<div onMouseDown={startResize("bottom-left")} style={{ ...resizeCornerStyle, left: 0, bottom: 0, cursor: `url(${nwseCursor}), auto` }} />
				<div onMouseDown={startResize("top")} style={{ position: "absolute", left: 6, top: 0, right: 6, height: 6, cursor: `url(${nsCursor}), auto` }} />
				<div onMouseDown={startResize("right")} style={{ position: "absolute", top: 6, right: 0, bottom: 6, width: 6, cursor: `url(${ewCursor}), auto` }} />
				<div onMouseDown={startResize("bottom")} style={{ position: "absolute", left: 6, right: 6, bottom: 0, height: 6, cursor: `url(${nsCursor}), auto` }} />
				<div onMouseDown={startResize("left")} style={{ position: "absolute", top: 6, left: 0, bottom: 6, width: 6, cursor: `url(${ewCursor}), auto` }} />
			</>
		)}
	</div>;
}
