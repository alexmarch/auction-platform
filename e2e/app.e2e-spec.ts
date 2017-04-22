import { QauctionPage } from './app.po';

describe('qauction App', () => {
  let page: QauctionPage;

  beforeEach(() => {
    page = new QauctionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
