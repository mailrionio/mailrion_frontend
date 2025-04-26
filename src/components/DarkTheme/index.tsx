import { getTimeOfDay } from '@/helpers';
import { setTheme, setUserPreffered } from '@/redux/features/utilSlice';
import { dispatch, useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { BsCloudSun, BsFillMoonStarsFill } from 'react-icons/bs';
import './theme.scss';
const DarkTheme = () => {
	const { theme, userPreffered } = useAppSelector((state) => state.utils);
	const [isDarkMode, setIsDarkMode] = useState(
		theme === 'light' ? false : true
	);

	const dayORnight = getTimeOfDay();

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (isDarkMode) {
			localStorage.setItem('theme', 'light');
			dispatch(setUserPreffered('light'));
			dispatch(setTheme('light'));
		} else {
			localStorage.setItem('theme', 'dark');
			dispatch(setTheme('dark'));
			dispatch(setUserPreffered('dark'));
		}
	};

	useEffect(() => {
		if (dayORnight === 'Evening') {
			if (userPreffered === 'dark') {
				localStorage.setItem('theme', 'dark');
				dispatch(setTheme('dark'));
				setIsDarkMode(true);
			} else if (userPreffered === 'light') {
				localStorage.setItem('theme', 'light');
				dispatch(setTheme('light'));
				setIsDarkMode(false);
			}
		} else if (dayORnight === 'Morning') {
			if (userPreffered === 'dark') {
				localStorage.setItem('theme', 'dark');
				dispatch(setTheme('dark'));
				setIsDarkMode(true);
			} else if (userPreffered === 'light') {
				localStorage.setItem('theme', 'light');
				dispatch(setTheme('light'));
				setIsDarkMode(false);
			}
		}
	}, [dayORnight, userPreffered]);

	return (
		<div className="dark-toggle">
			<input
				type="checkbox"
				name=""
				id="toggle"
				hidden
				checked={isDarkMode}
				onChange={toggleDarkMode}
			/>
			<label htmlFor="toggle" className="dark-toggle_label">
				<BsCloudSun className="sun" />
				<BsFillMoonStarsFill className="moon" />
			</label>
		</div>
	);
};

export default DarkTheme;
