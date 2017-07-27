import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	const rangeHandle = document.querySelector('.range__handle');
	const inputRange = document.querySelector('input[type="range"]');
	const MIN_RANGE_HANDLE = -1; // css left: -1%
	const MAX_RANGE_HANDLE = 99; // css left: 99%
	const RANGE_COORDS = document.querySelector('.range__progress').getBoundingClientRect();

	function initRangeHandlePosition(){
		rangeHandle.style.left = inputRange.value + '%';
	}

	function setInputRange(position){
		inputRange.value = Math.floor(position);
	}

	function moveAt(e, shift) {
		const handlePosition = (e.pageX - RANGE_COORDS.left - shift) / RANGE_COORDS.width * 100;

		if (handlePosition < MIN_RANGE_HANDLE || handlePosition > MAX_RANGE_HANDLE) {
			return false;
		}

		rangeHandle.style.left = handlePosition + '%';
		setInputRange(handlePosition);
	}

	function stopDrag(){
		document.onmousemove = null;
		rangeHandle.onmouseup = null;
	}

	function rangeHandleDrag(e){
		const coords = this.getBoundingClientRect();
		const shiftX = e.pageX - coords.left;
		document.onmousemove = function (e){
			moveAt(e, shiftX);
		};
	}

	rangeHandle.addEventListener('mousedown', rangeHandleDrag);
	rangeHandle.addEventListener('dragstart', () => false); // prevent default action
	document.addEventListener('mouseup', stopDrag);

	svg4everybody();
	initRangeHandlePosition();
});
