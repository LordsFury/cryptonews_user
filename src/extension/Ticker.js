import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TickerView from "../components/TickerView";

export const Ticker = Node.create({
  name: "ticker",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      symbol: {
        default: "BTC",
        parseHTML: (element) => element.getAttribute("data-symbol") || "BTC",
        renderHTML: (attributes) => ({
          "data-symbol": attributes.symbol,
        }),
      },
      slug: {
        default: "Bitcoin",
        parseHTML: (element) => element.getAttribute("data-slug") || "Bitcoin",
        renderHTML: (attributes) => ({
          "data-slug": attributes.slug,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ticker-tag",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ticker-tag", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TickerView);
  },

  addCommands() {
    return {
      insertTicker:
        (symbol, slug) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: {
                symbol: symbol?.toUpperCase?.() || symbol,
                slug,
              },
            })
            .run();
        },
    };
  },
});
