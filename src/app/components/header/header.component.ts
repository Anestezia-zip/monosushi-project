import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse, IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('sidebarIconToggleCheckbox', {static: false}) sidebarIconToggleCheckbox!: ElementRef<HTMLInputElement>;

  public menuOpened = false;
  public basketModal = false;
  private basket: Array<IProductResponse> = [];
  public userCategories: ICategoryResponse[] = [];
  public totalPrice = 0;
  public totalAmount = 0;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCategories();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.userCategories = data;
    })
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  toggleBasket() {
    const basketBg = document.querySelector('.header-basket') as HTMLDivElement;
    const modalWrapper = document.querySelector('.modal-wrapper') as HTMLDivElement;

    basketBg.classList.toggle('active');
    this.basketModal = !this.basketModal;
    if(this.basketModal) {
      document.body.style.overflow = "hidden";
      modalWrapper.addEventListener('click', this.onClickInside);
      window.addEventListener('click', this.onClickOutside);
    } 
    else {
      document.body.style.overflow = "auto";
      modalWrapper.removeEventListener('click', this.onClickInside);
      window.removeEventListener('click', this.onClickOutside);
    }
  }

  onClickInside = (event: MouseEvent) => {
    event.stopPropagation();
  }
  
  onClickOutside = (event: MouseEvent) => {
    const modalWrapper = document.querySelector('.modal-wrapper') as HTMLDivElement;
    if (modalWrapper && !modalWrapper.contains(event.target as Node)) {
      this.toggleBasket();
    }
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

  get productsInBasket(): Array<IProductResponse> {
    return this.basket;
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalAmount();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  getTotalAmount(): void {
    this.totalAmount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket()
    })
  }
  
  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if(currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin():void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }
  
    

}


