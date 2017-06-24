import { SchoolYearPage } from './app.po';

describe('school-year App', () => {
  let page: SchoolYearPage;

  beforeEach(() => {
    page = new SchoolYearPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
