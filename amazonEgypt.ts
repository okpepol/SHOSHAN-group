export const AFFILIATE_TAG = 'shoshan09-21';
export const AMAZON_EG_ORIGIN = 'https://www.amazon.eg';

const ALLOWED_AMAZON_EG_HOSTS = new Set([
  'amazon.eg',
  'www.amazon.eg',
  'm.amazon.eg',
]);

export function buildAmazonEgyptSearchUrl(query: string, categoryIndex?: string): string {
  const trimmed = query.trim();
  const url = new URL('/s', AMAZON_EG_ORIGIN);
  if (trimmed) {
    url.searchParams.set('k', trimmed);
  }
  if (categoryIndex && categoryIndex !== 'aps') {
    url.searchParams.set('i', categoryIndex);
  }
  url.searchParams.set('tag', AFFILIATE_TAG);
  return url.toString();
}

export interface AffiliateLinkResult {
  ok: boolean;
  affiliateUrl?: string;
  linkType?: 'product' | 'search' | 'category' | 'page';
  asin?: string;
  error?: string;
}

function extractAsin(pathname: string): string | undefined {
  const dpMatch = pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i);
  return dpMatch ? dpMatch[1].toUpperCase() : undefined;
}

export function generateAmazonEgyptAffiliateUrl(rawInput: string): AffiliateLinkResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: 'يرجى لصق رابط من موقع أمازون مصر (amazon.eg) أولاً.',
    };
  }

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return {
      ok: false,
      error: 'تنسيق الرابط غير صالح. تأكد من نسخ الرابط كاملاً من متصفحك.',
    };
  }

  const host = parsed.hostname.toLowerCase();

  if (!ALLOWED_AMAZON_EG_HOSTS.has(host)) {
    if (host.includes('amazon.')) {
      return {
        ok: false,
        error: `هذا الرابط يتبع متجراً آخر (${host}). الأداة تقبل روابط أمازون مصر (amazon.eg) فقط.`,
      };
    }
    return {
      ok: false,
      error: 'الرابط لا ينتمي إلى موقع أمازون مصر (www.amazon.eg). يرجى استخدام رابط من amazon.eg فقط.',
    };
  }

  // Normalize to https://www.amazon.eg
  const normalized = new URL(parsed.pathname + parsed.search, AMAZON_EG_ORIGIN);

  // Remove tracking noise parameters while preserving essential search/product parameters
  const noiseParams = ['ref', 'ref_', 'pf_rd_r', 'pf_rd_p', 'pf_rd_m', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i', 'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'qid', 'sr', 'dib', 'dib_tag', 'sprefix', 'crid', 'keywords'];
  for (const param of noiseParams) {
    normalized.searchParams.delete(param);
  }

  // Always enforce the owner's affiliate tracking tag
  normalized.searchParams.set('tag', AFFILIATE_TAG);

  const asin = extractAsin(normalized.pathname);
  let linkType: AffiliateLinkResult['linkType'] = 'page';
  if (asin) {
    linkType = 'product';
  } else if (normalized.pathname.startsWith('/s') || normalized.searchParams.has('k')) {
    linkType = 'search';
  } else if (normalized.pathname.includes('/b') || normalized.searchParams.has('node')) {
    linkType = 'category';
  }

  return {
    ok: true,
    affiliateUrl: normalized.toString(),
    linkType,
    asin,
  };
}
