import { faker } from "@faker-js/faker";

describe("blog sanity tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to open blog lists page", () => {
    cy.login();

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /Blog Posts/i }).click();
    cy.findByText("Posts");
  });

  it("should allow you to create a new blog", () => {
    const testBlog = {
      title: faker.lorem.words(3),
      slug: faker.lorem.slug(),
      markdown: faker.lorem.sentences(4),
    };

    cy.login();

    //cy.visitAndCheck("/");
    cy.findByRole("link", { name: /Admin/i }).should("exist");
    cy.findByRole("link", { name: /Admin/i }).click();

    const create_new_post_btn = cy.findByRole("link", {
      name: /Create a New Post/i,
    });
    create_new_post_btn.should("exist");
    create_new_post_btn.click();

    cy.findByRole("textbox", { name: /title/i }).type(testBlog.title);
    cy.findByRole("textbox", { name: /slug/i }).type(testBlog.slug);
    cy.findByRole("textbox", { name: /markdown/i }).type(testBlog.markdown);
    cy.findByRole("button", { name: /Create Post/i }).click();

    cy.findAllByRole("link").should("contain", testBlog.title);
  });
});
