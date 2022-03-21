import { render, screen } from "@testing-library/react";
import { getPrismicClient } from "../../services/prismic";
import Post, { getStaticProps } from "../../pages/posts";
import { mocked } from "ts-jest/utils";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "March 14",
  },
];

jest.mock('../../services/prismic')

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ title: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "04-01-2022",
          },
        ],
      }),
    } as any);
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Post excerpt",
              updatedAt: "01 de abril de 2022",
            },
          ],
        },
      })
    );
  });
});
