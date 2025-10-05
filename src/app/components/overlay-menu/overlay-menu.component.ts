import {
  Component,
  Inject,
  PLATFORM_ID,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
          opacity: 1,
        })
      ),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in')),
    ]),
  ],
})
export class OverlayMenuComponent implements OnInit {
  public menuState: 'in' | 'out' = 'out';

  @Input() menuStyle: Record<string, string> = {};

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.checkMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileView();
  }

  checkMobileView() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width > 768) {
        this.menuState = 'out';
      }
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  navigateAndClose(route: string) {
    this.router.navigate([route]);
    this.menuState = 'out';
  }
}
