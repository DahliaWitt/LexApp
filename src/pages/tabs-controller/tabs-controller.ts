/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * tabs-controller.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * Tabs for the application
 */

import { Component } from '@angular/core';

import { OrdinancesPage } from '../ordinances/ordinances';
import { MyDistrictPage } from '../my-district/my-district';
import { CalendarPage } from "../calendar/calendar";

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = OrdinancesPage;
  tab2Root: any = MyDistrictPage;
  tab3Root: any = CalendarPage;

  constructor() {}
}
