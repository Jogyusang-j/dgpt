import { useMediaQuery } from "@chakra-ui/react";

function useMediaQ() {
  const [sm] = useMediaQuery("(min-width: 600px)");
  const [sm_h] = useMediaQuery("(min-height: 500px)");
  const [md] = useMediaQuery("(min-width: 800px)");
  const [md_900] = useMediaQuery("(min-width: 900px)");
  const [lg_1060] = useMediaQuery("(min-width: 1060px)");
  const [lg] = useMediaQuery("(min-width: 1000px)");
  const [xl] = useMediaQuery("(min-width: 1200px)");

  return { sm, md, lg, xl, sm_h, md_900, lg_1060 };
}

export default useMediaQ;
