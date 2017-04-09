import { Memorygameng4Page } from './app.po';

describe('memorygameng4 App', () => {
  let page: Memorygameng4Page;

  beforeEach(() => {
    page = new Memorygameng4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
