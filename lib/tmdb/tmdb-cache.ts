import NodeCache from "node-cache";

export const tmdbCache = new NodeCache({ stdTTL: 6400, checkperiod: 600 });
