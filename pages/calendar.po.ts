import { Page } from '@playwright/test';
export default class Calendar{
    Page: Page;

  constructor(page: Page) {
    this.Page = page;
  }

  //Locators
  statusFilter = async () => this.Page.locator('[data-test="FilterButton"]',{hasText: 'Status'})
  event = async () => this.Page.locator('[data-test="EventShell"]')
  SimpleCalendar = async () => this.Page.locator('[data-test="SimpleCalendar"]')
  CalendarDropDown = async () => this.Page.locator('[data-test="ToggleButton"]')
  CalendarDayButton = async () => this.Page.locator('[data-test="CalendarDayButton"]')
  DayIndicator = async () => this.Page.locator('[data-test="DateIndicator"]')

  public async clickFilters() {
      await (await this.statusFilter())?.click()
  }
}


