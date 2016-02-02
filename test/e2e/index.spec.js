const port = 60000;

describe("application", () => {
    beforeEach(() => {
        browser.get(`http://localhost:${port}`);
    });

    it("should be named", () => {
        expect(browser.getTitle()).toEqual("directive-based-component-angular-project");
    });
});
