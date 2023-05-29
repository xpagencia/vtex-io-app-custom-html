import {useEffect, useState } from "react";

export function useHtmlText(htmlText?: string) {
  htmlText = htmlText ? htmlText : "<span>Html content</span>";

  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    convertHtmlText();
  }, []);

  function convertHtmlText() {
    convertHtmlTextByCreateElement();
  }

  function convertHtmlTextByCreateElement() {
    function createScript(script: any) {
      let s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('language', 'javascript');
      if (script.innerHTML != "") {
        s.innerHTML = script.innerHTML;
      }
      for (let i = 0; i < script.attributes.length; i++){
        let attrib = script.attributes[i];
        if (attrib != null && attrib.name != 'type' && attrib.name != 'language') {
          s.setAttribute(attrib.name, attrib.textContent);
        }
      }

      //fatherElement.appendChild(s);
      return s;
    }

    function createLink(link: HTMLLinkElement) {
      var linkElem = document.createElement('link');
      linkElem.rel = 'stylesheet';
      linkElem.type = 'text/css';
      linkElem.href = link.href;
      return linkElem;
      //fatherElement.appendChild(linkElem);
      //document.getElementsByTagName('head')[0].appendChild(linkElem);
    }

    console.log("original", htmlText);

    if (htmlText) {
      setIsLoading(true);

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(htmlText, "text/html");
      const htmlTag = htmlDoc.querySelector("html");
      const headTag = htmlTag?.querySelector("head");
      const bodyTag = htmlTag?.querySelector("body");

      const bodyDocElements = [];

      //incluir conteudo head
      if (headTag && headTag.hasChildNodes()) {
        //incluir arquivos script e css pelo document.
        let headTagScripts = headTag.getElementsByTagName('script');
        let headTagLinks = headTag.getElementsByTagName('link');
        let headTagStyles = headTag.getElementsByTagName('style');

        if (headTagScripts.length > 0) {
          for (let i = 0; i < headTagScripts.length; i++) {
            document.body.appendChild(createScript(headTagScripts[i]));
            headTagScripts[i].remove();
          }
        }

        if (headTagLinks.length > 0) {
          for (let i = 0; i < headTagLinks.length; i++) {
            document.head.appendChild( createLink(headTagLinks[i]) );
            headTagLinks[i].remove();
          }
        }

        if (headTagStyles.length > 0) {
          for (let i = 0; i < headTagStyles.length; i++) {
            document.head.appendChild(headTagStyles[i]);
            headTagStyles[i].remove();
          }
        }
      }

      //incluir conteudo body
      if (bodyTag && bodyTag.hasChildNodes()) {
        let bodyTagScripts = bodyTag.getElementsByTagName('script');
        let bodyTagLinks = bodyTag.getElementsByTagName('link');
        let bodyTagStyles = bodyTag.getElementsByTagName('style');

        if (bodyTagScripts.length > 0) {
          for (let i = 0; i < bodyTagScripts.length; i++) {
            bodyDocElements.push(createScript(bodyTagScripts[i]));
            bodyTagScripts[i].remove();
          }
        }

        if (bodyTagLinks.length > 0) {
          for (let i = 0; i < bodyTagLinks.length; i++) {
            bodyDocElements.push(createLink(bodyTagLinks[i]));
            bodyTagLinks[i].remove();
          }
        }

        if (bodyTagStyles.length > 0) {
          for (let i = 0; i < bodyTagStyles.length; i++) {
            bodyDocElements.push(bodyTagStyles[i]);
            bodyTagStyles[i].remove();
          }
        }

        let div = document.createElement('div');
        if (bodyTag.hasChildNodes()) {
          div.innerHTML = bodyTag.innerHTML;
        }
        for (let i = 0; i < bodyDocElements.length; i++) {
          div.appendChild(bodyDocElements[i]);
        }

        setHtml(div);
      }
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    html
  };
}
