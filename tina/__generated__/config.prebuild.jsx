// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_EDIT_BRANCH || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "posts",
        path: "posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            label: "Description",
            name: "description"
          },
          {
            type: "string",
            label: "Date",
            name: "date"
          },
          {
            type: "string",
            label: "Tags",
            name: "tags"
          },
          {
            type: "string",
            label: "Image URL",
            name: "imageUrl"
          },
          {
            type: "rich-text",
            label: "Blog Post Body",
            name: "body",
            isBody: true,
            templates: [
              {
                name: "Quote",
                label: "Quote",
                fields: [
                  { type: "string", name: "content", label: "Content" },
                  { type: "string", name: "author", label: "Author" },
                  { type: "string", name: "cite", label: "Cite" }
                ]
              },
              {
                name: "ArticleImage",
                label: "ArticleImage",
                fields: [
                  { type: "string", name: "src", label: "Src" },
                  { type: "string", name: "caption", label: "Caption" }
                ]
              },
              {
                name: "Code",
                label: "Code",
                fields: [
                  { type: "string", name: "code", label: "Code" },
                  { type: "string", name: "language", label: "Language" },
                  { type: "string", name: "selectedLines", label: "Selected Lines" },
                  { type: "boolean", name: "withCopyButton", label: "With Copy Button" },
                  { type: "boolean", name: "withLineNumbers", label: "With Line Numbers" },
                  { type: "string", name: "caption", label: "Caption" }
                ]
              },
              { name: "h2", label: "H2", inline: true, fields: [] },
              { name: "h3", label: "H3", inline: true, fields: [] },
              { name: "br", label: "BR", inline: true, fields: [] },
              { name: "p", label: "P", inline: true, fields: [] }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
