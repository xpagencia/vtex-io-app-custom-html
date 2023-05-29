import React, { useEffect, useRef } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useHtmlText } from "./hooks/useHtmlText";

const CSS_HANDLES = ["customHtmlContent"];

interface CustomHtmlContentProps {
  htmlText?: string;
  serverDateTime?: boolean
}

export default function CustomHtmlContent({
  htmlText
}: CustomHtmlContentProps) {
  htmlText = htmlText ? htmlText : "<span>CustomHtmlContent</span>";

  const handles = useCssHandles(CSS_HANDLES);
  const customHtmlRef = useRef<HTMLElement>(null);
  const { isLoading, html } = useHtmlText(htmlText);

  useEffect(() => {
    addHtmlText();
  }, [html]);

  function addHtmlText() {
    if (
      html &&
      customHtmlRef.current &&
      !customHtmlRef.current.hasChildNodes()
    ) {
      customHtmlRef.current.appendChild(html);
    }
  }

  if (!isLoading && !html) return null;

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <section
          ref={customHtmlRef}
          className={handles.customHtmlContent}
        ></section>
      )}
    </>
  );
}

CustomHtmlContent.schema = {
  title: "Conteúdo HTML Customizado",
  description: "Recebe uma string e converte em um html customizado",
  type: "object",
  properties: {
    htmlText: {
      title: "Texto html",
      description: `Ex: <span class="title-h1"><strong>Meu teste</strong></span>`,
      type: "string",
      multiLine: true,
      default: "<span>Html content</span>",
    },
  },
};
