import { url } from 'inspector'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { invoke } from '@tauri-apps/api/tauri'
import './global.css'
import { Button, Progress } from 'flowbite-react'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

function Splash() {
	const interval: { current: NodeJS.Timeout | null } = useRef(null)
	const [progress, setProgress] = React.useState(0)
	const [checkIndex, setCheckIndex] = React.useState(0)
	const [check, setCheck] = React.useState('')

	const checks = [
		'Initializing...',
		'Loading settings...',
		'Checking for updates...',
		'Checking for new data...',
		'Ending splash screen...',
	]

	document.addEventListener('beforeunload', () => {
		if (interval.current) {
			clearInterval(interval.current)
		}
	})
	document.addEventListener('unload', () => {
		if (interval.current) {
			clearInterval(interval.current)
		}
	})

	useEffect(() => {
		interval.current && clearInterval(interval.current)
		interval.current = setInterval(() => {
			setProgress((oldProgress) => {
				const diff = 100 / checks.length
				return Math.min(oldProgress + diff, 100)
			})
		}, 1000)
	}, [])
	useEffect(() => {
		setCheckIndex((oldCheckIndex) => {
			if (oldCheckIndex < checks.length) {
				setCheck(checks[oldCheckIndex])
				return oldCheckIndex + 1
			}
			setCheck('Checks complete!')
			return oldCheckIndex
		})
		if (progress >= 100) {
			// print document to console
			console.log(document.documentElement.outerHTML)
			interval.current && clearInterval(interval.current)
			invoke('close_splashscreen')
		}
	}, [progress])

	return (
		<div className="w-screen h-screen overflow-hidden items-center text-white font-command rounded-2xl select-none">
			<div className="z-10 inset-0 absolute flex flex-col items-center justify-center text-center gap-4 px-4 pb-4">
				<span className="text-5xl drop-shadow w-full mt-4">
					KH3 Mod Toolkit
				</span>
				<div className="w-full h-full bg-black bg-opacity-50 backdrop-blur rounded-xl flex flex-col justify-center ma-4">
					<div className="flex flex-col">
						<span className="text-2xl text-center">Loading...</span>
						<div className="h-2.5 mx-4 bg-black bg-opacity-50 rounded-full">
							<div
								className="bg-blue-600 bg-opacity-75 h-full rounded-full transition-none"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<div className="flex justify-between mt-1 mx-4">
							<span>{check}</span>
							<span>{progress}%</span>
						</div>
					</div>
				</div>
			</div>
			<div className="splash-background w-[1800px] h-[900px] bg-repeat z-0" />
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Splash />
	</React.StrictMode>
)
