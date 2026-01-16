export default function parseSeatCode(code = "") {
    if (!code) return {};
  
    const [, rest] = code.split("@");
    const parts = rest?.split("|") || [];
  
    return {
      label: parts[0],          
      type: parts[2],       
      hasExtraLegroom: parts[3] === "true",
      price: Number(parts[4]) || 0,
    };
  }
  