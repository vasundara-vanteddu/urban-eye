export const detectPriority = (
  prediction,
  address,
  description = ""
) => {
  const issue = prediction?.toLowerCase() || "";
  const location = address?.toLowerCase() || "";
  const desc = description?.toLowerCase() || "";

  const combinedText = `${location} ${desc}`;

  let priority = "Low";

  // HIGH RISK AREAS
  const highRiskAreas = [
    "school",
    "hospital",
    "highway",
    "main road",
    "junction",
    "signal",
    "market",
    "bus stop",
    "metro",
    "railway",
    "mall",
    "college",
    "government office",
    "airport",
    "bridge",
    "flyover",
    "public road",
    "busy road",
    "traffic",
    "crossroad",
    "shopping area",
    "station",
    "commercial area",
    "clinic",
    "pharmacy",
    "crowded",
    "near school",
    "school premises",
    "school entrance",
    "school road",
  ];

  // MEDIUM RISK AREAS
  const mediumRiskAreas = [
    "park",
    "residential",
    "apartment",
    "colony",
    "street",
    "lane",
    "community",
    "playground",
    "temple",
    "mosque",
    "church",
    "society",
    "neighborhood",
    "housing",
    "local road",
    "residential road",
  ];

  const isHighRisk = highRiskAreas.some((word) =>
    combinedText.includes(word)
  );

  const isMediumRisk = mediumRiskAreas.some((word) =>
    combinedText.includes(word)
  );

  // ISSUE LOGIC
  if (issue.includes("pothole")) {
    if (isHighRisk) priority = "High";
    else if (isMediumRisk) priority = "Medium";
    else priority = "Low";
  }

  else if (issue.includes("garbage")) {
    if (isHighRisk) priority = "High";
    else if (isMediumRisk) priority = "Medium";
    else priority = "Low";
  }

  else if (
    issue.includes("streetlight") ||
    issue.includes("light")
  ) {
    if (isHighRisk) priority = "High";
    else if (isMediumRisk) priority = "Medium";
    else priority = "Low";
  }

  else if (
    issue.includes("drainage") ||
    issue.includes("water")
  ) {
    if (isHighRisk) priority = "High";
    else priority = "Medium";
  }

  return priority;
};