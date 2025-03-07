import { useMediaQuery } from "@chakra-ui/react";

function Breakpoints() {
  const [sm] = useMediaQuery("(max-width: 600px)");
  const [md] = useMediaQuery("(min-width: 601px) and (max-width: 900px)");
  const [lg] = useMediaQuery("(min-width: 901px) and (max-width: 1200px)");
  const [xl] = useMediaQuery("(min-width: 1201px) and (max-width: 1630px");
  const [xxl] = useMediaQuery("(min-width: 1631px)");

  return { sm, md, lg, xl, xxl };
}

export default Breakpoints;
