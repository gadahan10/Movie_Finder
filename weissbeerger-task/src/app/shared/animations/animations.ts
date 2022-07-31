import { animate, state, style, transition, trigger } from "@angular/animations";

export const modalShowHide = trigger('modalShowHide', [
	state('hide', style({ opacity: '0', zIndex: -10000,  pointerEvents: 'none'})),
	state('show', style({ opacity: '1', zIndex: 100000000000000000, pointerEvents: 'auto' })),
	transition('hide <=> show', animate('300ms ease-in'))
]);