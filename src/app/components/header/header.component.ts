import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('sidebarIconToggleCheckbox', {static: false}) sidebarIconToggleCheckbox!: ElementRef<HTMLInputElement>;

  menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu') && this.menuOpened) {
      this.menuOpened = false;
      this.sidebarIconToggleCheckbox.nativeElement.checked = false;
    } else if (target.closest('.dropdown-menu a') && this.menuOpened) {
      this.menuOpened = false;
      this.sidebarIconToggleCheckbox.nativeElement.checked = false;
    }
  }


  
    

}


