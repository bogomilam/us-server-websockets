const regions = [
  "us-east",
  "eu-west",
  "eu-central",
  "us-west",
  "sa-east",
  "ap-southeast",
];

async function fetchRegionData(region: string) {
  const url = `https://data--${region}.upscope.io/status?stats=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const data = await res.json();
    console.log(`[${new Date().toISOString()}] ${region}:`, data);
    // TODO: Save to DB
  } catch (err) {
    console.error(`Error fetching ${region}:`, (err as Error).message);
  }
}

async function fetchAllRegions() {
  await Promise.all(regions.map(fetchRegionData)); // fetch in parallel
}

// Run immediately
fetchAllRegions();

// Repeat every 60 seconds
setInterval(fetchAllRegions, 5_000);
