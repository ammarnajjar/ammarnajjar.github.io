import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="ammarnajjar/github.io-comments"
      repoId="R_kgDOJA1LSA"
      category="[ENTER CATEGORY NAME HERE]"
      categoryId="[ENTER CATEGORY ID HERE]"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}
