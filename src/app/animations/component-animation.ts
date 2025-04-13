import { trigger, style, animate, transition} from '@angular/animations';

export const componentAnimation = trigger('componentAnimation', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-1%)',
      }),
      animate(
        '400ms ease-in',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
    ])
  ])