import { useEffect, useState } from 'react';

type TimerProps = {
	initialCount: number; // starting count
	mode: 'countup' | 'countdown'; // mode of the timer
	// onComplete?: () => void; // action to trigger when timer completes
};

export function useTimer({ initialCount, mode }: TimerProps) {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => {
				if (mode === 'countdown') {
					if (prevCount <= 0) {
						clearInterval(interval);
						// if (onComplete) onComplete();
						return 0;
					}
					return prevCount - 1;
				} else {
					return prevCount + 1;
				}
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [mode]);

	return count;
}
